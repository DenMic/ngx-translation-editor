import{Ab as x,Ba as g,Bb as y,Ca as s,Cb as _,Kb as S,Mb as D,Oa as h,Rb as p,_a as m,fc as E,ga as l,gb as b,ha as c,lb as C,nb as v,pb as k,sa as u,ta as f,tb as a,ub as r,xb as w,zb as d}from"./chunk-VRK5N2JK.js";var I=["*"];function M(i,e){if(i&1){let F=w();a(0,"div",0),d("click",function(){u(F);let t=x();return f(t.close())}),r(),a(1,"div",1),_(2),r()}}var z=(()=>{let e=class e{constructor(){this.show=m(!1),this.outClickClose=s(!1)}close(){this.outClickClose()&&this.show.set(!1)}toggle(){this.show.update(n=>!n)}showPop(){this.show.set(!0)}closePop(){this.show.set(!1)}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=c({type:e,selectors:[["edt-popup"]],inputs:{outClickClose:[l.SignalBased,"outClickClose"]},standalone:!0,features:[p],ngContentSelectors:I,decls:1,vars:1,consts:[[1,"w-full","h-full","z-40","fixed","top-0","bottom-0","right-0","left-0","bg-neutral-950","opacity-50",3,"click"],[1,"flex","flex-col","fixed","top-1/2","left-1/2","rounded-lg","bg-neutral-200","dark:bg-base-700","-translate-x-1/2","-translate-y-1/2","z-50"]],template:function(t,o){t&1&&(y(),b(0,M,3,0)),t&2&&k(0,o.show()?0:-1)},changeDetection:0});let i=e;return i})();var J=(()=>{let e=class e{constructor(){this.label=s(""),this.level=s("primary"),this.disabled=s(!1),this.buttonCss=E(()=>{let n="";switch(this.level()){case"primary":n="bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-4 rounded disabled:bg-neutral-400";break;case"secondary":n="bg-transparent hover:bg-green-700 text-green-800 dark:text-green-500 font-semibold hover:text-white py-2 px-4 border border-green-700 dark:border-green-500 hover:border-transparent rounded disabled:bg-neutral-400";break}return n}),this.onClick=g()}clickEvent(){this.onClick.emit()}};e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=c({type:e,selectors:[["edt-button"]],inputs:{label:[l.SignalBased,"label"],level:[l.SignalBased,"level"],disabled:[l.SignalBased,"disabled"]},outputs:{onClick:"onClick"},standalone:!0,features:[p],decls:2,vars:4,consts:[[1,"",3,"click","disabled"]],template:function(t,o){t&1&&(a(0,"button",0),d("click",function(){return o.clickEvent()}),S(1),r()),t&2&&(v(o.buttonCss()),C("disabled",o.disabled()),h(),D(" ",o.label(),`
`))},changeDetection:0});let i=e;return i})();export{z as a,J as b};
