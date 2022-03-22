from enum import Enum

from bson import ObjectId
from pydantic import BaseModel, Field

from utils import PyObjectId


class Gender(str, Enum):
    MALE = 'male'
    FEMALE = 'female'


class Node(BaseModel):
    x: float
    y: float


class BasePerson(BaseModel):
    name: str
    gender: Gender
    node: Node

    class Config:
        json_encoders = {ObjectId: str}


class InputPerson(BasePerson):
    pass


class OutputPerson(BasePerson):
    id: PyObjectId = Field(alias='_id')


class Parent(BaseModel):
    id: PyObjectId = Field(alias='_id')
    parent_id: PyObjectId
    child_id: PyObjectId

    class Config:
        json_encoders = {ObjectId: str}
