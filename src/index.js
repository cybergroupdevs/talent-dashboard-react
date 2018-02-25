import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import '../src/css/bootstrap.min.css';
import '../src/css/sb-admin-2.css';
import '../src/css/font-awesome.min.css';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const app = (
    <BrowserRouter>
        <App />
    </BrowserRouter>
)
ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
