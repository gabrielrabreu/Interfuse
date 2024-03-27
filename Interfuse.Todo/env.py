from dotenv import load_dotenv
import os

load_dotenv()

AUDIENCE = os.getenv("AUDIENCE")
ISSUER = os.getenv("ISSUER")
SECRET_KEY = os.getenv("SECRET_KEY")
SQLALCHEMY_DATABASE_URL = os.getenv("SQLALCHEMY_DATABASE_URL")
