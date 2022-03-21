from bson import ObjectId
from fastapi import APIRouter, Depends, status
from motor.core import Collection
from pymongo.results import InsertOneResult

from database import get_person_collection
from models import Gender, InputPerson, Node, OutputPerson
from prolog import relationship_graph_prolog_wrapper

router = APIRouter(
    prefix='/relationship_graph',
    tags=['relationship_graph']
)


@router.get('/persons/', response_model=list[OutputPerson])
async def persons(person_collection: Collection = Depends(get_person_collection)):
    return [person async for person in person_collection.find()]


@router.post('/add_person/', response_model=OutputPerson, status_code=status.HTTP_201_CREATED)
async def add_person(person: InputPerson, person_collection: Collection = Depends(get_person_collection)):
    insert_result: InsertOneResult = await person_collection.insert_one(person.dict())
    created_person = await person_collection.find_one({'_id': insert_result.inserted_id})
    return created_person


@router.delete('/delete_person/')
async def delete_person(
    person_id: str, person_collection: Collection = Depends(get_person_collection)
):
    await person_collection.delete_one({'_id': ObjectId(person_id)})
    return person_id


@router.patch('/move')
async def move(person_id: str, node: Node, person_collection: Collection = Depends(get_person_collection)):
    return await person_collection.update_one({'_id': ObjectId(person_id)}, {'$set': {'node': node.dict()}})


@router.patch('/change_gender/')
async def change_gender(
    person_id: str,
    gender: Gender,
    person_collection: Collection = Depends(get_person_collection),
):
    await person_collection.update_one({'_id': ObjectId(person_id)}, {'$set': {'gender': gender}})
    return person_id


@router.get('/program_code/')
async def program_code():
    return await relationship_graph_prolog_wrapper.program_code
