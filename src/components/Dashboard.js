import React, {Component} from 'react';
import '@gooddata/react-components/styles/css/main.css';
import '../styles/index.css';
import uuidv4 from 'uuid/v4';
import _ from 'lodash'; // TODO: should import necessary apis
import InsightList from './InsightList';
import EmbeddedAD from './EmbeddedAD';
import AppBar from './material-ui/AppBar';
import withTheme from './material-ui/withTheme';
import {createReportUrl, getReportObjectId} from '../utils';
import {registerReceiveMessage, sendMessage, unregisterReceiveMessage} from '../utils/communication';

const {projectId, insightUris} = require('../config');

class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            enablePostMessage: true,

            isOpenAD: false,
            insights: insightUris.map((uri) => ({uri, key: uuidv4()}))
        };

        this.refreshADKey = 1;
        this.editedUris = [];
        this.editingReportId = null;

        registerReceiveMessage(this.handleReceiveMessage);
    }

    handleEditClick = (uri) => {
        console.log('edit report', uri);

        const reportId = getReportObjectId(uri);
        if (!reportId) {
            return console.error('Can\'t get report id from uri', uri);
        }

        if (this.state.enablePostMessage) {
            // send message to embedded AD
            sendMessage({reportId, projectId});
        } else {
            // reload embedded AD with report Id
            this.forceEmbeddedADUpdate();
            this.editingReportId = reportId;
        }
        this.setState({isOpenAD: true});
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
        console.log('close AD');

        if (!this.editedUris.length) {
            // close AD if insight is not edited
            this.setState({isOpenAD: false});
            return;
        }

        let {insights} = this.state;

        // in AD, user can create new and edit many insights
        // once AD closed, these insights should be created or updated
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
        this.editedUris = []; // clean up
        this.setState({insights, isOpenAD: false}); // close AD
    };

    handleReceiveMessage = (uri) => {
        // persist insight that is created or updated in AD
        // more detail, AD will send message 'visualizationSaved' to parent app
        // this message attaches 'uri'
        this.editedUris.push(uri);
    };

    forceEmbeddedADUpdate = () => {
        // force AD update be update the 'key'
        this.refreshADKey = Date.now();
    };

    handleEnablePostMessageToggle = (evt) => {
        // this will make demo more understandable
        // by presenting before/after scenario
        const checked = evt.target.checked;
        if (!checked) {
            this.forceEmbeddedADUpdate();
        }
        this.setState({enablePostMessage: checked});
    };

    renderContent() {
        const reportUrl = createReportUrl(this.editingReportId);
        return (
            <div className="dashboard">
                <div className={this.state.isOpenAD ? 'hide' : 'show'}>
                    <InsightList
                        projectId={projectId}
                        insights={this.state.insights}
                        onEdit={this.handleEditClick.bind(this)}
                        onDelete={this.handleDeleteClick}
                    />
                </div>
                <div className={this.state.isOpenAD ? 'show' : 'hide'}>
                    <EmbeddedAD
                        key={this.refreshADKey}
                        onClose={this.handleCloseClick}
                        reportUrl={reportUrl}
                    />
                </div>
            </div>
        );
    }

    renderHeader() {
        return (
            <AppBar
                enablePostMessage={this.state.enablePostMessage}
                onEnablePostMessageToggle={this.handleEnablePostMessageToggle}
            />
        );
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