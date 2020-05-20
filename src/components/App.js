import React, { Component } from 'react';

// Class Component
// class App extends Component {
//   render() {
//     return (
//       <React.Fragment>
//         <label htmlFor="bar">bar</label>
//         <input type="text" onChange={() => { console.log("hi") }} />
//       </React.Fragment>
//     )
//   }
// }

const App = () => (<Counter></Counter>)

class Counter extends Component {
  constructor(props) {
    super(props)
    console.log(this.state)
    this.state = { count: 0 }
  }

  handlePlusButton = () => {
    this.setState({ count: this.state.count + 1 })
  }

  handleMinusButton = () => {
    this.setState({ count: this.state.count - 1 })
  }

  render() {
    console.log("render")
    return (
      <React.Fragment>
        <div>Counter: {this.state.count}</div>
        <button onClick={this.handlePlusButton}>+1</button>
        <button onClick={this.handleMinusButton}>-1</button>
      </React.Fragment>
    )
  }
}

export default App;
