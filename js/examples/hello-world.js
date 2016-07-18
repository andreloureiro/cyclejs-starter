import xs from 'xstream';
import {div, input, h1} from '@cycle/dom';

const intent = sources => ({
  inputValue$: sources.DOM
    .select('#input')
    .events('input')
    .map(e => e.target.value)
    .startWith('')
});

const model = action =>
  action.inputValue$
    .map(v => `Hello ${v}`);


const view = state =>
  state.map(sentence =>
    div([
      h1(sentence),
      input('#input', {attrs: {type: 'text'}})
    ]));

export default sources => ({
  DOM: view(model(intent(sources)))
});
