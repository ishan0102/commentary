import pickle

tfidf = pickle.load(open('../models/tfidf_vectorizer.pkl', 'rb'))
model = pickle.load(open('../models/xgboost_model.pkl', 'rb'))

def main():
    while True:
        # Ask the user to type a tweet
        tweet = input("Type a tweet: ")
        # Transform tweet into a vector
        vector = tfidf.transform([tweet])
        # Predict the sentiment of the tweet
        prediction = model.predict(vector)[0]
        # Print the prediction
        print(f"The sentiment of the tweet is: {prediction}")

if __name__ == '__main__':
    main()
