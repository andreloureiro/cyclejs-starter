import {Observable} from 'rx';
import {input} from '@cycle/dom';


function AdjectiveInput(sources) {

  const inputValue$ = sources.DOM
    .select('#adjectiveInput')
    .events('input')
    .map(e => e.target.value)
    .startWith('');

  const vTree$ = Observable.just(
    input('#adjectiveInput', {
      type: 'text',
      autofocus: true,
      className: 'adjective-input'
    })
  );

  const sinks = {
    DOM: vTree$,
    inputValue$
  };

  return sinks;
}


export default AdjectiveInput;
