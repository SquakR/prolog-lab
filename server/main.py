from fastapi import FastAPI

from server.routers import relationship_graph, algebraic_problems, lists

api_prefix = '/api'
app = FastAPI()
app.include_router(relationship_graph.router, prefix=api_prefix)
app.include_router(algebraic_problems.router, prefix=api_prefix)
app.include_router(lists.router, prefix=api_prefix)
