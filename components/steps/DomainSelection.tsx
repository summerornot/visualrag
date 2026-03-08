'use client';

import { motion } from 'framer-motion';
import { Scale, MessageSquare, Heart, DollarSign } from 'lucide-react';
import { DomainId } from '@/lib/types';
import { DOMAINS } from '@/lib/data/constants';

interface DomainSelectionProps {
  onSelect: (domain: DomainId) => void;
}

const iconMap = {
  Scale,
  MessageSquare,
  Heart,
  DollarSign
};

export default function DomainSelection({ onSelect }: DomainSelectionProps) {
  return (
    <div className="min-h-screen bg-base-100 p-3 md:p-6 relative">
      {/* LinkedIn Link - Top Right */}
      <a
        href="https://www.linkedin.com/in/shreyabisht/"
        target="_blank"
        rel="noopener noreferrer"
        className="absolute top-4 right-4 md:top-6 md:right-6 hover:opacity-80 transition-opacity z-20"
        aria-label="LinkedIn Profile"
      >
        <img 
          src="https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png" 
          alt="LinkedIn"
          className="w-5 h-5 md:w-6 md:h-6"
        />
      </a>

      <div className="max-w-5xl mx-auto">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 md:mb-8 py-4 md:py-8 relative overflow-visible"
        >
          {/* Blurry gradient background */}
          <div className="absolute inset-0 -mx-8 -my-4 bg-gradient-to-br from-purple-200/40 via-blue-200/40 to-pink-200/40 blur-3xl rounded-3xl pointer-events-none" style={{ zIndex: 0 }} />
          
          <div className="text-center px-3 md:px-6 mb-4 md:mb-8 relative z-10">
            <h1 className="text-3xl md:text-5xl font-bold text-black mb-3 md:mb-4">Visual RAG</h1>
            <p className="text-sm md:text-lg text-black/80 max-w-2xl mx-auto">
              Visual tool for PMs to build intuition about how RAG design decisions shape system behavior and product outcomes
            </p>
          </div>
          
          {/* Simple RAG System Visual - Hidden on mobile */}
          <div className="hidden md:flex items-center justify-center gap-3 max-w-2xl mx-auto scale-75">
            {/* Documents */}
            <motion.div 
              className="flex flex-col items-center gap-2"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <div className="w-24 h-24 rounded-lg border-2 border-base-content/20 flex items-center justify-center bg-base-200 transition-all hover:shadow-md hover:scale-105">
                <span className="text-xs font-semibold text-center px-2">Documents</span>
              </div>
            </motion.div>
            
            {/* Arrow 1 */}
            <motion.div 
              className="flex items-center"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <div className="w-8 h-0.5 bg-gradient-to-r from-base-content/20 to-primary/30"></div>
              <div className="w-0 h-0 border-t-4 border-t-transparent border-b-4 border-b-transparent border-l-8 border-l-primary/30"></div>
            </motion.div>
            
            {/* Ingestion */}
            <motion.div 
              className="flex flex-col items-center gap-2"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <div className="w-24 h-24 rounded-lg border-2 border-primary/40 flex items-center justify-center bg-primary/5 transition-all hover:shadow-lg hover:scale-105 hover:border-primary/60">
                <span className="text-xs font-semibold text-center px-2">Ingestion</span>
              </div>
            </motion.div>
            
            {/* Arrow 2 */}
            <motion.div 
              className="flex items-center"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <div className="w-8 h-0.5 bg-gradient-to-r from-primary/30 to-primary/40"></div>
              <div className="w-0 h-0 border-t-4 border-t-transparent border-b-4 border-b-transparent border-l-8 border-l-primary/40"></div>
            </motion.div>
            
            {/* Search */}
            <motion.div 
              className="flex flex-col items-center gap-2"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.9, duration: 0.5 }}
            >
              <div className="w-24 h-24 rounded-lg border-2 border-primary/40 flex items-center justify-center bg-primary/5 transition-all hover:shadow-lg hover:scale-105 hover:border-primary/60">
                <span className="text-xs font-semibold text-center px-2">Search</span>
              </div>
            </motion.div>
            
            {/* Arrow 3 */}
            <motion.div 
              className="flex items-center"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.1, duration: 0.5 }}
            >
              <div className="w-8 h-0.5 bg-gradient-to-r from-primary/40 to-primary/40"></div>
              <div className="w-0 h-0 border-t-4 border-t-transparent border-b-4 border-b-transparent border-l-8 border-l-primary/40"></div>
            </motion.div>
            
            {/* Retrieval */}
            <motion.div 
              className="flex flex-col items-center gap-2"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2, duration: 0.5 }}
            >
              <div className="w-24 h-24 rounded-lg border-2 border-primary/40 flex items-center justify-center bg-primary/5 transition-all hover:shadow-lg hover:scale-105 hover:border-primary/60">
                <span className="text-xs font-semibold text-center px-2">Retrieval</span>
              </div>
            </motion.div>
            
            {/* Arrow 4 */}
            <motion.div 
              className="flex items-center"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.4, duration: 0.5 }}
            >
              <div className="w-8 h-0.5 bg-gradient-to-r from-primary/40 to-base-content/20"></div>
              <div className="w-0 h-0 border-t-4 border-t-transparent border-b-4 border-b-transparent border-l-8 border-l-base-content/20"></div>
            </motion.div>
            
            {/* Answer */}
            <motion.div 
              className="flex flex-col items-center gap-2"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.5, duration: 0.5 }}
            >
              <div className="w-24 h-24 rounded-lg border-2 border-base-content/20 flex items-center justify-center bg-base-200 transition-all hover:shadow-md hover:scale-105">
                <span className="text-xs font-semibold text-center px-2">Answer</span>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Domain Selection Question */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-4 md:mb-6 px-2 md:px-0 mt-4 md:mt-6"
        >
          <h2 className="text-xl md:text-2xl font-semibold text-base-content mb-2">Select the domain you want to explore</h2>
          <p className="text-sm md:text-base text-base-content/70">Legal contracts, support articles, and medical records each have different structures that influence RAG performance.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-3 px-2 md:px-0">
          {DOMAINS.map((domain, idx) => {
            const Icon = iconMap[domain.icon as keyof typeof iconMap];
            return (
              <motion.button
                key={domain.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + idx * 0.1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onSelect(domain.id)}
                className="card bg-base-200 hover:bg-primary/15 border border-base-300 hover:border-primary transition-all text-left group"
              >
                <div className="card-body p-4">
                  <div className="flex items-start gap-3">
                    <div 
                      className="p-2 rounded-lg flex-shrink-0"
                      style={{
                        backgroundColor: `${domain.color}15`,
                        boxShadow: `0 0 20px ${domain.color}40, 0 0 40px ${domain.color}20`
                      }}
                    >
                      <Icon size={20} style={{ color: domain.color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base font-semibold mb-1 text-base-content">
                        {domain.name}
                      </h3>
                      <p className="text-xs font-medium text-base-content/80 mb-0.5 leading-snug">
                        {domain.subtitle}
                      </p>
                      <p className="text-xs text-base-content/60 leading-snug">
                        {domain.description}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
