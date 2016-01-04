import {run} from '@cycle/core';
import {makeDOMDriver} from '@cycle/dom';
import App from './components/App';

run(App, {DOM: makeDOMDriver('#root')});
