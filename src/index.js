import {render} from 'react-dom';
import registerServiceWorker from './registerServiceWorker';

import Routes from "./routes";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'src/index.scss';

render(Routes, document.getElementById('root'));

registerServiceWorker();
