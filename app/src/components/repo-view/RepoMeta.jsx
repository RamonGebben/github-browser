import React from 'react';

class FileView extends React.Component {

  constructor(props){
    super(props);
    this.props = props;
  }

  render() {
    return (
        <div className='repo-meta'>
            <img className='shield' src={`https://img.shields.io/travis/${this.props.repo}.svg`}/>
        </div>
    );
  }
}

export default FileView;
