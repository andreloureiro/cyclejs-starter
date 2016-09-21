import Router from '../components/Router';

export default function Main(sources) {
  const router = Router({...sources});
  return {
    DOM: router.DOM
  };
};