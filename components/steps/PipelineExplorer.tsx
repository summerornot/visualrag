'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronDown, ChevronRight } from 'lucide-react';
import { DomainId, QueryTypeId, KnobId, KnobState, KnobValue } from '@/lib/types';
import { DOMAINS, DEFAULT_KNOBS, KNOB_DEFINITIONS, PIPELINE_STAGES } from '@/lib/data/constants';
import { CONSEQUENCES } from '@/lib/data/consequences';
import { getInteractions } from '@/lib/data/interactions';
import ChunkingStrategyVisual from '../visualizations/ChunkingStrategyVisual';
import ChunkSizeVisual from '../visualizations/ChunkSizeVisual';
import EmbeddingVisual from '../visualizations/EmbeddingVisual';
import IndexVisual from '../visualizations/IndexVisual';
import TopKVisual from '../visualizations/TopKVisual';
import RerankerVisual from '../visualizations/RerankerVisual';
import SimpleKnobVisual from '../visualizations/SimpleKnobVisual';
import RangeSlider from '../RangeSlider';

interface PipelineExplorerProps {
  domain: DomainId;
  queryTypes: QueryTypeId[];
  onBack: () => void;
}

export default function PipelineExplorer({ domain, queryTypes, onBack }: PipelineExplorerProps) {
  const [knobs, setKnobs] = useState<KnobState>(DEFAULT_KNOBS);
  const [activeKnob, setActiveKnob] = useState<KnobId>('chunkingStrategy');
  const [expandedStage, setExpandedStage] = useState<string>('ingestion');

  const domainInfo = DOMAINS.find(d => d.id === domain)!;
  const activeKnobDef = KNOB_DEFINITIONS.find(k => k.id === activeKnob)!;
  const activeValue = knobs[activeKnob];
  
  // For topK, find the closest matching key since range slider can return any number
  const getConsequenceKey = () => {
    if (activeKnob === 'topK') {
      const topKValue = activeValue as number;
      const availableKeys = [3, 5, 10, 20];
      // Find closest key
      const closest = availableKeys.reduce((prev, curr) => 
        Math.abs(curr - topKValue) < Math.abs(prev - topKValue) ? curr : prev
      );
      return String(closest);
    }
    return String(activeValue);
  };
  
  const consequenceData = CONSEQUENCES[activeKnob][getConsequenceKey()];
  const interactions = getInteractions(knobs);

  const changedKnobs = new Set(
    Object.entries(knobs)
      .filter(([key, value]) => value !== DEFAULT_KNOBS[key as KnobId])
      .map(([key]) => key)
  );

  const updateKnob = (knobId: KnobId, value: KnobValue) => {
    setKnobs(prev => ({ ...prev, [knobId]: value }));
  };

  const renderKnobControl = (knobId: KnobId) => {
    const knobDef = KNOB_DEFINITIONS.find(k => k.id === knobId)!;
    const isActive = activeKnob === knobId;
    const isChanged = changedKnobs.has(knobId);

    // Horizontal badge layout for categorical choices
    const useHorizontalLayout = [
      'chunkingStrategy',
      'chunkSize',
      'embeddingType',
      'indexType',
      'topK',
      'multiVector',
      'queryRewriting',
      'retrievalMode',
      'retrievalDiversity',
      'reranker',
      'contextEnrichment'
    ].includes(knobId);

    // Horizontal badges for all knobs
    if (useHorizontalLayout) {
      return (
        <div key={knobId} className="pt-3 relative">
          <button
            onClick={() => setActiveKnob(knobId)}
            className={`w-full text-left mb-2 px-2 py-1 rounded transition-colors ${
              isActive ? '' : 'hover:bg-base-300'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className={`text-sm font-bold ${
                isActive ? 'text-primary' : 'text-base-content'
              }`}>
                {knobDef.name}
              </span>
              {isChanged && (
                <div className="w-2 h-2 rounded-full bg-primary" />
              )}
            </div>
          </button>
          <div className="flex flex-wrap gap-1.5 relative">
            {knobDef.options.map(option => {
              const isSelected = knobs[knobId] === option.value;
              return (
                <button
                  key={String(option.value)}
                  onClick={() => {
                    updateKnob(knobId, option.value);
                    setActiveKnob(knobId);
                  }}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                    isSelected
                      ? 'bg-primary text-primary-content'
                      : 'bg-base-300 text-base-content hover:bg-base-content/10'
                  }`}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        </div>
      );
    }

    // Fallback to vertical layout (shouldn't be used now)
    return (
      <div key={knobId} className="pt-3">
        <button
          onClick={() => setActiveKnob(knobId)}
          className={`w-full text-left mb-2 px-2 py-1 rounded transition-colors ${
            isActive ? '' : 'hover:bg-base-300'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className={`text-sm font-bold ${
              isActive ? 'text-primary' : 'text-base-content'
            }`}>
              {knobDef.name}
            </span>
            {isChanged && (
              <div className="w-2 h-2 rounded-full bg-primary" />
            )}
          </div>
        </button>
        <div className="space-y-1">
          {knobDef.options.map(option => {
            const isSelected = knobs[knobId] === option.value;
            return (
              <button
                key={String(option.value)}
                onClick={() => {
                  updateKnob(knobId, option.value);
                  setActiveKnob(knobId);
                }}
                className={`btn btn-sm w-full justify-start ${
                  isSelected
                    ? 'btn-primary'
                    : 'btn-ghost bg-base-300 hover:bg-base-content/10'
                }`}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  const renderVisualization = () => {
    if (activeKnob === 'chunkingStrategy') {
      return <ChunkingStrategyVisual strategy={activeValue as any} />;
    } else if (activeKnob === 'chunkSize') {
      return <ChunkSizeVisual size={activeValue as any} />;
    } else if (activeKnob === 'embeddingType') {
      return <EmbeddingVisual type={activeValue as any} />;
    } else if (activeKnob === 'indexType') {
      return <IndexVisual type={activeValue as any} />;
    } else if (activeKnob === 'topK') {
      return <TopKVisual k={activeValue as any} />;
    } else if (activeKnob === 'reranker') {
      return <RerankerVisual reranker={activeValue as any} />;
    } else {
      return <SimpleKnobVisual knobId={activeKnob} value={activeValue} />;
    }
  };

  return (
    <div className="min-h-screen bg-base-100 flex flex-col">
      {/* Header */}
      <div className="bg-base-200 border-b border-base-300 px-3 md:px-6 py-3 md:py-4">
        <div className="max-w-[1800px] mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-3 md:gap-0">
          <div className="flex items-center gap-2 md:gap-4 w-full md:w-auto">
            <button
              onClick={onBack}
              className="btn btn-ghost btn-sm gap-1 md:gap-2"
            >
              <ChevronLeft size={16} className="md:w-5 md:h-5" />
              <span className="text-xs md:text-sm">Back</span>
            </button>
            <div className="h-6 w-px bg-base-300 hidden md:block" />
            <div className="flex items-center gap-2 md:gap-3 flex-wrap">
              <div className="badge badge-primary badge-sm md:badge-lg">
                {domainInfo.name}
              </div>
              <div className="text-xs md:text-sm text-base-content/70">
                {queryTypes.length} query type{queryTypes.length > 1 ? 's' : ''} selected
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 md:gap-3 w-full md:w-auto justify-between md:justify-end">
            <div className="text-xs md:text-sm text-base-content/60">
              {changedKnobs.size} setting{changedKnobs.size !== 1 ? 's' : ''} tweaked
            </div>
            {changedKnobs.size > 0 && (
              <button
                onClick={() => setKnobs(DEFAULT_KNOBS)}
                className="text-xs px-2 py-1 rounded-lg bg-base-300 hover:bg-base-content/10 text-base-content transition-all"
              >
                Set to default
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex">
        <div className="max-w-[1800px] mx-auto w-full flex flex-col md:flex-row gap-4 md:gap-6 p-3 md:p-6">
          {/* Desktop: Left Panel - Knob Controls */}
          <div className="hidden md:block md:w-[370px] flex-shrink-0 space-y-2">
            {PIPELINE_STAGES.map(stage => {
              const stageChangedCount = stage.knobs.filter(k => changedKnobs.has(k)).length;
              const isExpanded = expandedStage === stage.id;

              return (
                <div key={stage.id} className="card bg-base-100 border border-base-200 overflow-hidden relative">
                  <button
                    onClick={() => setExpandedStage(isExpanded ? '' : stage.id)}
                    className="w-full px-4 py-3 flex items-center justify-between hover:bg-base-300 transition-colors"
                  >
                    <div className="flex flex-col items-start gap-1 flex-1">
                      <div className="flex items-center gap-3">
                        <span className="font-semibold text-base-content">{stage.name}</span>
                        {stageChangedCount > 0 && (
                          <div className="badge badge-primary badge-sm">
                            {stageChangedCount}
                          </div>
                        )}
                      </div>
                      <span className="text-xs text-base-content/40 leading-relaxed">
                        {stage.description}
                      </span>
                    </div>
                    {isExpanded ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                  </button>


                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: 'auto' }}
                        exit={{ height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="px-4 pb-3 space-y-3 border-t border-base-300">
                          {stage.knobs.map(knobId => renderKnobControl(knobId))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* Mobile: Single Column with Stages + Content */}
          <div className="md:hidden w-full space-y-4">
            {PIPELINE_STAGES.map(stage => {
              const stageChangedCount = stage.knobs.filter(k => changedKnobs.has(k)).length;
              const isExpanded = expandedStage === stage.id;

              return (
                <div key={stage.id} className="space-y-3">
                  {/* Stage Header */}
                  <div className="card bg-base-100 border border-base-200 overflow-hidden">
                    <button
                      onClick={() => {
                        if (!isExpanded) {
                          setExpandedStage(stage.id);
                          setActiveKnob(stage.knobs[0]);
                        } else {
                          setExpandedStage('');
                        }
                      }}
                      className="w-full px-3 py-2.5 flex items-center justify-between hover:bg-base-300 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-base-content">{stage.name}</span>
                        {stageChangedCount > 0 && (
                          <div className="badge badge-primary badge-xs">
                            {stageChangedCount}
                          </div>
                        )}
                      </div>
                      {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                    </button>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: 'auto' }}
                          exit={{ height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="px-3 pb-3 space-y-2 border-t border-base-300">
                            {stage.knobs.map(knobId => renderKnobControl(knobId))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Content for Active Knob in This Stage */}
                  {isExpanded && stage.knobs.includes(activeKnob) && (
                    <div className="space-y-3">
                      {/* Mechanism Card */}
                      <motion.div
                        key={`mobile-mechanism-${activeKnob}-${activeValue}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="card bg-base-200 border border-base-300 p-4"
                      >
                        <div className="mb-3">
                          <h3 className="text-base font-bold text-base-content mb-1">
                            {activeKnobDef.name}: {activeKnobDef.options.find(opt => opt.value === activeValue)?.label}
                          </h3>
                          <p className="text-xs text-base-content/70">{activeKnobDef.description}</p>
                        </div>

                        <div className="mb-3">
                          <div className="text-xs font-semibold text-base-content/60 uppercase tracking-wide mb-2">
                            How {activeKnobDef.options.find(opt => opt.value === activeValue)?.label} {activeKnobDef.name} works
                          </div>
                          <p className="text-xs text-base-content/80 leading-relaxed">
                            {consequenceData.mechanism}
                          </p>
                        </div>

                        <div className="border-t border-base-300 pt-3">
                          <div className="text-xs font-semibold text-base-content/60 uppercase tracking-wide mb-2">
                            Visual Explanation
                          </div>
                          {renderVisualization()}
                        </div>
                      </motion.div>

                      {/* Consequence Card */}
                      <motion.div
                        key={`mobile-consequence-${activeKnob}-${activeValue}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-primary/5 border-l-4 border-primary rounded-lg p-4 space-y-3"
                      >
                        <div>
                          <div className="text-xs font-bold uppercase tracking-wide mb-2 text-primary">
                            Impact on Answers
                          </div>
                          <p className="text-sm leading-relaxed text-base-content">
                            {consequenceData.impactOnAnswers(domain, queryTypes)}
                          </p>
                        </div>

                        {consequenceData.systemTradeoffs && (
                          <div className="pt-3 border-t border-base-300">
                            <div className="text-xs font-bold uppercase tracking-wide mb-2 text-base-content/70">
                              System Tradeoffs
                            </div>
                            <p className="text-sm leading-relaxed text-base-content/80">
                              {consequenceData.systemTradeoffs(domain, queryTypes)}
                            </p>
                          </div>
                        )}
                      </motion.div>

                      {/* Interaction Warnings */}
                      <AnimatePresence>
                        {interactions.length > 0 && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            className="alert alert-warning p-3"
                          >
                            <div>
                              <div className="text-xs font-semibold uppercase tracking-wide mb-2">
                                ⚠️ Potential Conflict
                              </div>
                              <div className="space-y-1">
                                {interactions.map((interaction, idx) => (
                                  <div key={idx} className="text-xs leading-relaxed">
                                    • {interaction}
                                  </div>
                                ))}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Desktop: Right Panel - Mechanism & Consequences */}
          <div className="hidden md:block flex-1 space-y-4">
            {/* Mechanism Card */}
            <motion.div
              key={`mechanism-${activeKnob}-${activeValue}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="card bg-base-200 border border-base-300 p-6"
            >
              <div className="mb-4">
                <h3 className="text-lg font-bold text-base-content mb-1">
                  {activeKnobDef.name}: {activeKnobDef.options.find(opt => opt.value === activeValue)?.label}
                </h3>
                <p className="text-sm text-base-content/70">{activeKnobDef.description}</p>
              </div>

              <div className="mb-4">
                <div className="text-xs font-semibold text-base-content/60 uppercase tracking-wide mb-2">
                  How {activeKnobDef.options.find(opt => opt.value === activeValue)?.label} {activeKnobDef.name} works
                </div>
                <p className="text-sm text-base-content/80 leading-relaxed">
                  {consequenceData.mechanism}
                </p>
              </div>

              <div className="border-t border-base-300 pt-4">
                <div className="text-xs font-semibold text-base-content/60 uppercase tracking-wide mb-3">
                  Visual Explanation
                </div>
                {renderVisualization()}
              </div>
            </motion.div>

            {/* Consequence Card */}
            <motion.div
              key={`consequence-${activeKnob}-${activeValue}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-primary/5 border-l-4 border-primary rounded-lg p-5 space-y-4"
            >
              {/* Impact on Answers Section */}
              <div>
                <div className="text-sm font-bold uppercase tracking-wide mb-3 text-primary">
                  Impact on Answers
                </div>
                <p className="text-base leading-relaxed text-base-content">
                  {consequenceData.impactOnAnswers(domain, queryTypes)}
                </p>
              </div>

              {/* System Tradeoffs Section (if exists) */}
              {consequenceData.systemTradeoffs && (
                <div className="pt-4 border-t border-base-300">
                  <div className="text-sm font-bold uppercase tracking-wide mb-3 text-base-content/70">
                    System Tradeoffs
                  </div>
                  <p className="text-base leading-relaxed text-base-content/80">
                    {consequenceData.systemTradeoffs(domain, queryTypes)}
                  </p>
                </div>
              )}
            </motion.div>

            {/* Interaction Warnings */}
            <AnimatePresence>
              {interactions.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: 'auto' }}
                  exit={{ opacity: 0, y: 10, height: 0 }}
                  className="alert alert-warning"
                >
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wide mb-3">
                      ⚠️ Potential Conflict
                    </div>
                    <div className="space-y-2">
                      {interactions.map((interaction, idx) => (
                        <div key={idx} className="text-sm leading-relaxed">
                          • {interaction}
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
