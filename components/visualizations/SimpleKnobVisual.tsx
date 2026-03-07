'use client';

import { motion } from 'framer-motion';
import { KnobId, KnobValue } from '@/lib/types';

interface SimpleKnobVisualProps {
  knobId: KnobId;
  value: KnobValue;
}

export default function SimpleKnobVisual({ knobId, value }: SimpleKnobVisualProps) {
  if (knobId === 'multiVector') {
    if (value === 'off') {
      return (
        <div className="space-y-3">
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <div className="text-sm font-mono text-gray-700 mb-2">Chunk</div>
            <div className="text-xs text-gray-600 mb-3">
              "Section 4: Termination. Either party may terminate this agreement with 30 days written notice..."
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-purple-100 border border-purple-300 rounded p-2"
            >
              <div className="text-xs font-mono text-purple-700">1 embedding vector</div>
              <div className="text-xs font-mono text-purple-900">[0.23, 0.67, -0.45, ...]</div>
            </motion.div>
          </div>
        </div>
      );
    } else if (value === 'summary') {
      return (
        <div className="space-y-3">
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <div className="text-sm font-mono text-gray-700 mb-2">Chunk</div>
            <div className="text-xs text-gray-600 mb-3">
              "Section 4: Termination. Either party may terminate this agreement with 30 days written notice..."
            </div>
            <div className="space-y-2">
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-purple-100 border border-purple-300 rounded p-2"
              >
                <div className="text-xs font-mono text-purple-700">Original embedding</div>
                <div className="text-xs font-mono text-purple-900">[0.23, 0.67, -0.45, ...]</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-blue-100 border border-blue-300 rounded p-2"
              >
                <div className="text-xs font-mono text-blue-700">Summary embedding</div>
                <div className="text-xs text-blue-600 mb-1">"Contract termination notice requirements"</div>
                <div className="text-xs font-mono text-blue-900">[0.45, 0.12, -0.78, ...]</div>
              </motion.div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="space-y-3">
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <div className="text-sm font-mono text-gray-700 mb-2">Chunk</div>
            <div className="text-xs text-gray-600 mb-3">
              "Section 4: Termination. Either party may terminate this agreement with 30 days written notice..."
            </div>
            <div className="space-y-2">
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-purple-100 border border-purple-300 rounded p-2"
              >
                <div className="text-xs font-mono text-purple-700">Original embedding</div>
                <div className="text-xs font-mono text-purple-900">[0.23, 0.67, -0.45, ...]</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-green-100 border border-green-300 rounded p-2"
              >
                <div className="text-xs font-mono text-green-700">Hypothetical question embeddings</div>
                <div className="text-xs text-green-600 mb-1">
                  • "What is the termination notice period?"<br/>
                  • "How can I end this agreement?"<br/>
                  • "What are the contract exit requirements?"
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      );
    }
  }

  if (knobId === 'queryRewriting') {
    if (value === 'off') {
      return (
        <div className="space-y-3">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-blue-50 border border-blue-200 rounded-lg p-3"
          >
            <div className="text-xs font-mono text-blue-700 mb-1">User Query</div>
            <div className="text-sm font-semibold text-blue-900">"contract end date"</div>
          </motion.div>
          <div className="flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-gray-400">
              <path d="M12 5v14m0 0l-4-4m4 4l4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-purple-50 border border-purple-200 rounded-lg p-3"
          >
            <div className="text-xs font-mono text-purple-700 mb-1">Search Query</div>
            <div className="text-sm font-semibold text-purple-900">"contract end date"</div>
            <div className="text-xs text-purple-600 mt-1">(unchanged)</div>
          </motion.div>
        </div>
      );
    } else if (value === 'expansion') {
      return (
        <div className="space-y-3">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-blue-50 border border-blue-200 rounded-lg p-3"
          >
            <div className="text-xs font-mono text-blue-700 mb-1">User Query</div>
            <div className="text-sm font-semibold text-blue-900">"contract end date"</div>
          </motion.div>
          <div className="flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-gray-400">
              <path d="M12 5v14m0 0l-4-4m4 4l4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-purple-50 border border-purple-200 rounded-lg p-3"
          >
            <div className="text-xs font-mono text-purple-700 mb-2">Expanded Queries (all searched)</div>
            <div className="space-y-1">
              {['contract end date', 'agreement termination date', 'contract expiration', 'agreement conclusion date'].map((q, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className="text-sm text-purple-900 bg-purple-100 px-2 py-1 rounded"
                >
                  • {q}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      );
    } else {
      return (
        <div className="space-y-3">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-blue-50 border border-blue-200 rounded-lg p-3"
          >
            <div className="text-xs font-mono text-blue-700 mb-1">Complex Query</div>
            <div className="text-sm font-semibold text-blue-900">"Compare Plan A and Plan B coverage"</div>
          </motion.div>
          <div className="flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-gray-400">
              <path d="M12 5v14m0 0l-4-4m4 4l4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-purple-50 border border-purple-200 rounded-lg p-3"
          >
            <div className="text-xs font-mono text-purple-700 mb-2">Decomposed Sub-Queries</div>
            <div className="space-y-1">
              {['Plan A coverage', 'Plan B coverage'].map((q, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + i * 0.15 }}
                  className="text-sm text-purple-900 bg-purple-100 px-2 py-1 rounded"
                >
                  {i + 1}. {q}
                </motion.div>
              ))}
            </div>
            <div className="text-xs text-purple-600 mt-2">Results merged after both searches complete</div>
          </motion.div>
        </div>
      );
    }
  }

  if (knobId === 'retrievalDiversity') {
    if (value === 'off') {
      return (
        <div className="space-y-3">
          <div className="text-xs font-semibold text-gray-700 mb-2">Top 5 Results (no diversity filtering)</div>
          {[
            { text: 'Termination notice requirements', score: 0.89 },
            { text: 'Termination procedures overview', score: 0.87 },
            { text: 'Early termination provisions', score: 0.85 },
            { text: 'Termination clause details', score: 0.83 },
            { text: 'Notice period for termination', score: 0.81 }
          ].map((result, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-yellow-50 border border-yellow-300 rounded p-2"
            >
              <div className="text-xs text-gray-700">{result.text}</div>
              <div className="text-xs font-mono text-gray-500 mt-1">{result.score}</div>
            </motion.div>
          ))}
          <div className="bg-yellow-100 border border-yellow-300 rounded p-2">
            <div className="text-xs text-yellow-900">⚠️ All results about termination - redundant information</div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="space-y-3">
          <div className="text-xs font-semibold text-gray-700 mb-2">Top 5 Results (with {value === 'mmr' ? 'MMR' : 'clustering'} diversity)</div>
          {[
            { text: 'Termination notice requirements', score: 0.89, topic: 'termination' },
            { text: 'Payment terms and schedule', score: 0.78, topic: 'payment' },
            { text: 'Confidentiality obligations', score: 0.72, topic: 'confidentiality' },
            { text: 'Dispute resolution procedures', score: 0.68, topic: 'disputes' },
            { text: 'Intellectual property rights', score: 0.65, topic: 'IP' }
          ].map((result, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-green-50 border border-green-300 rounded p-2"
            >
              <div className="flex items-center justify-between">
                <div className="text-xs text-gray-700">{result.text}</div>
                <div className="text-xs bg-green-200 px-2 py-0.5 rounded">{result.topic}</div>
              </div>
              <div className="text-xs font-mono text-gray-500 mt-1">{result.score}</div>
            </motion.div>
          ))}
          <div className="bg-green-100 border border-green-300 rounded p-2">
            <div className="text-xs text-green-900">✓ Diverse topics covered - comprehensive view</div>
          </div>
        </div>
      );
    }
  }

  if (knobId === 'contextEnrichment') {
    if (value === 'off') {
      return (
        <div className="space-y-3">
          <div className="text-xs font-semibold text-gray-700 mb-2">Retrieved Chunk (no enrichment)</div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-blue-100 border-2 border-blue-400 rounded p-3"
          >
            <div className="text-xs font-mono text-blue-700 mb-1">Chunk 5</div>
            <div className="text-sm text-gray-700">
              Either party may terminate this agreement with 30 days written notice.
            </div>
          </motion.div>
        </div>
      );
    } else if (value === 'neighbor') {
      return (
        <div className="space-y-3">
          <div className="text-xs font-semibold text-gray-700 mb-2">Retrieved with Neighbor Chunks</div>
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gray-100 border border-gray-300 rounded p-2"
          >
            <div className="text-xs font-mono text-gray-500 mb-1">Chunk 4 (before)</div>
            <div className="text-xs text-gray-600">
              Section 4: Termination. This section governs contract ending.
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-blue-100 border-2 border-blue-400 rounded p-3"
          >
            <div className="text-xs font-mono text-blue-700 mb-1">Chunk 5 (retrieved)</div>
            <div className="text-sm text-gray-700">
              Either party may terminate this agreement with 30 days written notice.
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gray-100 border border-gray-300 rounded p-2"
          >
            <div className="text-xs font-mono text-gray-500 mb-1">Chunk 6 (after)</div>
            <div className="text-xs text-gray-600">
              Upon termination, all outstanding payments become immediately due.
            </div>
          </motion.div>
        </div>
      );
    } else {
      return (
        <div className="space-y-3">
          <div className="text-xs font-semibold text-gray-700 mb-2">Retrieved with Parent Document</div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-purple-50 border-2 border-purple-400 rounded p-3"
          >
            <div className="text-xs font-mono text-purple-700 mb-2">Entire Section 4 (parent document)</div>
            <div className="text-sm text-gray-700 space-y-2">
              <div className="bg-blue-100 border border-blue-300 rounded p-2">
                <div className="text-xs font-mono text-blue-700 mb-1">Chunk 5 (retrieved)</div>
                <div className="text-xs">Either party may terminate this agreement with 30 days written notice.</div>
              </div>
              <div className="text-xs text-gray-600">
                Section 4: Termination. This section governs contract ending. Either party may terminate this agreement with 30 days written notice. Upon termination, all outstanding payments become immediately due. The terminating party must provide written justification...
              </div>
            </div>
          </motion.div>
          <div className="bg-purple-100 border border-purple-300 rounded p-2">
            <div className="text-xs text-purple-900">Full context provided, but uses more tokens</div>
          </div>
        </div>
      );
    }
  }

  return null;
}
