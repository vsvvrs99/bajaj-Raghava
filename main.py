from fastapi import FastAPI, File, UploadFile
from pydantic import BaseModel
from typing import List, Optional
import base64
import os

app = FastAPI()

class DataInput(BaseModel):
    data: List[str]
    file_b64: Optional[str] = None

@app.get("/bfhl")
async def get_operation_code():
    return {"operation_code": 1}

@app.post("/bfhl")
async def post_bfhl(data_input: DataInput):
    # Extracting numbers and alphabets
    numbers = [item for item in data_input.data if item.isdigit()]
    alphabets = [item for item in data_input.data if item.isalpha()]
    
    # Getting the highest lowercase alphabet
    lowercase_alphabets = [ch for ch in alphabets if ch.islower()]
    highest_lowercase = max(lowercase_alphabets) if lowercase_alphabets else None

    # Decode the Base64 file if present
    file_valid = False
    file_mime_type = None
    file_size_kb = None
    
    if data_input.file_b64:
        try:
            file_data = base64.b64decode(data_input.file_b64)
            file_size_kb = len(file_data) / 1024
            file_valid = True  # If decoding works, we assume it's valid for now
            # Assuming a MIME type, you might need a library like python-magic for MIME type detection
            file_mime_type = "application/octet-stream"
        except Exception:
            file_valid = False
    
    return {
        "is_success": True,
        "user_id": "Raghava_Sharma_25012004",
        "Collage email": "vv0952@srmist.edu.in",
        "roll_number": "RA2111026020099",
        "numbers": numbers,
        "alphabets": alphabets,
        "highest_lowercase_alphabet": [highest_lowercase] if highest_lowercase else [],
        "file_valid": file_valid,
        "file_mime_type": file_mime_type,
        "file_size_kb": file_size_kb
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
