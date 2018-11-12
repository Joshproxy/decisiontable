import './App.css';

import { Provider } from 'mobx-react';
import * as React from 'react';
import { store } from 'src/store/store';

import logo from '../../logo.svg';
// import DecisionTableCreator_NoStore from '../DecisionTableCreator/DecisionTableCreator_NoStore';
import DecisionTableCreator_StoreBased from '../DecisionTableCreator/DecisionTableCreator_StoreBased';

// import DecisionTableCreator_Mobx from '../DecisionTableCreator/DecisionTableCreator_Mobx';

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
          <DecisionTableCreator_StoreBased />
        </Provider>	        
        {/* <DecisionTableCreator_Mobx model={new DecisionTableModel()} /> */}
      </div>
    );
  }
}

export default App;
