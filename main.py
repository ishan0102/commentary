import csv
import tweepy
import os
from dotenv import load_dotenv

load_dotenv()
TWITTER_BEARER_TOKEN = os.getenv('TWITTER_BEARER_TOKEN')

auth = tweepy.OAuth2BearerHandler(TWITTER_BEARER_TOKEN)
api = tweepy.API(auth)

# update these for whatever tweet you want to process replies to
name = 'elonmusk'
tweet_id = '1512886651940491270'

replies=[]
for tweet in tweepy.Cursor(api.search_tweets, q='to:'+name, result_type='mixed', count=250).items(10000):
    if hasattr(tweet, 'in_reply_to_status_id_str'):
        if (tweet.in_reply_to_status_id_str==tweet_id):
            replies.append(tweet)

with open('replies_clean.csv', 'w') as f:
    csv_writer = csv.DictWriter(f, fieldnames=('user', 'text'))
    csv_writer.writeheader()
    for tweet in replies:
        row = {'user': tweet.user.screen_name, 'text': tweet.text}
        csv_writer.writerow(row)