import React from 'react';
import FileView from './FileView';
import TreeView from './TreeView';

const API_URL = 'https://api.github.com/repos/';

class RepoView extends React.Component {

    constructor(props){
      super(props);
      this.props = props;
      let params = this.props.params;
      this.state = {
          treeData: null,
          editorContent: null,
          activeFile: null,
          repo: `${params.username}/${params.repo}`
      }
    }

    componentDidMount(){
        this._getReadMeFile();
        this._getTreeData();
    }

    _getReadMeFile(){
        fetch(`${API_URL}${this.state.repo}/readme`)
            .then(res => res.json())
            .then(data => {
                let text = atob(data.content);
                this.setState({editorContent: text, activeFile: data.name});
            });
    }

    _getByPath(p){
        fetch(`${API_URL}${this.state.repo}/contents/${p}`)
            .then(res => res.json())
            .then(data => {
                let text = atob(data.content);
                this.setState({editorContent: text, activeFile: data.name});
            });
    }

    _getTreeData(){
        fetch(`${API_URL}${this.state.repo}/git/trees/master`)
            .then(res => res.json())
            .then(data => this.setState({treeData: data }));
    }

    onFileChange(file){
        this._getByPath(file.name);
    }

    render() {
        let editorView = this.state.editorContent ? <FileView file={this.state.activeFile} content={this.state.editorContent} /> : null;
        let treeView = this.state.treeData ? <TreeView name={this.state.repo} onSelect={this.onFileChange.bind(this)} tree={this.state.treeData.tree}/> : null;
        return (
            <div className="repo-view">
                {treeView}
                {editorView}
            </div>
        );
    }
}

export default RepoView;
