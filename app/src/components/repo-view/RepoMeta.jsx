import React from 'react';

class FileView extends React.Component {

  constructor(props){
    super(props);
    this.props = props;
  }

  render() {
    return (
        <div className='repo-meta'>
            <h2>
                <a href={`https://github.com/${this.props.repo}`}>{this.props.repo}</a>
            </h2>
        </div>
    );
  }
}

export default FileView;
