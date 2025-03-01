# from flask import request, jsonify, Flask
# import requests
# from OpenAIChatbot import openaiAPI
# from PythonFlaskServer import GetUserInput

# # Define app
# app = Flask(__name__)

# hostname = "127.0.0.1"
# port = 5000

# # Set up POST endpoint
# @app.route('/chatbotresponse', methods=['POST'])
# def get_chatbot_response():
#     user_input_to_chat = request.args.get('user_input')
#     chatbot_response_prejson = openaiAPI.chatBotResponse(user_input_to_chat)
#     chatbot_response_ready = jsonify(chatbot_response_prejson)

#     requests.post(f"http://{hostname}:{port}/chatbotresponse", data={'chatbot_response': chatbot_response_ready})
