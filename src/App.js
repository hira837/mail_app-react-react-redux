import React from 'react';

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

// Functional Component
const App = () => {
  const profiles = [
    { name: "Taro", age: 10 },
    { name: "Hanako", age: 5 },
    { name: "Yuki" }
  ]
  return (
    <div>
      {
        profiles.map((profile, index) => {
          return <User name={profile.name} age={profile.age} key={index} />
        })
      }
    </div>
  )
}
const User = (props) => {
return <div>Hi I am {props.name} and {props.age} yeas old.</div>
}

User.defaultProps = {
  age: 1
}

export default App;
