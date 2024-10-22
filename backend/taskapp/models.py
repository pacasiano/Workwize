from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager

# Create your models here.

from django.db import models

class MyUserManager(BaseUserManager):
    def create_user(self, username, password=None, **extra_fields):
        user = self.model(username=username, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, username, password, **extra_fields):

        return self.create_user(username, password, **extra_fields)

class User(AbstractBaseUser):    
    user_id = models.AutoField(primary_key=True)
    email = models.EmailField(unique=True)
    username = models.CharField(max_length=50, unique=True)
    password = models.CharField(max_length=100)  
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    STATUS_CHOICES = [('inactive', 'inactive'), ('active', 'active')]
    status = models.CharField(max_length=8, default='active', choices=STATUS_CHOICES) 

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email', 'first_name', 'last_name', 'password']

    objects = MyUserManager()

    def __str__(self):
        return f'{self.user_id} {self.first_name} {self.last_name} - {self.email}'

class Project(models.Model):
    project_id = models.AutoField(primary_key=True)
    project_name = models.CharField(max_length=100)
    background = models.CharField(max_length=255, default="#000000")
    isStarred = models.BooleanField(default=False)
    STATUS_CHOICES = [('inactive', 'inactive'), ('active', 'active')]
    status = models.CharField(max_length=8, default='active', choices=STATUS_CHOICES) 

    def __str__(self):
        return '{} {}'.format(self.project_id, self.project_name)
    
class UserProject(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    project_id = models.ForeignKey(Project, on_delete=models.CASCADE)
    ROLE_CHOICES = [('owner', 'owner'), ('manager', 'manager'), ('member', 'member')]
    role = models.CharField(max_length=7, choices=ROLE_CHOICES) 

class Task(models.Model):
    task_id = models.AutoField(primary_key=True)
    project_id = models.ForeignKey(Project, on_delete=models.CASCADE)
    task_name = models.CharField(max_length=100)
    color = models.CharField(max_length=7)
    order_num = models.SmallIntegerField(blank=True, null=True)
    STATUS_CHOICES = [('inactive', 'inactive'), ('active', 'active')]
    status = models.CharField(max_length=8, default='active', choices=STATUS_CHOICES) 


    def __str__(self):
        return '{} {}'.format(self.task_id, self.task_name)

class Subtask(models.Model):
    subtask_id = models.AutoField(primary_key=True)
    task_id = models.ForeignKey(Task, on_delete=models.CASCADE)
    subtask_name = models.CharField(max_length=100)
    description = models.TextField(blank=True) 
    end_date = models.DateTimeField(blank=True)
    start_date = models.DateTimeField(blank=True)
    order_num = models.SmallIntegerField(blank=True, null=True)
    STATUS_CHOICES = [('inactive', 'inactive'), ('active', 'active')]
    status = models.CharField(max_length=8, default='active', choices=STATUS_CHOICES) 

    def __str__(self):
        return '{} {}'.format(self.subtask_id, self.description)

class Label(models.Model):
    label_id = models.AutoField(primary_key=True)
    subtask_id = models.ForeignKey(Subtask, on_delete=models.CASCADE)
    label_name = models.CharField(max_length=100)
    color = models.CharField(max_length=7)

class Attachment(models.Model):
    attachment_id = models.AutoField(primary_key=True)
    subtask_id = models.ForeignKey(Subtask, on_delete=models.CASCADE)
    filename = models.CharField(max_length=255)


class UserSubtask(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    subtask_id = models.ForeignKey(Subtask, on_delete=models.CASCADE)

    def __str__(self):
        return '{} {}'.format(self.user, self.subtask)

    class Meta:
        unique_together = ('user_id', 'subtask_id')  # Ensures each user is assigned to a subtask only once and vice versa

