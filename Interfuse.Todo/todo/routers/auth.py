from fastapi import Request
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from jose import jwt, JWTError
from starlette import status
from starlette.exceptions import HTTPException
from typing import Optional

from todo.env import AUDIENCE, ISSUER, SECRET_KEY


class ClaimTypes:
    NAME = "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"
    NAME_IDENTIFIER = "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
    ROLE = "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"


class CurrentUser:
    def __init__(self, user_id: str, user_name: str, user_role: str):
        self.user_id = user_id
        self.user_name = user_name
        self.user_role = user_role


class JWTBearer(HTTPBearer):
    def __init__(self, role: Optional[str] = None):
        super(JWTBearer, self).__init__(auto_error=False)
        self.role = role

    async def __call__(self, request: Request):
        credentials: HTTPAuthorizationCredentials = await super(JWTBearer, self).__call__(request)
        if credentials:
            if not credentials.scheme == "Bearer":
                raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)
            token = JWTBearer.decode_token(credentials.credentials)
            if not token:
                raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)
            user_id = token.get(ClaimTypes.NAME_IDENTIFIER)
            user_name = token.get(ClaimTypes.NAME)
            user_role = token.get(ClaimTypes.ROLE)
            if self.role and user_role not in self.role:
                raise HTTPException(status_code=status.HTTP_403_FORBIDDEN)
            return CurrentUser(user_id, user_name, user_role)
        else:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)

    @staticmethod
    def decode_token(token: str) -> dict | None:
        try:
            decoded_token = jwt.decode(token,
                                       audience=AUDIENCE,
                                       issuer=ISSUER,
                                       key=SECRET_KEY,
                                       algorithms="HS256")
            return decoded_token
        except JWTError:
            return None
