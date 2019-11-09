export default class Helper {
    static bool_or_func = (val, ...args) => {
        if(typeof val !== "function") return Boolean(val);
        return val(...args);
    };
    static is_object = (item) => !Array.isArray(item) && typeof item === 'object' && item !== null;
    static objects_merge_compact = (obj1 = {}, obj2 = {}) => {
        let result = {};
        for(let i in obj1) {
            if(typeof obj2[i] !== "undefined") result[i] = obj2[i];
            else if(Helper.is_object(obj1[i])) result[i] = Helper.objects_merge_compact(obj1[i], obj2[i]);
            else result[i] = obj1[i];
        }
        for(let j in obj2) {
            if(typeof obj1[j] === 'undefined') result[j] = obj2[j];
        }
        return result;
    };
    static objects_merge = (...args) => {
        // debugger;
        args = Helper.copy_obj(args);
        return args.reduce((acc, next) => {
            return Helper.objects_merge_compact(acc, next);
        }, {});
    };
    static objectKeysToLowerCase(obj) {
        if(!(typeof obj === 'object' && obj !== null)) return obj;
        // console.group();
        // console.log(obj);
        let result = {};
        for (const i in obj) {
            result[String(i).toLowerCase()] = (typeof obj[i] === 'object' && obj[i] !== null) ? Helper.objectKeysToLowerCase(obj[i]) : obj[i];
        }
        // console.log('end', result);
        // console.groupEnd()
        return result;
    }
    static deepGet(obj, path) {
        let paths = path.split('.')
            , current = obj
            , i;

        for (i = 0; i < paths.length; ++i) {
            if (current[paths[i]] === undefined) {
                return false;
            } else {
                current = current[paths[i]];
            }
        }
        return current;
    };
    static deepSet(obj, path, value) {
        let a = path.split('.');
        let o = obj, i;
        for (i = 0; i < a.length - 1; i++) {
            const n = a[i];
            if (n in o) {
                o = o[n];
            } else {
                o[n] = {};
                o = o[n];
            }
        }
        o[a[a.length - 1]] = value;
        return obj;
    }
    static deepDelete(obj, path) {
        let a = path.split('.');
        let o = obj, i;
        for (i = 0; i < a.length - 1; i++) {
            const n = a[i];
            if (n in o) {
                o = o[n];
            } else {
                o[n] = {};
                o = o[n];
            }
        }
        delete o[a[a.length - 1]];
        return obj;
    }
    static swapArray = (inputArr, oldPlace, newPlace) => {
        const arr = inputArr.slice();   // Копируем массив
        // Проверим выход за пределы массива
        if ((Math.min(oldPlace, newPlace) < 0) || (Math.max(oldPlace, newPlace) >= arr.length)) {
            console.error('Out of range')
            return null;
        }
        const item = arr.splice(oldPlace, 1);
        arr.splice((newPlace > 0) ? newPlace - 1 : 0, 0, item[0])
        return arr;
    };

    static explode = (delimiter, string) => {	// Split a string by string
        if(typeof string === 'undefined') return [];
        return string.toString().split(delimiter.toString());
    };
    /** Аналог php функции implode() */
    static implode = (glue, pieces) => {
        return ( ( pieces instanceof Array ) ? pieces.join(glue) : pieces );
    };

    static capitalize(string) {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    }

    /* Улучшенная String.prototype.replace */
    static replaceAll(str, find, replace) {
        return str.replace(new RegExp(find, 'g'), replace);
    }

    static array_unique(arr) {
        let tmp_arr = [];
        for (let i = 0; i < arr.length; i++) {
            if (tmp_arr.indexOf(arr[i]) === -1) {
                tmp_arr.push(arr[i]);
            }
        }
        return tmp_arr;
    }

    /**
     * Аналог php функции
     * @param input
     * @param empty_values
     * @returns {Array}
     */
    static array_values(input, empty_values = [undefined]) {
        let tmpArr = [];
        let key = '';
        for (key in input) {
            if (empty_values.indexOf(input[key]) > -1)
                continue;
            tmpArr[tmpArr.length] = input[key]
        }
        return tmpArr
    }

    /**
     * Копирует объект. Костылисто, через JSON. Todo: оптимизировать
     * @param o
     * @return Object
     */
    static copy_obj(o) {
        if (Helper.is_object(o)) {
            return Object.assign({},
                Object.keys(o).reduce((acc, key) => ({
                        ...acc,
                        [key]: Helper.copy_obj(o[key]),
                    }), {})
            );
        }
        return o;
    }

    static create_map(arr, key, key2 = null) {
        arr = (arr === null || arr === undefined) ? [] : arr;

        let map = {};
        arr.map((item, i) => {
            map[!key2 ? item[key] : (item[key] + "/" + item[key2])] = i;
            return true;
        });
        return map;
    }

    /** Вернет true, если хотя бы один из элементов пустой массив/объект/строка */
    static is_empty() {
        for (const key in arguments) {
            if (!arguments[key] ||
                (typeof arguments[key] === 'object' ? Object.keys(arguments[key]).length === 0 : false) ||
                (Array.isArray(arguments[key]) ? arguments[key].length === 0 : false)) {
                return true;
            }
        }
        return false;
    }

    /**
     * detect IE
     * returns version of IE or false, if browser is not Internet Explorer
     */
    static detectIE = () => {
        let ua = window.navigator.userAgent;

        let msie = ua.indexOf('MSIE ');
        if (msie > 0) {
            // IE 10 or older => return version number
            return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
        }

        let trident = ua.indexOf('Trident/');
        if (trident > 0) {
            // IE 11 => return version number
            let rv = ua.indexOf('rv:');
            return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
        }

        let edge = ua.indexOf('Edge/');
        if (edge > 0) {
            // Edge (IE 12+) => return version number
            return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
        }

        // other browser
        return false;
    };

    //IE не знает ф-ии Object.values
    static values(o) {
        if (typeof Object.values === 'function') {
            return Object.values(o);
        } else {
            let result = [];
            for (const key in o) {
                if (typeof o[key] !== 'function') {
                    result.push(o[key]);
                }
            }
            return result;
        }
    }

    static padNumber (str, max) {
        str = str.toString();
        return str.length < max ? Helper.padNumber("0" + str, max) : str;
    }

    static round(value, precision = 2) {
        return (Math.round(value * Math.pow(10, precision)) / Math.pow(10, precision)) || 0;
    }

    static toLowerCase(str) {
        if(!str) return "";
        return String(str).toLowerCase();
    }
}
