import uvicorn
import os

if __name__ == "__main__":
    """
    This is the main entry point for running the app.
    
    It's an alternative to running:
    uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
    """
    
    port = int(os.environ.get("PORT", 8000))
    
    uvicorn.run(
        "app.main:app",      
        host="0.0.0.0",       
        port=port,            
        reload=True        
    )