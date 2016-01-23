import React from 'react';
import {Treebeard} from 'react-treebeard';

const treeBeardTheme = require('./TreeBeardTheme');


class TreeView extends React.Component {

    constructor(props){
        super(props);
        this.props = props;
        this.state = {
            tree: [
                {
                    name: this.props.name,
                    toggled: true,
                    loading: true,
                    children: []
                }
            ]
        };
        this.onToggle = this.onToggle.bind(this);
    }

    componentDidMount(){
        this.setState({tree: this.modelTreeData()});
    }

    modelTreeData(){
        return {
            name: this.props.name,
            toggled: true,
            children: this.props.tree.map(p => {
                if(p.type === 'blob'){
                    return {name: p.path};
                }else {
                    return {
                        name: p.path,
                        loading: true,
                        children: []
                    };
                }

            })
        }
    }

    onToggle(node, toggled){
        if(this.state.cursor){this.state.cursor.active = false;}
        node.active = true;
        if(node.children){ node.toggled = toggled; }
        this.setState({ cursor: node });
        this.props.onSelect(node);
    }
    render(){
        return (
            <div className="tree-view" style={{height: `${window.innerHeight}px`}}>
                <Treebeard
                    style={treeBeardTheme}
                    data={this.state.tree}
                    onToggle={this.onToggle}
                />
            </div>
        );
    }
}

export default TreeView;
