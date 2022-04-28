import './App.css';
import { useState, useRef } from 'react';
import TwitterIcon from './assets/twitter.svg';
import axios from 'axios';
import getRandomTweet from './assets/elon.js'

const API = 'https://ee461p-server-eyvr5tia5q-uc.a.run.app/';

export default function App() {

  const tweetBoxRef = useRef(null);
  const [score, setScore] = useState(0);
  const [characterLength, setCharacterLength] = useState(0);

  const getColor = () => {
    // using bootstrap's colors since they're similar to twitter's
    if (score < 0) return '#dc3545'; // red
    return '#198754'; // green
  }

  const n = 3;

  // take nth root of score to get a percentage to get a better looking bar
  const getRightWidth = () => {
    if (score > 0) return (Math.pow(score, 1 / n) * 100) + '%';
    return '0%';
  }

  const getLeftWidth = () => {
    if (score < 0) return (Math.pow(-score, 1 / n) * 100) + '%';
    return '0%';
  }

  return (
    <div className='main'>
      <div className='description twitter-font'>Write a tweet and our model will predict how your audience will respond!</div>
      <div className='score'>
        <div className='score-text twitter-font bold'>
          Reply Sentiment: {Math.round(score * 10000) / 100}
        </div>
        <div className='scorebar-container'>
          <div className='scorebar-element-left'>
            <div
              className='scorebar'
              style={{ width: getLeftWidth(), backgroundColor: getColor(), borderRadius: '0.4rem 0 0 0.4rem' }}
            />
          </div>
          <div className='scorebar-element-right'>
            <div
              className='scorebar'
              style={{ width: getRightWidth(), backgroundColor: getColor(), borderRadius: '0 0.4rem 0.4rem 0' }}
            />
          </div>
        </div>
      </div>
      <div className='tweet-compose'>
        <div className='compose-header twitter-title bold'>
          <img src={TwitterIcon} alt='Twitter' className='twitter-icon' />
          Twitter: A Commentary
        </div>
        <div className='compose-body'>
          <textarea
            className='twitter-font'
            maxLength={280} //  max length of a tweet
            ref={tweetBoxRef}
            onChange={() => {
              setCharacterLength(tweetBoxRef.current.value.length);
            }}
            placeholder="What's happening?">
          </textarea>
        </div>
        <div className='compose-footer'>
          <button className='pill-button'
            onClick={() => {
              tweetBoxRef.current.value = getRandomTweet();
            }}>
            Elon
          </button>
          <div className='reply-container twitter-font'>
            {characterLength}
            <button className='pill-button twitter-button'
              onClick={() => {
                // prevent api calls if tweet is too short
                if (tweetBoxRef.current.value.length < 15) {
                  alert('Tweet must be at least 15 characters long');
                  return
                }

                axios.post(`${API}/predict`, {
                  'tweet': tweetBoxRef.current.value
                }).then(res => {
                  console.log(res);
                  setScore(res.data.sentiment);
                }).catch(err => {
                  console.log(err);
                })

              }}>
              Tweet
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
