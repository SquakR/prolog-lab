from fastapi import APIRouter

from prolog import lists_prolog_wrapper

router = APIRouter(
    prefix='/lists',
    tags=['lists']
)


@router.get('/program_code/')
async def program_code():
    return await lists_prolog_wrapper.program_code
