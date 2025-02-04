from django.contrib.auth.models import User
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .views import generate_state, select_recommendation
from .models import RecommendationLog
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from .models import UserProfile
from django.contrib.auth import logout

class RegisterAPI(APIView):
    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")

        if User.objects.filter(username=username).exists():
            return Response({"error": "Username already exists"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = User.objects.create_user(username=username, password=password)
            user.save()
            return Response({"message": "User registered successfully"}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        
class LoginAPI(APIView):
    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")
        user = authenticate(username=username, password=password)
        if user is not None:
            refresh = RefreshToken.for_user(user)
            return Response({
                "refresh": str(refresh),
                "access": str(refresh.access_token),
            }, status=status.HTTP_200_OK)
        else:
            return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)

class StateAPI(APIView):
    def post(self, request):
        user_id = request.data.get('user_id')
        try:
            state = generate_state(user_id)
            return Response({"state": state}, status=status.HTTP_200_OK)
        except ValueError as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

class RecommendationsAPI(APIView):
    def get(self, request, user_id):
        try:
            state = generate_state(user_id)
            recommendation = select_recommendation(state)
            return Response({"recommendation": recommendation}, status=status.HTTP_200_OK)
        except ValueError as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        
class LogInteractionAPI(APIView):
    def post(self, request):
        data = request.data
        try:
            log = RecommendationLog.objects.create(
                user_id=data['user_id'],
                recommended_topic=data['recommended_topic'],
                interaction_time=data['interaction_time'],
                feedback=data['feedback'],
                is_novel=data['is_novel']
            )
            log.save()
            return Response({"message": "Interaction logged successfully"}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        
class LogoutAPI(APIView):
    def post(self, request):
        logout(request)
        return Response({"message": "Logged out!"}, status=status.HTTP_200_OK)
    