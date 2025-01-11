from django.db import models
from django.contrib.auth.models import User

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    age = models.IntegerField()
    interests = models.JSONField()  # List of user interests
    historical_preferences = models.JSONField()  # Previous topic preferences

class SessionContext(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    device_type = models.CharField(max_length=50)
    time_of_day = models.CharField(max_length=50)
    current_topics = models.JSONField()  # Topics currently displayed

class RecommendationLog(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    recommended_topic = models.CharField(max_length=255)
    interaction_time = models.FloatField()  # Time spent interacting
    feedback = models.IntegerField()  # User feedback (1-5 scale)
    is_novel = models.BooleanField()  # Whether it was a novel recommendation
    timestamp = models.DateTimeField(auto_now_add=True)

class QTable(models.Model):
    state_representation = models.JSONField()  # Feature vector for the state
    action = models.IntegerField()  # Recommended action (topic ID)
    q_value = models.FloatField()  # Q-value

