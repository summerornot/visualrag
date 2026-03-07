'use client';

import { motion } from 'framer-motion';
import { IndexType } from '@/lib/types';

interface IndexVisualProps {
  type: IndexType;
}

export default function IndexVisual({ type }: IndexVisualProps) {
  return (
    <div className="space-y-4">
      {type === 'flat' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-3"
        >
          <div className="text-xs font-semibold text-gray-700 mb-2">Brute Force Search</div>
          <svg width="100%" height="200" viewBox="0 0 400 200">
            <motion.circle cx="50" cy="100" r="8" fill="#ef4444" initial={{ scale: 0 }} animate={{ scale: 1 }} />
            <text x="50" y="130" className="text-xs fill-gray-600 text-anchor-middle">Query</text>
            
            {[...Array(20)].map((_, i) => {
              const x = 150 + (i % 5) * 50;
              const y = 40 + Math.floor(i / 5) * 40;
              return (
                <g key={i}>
                  <motion.line
                    x1="50" y1="100" x2={x} y2={y}
                    stroke="#94a3b8"
                    strokeWidth="1"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ delay: i * 0.05, duration: 0.3 }}
                  />
                  <motion.circle
                    cx={x} cy={y} r="6"
                    fill="#cbd5e1"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: i * 0.05 }}
                  />
                </g>
              );
            })}
          </svg>
          <div className="bg-yellow-50 border border-yellow-200 rounded p-3">
            <div className="text-xs text-yellow-900">
              <strong>Compares against all vectors.</strong> Perfect accuracy but slow for large datasets.
              Latency grows linearly with corpus size.
            </div>
          </div>
        </motion.div>
      )}

      {type === 'ivf' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-3"
        >
          <div className="text-xs font-semibold text-gray-700 mb-2">Clustered Search (Voronoi Cells)</div>
          <svg width="100%" height="220" viewBox="0 0 400 220">
            <motion.circle cx="50" cy="110" r="8" fill="#ef4444" initial={{ scale: 0 }} animate={{ scale: 1 }} />
            <text x="50" y="140" className="text-xs fill-gray-600 text-anchor-middle">Query</text>
            
            {/* Cluster 1 - searched */}
            <motion.rect
              x="140" y="20" width="100" height="80"
              fill="#dbeafe" stroke="#3b82f6" strokeWidth="2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            />
            <text x="190" y="15" className="text-xs fill-blue-600 text-anchor-middle">Cluster 1</text>
            {[...Array(6)].map((_, i) => (
              <motion.circle
                key={i}
                cx={160 + (i % 3) * 25} cy={40 + Math.floor(i / 3) * 25}
                r="5" fill="#3b82f6"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5 + i * 0.05 }}
              />
            ))}
            
            {/* Cluster 2 - searched */}
            <motion.rect
              x="140" y="120" width="100" height="80"
              fill="#dbeafe" stroke="#3b82f6" strokeWidth="2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            />
            <text x="190" y="115" className="text-xs fill-blue-600 text-anchor-middle">Cluster 2</text>
            {[...Array(6)].map((_, i) => (
              <motion.circle
                key={i}
                cx={160 + (i % 3) * 25} cy={140 + Math.floor(i / 3) * 25}
                r="5" fill="#3b82f6"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5 + i * 0.05 }}
              />
            ))}
            
            {/* Cluster 3 - skipped */}
            <motion.rect
              x="270" y="70" width="100" height="80"
              fill="#f1f5f9" stroke="#94a3b8" strokeWidth="1" strokeDasharray="4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              transition={{ delay: 0.3 }}
            />
            <text x="320" y="65" className="text-xs fill-gray-400 text-anchor-middle">Cluster 3 (skipped)</text>
            {[...Array(6)].map((_, i) => (
              <circle
                key={i}
                cx={290 + (i % 3) * 25} cy={90 + Math.floor(i / 3) * 25}
                r="5" fill="#cbd5e1" opacity="0.5"
              />
            ))}

            <motion.path
              d="M 50 110 L 190 60"
              stroke="#3b82f6" strokeWidth="2"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 0.2, duration: 0.4 }}
            />
          </svg>
          <div className="bg-blue-50 border border-blue-200 rounded p-3">
            <div className="text-xs text-blue-900">
              <strong>Only searches nearest clusters.</strong> 10-100x faster than flat.
              ~95-98% recall. Good for 100K-10M chunks.
            </div>
          </div>
        </motion.div>
      )}

      {type === 'hnsw' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-3"
        >
          <div className="text-xs font-semibold text-gray-700 mb-2">Hierarchical Graph Navigation</div>
          <svg width="100%" height="220" viewBox="0 0 400 220">
            <motion.circle cx="50" cy="110" r="8" fill="#ef4444" initial={{ scale: 0 }} animate={{ scale: 1 }} />
            <text x="50" y="140" className="text-xs fill-gray-600 text-anchor-middle">Query</text>
            
            {/* Layer 2 (top) */}
            <text x="200" y="25" className="text-xs fill-purple-600 text-anchor-middle">Layer 2 (coarse)</text>
            {[0, 1, 2].map((i) => (
              <motion.circle
                key={i}
                cx={150 + i * 80} cy={45}
                r="6" fill="#a78bfa"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 + i * 0.1 }}
              />
            ))}
            <motion.path d="M 150 45 L 230 45 L 310 45" stroke="#a78bfa" strokeWidth="1.5" fill="none"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.5 }} />
            
            {/* Layer 1 (middle) */}
            <text x="200" y="85" className="text-xs fill-purple-600 text-anchor-middle">Layer 1 (medium)</text>
            {[0, 1, 2, 3, 4].map((i) => (
              <motion.circle
                key={i}
                cx={120 + i * 50} cy={105}
                r="5" fill="#c4b5fd"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.6 + i * 0.08 }}
              />
            ))}
            <motion.path d="M 120 105 L 170 105 L 220 105 L 270 105 L 320 105" stroke="#c4b5fd" strokeWidth="1.5" fill="none"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.9 }} />
            
            {/* Layer 0 (bottom) */}
            <text x="200" y="145" className="text-xs fill-purple-600 text-anchor-middle">Layer 0 (fine)</text>
            {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
              <motion.circle
                key={i}
                cx={100 + i * 35} cy={170}
                r="4" fill="#e9d5ff"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1.1 + i * 0.05 }}
              />
            ))}
            
            {/* Navigation path */}
            <motion.path
              d="M 50 110 L 150 45 L 230 45 L 220 105 L 170 105 L 170 170"
              stroke="#10b981" strokeWidth="2.5" fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 1.5, duration: 0.8 }}
            />
            <motion.circle
              cx="170" cy="170" r="6" fill="#10b981"
              initial={{ scale: 0 }}
              animate={{ scale: 1.5 }}
              transition={{ delay: 2.3 }}
            />
          </svg>
          <div className="bg-green-50 border border-green-200 rounded p-3">
            <div className="text-xs text-green-900">
              <strong>Graph-based navigation.</strong> Very fast with ~99% recall.
              Excellent for 100K-100M+ chunks. Best for production.
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
