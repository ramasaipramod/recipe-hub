from django.urls import path
from .views import RecipeListView, search

urlpatterns = [
    path('recipes/', RecipeListView.as_view(), name='recipes'),
    path('recipes/search', search, name='search'),
]
