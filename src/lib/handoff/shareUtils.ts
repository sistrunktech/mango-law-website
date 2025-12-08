import { supabase } from '../supabaseClient';

export interface ShareOptions {
  documentId: string;
  expiresInDays?: number;
  password?: string;
}

export interface ShareLink {
  id: string;
  token: string;
  url: string;
  expiresAt: Date | null;
  hasPassword: boolean;
}

export async function createShareLink(options: ShareOptions): Promise<ShareLink | null> {
  if (!supabase) return null;

  try {
    // Generate unique token
    const { data: tokenData } = await supabase.rpc('generate_share_token');
    if (!tokenData) throw new Error('Failed to generate share token');

    const token = tokenData as string;

    // Calculate expiration date
    let expiresAt: string | null = null;
    if (options.expiresInDays) {
      const expires = new Date();
      expires.setDate(expires.getDate() + options.expiresInDays);
      expiresAt = expires.toISOString();
    }

    // Hash password if provided
    let passwordHash: string | null = null;
    if (options.password) {
      // Simple hash for demo - in production, use proper crypto
      passwordHash = btoa(options.password);
    }

    // Create share record
    const { data, error } = await supabase
      .from('handoff_shares')
      .insert({
        document_id: options.documentId,
        share_token: token,
        expires_at: expiresAt,
        password_hash: passwordHash,
      })
      .select()
      .single();

    if (error) throw error;

    const baseUrl = window.location.origin;
    const url = `${baseUrl}/handoff/${token}`;

    return {
      id: data.id,
      token: data.share_token,
      url,
      expiresAt: expiresAt ? new Date(expiresAt) : null,
      hasPassword: !!passwordHash,
    };
  } catch (error) {
    console.error('Error creating share link:', error);
    return null;
  }
}

export async function validateShareToken(
  token: string,
  password?: string
): Promise<{ valid: boolean; documentId?: string; error?: string }> {
  if (!supabase) return { valid: false, error: 'Database not available' };

  try {
    const { data, error } = await supabase
      .from('handoff_shares')
      .select('document_id, expires_at, password_hash')
      .eq('share_token', token)
      .single();

    if (error || !data) {
      return { valid: false, error: 'Invalid share link' };
    }

    // Check expiration
    if (data.expires_at) {
      const expiresAt = new Date(data.expires_at);
      if (expiresAt < new Date()) {
        return { valid: false, error: 'Share link has expired' };
      }
    }

    // Check password if required
    if (data.password_hash) {
      if (!password) {
        return { valid: false, error: 'Password required' };
      }
      const providedHash = btoa(password);
      if (providedHash !== data.password_hash) {
        return { valid: false, error: 'Incorrect password' };
      }
    }

    // Increment view count
    await supabase.rpc('increment_share_view_count', { token });

    return { valid: true, documentId: data.document_id };
  } catch (error) {
    console.error('Error validating share token:', error);
    return { valid: false, error: 'Validation failed' };
  }
}

export async function revokeShareLink(shareId: string): Promise<boolean> {
  if (!supabase) return false;

  try {
    const { error } = await supabase
      .from('handoff_shares')
      .delete()
      .eq('id', shareId);

    return !error;
  } catch (error) {
    console.error('Error revoking share link:', error);
    return false;
  }
}

export async function getDocumentShares(documentId: string) {
  if (!supabase) return [];

  try {
    const { data, error } = await supabase
      .from('handoff_shares')
      .select('*')
      .eq('document_id', documentId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching shares:', error);
    return [];
  }
}
