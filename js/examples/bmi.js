import xs from 'xstream';
import isolate from '@cycle/isolate';
import {div, h2, input, span} from '@cycle/dom';

const LabeledSlider = sources => {
  const domSource = sources.DOM;
  const props$ = sources.props;

  const newValue$ = domSource
    .select('.slider')
    .events('input')
    .map(e => e.target.value);

  const state$ = props$
    .map(props => newValue$
      .map(value => ({
        label: props.label,
        unit: props.unit,
        min: props.min,
        max: props.max,
        value: value
      }))
      .startWith(props)
    )
    .flatten()
    .remember();

  const vdom$ = state$
    .map(state =>
      div('.labeled-slider', [
        span('.label', state.label + ' ' + state.value + state.unit),
        input('.slider', {
          attrs: {type: 'range', min: state.min, max: state.max, value: state.value}
        })
      ])
    );
  
  const sinks = {
    DOM: vdom$,
    value: state$.map(state => state.value)
  };

  return sinks;
};

export default sources => {
  const weightProps$ = xs.of({
    label: 'Weight', unit: 'kg', min: 40, max: 150, value: 70
  });
  const heightProps$ = xs.of({
    label: 'Height', unit: 'cm', min: 140, max: 210, value: 170
  });

  const weightSources = {DOM: sources.DOM, props: weightProps$};
  const heightSources = {DOM: sources.DOM, props: heightProps$};

  const weightSlider = isolate(LabeledSlider)(weightSources);
  const heightSlider = isolate(LabeledSlider)(heightSources);

  const weightVDom$ = weightSlider.DOM;
  const weightValue$ = weightSlider.value;

  const heightVDom$ = heightSlider.DOM;
  const heightValue$ = heightSlider.value;

  const bmi$ = xs.combine(weightValue$, heightValue$)
    .map(([weight, height]) => {
      const heightMeters = height * 0.01;
      const bmi = Math.round(weight / (heightMeters * heightMeters));
      return bmi;
    })
    .remember();

  const vdom$ = xs.combine(bmi$, weightVDom$, heightVDom$)
    .map(([bmi, weightVDom, heightVDom]) =>
      div([
        weightVDom,
        heightVDom,
        h2('BMI is ' + bmi)
      ])
    );
  
  const sinks = {DOM: vdom$};

  return sinks;
};
