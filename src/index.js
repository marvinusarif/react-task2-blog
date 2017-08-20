import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
                  rootReducer,
                  composeEnhancers(
                    applyMiddleware(thunk)
                  )
                )

ReactDOM.render(
                  <Provider store={store}>
                    <BrowserRouter>
                      <App />
                    </BrowserRouter>
                  </Provider>
                , document.getElementById('root'));

registerServiceWorker();
