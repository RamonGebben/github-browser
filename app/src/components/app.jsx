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
            <div className='standard-container'>
                <h1>Github Browser</h1>
                <p>Browse Github projects like you would do in your editor</p>
                <h3>Repo you want to view.</h3>
                <small>* use this format `username/repo`</small>
                <br/>
                <div className='input-container'>
                    <input type='text' onKeyUp={this.onInputChange.bind(this)}/>
                    <Link to={`/${this.state.search}`}>Open</Link>
                </div>
            </div>
    );
  }
}

export default App;
