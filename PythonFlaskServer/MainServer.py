from flask import Flask, request, jsonify
import requests
import uuid
from AIChatbot import ChatBotAPI

app = Flask(__name__)

# Store the chatbot response
chatbot_response_storage = {}
latest_chatbot_response = None

# Endpoint to get user input and forward it to the chatbot
@app.route('/userresponse', methods=['POST'])
def get_user_response():
    website_to_user_input = request.json.get('user_input')
    chatbot_url_and_endpoint = "http://127.0.0.1:5000/chatbotresponse"
    response = requests.post(chatbot_url_and_endpoint, json={'user_input': website_to_user_input})
    return response.json()

# Endpoint to get chatbot response
@app.route('/chatbotresponse', methods=['POST'])
def get_chatbot_response():
    global latest_chatbot_response
    user_input_to_chat = request.json.get('user_input')
    chatbot_response_prejson = ChatBotAPI.chatBotResponse(user_input_to_chat)
    chatbot_response_ready = jsonify(chatbot_response_prejson)

    # Generate a unique identifier for the response
    response_id = str(uuid.uuid4())
    chatbot_response_storage[response_id] = chatbot_response_prejson

    # Update the latest chatbot response
    latest_chatbot_response = chatbot_response_prejson

    # Return the response along with the unique identifier
    return jsonify({"response_id": response_id, "chatbot_response": chatbot_response_prejson})

# Endpoint to fetch the stored chatbot response
@app.route('/fetchresponse', methods=['GET'])
def fetch_chatbot_response():
    if latest_chatbot_response is None:
        return jsonify({"chatbot_response": "No response available"})
    return jsonify({"chatbot_response": latest_chatbot_response})

if __name__ == '__main__':
    app.run()