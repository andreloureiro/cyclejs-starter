import {run} from '@cycle/xstream-run';
import {makeDOMDriver} from '@cycle/dom';
import {makeHTTPDriver} from '@cycle/http';
import {createHistory} from 'history';
import {makeRouterDriver} from 'cyclic-router';
import Router from './components/Router/index';

const drivers = {
  DOM: makeDOMDriver('#root'),
  HTTP: makeHTTPDriver(),
  router: makeRouterDriver(createHistory(), {capture: true})
};

run(Router, drivers);
