from fastapi import FastAPI

from database import engine
from routers import todos, health
from models import Base

app = FastAPI()

Base.metadata.create_all(bind=engine)

app.include_router(health.router)
app.include_router(todos.router)
