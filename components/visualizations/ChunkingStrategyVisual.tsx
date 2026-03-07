'use client';

import { motion } from 'framer-motion';
import { ChunkingStrategy } from '@/lib/types';
import { useState } from 'react';

interface ChunkingStrategyVisualProps {
  strategy: ChunkingStrategy;
}

type VisualizationStyle = 'prototype' | 'enhanced' | 'simplified';

export default function ChunkingStrategyVisual({ strategy }: ChunkingStrategyVisualProps) {
  const [hoveredChunk, setHoveredChunk] = useState<number | null>(null);

  return <EnhancedVisual strategy={strategy} hoveredChunk={hoveredChunk} setHoveredChunk={setHoveredChunk} />;
}

// Option 1: Exact Prototype Recreation
function PrototypeVisual({ strategy }: { strategy: ChunkingStrategy }) {
  if (strategy === 'fixed') {
    return (
      <div className="space-y-6">
        <div className="text-xs font-semibold text-base-content/50 uppercase tracking-wide">Mechanism</div>
        <div className="flex gap-0">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="flex-1 h-24 bg-blue-200 rounded-l-lg border-r-2 border-dashed border-red-400 flex items-center justify-center"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="flex-1 h-24 bg-green-200 border-r-2 border-dashed border-red-400 flex items-center justify-center"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="flex-1 h-24 bg-yellow-200 border-r-2 border-dashed border-red-400 flex items-center justify-center"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="flex-1 h-24 bg-pink-200 rounded-r-lg flex items-center justify-center"
          />
        </div>
        <div className="text-xs text-base-content/60 text-center">cuts at fixed length — ignores structure</div>
        <div className="text-sm text-base-content/80 leading-relaxed">
          The system counts tokens and cuts when the counter runs out. It doesn't read the content — it just hits.
        </div>
      </div>
    );
  } else if (strategy === 'semantic') {
    return (
      <div className="space-y-6">
        <div className="text-xs font-semibold text-base-content/50 uppercase tracking-wide">Mechanism</div>
        <div className="flex gap-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex-1 h-24 bg-blue-200 rounded-lg flex items-center justify-center text-sm font-medium text-blue-900"
          >
            Topic A
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex-1 h-24 bg-green-200 rounded-lg flex items-center justify-center text-sm font-medium text-green-900"
          >
            Topic B
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex-1 h-24 bg-yellow-200 rounded-lg flex items-center justify-center text-sm font-medium text-yellow-900"
          >
            Topic C
          </motion.div>
        </div>
        <div className="text-xs text-base-content/60 text-center">cuts where meaning shifts</div>
        <div className="text-sm text-base-content/80 leading-relaxed">
          Each sentence is converted to a vector — a numerical fingerprint of its meaning. The system compares each sentence to the next; when the similarity score drops below a threshold, a new chunk starts there.
        </div>
      </div>
    );
  } else {
    return (
      <div className="space-y-6">
        <div className="text-xs font-semibold text-base-content/50 uppercase tracking-wide">Mechanism</div>
        <div className="space-y-3">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-2"
          >
            <div className="bg-blue-100 px-3 py-1.5 rounded text-xs font-bold text-blue-700 uppercase tracking-wide text-center">
              Section Heading
            </div>
            <div className="bg-blue-200 h-16 rounded-lg" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex gap-2"
          >
            <div className="flex-1 bg-green-200 h-12 rounded-lg" />
            <div className="flex-1 bg-yellow-200 h-12 rounded-lg" />
          </motion.div>
        </div>
        <div className="text-xs text-base-content/60 text-center">respects headings, sections, tables</div>
        <div className="text-sm text-base-content/80 leading-relaxed">
          The parser reads the document's own structure — headings, section breaks, table boundaries. No counting, no similarity scores. The document defines itself.
        </div>
      </div>
    );
  }
}

// Option 2: Enhanced Interactive
function EnhancedVisual({ strategy, hoveredChunk, setHoveredChunk }: { strategy: ChunkingStrategy; hoveredChunk: number | null; setHoveredChunk: (idx: number | null) => void }) {
  if (strategy === 'fixed') {
    const chunks = [{ color: 'bg-blue-200', label: 'Chunk 1' }, { color: 'bg-green-200', label: 'Chunk 2' }, { color: 'bg-yellow-200', label: 'Chunk 3' }, { color: 'bg-pink-200', label: 'Chunk 4' }];
    return (
      <div className="space-y-6">
        <div className="text-xs font-semibold text-base-content/50 uppercase tracking-wide">Mechanism</div>
        <div className="flex gap-0 relative">
          {chunks.map((chunk, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: hoveredChunk === idx ? 1.05 : 1 }}
              transition={{ delay: idx * 0.1 }}
              onHoverStart={() => setHoveredChunk(idx)}
              onHoverEnd={() => setHoveredChunk(null)}
              className={`flex-1 h-24 ${chunk.color} ${idx === 0 ? 'rounded-l-lg' : ''} ${idx === chunks.length - 1 ? 'rounded-r-lg' : 'border-r-2 border-dashed border-red-400'} flex items-center justify-center cursor-pointer transition-all ${hoveredChunk === idx ? 'shadow-lg z-10' : ''}`}
            >
              {hoveredChunk === idx && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-xs font-bold"
                >
                  {chunk.label}
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
        <div className="text-xs text-base-content/60 text-center">cuts at fixed length — ignores structure</div>
        <div className="text-sm text-base-content/80 leading-relaxed">
          The system counts tokens and cuts when the counter runs out. Hover over chunks to see details.
        </div>
      </div>
    );
  } else if (strategy === 'semantic') {
    const topics = [{ color: 'bg-blue-200', label: 'Topic A', text: 'Contract terms' }, { color: 'bg-green-200', label: 'Topic B', text: 'Payment details' }, { color: 'bg-yellow-200', label: 'Topic C', text: 'Confidentiality' }];
    return (
      <div className="space-y-6">
        <div className="text-xs font-semibold text-base-content/50 uppercase tracking-wide">Mechanism</div>
        <div className="flex gap-3">
          {topics.map((topic, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: hoveredChunk === idx ? -5 : 0 }}
              transition={{ delay: idx * 0.1 }}
              onHoverStart={() => setHoveredChunk(idx)}
              onHoverEnd={() => setHoveredChunk(null)}
              className={`flex-1 h-24 ${topic.color} rounded-lg flex flex-col items-center justify-center text-sm font-medium cursor-pointer transition-all ${hoveredChunk === idx ? 'shadow-xl' : ''}`}
            >
              <div className="font-bold">{topic.label}</div>
              {hoveredChunk === idx && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-xs mt-1"
                >
                  {topic.text}
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
        <div className="text-xs text-base-content/60 text-center">cuts where meaning shifts</div>
        <div className="text-sm text-base-content/80 leading-relaxed">
          Hover over topics to see what each chunk contains. Boundaries detected by semantic similarity.
        </div>
      </div>
    );
  } else {
    return (
      <div className="space-y-6">
        <div className="text-xs font-semibold text-base-content/50 uppercase tracking-wide">Mechanism</div>
        <div className="space-y-3">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: hoveredChunk === 0 ? 5 : 0 }}
            transition={{ delay: 0.1 }}
            onHoverStart={() => setHoveredChunk(0)}
            onHoverEnd={() => setHoveredChunk(null)}
            className={`space-y-2 cursor-pointer transition-all ${hoveredChunk === 0 ? 'scale-105' : ''}`}
          >
            <div className="bg-blue-100 px-3 py-1.5 rounded text-xs font-bold text-blue-700 uppercase tracking-wide text-center">
              Section Heading
            </div>
            <div className="bg-blue-200 h-16 rounded-lg" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: hoveredChunk === 1 ? 5 : 0 }}
            transition={{ delay: 0.2 }}
            onHoverStart={() => setHoveredChunk(1)}
            onHoverEnd={() => setHoveredChunk(null)}
            className={`flex gap-2 cursor-pointer transition-all ${hoveredChunk === 1 ? 'scale-105' : ''}`}
          >
            <div className="flex-1 bg-green-200 h-12 rounded-lg" />
            <div className="flex-1 bg-yellow-200 h-12 rounded-lg" />
          </motion.div>
        </div>
        <div className="text-xs text-base-content/60 text-center">respects headings, sections, tables</div>
        <div className="text-sm text-base-content/80 leading-relaxed">
          Hover to see how document structure defines chunk boundaries.
        </div>
      </div>
    );
  }
}

// Option 3: Simplified Clean
function SimplifiedVisual({ strategy }: { strategy: ChunkingStrategy }) {
  if (strategy === 'fixed') {
    return (
      <div className="space-y-6">
        <div className="text-xs font-bold text-base-content uppercase tracking-wide">How it works</div>
        <div className="flex gap-1">
          {[0, 1, 2, 3].map((idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ delay: idx * 0.1, duration: 0.3 }}
              className="flex-1 h-20 bg-primary/20 rounded border-2 border-primary/40"
              style={{ borderStyle: idx < 3 ? 'dashed' : 'solid', borderRight: idx < 3 ? '2px dashed' : 'none' }}
            />
          ))}
        </div>
        <div className="text-sm text-base-content/70 leading-relaxed">
          Documents are split at fixed token counts, regardless of content structure.
        </div>
      </div>
    );
  } else if (strategy === 'semantic') {
    return (
      <div className="space-y-6">
        <div className="text-xs font-bold text-base-content uppercase tracking-wide">How it works</div>
        <div className="flex gap-3">
          {[1, 1.5, 0.8].map((width, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.15, duration: 0.4 }}
              className="h-20 bg-primary/20 rounded-lg border-2 border-primary/60"
              style={{ flex: width }}
            />
          ))}
        </div>
        <div className="text-sm text-base-content/70 leading-relaxed">
          Chunks are created when the semantic meaning shifts between sentences.
        </div>
      </div>
    );
  } else {
    return (
      <div className="space-y-6">
        <div className="text-xs font-bold text-base-content uppercase tracking-wide">How it works</div>
        <div className="space-y-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-1"
          >
            <div className="h-6 bg-primary/40 rounded w-1/3" />
            <div className="h-14 bg-primary/20 rounded border-2 border-primary/40" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex gap-2"
          >
            <div className="flex-1 h-10 bg-primary/20 rounded border-2 border-primary/40" />
            <div className="flex-1 h-10 bg-primary/20 rounded border-2 border-primary/40" />
          </motion.div>
        </div>
        <div className="text-sm text-base-content/70 leading-relaxed">
          Chunks follow the document's natural structure: headings, sections, and tables.
        </div>
      </div>
    );
  }
}
