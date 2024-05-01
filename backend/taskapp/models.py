from django.db import models

# Create your models here.

from django.db import models

class User(models.Model):
    user_id = models.AutoField(primary_key=True)
    email = models.EmailField(unique=True)
    username = models.CharField(max_length=50, unique=True)
    password = models.CharField(max_length=100)  # Password encryption?
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)

    def __str__(self):
        return f'{self.user_id} {self.first_name} {self.last_name} - {self.email}'

class Project(models.Model):
    project_id = models.AutoField(primary_key=True)
    project_name = models.CharField(max_length=100)

    def __str__(self):
        return '{} {}'.format(self.project_id, self.project_name)
    
class UserProject(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    project_id = models.ForeignKey(Project, on_delete=models.CASCADE)
    ROLE_CHOICES = [('manager', 'manager'), ('member', 'member')]
    role = models.CharField(max_length=50, choices=ROLE_CHOICES) 

class Task(models.Model):
    task_id = models.AutoField(primary_key=True)
    project_id = models.ForeignKey(Project, on_delete=models.CASCADE)
    task_name = models.CharField(max_length=100)
    color = models.CharField(max_length=7)

    def __str__(self):
        return '{} {}'.format(self.task_id, self.task_name)

class Subtask(models.Model):
    subtask_id = models.AutoField(primary_key=True)
    task_id = models.ForeignKey(Task, on_delete=models.CASCADE)
    subtask_name = models.CharField(max_length=100)
    description = models.TextField() 
    end_date = models.DateTimeField()
    start_date = models.DateTimeField()

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

