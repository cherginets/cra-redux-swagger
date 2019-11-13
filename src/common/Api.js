class Api {
    static getGoogle = () => {return query("GET", "http://google.com")};
    static getClaims = () => {
        return default_response(window.api.claims.getClaims());
    };
    static addPlates = (claim_id = false) => {
        return default_response(window.api.claims.addPlates({claim_id}));
    }
}

export const default_response = (promise) => new Promise((resolve, reject) => {
    promise
        .then(result => {
            // здесь можно каким-то образом подготовить ответ со ВСЕХ запросов проекта
            // а так же вызвать reject() (допустим при наличии в ответе is_error===true
            resolve(result.obj)
        })
        .catch((error) => {
            // здесь можно написать свою глобальную обработку ошибок для всех запросов приложения
            console.log('error', error);
        })
});
export const query = (method, url, body, dataType = "JSON") => {
    return default_response(
        new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open(method, url);

            // xhr.setRequestHeader('Authorization', `Bearer ${Token.getAccessToken()}`);
            xhr.onreadystatechange = function () {
                if (xhr.readyState === XMLHttpRequest.DONE) {
                    // if(xhr.status === 403) {reject("Токен истёк"); return false}

                    try {
                        const response = JSON.parse(xhr.response);
                        // if(!response.is_error) resolve(response);
                        // else reject(response);
                        resolve(Api.default_response({obj: response}));
                        // обернуто в {obj: ...} по аналогии с клиентской библиотекой сваггера, что бы можно было
                        // использовать один default_response на разные типы запросов
                    } catch (e) {
                        console.log('e', e);
                        reject(e);
                    }

                }
            };

            let send_body;
            switch (dataType) {
                case "formData":
                    send_body = new FormData();
                    Object.keys(body).forEach(key => {
                        send_body.append(key, body[key]);
                    });
                    break;
                case "JSON":
                default:
                    send_body = JSON.stringify(body);
                    break;
            }
            xhr.send(send_body, true);
        })
    );
};

export default Api;