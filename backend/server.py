from fastapi import FastAPI
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from emergentintegrations.llm.chat import LlmChat, UserMessage
import os
import json
import asyncio

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
                # Send message and get streaming response
                full_response = ""
                async for chunk in chat.send_message_stream(user_message):
                    if chunk:
                        full_response += chunk
                        # Send each chunk as Server-Sent Events
                        yield f"data: {json.dumps({'content': chunk})}\n\n"
                        await asyncio.sleep(0)  # Allow other coroutines to run
                
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