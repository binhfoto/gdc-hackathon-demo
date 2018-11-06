import get from 'lodash/get';

const createMessage = (data) => {
    return {
        "gdc": {
            "product": "analyticalDesigner",
            "event": {
                "name": "editInsight",
                "data": {...data}
            }
        }
    };
};

const getADEmbeddedHost = () => {
    return (document.getElementById('gdc') || {}).contentWindow;
};

export const sendMessage = (data) => {
    const message = createMessage(data);
    const target = getADEmbeddedHost();
    if (target) {
        target.postMessage(message, '*');
    } else {
        console.error('Can\'t find embedded AD element');
    }
};

const handleMessage = (callback) => (event) => {
    const gdc = get(event, 'data.gdc', null);
    if (!gdc) return;

    const {product, event: {data, name}} = gdc;
    if (product === 'analyticalDesigner' && name === 'visualizationSaved') {
        callback(get(data, 'visualizationObject.meta.uri', null));
    }
};

let receiver = null;

export const registerReceiveMessage = (callback) => {
    receiver = handleMessage(callback);
    window.addEventListener('message', handleMessage(callback));
};

export const unregisterReceiveMessage = () => {
    window.removeEventListener('message', receiver);
};
