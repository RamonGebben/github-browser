import React from 'react';
import FileView from './FileView';
import TreeView from './TreeView';
import RepoMeta from './RepoMeta';
import Loading from './Loading';

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
          repo: `${params.username}/${params.repo}`,
          loading: false
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
        this.setState({loading: true});
        fetch(`${API_URL}${this.state.repo}/contents/${p}`)
            .then(res => res.json())
            .then(data => {
                let text = atob(data.content);
                this.setState({editorContent: text, activeFile: data.name, loading: false});
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
        let editorView;

        if(this.state.editorContent && !this.state.loading ){
            editorView = <FileView file={this.state.activeFile} content={this.state.editorContent} />;
        }else if( this.state.loading ){
            editorView = <Loading />;
        }

        let treeView = this.state.treeData ?
            <TreeView name={this.state.repo} onSelect={this.onFileChange.bind(this)} tree={this.state.treeData.tree}/> : null;
        return (
            <div className="repo-view">
                {treeView}
                <div className='right-hand'>
                    <RepoMeta repo={this.state.repo} />
                    {editorView}
                </div>

            </div>
        );
    }
}

export default RepoView;
