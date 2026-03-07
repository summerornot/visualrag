import { Domain, QueryType, PipelineStage, KnobDefinition, KnobState } from '../types';

export const DOMAINS: Domain[] = [
  {
    id: 'legal',
    name: 'Legal',
    subtitle: 'Long structured documents',
    description: 'Finding the right clause inside lengthy text',
    icon: 'Scale',
    color: '#7c3aed'
  },
  {
    id: 'support',
    name: 'Support',
    subtitle: 'Short knowledge base articles',
    description: 'Retrieving the most relevant answer quickly',
    icon: 'MessageSquare',
    color: '#0891b2'
  },
  {
    id: 'healthcare',
    name: 'Healthcare',
    subtitle: 'Dense technical documentation',
    description: 'Understanding terminology and context',
    icon: 'Heart',
    color: '#059669'
  },
  {
    id: 'finance',
    name: 'Finance',
    subtitle: 'Reports with analysis and numbers',
    description: 'Extracting insights from complex documents',
    icon: 'DollarSign',
    color: '#dc2626'
  }
];

export const QUERY_TYPES: QueryType[] = [
  {
    id: 'lookup',
    name: 'Lookup',
    description: 'Find a specific fact or data point',
    example: '"What are the eligibility requirements?"'
  },
  {
    id: 'comparison',
    name: 'Comparison',
    description: 'Compare multiple entities or options',
    example: '"How do Plan A and Plan B differ in coverage?"'
  },
  {
    id: 'summarization',
    name: 'Summarization',
    description: 'Condense information across multiple documents',
    example: '"Summarize all customer complaints this month."'
  },
  {
    id: 'aggregation',
    name: 'Aggregation',
    description: 'Collect information scattered across documents',
    example: '"List all medications prescribed to this patient."'
  },
  {
    id: 'open-ended',
    name: 'Open-ended',
    description: 'Exploratory questions without a single answer',
    example: '"What are common challenges in remote work?"'
  }
];

export const PIPELINE_STAGES: PipelineStage[] = [
  {
    id: 'ingestion',
    name: 'Ingestion',
    description: 'How documents are chunked and stored in your database',
    color: '#7c3aed',
    knobs: ['chunkingStrategy', 'chunkSize', 'contextEnrichment']
  },
  {
    id: 'search',
    name: 'Search',
    description: 'How queries are transformed to find relevant chunks',
    color: '#0891b2',
    knobs: ['embeddingType', 'indexType', 'multiVector', 'queryRewriting']
  },
  {
    id: 'retrieval',
    name: 'Retrieval',
    description: 'How the most relevant chunks are selected and ranked',
    color: '#059669',
    knobs: ['retrievalMode', 'topK', 'retrievalDiversity']
  },
  {
    id: 'postprocessing',
    name: 'Post-Processing',
    description: 'How results are refined before generating the answer',
    color: '#dc2626',
    knobs: ['reranker']
  }
];

export const KNOB_DEFINITIONS: KnobDefinition[] = [
  {
    id: 'chunkingStrategy',
    name: 'Chunking Strategy',
    description: 'Documents are split into smaller chunks using available chunking tools. This is done because LLMs have limited context windows, and chunking allows the system to retrieve only the relevant knowledge pieces instead of entire documents. This makes retrieval more precise and efficient.',
    stage: 'ingestion',
    options: [
      { value: 'fixed', label: 'Fixed' },
      { value: 'semantic', label: 'Semantic' },
      { value: 'structural', label: 'Structural' }
    ],
    default: 'fixed'
  },
  {
    id: 'chunkSize',
    name: 'Chunk Size',
    description: 'Chunk size determines how many characters each piece contains. This balances precision with completeness in your retrieval results.',
    stage: 'ingestion',
    options: [
      { value: 'small', label: 'Small (50-100)' },
      { value: 'medium', label: 'Medium (200-300)' },
      { value: 'large', label: 'Large (500-800)' }
    ],
    default: 'medium'
  },
  {
    id: 'contextEnrichment',
    name: 'Context Enrichment',
    description: 'When a chunk is retrieved, it may lack full context on its own. Enrichment adds surrounding information to help the LLM better understand the retrieved content and generate more accurate answers.',
    stage: 'ingestion',
    options: [
      { value: 'off', label: 'Off' },
      { value: 'neighbor', label: 'Neighbor Chunks' },
      { value: 'parent', label: 'Parent Document' }
    ],
    default: 'off'
  },
  {
    id: 'embeddingType',
    name: 'Embedding Type',
    description: 'Text chunks and queries are converted into numerical vectors that capture meaning. This allows the system to find chunks that match the intent of the user query, not just exact keywords. Different embedding types balance between semantic understanding and keyword precision.',
    stage: 'search',
    options: [
      { value: 'dense', label: 'Dense (Semantic)' },
      { value: 'sparse', label: 'Sparse (Keyword)' },
      { value: 'hybrid', label: 'Hybrid' }
    ],
    default: 'dense'
  },
  {
    id: 'indexType',
    name: 'Index Type',
    description: 'Think of an index like organizing books in a library. Instead of searching through every book one by one, you use a catalog system to quickly find what you need. Similarly, an index organizes embedded vectors so the system can efficiently search through millions of chunks. Different index types balance between search speed and accuracy.',
    stage: 'search',
    options: [
      { value: 'flat', label: 'Flat (Exact)' },
      { value: 'ivf', label: 'IVF (Clustered)' },
      { value: 'hnsw', label: 'HNSW (Graph)' },
      { value: 'graphrag', label: 'GraphRAG' }
    ],
    default: 'flat'
  },
  {
    id: 'multiVector',
    name: 'Multi-Vector',
    description: 'Each document chunk can be represented by multiple embeddings to capture different perspectives on the same content. This improves retrieval because the system can match the user query against different versions of the same chunk, making it easier to find the right information even when the question is phrased differently than the original text.',
    stage: 'search',
    options: [
      { value: 'off', label: 'Off' },
      { value: 'summary', label: 'Summary' },
      { value: 'hypothetical', label: 'Hypothetical Questions' }
    ],
    default: 'off'
  },
  {
    id: 'queryRewriting',
    name: 'Query Rewriting',
    description: 'User queries are often unclear or incomplete. Query rewriting transforms the original query before searching—expanding it with synonyms, breaking it into sub-queries, or using an agent to refine it. This helps the system better understand user intent and retrieve more relevant results.',
    stage: 'search',
    options: [
      { value: 'off', label: 'Off' },
      { value: 'expansion', label: 'Expansion' },
      { value: 'decomposition', label: 'Decomposition' },
      { value: 'agentic', label: 'Agentic' }
    ],
    default: 'off'
  },
  {
    id: 'retrievalMode',
    name: 'Retrieval Mode',
    description: 'Retrieval mode determines the strategy for finding relevant information in the knowledge base. Different modes can explore the data in different ways to better match the user query. This allows the system to adapt its search approach for better results.',
    stage: 'retrieval',
    options: [
      { value: 'single', label: 'Single-Pass' },
      { value: 'multihop', label: 'Multi-Hop' },
      { value: 'adaptive', label: 'Adaptive' }
    ],
    default: 'single'
  },
  {
    id: 'topK',
    name: 'Top-K',
    description: 'Top-K controls how many chunks are retrieved and sent to the LLM. This is a trade-off between retrieving everything that generates the best responses and not adding unrelated info that can reduce the quality of the response.',
    stage: 'retrieval',
    options: [
      { value: 3, label: '3' },
      { value: 5, label: '5' },
      { value: 10, label: '10' },
      { value: 20, label: '20' }
    ],
    default: 5
  },
  {
    id: 'retrievalDiversity',
    name: 'Retrieval Diversity',
    description: 'Retrieved chunks can sometimes be very similar or redundant. Diversity techniques ensure the selected chunks cover different aspects of the topic rather than repeating the same information. This gives the LLM a broader perspective when generating answers.',
    stage: 'retrieval',
    options: [
      { value: 'off', label: 'Off' },
      { value: 'mmr', label: 'MMR' },
      { value: 'clustering', label: 'Clustering' }
    ],
    default: 'off'
  },
  {
    id: 'reranker',
    name: 'Reranker',
    description: 'Typically, retrieved chunks are ranked by similarity scores. Reranking uses more sophisticated models to re-evaluate and reorder these chunks based on deeper relevance to the user query. This improves the quality of chunks sent to the LLM, leading to better answers.',
    stage: 'postprocessing',
    options: [
      { value: 'off', label: 'Off' },
      { value: 'cross-encoder', label: 'Cross-Encoder' },
      { value: 'llm', label: 'LLM' },
      { value: 'self-corrective', label: 'Self-Corrective' }
    ],
    default: 'off'
  }
];

export const DEFAULT_KNOBS: KnobState = {
  chunkingStrategy: 'fixed',
  chunkSize: 'medium',
  embeddingType: 'dense',
  indexType: 'flat',
  topK: 5,
  multiVector: 'off',
  queryRewriting: 'off',
  retrievalMode: 'single',
  retrievalDiversity: 'off',
  reranker: 'off',
  contextEnrichment: 'off'
};
