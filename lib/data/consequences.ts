import { DomainId, QueryTypeId, KnobId, KnobValue, ConsequenceData } from '../types';

type ConsequenceMap = {
  [K in KnobId]: {
    [key: string]: ConsequenceData;
  };
};

export const CONSEQUENCES: ConsequenceMap = {
  chunkingStrategy: {
    fixed: {
      mechanism: 'Documents are split at regular token intervals (e.g., every 200 tokens), regardless of content structure. Simple and predictable.',
      impactOnAnswers: (domain, queryTypes) => {
        const base = 'Look at the visualization above - notice how text gets split mid-sentence at fixed intervals. ';
        if (domain === 'legal') {
          return base + 'Contract clauses may be fragmented, separating conditions from their exceptions. Eligibility criteria might appear without their associated requirements.';
        } else if (domain === 'support') {
          return base + 'Troubleshooting steps can be incomplete. Step 3 might be retrieved without steps 4-5, giving users partial instructions.';
        } else if (domain === 'healthcare') {
          return base + 'Medical instructions may be separated from contraindications. Dosage information could appear without critical safety context.';
        } else if (domain === 'finance') {
          return base + 'Financial figures may be separated from their time periods or methodology. A revenue number might appear without its quarter.';
        }
        return base + 'Sentences and concepts get split arbitrarily, potentially separating important context from the information that needs it.';
      },
      systemTradeoffs: (domain, queryTypes) => {
        return 'Fastest approach - just counts characters or tokens and splits at regular intervals. No AI models or analysis needed during chunking. You set a size (e.g., 500 tokens) and it splits there. Best for quick prototyping or unstructured text.';
      }
    },
    semantic: {
      mechanism: 'Documents are split at natural semantic boundaries using embedding similarity. Chunks end when topic shifts are detected.',
      impactOnAnswers: (domain, queryTypes) => {
        const base = 'Look at the visualization above - see how chunks end when topics shift, keeping complete ideas together. ';
        if (domain === 'legal') {
          return base + 'Contract sections stay complete. When an eligibility section is retrieved, all related requirements, conditions, and exceptions come as one coherent unit.';
        } else if (domain === 'support') {
          return base + 'Complete troubleshooting procedures stay in single chunks. Users get all steps of a workflow together, not fragmented.';
        } else if (domain === 'healthcare') {
          return base + 'Treatment protocols remain complete with dosages, contraindications, and monitoring requirements together.';
        } else if (domain === 'finance') {
          return base + 'Financial analyses stay unified with their supporting data and methodology. Revenue figures come with calculation methods and time periods.';
        }
        return base + 'Complete ideas stay together. Topic boundaries are respected, so the LLM sees coherent thoughts rather than arbitrary fragments.';
      },
      systemTradeoffs: (domain, queryTypes) => {
        return 'Requires running an AI model on every sentence to detect when topics change. For 10,000 documents with 100 sentences each, that\'s 1 million AI calls just to figure out where to split. This adds significant time and cost to your indexing process. Chunk sizes vary based on content.';
      }
    },
    structural: {
      mechanism: 'Documents are split using document structure markers (headings, paragraphs, list items). Respects the author\'s intended organization.',
      impactOnAnswers: (domain, queryTypes) => {
        const base = 'Look at the visualization above - notice how chunks follow document structure like headings and sections. ';
        if (domain === 'legal') {
          return base + 'Each contract section becomes a chunk. Section 4 (Eligibility) stays complete with all subsections like Required Documents, Conditions, and Verification Process.';
        } else if (domain === 'support') {
          return base + 'FAQ items and KB articles remain complete. Each question-answer pair or troubleshooting guide stays intact as one piece.';
        } else if (domain === 'healthcare') {
          return base + 'Clinical guidelines split by section headings. Treatment Protocol sections contain all subsections like Indications, Dosing, and Adverse Events together.';
        } else if (domain === 'finance') {
          return base + 'Report sections like Executive Summary or Financial Performance become distinct chunks. Each section\'s analysis and data stay together.';
        }
        return base + 'Chunks follow the document\'s natural structure. Sections and subsections stay complete, preserving the author\'s intended organization.';
      },
      systemTradeoffs: (domain, queryTypes) => {
        return 'Requires parsing document structure (finding headings, sections, paragraphs). Faster than semantic chunking since it doesn\'t need AI models, just document parsing. Chunk sizes depend on how your documents are organized. Only works if documents have clear structure like headings or sections.';
      }
    }
  },

  chunkSize: {
    small: {
      mechanism: 'Very small, granular chunks that focus on specific pieces of information.',
      impactOnAnswers: (domain, queryTypes) => {
        const hasLookup = queryTypes.includes('lookup');
        const hasSummarization = queryTypes.includes('summarization');
        const base = 'Look at the visualization above - see how each chunk is very small. ';
        
        if (hasLookup && !hasSummarization) {
          return base + 'Great for finding specific facts with minimal extra information. However, if an answer spans multiple sentences, you might only retrieve part of it.';
        }
        if (hasSummarization) {
          return base + 'Not ideal for summarization. Each chunk is too small to capture the full picture or context needed to understand a topic.';
        }
        return base + 'Good for precise fact lookup, but may miss surrounding context that helps understand the answer.';
      },
      systemTradeoffs: (domain, queryTypes) => {
        return 'Smaller chunks mean less data sent to the LLM per retrieval, making responses faster and cheaper. However, you may need to retrieve more chunks to gather complete information, which can offset these benefits.';
      }
    },
    medium: {
      mechanism: 'Moderately-sized chunks that balance specificity with context.',
      impactOnAnswers: (domain, queryTypes) => {
        return 'Look at the visualization above - chunks are sized to capture complete thoughts without too much extra information. Works well for most question types. This is the most common choice.';
      },
      systemTradeoffs: (domain, queryTypes) => {
        return 'Medium chunks strike a balance between retrieving enough context and keeping the LLM focused. This size typically provides complete thoughts without overwhelming the system with unnecessary information.';
      }
    },
    large: {
      mechanism: 'Large chunks that preserve substantial context and complete thoughts.',
      impactOnAnswers: (domain, queryTypes) => {
        const hasLookup = queryTypes.includes('lookup');
        const hasSummarization = queryTypes.includes('summarization');
        const base = 'Look at the visualization above - each chunk contains a lot of text. ';
        
        if (hasLookup && !hasSummarization) {
          return base + 'Not ideal for simple fact lookup. You get the answer but also a lot of surrounding information you don\'t need.';
        }
        if (hasSummarization || queryTypes.includes('comparison')) {
          return base + 'Great for summarization and comparison. Each chunk has enough context to understand complex topics and relationships.';
        }
        return base + 'Good for understanding broad topics and context, but includes more irrelevant information than smaller chunks.';
      },
      systemTradeoffs: (domain, queryTypes) => {
        return 'Larger chunks provide rich context and comprehensive information per retrieval. However, they consume more of the LLM\'s processing capacity and increase costs, while potentially including irrelevant details.';
      }
    }
  },

  embeddingType: {
    dense: {
      mechanism: 'Text is converted to a dense vector (e.g., 768 or 1536 dimensions) capturing semantic meaning. Semantically similar phrases match even with no shared words.',
      impactOnAnswers: (domain, queryTypes) => {
        const base = 'Look at the visualization above - see how semantically similar content gets matched even with different wording. ';
        if (domain === 'legal') return base + 'Matches legal concepts in different terminology. "Indemnification" finds "liability protection" even though they share no words.';
        if (domain === 'support') return base + 'Matches user problems to solutions even when phrased differently. "Won\'t start" finds "fails to boot".';
        if (domain === 'healthcare') return base + 'Matches medical concepts across terminology. "Myocardial infarction" finds "heart attack".';
        if (domain === 'finance') return base + 'Matches financial concepts. "Revenue growth" finds "sales increase".';
        return base + 'Finds content based on meaning, not just matching words.';
      },
      systemTradeoffs: (domain, queryTypes) => {
        return 'Most common approach used in production. Works well for general-purpose search. May occasionally miss exact keyword matches if they\'re important to your domain.';
      }
    },
    sparse: {
      mechanism: 'Text is converted to a sparse vector where each dimension represents a specific term (like BM25 or SPLADE). Only exact word matches contribute to similarity.',
      impactOnAnswers: (domain, queryTypes) => {
        const base = 'Look at the visualization above - only exact keyword matches are found. ';
        if (domain === 'legal') return base + 'Query "eligibility criteria" won\'t match "qualification requirements" because they don\'t share words.';
        if (domain === 'support') return base + 'Query "app crashes" won\'t match "application freezes" without shared terms.';
        if (domain === 'healthcare') return base + 'Query "high blood pressure" won\'t match "hypertension" without shared words.';
        if (domain === 'finance') return base + 'Query "profit margin" won\'t match "earnings ratio" without shared terms.';
        return base + 'Misses semantically similar content if the exact words don\'t match.';
      },
      systemTradeoffs: (domain, queryTypes) => {
        return 'Useful when exact terminology matters (legal, medical, technical domains). Faster than dense embeddings. Best combined with dense in a hybrid approach.';
      }
    },
    hybrid: {
      mechanism: 'Combines dense (semantic) and sparse (keyword) embeddings. Results are merged using a weighted average (alpha parameter controls the balance).',
      impactOnAnswers: (domain, queryTypes) => {
        return 'Look at the visualization above - combines both semantic understanding and exact keyword matching. Finds semantically similar content while ensuring important keywords aren\'t missed. Best for queries with specific terms (like "Q3 2024") that need semantic understanding too.';
      },
      systemTradeoffs: (domain, queryTypes) => {
        return 'Requires running both dense and sparse search, then merging results. Slightly slower than using just one approach. Increasingly common in production systems for better accuracy.';
      }
    }
  },

  indexType: {
    flat: {
      mechanism: 'All vectors are stored in a flat list. Search compares the query against every single vector in the database (brute force).',
      impactOnAnswers: (domain, queryTypes) => {
        return 'Look at the visualization above - every vector is checked. Finds the absolute best matches with perfect accuracy. No results are missed.';
      },
      systemTradeoffs: (domain, queryTypes) => {
        return 'Checks every single vector in your database. Fast for small datasets (under 100K chunks) but gets slower as you add more documents. Search time doubles when you double your data size.';
      }
    },
    ivf: {
      mechanism: 'Vectors are clustered into groups (Voronoi cells). Search only compares against vectors in the nearest clusters, skipping distant ones.',
      impactOnAnswers: (domain, queryTypes) => {
        return 'Look at the visualization above - search only checks nearby clusters. Finds 95-98% of the best matches. Occasionally misses a relevant result that was in a skipped cluster.';
      },
      systemTradeoffs: (domain, queryTypes) => {
        return 'Much faster than flat (10-100x speedup) by only searching relevant clusters. Good for 100K to 10M chunks. Needs occasional re-clustering as you add more documents.';
      }
    },
    hnsw: {
      mechanism: 'HNSW (Hierarchical Navigable Small World) organizes vectors in a multi-layer graph structure, like a highway system with express lanes and local roads. The top layer has few connections between distant points (highways), while lower layers have more connections between nearby points (local roads). Search starts at the top layer and "hops" down through layers, getting progressively closer to the target. This allows fast navigation through millions of vectors by skipping irrelevant regions.',
      impactOnAnswers: (domain, queryTypes) => {
        return 'Look at the visualization above - search navigates through graph layers. Finds ~99% of the best matches. Very high accuracy with fast speed.';
      },
      systemTradeoffs: (domain, queryTypes) => {
        return 'Very fast search that scales well to 100M+ chunks. Uses more memory than other approaches to store the graph structure. Most common choice for production systems.';
      }
    },
    graphrag: {
      mechanism: 'GraphRAG combines two complementary approaches: traditional vector search (finding semantically similar text) and knowledge graph traversal (following relationships between entities). First, it extracts entities and relationships from your documents to build a knowledge graph (e.g., "Customer A purchased Product B"). Then, for each query, it intelligently routes to the best strategy: vector search for semantic questions ("what are the features?"), graph queries for relationship questions ("who bought X but not Y?"), or both for complex queries. This enables answering questions that pure vector search cannot handle.',
      impactOnAnswers: (domain, queryTypes) => {
        const hasComparison = queryTypes.includes('comparison');
        const base = 'Look at the visualization above - combines vector search with relationship traversal. ';
        if (hasComparison) {
          return base + 'Excellent for relationship-based questions. Can answer "customers who bought Product A but not Product B" by traversing the knowledge graph while accessing document text.';
        }
        return base + 'Handles both semantic search and relationship queries. Routes to basic search for simple queries, graph queries for relationship-based questions.';
      },
      systemTradeoffs: (domain, queryTypes) => {
        return 'Requires building and maintaining a knowledge graph alongside vector index. More complex setup but enables relationship-based queries that pure vector search cannot handle. Best when your domain has important entity relationships.';
      }
    }
  },

  topK: {
    3: {
      mechanism: 'Retrieve only the 3 most similar chunks.',
      impactOnAnswers: (domain, queryTypes) => {
        const hasAggregation = queryTypes.includes('aggregation');
        const hasLookup = queryTypes.includes('lookup');
        const base = 'Look at the visualization above - only 3 chunks are retrieved. ';
        
        if (hasLookup && !hasAggregation) {
          return base + 'Good for simple lookups when the answer is likely in the top results. Risk: if the answer is ranked 4th or 5th, you\'ll miss it.';
        }
        if (hasAggregation) {
          return base + 'Not enough for aggregation tasks. You\'ll miss most relevant information scattered across documents.';
        }
        return base + 'Very focused retrieval. High risk of missing the answer if it\'s not in the top 3.';
      },
      systemTradeoffs: (domain, queryTypes) => {
        return 'Minimum practical value. Best when you have excellent embeddings AND a reranker. Only use if you\'re confident the answer is in the top results. Fastest and cheapest option.';
      }
    },
    5: {
      mechanism: 'Retrieve the 5 most similar chunks.',
      impactOnAnswers: (domain, queryTypes) => {
        return 'Look at the visualization above - 5 chunks are retrieved. Standard choice that works for most single-fact queries. Balances finding the answer with not overwhelming the LLM.';
      },
      systemTradeoffs: (domain, queryTypes) => {
        return 'Most common choice with a reranker. Standard for production systems with good embedding quality. Balances coverage and efficiency for most use cases.';
      }
    },
    10: {
      mechanism: 'Retrieve the 10 most similar chunks.',
      impactOnAnswers: (domain, queryTypes) => {
        const hasAggregation = queryTypes.includes('aggregation') || queryTypes.includes('summarization');
        const base = 'Look at the visualization above - 10 chunks are retrieved. ';
        
        if (hasAggregation) {
          return base + 'Better coverage for multi-fact queries. Gives the LLM more context to synthesize information from.';
        }
        return base + 'More coverage but also more irrelevant information. Good when the answer might not be in the top 5.';
      },
      systemTradeoffs: (domain, queryTypes) => {
        return 'Common choice without a reranker. Provides better coverage when embedding quality is moderate or when answers might be scattered. Sends twice as much data to the LLM as k=5.';
      }
    },
    20: {
      mechanism: 'Retrieve the 20 most similar chunks.',
      impactOnAnswers: (domain, queryTypes) => {
        const hasAggregation = queryTypes.includes('aggregation') || queryTypes.includes('summarization');
        const base = 'Look at the visualization above - 20 chunks are retrieved. ';
        
        if (hasAggregation) {
          return base + 'Great for aggregation and summarization. Captures information from many sources for comprehensive answers.';
        }
        return base + 'Very high coverage but includes a lot of irrelevant information. Only use when you need comprehensive retrieval.';
      },
      systemTradeoffs: (domain, queryTypes) => {
        return 'Typical without a reranker for complex queries. Use when you need comprehensive coverage or have lower-quality embeddings. Sends 4x as much data to the LLM as k=5 - significantly slower and more expensive.';
      }
    }
  },

  multiVector: {
    off: {
      mechanism: 'Each chunk has one embedding vector.',
      impactOnAnswers: (domain, queryTypes) => {
        return 'Look at the visualization above - each chunk has one representation. Standard approach that works well for most cases.';
      },
      systemTradeoffs: (domain, queryTypes) => {
        return 'Simplest approach. One embedding per chunk means less storage and faster indexing.';
      }
    },
    summary: {
      mechanism: 'Each chunk gets two embeddings: one for the original text, one for an LLM-generated summary. Queries are matched against both.',
      impactOnAnswers: (domain, queryTypes) => {
        const base = 'Look at the visualization above - each chunk has both original text and summary embeddings. ';
        if (domain === 'legal') return base + 'Query "what are the payment terms" matches summaries like "payment obligations" even when the actual chunk has dense legal language.';
        if (domain === 'support') return base + 'Query "how to fix login issues" matches summaries even when chunks contain technical debugging steps.';
        if (domain === 'healthcare') return base + 'Query "diabetes treatment" matches summaries even when chunks contain detailed clinical protocols.';
        if (domain === 'finance') return base + 'Query "revenue trends" matches summaries even when chunks contain detailed financial tables.';
        return base + 'Helps when users ask high-level questions but your content is detailed and technical.';
      },
      systemTradeoffs: (domain, queryTypes) => {
        return 'Requires generating summaries for every chunk using an LLM during indexing. Doubles storage needs (two embeddings per chunk). Adds time and cost to indexing process.';
      }
    },
    hypothetical: {
      mechanism: 'Each chunk gets embeddings for LLM-generated hypothetical questions it could answer. Queries are matched against these question embeddings.',
      impactOnAnswers: (domain, queryTypes) => {
        return 'Look at the visualization above - chunks are represented by questions they could answer. Query "what is the refund policy?" matches chunks whose hypothetical questions include "how do I get a refund?". Great for Q&A systems.';
      },
      systemTradeoffs: (domain, queryTypes) => {
        return 'Requires generating hypothetical questions for every chunk using an LLM during indexing. Doubles storage needs and indexing time.';
      }
    }
  },

  queryRewriting: {
    off: {
      mechanism: 'User query is used as-is for retrieval.',
      impactOnAnswers: (domain, queryTypes) => {
        return 'Query is used exactly as the user typed it. Works well when users phrase queries clearly.';
      },
      systemTradeoffs: (domain, queryTypes) => {
        return 'Fastest option - no additional processing needed. Single search per query.';
      }
    },
    expansion: {
      mechanism: 'LLM generates alternative phrasings of the query (synonyms, related terms). All versions are searched and results are merged.',
      impactOnAnswers: (domain, queryTypes) => {
        const base = 'Finds content phrased differently than the query. ';
        if (domain === 'legal') return base + 'Query "eligibility criteria" also searches "requirements", "qualifications", "prerequisites".';
        if (domain === 'support') return base + 'Query "app crash" also searches "application freeze", "software failure", "program error".';
        if (domain === 'healthcare') return base + 'Query "high blood pressure" also searches "hypertension", "elevated BP".';
        if (domain === 'finance') return base + 'Query "profit" also searches "earnings", "net income", "bottom line".';
        return base + 'Helps when users use different terminology than your documents.';
      },
      systemTradeoffs: (domain, queryTypes) => {
        return 'Requires an LLM call to generate alternative phrasings, then multiple searches (one per phrasing). Adds latency but improves coverage.';
      }
    },
    decomposition: {
      mechanism: 'Complex queries are broken into sub-queries. Each sub-query is searched separately, then results are combined.',
      impactOnAnswers: (domain, queryTypes) => {
        const hasComparison = queryTypes.includes('comparison');
        const hasAggregation = queryTypes.includes('aggregation');
        
        if (hasComparison || hasAggregation) {
          return 'Great for multi-part questions. "Compare Plan A and Plan B coverage" becomes two searches: "Plan A coverage" + "Plan B coverage". Ensures both parts are retrieved.';
        }
        return 'Useful for complex queries with multiple information needs. Each part gets searched separately.';
      },
      systemTradeoffs: (domain, queryTypes) => {
        return 'Requires an LLM call to break down the query, then multiple searches (one per sub-query). Significantly increases latency.';
      }
    },
    agentic: {
      mechanism: 'LLM acts as a reasoning agent, iteratively decomposing queries, retrieving information, and validating completeness before proceeding.',
      impactOnAnswers: (domain, queryTypes) => {
        const hasComparison = queryTypes.includes('comparison');
        const hasAggregation = queryTypes.includes('aggregation');
        const base = 'System reasons about what information is needed and retrieves it in multiple rounds. ';
        
        if (hasComparison || hasAggregation) {
          return base + 'Excellent for complex multi-part queries. Breaks down "Compare retention rates to industry benchmarks over 3 years" into sequential retrievals, validates completeness, and re-retrieves if gaps are found.';
        }
        return base + 'Handles ambiguous or open-ended questions by gathering evidence in stages, validating each step, and adapting the search strategy based on what\'s found.';
      },
      systemTradeoffs: (domain, queryTypes) => {
        return 'Requires multiple LLM calls for planning, validation, and decision-making. Multiple retrieval rounds. Significantly higher latency and cost, but much better at handling complex queries that single-pass retrieval misses.';
      }
    }
  },

  retrievalMode: {
    single: {
      mechanism: 'Retrieve once based on the query, then generate the answer. Standard single-pass retrieval.',
      impactOnAnswers: (domain, queryTypes) => {
        return 'Fast and straightforward. Works well when the query is clear and the answer is likely in the top results. May miss information if the initial retrieval doesn\'t capture everything needed.';
      },
      systemTradeoffs: (domain, queryTypes) => {
        return 'Fastest option - one retrieval call, one generation call. Most common approach. Best for simple, well-defined queries.';
      }
    },
    multihop: {
      mechanism: 'Breaks complex queries into sequential retrieval steps. Each step uses information from previous retrievals to inform the next search.',
      impactOnAnswers: (domain, queryTypes) => {
        const hasComparison = queryTypes.includes('comparison');
        const hasAggregation = queryTypes.includes('aggregation');
        const base = 'Retrieves information in stages, using earlier results to guide later searches. ';
        
        if (hasComparison || hasAggregation) {
          return base + 'Great for queries requiring synthesis across sources. "Compare customer retention to benchmarks" first retrieves retention data, then uses that context to retrieve relevant benchmark data.';
        }
        return base + 'Handles queries where the answer requires connecting multiple pieces of information found in different places.';
      },
      systemTradeoffs: (domain, queryTypes) => {
        return 'Requires multiple sequential retrieval calls. Each hop adds latency. Typically 2-4 retrieval rounds. More thorough than single-pass but slower.';
      }
    },
    adaptive: {
      mechanism: 'LLM decides whether retrieval is necessary for each query. Can skip retrieval if the answer is in the LLM\'s training data or conversation context.',
      impactOnAnswers: (domain, queryTypes) => {
        return 'Intelligent routing - only retrieves when needed. Answers general knowledge questions directly, retrieves for domain-specific or current information. Reduces unnecessary retrievals while ensuring accuracy for questions that need it.';
      },
      systemTradeoffs: (domain, queryTypes) => {
        return 'Requires an LLM call to decide whether to retrieve. Adds small latency overhead but can save significant time by skipping retrieval for questions that don\'t need it. Best for mixed workloads with both general and domain-specific questions.';
      }
    }
  },

  retrievalDiversity: {
    off: {
      mechanism: 'Return the top-K most similar chunks, even if they\'re redundant.',
      impactOnAnswers: (domain, queryTypes) => {
        return 'May retrieve multiple chunks saying the same thing. You might get 5 chunks that all repeat the same information instead of covering different aspects.';
      },
      systemTradeoffs: (domain, queryTypes) => {
        return 'Fastest option - no additional processing. Just returns the top matches by similarity score.';
      }
    },
    mmr: {
      mechanism: 'Maximal Marginal Relevance: balance similarity to query with dissimilarity to already-selected chunks. Iteratively select chunks that are relevant but different from what\'s already retrieved.',
      impactOnAnswers: (domain, queryTypes) => {
        return 'Reduces redundancy. Retrieved chunks cover different aspects of the topic instead of repeating the same information.';
      },
      systemTradeoffs: (domain, queryTypes) => {
        return 'Slightly slower than no filtering - needs to compare each candidate against already-selected chunks to ensure diversity.';
      }
    },
    clustering: {
      mechanism: 'Cluster the top-N candidates (e.g., top-50), then select the top-K representatives from different clusters.',
      impactOnAnswers: (domain, queryTypes) => {
        return 'Strong diversity guarantee. Good for exploratory queries where you want a broad view. May miss the single best match in favor of showing variety.';
      },
      systemTradeoffs: (domain, queryTypes) => {
        return 'Requires clustering the top candidates before selecting final results. More processing than MMR but stronger diversity guarantees.';
      }
    }
  },

  reranker: {
    off: {
      mechanism: 'Use the initial embedding similarity scores as the final ranking.',
      impactOnAnswers: (domain, queryTypes) => {
        return 'Results are ranked by embedding similarity. Quality depends on how well your embedding model understands relevance.';
      },
      systemTradeoffs: (domain, queryTypes) => {
        return 'Fastest option - no additional processing after initial search. Results go directly to the LLM.';
      }
    },
    'cross-encoder': {
      mechanism: 'A specialized model scores each (query, chunk) pair together. More accurate than comparing embeddings separately, but requires scoring each candidate individually.',
      impactOnAnswers: (domain, queryTypes) => {
        return 'Look at the visualization above - each result is re-scored for relevance. Improves ranking accuracy, moving the most relevant results to the top. Measurably better answer quality.';
      },
      systemTradeoffs: (domain, queryTypes) => {
        return 'Adds moderate latency to score each candidate. Requires running a specialized model on every retrieved chunk. Common in production systems where accuracy matters.';
      }
    },
    llm: {
      mechanism: 'An LLM reads the query and each chunk, then assigns relevance scores. Most accurate but slowest.',
      impactOnAnswers: (domain, queryTypes) => {
        return 'Look at the visualization above - an LLM judges relevance for each result. Most accurate ranking possible. Can understand nuanced relevance that embeddings miss.';
      },
      systemTradeoffs: (domain, queryTypes) => {
        return 'Requires an LLM call for each retrieved chunk. Adds significant latency. Expensive - only use for critical queries where accuracy is paramount.';
      }
    },
    'self-corrective': {
      mechanism: 'Validates retrieved information before responding. If validation fails, reformulates the query and retrieves again. Fact-checks against multiple sources.',
      impactOnAnswers: (domain, queryTypes) => {
        const base = 'System validates retrieved information quality before using it. ';
        if (domain === 'legal' || domain === 'healthcare') {
          return base + 'Critical for high-stakes domains. If initial retrieval doesn\'t fully answer the query or contains contradictions, the system re-retrieves with refined queries. Reduces hallucinations and incomplete answers.';
        }
        return base + 'Checks if retrieved chunks adequately answer the query. If not, reformulates and searches again. Identifies contradictions across sources. Higher accuracy but slower.';
      },
      systemTradeoffs: (domain, queryTypes) => {
        return 'Requires LLM calls for validation and potential re-retrieval. Can trigger multiple additional retrieval rounds if initial results are insufficient. Significantly higher latency but much better accuracy for complex or ambiguous queries.';
      }
    }
  },

  contextEnrichment: {
    off: {
      mechanism: 'Return only the retrieved chunks, with no additional context.',
      impactOnAnswers: (domain, queryTypes) => {
        return 'Only the exact chunks that matched are sent to the LLM. Risk: chunks may lack surrounding context needed to fully understand them.';
      },
      systemTradeoffs: (domain, queryTypes) => {
        return 'Sends the minimum amount of data to the LLM. Fastest and cheapest option.';
      }
    },
    neighbor: {
      mechanism: 'Include the chunks immediately before and after each retrieved chunk (e.g., retrieve chunk 5, return chunks 4, 5, 6).',
      impactOnAnswers: (domain, queryTypes) => {
        const base = 'Look at the visualization above - neighboring chunks are included for context. ';
        if (domain === 'legal') return base + 'If a contract clause is retrieved, neighboring clauses provide context about conditions and exceptions.';
        if (domain === 'support') return base + 'If step 3 of a procedure is retrieved, steps 2 and 4 show the full workflow.';
        if (domain === 'healthcare') return base + 'If a treatment step is retrieved, neighboring steps show the complete protocol.';
        if (domain === 'finance') return base + 'If a financial figure is retrieved, neighboring text provides time period and methodology context.';
        return base + 'Helps the LLM understand how the chunk fits into the larger document.';
      },
      systemTradeoffs: (domain, queryTypes) => {
        return 'Triples the amount of data sent to the LLM (3 chunks instead of 1 for each match). Increases context window usage but improves answer quality.';
      }
    },
    parent: {
      mechanism: 'Retrieve small chunks for precision, but return their entire parent document (or section) for context.',
      impactOnAnswers: (domain, queryTypes) => {
        return 'Look at the visualization above - entire parent sections are returned. Combines precise retrieval with full context. Best for understanding complex topics where surrounding information matters.';
      },
      systemTradeoffs: (domain, queryTypes) => {
        return 'Can significantly increase context window usage depending on parent document size. May exceed LLM context limits if parent documents are very large. Use when context is critical.';
      }
    }
  }
};
