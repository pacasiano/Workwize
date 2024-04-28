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
router.register(r'tasks', views.TaskView, 'task')
router.register(r'subtasks', views.SubtaskView, 'subtask')
router.register(r'user-subtasks', views.UserSubtaskView, 'usersubtask')
router.register(r'labels', views.LabelView, 'label')


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls))
]
