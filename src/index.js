import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router } from 'react-router-dom';

// Use this reference anytime the backend is needed
global.backendURL = "http://campus-share-backend.us-east-2.elasticbeanstalk.com";
global.thisURL = "http://localhost:3000";
global.selectAPI = "https://h1xqnteg60.execute-api.us-east-2.amazonaws.com/SelectProd?";
global.deleteAPI = "https://a2cisw63pb.execute-api.us-east-2.amazonaws.com/Prod?";
global.insertAPI = "https://00tyqs4c74.execute-api.us-east-2.amazonaws.com/Prod?";
global.updateAPI = "https://qa1gniaexi.execute-api.us-east-2.amazonaws.com/Prod?";
global.config = {
    bucketName: 'campus-share-files',
    dirName: '/',
    region: 'us-east-2', // Ohio
    accessKeyId: process.env.S3_accessKeyId,
    secretAccessKey: process.env.S3_secretAccessKey,
}

ReactDOM.render(
    <Router>
        <App />
    </Router>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
