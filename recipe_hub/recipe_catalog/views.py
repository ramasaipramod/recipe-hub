from rest_framework.generics import ListAPIView
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .pagination import CustomPagination
from .models import Recipe
from .serializers import RecipeSerializer
from urllib.parse import unquote


class RecipeListView(ListAPIView):
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer
    pagination_class = CustomPagination


@api_view(['GET'])
def search(request):
    query = Recipe.objects.all()
    filters = {
        'title__icontains': request.GET.get('title'),
        'cuisine__iexact': request.GET.get('cuisine'),
    }

    # Apply simple string filters
    query = query.filter(**{k: v for k, v in filters.items() if v})

    # Comparison filters
    def apply_comparison_filter(field_name, raw_value, cast_type):
        try:
            raw = unquote(raw_value.strip())
            ops = {'<=': 'lte', '>=': 'gte', '<': 'lt', '>': 'gt'}
            for op_symbol, op_lookup in ops.items():
                if raw.startswith(op_symbol):
                    return {f"{field_name}__{op_lookup}": cast_type(raw[len(op_symbol):])}
            return {field_name: cast_type(raw)}  
        except:
            return {}

    numeric_filters = {
        'calories': (request.GET.get('calories'), int),
        'total_time': (request.GET.get('total_time'), int),
        'rating': (request.GET.get('rating'), float),
    }

    for field, (value, cast_type) in numeric_filters.items():
        if value:
            query = query.filter(**apply_comparison_filter(field, value, cast_type))

    paginator = CustomPagination()
    result_page = paginator.paginate_queryset(query, request)
    serializer = RecipeSerializer(result_page, many=True)
    return paginator.get_paginated_response(serializer.data)
