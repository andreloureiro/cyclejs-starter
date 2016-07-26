import xs from 'xstream';
import {div, nav, a} from '@cycle/dom';
import {merge, prop} from 'ramda';
import BMI from '../../examples/bmi';
import Hello from '../../examples/hello-world';

export default function Router(sources) {
  const {router} = sources;

  const match$ = router.define({
    '/bmi': BMI,
    '/hello': Hello
  });

  const page$ = match$.map(({path, value}) => value(merge(sources, {
    path: router.path(path)
  })));

  const makeLink = (path, label) => a({props: {href: path}, style: {padding: '1em'}}, label);

  const nav$ = xs.of(nav({style: {marginBottom: '1em'}}, [
    makeLink('/bmi', 'BMI'),
    makeLink('/hello', 'Hello')
  ]));

  const view$ = page$.map(prop('DOM')).flatten();

  const vdom$ = xs.combine(nav$, view$)
    .map(([navDom, viewDom]) => div([navDom, viewDom]));
    
  return {
    DOM: vdom$,
    router: xs.of('/bmi')
  }
}