from django.contrib.auth.models import AbstractUser
from django.db import models

# Create your models here.

class User(AbstractUser):
	profit = models.IntegerField(default = 1)
	hours = models.IntegerField(default = 1)
	sessions = models.IntegerField(default = 1)
	def serialize(self):
		return {
			"id": self.id,
			"username": self.username,
			"profit": self.profit,
			"hours": self.profit,
			"sessions": self.profit
		}
class Session(models.Model):
	user = models.ForeignKey("User", on_delete=models.CASCADE, related_name="user")
	gain =  models.IntegerField()
	date = models.TextField()
	hours = models.IntegerField()
	notes = models.TextField()
	def serialize(self):
		return {
			"id": self.id,
			"user": self.user.username,
			"profit": self.gain,
			"date": self.date,
			"hours": self.hours,
			"notes": self.notes,
		}
	
#class Table(models.Model):
#	seat1 = models.ForeignKey("User", on_delete=models.CASCADE, related_name="user")
#	seat2 = models.ForeignKey("User", on_delete=models.CASCADE, related_name="user")
#	seat3 = models.ForeignKey("User", on_delete=models.CASCADE, related_name="user")
#	seat4 = models.ForeignKey("User", on_delete=models.CASCADE, related_name="user")
#	seat5 = models.ForeignKey("User", on_delete=models.CASCADE, related_name="user")
#	seat6 = models.ForeignKey("User", on_delete=models.CASCADE, related_name="user")
	