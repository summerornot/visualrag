import { KnobState, InteractionRule } from '../types';

export const INTERACTION_RULES: InteractionRule[] = [
  {
    condition: (knobs) => knobs.chunkSize === 'large' && knobs.topK === 3,
    message: 'Large chunks + low top-K: You\'re retrieving very few, very large chunks. This wastes context window tokens on irrelevant content. Consider: smaller chunks OR higher top-K.'
  },
  {
    condition: (knobs) => knobs.chunkSize === 'small' && knobs.contextEnrichment === 'off',
    message: 'Small chunks without enrichment: Chunks may lack sufficient context to be understood. Consider: enabling neighbor or parent enrichment, OR using medium/large chunks.'
  },
  {
    condition: (knobs) => knobs.embeddingType === 'sparse' && knobs.queryRewriting === 'off',
    message: 'Sparse embeddings without query expansion: You\'re relying purely on keyword matching with no synonym expansion. Recall will be very low. Consider: enabling query expansion OR switching to dense/hybrid embeddings.'
  },
  {
    condition: (knobs) => knobs.indexType === 'flat' && knobs.topK >= 10,
    message: 'Flat index with high top-K: For large corpora (>100K chunks), this will be slow. Flat index compares against every vector. Consider: IVF or HNSW for faster search.'
  },
  {
    condition: (knobs) => knobs.multiVector !== 'off' && knobs.indexType === 'flat',
    message: 'Multi-vector with flat index: You\'re doubling the number of vectors (2x indexing cost) but still using slow flat search. Consider: upgrading to HNSW to handle the increased vector count efficiently.'
  },
  {
    condition: (knobs) => knobs.retrievalDiversity !== 'off' && knobs.topK === 3,
    message: 'Diversity filtering with low top-K: With only 3 results, diversity filtering may exclude highly relevant chunks in favor of variety. Consider: increasing top-K to 5-10 OR disabling diversity.'
  },
  {
    condition: (knobs) => knobs.reranker === 'llm' && knobs.topK >= 20,
    message: 'LLM reranker with high top-K: You\'re making 20+ LLM calls per query for reranking. This is very expensive and slow (2-5s latency). Consider: reducing top-K OR using cross-encoder reranker.'
  },
  {
    condition: (knobs) => knobs.contextEnrichment === 'parent' && knobs.chunkSize === 'large',
    message: 'Parent enrichment with large chunks: You\'re already using large chunks (500-800 tokens), and now returning entire parent documents. This will likely exceed LLM context limits. Consider: using small chunks with parent enrichment OR disabling enrichment.'
  }
];

export function getInteractions(knobs: KnobState): string[] {
  return INTERACTION_RULES
    .filter(rule => rule.condition(knobs))
    .map(rule => rule.message);
}
