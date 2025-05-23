from rest_framework.pagination import PageNumberPagination
from rest_framework.exceptions import ValidationError

class CustomPagination(PageNumberPagination):
    page_size = 15  # default
    page_size_query_param = 'limit'
    max_page_size = 50

    def get_page_size(self, request):
        try:
            page_size = int(request.query_params.get(self.page_size_query_param, self.page_size))
            if 15 <= page_size <= self.max_page_size:
                return page_size
            raise ValidationError("Limit must be between 15 and 50")
        except ValueError:
            raise ValidationError("Limit must be an integer")
