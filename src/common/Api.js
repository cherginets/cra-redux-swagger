import {SWAGGER_URL} from "src/constants/enviroment";

class Api {
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