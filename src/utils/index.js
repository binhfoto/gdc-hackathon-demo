const {hostname, projectId} = require('../config');

export const getReportObjectId = (uri) => {
    if (!uri) return '';
    const [id] = uri.split('/').slice(-1);
    return id;
};

export const getEmbeddedUrl = (uri) => {
    const reportId = getReportObjectId(uri) || 'reportId';

    return `https://${hostname}/analyze/embedded/#/${projectId}/${reportId}/edit`;
};