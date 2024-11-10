from rest_framework import serializers
from .models import Todo, Priority


class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todo
        fields = "__all__"


class PrioritySerializer(serializers.ModelSerializer):
    title = TodoSerializer()

    class Meta:
        model = Priority
        fields = "__all__"
