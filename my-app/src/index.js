import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { SpeechProvider } from '@speechly/react-client';


ReactDOM.render(
  <React.StrictMode>
    <SpeechProvider appId="39285e2b-b8dc-4de7-b989-81e5dff11685">
      <App />
    </SpeechProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
