import {h1} from '@cycle/dom';


function Sentence(sources) {

  const {adjective$} = sources.prop$;

  const vtree$ = adjective$
        .map(v => !v.length ? '...' : `${v}!`)
        .map(v => h1({className: 'sentence'}, `Cycle is ${v}`));

  const sinks = {
    DOM: vtree$
  };

  return sinks;
}


export default Sentence;
