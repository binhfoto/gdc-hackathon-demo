export const getReportObjectId = (uri) => {
    if (!uri) return '';
    const [id] = uri.split('/').slice(-1);
    return id;
};