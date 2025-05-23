# Recipe Hub

A Django-based recipe management application with a RESTful API backend and a frontend interface for browsing and managing recipes.

## Project Structure

```
recipe_hub/
├── Data/                        # Data files
│   ├── cuisines.csv             # Cuisine data
│   └── recipes.json             # Recipe data
├── recipe_hub/                  # Django project root
│   ├── recipe_catalog/          # Main recipe app (API)
│   │   ├── management/commands/ # Custom Django commands
│   │   │   └── load_recipes.py  # Data loading command
│   │   ├── migrations/          # Database migrations
│   │   ├── admin.py             # Django admin configuration
│   │   ├── models.py            # Database models
│   │   ├── serializers.py       # DRF serializers
│   │   ├── views.py             # API views
│   │   ├── urls.py              # URL routing
│   │   └── pagination.py        # Custom pagination
│   ├── recipe_hub_frontend/     # Frontend app
│   │   ├── templates/           # HTML templates
│   │   ├── static/              # Static files (CSS, JS)
│   │   └── views.py             # Frontend views
│   └── recipe_hub/              # Project configuration
│       ├── settings.py          # Django settings
│       ├── urls.py              # Main URL configuration
│       └── wsgi.py              # WSGI configuration
└── manage.py                    # Django management script
```


## Setup Instructions

### 1. Clone the Repository

```bash
git clone <repository-url>
cd recipe_hub
```

### 2. Install Dependencies-

```bash
pip install -r requirements.txt
```

### 3. Database Setup

#### MySQL Database Configuration

1. **Create MySQL Database:**
   ```sql
   CREATE DATABASE RECIPES_DB;
   ```

2. **Database Schema:**
   The application uses the following database schema:
   - `cuisine` (VARCHAR) - Recipe cuisine type
   - `title` (VARCHAR) - Recipe title
   - `rating` (FLOAT) - Recipe rating
   - `prep_time` (INT) - Preparation time in minutes
   - `cook_time` (INT) - Cooking time in minutes
   - `total_time` (INT) - Total cooking time
   - `description` (TEXT) - Recipe description
   - `nutrients` (JSON) - Nutritional information
   - `calories` (INT) - Calories count in kcal
   - `serves` (VARCHAR) - Number of servings

3. **Configure Database Connection:**
   Update `recipe_hub/settings.py` with your MySQL credentials:
   ```python
   DATABASES = {
       'default': {
           'ENGINE': 'django.db.backends.mysql',
           'NAME': 'RECIPES_DB',
           'USER': 'your_mysql_user',
           'PASSWORD': 'your_mysql_password',
           'HOST': 'localhost',
           'PORT': '3306',
       }
   }
   ```

4. **Run Django Migrations:**
   ```bash
   cd recipe_hub
   python manage.py makemigrations
   python manage.py migrate
   ```


### 4. Load Initial Data

Load recipes:

```bash
python manage.py load_recipes
```

### 5. Run Development Server

```bash
python manage.py runserver
```

The application will be available at:
- Frontend: `http://127.0.0.1:8000/`
- API: `http://127.0.0.1:8000/api/`
- Admin: `http://127.0.0.1:8000/admin/`



## API Endpoints

### Recipes
- `GET /api/recipes/` - List all recipes (with pagination and filtering)
- `GET /api/recipes/{id}/` - Get specific recipe details

### API Testing Examples

#### 1. List All Recipes
```bash
curl -X GET "http://localhost:8000/api/recipes/"
```
Returns a paginated list of all recipes.

#### 2. Search Recipes with Advanced Filters
The API supports the following search parameters:

**Available Parameters:**
- **`title`** - Search recipes with titles containing the given text (case-insensitive)
- **`cuisine`** - Filter recipes by exact cuisine name (case-insensitive)
- **`calories`** - Filter recipes by calories with all comparison operators
- **`total_time`** - Filter recipes by total cooking time using comparison operators
- **`rating`** - Filter recipes by rating (supports decimals) using comparison operators

**Example Requests:**
```bash
# Search by title
GET http://localhost:8000/api/search/?title=pasta

# Filter by cuisine
GET http://localhost:8000/api/search/?cuisine=Italian

# Search combining multiple filters
GET http://localhost:8000/api/search/?cuisine=Asian&calories=<500&rating=>=4.5
```

## Development

### Project Apps

1. **recipe_catalog**: Main backend app handling API endpoints and data models
2. **recipe_hub_frontend**: Frontend app with templates and static files
