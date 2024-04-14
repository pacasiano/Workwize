from django.shortcuts import render

# Create your views here.

from rest_framework import viewsets
from .serializers import UserSerializer, ProjectSerializer, TaskSerializer, SubtaskSerializer, UserSubtaskSerializer
from .models import User, Project, Task, Subtask, UserSubtask

class UserView(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()

class ProjectView(viewsets.ModelViewSet):
    serializer_class = ProjectSerializer
    queryset = Project.objects.all()

class TaskView(viewsets.ModelViewSet):
    serializer_class = TaskSerializer
    queryset = Task.objects.all()

class SubtaskView(viewsets.ModelViewSet):
    serializer_class = SubtaskSerializer
    queryset = Subtask.objects.all()

class UserSubtaskView(viewsets.ModelViewSet):
    serializer_class = UserSubtaskSerializer
    queryset = UserSubtask.objects.all()

