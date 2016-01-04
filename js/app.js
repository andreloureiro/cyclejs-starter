import {Observable} from 'rx';
import {run} from '@cycle/core';
import {div, input, h1, p, makeDOMDriver} from '@cycle/dom';


// Adjective Input Component
function AdjectiveInput(sources) {

  const inputValue$ = sources.DOM
    .select('#adjectiveInput')
    .events('input')
    .map(e => e.target.value)
    .startWith('');

  const vtree$ = inputValue$
    .map(value =>
      input('#adjectiveInput', {
        type: 'text', autofocus: true
      })
    );

  const sinks = {
    DOM: vtree$,
    inputValue$
  };

  return sinks;
}


// Sentence Component

function Sentence(sources) {

  const {adjective$} = sources.prop$;

  const vtree$ = adjective$
    .map(v => !v.length ? '...' : v)
    .map(v => h1(`Cycle is ${v}`));

  const sinks = {
    DOM: vtree$
  };

  return sinks;
}


// Top Level

function App(sources) {

  const adjectiveInputComponent = AdjectiveInput({DOM: sources.DOM});
  const adjectiveInputVTree$ = adjectiveInputComponent.DOM;
  const adjectiveInputValue$ = adjectiveInputComponent.inputValue$;

  const sentenceSources = {DOM: sources.DOM, prop$: {adjective$: adjectiveInputValue$}};
  const sentenceComponent = Sentence(sentenceSources);
  const sentenceVTree$ = sentenceComponent.DOM;

  const vtree$ = Observable
    .combineLatest(
      adjectiveInputVTree$,
      sentenceVTree$,
      (inputVTree, sentenceVTree) => div([
        sentenceVTree,
        inputVTree
      ])
    );

  const sinks = {
    DOM: vtree$
  };

  return sinks;
}


run(App, {DOM: makeDOMDriver('#app')});
