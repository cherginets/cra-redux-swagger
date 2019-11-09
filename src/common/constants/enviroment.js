let SWAGGER_URL = process.env.REACT_APP_SWAGGER_URL,
    API_HOST = process.env.REACT_APP_API_HOST || window.location.hostname,
    API_PROTOCOL = process.env.REACT_APP_API_PROTOCOL || window.location.protocol,
    API_PORT = process.env.REACT_APP_API_PORT || window.location.port,
    API_URL = process.env.REACT_APP_API_URL || "/";

if (['http', 'https'].indexOf(API_PROTOCOL) > -1) API_PROTOCOL += ":";

let API_PATH = API_PROTOCOL + "//" + API_HOST;
if(API_PORT) API_PATH += ":" + API_PORT;
if(API_URL && API_URL !== '/') API_PATH += API_URL;

if(SWAGGER_URL[0] === "/") SWAGGER_URL = API_PATH + SWAGGER_URL;

const IS_DEV = process.env.NODE_ENV === 'development',
    IS_PROD = !IS_DEV;

export {
    SWAGGER_URL,
    API_HOST,
    API_PORT,
    API_PROTOCOL,
    API_URL,

    API_PATH,

    IS_DEV,
    IS_PROD,
}