import React from 'react';
import PropTypes from 'prop-types';
import Loading from "src/components/Loading/Loading";
import Error from "src/components/Error/Error";
import {IS_DEV} from "src/constants/enviroment";

class SwaggerService extends React.Component {
    state = {
        loading: true,
        error: false,
    };

    componentDidMount() {
        const {swagger_url} = this.props;

        if(!swagger_url) {
            this.setState({error: "Not found url to swagger", loading: false});
            return false;
        }

        const Swagger = require('swagger-client');
        new Swagger({
            debug: false,
            url: swagger_url
        })
            .then(client => {
                let host = client.spec.host || process.env.REACT_APP_API_HOST || window.location.hostname,
                    port,
                    url = client.spec.basePath || process.env.REACT_APP_API_URL || "/",
                    protocol = client.spec.schemes && client.spec.schemes.length > 0 ? client.spec.schemes[0] : (process.env.REACT_APP_API_PROTOCOL || window.location.protocol);
                if (host) {
                    host = host.split(":");
                    if(host.length > 1) {
                        port = host[1]
                    }
                    host = host[0];
                }
                port = port || process.env.REACT_APP_API_PORT || window.location.port;

                if (['http', 'https'].indexOf(protocol) > -1) protocol += ":";

                let path = protocol + "//" + host;
                if(port) path += ":" + port;
                if(url && url !== '/') path += url;

                window.api = client.apis;
                window.client = client;
                window.server = { protocol, host, port, url, path,};

                if(IS_DEV) console.info('client', window.client);
                if(IS_DEV) console.info('api', window.api);
                if(IS_DEV) console.info('server', window.server);
            })
            .catch(() => this.setState({error: `Error on swagger initialization`}))
            .finally(() => this.setState({loading: false}))
    }

    render() {
        const {loading, error} = this.state;

        if (loading) return <Loading text={"Swagger initialization..."} place={"window"}/>;
        if (error) return <Error text={error}/>;

        return this.props.children;
    }
}

SwaggerService.defaultProps = {
    swagger_url: process.env.REACT_APP_SWAGGER_URL,
};

SwaggerService.propTypes = {
    swagger_url: PropTypes.string, // Путь до доки сваггера
};

export default SwaggerService