from fastapi import APIRouter
from starlette import status

router = APIRouter(
    prefix="/Health",
    tags=["Health"]
)


@router.get("", status_code=status.HTTP_200_OK)
async def health():
    return {"status": "healthy"}
