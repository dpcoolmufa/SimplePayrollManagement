import React from 'react';
import './App.css';
import Navigation from './components/Navigation/navigation'
import Signup from './components/Signup/signup'
import Employee from './components/Dashboard/Employee/Employee'
import Admin from './components/Dashboard/Employee/Admin';


const initialState = {
  route: 'signedOut',
  type: '',
  user: {
    id: '',
    name: '',    
    dob: ''
  }
};
class App extends React.Component {

  constructor() {
    super();
    this.state = initialState
  }
  onSubmit = (value) => {
    console.log(value)
    switch (value) {
      case 'signedIn':
        this.setState({ route: value })
        break;
      case 'signedOut':
        this.setState({ route: value })
        break;
      case 'Admin':
        console.log('Hi')
        this.setState({ route: 'signedIn' })
        this.setState({ type: value })
        break;
      case 'Employee':
        console.log('Hi employee')
        this.setState({ route: 'signedIn' })
        this.setState({ type: value })
        break;
      default:
        this.setState(initialState)
        break;
    }
  }
  loadUserDetails = (value) => {
    this.setState({
      user: {
        id: value.Id,
        name: value.Name,        
        dob: value.DOB
      }
    })    
  }
  render() {    
    return (
      <div>
        {this.state.route === 'signedOut' ?
          <div>
            <Navigation />
            <Signup onSubmit={this.onSubmit} loadUserDetails={this.loadUserDetails}/>
          </div> : this.state.type === 'Employee' ? <Employee onSubmit={this.onSubmit} userDetails={this.state.user}/> : <Admin onSubmit={this.onSubmit} userDetails={this.state.user}/>
        }

      </div>

    );
  }
}

export default App;
