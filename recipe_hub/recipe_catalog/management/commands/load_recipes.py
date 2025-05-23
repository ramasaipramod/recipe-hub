import os
import json
import math
from django.core.management.base import BaseCommand
from recipe_catalog.models import Recipe

class Command(BaseCommand):
    help = "Load recipes from a JSON file"

    def handle(self, *args, **kwargs):
        base_dir = os.path.dirname(os.path.abspath(__file__))
        project_root = os.path.abspath(os.path.join(base_dir, '../../../../..'))
        json_path = os.path.join(project_root, 'Securin', 'Data', 'recipes.json')

        def validate_number(val):
            try:
                return int(val) if val is not None and not math.isnan(float(val)) else None
            except (TypeError, ValueError):
                return None

        def extract_calories(nutrients):
            try:
                cal_str = nutrients.get("calories", "")
                return int(''.join(filter(str.isdigit, cal_str))) if cal_str else None
            except:
                return None

        with open(json_path) as f:
            data = json.load(f)
            for item in data.values():
                title = item.get('title')
                if not title:
                    continue
                nutrients = item.get('nutrients', {})
                Recipe.objects.create(
                    cuisine=item.get('cuisine'),
                    title=title,
                    rating=validate_number(item.get('rating')),
                    prep_time=validate_number(item.get('prep_time')),
                    cook_time=validate_number(item.get('cook_time')),
                    total_time=validate_number(item.get('total_time')),
                    description=item.get('description'),
                    nutrients=nutrients,
                    serves=item.get('serves'),
                    calories=extract_calories(nutrients), 
                )
