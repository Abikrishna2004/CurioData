import pandas as pd
import io
from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from . import analysis, models 

app = FastAPI(
    title="CurioData API",
    description="Analyzes uploaded CSV/Excel files and returns data reports.",
)

analysis.init_analysis()


origins = [
    "http://localhost:3000",
    "https://curiodata.netlify.app", 
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.mount(
    "/charts", 
    StaticFiles(directory=analysis.CHARTS_DIR), 
    name="charts"
)



@app.post("/upload-and-analyze/", response_model=models.AnalysisResponse)
async def upload_and_analyze(file: UploadFile = File(...)):
    """
    This is the main endpoint.
    1. Accepts a file.
    2. Reads it with Pandas.
    3. Generates summaries and charts.
    4. Returns all data as JSON.
    """
    
    filename = file.filename
    contents = await file.read()
    
    try:
        if filename.endswith('.csv'):
            df = pd.read_csv(io.BytesIO(contents))
        elif filename.endswith(('.xls', '.xlsx')):
            df = pd.read_excel(io.BytesIO(contents))
        else:
            raise HTTPException(status_code=400, detail="Invalid file type.")
            
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error reading file: {e}")

    summary = analysis.get_data_summary(df)
    
    chart_urls = analysis.generate_charts(df)
    

    return {
        "filename": filename,
        "columns": summary.get('columns'),
        "description": summary.get('description'),
        "missing_values": summary.get('missing_values'),
        "charts": chart_urls
    }

@app.get("/")
def read_root():
    return {"message": "DataGenius API is running."}