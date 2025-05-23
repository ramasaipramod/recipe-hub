from django.db import models

class Recipe(models.Model):
    cuisine = models.CharField(max_length=255)
    title = models.CharField(max_length=255)
    rating = models.FloatField(null=True, blank=True)
    prep_time = models.IntegerField(null=True, blank=True)
    cook_time = models.IntegerField(null=True, blank=True)
    total_time = models.IntegerField(null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    nutrients = models.JSONField(null=True, blank=True)
    calories = models.IntegerField(null=True, blank=True)
    serves = models.CharField(max_length=100)

    def __str__(self):
        return self.title
