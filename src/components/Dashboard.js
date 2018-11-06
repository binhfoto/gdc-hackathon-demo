import React, {Component} from 'react';
import '@gooddata/react-components/styles/css/main.css';
import '../styles/index.css';
import uuidv4 from 'uuid/v4';
import _ from 'lodash';
import InsightList from './InsightList';
import EmbeddedAD from './EmbeddedAD';
import AppBar from './material-ui/AppBar';
import withTheme from './material-ui/withTheme';
import { getEmbeddedUrl, getReportObjectId } from '../utils';
import {sendMessage, registerReceiveMessage, unregisterReceiveMessage} from '../utils/communication';
const {projectId, insightUris} = require('../config');

class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            url: '',
            isOpenAD: false,
            insights: insightUris.map((uri) => ({uri, key: uuidv4()}))
        };

        this.editedUris = [];
        registerReceiveMessage(this.handleReceiveMessage);
    }

    handleEditClick = (uri) => {
        console.log('edit report', uri);
        this.setState({
            isOpenAD: true,
            url: getEmbeddedUrl(uri)
        });
        // const reportId = getReportObjectId(uri);
        // if (reportId) {
        //     sendMessage({reportId, projectId});
        // } else {
        //     console.error('Can\'t get report id from uri', uri);
        // }
    };

    handleDeleteClick = (uri) => {
        console.log('delete report', uri);
        let {insights} = this.state;
        insights = insights.filter(insight => {
            let {uri: _uri} = insight;
            return uri !== _uri;
        });
        this.setState({insights});
    };

    handleCloseClick = () => {

        this.setState({isOpenAD: false});
        console.log('close AD');

        if (!this.editedUris.length) return;

        let {insights} = this.state;

        this.editedUris.forEach(uri => {
            const index = _.findIndex(insights, (insight) => {
                return insight.uri === uri;
            });
            if (index === -1) {
                insights.push({
                    uri, key: uuidv4()
                });
            } else {
                insights[index].key = uuidv4();
            }
        });
        this.editedUris = [];
        this.setState({insights});
    };

    handleReceiveMessage = (uri) => {
        this.editedUris.push(uri);
    };

    renderContent() {
        return (
            <div className="dashboard">
                <div className={this.state.isOpenAD ? 'hide' : 'show'}>
                    <InsightList
                        projectId={projectId}
                        insights={this.state.insights}
                        onEdit={this.handleEditClick}
                        onDelete={this.handleDeleteClick}
                    />
                </div>
                <div className={this.state.isOpenAD ? 'show' : 'hide'}>
                    <EmbeddedAD url={this.state.url} onClose={this.handleCloseClick}/>
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

    componentWillUnmount() {
        unregisterReceiveMessage();
    }
}

export default withTheme(Dashboard);