import{Aa as i,V as d,ea as s,gc as u,hc as y,j as a,o as l,qa as o,ya as b}from"./chunk-VRK5N2JK.js";function f(t){t||(o(f),t=s(i));let r=new a(e=>t.onDestroy(e.next.bind(e)));return e=>e.pipe(d(r))}function g(t,r){!r?.injector&&o(g);let e=r?.injector??s(b),n=new l(1),h=y(()=>{let c;try{c=t()}catch(p){u(()=>n.error(p));return}u(()=>n.next(c))},{injector:e,manualCleanup:!0});return e.get(i).onDestroy(()=>{h.destroy(),n.complete()}),n.asObservable()}export{f as a,g as b};