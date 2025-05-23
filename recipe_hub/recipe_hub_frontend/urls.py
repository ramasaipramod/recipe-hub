from django.urls import path
from . import views

app_name = 'recipe_hub_frontend'

urlpatterns = [
    path('', views.recipe_list, name='recipe_list'),
]
