import { useState, useEffect, useRef } from 'react';
import { X, Send, Phone } from 'lucide-react';
import ChatBubble from './ChatBubble';
import TypingIndicator from './TypingIndicator';
import TextInput from './TextInput';
import PhoneInput from './PhoneInput';
import { OFFICE_PHONE_DISPLAY, GENERAL_OFFICE_PHONE_DISPLAY } from '../../lib/contactInfo';
import { supabaseAnonKey, supabaseUrl } from '../../lib/supabaseClient';
import { trackLeadSubmitted } from '../../lib/analytics';
import TurnstileWidget from '../TurnstileWidget';
import { TURNSTILE_SITE_KEY } from '../../lib/turnstile';
import { CASE_TYPE_OPTIONS, COUNTY_OPTIONS, HOW_FOUND_OPTIONS, URGENCY_OPTIONS } from '../../lib/intake';

interface ConversationStep {
  id: string;
  botMessage: string | React.ReactNode;
  userResponse?: string;
  timestamp?: Date;
}

interface ConversationWindowProps {
  onClose: () => void;
  bottomOffsetClass?: string;
}

export default function ConversationWindow({ onClose, bottomOffsetClass = 'bottom-6' }: ConversationWindowProps) {
  const [currentStep, setCurrentStep] = useState<
    | 'name'
    | 'phone'
    | 'email'
    | 'case_type'
    | 'county'
    | 'urgency'
    | 'how_found'
    | 'how_found_detail'
    | 'message'
    | 'confirmation'
    | 'followup'
  >(
    'name',
  );
  const [isTyping, setIsTyping] = useState(true);
  const [conversation, setConversation] = useState<ConversationStep[]>([]);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [caseType, setCaseType] = useState('');
  const [county, setCounty] = useState('');
  const [urgency, setUrgency] = useState<'exploring' | 'soon' | 'urgent' | 'emergency'>('exploring');
  const [howFound, setHowFound] = useState('');
  const [howFoundDetail, setHowFoundDetail] = useState('');
  const [message, setMessage] = useState('');
  const [nameError, setNameError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [caseTypeError, setCaseTypeError] = useState('');
  const [howFoundError, setHowFoundError] = useState('');
  const [howFoundDetailError, setHowFoundDetailError] = useState('');
  const [messageError, setMessageError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState('');
  const [showFollowup, setShowFollowup] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const turnstileSiteKey = TURNSTILE_SITE_KEY;

  const conversationRef = useRef<HTMLDivElement>(null);
  const followupTimerRef = useRef<number>();
  const inactivityTimerRef = useRef<number>();

  // Load saved conversation from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('mango-chat-session');
    if (saved) {
      try {
        const data = JSON.parse(saved);
        const lastActivity = new Date(data.lastActivity);
        const now = new Date();
        const minutesSinceActivity = (now.getTime() - lastActivity.getTime()) / 1000 / 60;

        // Session timeout after 30 minutes
        if (minutesSinceActivity < 30) {
          setConversation(data.conversation || []);
          setCurrentStep(data.currentStep || 'name');
          setName(data.name || '');
          setPhone(data.phone || '');
          setEmail(data.email || '');
          setCaseType(data.caseType || '');
          setCounty(data.county || '');
          setUrgency(data.urgency || 'exploring');
          setHowFound(data.howFound || '');
          setHowFoundDetail(data.howFoundDetail || '');
          setMessage(data.message || '');
        } else {
          localStorage.removeItem('mango-chat-session');
        }
      } catch (error) {
        console.error('Failed to restore chat session:', error);
        localStorage.removeItem('mango-chat-session');
      }
    }
  }, []);

  // Save conversation to localStorage
  useEffect(() => {
    if (conversation.length > 0 || name || phone || email || caseType || county || howFound || howFoundDetail || message) {
      const sessionData = {
        conversation,
        currentStep,
        name,
        phone,
        email,
        caseType,
        county,
        urgency,
        howFound,
        howFoundDetail,
        message,
        lastActivity: new Date().toISOString(),
      };
      localStorage.setItem('mango-chat-session', JSON.stringify(sessionData));
    }
  }, [conversation, currentStep, name, phone, email, caseType, county, urgency, howFound, howFoundDetail, message]);

  // Reset inactivity timer
  useEffect(() => {
    if (inactivityTimerRef.current) {
      clearTimeout(inactivityTimerRef.current);
    }

    inactivityTimerRef.current = window.setTimeout(() => {
      localStorage.removeItem('mango-chat-session');
    }, 30 * 60 * 1000); // 30 minutes

    return () => {
      if (inactivityTimerRef.current) {
        clearTimeout(inactivityTimerRef.current);
      }
    };
  }, [conversation]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (conversationRef.current) {
      conversationRef.current.scrollTop = conversationRef.current.scrollHeight;
    }
  }, [conversation, isTyping]);

  // Initial bot message
  useEffect(() => {
    if (conversation.length === 0) {
      setTimeout(() => {
        setIsTyping(false);
        addBotMessage("Hi there — I can help you get started. What's your name?");
      }, 800);
    } else {
      setIsTyping(false);
    }
  }, []);

  const addBotMessage = (msg: string | React.ReactNode) => {
    setConversation((prev) => [
      ...prev,
      {
        id: `bot-${Date.now()}`,
        botMessage: msg,
        timestamp: new Date(),
      },
    ]);
  };

  const addUserMessage = (msg: string) => {
    setConversation((prev) => {
      const newConv = [...prev];
      if (newConv.length > 0) {
        newConv[newConv.length - 1].userResponse = msg;
      }
      return newConv;
    });
  };

  const handleNameSubmit = () => {
    const trimmedName = name.trim();
    if (!trimmedName) {
      setNameError('Please enter your name');
      return;
    }
    if (trimmedName.length < 2) {
      setNameError('Name must be at least 2 characters');
      return;
    }

    setNameError('');
    addUserMessage(trimmedName);
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      addBotMessage(`Thanks, ${trimmedName}. What's the best phone number to reach you quickly?`);
      setCurrentStep('phone');
    }, 600);
  };

  const handlePhoneSubmit = () => {
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length < 10) {
      setPhoneError('Please enter a valid 10-digit phone number');
      return;
    }
    if (cleaned.length > 11) {
      setPhoneError('Phone number is too long');
      return;
    }

    setPhoneError('');
    const formatted = cleaned.length === 11
      ? `+1 (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7)}`
      : `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;

    addUserMessage(formatted);
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      addBotMessage("Thanks. What's the best email address to reach you?");
      setCurrentStep('email');
    }, 600);
  };

  const handleEmailSubmit = () => {
    const trimmedEmail = email.trim().toLowerCase();
    if (!trimmedEmail) {
      setEmailError('Please enter your email');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setEmailError('Please enter a valid email address');
      return;
    }

    setEmailError('');
    addUserMessage(trimmedEmail);
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      addBotMessage('What do you need help with?');
      setCurrentStep('case_type');
    }, 600);
  };

  const handleCaseTypeSelect = (value: string, label: string) => {
    if (!value) {
      setCaseTypeError('Please choose an option');
      return;
    }
    setCaseTypeError('');
    setCaseType(value);
    addUserMessage(label);
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      addBotMessage('Which county is this in? (optional)');
      setCurrentStep('county');
    }, 450);
  };

  const handleCountySelect = (value: string, label: string) => {
    setCounty(value);
    addUserMessage(label);
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      addBotMessage('How urgent is your situation?');
      setCurrentStep('urgency');
    }, 450);
  };

  const handleUrgencySelect = (value: 'exploring' | 'soon' | 'urgent' | 'emergency', label: string) => {
    setUrgency(value);
    addUserMessage(label);
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      addBotMessage('How did you find Nick/Mango Law?');
      setCurrentStep('how_found');
    }, 450);
  };

  const handleHowFoundSelect = (value: string, label: string) => {
    if (!value) {
      setHowFoundError('Please choose an option');
      return;
    }
    setHowFoundError('');
    setHowFound(value);
    addUserMessage(label);
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      if (value === 'referral') {
        addBotMessage('Who can we thank for the referral?');
        setCurrentStep('how_found_detail');
        return;
      }
      if (value === 'other') {
        addBotMessage('Can you share a quick note on how you found us?');
        setCurrentStep('how_found_detail');
        return;
      }
      addBotMessage("Got it. What's going on today? How can we help?");
      setCurrentStep('message');
    }, 450);
  };

  const handleHowFoundDetailSubmit = () => {
    const trimmed = howFoundDetail.trim();
    if (!trimmed) {
      setHowFoundDetailError(howFound === 'referral' ? 'Please enter a name' : 'Please enter a quick note');
      return;
    }
    if (trimmed.length < 2) {
      setHowFoundDetailError('Please add a bit more detail');
      return;
    }
    setHowFoundDetailError('');
    addUserMessage(trimmed);
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      addBotMessage("Thanks. What's going on today? How can we help?");
      setCurrentStep('message');
    }, 450);
  };

  const handleMessageSubmit = async () => {
    const trimmedMessage = message.trim();
    if (!trimmedMessage) {
      setMessageError('Please tell us how we can help');
      return;
    }
    if (trimmedMessage.length < 10) {
      setMessageError('Please provide more details (at least 10 characters)');
      return;
    }

    setMessageError('');
    addUserMessage(trimmedMessage);
    setIsTyping(true);
    setIsSubmitting(true);

    if (turnstileSiteKey && !turnstileToken) {
      setIsTyping(false);
      setIsSubmitting(false);
      setSubmissionError('Please complete the verification step and try again.');
      return;
    }

    // Build conversation context
    const conversationContext = conversation
      .map((step) => `Bot: ${typeof step.botMessage === 'string' ? step.botMessage : ''}\nUser: ${step.userResponse || ''}`)
      .join('\n\n');

    // Submit to backend
    try {
      const apiUrl = `${supabaseUrl}/functions/v1/chat-intake`;
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${supabaseAnonKey}`,
          apikey: supabaseAnonKey,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.replace(/\D/g, ''),
          email: email.trim().toLowerCase(),
          case_type: caseType || null,
          county: county || null,
          urgency: urgency || null,
          how_found: howFound || null,
          how_found_detail: howFoundDetail || null,
          initial_message: trimmedMessage,
          conversation_context: conversationContext,
          source: 'chat_widget',
          turnstile_token: turnstileToken,
        }),
      });

      if (!response.ok) {
        let details: string | undefined;
        try {
          const data = await response.json();
          details = typeof data?.error === 'string' ? data.error : undefined;
        } catch {
          // ignore
        }
        throw new Error(details ? `Submission failed: ${details}` : `Submission failed: ${response.status}`);
      }

      trackLeadSubmitted('chat', 'chat_widget', {
        source: 'chat_widget',
      });

      setIsTyping(false);
      setIsSubmitting(false);
      const confirmationMessage = (
        <div>
          <p className="mb-3">Thank you — sending this to the attorney now.</p>
          <div className="space-y-2 text-xs">
            <p className="font-semibold">Need immediate help?</p>
            <div className="flex items-center gap-2">
              <Phone size={12} />
              <span>{OFFICE_PHONE_DISPLAY} — Call/Text (Direct)</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone size={12} />
              <span>{GENERAL_OFFICE_PHONE_DISPLAY} — Office</span>
            </div>
          </div>
        </div>
      );

      addBotMessage(confirmationMessage);
      setCurrentStep('confirmation');

      // Show follow-up message after 20-30 seconds
      const delay = 20000 + Math.random() * 10000; // 20-30 seconds
      followupTimerRef.current = window.setTimeout(() => {
        setShowFollowup(true);
        addBotMessage("If this is urgent, please call or text us directly at the numbers above.");
        setCurrentStep('followup');
      }, delay);

      // Clear session after successful submission
      setTimeout(() => {
        localStorage.removeItem('mango-chat-session');
      }, 2000);

    } catch (error) {
      console.error('Chat submission error:', error);
      setIsTyping(false);
      setIsSubmitting(false);
      setSubmissionError(
        error instanceof Error && error.message
          ? error.message
          : `We had trouble sending your message. Please call or text us directly at ${OFFICE_PHONE_DISPLAY}.`,
      );

      const errorMessage = (
        <div>
          <p className="mb-3">We had trouble sending your message. Please try again or call us directly:</p>
          <div className="space-y-2 text-xs">
            <div className="flex items-center gap-2">
              <Phone size={12} />
              <span>{OFFICE_PHONE_DISPLAY} — Call/Text (Direct)</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone size={12} />
              <span>{GENERAL_OFFICE_PHONE_DISPLAY} — Office</span>
            </div>
          </div>
        </div>
      );

      addBotMessage(errorMessage);
      setCurrentStep('confirmation');
    }
  };

  useEffect(() => {
    return () => {
      if (followupTimerRef.current) {
        clearTimeout(followupTimerRef.current);
      }
    };
  }, []);

  return (
    <div
      className={[
        'fixed inset-x-3 bottom-4 z-50 flex max-w-full flex-col overflow-hidden rounded-2xl border border-brand-black/10 bg-white shadow-lift-lg',
        bottomOffsetClass,
        'max-h-[85vh]',
        'lg:inset-x-auto lg:right-6 lg:bottom-6 lg:max-h-none lg:h-[640px] lg:w-[420px]',
      ].join(' ')}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-brand-black/10 bg-gradient-to-r from-brand-mango to-brand-gold p-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-brand-black/10 p-2">
            <img
              src="/images/brand/mango-icon-fullcolor.svg"
              alt="Mango Law"
              className="h-full w-full"
            />
          </div>
          <div>
            <h3 className="font-bold text-brand-black">Mango Law</h3>
            <p className="text-xs text-brand-black/70">Criminal Defense Attorney</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="rounded-full p-2 text-brand-black transition-colors hover:bg-brand-black/10"
          aria-label="Close chat"
        >
          <X size={18} />
        </button>
      </div>

      {/* Conversation */}
      <div ref={conversationRef} className="flex-1 overflow-y-auto bg-brand-offWhite p-4 space-y-4">
        {conversation.map((step) => (
          <div key={step.id} className="space-y-3">
            <ChatBubble message={step.botMessage} sender="bot" timestamp={step.timestamp} />
            {step.userResponse && (
              <ChatBubble message={step.userResponse} sender="user" />
            )}
          </div>
        ))}
        {isTyping && <TypingIndicator />}
      </div>

      {/* Input Area */}
      {currentStep !== 'confirmation' && currentStep !== 'followup' && (
        <div className="border-t border-brand-black/10 bg-white p-4">
          {currentStep === 'name' && (
            <div className="space-y-3">
              <TextInput
                value={name}
                onChange={setName}
                onSubmit={handleNameSubmit}
                placeholder="Enter your name"
                error={nameError}
              />
              <button
                onClick={handleNameSubmit}
                disabled={!name.trim() || isTyping}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-mango px-4 py-3 text-sm font-semibold text-brand-black transition-colors hover:bg-brand-gold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>Continue</span>
                <Send size={14} />
              </button>
            </div>
          )}

          {currentStep === 'phone' && (
            <div className="space-y-3">
              <PhoneInput
                value={phone}
                onChange={setPhone}
                onSubmit={handlePhoneSubmit}
                error={phoneError}
              />
              <button
                onClick={handlePhoneSubmit}
                disabled={phone.replace(/\D/g, '').length < 10 || isTyping}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-mango px-4 py-3 text-sm font-semibold text-brand-black transition-colors hover:bg-brand-gold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>Continue</span>
                <Send size={14} />
              </button>
            </div>
          )}

          {currentStep === 'email' && (
            <div className="space-y-3">
              <TextInput
                value={email}
                onChange={setEmail}
                onSubmit={handleEmailSubmit}
                placeholder="you@example.com"
                error={emailError}
              />
              <button
                onClick={handleEmailSubmit}
                disabled={!email.trim() || isTyping}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-mango px-4 py-3 text-sm font-semibold text-brand-black transition-colors hover:bg-brand-gold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>Continue</span>
                <Send size={14} />
              </button>
            </div>
          )}

          {currentStep === 'case_type' && (
            <div className="space-y-3">
              <div className="grid grid-cols-1 gap-2">
                {CASE_TYPE_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => handleCaseTypeSelect(opt.value, opt.label)}
                    disabled={isTyping}
                    className="w-full rounded-xl border border-brand-black/10 bg-white px-4 py-3 text-left text-sm font-semibold text-brand-black transition-colors hover:bg-brand-mango/10 disabled:opacity-50"
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
              {caseTypeError ? <p className="text-xs text-red-600">{caseTypeError}</p> : null}
            </div>
          )}

          {currentStep === 'county' && (
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => handleCountySelect('', 'Skip')}
                  disabled={isTyping}
                  className="col-span-2 rounded-xl border border-brand-black/10 bg-white px-4 py-3 text-sm font-semibold text-brand-black/70 transition-colors hover:bg-brand-black/5 disabled:opacity-50"
                >
                  Skip
                </button>
                {COUNTY_OPTIONS.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => handleCountySelect(c, `${c} County`)}
                    disabled={isTyping}
                    className="rounded-xl border border-brand-black/10 bg-white px-3 py-2 text-xs font-semibold text-brand-black transition-colors hover:bg-brand-mango/10 disabled:opacity-50"
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          )}

          {currentStep === 'urgency' && (
            <div className="space-y-3">
              <div className="grid grid-cols-1 gap-2">
                {URGENCY_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => handleUrgencySelect(opt.value, opt.label)}
                    disabled={isTyping}
                    className="w-full rounded-xl border border-brand-black/10 bg-white px-4 py-3 text-left text-sm font-semibold text-brand-black transition-colors hover:bg-brand-mango/10 disabled:opacity-50"
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {currentStep === 'how_found' && (
            <div className="space-y-3">
              <div className="grid grid-cols-1 gap-2">
                {HOW_FOUND_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => handleHowFoundSelect(opt.value, opt.label)}
                    disabled={isTyping}
                    className="w-full rounded-xl border border-brand-black/10 bg-white px-4 py-3 text-left text-sm font-semibold text-brand-black transition-colors hover:bg-brand-mango/10 disabled:opacity-50"
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
              {howFoundError ? <p className="text-xs text-red-600">{howFoundError}</p> : null}
            </div>
          )}

          {currentStep === 'how_found_detail' && (
            <div className="space-y-3">
              <TextInput
                value={howFoundDetail}
                onChange={setHowFoundDetail}
                onSubmit={handleHowFoundDetailSubmit}
                placeholder={howFound === 'referral' ? 'Name of the person or business' : 'Tell us a little more'}
                error={howFoundDetailError}
              />
              <button
                onClick={handleHowFoundDetailSubmit}
                disabled={!howFoundDetail.trim() || isTyping}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-mango px-4 py-3 text-sm font-semibold text-brand-black transition-colors hover:bg-brand-gold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>Continue</span>
                <Send size={14} />
              </button>
            </div>
          )}

          {currentStep === 'message' && (
            <div className="space-y-3">
              <TextInput
                value={message}
                onChange={setMessage}
                onSubmit={handleMessageSubmit}
                placeholder="Describe your situation..."
                multiline
                error={messageError}
              />
              <button
                onClick={handleMessageSubmit}
                disabled={!message.trim() || isSubmitting || (turnstileSiteKey ? !turnstileToken : false)}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-mango px-4 py-3 text-sm font-semibold text-brand-black transition-colors hover:bg-brand-gold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <span>Sending...</span>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-brand-black border-t-transparent" />
                  </>
                ) : (
                  <>
                    <span>Send Message</span>
                    <Send size={14} />
                  </>
                )}
              </button>
              {turnstileSiteKey ? (
                <div className="mt-2 flex items-end justify-between gap-3 rounded-xl border border-brand-black/10 bg-white px-3 py-2">
                  <p className="text-[10px] font-medium leading-tight text-brand-black/60">
                    Protected by Cloudflare Turnstile
                  </p>
                  <TurnstileWidget
                    siteKey={turnstileSiteKey}
                    onToken={setTurnstileToken}
                    theme="light"
                    size="compact"
                    className="turnstile-widget origin-top-right scale-[0.9]"
                  />
                </div>
              ) : null}
              {submissionError ? <p className="text-xs text-red-600">{submissionError}</p> : null}
            </div>
          )}
        </div>
      )}

      {/* Disclaimer */}
      <div className="border-t border-brand-black/10 bg-white p-3">
        <p className="text-[10px] text-brand-black/60 text-center leading-tight">
          This chat is not monitored 24/7. No attorney-client relationship is formed until formally engaged. For urgent matters, please call directly.
        </p>
      </div>
    </div>
  );
}
