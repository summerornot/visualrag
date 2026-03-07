'use client';

import { motion } from 'framer-motion';
import { EmbeddingType } from '@/lib/types';
import { useState } from 'react';

interface EmbeddingVisualProps {
  type: EmbeddingType;
}

export default function EmbeddingVisual({ type }: EmbeddingVisualProps) {
  const [hoveredMatch, setHoveredMatch] = useState<number | null>(null);
  return (
    <div className="space-y-6">
      <div className="text-xs font-semibold text-base-content/50 uppercase tracking-wide">Mechanism</div>

      {type === 'dense' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-3"
        >
          <div className="flex items-center justify-center">
            <svg width="200" height="80" viewBox="0 0 200 80">
              <text x="10" y="20" className="text-xs fill-gray-600">Query text</text>
              <motion.path
                d="M 100 25 L 100 55"
                stroke="#7c3aed"
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5 }}
              />
              <motion.circle
                cx="100"
                cy="60"
                r="15"
                fill="#7c3aed"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5 }}
              />
              <text x="70" y="65" className="text-xs fill-white font-mono">[0.23, 0.67, -0.45, ...]</text>
            </svg>
          </div>

          <div className="text-xs text-center text-gray-600 font-mono">
            Dense vector (768 dimensions)
          </div>

          <div className="flex gap-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: hoveredMatch === 0 ? -5 : 0 }}
              transition={{ delay: 0.7 }}
              onHoverStart={() => setHoveredMatch(0)}
              onHoverEnd={() => setHoveredMatch(null)}
              className={`flex-1 bg-green-50 border-2 border-green-400 rounded-lg p-3 cursor-pointer transition-all ${
                hoveredMatch === 0 ? 'shadow-xl' : ''
              }`}
            >
              <div className="text-xs font-mono bg-green-200 px-2 py-1 rounded self-start mb-2 inline-block">0.87</div>
              <div className="text-sm font-medium text-green-900 mb-1">"agreement ending requirements"</div>
              <div className="text-xs text-green-700">✓ Semantic similarity</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: hoveredMatch === 1 ? -5 : 0 }}
              transition={{ delay: 0.9 }}
              onHoverStart={() => setHoveredMatch(1)}
              onHoverEnd={() => setHoveredMatch(null)}
              className={`flex-1 bg-green-50 border-2 border-green-400 rounded-lg p-3 cursor-pointer transition-all ${
                hoveredMatch === 1 ? 'shadow-xl' : ''
              }`}
            >
              <div className="text-xs font-mono bg-green-200 px-2 py-1 rounded self-start mb-2 inline-block">0.82</div>
              <div className="text-sm font-medium text-green-900 mb-1">"termination clause details"</div>
              <div className="text-xs text-green-700">✓ Partial keyword match</div>
            </motion.div>
          </div>
        </motion.div>
      )}

      {type === 'sparse' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-3"
        >
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
            <div className="text-xs font-mono text-purple-700 mb-2">Sparse vector (keyword weights)</div>
            <div className="flex flex-wrap gap-2">
              {[
                { word: 'contract', weight: 1.2 },
                { word: 'termination', weight: 1.5 },
                { word: 'notice', weight: 1.1 },
                { word: 'period', weight: 0.9 }
              ].map((item, idx) => (
                <motion.div
                  key={item.word}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-purple-200 px-3 py-1 rounded-full"
                >
                  <span className="text-sm font-semibold text-purple-900">{item.word}</span>
                  <span className="text-xs text-purple-700 ml-1">({item.weight})</span>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="flex gap-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: hoveredMatch === 0 ? -5 : 0 }}
              transition={{ delay: 0.5 }}
              onHoverStart={() => setHoveredMatch(0)}
              onHoverEnd={() => setHoveredMatch(null)}
              className={`flex-1 bg-green-50 border-2 border-green-400 rounded-lg p-3 cursor-pointer transition-all ${
                hoveredMatch === 0 ? 'shadow-xl' : ''
              }`}
            >
              <div className="text-xs font-mono bg-green-200 px-2 py-1 rounded self-start mb-2 inline-block">0.89</div>
              <div className="text-sm font-medium text-green-900 mb-1">"termination clause with notice period"</div>
              <div className="text-xs text-green-700">✓ 3 keyword matches</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: hoveredMatch === 1 ? -5 : 0 }}
              transition={{ delay: 0.7 }}
              onHoverStart={() => setHoveredMatch(1)}
              onHoverEnd={() => setHoveredMatch(null)}
              className={`flex-1 bg-red-50 border-2 border-red-400 rounded-lg p-3 cursor-pointer transition-all ${
                hoveredMatch === 1 ? 'shadow-xl' : ''
              }`}
            >
              <div className="text-xs font-mono bg-red-200 px-2 py-1 rounded self-start mb-2 inline-block">0.0</div>
              <div className="text-sm font-medium text-red-900 mb-1">"agreement ending requirements"</div>
              <div className="text-xs text-red-700">✗ No shared keywords</div>
            </motion.div>
          </div>
        </motion.div>
      )}

      {type === 'hybrid' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-3"
        >
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-purple-50 border border-purple-200 rounded p-3">
              <div className="text-xs font-mono text-purple-700 mb-1">Dense</div>
              <div className="text-xs font-mono text-purple-900">[0.23, 0.67, -0.45, ...]</div>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded p-3">
              <div className="text-xs font-mono text-blue-700 mb-1">Sparse</div>
              <div className="text-xs font-mono text-blue-900">contract: 1.2, termination: 1.5</div>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <div className="text-xs font-mono text-gray-500">Combined with alpha weighting</div>
          </div>

          <div className="flex gap-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: hoveredMatch === 0 ? -5 : 0 }}
              transition={{ delay: 0.5 }}
              onHoverStart={() => setHoveredMatch(0)}
              onHoverEnd={() => setHoveredMatch(null)}
              className={`flex-1 bg-green-50 border-2 border-green-400 rounded-lg p-3 cursor-pointer transition-all ${
                hoveredMatch === 0 ? 'shadow-xl' : ''
              }`}
            >
              <div className="text-xs font-mono bg-green-200 px-2 py-1 rounded self-start mb-2 inline-block">0.93</div>
              <div className="text-sm font-medium text-green-900 mb-1">"termination clause with notice period"</div>
              <div className="text-xs text-green-700">✓ Keywords + semantic</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: hoveredMatch === 1 ? -5 : 0 }}
              transition={{ delay: 0.7 }}
              onHoverStart={() => setHoveredMatch(1)}
              onHoverEnd={() => setHoveredMatch(null)}
              className={`flex-1 bg-blue-50 border-2 border-blue-400 rounded-lg p-3 cursor-pointer transition-all ${
                hoveredMatch === 1 ? 'shadow-xl' : ''
              }`}
            >
              <div className="text-xs font-mono bg-blue-200 px-2 py-1 rounded self-start mb-2 inline-block">0.74</div>
              <div className="text-sm font-medium text-blue-900 mb-1">"agreement ending requirements"</div>
              <div className="text-xs text-blue-700">~ Semantic only</div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
