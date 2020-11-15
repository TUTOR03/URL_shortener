import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

const AppWithStrict = (
	<React.StrictMode>
    	<App />
	</React.StrictMode>
)

ReactDOM.render(AppWithStrict,document.getElementById('root'));
