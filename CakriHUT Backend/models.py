from sqlalchemy import Column, Integer, String, LargeBinary, Boolean, DateTime
from database import Base
from datetime import datetime


class User(Base):
    __tablename__ = "user_registration"

    id = Column(Integer, primary_key=True, index=True)
    user_name = Column(String(255), unique=True)
    mobile_number = Column(String(15), unique=True)
    email = Column(String(320), unique=True)
    is_active = Column(String(5))
    user_id = Column(String(20))
    salt = Column(String(255))
    is_admin = Column(Boolean, default=False)
    super_admin = Column(Boolean, default=False)
    creation_date = Column(DateTime, default=datetime.utcnow)


class Login(Base):
    __tablename__ = "user_login"
   
    id = Column(Integer, primary_key=True, index=True)
    password = Column(LargeBinary)
    user_id = Column(LargeBinary)


class OTP(Base):
    __tablename__ = "user_otp"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(320), unique=True)
    otp = Column(String(10))


class Job(Base):
    __tablename__ = "job_description"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(100))
    description = Column(String(255))
    company = Column(String(100))
    location = Column(String(100))
    category = Column(String(100))
    salary = Column(String(100))
    is_approved = Column(Boolean)
    user_name = Column(String(255))
    created_at = Column(DateTime, default=datetime.utcnow)


class Contact(Base):
    __tablename__ = "contact_us"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(320))
    message = Column(String(255))


class Apply(Base): 
    __tablename__ = "apply_job" 
     
    id = Column(Integer, primary_key=True, unique=True) 
    user_id = Column(String(20)) 
    link = Column(String(255))
    job_id = Column(Integer)








    



