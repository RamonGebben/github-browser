import React from 'react';
import ace from 'brace';
import marked from 'marked';

import { modeMap } from '../../util/editor-helper';

require('brace/mode/javascript');
require('brace/theme/solarized_light');

class FileView extends React.Component {

  constructor(props){
    super(props);
    this.props = props;
    this.state = {
        fileExt: 'md'
    }
  }

  componentDidMount(){
      this.setState({
          fileExt: this.props.file.split('.')[this.props.file.split('.').length -1]
      });
      this.mountEditor();
  }

  componentDidUpdate(){
      this.mountEditor();
  }

  componentWillUnmount(){
      this.editor = null;
  }

  mountEditor(){
      if( this.state.fileExt === 'md' ) return;

      let editorMode = modeMap[this.state.fileExt];
      console.log([editorMode, this.state.fileExt]);

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
      if( this.state.fileExt === 'md' ){
          return (<div className='file-view'>
              <div id='markdown-view' dangerouslySetInnerHTML={{ __html: marked(this.props.content) }}/>
          </div>);
      }else {
          return(<div className='file-view'>
                    <div id='ace-editor' style={{height: `${window.innerHeight - 60 }px`}}/>
                 </div>);
      }
  }
}

export default FileView;
