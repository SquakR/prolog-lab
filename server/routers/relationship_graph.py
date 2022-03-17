from fastapi import APIRouter


router = APIRouter(
    prefix='/relationship_graph',
    tags=['relationship_graph']
)


@router.get('/')
async def main():
    return 'Main'
