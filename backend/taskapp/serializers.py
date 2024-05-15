# Serializers convert model instances to JSON so Frontend can easily work with it
# Like taking an object in JS and passing it to JSON.stringify()

from rest_framework import serializers
from .models import User, Project, UserProject, Task, Subtask, UserSubtask, Label

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('user_id', 'email', 'username', 'password', 'first_name', 'last_name')

class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = ('project_id', 'project_name', 'background', 'isStarred')

class UserProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProject
        fields = ('user_id', 'project_id', 'role')

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ('task_id', 'project_id', 'task_name', 'color', 'order_num')

class SubtaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subtask
        fields = ('subtask_id', 'task_id', 'subtask_name', 'description', 'end_date', 'start_date', 'order_num')
    
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
        model = User
        fields = ['id', 'email', 'username', 'password']

class CurrentUserSerializer(DjoserUserSerializer):
    class Meta(DjoserUserSerializer.Meta):
        model = User
        fields = ['id', 'email', 'username', 'password']