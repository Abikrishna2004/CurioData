import os
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

def configure_ai():
    """
    Configures the generative AI model with the API key.
    """
    try:
        genai.configure(api_key=os.environ["GOOGLE_API_KEY"])
        model = genai.GenerativeModel('gemini-1.5-flash')
        return model
    except Exception as e:
        print(f"Error configuring AI: {e}")
        return None

def get_tutor_response(model, question: str) -> str:
    """
    Generates a helpful, tutor-like response to a user's question.
    """
    if model is None:
        return "AI model is not configured. Please check your GOOGLE_API_KEY."
        
    prompt = f"""
You are "AI Tutor," a helpful and encouraging tutor. Your goal is to solve any doubt a student has.
- Explain complex topics simply.
- Use examples and analogies to help understanding.
- If the question is simple, give a simple answer.
- If the question is complex, break it down step-by-step.
- Always be patient, supportive, and friendly.

Student's Question:
"{question}"

Your Answer:
"""

    try:
        response = model.generate_content(prompt)
        return response.text
    except Exception as e:
        print(f"Error generating AI content: {e}")
        return f"Error: Could not generate AI insights. {e}"