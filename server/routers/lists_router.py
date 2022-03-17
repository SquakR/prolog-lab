from fastapi import APIRouter


router = APIRouter(
    prefix='/lists',
    tags=['lists']
)


@router.get('/')
async def main():
    return 'Main'
