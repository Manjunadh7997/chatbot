import os
from flask import Flask, render_template, request, jsonify
from groq import Groq
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)

# Initialize Groq Client
# Ensure you have GROQ_API_KEY in a .env file or your environment variables
client = Groq(api_key="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")

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/chat', methods=['POST'])
def chat():
    user_input = request.json.get("message")
    
    if not user_input:
        return jsonify({"error": "No message provided"}), 400

    try:
        # Calling the Groq API
        chat_completion = client.chat.completions.create(
            messages=[
                {"role": "system", "content": "You are a helpful and witty AI assistant."},
                {"role": "user", "content": user_input}
            ],
            model="llama-3.1-8b-instant", # High-performance model
        )
        
        bot_response = chat_completion.choices[0].message.content
        return jsonify({"response": bot_response})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)