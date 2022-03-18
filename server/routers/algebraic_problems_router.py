from fastapi import APIRouter

from prolog import algebraic_problems_prolog_wrapper

router = APIRouter(
    prefix='/algebraic_problems',
    tags=['algebraic_problems']
)


@router.get('/program_code/')
async def program_code():
    return await algebraic_problems_prolog_wrapper.program_code
