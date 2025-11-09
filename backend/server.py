from fastapi import FastAPI
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from emergentintegrations.llm.chat import LlmChat, UserMessage
import os
from dotenv import load_dotenv
import json
import asyncio

# Load environment variables
load_dotenv()

app = FastAPI()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class PromptRequest(BaseModel):
    prompt: str
    context: str | None = None

@app.get("/")
async def root():
    return {"message": "tldraw AI chat server"}

@app.get("/api/health")
async def health_check():
    return {"status": "ok"}

@app.post("/api/ask")
async def ask_stream(request: PromptRequest):
    """Stream Claude Sonnet 4 chat completion response"""
    try:
        # Get Emergent LLM key
        api_key = os.getenv("EMERGENT_LLM_KEY")
        if not api_key:
            return {"error": "API key not configured"}, 500
        
        # Create chat instance with Claude Sonnet 4
        chat = LlmChat(
            api_key=api_key,
            session_id=f"canvas-session",
            system_message="You are a helpful assistant integrated into a collaborative drawing canvas. Provide clear, concise, and helpful responses."
        ).with_model("anthropic", "claude-sonnet-4-20250514")
        
        # Create user message
        user_message = UserMessage(text=request.prompt)
        
        async def generate():
            """Generator function to stream responses"""
            try:
                # Send message and get response
                # Note: emergentintegrations doesn't have send_message_stream, so we get full response
                response = await chat.send_message(user_message)
                
                # Simulate streaming by sending the response in chunks
                chunk_size = 10  # characters per chunk
                for i in range(0, len(response), chunk_size):
                    chunk = response[i:i + chunk_size]
                    yield f"data: {json.dumps({'content': chunk})}\n\n"
                    await asyncio.sleep(0.02)  # Small delay to simulate streaming
                
                # Send completion signal
                yield "data: [DONE]\n\n"
            except Exception as e:
                error_msg = f"Error during streaming: {str(e)}"
                yield f"data: {json.dumps({'error': error_msg})}\n\n"
        
        return StreamingResponse(
            generate(),
            media_type="text/event-stream",
            headers={
                "Cache-Control": "no-cache",
                "Connection": "keep-alive",
                "X-Accel-Buffering": "no"
            }
        )
    
    except Exception as e:
        return {"error": str(e)}, 500

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)