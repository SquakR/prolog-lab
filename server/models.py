from enum import Enum

from bson import ObjectId
from pydantic import BaseModel, Field

from utils import PyObjectId


class Gender(str, Enum):
    MALE = 'male'
    FEMALE = 'female'


class Person(BaseModel):
    id: PyObjectId = Field(alias='_id')
    name: str
    gender: Gender

    class Config:
        json_encoders = {ObjectId: str}
