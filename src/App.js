import React from 'react';
import PropTypes from 'prop-types'

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
    <React.Fragment>
      {
        profiles.map((profile, index) => {
          return <User name={profile.name} age={profile.age} key={index} />
        })
      }
    </React.Fragment>
  )
}
const User = (props) => {
  return <div>Hi I am {props.name} and {props.age} yeas old.</div>
}

User.propTypes = {
  name: PropTypes.string,
  age: PropTypes.number.isRequired
}

User.defaultProps = {
  age: 1
}

export default App;
