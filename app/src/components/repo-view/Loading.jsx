import React from 'react';

class Loading extends React.Component {

  constructor(props){
    super(props);
    this.props = props;
  }

  render() {
      return (
          <div className='loading-screen'>
                <img src='https://assets-cdn.github.com/images/spinners/octocat-spinner-128.gif'/>
          </div>
      );
  }
}

export default Loading;
