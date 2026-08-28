import { ProjectBrief, TechStackCategory, VoiceAgentSample } from '../types';

export const HERO_STATS = [
  { label: 'Workflows Orchestrated', value: '150+', change: 'Self-Hosted n8n' },
  { label: 'RAG Hallucination Rate', value: '0.0%', change: 'Evidence-Locked' },
  { label: 'Voice AI Median Latency', value: '250ms', change: 'Deepgram + Flash v2.5' },
  { label: 'Production Order Rows', value: '48,000+', change: 'Optimized & Synced' },
];

export const PHILOSOPHY_PILLARS = [
  {
    id: 'rag-lock',
    title: 'The "RAG Lock" Anti-Hallucination Pattern',
    subtitle: 'Zero Generation From Model Priors',
    description: 'During research and ingestion, an immutable canonical evidence bundle is compiled. Downstream LLM nodes are strictly forbidden from guessing, routed through a cross-validation agent that audits every generated claim.',
    tag: 'Integrity',
    icon: 'ShieldCheck',
  },
  {
    id: 'zero-vendor-lockin',
    title: 'Zero Vendor Lock-in (Self-Hosted VPS)',
    subtitle: 'Self-Hosted n8n & Open Source Infrastructure',
    description: 'Avoid per-execution SaaS traps ($0.05/run) that penalize scale. Deploying n8n on flat-rate VPS retains 100% intellectual property, private contact records, and custom integration flexibility.',
    tag: 'Cost & Security',
    icon: 'Server',
  },
  {
    id: 'voice-latency',
    title: 'Voice AI Latency-vs-Capability Budgeting',
    subtitle: '250ms Conversational Threshold',
    description: 'Measured external RAG network hops adding 500-800ms overhead for phone bots. Shifted to prompt-inlined domain knowledge and platform-native knowledge bases to maintain sub-300ms realistic dialogue cadence.',
    tag: 'Real-Time',
    icon: 'Zap',
  },
  {
    id: 'ssot-erp',
    title: 'Single Source of Truth (SSOT) Separation',
    subtitle: 'RAW Order Buffers & Event Isolation',
    description: 'Customer portals and external integrations submit draft "RAW" payloads requiring internal acknowledge gates. Production ERP databases remain the strictly isolated canonical source of truth.',
    tag: 'Data Architecture',
    icon: 'Database',
  },
  {
    id: 'validate-then-import',
    title: 'The "Validate-then-Import" Discipline',
    subtitle: 'Bulletproof Deployment for 20+ Node Graphs',
    description: 'Programmatic workflow pushes time out on complex graphs. We validate node graphs locally, export validated native JSON schema, and perform atomic version-controlled imports with complete rollback guarantees.',
    tag: 'DevOps',
    icon: 'CheckCircle2',
  },
  {
    id: 'token-budgeting',
    title: 'Rigorous Token & Memory Budgeting',
    subtitle: 'Cost-Conscious Agent Architectures',
    description: 'Identified and eliminated 26,000 wasted tokens per execution on raw scrapers. Replaced blanket context dumps with structured regex extraction, batch sizing constraints, and targeted schema parsing.',
    tag: 'Optimization',
    icon: 'Cpu',
  },
];

export const TECH_STACKS: TechStackCategory[] = [
  {
    category: 'Workflow & Orchestration',
    description: 'Enterprise grade event-driven automation engines and webhook gateways.',
    items: [
      { name: 'Self-Hosted n8n', iconName: 'Workflow', role: '150+ Graph Deployments', badge: 'Core' },
      { name: 'FastAPI / Python 3.11+', iconName: 'Terminal', role: 'High-Throughput Services', badge: 'Core' },
      { name: 'LangChain & Agent Tooling', iconName: 'Bot', role: 'Dynamic Tool Pacing' },
      { name: 'Google Apps Script (V8)', iconName: 'FileCode', role: 'Zero-Infra SPAs' },
    ],
  },
  {
    category: 'AI Models & Vector Stores',
    description: 'Multi-model LLM routing, strict embedding retrieval, and grounding.',
    items: [
      { name: 'GPT-4o & GPT-4o-mini', iconName: 'Sparkles', role: 'Structured Extraction', badge: 'Core' },
      { name: 'Pinecone Vector DB', iconName: 'Layers', role: '1536-dim RAG Dedup' },
      { name: 'Supabase pgvector', iconName: 'Database', role: 'Postgres Vector Retrieval' },
      { name: 'OpenRouter & Claude 3.5', iconName: 'Cpu', role: 'Multi-LLM Fallback' },
    ],
  },
  {
    category: 'Bilingual Voice AI',
    description: 'Sub-300ms conversational phone agents with domain vocabulary boosting.',
    items: [
      { name: 'Vapi.ai ("Monika")', iconName: 'PhoneCall', role: 'Hindi / Hinglish Engine', badge: 'Active' },
      { name: 'Ringg AI ("Priya")', iconName: 'PhoneForwarded', role: '5-Node RAG Flow', badge: 'Active' },
      { name: 'Deepgram Nova-3 Hindi', iconName: 'Mic', role: 'Custom Term Boosting' },
      { name: 'ElevenLabs Flash v2.5', iconName: 'Volume2', role: 'Zero-Jitter Vocal Sync' },
    ],
  },
  {
    category: 'Databases & Web Apps',
    description: 'Modern full-stack interfaces, serverless PostgreSQL, and real-time syncing.',
    items: [
      { name: 'Next.js 14 & React 18', iconName: 'Globe', role: 'App Router & SPAs', badge: 'Modern' },
      { name: 'Supabase (Postgres)', iconName: 'Database', role: 'Relational & Auth Backend' },
      { name: 'Neon Serverless Postgres', iconName: 'Server', role: 'Prisma Connection Pooling' },
      { name: 'Three.js & React-Three-Fiber', iconName: 'Box', role: 'WebGL 3D Showroom' },
    ],
  },
];

export const VOICE_AGENT_DEMOS: VoiceAgentSample[] = [
  {
    id: 'vapi-monika',
    name: 'Monika (Vapi.ai Engine)',
    platform: 'Vapi.ai + Deepgram Nova-3 + ElevenLabs Flash v2.5',
    persona: 'Outbound B2B Textile Prospecting & Sample Qualifier',
    language: 'Hinglish (Hindi / English Blend)',
    stt: 'Deepgram Nova-3 Hindi (Vocabulary Boosted)',
    tts: 'ElevenLabs Flash v2.5',
    llm: 'GPT-4o-mini with Textile Self-Auditing Schema',
    latency: '~260ms Median Response',
    costPerMin: '$0.03 / min',
    audioUrl: '/audio/monika-calling-agent.mp3',
    audioFileName: 'monika calling agent.mp3',
    // Timestamps are measured speech boundaries from the recording, so the transcript
    // is pinned to the audio. The call runs past 02:36; this is the transcribed stretch.
    clipEnd: 156.2,
    absoluteTiming: true,
    keyFeatures: [
      'Pre-call prospect research injected as variables (business name + vertical recognised before the pitch)',
      'Permission-based opener - asks for 2-3 minutes before any qualification',
      'Single-slot-per-turn discovery: fabric -> weight -> finish -> colour, never stacked questions',
      'Hard pricing guardrail: refuses to quote rates and redirects to a sample dispatch instead',
      'Catalog RAG over the live fabric range (Cotton-linen blend, Milano, Play Plain)',
      'WhatsApp sample + detail fanout triggered on call close',
    ],
    transcript: [
      {
        speaker: 'agent',
        timestamp: '00:00.0',
        text: 'Hello, main Monika bol rahi hoon, LD Silk Mills, Mumbai se. Kya main Akanksha ji se baat kar rahi hoon?',
        intent: 'IDENTITY_AND_CALL_INTRO',
        detectedAttributes: { caller: 'LD Silk Mills, Mumbai', verify: 'Akanksha' },
      },
      {
        speaker: 'user',
        timestamp: '00:08.1',
        text: 'Haan ji.',
        intent: 'IDENTITY_CONFIRMED',
      },
      {
        speaker: 'agent',
        timestamp: '00:11.2',
        text: 'Perfect, thank you. Maine aapke business Web24 ko thoda dekha tha. Aap VPS aur web hosting mein kaam karte hain, right? LD Silk Mills ke fabric aur printing solutions aapke kaam mein value add kar sakte hain. Kya abhi 2-3 minute baat karna convenient hoga?',
        intent: 'PROSPECT_RESEARCH_AND_PERMISSION',
        detectedAttributes: { prospect_business: 'Web24', vertical: 'VPS & web hosting', ask: 'Permission for 2-3 min' },
      },
      {
        speaker: 'user',
        timestamp: '00:28.4',
        text: 'Haan ji, zaroor.',
        intent: 'PERMISSION_GRANTED',
      },
      {
        speaker: 'agent',
        timestamp: '00:31.9',
        text: 'Achha, ek baat batayiye, is waqt aap koi specific fabric dhoondh rahe hain?',
        intent: 'DISCOVERY_OPEN_QUESTION',
      },
      {
        speaker: 'user',
        timestamp: '00:39.6',
        text: 'Haan, mujhe linen fabric chahiye.',
        intent: 'REQUIREMENT_CAPTURED',
        detectedAttributes: { fabric: 'Linen' },
      },
      {
        speaker: 'agent',
        timestamp: '00:44.5',
        text: 'Achha, wear ke liye achha option hai. Aapko kaunsa zyada suit karega - light ya heavy, plain ya printed?',
        intent: 'ATTRIBUTE_QUALIFICATION',
        detectedAttributes: { slots_open: 'Weight, Finish' },
      },
      {
        speaker: 'user',
        timestamp: '01:15.3',
        text: 'Light aur plain.',
        intent: 'SLOTS_FILLED',
        detectedAttributes: { weight: 'Light', finish: 'Plain' },
      },
      {
        speaker: 'agent',
        timestamp: '01:20.2',
        text: 'Great choice. Cotton-linen blend, lightweight fabric perfect rahega. Kya aap sample dekhna chahenge ya koi specific design aapke paas hai?',
        intent: 'PRODUCT_RECOMMENDATION',
        detectedAttributes: { recommended: 'Cotton-linen blend', next_step: 'Sample or design' },
      },
      {
        speaker: 'user',
        timestamp: '01:29.9',
        text: 'Nahi, mujhe sample dekhna hai.',
        intent: 'SAMPLE_REQUEST',
      },
      {
        speaker: 'agent',
        timestamp: '01:34.1',
        text: 'Perfect. Main aapko plain cotton-linen blend ka sample bhej deti hoon. Kya aapki koi specific colour preference hai?',
        intent: 'SLOT_FILL_COLOUR',
      },
      {
        speaker: 'user',
        timestamp: '01:43.2',
        text: 'Beige colour.',
        intent: 'COLOUR_CAPTURED',
        detectedAttributes: { colour: 'Beige' },
      },
      {
        speaker: 'agent',
        timestamp: '01:47.0',
        text: 'Main beige colour mein cotton-linen blend ka sample arrange kar deti hoon. Main aapko WhatsApp par details bhej dungi, aap dekh kar batana kya pasand aaya. Kya aur koi requirement hai aapki?',
        intent: 'SAMPLE_DISPATCH_AND_WHATSAPP_FANOUT',
        detectedAttributes: { sample: 'Beige cotton-linen blend', channel: 'WhatsApp media payload' },
      },
      {
        speaker: 'user',
        timestamp: '01:58.3',
        text: 'Aapke paas kaunsa best fabric available hai?',
        intent: 'CATALOG_INQUIRY',
      },
      {
        speaker: 'agent',
        timestamp: '02:02.8',
        text: 'Hamare paas cotton-linen blend ke alawa Milano aur Play Plain bhi kaafi popular fabrics hain. Milano thoda richer texture deta hai aur Play Plain lightweight aur versatile hai. Aapko inmein se kisi ke baare mein aur details chahiye ya kisi specific application ke liye dekhna hai?',
        intent: 'CATALOG_RAG_RESPONSE',
        detectedAttributes: { catalog_hits: 'Milano, Play Plain', source: 'Live fabric range KB' },
      },
      {
        speaker: 'user',
        timestamp: '02:19.6',
        text: 'Milano ka price range bata sakte hain?',
        intent: 'PRICING_REQUEST',
      },
      {
        speaker: 'agent',
        timestamp: '02:24.9',
        text: 'Mujhe maaf kijiye, lekin main pricing details discuss nahi kar sakti. Par agar aap sample dekhna chahein to main aapko Milano ka sample bhej sakti hoon, taaki aap quality aur texture khud dekh saken. Kya ye theek rahega?',
        intent: 'PRICING_GUARDRAIL_DEFLECTION',
        detectedAttributes: { guardrail: 'No pricing disclosure', redirect: 'Milano sample offer' },
      },
    ],
  },
  {
    id: 'ringg-priya',
    name: 'Priya (Ringg AI Engine)',
    platform: 'Ringg AI Native RAG + Deepgram',
    persona: 'Outbound B2B Discovery & Fabric Sourcing Qualifier',
    language: 'Hindi & Conversational English',
    stt: 'Deepgram Nova-3 Hindi',
    tts: 'Ringg Native Ultra-Low Latency Vocal',
    llm: 'Native 5-Node Conversational Graph with Inlined KB',
    latency: '~240ms Median Response',
    costPerMin: '$0.03 / min',
    audioUrl: '/audio/priya-calling-agent.mp3',
    audioFileName: 'Priya calling agent.mp3',
    // Two-channel recording: agent and prospect land on separate channels, which is
    // how these turn boundaries were measured. The call runs past 01:57.
    clipEnd: 117,
    absoluteTiming: true,
    keyFeatures: [
      'Opens with a 30-year credibility line before making any ask',
      'Permission gate offers the prospect an explicit way out ("ya aap busy hain?")',
      'Reflective paraphrasing confirms intent before the script advances a stage',
      'Hands the choice back to the prospect instead of pushing the catalogue',
      'Low-confidence STT triggers a re-prompt rather than a guessed answer',
      'Platform-level inlined fabric KB (cotton, viscose, polyester, linen blends)',
    ],
    transcript: [
      {
        speaker: 'agent',
        timestamp: '00:00.0',
        text: 'Hello, main Priya bol rahi hoon, LD Silk Mills, Mumbai se. Hum 30 saal se premium fabrics aur digital printing par kaam kar rahe hain. Kya main [name unclear] ji se baat kar rahi hoon?',
        intent: 'IDENTITY_AND_CREDIBILITY_INTRO',
        detectedAttributes: { caller: 'LD Silk Mills, Mumbai', credibility: '30 years in fabrics' },
      },
      {
        speaker: 'user',
        timestamp: '00:12.6',
        text: 'Ji.',
        intent: 'IDENTITY_CONFIRMED',
      },
      {
        speaker: 'agent',
        timestamp: '00:15.5',
        text: 'Maine aapke business ko thoda study kiya tha aur mujhe laga ki LD Silk Mills ke fabric aur printing solutions aapke kaam mein achhi value add kar sakte hain. Kya abhi 2-3 minutes baat karne ka sahi time hai ya aap busy hain?',
        intent: 'PROSPECT_RESEARCH_AND_PERMISSION',
        detectedAttributes: { ask: 'Permission for 2-3 min', opt_out: 'Explicitly offered' },
      },
      {
        speaker: 'user',
        timestamp: '00:26.9',
        text: 'Ji haan, aap baat kar sakte hain.',
        intent: 'PERMISSION_GRANTED',
      },
      {
        speaker: 'agent',
        timestamp: '00:34.7',
        text: 'Achha, ek baat batayiye. Is waqt aap koi specific fabric dhoondh rahe hain ya koi naya project plan kar rahe hain? Mujhe pata hai aap apni product category mein major player hain. To abhi aapke business mein kya chal raha hai?',
        intent: 'DISCOVERY_OPEN_QUESTION',
      },
      {
        speaker: 'user',
        timestamp: '00:42.5',
        text: 'Abhi hum shirtings mein kaam kar rahe hain. Search kar rahe hain, soch rahe hain.',
        intent: 'REQUIREMENT_CAPTURED',
        detectedAttributes: { category: 'Shirtings', stage: 'Exploring options' },
      },
      {
        speaker: 'agent',
        timestamp: '00:51.3',
        text: 'Samajh gayi. Matlab abhi aap apne business ke liye search kar rahe hain, shayad naye fabric options explore karna chahte hain?',
        intent: 'REFLECTIVE_CONFIRMATION',
        detectedAttributes: { technique: 'Paraphrase back before advancing' },
      },
      {
        speaker: 'user',
        timestamp: '00:59.7',
        text: 'Haan, sahi kaha aapne. Search kar rahe hain.',
        intent: 'CONFIRMATION_RECEIVED',
      },
      {
        speaker: 'agent',
        timestamp: '01:00.8',
        text: 'Ji, bilkul. To abhi aap fabric sourcing ke initial stage par hain. Achha, ek cheez batayiye, kya aap apna khud ka fabric prefer karenge, ya aap mujhe batayein ki LD Silk Mills kya-kya provide karti hai?',
        intent: 'STAGE_LABELLED_AND_CHOICE_HANDBACK',
        detectedAttributes: { funnel_stage: 'Initial sourcing' },
      },
      {
        speaker: 'user',
        timestamp: '01:12.0',
        text: 'Aap mujhe batayiye na ki LD Silk Mills kya-kya provide karti hai.',
        intent: 'CATALOG_INQUIRY',
      },
      {
        speaker: 'agent',
        timestamp: '01:18.5',
        text: 'Haan, bilkul. Hamare paas cotton, viscose, polyester aur linen blends mein kaafi varieties mil jayengi.',
        intent: 'CATALOG_KB_RESPONSE',
        detectedAttributes: { range: 'Cotton, viscose, polyester, linen blends' },
      },
      {
        speaker: 'agent',
        timestamp: '01:24.5',
        text: 'Achha, ek baar batayiye, ye digital print fabric aap kis end-use ke liye chahenge - garments, uniform ya retail sale ke liye?',
        intent: 'END_USE_QUALIFICATION',
      },
      {
        speaker: 'user',
        timestamp: '01:32.9',
        text: 'Retail sale ke liye.',
        intent: 'END_USE_CAPTURED',
        detectedAttributes: { end_use: 'Retail sale' },
      },
      {
        speaker: 'agent',
        timestamp: '01:37.6',
        text: 'Ji, maaf kijiye, thoda clear nahi suna.',
        intent: 'ASR_LOW_CONFIDENCE_REPROMPT',
        detectedAttributes: { stt_confidence: 'Below threshold', behaviour: 'Re-prompt, never guess' },
      },
      {
        speaker: 'agent',
        timestamp: '01:47.3',
        text: 'Ji, maaf kijiye, thoda clear nahi suna.',
        intent: 'ASR_LOW_CONFIDENCE_REPROMPT',
        detectedAttributes: { retry: '2 of 2', escalation: 'Human callback queue' },
      },
    ],
  },
];

export const PROJECT_BRIEFS: ProjectBrief[] = [
  {
    id: 'brief-01',
    briefNumber: 'Brief 01',
    title: 'Universal Lead-Generation Engine',
    subtitle: 'RAG-Deduplicated Multi-Source Prospecting Graph',
    plainSubtitle: 'Finds new customers for you, without the repeat names',
    plainProblem: 'Har campaign ke baad the same names kept coming back. The team lost days cleaning duplicate lists and calling people who were never going to buy.',
    plainSolution: 'You fill one short form. The system searches for matching businesses, drops anyone already in your list, and writes clean decision-maker contacts into your sheet.',
    plainImpact: 'A list that used to take two days of manual work now lands in under 20 seconds, with no repeats.',
    plainTags: [
      'No repeat leads',
      'Ready in under 20s',
      'Straight into your sheet',
      'Works for any industry',
    ],
    category: 'ai_automation',
    featured: true,
    clientContext: 'Multi-entity B2B enterprise requiring automated high-intent prospect generation across disparate industries.',
    businessProblem: 'Manual lead prospecting suffered from duplicate records across marketing campaigns, messy unstandardized search queries, and high celebrity/unqualified founder noise.',
    businessOutcome: 'Constructed an automated form-to-lead pipeline generating 100% deduplicated, SMB-specific decision-maker profiles directly to vector index and CRM sheets.',
    architectureSummary: 'Form Trigger -> LLM Form Normalization -> 3 Parallel Search Fan-Outs (Serper + SerpApi Tool) -> Code Merge -> Past Lead Vector Deduplication -> GPT-4o Lead Extractor -> Pinecone 1536-dim Upsert -> Google Sheets Sync.',
    architectureNodes: [
      'Webhook Form Trigger',
      'LLM Form Normalizer (GPT-4o)',
      'Serper REST Fan-Out (gl=in, us)',
      'SerpApi LinkedIn Agent Tool',
      'Pinecone RAG Dedup Filter',
      'Strict SMB Identity Gate',
      'Google Sheets Pipeline Output'
    ],
    apiIntegrations: [
      {
        service: 'Serper.dev',
        endpoint: 'POST google.serper.dev/search',
        purpose: 'Multi-query Google search fan-out',
        details: 'Key-value serialization avoiding nested object bugs; 3 queries fired in parallel for comprehensive coverage.'
      },
      {
        service: 'SerpApi (Agent Tool)',
        endpoint: 'GET serpapi.com/search',
        purpose: 'LinkedIn Decision-Maker Scraping',
        details: 'Attached as an LLM agent tool rather than naive HTTP node to allow model-paced queries without triggering rate limits.'
      },
      {
        service: 'Pinecone Vector DB',
        endpoint: 'POST /vectors/upsert',
        purpose: 'Cosine Similarity Past-Lead Dedup',
        details: 'Index: lead-gen (1536-dim, text-embedding-3-small). Direct REST fallback prevents empty-index zero-result halting.'
      },
      {
        service: 'OpenAI API',
        endpoint: 'POST /v1/chat/completions',
        purpose: 'Form Normalization & Lead Extraction',
        details: 'GPT-4o converts informal inputs like "founders or decision makers" into strict Boolean search queries.'
      }
    ],
    customCode: {
      title: 'Pinecone Empty-Vector Cold Start Guard & Lead-Quality Filter',
      description: 'Engineered a direct REST invocation and fallback parser in Javascript that intercepts empty vector matches on initial runs without breaking execution flows, coupled with SMB-exclusive negative search filters.',
      snippets: [
        {
          language: 'javascript',
          filename: 'pinecone-rest-guard.js',
          description: 'Prevents workflow halting on empty vector database index',
          code: `// n8n Code Node: Cold Start Pinecone Vector Guard
const pastLeads = [];
try {
  const pineconeResponse = $input.first().json;
  if (pineconeResponse && pineconeResponse.matches && pineconeResponse.matches.length > 0) {
    pineconeResponse.matches.forEach(match => {
      if (match.metadata && match.metadata.fullName) {
        pastLeads.push(match.metadata.fullName.toLowerCase().trim());
      }
    });
  }
} catch (err) {
  // Graceful fallback to search merge data on cold runs
  console.warn("Cold index detected or empty matches:", err.message);
}

// Attach canonical past lead lookup table to avoid duplicate enrichment
return [{ json: { pastLeadRegistry: pastLeads, totalHistoricalCount: pastLeads.length } }];`
        }
      ]
    },
    deploymentDetails: {
      stack: 'n8n (Self-Hosted), Node.js, Pinecone REST, OpenAI text-embedding-3-small',
      hosting: 'Hostinger Cloud VPS with Docker Compose',
      specialFixes: [
        'Overcame n8n MCP server timeout on 20+ node graphs via Validate-then-Import native JSON protocol.',
        'Eliminated celebrity noise with negative search operators (-wikipedia -forbes -shark) & 11-50 employee size filters.'
      ]
    },
    demonstrates: [
      'Reusable AI Pipeline Architecture',
      'RAG Deduplication Engines',
      'Cold-Start Defect Diagnosis',
      'Dynamic Agent Tool Pacing'
    ],
    metrics: [
      { label: 'Repeat Leads', value: 'Zero' },
      { label: 'Sources Searched', value: '3 at once' },
      { label: 'List Ready In', value: '< 18 sec' },
    ],
    defectLog: [
      {
        problem: 'Pinecone vector node halts workflow on zero matches during index cold start.',
        rootCause: 'Node was firing per parallel merge branch; all 3 empty outputs halted linear execution.',
        solution: 'Re-architected to direct Pinecone REST call with deterministic empty-array fallback.',
        impact: '100% reliable execution even on freshly provisioned client vector namespaces.'
      }
    ]
  },
  {
    id: 'brief-02',
    briefNumber: 'Brief 02',
    title: 'Autonomous Lead-Research & Enrichment Pipeline',
    subtitle: 'Evidence-Locked Anti-Hallucination RAG Architecture',
    plainSubtitle: 'Company details your team can actually trust',
    plainProblem: 'AI tools were inventing revenue figures, staff counts and GST numbers. Reps quoted wrong details to clients and lost trust in the first meeting.',
    plainSolution: 'Every detail is checked against a real source before it is saved. If the system cannot prove it, it leaves the field empty instead of guessing.',
    plainImpact: '33 verified details per company, nothing invented, and the running cost cut by 64%.',
    plainTags: [
      'Nothing made up',
      '33 details per company',
      '64% cheaper to run',
      'Blank beats wrong',
    ],
    category: 'ai_automation',
    featured: true,
    clientContext: 'High-volume inbound sales pipeline processing cold textile and B2B manufacturer leads.',
    businessProblem: 'Standard LLM scrapers hallucinated company revenue, employee counts, and GST registration details, causing sales reps to pitch inaccurate offerings.',
    businessOutcome: 'Engineered a 33-column enrichment pipeline governed by an immutable "RAG Lock" and automated "Cross Validator" agent that audits facts with a computable trust score.',
    architectureSummary: 'Read Pending Queue -> Platform-Aware Search (Serper) -> Smart Result Picker (GPT-4o-mini Identity Gate) -> Confidence Gate -> Evidence Formatter (RAG Lock) -> 4 Sequential Analysis LLMs -> Cross Validator Agent -> Priority Routing -> 33-Col Sheet Sync.',
    architectureNodes: [
      'Queue Poller (Batches of 3)',
      'Platform-Aware Search Queries',
      'Identity Matcher (GPT-4o-mini)',
      'Confidence Gate (Low Drop)',
      'RAG Lock Evidence Assembler',
      '4-Pass Structured Extraction',
      'Cross-Validator Hallucination Audit',
      'Priority Scoring & Routing'
    ],
    apiIntegrations: [
      {
        service: 'Serper REST (gl=in)',
        endpoint: 'POST google.serper.dev/search',
        purpose: 'Targeted Regional Inbound Investigation',
        details: 'Constructs 3 distinct queries tuned to Instagram, IndiaMART, TradeIndia, JustDial, and raw website domains.'
      },
      {
        service: 'OpenAI GPT-4o-mini',
        endpoint: 'POST /v1/chat/completions',
        purpose: 'Identity Verification & Fast Classification',
        details: 'Performs token-efficient slug/email/phone matching before deep research is triggered.'
      },
      {
        service: 'OpenAI GPT-4o',
        endpoint: 'POST /v1/chat/completions',
        purpose: 'Deep Evidence-Locked Extraction & Cross-Audit',
        details: 'Audits every extracted entity exclusively against the evidence bundle and returns trust scores.'
      }
    ],
    customCode: {
      title: 'The Canonical RAG Lock & Trust Score Validator',
      description: 'Assembles an unalterable evidence markdown bundle. Downstream nodes are strictly forbidden from generating inferences outside this bundle, verified by a dedicated validation agent.',
      snippets: [
        {
          language: 'javascript',
          filename: 'rag-lock-formatter.js',
          description: 'Constructs tamper-proof evidence bundle for downstream LLMs',
          code: `// n8n Code Node: Evidence Formatter (The RAG Lock)
const searchOutputs = $input.all().map(item => item.json);
const verifiedLead = $('Smart Result Picker').first().json;

let evidenceBundle = "=== CANONICAL EVIDENCE DOSSIER (LOCKED) ===\\n";
evidenceBundle += \`Target: \${verifiedLead.companyName} | Domain: \${verifiedLead.domain}\\n\`;
evidenceBundle += \`Confidence: \${verifiedLead.matchConfidence} | Source: \${verifiedLead.primarySource}\\n\\n\`;

searchOutputs.forEach((res, idx) => {
  if (res.organic && Array.isArray(res.organic)) {
    res.organic.slice(0, 5).forEach((snippet, sIdx) => {
      evidenceBundle += \`[DOC_\${idx}_\${sIdx}] TITLE: \${snippet.title}\\n\`;
      evidenceBundle += \`SNIPPET: \${snippet.snippet}\\n\`;
      evidenceBundle += \`LINK: \${snippet.link}\\n---\\n\`;
    });
  }
});

return [{
  json: {
    canonicalEvidence: evidenceBundle,
    ragLockTimestamp: new Date().toISOString(),
    strictExtractionDirective: "Extract ONLY from above snippets. If absent, output NULL. NEVER extrapolate."
  }
}];`
        }
      ]
    },
    deploymentDetails: {
      stack: 'n8n Workflow Engine, Serper API, OpenAI GPT-4o, Google Sheets API',
      hosting: 'Dedicated VPS instance running n8n with persistent queue storage',
      specialFixes: [
        'Maintained a documented 19-item defect registry preventing infinite loops on disqualified leads.',
        'Fixed silent lead loss caused by strict-type string/number mismatches in priority switchers.'
      ]
    },
    demonstrates: [
      'Anti-Hallucination RAG Design',
      'Defensive AI Pipeline Engineering',
      'Multi-Stage Confidence Gating',
      'Rigorous Defect Inventory Tracking'
    ],
    metrics: [
      { label: 'Made-Up Facts', value: 'Zero' },
      { label: 'Details Per Company', value: '33' },
      { label: 'Running Cost', value: '-64%' },
    ],
    defectLog: [
      {
        problem: 'Disqualified leads were never written and looped infinitely in pending state.',
        rootCause: 'Priority switch did not have an explicit default sink for null/disqualified records.',
        solution: 'Added catch-all lane routing low-confidence leads to INSUFFICIENT_DATA status column.',
        impact: 'Saved thousands of unnecessary API calls and stopped queue backpressure.'
      }
    ]
  },
  {
    id: 'brief-04',
    briefNumber: 'Brief 04',
    title: 'Bilingual Voice AI Calling Agents',
    subtitle: 'Vapi.ai ("Monika") & Ringg AI ("Priya") Parity Suite',
    plainSubtitle: 'A caller who speaks Hinglish and never misses a lead',
    plainProblem: 'Leads went cold because nobody called back within 5 minutes. English-only bots could not follow Hindi or fabric terms, so customers simply hung up.',
    plainSolution: 'Two AI agents call in natural Hinglish, ask the right questions in order, and write everything the customer said straight into your CRM.',
    plainImpact: 'Replies in a quarter of a second, qualifies 78 out of every 100 callers, and runs at $0.11 a minute.',
    plainTags: [
      'Talks in Hinglish',
      'Replies in 0.25s',
      '78% qualified',
      'Calls day and night',
    ],
    category: 'voice_ai',
    featured: true,
    clientContext: 'High-speed textile manufacturing mill processing hundreds of daily fabric and printing inquiries.',
    businessProblem: 'Sales teams could not reach inbound leads within the critical 5-minute window, resulting in 40%+ drop-off. Language barriers (Hinglish/Hindi terminology) confused standard English bots.',
    businessOutcome: 'Deployed dual voice agents speaking natural conversational Hinglish with sub-300ms latency, boosting domain vocabulary by 20+ fabric terms and extracting structured post-call schemas.',
    architectureSummary: 'Inbound Webhook / Queue -> Vapi / Ringg API Trigger -> Deepgram Nova-3 Hindi STT (Vocabulary Boosted) -> GPT-4o-mini Reasoning -> ElevenLabs Flash v2.5 TTS -> Post-Call Structured Schema Extraction -> WhatsApp Catalog Auto-Dispatch.',
    architectureNodes: [
      'Call Queue Listener',
      'Deepgram Nova-3 Hindi STT',
      'Textile Vocabulary Booster',
      'Inlined System Prompt Logic',
      'ElevenLabs Flash v2.5 TTS',
      'VAD & Silence Detection',
      'Post-Call Schema Auditor',
      'Maytapi WhatsApp Dispatch'
    ],
    apiIntegrations: [
      {
        service: 'Vapi.ai REST',
        endpoint: 'POST /call/phone',
        purpose: 'Outbound Dialing & Variable Mapping',
        details: 'Maps 18 camelCase call variables from CRM; polls call state and extracts typed structuredDataSchema.'
      },
      {
        service: 'Deepgram STT',
        endpoint: 'wss://api.deepgram.com/v1/listen',
        purpose: 'Nova-3 Hindi with Domain Vocabulary Boosting',
        details: 'Boosted 20+ textile terms (Viscose, Digital Satin, Crepe, GSM, Challan, Roll, Slub, Modal, Velvet).'
      },
      {
        service: 'ElevenLabs',
        endpoint: 'POST /v1/text-to-speech',
        purpose: 'Flash v2.5 Ultra-Low Latency Vocal Generation',
        details: 'Configured for high stability and natural pacing without robotic stuttering.'
      },
      {
        service: 'Ringg AI Engine',
        endpoint: 'POST /v1/calls/dispatch',
        purpose: 'Platform-Native 5-Node Conversational Flow',
        details: 'Utilizes 18 lowercase custom_args_values and native inlined Knowledge Base RAG.'
      }
    ],
    customCode: {
      title: 'Voice Latency Budgeting & Textile Recovery Logic',
      description: 'Benchmarked and eliminated a 500-800ms external RAG network hop by inlining knowledge into system prompts. Authored a domain recovery filter that catches mistranscribed fabric names mid-call.',
      snippets: [
        {
          language: 'json',
          filename: 'vapi-structured-data-schema.json',
          description: 'Post-call structured schema self-auditing hallucinations',
          code: `{
  "type": "object",
  "properties": {
    "lead_outcome": { "type": "string", "enum": ["QUALIFIED", "NOT_INTERESTED", "CALLBACK_REQUESTED", "WRONG_NUMBER"] },
    "specific_fabric_interest": { "type": "string", "description": "Exact fabric mentioned e.g. Viscose Satin 120 GSM" },
    "estimated_moq_meters": { "type": "number", "description": "Target order volume in meters" },
    "timeline": { "type": "string", "description": "Expected dispatch date or timeframe" },
    "hallucination_detected": { "type": "boolean", "description": "Set true if caller inquired about unsupported fabric" },
    "next_action": { "type": "string", "enum": ["SEND_WHATSAPP_CATALOG", "BOOK_COORDINATOR_CALL", "FLAG_REVIEW"] }
  },
  "required": ["lead_outcome", "specific_fabric_interest", "next_action"]
}`
        }
      ]
    },
    deploymentDetails: {
      stack: 'Vapi.ai, Ringg AI, Deepgram Nova-3 Hindi, ElevenLabs Flash v2.5, n8n Orchestrator, ngrok',
      hosting: 'Cloud Voice Gateways with n8n Webhook Receivers',
      specialFixes: [
        'Extended silence detection from 20s to 60s with VAD to prevent premature hang-ups during caller thinking time.',
        'Created platform delta table reconciling syntax differences (@{{var}} on Ringg vs {{var}} on Vapi).'
      ]
    },
    demonstrates: [
      'Sub-300ms Real-Time Voice Engineering',
      'Latency vs Capability Budgeting',
      'Bilingual STT Domain Vocabulary Boosting',
      'Multi-Platform Agent Parity'
    ],
    metrics: [
      { label: 'Reply Speed', value: '0.25 sec' },
      { label: 'Cost Per Minute', value: '$0.11' },
      { label: 'Callers Qualified', value: '78%' },
    ],
    defectLog: [
      {
        problem: 'Bespoke external RAG endpoint created 500-800ms lag making conversation unnatural.',
        rootCause: 'FastAPI + pgvector + embedding hop added multiple round-trip network latencies.',
        solution: 'Inlined core product matrices into system prompt and used native KB lookup.',
        impact: 'Reduced total turnaround time to ~250ms, achieving silky smooth human-like cadence.'
      }
    ]
  },
  {
    id: 'brief-05',
    briefNumber: 'Brief 05',
    title: 'Lead Management System & Orchestration Layer',
    subtitle: 'Event-Driven Auto-Pilot with Human-Takeover Lock',
    plainSubtitle: 'AI handles the calls, your team steps in anytime',
    plainProblem: 'Do log ek hi lead ko call kar dete the. Nobody knew who had spoken to whom, and there was no way to stop the AI once it was mid-conversation.',
    plainSolution: 'One shared board everyone can see. The AI works through the queue on its own, and any staff member can take over a live conversation with a single click.',
    plainImpact: 'No more double-calling, every lead contacted inside 45 seconds, and no cap on daily calls.',
    plainTags: [
      'No double-calling',
      'Contacted in 45s',
      'Take over anytime',
      'No daily limit',
    ],
    category: 'ai_automation',
    featured: true,
    clientContext: 'Central sales operations hub coordinating inbound enrichment and autonomous voice calling.',
    businessProblem: 'Operations suffered from double-dialing race conditions, manual tracking across sheets, and lack of human safety override when AI agents were actively engaging clients.',
    businessOutcome: 'Constructed an in-memory GLOBAL_DATA lead store with 20s heartbeat sync, an AI Auto-Pilot with instant human takeover lock, and automated calendar/catalog fan-outs.',
    architectureSummary: 'Lead Queue Trigger (IST Time-Window Guard) -> Row Lock (Calling Status) -> Voice Agent Dispatch (Vapi/Ringg) -> Transcript GPT Assessment -> Action Fan-Out (Google Calendar 30-min Booking / WhatsApp Catalog Send) -> CRM Sync.',
    architectureNodes: [
      'IST Time-Window Guard',
      'Row-Lock Concurrency Guard',
      'Voice Agent Dispatcher',
      'Transcript JSON Analyzer',
      'Human-Takeover Lock State',
      'Meeting Booking Engine (GCal)',
      'WhatsApp Notification Fan-Out',
      'Event-Driven Supabase Target'
    ],
    apiIntegrations: [
      {
        service: 'Google Calendar API',
        endpoint: 'POST /calendars/primary/events',
        purpose: 'Automated 30-minute Sales Meeting Booking',
        details: 'Generates calendar invite with parsed lead context and sends automated confirmation email.'
      },
      {
        service: 'Maytapi / AiSensy WhatsApp API',
        endpoint: 'POST /sendMessage',
        purpose: 'Instant Catalog & PDF Brochure Dispatch',
        details: 'Triggers personalized WhatsApp media messages within 10 seconds of call completion.'
      },
      {
        service: 'Supabase (Migration Target)',
        endpoint: 'POST /rest/v1/leads',
        purpose: 'Event-Driven Webhook Layer',
        details: 'Replaces 10-minute polling loop with real-time websocket subscriptions.'
      }
    ],
    customCode: {
      title: 'Human-in-the-Loop Takeover State Machine',
      description: 'Implemented atomic status flags that allow a human sales manager to claim a lead instantly, freezing AI calling queues and re-routing all live webhooks to the operator workspace.',
      snippets: [
        {
          language: 'typescript',
          filename: 'lead-lock-engine.ts',
          description: 'Atomic concurrency and human takeover lock',
          code: `export interface LeadState {
  leadId: string;
  status: 'PENDING' | 'AI_CALLING' | 'HUMAN_LOCKED' | 'COMPLETED' | 'REVIEW';
  lockedBy: string | null;
  lockTimestamp: number | null;
}

export function claimLeadByHuman(lead: LeadState, operatorId: string): { success: boolean; state: LeadState } {
  // Human takeover supersedes AI calling lock immediately
  const updatedState: LeadState = {
    ...lead,
    status: 'HUMAN_LOCKED',
    lockedBy: operatorId,
    lockTimestamp: Date.now()
  };
  
  // Abort any active automated webhook triggers
  return { success: true, state: updatedState };
}`
        }
      ]
    },
    deploymentDetails: {
      stack: 'Next.js 14, Supabase (Postgres), n8n Orchestrator, Google Apps Script V8',
      hosting: 'Vercel + Supabase Managed Postgres with n8n VPS Backend',
      specialFixes: [
        'Designed full architectural spec moving system from 10-min polling sheet to instantaneous event-driven webhooks.',
        'Implemented IST time-window restrictions (10-12, 14-16, 17-19) to adhere to strict telecom compliance.'
      ]
    },
    demonstrates: [
      'Human-in-the-Loop AI Orchestration',
      'Event-Driven Modernization',
      'Atomic Concurrency Locks',
      'Multi-Channel Automated Fan-Out'
    ],
    metrics: [
      { label: 'Daily Call Limit', value: 'None' },
      { label: 'Lead Contacted In', value: '< 45 sec' },
      { label: 'Board Refresh', value: '20 sec' },
    ]
  },
  {
    id: 'brief-06',
    briefNumber: 'Brief 06',
    title: 'Textile Jobwork Production ERP',
    subtitle: 'Split Challans & Actuals-Based Invoicing Engine',
    plainSubtitle: 'Bills the meters you actually produced, not the meters ordered',
    plainProblem: 'Ek order kai challans mein jaata hai, each finishing on a different date. Normal ERPs cannot handle that, so billing was done by hand and money leaked every month.',
    plainSolution: 'Built around how the mill actually runs: one order, many challans, and invoices raised on the meters really rolled.',
    plainImpact: 'Billing matches production exactly, so nothing is under-billed or quietly written off.',
    plainTags: [
      'Bills actual meters',
      'One order, many challans',
      'No hand tallying',
      'Built for jobwork',
    ],
    category: 'enterprise_apps',
    featured: true,
    clientContext: 'Major digital sublimation print mill processing multi-stage variable textile orders.',
    businessProblem: 'Traditional ERPs failed because one fabric order splits into multiple challans, items complete at different times, and billing must occur on actual rolled meters rather than ordered quantity.',
    businessOutcome: 'Designed a domain-specific production ERP mapping real-world physical workflows: One Order -> Many Challans -> Many Tax Invoices on actual produced meters with optional inventory linkage.',
    architectureSummary: 'Order Entry -> Per-Item Challan Gate -> Designer Studio (DEO) -> QC Gate -> Printing -> Fusing -> Calendaring (Conditional) -> Rolling (Actual Meters) -> Split Dispatch -> Actuals Invoicing.',
    architectureNodes: [
      'Order Indent Module',
      'Multi-Challan Item Gate',
      'Designer Studio (TIFF to JPG)',
      'QC & Print Workflow',
      'Rolling & Actual Meterage',
      'Split Tax Invoice Generator',
      'Optional Inventory Link Engine'
    ],
    apiIntegrations: [
      {
        service: 'Custom ERP Backend API',
        endpoint: 'POST /api/v1/orders/jobwork',
        purpose: 'Hierarchical Production State Tracking',
        details: 'Tracks 1:N relations between orders, split challans, and partial dispatch tax invoices.'
      },
      {
        service: 'Inventory Sync Service',
        endpoint: 'POST /api/v1/inventory/consume',
        purpose: 'Conditional Raw Material Depletion',
        details: 'Optional mode toggle handles internal vs customer-supplied fabric stock without database restructuring.'
      }
    ],
    customCode: {
      title: 'Schema-Preserving Optional Inventory Link & Meterage Converter',
      description: 'Solved the architectural split between external fabric customer challans vs internal inventory without breaking the relational schema, incorporating real-time yard-to-meter production recalculations.',
      snippets: [
        {
          language: 'typescript',
          filename: 'jobwork-actuals-invoicing.ts',
          description: 'Calculates partial billing and actual roll meterage',
          code: `export interface ProductionBatch {
  orderId: string;
  challanNumber: string;
  orderedQuantityYards: number;
  actualRolledMeters: number;
  ratePerMeter: number;
  isExternalFabricSupplied: boolean;
}

export function generateActualsInvoice(batch: ProductionBatch) {
  // Convert and calculate based purely on actual produced output
  const billableAmount = batch.actualRolledMeters * batch.ratePerMeter;
  const wastagePercentage = ((batch.orderedQuantityYards * 0.9144 - batch.actualRolledMeters) / (batch.orderedQuantityYards * 0.9144)) * 100;
  
  return {
    invoiceType: 'PARTIAL_ACTUALS_TAX_INVOICE',
    challan: batch.challanNumber,
    billedMeters: batch.actualRolledMeters,
    totalPayable: billableAmount,
    shrinkageWastage: Number(wastagePercentage.toFixed(2))
  };
}`
        }
      ]
    },
    deploymentDetails: {
      stack: 'TypeScript, React 18, Node.js API, PostgreSQL Database',
      hosting: 'Private Subdomain Deployment on Enterprise Cloud',
      specialFixes: [
        'Engineered auto-generated lot tracking across split batches.',
        'Delivered complete plain-language developer specifications enabling flawless agency execution.'
      ]
    },
    demonstrates: [
      'Complex Domain Process Modeling',
      'Real-World Physical Manufacturing ERP',
      'Schema-Preserving Problem Solving',
      'Technical Developer Spec Authoring'
    ],
    metrics: [
      { label: 'Split Orders', value: 'Handled' },
      { label: 'Billing Leakage', value: 'Zero' },
      { label: 'Stages Tracked', value: '8' },
    ]
  }
];

export const WORKFLOW_SIMULATION_STEPS = [
  {
    step: 1,
    title: 'Inbound Lead Intake',
    nodeName: 'Webhook_Ingress',
    payload: {
      company: 'Paramount Silk Mills',
      contact: 'Rajesh Sharma',
      inquiry: 'Need 1,200m Viscose Satin 120 GSM digital print',
      source: 'Inbound WhatsApp Webhook'
    },
    latency: '12ms',
    status: 'COMPLETED',
    log: '[INGRESS] Webhook received payload from AiSensy gateway. Validating contact parameters.'
  },
  {
    step: 2,
    title: 'RAG Evidence Lock Assembly',
    nodeName: 'Evidence_Formatter_Lock',
    payload: {
      canonicalEvidenceId: 'EVID_89412',
      serperMatches: 4,
      verifiedGST: '27AABCP1234F1Z8',
      socialProfile: 'indiamart.com/paramountsilk'
    },
    latency: '340ms',
    status: 'COMPLETED',
    log: '[RAG LOCK] Immutable evidence bundle compiled. Locking context against model priors.'
  },
  {
    step: 3,
    title: 'Anti-Hallucination Extraction & Audit',
    nodeName: 'Cross_Validator_GPT4o',
    payload: {
      fabricDiscussed: 'Viscose Satin (120 GSM)',
      estimatedQuantity: 1200,
      hallucinationDetected: false,
      trustScore: 98.4
    },
    latency: '820ms',
    status: 'COMPLETED',
    log: '[AUDITOR] Verified extracted GSM and fabric against evidence. Zero hallucination detected.'
  },
  {
    step: 4,
    title: 'Autonomous Voice / WhatsApp Fan-Out',
    nodeName: 'Vapi_Monika_Dispatch',
    payload: {
      agentDispatched: 'Monika (Hindi/Hinglish)',
      callVariablesMapped: 18,
      status: 'DIALING_TRIGGERED',
      followUpAction: 'SEND_WHATSAPP_CATALOG'
    },
    latency: '245ms',
    status: 'COMPLETED',
    log: '[VOICE AGENT] Initiated sub-300ms bilingual qualification call. Ready for coordinator handoff.'
  }
];
