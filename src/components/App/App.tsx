import * as React from 'react';
import { Provider } from 'react-redux';
import logo from '../../logo.svg';
import { store } from '../../store/store';
import DecisionTableCreator from '../DecisionTableCreator/DecisionTableCreator';
import './App.css';

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Decision Table Creator</h1>
        </header>
        <p className="App-intro">
          To get started, add a variable.
        </p>
        <Provider store={store}>
          <DecisionTableCreator />
        </Provider>
      </div>
    );
  }
}

export default App;
