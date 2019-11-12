import {render} from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import "./fa.js";

import Routes from "./routes";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'src/index.scss';

// Для IE
import "core-js/modules/es.promise.finally";
import {polyfill} from 'es6-promise';
polyfill();

render(Routes, document.getElementById('root'));

registerServiceWorker();

// comment