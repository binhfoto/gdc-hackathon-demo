import React, {Component} from 'react';
import '@gooddata/react-components/styles/css/main.css';
import '../styles/index.css';
import uuidv4 from 'uuid/v4';
import findIndex from 'lodash/findIndex';
import InsightList from './InsightList';
import EmbeddedAD from './EmbeddedAD';
import AppBar from './material-ui/AppBar';
import DashboardOperation from './DashboardOperation';
import withTheme from './material-ui/withTheme';
import {createReportUrl, getReportObjectId} from '../utils';
import {registerReceiveMessage, sendMessage, unregisterReceiveMessage} from '../utils/communication';

const {projectId, insights} = require('../config');

class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            enablePostMessage: true,

            isOpenAD: false,
            insights: insights.map(insight => ({...insight, key: uuidv4()}))
        };

        this.refreshADKey = 1;
        this.editedInsights = [];
        this.editingReportId = null;

        registerReceiveMessage(this.handleReceiveMessage);
    }

    handleAddClick = () => {
        this.handleEditClick({});
    };

    handleEditClick = ({uri, identifier}) => {
        uri && console.log('edit report', uri);

        const reportId = uri ? getReportObjectId(uri) : identifier;
        !reportId && console.log('Create new insight');

        this.editingReportId = reportId || 'reportId';

        if (this.state.enablePostMessage) {
            const data = reportId ?
                            {reportId, projectId} : // edit insight
                            {projectId}; // new insight

            // send message to embedded AD
            sendMessage(data);
        } else {
            // reload embedded AD with report Id
            this.forceEmbeddedADUpdate();
        }
        this.setState({isOpenAD: true});
    };

    handleDeleteClick = ({uri, identifier}) => {
        console.log('delete report', uri);
        let {insights} = this.state;
        insights = insights.filter(insight => {
            let {uri: _uri, identifier: _identifier} = insight;
            if (uri) {
                return uri !== _uri;
            }
            return identifier !== _identifier;
        });
        this.setState({insights});
    };

    handleCloseClick = () => {
        console.log('close AD');

        if (!this.editedInsights.length) {
            // close AD if insight is not edited
            this.setState({isOpenAD: false});
            return;
        }

        let {insights} = this.state;

        // in AD, user can create new and edit many insights
        // once AD closed, these insights should be created or updated
        this.editedInsights.forEach(({uri, identifier}) => {
            const index = findIndex(insights, (insight) => {
                return insight.uri === uri || insight.identifier === identifier;
            });
            if (index === -1) {
                insights.push({
                    uri,
                    identifier,
                    key: uuidv4()
                });
            } else {
                insights[index].key = uuidv4();
            }
        });
        this.editedInsights = []; // clean up
        this.setState({insights, isOpenAD: false}); // close AD
    };

    handleReceiveMessage = (message) => {
        // persist insight that is created or updated in AD
        // more detail, AD will send message 'visualizationSaved' to parent app
        // this message attaches 'uri' and 'identifier'
        this.editedInsights.push(message);
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
                    <DashboardOperation
                        enablePostMessage={this.state.enablePostMessage}
                        onEnablePostMessageToggle={this.handleEnablePostMessageToggle}
                        onNewInSight={this.handleAddClick}
                    />
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
            <AppBar/>
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