from typing import Optional

from motor.core import Collection, Database
from motor.motor_asyncio import AsyncIOMotorClient

MONGO_DETAILS = 'mongodb://localhost:27017'

db_client: AsyncIOMotorClient = None
database: Optional[Database] = None
person_collection: Optional[Collection] = None
parent_collection: Optional[Collection] = None


def get_db_client():
    return db_client


def get_database():
    return database


def get_person_collection():
    return person_collection


def get_parent_collection():
    return parent_collection


def connect_db():
    global db_client
    global database
    global person_collection
    global parent_collection
    db_client = AsyncIOMotorClient(MONGO_DETAILS)
    database = db_client.prolog_lab
    person_collection = database.get_collection('person')
    parent_collection = database.get_collection('parent')


def close_db():
    db_client.close()
