'use client';

import { motion } from 'framer-motion';
import { Reranker } from '@/lib/types';

interface RerankerVisualProps {
  reranker: Reranker;
}

export default function RerankerVisual({ reranker }: RerankerVisualProps) {
  const query = "What happens to payments when contract is terminated?";
  
  const beforeResults = [
    { rank: 1, text: 'Payment schedule and terms', score: 0.82, hasAnswer: false },
    { rank: 2, text: 'Termination procedures', score: 0.79, hasAnswer: false },
    { rank: 3, text: 'Outstanding payments due immediately upon termination', score: 0.76, hasAnswer: true },
    { rank: 4, text: 'Late payment penalties', score: 0.73, hasAnswer: false },
    { rank: 5, text: 'Invoice requirements', score: 0.70, hasAnswer: false }
  ];

  const afterResults = [
    { rank: 1, text: 'Outstanding payments due immediately upon termination', score: 0.94, hasAnswer: true, movement: '↑ 3→1', from: 3 },
    { rank: 2, text: 'Payment schedule and terms', score: 0.71, hasAnswer: false, movement: '↓ 1→2', from: 1 },
    { rank: 3, text: 'Termination procedures', score: 0.68, hasAnswer: false, movement: '↓ 2→3', from: 2 },
    { rank: 4, text: 'Late payment penalties', score: 0.65, hasAnswer: false, movement: '→ 4→4', from: 4 },
    { rank: 5, text: 'Invoice requirements', score: 0.62, hasAnswer: false, movement: '→ 5→5', from: 5 }
  ];

  if (reranker === 'off') {
    return (
      <div className="space-y-4">
        <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
          <div className="text-xs font-mono text-gray-500 mb-1">Query</div>
          <div className="text-sm font-semibold text-gray-900">{query}</div>
        </div>

        <div className="text-xs font-semibold text-gray-700 mb-2">Initial Ranking (embedding similarity)</div>
        
        <div className="space-y-2">
          {beforeResults.map((result, idx) => (
            <motion.div
              key={result.rank}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={`p-3 rounded-lg border-2 ${
                result.hasAnswer 
                  ? 'bg-yellow-50 border-yellow-400' 
                  : 'bg-gray-50 border-gray-200'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <div className={`text-xs font-mono font-bold ${
                      result.hasAnswer ? 'text-yellow-700' : 'text-gray-500'
                    }`}>
                      #{result.rank}
                    </div>
                    {result.hasAnswer && (
                      <div className="text-xs bg-yellow-200 text-yellow-800 px-2 py-0.5 rounded-full font-semibold">
                        ← answer (ranked 3rd)
                      </div>
                    )}
                  </div>
                  <div className="text-sm text-gray-700">{result.text}</div>
                </div>
                <div className="text-xs font-mono bg-white px-2 py-1 rounded border ml-2">
                  {result.score.toFixed(2)}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="bg-gray-100 border border-gray-300 rounded-lg p-3">
          <div className="text-xs text-gray-700">
            No reranking applied. Answer is ranked 3rd based on embedding similarity alone.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
        <div className="text-xs font-mono text-gray-500 mb-1">Query</div>
        <div className="text-sm font-semibold text-gray-900">{query}</div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <div className="text-xs font-semibold text-gray-700 mb-2">Before Reranking</div>
          <div className="space-y-2">
            {beforeResults.map((result, idx) => (
              <motion.div
                key={`before-${result.rank}`}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.08 }}
                className={`p-2 rounded border ${
                  result.hasAnswer 
                    ? 'bg-yellow-50 border-yellow-300' 
                    : 'bg-gray-50 border-gray-200'
                }`}
              >
                <div className="text-xs font-mono font-bold text-gray-600 mb-1">#{result.rank}</div>
                <div className="text-xs text-gray-700 leading-tight">{result.text}</div>
                <div className="text-xs font-mono text-gray-500 mt-1">{result.score.toFixed(2)}</div>
              </motion.div>
            ))}
          </div>
        </div>

        <div>
          <div className="text-xs font-semibold text-gray-700 mb-2">
            After {reranker === 'cross-encoder' ? 'Cross-Encoder' : 'LLM'} Reranking
          </div>
          <div className="space-y-2">
            {afterResults.map((result, idx) => (
              <motion.div
                key={`after-${result.rank}`}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + idx * 0.08 }}
                className={`p-2 rounded border-2 ${
                  result.hasAnswer 
                    ? 'bg-green-50 border-green-400' 
                    : 'bg-gray-50 border-gray-200'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="text-xs font-mono font-bold text-gray-600">#{result.rank}</div>
                  {result.from !== result.rank && (
                    <div className={`text-xs font-bold ${
                      result.from > result.rank ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {result.movement}
                    </div>
                  )}
                </div>
                <div className="text-xs text-gray-700 leading-tight">{result.text}</div>
                <div className="flex items-center justify-between mt-1">
                  <div className="text-xs font-mono text-gray-500">{result.score.toFixed(2)}</div>
                  {result.hasAnswer && (
                    <div className="text-xs bg-green-200 text-green-800 px-1.5 py-0.5 rounded-full font-semibold">
                      ← answer
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        className="bg-green-50 border border-green-200 rounded-lg p-3"
      >
        <div className="text-xs text-green-900">
          {reranker === 'cross-encoder' && (
            <>
              <strong>Cross-encoder reranking:</strong> Answer moved from #3 → #1. 
              Adds 50-200ms latency. Significantly improves ranking accuracy.
            </>
          )}
          {reranker === 'llm' && (
            <>
              <strong>LLM reranking:</strong> Answer moved from #3 → #1. 
              Highest accuracy but expensive (LLM call per chunk). Adds 500ms-2s latency.
            </>
          )}
          {reranker === 'self-corrective' && (
            <>
              <strong>Self-corrective reranking:</strong> Answer moved from #3 → #1, then validated. 
              If validation fails (contradictions found or incomplete answer), the system reformulates the query and retrieves again. 
              Adds significant latency (multiple LLM calls + potential re-retrieval) but ensures high-quality, validated results.
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
}
