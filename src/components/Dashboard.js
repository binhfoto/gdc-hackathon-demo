import React, {Component} from 'react';
import '@gooddata/react-components/styles/css/main.css';
import '../styles/index.css';

import InsightList from './InsightList';
import EmbeddedAD from './EmbeddedAD';
import AppBar from './material-ui/AppBar';
import withTheme from './material-ui/withTheme';
const {projectId, insightUris} = require('../config');

class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpenAD: false,
            projectId: projectId || '',
            insights: insightUris.map((uri, index) => ({uri, key: index}))
        };
    }

    handleEditClick = (uri) => {
        this.setState({ isOpenAD: true});
        console.log('edit', uri);
    };

    handleDeleteClick = (uri) => {
        console.log('delete', uri);
    };

    handleCloseClick = (uri) => {
        this.setState({ isOpenAD: false});
        console.log('close', uri);
    };

    renderContent() {
        return (
            <div className="dashboard">
                <div className={this.state.isOpenAD ? 'hide' : 'show'}>
                    <InsightList
                        projectId={this.state.projectId}
                        insights={this.state.insights}
                        onEdit={this.handleEditClick}
                        onDelete={this.handleDeleteClick}
                    />
                </div>
                <div className={this.state.isOpenAD ? 'show' : 'hide'}>
                    <EmbeddedAD onClose={this.handleCloseClick}/>
                </div>
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