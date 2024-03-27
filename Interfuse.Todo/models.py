from sqlalchemy import Column, Integer, String, Boolean

from database import Base


class Todos(Base):
    __tablename__ = "Todos"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    description = Column(String)
    priority = Column(Integer)
    is_done = Column(Boolean, default=False)
    owner_id = Column(String)
