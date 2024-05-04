# Serializers convert model instances to JSON so Frontend can easily work with it
# Like taking an object in JS and passing it to JSON.stringify()

from rest_framework import serializers
from .models import User, Project, Task, Subtask, UserSubtask, Label

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('user_id', 'email', 'username', 'password', 'first_name', 'last_name', 'role')

class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = ('project_id', 'project_name')

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ('task_id', 'project_id', 'task_name', 'color')

class SubtaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subtask
        fields = ('subtask_id', 'task_id', 'subtask_name', 'description', 'end_date', 'start_date')
    
class UserSubtaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserSubtask
        fields = ('user_id', 'subtask_id')

class LabelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Label
        fields = ('label_id', 'subtask_id', 'label_name', 'color')


# JWT Setup
from djoser.serializers import UserSerializer as DjoserUserSerializer, UserCreateSerializer as BaseUserSerializer

class UserCreateSerializer(BaseUserSerializer):
    class Meta(BaseUserSerializer.Meta):
        fields = ['user_id', 'email', 'username', 'password']

class CurrentUserSerializer(DjoserUserSerializer):
    class Meta(DjoserUserSerializer.Meta):
        fields = ['user_id', 'email', 'username', 'password']