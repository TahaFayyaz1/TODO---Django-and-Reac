from .models import Todo, Priority
from .serializers import TodoSerializer, PrioritySerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

# Create your views here.


@api_view(["GET", "POST"])
def todos(request):
    if request.method == "GET":
        todos = Todo.objects.all()
        return Response(
            TodoSerializer(todos, many=True).data, status=status.HTTP_200_OK
        )

    elif request.method == "POST":
        serializer = TodoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET", "PUT", "DELETE"])
def todo_id(request, todo_id):
    try:
        todo = Todo.objects.get(pk=todo_id)
    except Todo.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == "GET":
        return Response(TodoSerializer(todo).data)

    elif request.method == "PUT":
        serializer = TodoSerializer(todo, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == "DELETE":
        todo.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(["GET"])
def priorities(request):
    priorities = Priority.objects.all()
    return Response(
        PrioritySerializer(priorities, many=True).data, status=status.HTTP_200_OK
    )


@api_view(["GET", "POST", "DELETE"])
def priority(request, todo_id):
    if request.method == "POST":
        todo = Todo.objects.get(pk=todo_id)
        priority = Priority(title=todo)
        priority.save()
        return Response(status=status.HTTP_201_CREATED)

    try:
        todo = Todo.objects.get(pk=todo_id)
        priority = Priority.objects.get(title=todo)

        if request.method == "GET":
            return Response(PrioritySerializer(priority).data)

        elif request.method == "DELETE":
            priority.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)

    except Priority.DoesNotExist:
        return Response(status=status.HTTP_400_BAD_REQUEST)
