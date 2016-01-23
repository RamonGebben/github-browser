import React from 'react';
import { Link } from 'react-router'

class App extends React.Component {

    constructor(props){
      super(props);
      this.props = props;
      this.state = {
          search: ''
      }
    }

    onInputChange(e){
        this.setState({ search: e.target.value });
    }

    render() {
        return (
            <div>
                <h1>App</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                <h3>Repo you want to view.</h3>
                <small>* use this format `username/repo`</small>
                <br/>
                <input type='text' onKeyUp={this.onInputChange.bind(this)}/>
                <Link to={`/${this.state.search}`}>Open</Link>
            </div>
    );
  }
}

export default App;
