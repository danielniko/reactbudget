import React, { Component } from 'react';
import './App.css';
import ExpenseList from './components/ExpenseList';

class App extends Component {
  render() {
    return (
      <div className="App">
        <ExpenseList />
      </div>
    );
  }
}

export default App;
