from django.urls import path
from . import views

urlpatterns = [
    path("todo", views.todos, name="todos"),
    path("priority", views.priorities, name="priorities"),
    path("todo/<int:todo_id>", views.todo_id, name="todo_id"),
    path("priority/<int:todo_id>", views.priority, name="priority"),
]
