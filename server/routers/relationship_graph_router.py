from bson import ObjectId
from fastapi import APIRouter, Depends, status
from motor.core import Collection
from pymongo.results import InsertOneResult

from database import get_parent_collection, get_person_collection
from models import InputPerson, Node, OutputPerson, Parent
from prolog import relationship_graph_prolog_wrapper

router = APIRouter(
    prefix='/relationship_graph',
    tags=['relationship_graph']
)


@router.get('/persons/', response_model=list[OutputPerson])
async def persons(person_collection: Collection = Depends(get_person_collection)):
    return [person async for person in person_collection.find()]


@router.get('/parents/', response_model=list[Parent])
async def parents(parent_collection: Collection = Depends(get_parent_collection)):
    return [parent async for parent in parent_collection.find()]


@router.post('/add_person/', response_model=OutputPerson, status_code=status.HTTP_201_CREATED)
async def add_person(person: InputPerson, person_collection: Collection = Depends(get_person_collection)):
    insert_result: InsertOneResult = await person_collection.insert_one(person.dict())
    created_person = await person_collection.find_one({'_id': insert_result.inserted_id})
    return created_person


@router.patch('/move_person/', response_model=OutputPerson)
async def move_person(person_id: str, node: Node, person_collection: Collection = Depends(get_person_collection)):
    return await person_collection.find_one_and_update({'_id': ObjectId(person_id)}, {'$set': {'node': node.dict()}})


@router.delete('/delete_person/')
async def delete_person(
    person_id: str, person_collection: Collection = Depends(get_person_collection)
):
    await person_collection.delete_one({'_id': ObjectId(person_id)})
    return person_id


@router.post('/add_parent/', response_model=Parent)
async def add_parent(parent_id: str, child_id: str, parent_collection: Collection = Depends(get_parent_collection)):
    insert_result: InsertOneResult = await parent_collection.insert_one(
        {
            'parent_id': ObjectId(parent_id),
            'child_id': ObjectId(child_id)
        }
    )
    created_parent = await parent_collection.find_one({'_id': insert_result.inserted_id})
    return created_parent


@router.get('/program_code/')
async def program_code():
    return await relationship_graph_prolog_wrapper.program_code
