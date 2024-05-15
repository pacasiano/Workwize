from django.shortcuts import render

# Create your views here.

from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import viewsets
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated
from .permissions import IsOwner
from .serializers import UserSerializer, ProjectSerializer, UserProjectSerializer, UserProjectSerializer, TaskSerializer, SubtaskSerializer, UserSubtaskSerializer, LabelSerializer
from .models import User, Project, UserProject, UserProject, Task, Subtask, UserSubtask, Label


class LoginView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        if not username or not password:
            return Response({'error': 'Please provide username and password'}, status=400)

        try:
            user = User.objects.get(username=username)
        except User.DoesNotExist:
            return Response({'error': 'Invalid username or password'}, status=401)

        #check_password is provided by django to check plain text pw (login input) against the db hashed password
        if user and user.check_password(password): 
            user_data = {'user_id': user.user_id, 'first_name': user.first_name, 'last_name': user.last_name, 'username': user.username, 'email': user.email}
            return Response({'message': 'Login successful', 'user': user_data})
        else:
            return Response({'error': 'Invalid username or password'}, status=401)


'''
Actual API for CRUD

Should use generics
Warning: Doesn't follow DRY principle AT ALL :(
'''

class UserList(APIView):
    # List all users, or create a new user.
    # authentication_classes = [JWTAuthentication]
    # permission_classes = [IsAuthenticated, IsOwner]

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

from django.contrib.auth.hashers import make_password

class UserDetail(APIView):
    # Retrieve, update or delete a user instance.
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated, IsOwner]

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

        # We hash the password
        if 'password' in request.data:
            plain_password = request.data['password']
            hashed_password = make_password(plain_password)
            request.data['password'] = hashed_password 

        serializer = UserSerializer(instance=user, data=request.data, partial=True)
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
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated, IsOwner]
    
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
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated, IsOwner]

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

class UserProjectList(APIView):
    # List all rows from UserProject model
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated, IsOwner]
    
    def get(self, request, format=None):
        projects = UserProject.objects.all()
        serializer = UserProjectSerializer(projects, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = UserProjectSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserProjectDetail(APIView):
    # Update the role of a user in a project
    # authentication_classes = [JWTAuthentication]
    # permission_classes = [IsAuthenticated, IsOwner]

    def get_object(self, project_pk, user_pk):
        try:
            return UserProject.objects.get(project_id=project_pk, user_id=user_pk)
        except UserProject.DoesNotExist:
            return Response({'error': 'UserProject not found'}, status=status.HTTP_404_NOT_FOUND)
        
    def get(self, request, project_pk, user_pk, format=None):
        user_project = self.get_object(project_pk, user_pk)
        serializer = UserProjectSerializer(instance = user_project)
        return Response(serializer.data)

    def patch(self, request, project_pk, user_pk, format=None):
        user_project = self.get_object(project_pk, user_pk)

        serializer = UserProjectSerializer(instance=user_project, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, project_pk, user_pk, format=None):
        user_project = self.get_object(project_pk, user_pk)
        user_project.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class TaskList(APIView):
    # List all tasks, or create a new task.
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated, IsOwner]
    
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
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated, IsOwner]

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
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated, IsOwner]
    
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
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated, IsOwner]

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
    
class UserSubtaskList(APIView):
    # List all user-subtask, or create a new user-subtask.
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated, IsOwner]
    
    def get(self, request, format=None):
        usersubtask = UserSubtask.objects.all()
        serializer = UserSubtaskSerializer(usersubtask, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = UserSubtaskSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class UserSubtaskDetail(APIView):
    # Delete a User from a subtask
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated, IsOwner]

    def get_object(self, userid, subtaskid):
        try:
            return UserSubtask.objects.get(user_id = userid, subtask_id = subtaskid)
        except UserSubtask.DoesNotExist:
            raise Http404
    
    def get(self, request, pk, format=None):
        usersubtask = self.get_object(pk)
        serializer = UserSubtaskSerializer(instance = usersubtask)
        return Response(serializer.data)

    def patch(self, request, pk, format=None):
        usersubtask = self.get_object(pk)
        serializer = UserSubtaskSerializer(instance = usersubtask, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, userid, subtaskid, format=None):
        usersubtask = self.get_object(userid, subtaskid)
        usersubtask.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class LabelList(APIView):
    # List all labels, or create a new label.
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated, IsOwner]
    
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
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated, IsOwner]

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
