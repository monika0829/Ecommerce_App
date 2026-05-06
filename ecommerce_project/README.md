#  Ecommerce Backend API (Django + DRF)

This is the backend API for an Ecommerce application built using Django and Django REST Framework. It provides authentication, product management, cart system, and order handling.

---

##  Features

- User Registration & Login (JWT)
- Product Listing & Details
- Add to Cart / Update Cart / Remove Cart
- Order Checkout
- Image Upload & Media Handling
- Secure API with JWT Authentication

---

##  Tech Stack

- Python
- Django
- Django REST Framework
- Simple JWT
- SQLite (default)

---

##  Project Structure
ecommerce/
│
├── accounts/ # User authentication
├── products/ # Product models & APIs
├── cart/ # Cart & cart items
├── orders/ # Order & checkout
├── media/ # Uploaded images
├── ecommerce/ # Main project settings

---
## SETUP 
### 1. Clone Project

```bash
git clone <your-repo-url>
cd ecommerce_project

### 
2.Create Virtual Environment
python -m venv env
env\Scripts\activate   # Windows

3.Install Dependencies
pip install -r requirements.txt

4. Run Migrations
python manage.py makemigrations
python manage.py migrate

5. Create Superuser
python manage.py createsuperuser

6. Run Server
python manage.py runserver