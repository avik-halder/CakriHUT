from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional


class UserBase(BaseModel):
    user_name: str
    mobile_number: str
    email: str
    password: str


class CheckUser(BaseModel):
    user_name: str
    password: str


class UserForgetPassword(BaseModel):
    email: str
    password: str
    otp: str


class UserDelete(BaseModel):
    user_name: str


class UserUpdate(BaseModel):
    user_name: str
    email: str
    mobile_number: str



class JobDescription(BaseModel):
    user_name: str
    title: str
    description: str
    company: str
    location: str
    salary: str
    category: str
    # created_at: datetime


class Contact(BaseModel):
    email: str
    message: str

class Apply(BaseModel): 
    user_name: str 
    link : str
    job_id : int

    

class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    username: str | None = None








    