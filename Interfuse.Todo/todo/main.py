from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from todo.database import engine
from todo.routers import todos, health
from todo.models import Base

origins = [
    "http://localhost:3000",
]

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)

app.include_router(health.router)
app.include_router(todos.router)
