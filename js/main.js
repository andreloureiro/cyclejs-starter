import {run} from '@cycle/xstream-run';
import {makeDOMDriver} from '@cycle/dom';
import BMI from './examples/bmi';
import Hello from './examples/hello-world';

const drivers = {
  DOM: makeDOMDriver('#root')
};

run(BMI, drivers);
