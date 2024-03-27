from fastapi import APIRouter, Depends, Path
from pydantic import BaseModel, Field
from starlette import status
from starlette.exceptions import HTTPException
from sqlalchemy.orm import Session
from typing import Annotated

from database import SessionLocal
from models import Todos
from .auth import JWTBearer, CurrentUser

router = APIRouter(
    prefix="/Todos",
    tags=["Todos"]
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


db_dependency = Annotated[Session, Depends(get_db)]
user_dependency = Annotated[CurrentUser, Depends(JWTBearer())]


class TodoRequest(BaseModel):
    title: str = Field()
    description: str = Field()
    priority: int = Field()
    is_done: bool = Field()


@router.get("", status_code=status.HTTP_200_OK)
async def get_all_todos(db: db_dependency, user: user_dependency):
    return db.query(Todos).filter(Todos.owner_id == user.user_id).all()


@router.get("/{todo_id}", status_code=status.HTTP_200_OK)
async def get_todo_by_id(db: db_dependency, user: user_dependency, todo_id: int = Path()):
    todo = db.query(Todos).filter(Todos.owner_id == user.user_id and Todos.id == todo_id).first()

    if todo is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)

    return todo


@router.post("", status_code=status.HTTP_201_CREATED)
async def todo_create(db: db_dependency, user: user_dependency, todo_request: TodoRequest):
    todo_model = Todos(**todo_request.model_dump(), owner_id=user.user_id)

    db.add(todo_model)
    db.commit()

    return todo_model


@router.put("/{todo_id}", status_code=status.HTTP_204_NO_CONTENT)
async def todo_update(db: db_dependency, user: user_dependency, todo_request: TodoRequest, todo_id: int = Path()):
    todo = db.query(Todos).filter(Todos.owner_id == user.user_id and Todos.id == todo_id).first()

    if todo is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)

    todo.title = todo_request.title
    todo.description = todo_request.description
    todo.priority = todo_request.priority
    todo.complete = todo_request.complete

    db.add(todo)
    db.commit()


@router.delete("/{todo_id}", status_code=status.HTTP_204_NO_CONTENT)
async def todo_delete(db: db_dependency, user: user_dependency, todo_id: int = Path()):
    todo = db.query(Todos).filter(Todos.owner_id == user.user_id and Todos.id == todo_id).first()

    if todo is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)

    db.delete(todo)
    db.commit()
