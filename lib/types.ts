export type DomainId = 'legal' | 'support' | 'healthcare' | 'finance';
export type QueryTypeId = 'lookup' | 'comparison' | 'summarization' | 'aggregation' | 'open-ended';
export type StepId = 'domain' | 'querytype' | 'explore';

export type KnobId = 
  | 'chunkingStrategy'
  | 'chunkSize'
  | 'embeddingType'
  | 'indexType'
  | 'topK'
  | 'multiVector'
  | 'queryRewriting'
  | 'retrievalMode'
  | 'retrievalDiversity'
  | 'reranker'
  | 'contextEnrichment';

export type ChunkingStrategy = 'fixed' | 'semantic' | 'structural';
export type ChunkSize = 'small' | 'medium' | 'large';
export type EmbeddingType = 'dense' | 'sparse' | 'hybrid';
export type IndexType = 'flat' | 'ivf' | 'hnsw' | 'graphrag';
export type TopK = number; // Range: 3-20
export type MultiVector = 'off' | 'summary' | 'hypothetical';
export type QueryRewriting = 'off' | 'expansion' | 'decomposition' | 'agentic';
export type RetrievalMode = 'single' | 'multihop' | 'adaptive';
export type RetrievalDiversity = 'off' | 'mmr' | 'clustering';
export type Reranker = 'off' | 'cross-encoder' | 'llm' | 'self-corrective';
export type ContextEnrichment = 'off' | 'neighbor' | 'parent';

export type KnobValue = 
  | ChunkingStrategy 
  | ChunkSize 
  | EmbeddingType 
  | IndexType 
  | TopK 
  | MultiVector 
  | QueryRewriting 
  | RetrievalMode
  | RetrievalDiversity 
  | Reranker 
  | ContextEnrichment;

export interface Domain {
  id: DomainId;
  name: string;
  subtitle: string;
  description: string;
  icon: string;
  color: string;
}

export interface QueryType {
  id: QueryTypeId;
  name: string;
  description: string;
  example: string;
}

export interface PipelineStage {
  id: string;
  name: string;
  description: string;
  color: string;
  knobs: KnobId[];
}

export interface KnobDefinition {
  id: KnobId;
  name: string;
  description: string;
  stage: string;
  options: {
    value: KnobValue;
    label: string;
  }[];
  default: KnobValue;
}

export interface KnobState {
  chunkingStrategy: ChunkingStrategy;
  chunkSize: ChunkSize;
  embeddingType: EmbeddingType;
  indexType: IndexType;
  topK: TopK;
  multiVector: MultiVector;
  queryRewriting: QueryRewriting;
  retrievalMode: RetrievalMode;
  retrievalDiversity: RetrievalDiversity;
  reranker: Reranker;
  contextEnrichment: ContextEnrichment;
}

export interface ConsequenceData {
  mechanism: string;
  impactOnAnswers: (domain: DomainId, queryTypes: QueryTypeId[]) => string;
  systemTradeoffs?: (domain: DomainId, queryTypes: QueryTypeId[]) => string;
}

export interface InteractionRule {
  condition: (knobs: KnobState) => boolean;
  message: string;
}
