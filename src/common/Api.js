import {CUSTOM_API_HOST, CUSTOM_API_SERVER, SWAGGER_JSON_URL} from "./Constants";

class Api {
    client = false;
    static init = () => new Promise(resolve => {
        if(!SWAGGER_JSON_URL) resolve();

        const Swagger = require('swagger-client');
        new Swagger({
            debug: false,
            url: SWAGGER_JSON_URL
        })
            .then(client => {
                if (CUSTOM_API_SERVER) client.spec.host = CUSTOM_API_HOST;
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