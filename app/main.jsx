import './stylesheets/main.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router'
import RepoView from './src/components/repo-view/RepoView';
import App from './src/components/app';

// init shell
renderShell();

function renderShell() {
    let shell = document.createElement('div');
    shell.className = 'app-shell';
    document.body.appendChild(shell);

    ReactDOM.render( <Router history={browserHistory}>
                    <Route path='/' component={App}/>
                    <Route path='/:username/:repo' component={RepoView}/>
                  </Router>, shell);
}
