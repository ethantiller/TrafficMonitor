from flask import Flask, request, jsonify
import requests
from AIChatbot import ChatBotAPI  # Ensure this path is correct

app = Flask(__name__)

# Store the chatbot response
chatbot_response_storage = {}

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
    user_input_to_chat = request.json.get('user_input')
    chatbot_response_prejson = ChatBotAPI.chatBotResponse(user_input_to_chat)
    chatbot_response_ready = jsonify(chatbot_response_prejson)

    # Store the response using a unique key (e.g., user_input)
    chatbot_response_storage[user_input_to_chat] = chatbot_response_prejson

    return chatbot_response_ready

# Endpoint to fetch the stored chatbot response
@app.route('/fetchresponse', methods=['GET'])
def fetch_chatbot_response():
    user_input = request.args.get('user_input')
    response = chatbot_response_storage.get(user_input, "Response not found")
    return jsonify({"chatbot_response": response})

if __name__ == '__main__':
    app.run(debug=True)