'use client';

import { useState } from 'react';
import { DomainId, QueryTypeId, StepId } from '@/lib/types';
import DomainSelection from '@/components/steps/DomainSelection';
import QueryTypeSelection from '@/components/steps/QueryTypeSelection';
import PipelineExplorer from '@/components/steps/PipelineExplorer';

export default function Home() {
  const [step, setStep] = useState<StepId>('domain');
  const [domain, setDomain] = useState<DomainId | null>(null);
  const [queryTypes, setQueryTypes] = useState<QueryTypeId[]>([]);

  const handleDomainSelect = (selectedDomain: DomainId) => {
    setDomain(selectedDomain);
    setStep('querytype');
  };

  const handleQueryTypeToggle = (typeId: QueryTypeId) => {
    setQueryTypes(prev =>
      prev.includes(typeId)
        ? prev.filter(t => t !== typeId)
        : [...prev, typeId]
    );
  };

  const handleContinueToExplorer = () => {
    setStep('explore');
  };

  const handleBackToDomain = () => {
    setStep('domain');
    setQueryTypes([]);
  };

  const handleBackToQueryType = () => {
    setStep('querytype');
  };

  if (step === 'domain') {
    return <DomainSelection onSelect={handleDomainSelect} />;
  }

  if (step === 'querytype' && domain) {
    return (
      <QueryTypeSelection
        domain={domain}
        selectedTypes={queryTypes}
        onToggle={handleQueryTypeToggle}
        onBack={handleBackToDomain}
        onContinue={handleContinueToExplorer}
      />
    );
  }

  if (step === 'explore' && domain) {
    return (
      <PipelineExplorer
        domain={domain}
        queryTypes={queryTypes}
        onBack={handleBackToQueryType}
      />
    );
  }

  return null;
}
