from django.urls import path
from .api_views import StateAPI, RecommendationsAPI, LogInteractionAPI, LoginAPI, RegisterAPI, LogoutAPI

urlpatterns = [
    path('register/', RegisterAPI.as_view(), name='register'),
    path('login/', LoginAPI.as_view(), name='login'),
    path('generate_state/', StateAPI.as_view(), name='generate-state'),
    path('recommendations/<int:user_id>/', RecommendationsAPI.as_view(), name='recommendations'),
    path('log_interaction/', LogInteractionAPI.as_view(), name='log-interaction'),
    path('logout/', LogoutAPI.as_view(), name='logout'),
]

