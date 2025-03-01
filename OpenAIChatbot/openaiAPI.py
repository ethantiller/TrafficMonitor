from google import genai
import time

MAX_REQUESTS_PER_MINUTE = 15
usage_counter = 0
start_time = time.time()


client = genai.Client(api_key="AIzaSyA3w6Jrd8oUbjw4Srin5T8nywjfIsKqKTA")


def chatBotResponse(prompt):
    global usage_counter, start_time
    current_time = time.time()
    elapsed_time = current_time - start_time

    if elapsed_time < 60:
        if usage_counter >= MAX_REQUESTS_PER_MINUTE - 5:  # 5 requests left
            print("You are appraoching the maximum number of reqeust per minute.")
            return
    else:
        start_time = current_time
        usage_counter = 0

    response = client.models.generate_content(
        model="gemini-2.0-flash", contents=prompt, max_tokens=50)
    usage_counter += 1
    return response.text

def main():
    print("Welcome to the OpenAI Chatbot! Type 'exit' to end the conversation.")
    
    while True:
        user_input = input("You: ")
        
        if user_input.lower() == 'exit':
            print("Chatbot: Goodbye!")
            break
        
        response = chatBotResponse(user_input)
        print(f"Chatbot: {response}")

if __name__ == "__main__":
    main()