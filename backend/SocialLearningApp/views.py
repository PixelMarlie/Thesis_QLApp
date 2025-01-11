import numpy as np
from django.db import models
from .models import UserProfile, SessionContext
from .models import QTable

ALPHA = 0.1  # Learning rate
GAMMA = 0.9  # Discount factor

def generate_state(user_id):
    try:
        user_profile = UserProfile.objects.get(user_id=user_id)
        session_context = SessionContext.objects.filter(user_id=user_id).latest('id')
        # Normalize and concatenate data
        state = np.concatenate([
            [user_profile.age],  # Normalize age if needed
            user_profile.interests,
            session_context.current_topics,
        ])
        return state.tolist()  # Convert to list for JSON serialization
    except UserProfile.DoesNotExist:
        raise ValueError("UserProfile does not exist for the given user_id")
    except SessionContext.DoesNotExist:
        raise ValueError("SessionContext does not exist for the given user_id")

def select_recommendation(state):
    q_values = QTable.objects.filter(state_representation=state)
    if not q_values.exists():
        raise ValueError("No Q-values found for the given state")

    best_action = max(q_values, key=lambda q: q.q_value).action
    return best_action

def update_q_table(state, action, reward, next_state):
    try:
        q_entry = QTable.objects.get(state_representation=state, action=action)
        max_next_q = QTable.objects.filter(state_representation=next_state).aggregate(models.Max('q_value'))['q_value__max'] or 0
        q_entry.q_value += ALPHA * (reward + GAMMA * max_next_q - q_entry.q_value)
        q_entry.save()
    except QTable.DoesNotExist:
        raise ValueError("No Q-table entry found for the given state and action")
    
def calculate_reward(interaction_time, feedback, is_novel):
    # Example reward calculation
    engagement = interaction_time
    satisfaction = feedback
    novelty = 1 if is_novel else 0

    # Weighted sum
    reward = 0.5 * engagement + 0.3 * satisfaction + 0.2 * novelty
    return reward

def update_q_table_with_reward(state, action, interaction_time, feedback, is_novel, next_state):
    reward = calculate_reward(interaction_time, feedback, is_novel)
    update_q_table(state, action, reward, next_state)


