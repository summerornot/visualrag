'use client';

import { motion } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';
import { DomainId, QueryTypeId } from '@/lib/types';
import { DOMAINS, QUERY_TYPES } from '@/lib/data/constants';

interface QueryTypeSelectionProps {
  domain: DomainId;
  selectedTypes: QueryTypeId[];
  onToggle: (typeId: QueryTypeId) => void;
  onBack: () => void;
  onContinue: () => void;
}

export default function QueryTypeSelection({
  domain,
  selectedTypes,
  onToggle,
  onBack,
  onContinue
}: QueryTypeSelectionProps) {
  const domainInfo = DOMAINS.find(d => d.id === domain)!;

  return (
    <div className="min-h-screen bg-base-100 p-3 md:p-6">
      <div className="max-w-5xl mx-auto">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={onBack}
          className="btn btn-ghost btn-sm gap-2 mb-4 md:mb-6"
        >
          <ChevronLeft size={16} className="md:w-[18px] md:h-[18px]" />
          <span className="text-xs md:text-sm">Back to domain selection</span>
        </motion.button>

        {/* Query Type Selection Question */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-3 md:mb-4 px-2 md:px-0"
        >
          <div className="flex items-center gap-2 mb-2">
            <div className="badge badge-primary badge-sm md:badge-md">
              {domainInfo.name}
            </div>
          </div>
          <h2 className="text-xl md:text-2xl font-semibold text-base-content mb-2">What kinds of questions should the RAG system answer?</h2>
          <p className="text-sm md:text-base text-base-content/70">
            Different query patterns stress retrieval systems in different ways. Select the types of questions you want to explore.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-3 mb-4 md:mb-6 px-2 md:px-0">
          {QUERY_TYPES.map((queryType, idx) => {
            const isSelected = selectedTypes.includes(queryType.id);
            return (
              <motion.button
                key={queryType.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + idx * 0.05 }}
                onClick={() => onToggle(queryType.id)}
                className={`w-full card bg-base-200 hover:bg-primary/15 border transition-all text-left ${
                  isSelected
                    ? 'border-primary bg-primary/10'
                    : 'border-base-300 hover:border-primary'
                }`}
              >
                <div className="card-body p-3">
                  <div className="flex items-start gap-2">
                    <div className={`mt-0.5 w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 ${
                      isSelected
                        ? 'bg-primary border-primary'
                        : 'border-base-content/30'
                    }`}>
                      {isSelected && (
                        <svg className="w-2.5 h-2.5 text-primary-content" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-semibold text-base-content mb-0.5">{queryType.name}</h3>
                      <p className="text-xs text-base-content/70 mb-1 leading-snug">{queryType.description}</p>
                      <p className="text-xs text-base-content/50 font-mono">{queryType.example}</p>
                    </div>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex justify-start px-2 md:px-0"
        >
          <button
            onClick={onContinue}
            disabled={selectedTypes.length === 0}
            className="w-full md:w-auto px-4 md:px-6 py-2 md:py-2.5 rounded-lg text-sm md:text-base font-medium transition-all bg-primary/10 text-base-content border border-primary hover:bg-primary hover:text-primary-content active:bg-primary/80 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Start Exploring
          </button>
        </motion.div>
      </div>
    </div>
  );
}
