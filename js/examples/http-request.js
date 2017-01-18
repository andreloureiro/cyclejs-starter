import Stream from 'xstream';
import {div, h1} from '@cycle/dom';

export function HttpRequest(sources) {
    const request$ = Stream.of({
        category: 'ip-request',
        url: 'https://httpbin.org/ip'
    });
    const response$ = sources.HTTP.select('ip-request').flatten();
    const vdom$ = response$
        .map(res => `IP address: ${res.body.origin}`)
        .startWith('Requesting IP address...')
        .map(text =>
            div('.container', [
                h1(text),
            ])
        );
    return {
        DOM: vdom$,
        HTTP: request$
    };
}
