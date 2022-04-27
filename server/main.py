from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
import scipy.sparse._csr
import pickle

tfidf = pickle.load(open('./models/tfidf_vectorizer.pkl', 'rb'))
model = pickle.load(open('./models/xgboost_model.pkl', 'rb'))

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/predict")
async def predict(request: Request):
    content = await request.json()
    # Transform tweet into a vector
    vector = tfidf.transform([content['tweet']])
    # Predict the sentiment of the tweet
    prediction = model.predict(vector)[0]
    
    return {"sentiment": float(prediction)}
