from fastapi import FastAPI

from todo.database import engine
from todo.routers import todos, health
from todo.models import Base

app = FastAPI()

Base.metadata.create_all(bind=engine)

app.include_router(health.router)
app.include_router(todos.router)
