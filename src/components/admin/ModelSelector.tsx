'use client';

import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { Sparkles, Info, Zap, DollarSign, TrendingUp } from 'lucide-react';

interface ModelConfig {
  id: string;
  use_case: string;
  model_name: string;
  model_provider: string;
  is_active: boolean;
  is_legacy: boolean;
  cost_per_1k_tokens: number;
  speed_rating: string;
  quality_rating: string;
  recommended_for: string;
  usage_count: number;
  total_cost: number;
}

interface ModelSelectorProps {
  useCase: 'review_response' | 'blog_content' | 'social_media' | 'sentiment_analysis' | 'kb_chat' | 'embeddings';
  currentModel?: string;
  onModelChange: (modelName: string) => void;
  showGuidance?: boolean;
}

export default function ModelSelector({
  useCase,
  currentModel,
  onModelChange,
  showGuidance = true
}: ModelSelectorProps) {
  const [models, setModels] = useState<ModelConfig[]>([]);
  const [selectedModel, setSelectedModel] = useState(currentModel || '');
  const [loading, setLoading] = useState(true);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    loadModels();
  }, [useCase]);

  const loadModels = async () => {
    try {
      const { data, error } = await supabase
        ?.from('ai_model_config')
        .select('*')
        .eq('use_case', useCase)
        .order('is_active', { ascending: false })
        .order('is_legacy', { ascending: true }) || {};

      if (error) throw error;
      if (data) {
        setModels(data);
        const activeModel = data.find(m => m.is_active);
        if (activeModel && !selectedModel) {
          setSelectedModel(activeModel.model_name);
          onModelChange(activeModel.model_name);
        }
      }
    } catch (error) {
      console.error('Error loading models:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleModelChange = (modelName: string) => {
    setSelectedModel(modelName);
    onModelChange(modelName);
  };

  const getSpeedColor = (speed: string) => {
    const colors = {
      fastest: 'text-green-400',
      fast: 'text-[#E8A33C]',
      medium: 'text-yellow-400',
      slow: 'text-red-400'
    };
    return colors[speed as keyof typeof colors] || 'text-slate-400';
  };

  const getQualityColor = (quality: string) => {
    const colors = {
      best: 'text-[#E8A33C]',
      excellent: 'text-green-400',
      good: 'text-blue-400',
      basic: 'text-slate-400'
    };
    return colors[quality as keyof typeof colors] || 'text-slate-400';
  };

  const getCostRating = (cost: number) => {
    if (cost < 0.1) return { rating: '$', color: 'text-green-400' };
    if (cost < 1.0) return { rating: '$$', color: 'text-[#E8A33C]' };
    if (cost < 3.0) return { rating: '$$$', color: 'text-yellow-400' };
    return { rating: '$$$$', color: 'text-red-400' };
  };

  if (loading) {
    return (
      <div className="flex items-center gap-2 text-slate-400">
        <Sparkles className="w-4 h-4 animate-pulse" />
        <span className="text-sm">Loading AI models...</span>
      </div>
    );
  }

  const recommendedModel = models.find(m => m.is_active && !m.is_legacy);
  const currentModelData = models.find(m => m.model_name === selectedModel);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2 text-sm font-medium text-slate-300">
          <Sparkles className="w-4 h-4 text-[#E8A33C]" />
          AI Model Selection
        </label>
        {showGuidance && (
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="flex items-center gap-1 text-xs text-slate-400 hover:text-[#E8A33C] transition"
          >
            <Info className="w-3 h-3" />
            {showDetails ? 'Hide' : 'Show'} Details
          </button>
        )}
      </div>

      <select
        value={selectedModel}
        onChange={(e) => handleModelChange(e.target.value)}
        className="w-full px-4 py-2 bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#E8A33C]"
      >
        {models.map((model) => (
          <option key={model.id} value={model.model_name}>
            {model.model_name}
            {model.is_active ? ' (Recommended)' : ''}
            {model.is_legacy ? ' (Legacy)' : ''}
          </option>
        ))}
      </select>

      {currentModelData && showGuidance && (
        <div className="bg-[#232323] border border-[#2A2A2A] rounded-lg p-4 space-y-3">
          <div className="flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-[#E8A33C] flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm text-slate-300 mb-2">{currentModelData.recommended_for}</p>

              <div className="grid grid-cols-3 gap-3">
                <div className="flex items-center gap-2">
                  <Zap className={`w-4 h-4 ${getSpeedColor(currentModelData.speed_rating)}`} />
                  <div>
                    <div className="text-xs text-slate-500">Speed</div>
                    <div className={`text-sm font-medium ${getSpeedColor(currentModelData.speed_rating)}`}>
                      {currentModelData.speed_rating}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <DollarSign className={`w-4 h-4 ${getCostRating(currentModelData.cost_per_1k_tokens).color}`} />
                  <div>
                    <div className="text-xs text-slate-500">Cost</div>
                    <div className={`text-sm font-medium ${getCostRating(currentModelData.cost_per_1k_tokens).color}`}>
                      {getCostRating(currentModelData.cost_per_1k_tokens).rating}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <TrendingUp className={`w-4 h-4 ${getQualityColor(currentModelData.quality_rating)}`} />
                  <div>
                    <div className="text-xs text-slate-500">Quality</div>
                    <div className={`text-sm font-medium ${getQualityColor(currentModelData.quality_rating)}`}>
                      {currentModelData.quality_rating}
                    </div>
                  </div>
                </div>
              </div>

              {currentModelData.is_legacy && (
                <div className="mt-3 px-3 py-2 bg-yellow-500/10 border border-yellow-500/30 rounded text-xs text-yellow-400">
                  ⚠️ Legacy Model: Consider upgrading to {recommendedModel?.model_name} for better performance
                </div>
              )}

              {showDetails && (
                <div className="mt-3 pt-3 border-t border-[#2A2A2A]">
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-slate-500">Usage:</span>
                      <span className="text-slate-300 ml-2">{currentModelData.usage_count.toLocaleString()} times</span>
                    </div>
                    <div>
                      <span className="text-slate-500">Total Cost:</span>
                      <span className="text-slate-300 ml-2">${currentModelData.total_cost.toFixed(2)}</span>
                    </div>
                    <div>
                      <span className="text-slate-500">Per 1K tokens:</span>
                      <span className="text-slate-300 ml-2">${currentModelData.cost_per_1k_tokens.toFixed(4)}</span>
                    </div>
                    <div>
                      <span className="text-slate-500">Provider:</span>
                      <span className="text-slate-300 ml-2">{currentModelData.model_provider}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {showGuidance && recommendedModel && selectedModel !== recommendedModel.model_name && (
        <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3">
          <p className="text-xs text-blue-400">
            💡 Tip: <strong>{recommendedModel.model_name}</strong> is recommended for this use case for optimal balance of speed, cost, and quality.
          </p>
        </div>
      )}
    </div>
  );
}
