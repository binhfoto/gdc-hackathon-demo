
class ApiService {

    buildUrl(url) {
        // return `https://${hostname}/${url}`;
        return `https://localhost:3000/${url}`;
    }

    get(url) {
        return fetch(this.buildUrl(url), {
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "Accept": "application/json"
            }
        }).then(res => {
            return res && res.json();
        }).catch(e => {
            throw e;
        })
    }

    delete(url) {
        return fetch(this.buildUrl(url), {
            method: 'DELETE'
        }).catch(e => {
            throw e;
        });
    }
}

export default new ApiService();