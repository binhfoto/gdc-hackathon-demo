import React, {Component} from 'react';
import PropTypes from 'prop-types';
import AppBar from './AppBar';

import '@gooddata/react-components/styles/css/main.css';
import InsightList from './InsightList';
import EmbeddedAD from './EmbeddedAD';
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
            this.state.isOpenAD ?
                <EmbeddedAD/> :
                <InsightList projectId={this.state.projectId} insights={this.state.insights}/>
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

Dashboard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default Dashboard;