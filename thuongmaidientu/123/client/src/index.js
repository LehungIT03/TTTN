import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter } from 'react-router-dom' ;
import createSagaMiddleware from 'redux-saga';
import reducers from './redux/reducers';
import mySaga from './redux/sagas';
import Footer from './pages/Footer';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(reducers, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(mySaga);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <div class="phone345"><a></a><a class="HotlineChantrang" title="Hotline đặt thuê xe ô tô" href="tel:0913218772">0389165923</a><a></a></div>
      <App />
      <div className='bg-[#0a9dd8]'>
      <Footer />
      </div>

    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
