import Rx from 'rx';
import Cycle from '@cycle/core';
import {makeDOMDriver, h} from '@cycle/dom';

const title = 'Cycle.js Starter';

function main (responses) {

  return {
    DOM: Rx.Observable
      .just(title)
      .map(title =>
        h('h1', title)
      )
  }
}

let drivers = {
  DOM: makeDOMDriver('#app')
}

Cycle.run(main, drivers);

