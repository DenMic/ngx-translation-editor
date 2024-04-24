import{a as B,b as U,c as V,d as $,f as G,g as Y,h as J}from"./chunk-B4UFVJKA.js";import"./chunk-7UVL7FXH.js";import"./chunk-4KV7BN26.js";import{p as Q}from"./chunk-WZLUTRBS.js";import{a as q,b as K,c as y,e as S,f as u}from"./chunk-NFYRXBCV.js";import{a as W,b as X,c as Z,e as h}from"./chunk-NAXA2R4W.js";import{Ka as w,Kb as v,Lb as j,Oa as f,Qa as E,Rb as O,Sa as R,Sb as L,Ua as P,Wa as F,Xa as M,Y as x,_ as T,ea as d,gb as D,ha as _,la as k,lb as I,lc as H,ma as A,oc as z,pb as N,tb as a,ub as l,vb as p,zb as m}from"./chunk-VRK5N2JK.js";var ee=[{path:"translations",loadComponent:()=>import("./chunk-4OUD3WKQ.js").then(r=>r.TranslationsComponent),children:[{path:"list/:id",loadComponent:()=>import("./chunk-VPGP3J6N.js").then(r=>r.PrjTranslationComponent)},{path:"column/:id",loadComponent:()=>import("./chunk-PF37C4MR.js").then(r=>r.ColumnTranslationsComponent)}]}];var te=[{path:"project",loadComponent:()=>import("./chunk-T7DO5Y7E.js").then(r=>r.ProjectsComponent)},{path:"languages",loadComponent:()=>import("./chunk-R6QFSUSO.js").then(r=>r.LanguagesComponent)},{path:"settings",loadComponent:()=>import("./chunk-M26YGY5D.js").then(r=>r.SettingsComponent)},...ee,{path:"",redirectTo:"project",pathMatch:"full"},{path:"**",pathMatch:"full",loadComponent:()=>import("./chunk-HCZHID3O.js").then(r=>r.NotFoundComponent)}];var ae="@",le=(()=>{let e=class e{constructor(t,n,o,s,c){this.doc=t,this.delegate=n,this.zone=o,this.animationType=s,this.moduleImpl=c,this._rendererFactoryPromise=null,this.scheduler=d(R,{optional:!0})}ngOnDestroy(){this._engine?.flush()}loadImpl(){return(this.moduleImpl??import("./chunk-BRWEX5EX.js")).catch(n=>{throw new x(5300,!1)}).then(({\u0275createEngine:n,\u0275AnimationRendererFactory:o})=>{this._engine=n(this.animationType,this.doc,this.scheduler);let s=new o(this.delegate,this._engine,this.zone);return this.delegate=s,s})}createRenderer(t,n){let o=this.delegate.createRenderer(t,n);if(o.\u0275type===0)return o;typeof o.throwOnSyntheticProps=="boolean"&&(o.throwOnSyntheticProps=!1);let s=new b(o);return n?.data?.animation&&!this._rendererFactoryPromise&&(this._rendererFactoryPromise=this.loadImpl()),this._rendererFactoryPromise?.then(c=>{let oe=c.createRenderer(t,n);s.use(oe)}).catch(c=>{s.use(o)}),s}begin(){this.delegate.begin?.()}end(){this.delegate.end?.()}whenRenderingDone(){return this.delegate.whenRenderingDone?.()??Promise.resolve()}};e.\u0275fac=function(n){E()},e.\u0275prov=T({token:e,factory:e.\u0275fac});let r=e;return r})(),b=class{constructor(e){this.delegate=e,this.replay=[],this.\u0275type=1}use(e){if(this.delegate=e,this.replay!==null){for(let i of this.replay)i(e);this.replay=null}}get data(){return this.delegate.data}destroy(){this.replay=null,this.delegate.destroy()}createElement(e,i){return this.delegate.createElement(e,i)}createComment(e){return this.delegate.createComment(e)}createText(e){return this.delegate.createText(e)}get destroyNode(){return this.delegate.destroyNode}appendChild(e,i){this.delegate.appendChild(e,i)}insertBefore(e,i,t,n){this.delegate.insertBefore(e,i,t,n)}removeChild(e,i,t){this.delegate.removeChild(e,i,t)}selectRootElement(e,i){return this.delegate.selectRootElement(e,i)}parentNode(e){return this.delegate.parentNode(e)}nextSibling(e){return this.delegate.nextSibling(e)}setAttribute(e,i,t,n){this.delegate.setAttribute(e,i,t,n)}removeAttribute(e,i,t){this.delegate.removeAttribute(e,i,t)}addClass(e,i){this.delegate.addClass(e,i)}removeClass(e,i){this.delegate.removeClass(e,i)}setStyle(e,i,t,n){this.delegate.setStyle(e,i,t,n)}removeStyle(e,i,t){this.delegate.removeStyle(e,i,t)}setProperty(e,i,t){this.shouldReplay(i)&&this.replay.push(n=>n.setProperty(e,i,t)),this.delegate.setProperty(e,i,t)}setValue(e,i){this.delegate.setValue(e,i)}listen(e,i,t){return this.shouldReplay(i)&&this.replay.push(n=>n.listen(e,i,t)),this.delegate.listen(e,i,t)}shouldReplay(e){return this.replay!==null&&e.startsWith(ae)}};function re(r="animations"){return F("NgAsyncAnimations"),k([{provide:P,useFactory:(e,i,t)=>new le(e,i,t,r),deps:[H,V,M]},{provide:w,useValue:r==="noop"?"NoopAnimations":"BrowserAnimations"}])}var g=class{http;prefix;suffix;constructor(e,i="/assets/i18n/",t=".json"){this.http=e,this.prefix=i,this.suffix=t}getTranslation(e){return this.http.get(`${this.prefix}${e}${this.suffix}`)}};var C=class{handle(e){return"Missing translation: "+e.key}},ie={providers:[J(te),re(),U(),A(h.forRoot({missingTranslationHandler:{provide:X,useClass:C},useDefaultLang:!1,loader:{provide:W,useFactory:pe,deps:[B]}}))]};function pe(r){return new g(r,"./assets/i18n/",".json")}var de=r=>({dark:r});function me(r,e){r&1&&p(0,"i",8)}function ce(r,e){r&1&&p(0,"i",15)}var ne=(()=>{let e=class e{constructor(){this.title="ngx-translation-editor",this.storageService=d(K),this.translateService=d(Z),this.appSettingsService=d(q),this.router=d(Y)}ngOnInit(){let t=this.storageService.retrieve(S),n=this.storageService.retrieveObj(y),o=this.storageService.retrieve(u);n||(n=Q[0],this.storageService.store(y,n)),o||(o="light",this.storageService.store(u,o)),t||(t="list",this.storageService.store(S,t)),this.translateService.use(n.fileName),this.appSettingsService.setTheme(o),this.appSettingsService.setLayoutPage(t)}switchDarkTheme(){let t=this.appSettingsService.darkTheme()?"light":"dark";this.storageService.store(u,t),this.appSettingsService.setTheme(t)}};e.\u0275fac=function(n){return new(n||e)},e.\u0275cmp=_({type:e,selectors:[["app-root"]],standalone:!0,features:[O],decls:23,vars:5,consts:[[1,"overflow-hidden","bg-neutral-50","dark:bg-base-800",3,"ngClass"],[1,"py-4","px-9","flex","justify-between","sticky","top-0","left-0","z-40","border-b","bg-neutral-200","border-b-neutral-300","dark:bg-base-900","dark:border-b-base-600"],[1,"flex","gap-5","items-center","font-semibold","defaultText","text-base"],["alt","Logo","src","assets/images/logo.svg","width","32",1,"dark:grayscale","dark:invert"],[1,"flex","gap-4","items-center"],[1,"buttonSecondary",3,"click"],["title","Project",1,"fa-solid","fa-cubes","text-base","hover:cursor-pointer"],["title","Languages",1,"fa-regular","fa-flag","text-base","hover:cursor-pointer"],[1,"fa-solid","fa-moon","text-base","hover:cursor-pointer"],[1,"fa-solid","fa-gear","text-base","hover:cursor-pointer"],[1,"contentHeight","overflow-y-hidden","z-10","pt-4"],[1,"flex","flex-row-reverse","py-2","px-4","border-t","border-black/10","dark:border-white/10","defaultText","bg-neutral-200","dark:bg-base-900"],["href","https://github.com/DenMic/ngx-translation-editor",1,"flex","gap-2","items-center"],[1,"hover:underline"],[1,"fa-brands","fa-github","text-xl"],[1,"fa-solid","fa-sun","text-base","hover:cursor-pointer"]],template:function(n,o){n&1&&(a(0,"div",0)(1,"nav",1)(2,"div",2),p(3,"img",3),a(4,"span"),v(5),l()(),a(6,"div",4)(7,"div",5),m("click",function(){return o.router.navigate(["project"])}),p(8,"i",6),l(),a(9,"div",5),m("click",function(){return o.router.navigate(["languages"])}),p(10,"i",7),l(),a(11,"div",5),m("click",function(){return o.switchDarkTheme()}),D(12,me,1,0,"i",8)(13,ce,1,0),l(),a(14,"div",5),m("click",function(){return o.router.navigate(["settings"])}),p(15,"i",9),l()()(),a(16,"div",10),p(17,"router-outlet"),l(),a(18,"footer",11)(19,"a",12)(20,"span",13),v(21,"2024 - Denis Micheletti"),l(),p(22,"i",14),l()()()),n&2&&(I("ngClass",L(3,de,o.appSettingsService.darkTheme())),f(5),j(o.appSettingsService.titlePage()),f(7),N(12,o.appSettingsService.darkTheme()?12:13))},dependencies:[G,z,h]});let r=e;return r})();$(ne,ie).catch(r=>console.error(r));