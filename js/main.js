import {run} from '@cycle/core';
import {makeDOMDriver} from '@cycle/dom';
import {isolate} from '@cycle/isolate';
import {restart, restartable} from 'cycle-restart';
import App from './components/App';

const drivers = {
  DOM: restartable(makeDOMDriver('#root'), {pauseSinksWhileReplaying: false})
};

const {sinks, sources} = run( App, drivers );

if (module.hot) {
  module.hot.accept('./components/App', () => {
    app = require('./components/App' ).default;

    restart(app, drivers, {sinks, sources}, isolate);
    console.log( 'restarted' );
  });

}

