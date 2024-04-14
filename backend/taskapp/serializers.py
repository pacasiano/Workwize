# Serializers convert model instances to JSON so Frontend can easily work with it
# Like taking an object in JS and passing it to JSON.stringify()

from rest_framework import serializers
from .models import User, Project, Task, Subtask, UserSubtask

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('user_id', 'email', 'username', 'password', 'first_name', 'last_name', 'role')

class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = ('project_id', 'user', 'project_name')

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ('task_id', 'project', 'task_name', 'deadline')

class SubtaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subtask
        fields = ('subtask_id', 'task', 'description', 'status')
    
class UserSubtaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserSubtask
        fields = ('user', 'subtask')