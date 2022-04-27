import './App.css';
import { useState, useRef } from 'react';
import TwitterIcon from './assets/twitter.svg';
import axios from 'axios';

const API = 'http://localhost:8000';

export default function App() {

  const tweetBoxRef = useRef(null);
  const [score, setScore] = useState(0);
  const [characterLength, setCharacterLength] = useState(0);

  const getColor = (score) => {
    // using bootstrap's colors since they're similar to twitter's
    if (score < -0.3) return '#dc3545'; // red
    if (score > 0.3) return '#198754'; // green
    return '#1DA1F2'; // twitter blue
  }

  return (
    <div className='main'>
      <div className='score'>
        Score: {score}
        <div className='scorebar' style={{width: `${(score + 1)/2 * 100}%`, backgroundColor: getColor(score)}}></div>
      </div>
      <div className='tweet-compose'>
        <div className='compose-header'>
          <img src={TwitterIcon} alt="Twitter"/>
          Twitter: A Commentary
        </div>
        <div className='compose-body'>
          <textarea 
            maxLength={280} //  max length of a tweet
            ref={tweetBoxRef} 
            onChange={() => {
              setCharacterLength(tweetBoxRef.current.value.length);
            }}
            placeholder="What's happening?">            
          </textarea>
        </div>
        <div className='compose-footer'>
          {characterLength}
          <button className='tweet-button' 
          onClick={() => {
            // prevent api calls if tweet is too short
            if (tweetBoxRef.current.value.length < 8) {
              alert('Tweet must be at least 15 characters long');
              return
            }
            // random percentage between -1 and 1
            setScore(Math.random() * 2 - 1);
            axios.post(`${API}/predict`, {
              'tweet': tweetBoxRef.current.value
            }).then(res => {
              console.log(res);
              setScore((res.data.sentiment * 10));
            }).catch(err => {
              console.log(err);
            })

          }}>
            Tweet
          </button>
        </div>
      </div>
    </div>
  );
}
