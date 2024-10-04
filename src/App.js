import React from 'react';
import './App.css';
import { Provider, useSelector } from 'react-redux';
import store from './store/configureStore'
import Landing from './landing';

function App() {


  return (
    <div className="App">
      <Provider store={store}>
        <Landing></Landing>
      </Provider>
    </div>
  );
}


export default App;
