# CakriHUT

CakriHUT is a job portal website built using React and FastAPI. The platform supports multiple user roles, including super admin, admin, and normal users. Users can apply for jobs, search for job openings, and post job opportunities.

## Features

- **User Roles**: Super Admin, Admin, and Normal Users.
- **Job Application**: Users can apply for jobs directly through the portal.
- **Job Search**: Users can search for job openings based on various criteria.
- **Job Posting**: Admins and Super Admins can post new job opportunities.
- **User Management**: Super Admins can manage user accounts and permissions.

## Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/avik-halder/CakriHUT.git
   cd CakriHUT
   ```

2. **Backend Setup:**

   - Create a virtual environment:
     ```sh
     python -m venv env
     source env/bin/activate   # On Windows use `env\Scripts\activate`
     ```

   - Install dependencies:
     ```sh
     pip install -r requirements.txt
     ```

   - Start the FastAPI server:
     ```sh
     uvicorn main:app --reload
     ```

3. **Frontend Setup:**

   - Navigate to the frontend directory:
     ```sh
     cd frontend
     ```

   - Install dependencies:
     ```sh
     npm install
     ```

   - Start the React development server:
     ```sh
     npm run dev
     ```

## Usage

1. **Super Admin**: Manages all users and site settings.
2. **Admin**: Can post job opportunities and manage job listings.
3. **Normal User**: Can search and apply for jobs.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for review.


## Contact

For any inquiries, please contact Avik Halder at [official.avik.h@gmail.com].

---
