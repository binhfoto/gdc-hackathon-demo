const {hostname, projectId} = require('../config');

export const getReportObjectId = (uri) => {
    if (!uri) return '';
    const [id] = uri.split('/').slice(-1);
    return id;
};

export const createReportUrl = (reportId = 'reportId') => (
    `https://${hostname}/analyze/embedded/#/${projectId}/${reportId}/edit`
);