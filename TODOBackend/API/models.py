from django.db import models

# Create your models here.


class Todo(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    completed = models.BooleanField(default=True)
    datatime = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title


class Priority(models.Model):
    title = models.ForeignKey(Todo, on_delete=models.CASCADE, related_name="priority")

    def __str__(self):
        return self.title.title
