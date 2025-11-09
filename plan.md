# PDF Upload + RAG for Multiplayer Canvas — Development Plan

Problem Statement: Add a PDF upload feature to the existing multiplayer tldraw canvas so users can upload a PDF, view/scroll it directly on the canvas, and (later) select it to chat with an LLM. Backend must parse PDFs, chunk text, create embeddings, and store in Supabase (storage + pgvector) for RAG.

This requires a Core POC (external integrations + file + embeddings). We will first prove the pipeline PDF → Text → Embeddings → Supabase works, then build the app around it.

## Objectives
- Upload PDFs and render them as scrollable viewers on the canvas (react-pdf)
- Persist PDF binaries in Supabase Storage and store metadata in DB
- Extract text from PDFs, chunk intelligently, embed with OpenAI, and store vectors in Supabase pgvector
- Sync canvas with a lightweight PDF shape that references the stored file/metadata
- Prepare for later LLM chat using stored vectors (no chat yet)

## Phase 1: Core POC (Isolation) — PDF → Text → Embeddings → Supabase
Implementation Steps
1) Web search (best practices): Supabase pgvector + OpenAI embeddings (dims 1536), pdfplumber extraction tips, chunk sizes (800–1000 tokens, 20% overlap)
2) Call Integration Playbook Agent for OpenAI embeddings; use Emergent LLM key during implementation
3) Create Supabase resources (or verify): bucket `pdfs` (public read or signed URLs); tables:
   - pdf_documents(id uuid pk, filename, storage_path, pages, bytes, created_at)
   - pdf_chunks(id uuid pk, document_id fk, page_number, chunk_index, text, embedding vector(1536), metadata jsonb)
   - Enable pgvector extension
4) Backend local POC script (no API) to:
   - Load a sample PDF, extract text & pages (pdfplumber)
   - Chunk text (approx 1000 chars with 200 overlap; ensure page metadata)
   - Generate embeddings (text-embedding-3-small), upsert into Supabase `pdf_chunks`
   - Upload the PDF to Supabase Storage `pdfs/uuid.pdf`, insert `pdf_documents`
5) Validate retrieval: run a sample similarity query in Supabase for a test query vector
6) Fix issues until end-to-end import+embed works reliably (rate limits, chunk sizes, errors)

User Stories (Phase 1)
- As a developer, I can run a script that uploads a PDF to Supabase Storage
- As a developer, I can parse PDF text into page-aware chunks
- As a developer, I can embed chunks via OpenAI and store vectors in Supabase
- As a developer, I can run a similarity search query on stored chunks
- As a developer, I can retrieve a public/signed URL for the PDF file

Exit Criteria (Phase 1)
- One sample PDF processed end-to-end with vectors searchable in Supabase
- Verified PDF readable from Supabase Storage URL

## Phase 2: V1 App Development — Backend API + Upload UI
Implementation Steps
Backend (FastAPI)
1) Add `/api/pdf/upload` (multipart) to: accept file, create `pdf_documents`, upload to Supabase Storage, parse → chunk → embed → insert into `pdf_chunks`; return document metadata + file URL
2) Add `/api/pdf/{document_id}` to fetch metadata/pages and (optionally) signed URL
3) Use UUIDs for all IDs; timezone-aware datetimes; prefix all routes with `/api`
4) Env vars: SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY (preferred), SUPABASE_ANON_KEY, EMERGENT_LLM_KEY
Frontend (React)
5) Install `react-pdf`, `@supabase/supabase-js`; Add Sonner Toaster at root
6) Implement PdfUploadButton (Dialog + file input) near canvas toolbar (Shadcn Button/Dialog/Tooltip) with data-testid coverage
7) On upload: POST to `/api/pdf/upload`, show progress toast; on success, create a PDF shape on the canvas with returned document metadata
8) Handle error states with toasts + inline banners; enforce 20MB cap client-side

User Stories (Phase 2)
- As a user, I can click Upload PDF and pick a file
- As a user, I see a progress indicator while the PDF uploads and is processed
- As a user, I get notified if upload fails and can retry
- As a user, on success a PDF object appears on my canvas
- As a user, I can move/resize the PDF object on the canvas like other elements

Exit Criteria (Phase 2)
- End-to-end flow: client upload → backend store+embed → canvas shows a PDF object referencing Supabase file
- Basic error handling and visible progress implemented

## Phase 3: PDF Viewer Integration with tldraw — Custom Shape
Implementation Steps
1) Create a custom PdfShape that stores: document_id, file_url, page_count, initial width/height
2) Render viewer using react-pdf inside ScrollArea; add controls cluster (zoom +/- and slider), page indicator; all elements carry data-testid
3) Sync shape state via tldraw store; other users see the PDF element and can view/scroll independently
4) Optimize rendering: disable text/annotation layers initially; memoize Document; scale 0.5–2
5) Provide fallback (PdfError) if remote file fails to load; allow Replace/Retry

User Stories (Phase 3)
- As a user, I can zoom in/out on the embedded PDF
- As a user, I can scroll the PDF pages within the canvas shape
- As a user, I see a clear page indicator (e.g., 1/12)
- As a user, I can resize the PDF shape and it reflows correctly
- As a collaborator, I immediately see newly added PDF shapes on my canvas

Exit Criteria (Phase 3)
- PDF renders smoothly in a draggable/resizable canvas shape with working controls

## Phase 4: Testing & Polish
Implementation Steps
1) Call testing agent for end-to-end: upload UX, backend endpoints, Supabase storage, vector inserts
2) Add loading/empty/error states for viewer; enforce data-testid across all interactive/info elements
3) Performance: debounce chunking logs; cap page count for giant PDFs (warn >200 pages)
4) Security: only allow application/pdf; sanitize filenames; limit size (20MB)
5) Analytics hooks (optional): capture successful upload + pages parsed

User Stories (Phase 4)
- As a user, I see clear feedback during loading and when errors occur
- As a user, large PDFs don’t crash the app and I’m warned if limits are exceeded
- As a user, I can identify which PDF object I uploaded via a small label/tooltip
- As a tester, I can assert on data-testid attributes for all critical elements
- As a product owner, I can view logs for upload, parse, embedding durations

Exit Criteria (Phase 4)
- One full round of automated testing green; manual sanity check on canvas
- No known high/medium severity issues open

## Implementation Notes
- Use pdfplumber for robust text extraction; fall back to PyPDF2 on parse failures
- Chunking: ~1000 chars, 200 overlap, keep page_number + chunk_index metadata
- Embeddings: OpenAI `text-embedding-3-small` (1536 dims) via Emergent LLM key; exponential backoff on 429
- Supabase Storage: bucket `pdfs`; prefer signed URL for private buckets; otherwise public read
- Supabase DB: create indexes on (document_id), ivfflat on embedding for ANN (after sufficient rows)
- UI: Follow design_guidelines.md; Shadcn components only; add `data-testid` for all interactive/info elements

## Next Actions (Immediate)
1) Provide Supabase Service Role Key (server-side) and confirm/create bucket `pdfs`
2) Approve backend deps: pdfplumber, supabase-py, emergent integrations (per playbook)
3) Approve frontend deps: react-pdf, @supabase/supabase-js, framer-motion (for micro-interactions)
4) Confirm file size limit: 20MB; single-file uploads only (multi later)
5) Proceed with Phase 1 POC and report results before UI work

## Success Criteria (Overall)
- Users can upload a PDF, see a progress indicator, and get a visible PDF shape on the canvas that they can zoom/scroll
- Each uploaded PDF is stored in Supabase Storage; its text is chunked and embedded into Supabase pgvector with retrievable vectors
- Multiplayer sync shows the same PDF shape to all users with consistent state
- Testing agent validates the end-to-end happy path and key error states
