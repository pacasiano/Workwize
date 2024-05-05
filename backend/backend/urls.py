"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from taskapp import views
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'users', views.UserView, 'user')
router.register(r'projects', views.ProjectView, 'project')
router.register(r'user-projects', views.UserProjectView, 'userproject')
router.register(r'tasks', views.TaskView, 'task')
router.register(r'subtasks', views.SubtaskView, 'subtask')
router.register(r'user-subtasks', views.UserSubtaskView, 'usersubtask')
router.register(r'labels', views.LabelView, 'label')


urlpatterns = [
    path('admin/', admin.site.urls),
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),
    path('api/', include(router.urls)),
    path('tasks/', views.TaskList.as_view()),
    path('tasks/<int:pk>/', views.TaskDetail.as_view()),
    path('subtasks/', views.SubtaskList.as_view()),
    path('subtasks/<int:pk>/', views.SubtaskDetail.as_view()),
    path('projects/', views.ProjectList.as_view()),
    path('projects/<int:pk>/', views.ProjectDetail.as_view()),
    path('labels/', views.LabelList.as_view()),
    path('labels/<int:pk>/', views.LabelDetail.as_view()),
    path('users/', views.UserList.as_view()),
    path('users/<int:pk>/', views.UserDetail.as_view()),
    path('user-subtask/<int:userid>/<int:subtaskid>/', views.UserSubtaskDetail.as_view()),
]
