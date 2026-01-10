'use client';

import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';
import {
  Star,
  MessageSquare,
  Send,
  RefreshCw,
  Filter,
  Search,
  TrendingUp,
  Clock,
  Edit3,
  Sparkles
} from 'lucide-react';

interface Review {
  id: string;
  google_review_id: string;
  rating: number;
  author_name: string;
  author_photo_url: string | null;
  review_text: string | null;
  review_date: string;
  response_text: string | null;
  response_date: string | null;
  is_responded: boolean;
  sentiment: string | null;
  sentiment_score: number | null;
}

export default function ReviewManager() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRating, setFilterRating] = useState<string>('all');
  const [filterResponded, setFilterResponded] = useState<string>('all');
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [responseText, setResponseText] = useState('');
  const [generatingResponse, setGeneratingResponse] = useState(false);

  useEffect(() => {
    loadReviews();
  }, []);

  const loadReviews = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        ?.from('google_reviews')
        .select('*')
        .order('review_date', { ascending: false }) || {};

      if (error) throw error;
      if (data) setReviews(data);
    } catch (error) {
      console.error('Error loading reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSyncReviews = async () => {
    setSyncing(true);
    try {
      console.log('Syncing reviews from Google Business Profile...');
      setTimeout(() => {
        setSyncing(false);
        loadReviews();
      }, 2000);
    } catch (error) {
      console.error('Error syncing reviews:', error);
      setSyncing(false);
    }
  };

  const handleGenerateResponse = async (review: Review) => {
    setGeneratingResponse(true);
    try {
      const toneMapping = {
        5: 'grateful',
        4: 'grateful',
        3: 'professional',
        2: 'empathetic',
        1: 'empathetic'
      };

      const tone = toneMapping[review.rating as keyof typeof toneMapping] || 'professional';

      const mockResponse = review.rating >= 4
        ? `Thank you so much for taking the time to share your positive experience, ${review.author_name}! We're thrilled that we could help you achieve a favorable outcome in your case. Your trust in our legal team means everything to us. If you ever need our services again or have questions, please don't hesitate to reach out. We're here for you!`
        : review.rating === 3
        ? `Thank you for your feedback, ${review.author_name}. We appreciate you sharing your experience. We're always looking to improve our services and would welcome the opportunity to discuss your concerns further. Please feel free to contact our office directly at (740) 201-1444 so we can address any issues and ensure you receive the level of service you deserve.`
        : `${review.author_name}, thank you for bringing this to our attention. We take all feedback seriously and are sorry to hear that your experience didn't meet expectations. We'd like the opportunity to discuss this with you directly and work toward a resolution. Please contact our office at (740) 201-1444 at your earliest convenience. Your satisfaction is important to us.`;

      setTimeout(() => {
        setResponseText(mockResponse);
        setGeneratingResponse(false);
      }, 1500);
    } catch (error) {
      console.error('Error generating response:', error);
      setGeneratingResponse(false);
    }
  };

  const handlePostResponse = async () => {
    if (!selectedReview || !responseText.trim()) return;

    try {
      console.log('Posting response to Google...', {
        reviewId: selectedReview.id,
        response: responseText
      });

      await supabase
        ?.from('google_reviews')
        .update({
          response_text: responseText,
          response_date: new Date().toISOString(),
          is_responded: true
        })
        .eq('id', selectedReview.id);

      setSelectedReview(null);
      setResponseText('');
      loadReviews();
    } catch (error) {
      console.error('Error posting response:', error);
    }
  };

  const filteredReviews = reviews.filter(review => {
    const matchesSearch =
      review.author_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.review_text?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRating = filterRating === 'all' || review.rating.toString() === filterRating;
    const matchesResponded =
      filterResponded === 'all' ||
      (filterResponded === 'responded' && review.is_responded) ||
      (filterResponded === 'pending' && !review.is_responded);

    return matchesSearch && matchesRating && matchesResponded;
  });

  const stats = {
    totalReviews: reviews.length,
    averageRating: reviews.length > 0
      ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
      : '0.0',
    needsResponse: reviews.filter(r => !r.is_responded).length,
    responded: reviews.filter(r => r.is_responded).length,
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-slate-300">Loading reviews...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Google Business Profile Reviews</h2>
          <p className="text-slate-300 mt-1">
            Manage and respond to client reviews from Google
          </p>
        </div>
        <button
          onClick={handleSyncReviews}
          disabled={syncing}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#E8A33C] to-[#FFB84D] text-white font-semibold rounded-lg hover:from-[#D9941A] hover:to-[#E8A33C] transition shadow-lg disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${syncing ? 'animate-spin' : ''}`} />
          {syncing ? 'Syncing...' : 'Sync Reviews'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-[#1A1A1A] rounded-lg p-6 border border-[#2A2A2A]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-slate-400 text-sm">Total Reviews</span>
            <MessageSquare className="w-5 h-5 text-[#E8A33C]" />
          </div>
          <div className="text-3xl font-bold text-white">{stats.totalReviews}</div>
        </div>

        <div className="bg-[#1A1A1A] rounded-lg p-6 border border-[#2A2A2A]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-slate-400 text-sm">Average Rating</span>
            <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
          </div>
          <div className="text-3xl font-bold text-white">{stats.averageRating}</div>
        </div>

        <div className="bg-[#1A1A1A] rounded-lg p-6 border border-[#2A2A2A]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-slate-400 text-sm">Needs Response</span>
            <Clock className="w-5 h-5 text-red-400" />
          </div>
          <div className="text-3xl font-bold text-white">{stats.needsResponse}</div>
        </div>

        <div className="bg-[#1A1A1A] rounded-lg p-6 border border-[#2A2A2A]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-slate-400 text-sm">Responded</span>
            <TrendingUp className="w-5 h-5 text-[#10B981]" />
          </div>
          <div className="text-3xl font-bold text-white">{stats.responded}</div>
          <div className="text-xs text-slate-500 mt-1">
            {stats.totalReviews > 0 ? `${Math.round((stats.responded / stats.totalReviews) * 100)}% response rate` : 'N/A'}
          </div>
        </div>
      </div>

      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
          <input
            type="text"
            placeholder="Search reviews..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#E8A33C]"
          />
        </div>
        <select
          value={filterRating}
          onChange={(e) => setFilterRating(e.target.value)}
          className="px-4 py-2 bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#E8A33C]"
        >
          <option value="all">All Ratings</option>
          <option value="5">5 Stars</option>
          <option value="4">4 Stars</option>
          <option value="3">3 Stars</option>
          <option value="2">2 Stars</option>
          <option value="1">1 Star</option>
        </select>
        <select
          value={filterResponded}
          onChange={(e) => setFilterResponded(e.target.value)}
          className="px-4 py-2 bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#E8A33C]"
        >
          <option value="all">All Status</option>
          <option value="pending">Pending Response</option>
          <option value="responded">Responded</option>
        </select>
      </div>

      <div className="space-y-4">
        {filteredReviews.length === 0 ? (
          <div className="bg-[#2F5F4F] rounded-lg p-12 text-center border border-white/10">
            <MessageSquare className="w-12 h-12 text-slate-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">No Reviews Found</h3>
            <p className="text-slate-400 mb-4">
              {searchTerm || filterRating !== 'all' || filterResponded !== 'all'
                ? 'Try adjusting your filters'
                : 'Sync your Google Business Profile to see reviews'}
            </p>
          </div>
        ) : (
          filteredReviews.map((review) => (
            <div
              key={review.id}
              className="bg-[#2F5F4F] rounded-lg p-6 border border-white/10 hover:border-[#E8A33C]/30 transition"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  {review.author_photo_url ? (
                    <img
                      src={review.author_photo_url}
                      alt={review.author_name}
                      className="w-12 h-12 rounded-full"
                    />
                  ) : (
                    <div className="w-12 h-12 bg-gradient-to-br from-[#E8A33C] to-[#FFB84D] rounded-full flex items-center justify-center text-white font-semibold">
                      {review.author_name[0].toUpperCase()}
                    </div>
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-semibold text-white">{review.author_name}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-slate-600'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-xs text-slate-400">
                          {new Date(review.review_date).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    {!review.is_responded && (
                      <span className="px-2 py-1 bg-red-500/20 text-red-400 text-xs font-semibold rounded-full">
                        Needs Response
                      </span>
                    )}
                  </div>

                  {review.review_text && (
                    <p className="text-slate-300 mb-4">{review.review_text}</p>
                  )}

                  {review.is_responded && review.response_text ? (
                    <div className="bg-[#1B4332] rounded-lg p-4 border-l-4 border-[#E8A33C]">
                      <div className="flex items-center gap-2 mb-2">
                        <MessageSquare className="w-4 h-4 text-[#E8A33C]" />
                        <span className="text-sm font-semibold text-white">Your Response</span>
                        <span className="text-xs text-slate-400 ml-auto">
                          {new Date(review.response_date!).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-slate-300 text-sm">{review.response_text}</p>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setSelectedReview(review);
                          setResponseText('');
                        }}
                        className="flex items-center gap-2 px-4 py-2 bg-[#1B4332] text-white rounded-lg hover:bg-[#0F2920] transition"
                      >
                        <Edit3 className="w-4 h-4" />
                        Write Response
                      </button>
                      <button
                        onClick={() => {
                          setSelectedReview(review);
                          handleGenerateResponse(review);
                        }}
                        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#E8A33C] to-[#FFB84D] text-white rounded-lg hover:from-[#D9941A] hover:to-[#E8A33C] transition"
                      >
                        <Sparkles className="w-4 h-4" />
                        AI Generate
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {selectedReview && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#2F5F4F] rounded-xl p-6 max-w-2xl w-full border border-white/20 shadow-2xl">
            <h3 className="text-xl font-bold text-white mb-4">
              Respond to {selectedReview.author_name}'s Review
            </h3>

            <div className="mb-4 p-4 bg-[#1B4332] rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < selectedReview.rating ? 'text-yellow-400 fill-yellow-400' : 'text-slate-600'
                    }`}
                  />
                ))}
              </div>
              <p className="text-slate-300 text-sm">{selectedReview.review_text}</p>
            </div>

            <textarea
              value={responseText}
              onChange={(e) => setResponseText(e.target.value)}
              placeholder={generatingResponse ? "Generating AI response..." : "Write your response..."}
              disabled={generatingResponse}
              className="w-full h-40 px-4 py-3 bg-[#1B4332] border border-white/10 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#E8A33C] resize-none"
            />

            <div className="flex items-center justify-between mt-4">
              <button
                onClick={() => {
                  setSelectedReview(null);
                  setResponseText('');
                }}
                className="px-4 py-2 text-slate-300 hover:text-white transition"
              >
                Cancel
              </button>
              <div className="flex gap-2">
                <button
                  onClick={() => handleGenerateResponse(selectedReview)}
                  disabled={generatingResponse}
                  className="flex items-center gap-2 px-4 py-2 bg-[#1B4332] text-white rounded-lg hover:bg-[#0F2920] transition disabled:opacity-50"
                >
                  <Sparkles className={`w-4 h-4 ${generatingResponse ? 'animate-pulse' : ''}`} />
                  {generatingResponse ? 'Generating...' : 'Regenerate AI'}
                </button>
                <button
                  onClick={handlePostResponse}
                  disabled={!responseText.trim()}
                  className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-[#E8A33C] to-[#FFB84D] text-white font-semibold rounded-lg hover:from-[#D9941A] hover:to-[#E8A33C] transition disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  Post Response
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
