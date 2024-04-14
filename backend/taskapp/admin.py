from django.contrib import admin

# Register your models here.

from .models import User, Project, Task, Subtask, UserSubtask


# Register models
admin.site.register(User)
admin.site.register(Project)
admin.site.register(Task)
admin.site.register(Subtask)
admin.site.register(UserSubtask)