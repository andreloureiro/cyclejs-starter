import {h1} from '@cycle/dom';


function Sentence(sources) {

  const {adjectiveInputValue$} = sources.prop$;

  const vTree$ = adjectiveInputValue$
        .map(v => !v.length ? '...' : `${v}!`)
        .map(v => h1({className: 'sentence'}, `Cycle is ${v}`));

  const sinks = {
    DOM: vTree$
  };

  return sinks;
}


export default Sentence;
