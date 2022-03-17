from fastapi import APIRouter


router = APIRouter(
    prefix='/algebraic_problems',
    tags=['algebraic_problems']
)


@router.get('/')
async def main():
    return 'Main'
