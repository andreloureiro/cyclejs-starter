import {Observable} from 'rx';
import {div, img} from '@cycle/dom';
import AdjectiveInput from './AdjectiveInput';
import Sentence from './Sentence';


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
          (inputVTree, sentenceVTree) =>
            div({className: 'app'}, [
              img({src: '/images/cyclejs_logo.svg', width: 200}),
              sentenceVTree,
              inputVTree
            ])
        );

  const sinks = {
    DOM: vtree$
  };

  return sinks;
}


export default App;
