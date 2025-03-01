from flask import Flask, request, jsonify
import requests

app = Flask(__name__)

@app.route('/userresponse', methods=['POST'])
def get_user_response():
    # Parse the user input from the POST request
    website_to_user_input = request.args.get('user_input')

    # Send a post request to chatbotreply endpoint with the user input
    # and get the response from the chatbot

    chatbot_url_and_endpoint = "http://127.0.0.1:5000/chatbotresponse"
    response = requests.post(chatbot_url_and_endpoint, data={'user_input': website_to_user_input})
    