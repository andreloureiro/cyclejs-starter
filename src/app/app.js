import {Observable} from 'rx';
import Cycle from '@cycle/core';
import {div, input, h1, makeDOMDriver} from '@cycle/dom';


// Adjective Input

function AdjectiveInput(sources) {

  const inputValue$ = sources.DOM
    .select('#adjectiveInput')
    .events('input')
    .map(e => e.target.value)
    .startWith('');

  const vtree$ = inputValue$
    .map(value =>
      div([
        h1(`Cycle is ${value}`),
        input('#adjectiveInput', {
          type: 'text'
        })
      ])
    );

  const sinks = {
    DOM: vtree$,
    inputValue$
  };

  return sinks;
}


// Top Level

function main(responses) {

  const title$ = Observable.just('Cycle. js Starter');

  const adjectiveInput = AdjectiveInput({DOM: responses.DOM});
  const adjectiveInputVTree$ = adjectiveInput.DOM;
  const adjectiveInputValue$ = adjectiveInput.inputValue$;

  const vTree$ = Observable
    .combineLatest(
      title$,
      adjectiveInputVTree$,
      (title, inputVTree) =>
        div([
          inputVTree
        ])
    );

  return {
    DOM: vTree$
  };
}


Cycle.run(main, {
  DOM: makeDOMDriver('#app')
});
