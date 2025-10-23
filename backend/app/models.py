from pydantic import BaseModel
from typing import List, Dict, Any

class AnalysisResponse(BaseModel):
    """
    Defines the shape of the JSON response for the /upload-and-analyze/ endpoint.
    """
    filename: str
    columns: Dict[str, str]
    description: Dict[str, Any]
    missing_values: Dict[str, Any]
    charts: List[str]