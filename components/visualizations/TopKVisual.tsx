'use client';

import { motion } from 'framer-motion';
import { TopK } from '@/lib/types';
import { useState } from 'react';

interface TopKVisualProps {
  k: TopK;
}

export default function TopKVisual({ k }: TopKVisualProps) {
  const [hoveredResult, setHoveredResult] = useState<number | null>(null);
  const allResults = [
    { rank: 1, text: '30 days written notice required', score: 0.89, hasAnswer: true },
    { rank: 2, text: 'Termination procedures overview', score: 0.76, hasAnswer: false },
    { rank: 3, text: 'Notice requirements for amendments', score: 0.71, hasAnswer: false },
    { rank: 4, text: 'Early termination with 30-day notice', score: 0.68, hasAnswer: true },
    { rank: 5, text: 'Payment terms upon termination', score: 0.65, hasAnswer: false },
    { rank: 6, text: 'Confidentiality after termination', score: 0.62, hasAnswer: false },
    { rank: 7, text: 'Dispute resolution procedures', score: 0.58, hasAnswer: false },
    { rank: 8, text: 'Force majeure provisions', score: 0.54, hasAnswer: false },
    { rank: 9, text: 'Governing law and jurisdiction', score: 0.51, hasAnswer: false },
    { rank: 10, text: 'Amendment procedures', score: 0.48, hasAnswer: false },
    { rank: 11, text: 'Severability clause', score: 0.45, hasAnswer: false },
    { rank: 12, text: 'Entire agreement clause', score: 0.42, hasAnswer: false },
    { rank: 13, text: 'Assignment restrictions', score: 0.39, hasAnswer: false },
    { rank: 14, text: 'Waiver provisions', score: 0.36, hasAnswer: false },
    { rank: 15, text: 'Notice delivery methods', score: 0.33, hasAnswer: false },
    { rank: 16, text: 'Counterparts clause', score: 0.30, hasAnswer: false },
    { rank: 17, text: 'Headings interpretation', score: 0.27, hasAnswer: false },
    { rank: 18, text: 'Survival of obligations', score: 0.24, hasAnswer: false },
    { rank: 19, text: 'Third party beneficiaries', score: 0.21, hasAnswer: false },
    { rank: 20, text: 'Execution formalities', score: 0.18, hasAnswer: false }
  ];

  const retrieved = allResults.slice(0, k);
  const missed = allResults.slice(k).find(r => r.hasAnswer);

  return (
    <div className="space-y-6">
      <div className="text-xs font-semibold text-base-content/50 uppercase tracking-wide">Mechanism</div>

      <div className="text-xs text-base-content/60 text-center">
        Retrieving top {k} results — {retrieved.filter(r => r.hasAnswer).length} answer(s) found
      </div>

      <div className="flex gap-2 flex-wrap">
        {retrieved.map((result, idx) => (
          <motion.div
            key={result.rank}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ 
              opacity: 1, 
              scale: hoveredResult === idx ? 1.05 : 1,
              y: hoveredResult === idx ? -3 : 0
            }}
            transition={{ delay: idx * 0.05 }}
            onHoverStart={() => setHoveredResult(idx)}
            onHoverEnd={() => setHoveredResult(null)}
            className={`flex-shrink-0 w-32 h-24 rounded-lg border-2 p-2 cursor-pointer transition-all ${
              result.hasAnswer 
                ? 'bg-green-50 border-green-400' 
                : 'bg-base-200 border-base-300'
            } ${
              hoveredResult === idx ? 'shadow-xl' : ''
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <div className="text-xs font-bold text-base-content">#{result.rank}</div>
              <div className="text-xs font-mono bg-white px-1.5 py-0.5 rounded">
                {result.score.toFixed(2)}
              </div>
            </div>
            <div className="text-xs text-base-content/80 line-clamp-2">{result.text}</div>
            {result.hasAnswer && (
              <div className="mt-1 text-xs font-semibold text-green-700">✓</div>
            )}
          </motion.div>
        ))}
      </div>

      {missed && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: k * 0.08 + 0.3 }}
          className="bg-red-50 border-2 border-red-400 rounded-lg p-3"
        >
          <div className="text-xs font-semibold text-red-900 mb-2">⚠️ Missed Answer</div>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="text-xs font-mono font-bold text-red-700 mb-1">#{missed.rank}</div>
              <div className="text-sm text-red-800">{missed.text}</div>
            </div>
            <div className="text-xs font-mono bg-white px-2 py-1 rounded border border-red-300 ml-2">
              {missed.score.toFixed(2)}
            </div>
          </div>
          <div className="text-xs text-red-700 mt-2">
            This answer was ranked #{missed.rank} but not retrieved with k={k}
          </div>
        </motion.div>
      )}

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
        <div className="text-xs text-blue-900">
          {k === 3 && '⚡ Minimal context usage, but high risk of missing answers ranked 4+'}
          {k === 5 && '✓ Balanced choice for most queries'}
          {k === 10 && '📊 Better coverage for complex queries, higher context usage'}
          {k === 20 && '📚 Comprehensive retrieval, significant context window usage'}
        </div>
      </div>
    </div>
  );
}
