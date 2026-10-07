from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from typing import Optional
from services.statement_parser import StatementParserService

router = APIRouter()

@router.post("/parse")
async def parse_statement(
    file: Optional[UploadFile] = File(None),
    raw_text: Optional[str] = Form(None),
    gemini_api_key: Optional[str] = Form(None)
):
    try:
        content = ""
        if file:
            file_bytes = await file.read()
            try:
                content = file_bytes.decode("utf-8", errors="ignore")
            except Exception:
                content = "Binary PDF statement data"
        elif raw_text:
            content = raw_text
        else:
            raise HTTPException(status_code=400, detail="Either 'file' or 'raw_text' must be provided.")

        result = StatementParserService.parse_statement_content(content, api_key=gemini_api_key)
        return {
            "status": "success",
            "message": "Financial statement parsed successfully.",
            "data": result
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
