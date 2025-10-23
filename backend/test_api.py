import google.generativeai as genai
import os
from dotenv import load_dotenv

# Load .env
load_dotenv()

print("--- Starting API Test ---")

# Configure
try:
    genai.configure(api_key=os.environ["GOOGLE_API_KEY"])
except Exception as e:
    print(f"\n❌ FAILED (Step 1: Configure): {e}")
    exit()

print("✅ Step 1: Configuration successful.")

# Test the model connection
try:
    print("\n⏳ Step 2: Attempting to connect to 'gemini-1.5-flash'...")
    model = genai.GenerativeModel('gemini-1.5-flash')
    print("✅ Step 2: Model object created.")

    print("\n⏳ Step 3: Generating content...")
    response = model.generate_content("Hello")
    print(f"✅ Step 3: AI Response: {response.text.strip()}")

    print("\n--- ✅ SUCCESS! ---")

except Exception as e:
    print(f"\n❌ FAILED (Step 2 or 3):")
    print(e)