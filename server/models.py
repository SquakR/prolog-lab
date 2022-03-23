from enum import Enum

from bson import ObjectId
from pydantic import BaseModel, Field

from utils import PyObjectId


class WithId(BaseModel):
    class Config:
        json_encoders = {ObjectId: str}


class Gender(str, Enum):
    MALE = 'male'
    FEMALE = 'female'


class Node(BaseModel):
    x: float
    y: float


class BasePerson(WithId):
    name: str
    gender: Gender
    node: Node


class InputPerson(BasePerson):
    pass


class OutputPerson(BasePerson):
    id: PyObjectId = Field(alias='_id')


class Parent(WithId):
    id: PyObjectId = Field(alias='_id')
    parent_id: PyObjectId
    child_id: PyObjectId


class DeletedObjects(WithId):
    person_ids: list[PyObjectId]
    parent_ids: list[PyObjectId]
