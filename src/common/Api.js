import {SWAGGER_URL} from "./constants/enviroment";

class Api {
    client = false;
    static init = () => new Promise(resolve => {
        if(!SWAGGER_URL) resolve();

        const Swagger = require('swagger-client');
        new Swagger({
            debug: false,
            url: SWAGGER_URL
        })
            .then(client => {
                // if (API_HOST) client.spec.host = API_HOST;
                window.client = client;
                window.api = client.apis;

                console.info('client', client);
                console.info('api', window.api);

                resolve();
            });
    });

    static getClaims = () => new Promise((resolve, reject) => {
        window.api.claims.getClaims()
            .then(result => resolve(result.obj))
            .catch(error => console.error(error))
    });
    static addPlates = (claim_id = false) => new Promise((resolve, reject) => {
        window.api.claims.addPlates({claim_id})
            .then(result => resolve(result.obj))
            .catch(error => console.error(error))
    })
}

export default Api;