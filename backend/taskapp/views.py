from django.shortcuts import render

# Create your views here.

from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import viewsets
from .serializers import UserSerializer, ProjectSerializer, UserProjectSerializer, TaskSerializer, SubtaskSerializer, UserSubtaskSerializer, LabelSerializer
from .models import User, Project, UserProject, Task, Subtask, UserSubtask, Label

class UserView(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()

class ProjectView(viewsets.ModelViewSet):
    serializer_class = ProjectSerializer
    queryset = Project.objects.all()

class UserProjectView(viewsets.ModelViewSet):
    serializer_class = UserProjectSerializer
    queryset = UserProject.objects.all()

class TaskView(viewsets.ModelViewSet):
    serializer_class = TaskSerializer
    queryset = Task.objects.all()

class SubtaskView(viewsets.ModelViewSet):
    serializer_class = SubtaskSerializer
    queryset = Subtask.objects.all()

class UserSubtaskView(viewsets.ModelViewSet):
    serializer_class = UserSubtaskSerializer
    queryset = UserSubtask.objects.all()

class LabelView(viewsets.ModelViewSet):
    serializer_class = LabelSerializer
    queryset = Label.objects.all()


'''
Actual API for CRUD

Warning: Doesn't follow DRY principle AT ALL :(
Should use generics
'''

class UserList(APIView):
    # List all users, or create a new user.
    
    def get(self, request, format=None):
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserDetail(APIView):
    # Retrieve, update or delete a user instance.

    def get_object(self, pk):
        try:
            return User.objects.get(pk=pk)
        except User.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        user = self.get_object(pk)
        serializer = UserSerializer(instance = user)
        return Response(serializer.data)

    def patch(self, request, pk, format=None):
        user = self.get_object(pk)
        serializer = UserSerializer(instance = user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        user = self.get_object(pk)
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    

class ProjectList(APIView):
    # List all projects, or create a new project.
    
    def get(self, request, format=None):
        projects = Project.objects.all()
        serializer = ProjectSerializer(projects, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = ProjectSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ProjectDetail(APIView):
    # Retrieve, update or delete a project instance.

    def get_object(self, pk):
        try:
            return Project.objects.get(pk=pk)
        except Project.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        project = self.get_object(pk)
        serializer = ProjectSerializer(instance = project)
        return Response(serializer.data)

    def patch(self, request, pk, format=None):
        project = self.get_object(pk)
        serializer = ProjectSerializer(instance = project, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        project = self.get_object(pk)
        project.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
class UserProjectDetail(APIView):
    # Update the role of a user in a project
    # authentication_classes = [JWTAuthentication]
    # permission_classes = [IsAuthenticated, IsOwner]

    def patch(self, request, project_pk, user_pk, format=None):
        try:
            user_project = UserProject.objects.get(project_id=project_pk, user_id=user_pk)
        except UserProject.DoesNotExist:
            return Response({'error': 'UserProject not found'}, status=status.HTTP_404_NOT_FOUND)

        serializer = UserProjectSerializer(instance=user_project, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class TaskList(APIView):
    # List all tasks, or create a new task.
    
    def get(self, request, format=None):
        tasks = Task.objects.all()
        serializer = TaskSerializer(tasks, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = TaskSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class TaskDetail(APIView):
    # Retrieve, update or delete a task instance.

    def get_object(self, pk):
        try:
            return Task.objects.get(pk=pk)
        except Task.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        task = self.get_object(pk)
        serializer = TaskSerializer(instance = task)
        return Response(serializer.data)

    def patch(self, request, pk, format=None):
        task = self.get_object(pk)
        serializer = TaskSerializer(instance = task, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        task = self.get_object(pk)
        task.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    

class SubtaskList(APIView):
    # List all subtasks, or create a new subtask.
    
    def get(self, request, format=None):
        subtasks = Subtask.objects.all()
        serializer = SubtaskSerializer(subtasks, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = SubtaskSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class SubtaskDetail(APIView):
    # Retrieve, update or delete a subtask instance.

    def get_object(self, pk):
        try:
            return Subtask.objects.get(pk=pk)
        except Subtask.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        subtask = self.get_object(pk)
        serializer = SubtaskSerializer(instance = subtask)
        return Response(serializer.data)

    def patch(self, request, pk, format=None):
        subtask = self.get_object(pk)
        serializer = SubtaskSerializer(instance = subtask, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        subtask = self.get_object(pk)
        subtask.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    

class UserSubtaskDetail(APIView):
    # Delete a User from a subtask

    def get_object(self, userid, subtaskid):
        try:
            return UserSubtask.objects.get(user_id = userid, subtask_id = subtaskid)
        except UserSubtask.DoesNotExist:
            raise Http404

    def delete(self, request, userid, subtaskid, format=None):
        usersubtask = self.get_object(userid, subtaskid)
        usersubtask.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class LabelList(APIView):
    # List all labels, or create a new label.
    
    def get(self, request, format=None):
        labels = Label.objects.all()
        serializer = LabelSerializer(labels, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = LabelSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LabelDetail(APIView):
    # Retrieve, update or delete a label instance.

    def get_object(self, pk):
        try:
            return Label.objects.get(pk=pk)
        except Label.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        label = self.get_object(pk)
        serializer = LabelSerializer(instance = label)
        return Response(serializer.data)

    def patch(self, request, pk, format=None):
        label = self.get_object(pk)
        serializer = LabelSerializer(instance = label, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        label = self.get_object(pk)
        label.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)