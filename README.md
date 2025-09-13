# Job Application Tracker

## 📋 Project Overview
A comprehensive job application tracking system that helps job seekers manage applications, resumes, and communications with potential employers.

## ✨ Features
- Track job applications with statuses
- Manage master resume and tailored resume variants
- Log communication history per application
- Set reminders for follow-up actions
- Dashboard view of all applications

## 🛠️ Technologies
**Backend**:
- Django
- Django REST Framework
- SQLite database

**Frontend**:
- React
- Vite build tool
- React Router

## 🚀 Installation & Setup

### Backend Setup
```bash
# Create and activate virtual environment
python -m venv venv
source venv/bin/activate  # Linux/Mac
venv\Scripts\activate    # Windows

# Install dependencies
pip install -r requirements.txt

# Apply migrations
python manage.py migrate

# Create superuser
python manage.py createsuperuser

# Run development server
python manage.py runserver
```
### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
## 🌐 API Documentation
### Job Applications
- `GET /api/applications/` - List all applications
- `POST /api/applications/` - Create new application
- `GET /api/applications/{id}/` - Get application details
- `PATCH /api/applications/{id}/` - Update application
- `DELETE /api/applications/{id}/` - Delete application

### Communications
- `GET /api/comms/` - List all communications
- `POST /api/comms/` - Create new communication log

### Resumes
- `GET /api/resume/` - List master resumes
- `POST /api/resume/` - Upload new master resume

## 🖥️ Usage
1. **Add Master Resume**: Upload your base resume
2. **Create Application**: Add new job application
3. **Tailor Resume**: Create customized version for specific jobs
4. **Track Status**: Update application status as you progress
5. **Log Communications**: Record all interactions with employers
