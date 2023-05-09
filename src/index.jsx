import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { CustomProvider } from 'rsuite';
import ruRU from 'rsuite/locales/ru_RU';
import { Provider } from 'react-redux';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CustomProvider locale={ruRU}>
      <Provider store={store}>
        <App />
      </Provider>
    </CustomProvider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
