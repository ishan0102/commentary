# Commentary
This is our final project for Data Science Principles (EE 461P) at UT Austin. Our group members are Ishan Shah, Rishi Ponnekanti, Michael Chen, and Udai Jain.

This project seeks to predict the sentiment of a tweet's replies given the tweet. We fetched millions of tweets from the Twitter API and performed pre-processing on them using NLTK. We then trained an XGBoost regressor using sentiment values as labels and achieved \~80.29% accuracy.

## Poster
Check out our poster presentation for more details:

![Poster Presentation](poster.png)

## Website
You can also play with a deployed version of this model on a [website we built](https://twittercommentary.netlify.app) using FastAPI, React, and Google Cloud Platform.