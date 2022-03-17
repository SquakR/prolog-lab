import uvicorn
from fastapi import FastAPI

from server.database import close_db, connect_db
from server.routers import algebraic_problems_router, lists_router, relationship_graph_router

api_prefix = '/api'
app = FastAPI()
app.add_event_handler('startup', connect_db)
app.add_event_handler('shutdown', close_db)
app.include_router(relationship_graph_router.router, prefix=api_prefix)
app.include_router(algebraic_problems_router.router, prefix=api_prefix)
app.include_router(lists_router.router, prefix=api_prefix)

if __name__ == '__main__':
    uvicorn.run(app, host='localhost', port=8000)
