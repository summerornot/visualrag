'use client';

import { motion } from 'framer-motion';
import { ChunkSize } from '@/lib/types';

interface ChunkSizeVisualProps {
  size: ChunkSize;
}

export default function ChunkSizeVisual({ size }: ChunkSizeVisualProps) {
  const getSizeConfig = () => {
    if (size === 'small') {
      return {
        chunks: [
          { text: 'Section 4: Termination. Either party may...' },
          { text: 'terminate this agreement with 30 days...' },
          { text: 'written notice. Upon termination, all...' },
          { text: 'outstanding payments become immediately due.' }
        ],
        color: '#fbbf24',
        label: '50-100 characters',
        description: 'Very granular, high precision'
      };
    } else if (size === 'medium') {
      return {
        chunks: [
          { text: 'Section 4: Termination. Either party may terminate this agreement with 30 days written notice. Upon termination, all outstanding payments become immediately due. The terminating party must provide written justification...' },
          { text: 'Section 5: Confidentiality. Both parties agree to maintain strict confidentiality of all proprietary information disclosed during the term of this agreement...' }
        ],
        color: '#60a5fa',
        label: '200-300 characters',
        description: 'Balanced precision and context'
      };
    } else {
      return {
        chunks: [
          { text: 'Section 4: Termination. Either party may terminate this agreement with 30 days written notice. Upon termination, all outstanding payments become immediately due. The terminating party must provide written justification. Section 5: Confidentiality. Both parties agree to maintain strict confidentiality of all proprietary information disclosed during the term of this agreement. This includes but is not limited to trade secrets, business plans, customer data, and technical specifications. The confidentiality obligation survives termination for a period of 5 years...' }
        ],
        color: '#a78bfa',
        label: '500-800 characters',
        description: 'Large context, lower precision'
      };
    }
  };

  const config = getSizeConfig();

  return (
    <div className="space-y-6">
      <div className="text-xs font-semibold text-base-content/50 uppercase tracking-wide">Mechanism</div>
      
      {/* Horizontal card layout */}
      <div className="flex gap-3">
        {config.chunks.map((chunk, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="flex-1"
          >
            <div 
              className="min-h-32 rounded-lg border-2 p-3 flex flex-col gap-2"
              style={{ 
                backgroundColor: `${config.color}20`,
                borderColor: config.color
              }}
            >
              <div className="text-xs font-bold" style={{ color: config.color }}>
                Chunk {idx + 1}
              </div>
              <div className="text-xs text-base-content/70 leading-relaxed">
                {chunk.text}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="text-xs text-base-content/60 text-center">
        {config.label} — {config.description}
      </div>

      <div className="text-sm text-base-content/80 leading-relaxed">
        {size === 'small' && 'Very granular chunks provide high precision but may miss broader context.'}
        {size === 'medium' && 'Balanced chunks capture complete thoughts while maintaining reasonable context.'}
        {size === 'large' && 'Large chunks preserve extensive context but may include irrelevant information.'}
      </div>
    </div>
  );
}
