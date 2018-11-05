import React, {Component} from 'react';
import '@gooddata/react-components/styles/css/main.css';
import '../styles/index.css';

import InsightList from './InsightList';
import EmbeddedAD from './EmbeddedAD';
import AppBar from './material-ui/AppBar';
import withTheme from './material-ui/withTheme';
import {insightUris, projectId} from '../mock-data';

class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpenAD: false,
            projectId: projectId || '',
            insights: insightUris.map((uri, index) => ({uri, key: index}))
        };
    }

    renderContent() {
        return (
            <div className="dashboard">
                {this.state.isOpenAD ?
                    <EmbeddedAD/> :
                    <InsightList projectId={this.state.projectId} insights={this.state.insights}/>}
            </div>
        );
    }

    renderHeader() {
        return (<AppBar/>);
    }

    render() {
        return (
            <div>
                {this.renderHeader()}
                {this.renderContent()}
            </div>
        );
    }
}

export default withTheme(Dashboard);