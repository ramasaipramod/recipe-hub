from django.shortcuts import render
from django.http import JsonResponse
import requests
from django.conf import settings

def recipe_list(request):
    try:
        # Build API URL
        base_url = request.build_absolute_uri('/api/recipes/')
        if request.GET.get('search') == 'true':
            base_url = request.build_absolute_uri('/api/recipes/search/')

        params = {key: value for key, value in request.GET.items() if key != 'search'}
        response = requests.get(base_url, params=params)
        response.raise_for_status()
        recipes_data = response.json()

        return render(request, 'recipe_hub_frontend/recipe_list.html', {
            'recipes': recipes_data
        })
    
    except requests.RequestException as e:
        return render(request, 'recipe_hub_frontend/recipe_list.html', {
            'error': 'Failed to fetch recipes',
            'message': str(e),
        })

