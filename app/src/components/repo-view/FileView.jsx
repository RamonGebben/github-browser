import React from 'react';
import ace from 'brace';

import { modeMap } from '../../util/editor-helper';

require('brace/mode/javascript');
require('brace/theme/solarized_light');

class FileView extends React.Component {

  constructor(props){
    super(props);
    this.props = props;
  }

  componentDidMount(){
      this.mountEditor();
  }

  componentDidUpdate(){
      this.mountEditor();
  }

  componentWillUnmount(){
      this.editor = null;
  }

  mountEditor(){
      let fileExt = this.props.file.split('.')[this.props.file.split('.').length -1];
      let editorMode = modeMap[fileExt];

      console.log([editorMode, fileExt]);

      if( !this.editor ){
          this.editor = ace.edit('ace-editor');
          this.editor.setTheme('ace/theme/solarized_light');
          this.editor.setReadOnly(true);
      }

      this.editor.getSession().setMode(`ace/mode/${editorMode}`);
      this.editor.setValue(this.props.content);
      this.editor.clearSelection();
  }

  render() {
    return (
        <div className='file-view'>
            <div id='ace-editor' style={{height: `${window.innerHeight - 60 }px`}}/>
        </div>
    );
  }
}

export default FileView;
