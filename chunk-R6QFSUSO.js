import{a as j,b as P,c as R}from"./chunk-RDBOAJBO.js";import"./chunk-IX6G3U3V.js";import"./chunk-OHTYLYFK.js";import"./chunk-PXAGP5W6.js";import{l as D,m as U}from"./chunk-YP4A4WQX.js";import"./chunk-4KV7BN26.js";import"./chunk-WZLUTRBS.js";import"./chunk-BYXBJQAS.js";import{a as V}from"./chunk-TYSA4IXJ.js";import{a as B,b as O,g as x}from"./chunk-NFYRXBCV.js";import{d as k,e as F}from"./chunk-NAXA2R4W.js";import{Ab as y,Jb as I,Kb as o,Lb as c,Mb as E,Oa as t,Rb as M,Tb as l,Ub as s,_a as b,ea as L,ha as C,lb as h,nb as T,qb as w,rb as N,sa as g,sb as G,ta as u,tb as e,ub as r,vb as f,xb as S,zb as v}from"./chunk-VRK5N2JK.js";function z(i,n){if(i&1){let d=S();e(0,"div",5)(1,"div",8)(2,"div",9),o(3),l(4,"translate"),r(),e(5,"div",10),f(6,"span",10),r()(),e(7,"div",10),o(8),l(9,"translate"),e(10,"b"),o(11),r()(),e(12,"div",11)(13,"div",12),v("click",function(){let a=g(d).$implicit,m=y();return u(m.removeLang(a))}),f(14,"i",13),e(15,"span"),o(16),l(17,"translate"),r()()()()}if(i&2){let d=n.$implicit;t(3),E(" ",s(4,6,"FLAG."+d.description)," "),t(3),T("fi fi-"+d.flagName),t(2),E(" ",s(9,8,"EXTENTION_NAME")," "),t(3),c(d.fileName),t(5),c(s(17,10,"LANGUAGE.REMOVE"))}}function X(i,n){i&1&&(e(0,"div",6)(1,"span",14),o(2),l(3,"translate"),r()()),i&2&&(t(2),c(s(3,1,"INFO.NO_LANGUAGE")))}var ge=(()=>{let n=class n{constructor(){this.languageList=b([]),this.appSettingsService=L(B),this.storageService=L(O),this.titleSubsciber=this.appSettingsService.setTitleFromTranslation("LANGUAGE.TITLE_PAGE").pipe(V()).subscribe()}ngOnInit(){this.languageList.set(this.storageService.retrieveObj(x)??[])}closeAddLang(p){p&&this.languageList.set(this.storageService.retrieveObj(x)??[])}removeLang(p){this.languageList.update(a=>a.filter(m=>m.flagName!=p.flagName)),this.storageService.store(x,this.languageList())}};n.\u0275fac=function(a){return new(a||n)},n.\u0275cmp=C({type:n,selectors:[["app-languages"]],standalone:!0,features:[M],decls:13,vars:7,consts:[["edtAddLang",""],[1,"flex","flex-col","justify-center","items-center","defaultText"],[1,"flex","flex-row-reverse","w-2/3","pb-3","mb-3","borderBottom","z-20"],[1,"buttonPrimary",3,"click"],[1,"fa-solid","fa-plus","text-base",3,"title"],[1,"grid","grid-cols-3","items-center","w-2/3","p-4","my-2","borderBottom","hover:rounded-md","hover:border-transparent","hover:bg-black/10","dark:hover:bg-white/10"],[1,"p-12","text-center","text-lg"],[3,"onClose"],[1,"flex","gap-4","items-center"],[1,"text-xl","font-medium","text-left"],[1,"text-base"],[1,"justify-self-end"],[1,"buttonSecondary","w-48",3,"click"],[1,"fa-solid","fa-trash","iconButton"],[1,"font-semibold","text-neutral-600","dark:","dark:text-neutral-500"]],template:function(a,m){if(a&1){let A=S();e(0,"div",1)(1,"div",2)(2,"div",3),v("click",function(){g(A);let _=I(12);return u(_.toggle())}),f(3,"i",4),l(4,"translate"),e(5,"span"),o(6),l(7,"translate"),r()()(),N(8,z,18,12,"div",5,w,!1,X,4,3,"div",6),r(),e(11,"add-language",7,0),v("onClose",function(_){return g(A),u(m.closeAddLang(_))}),r()}a&2&&(t(3),h("title",s(4,3,"LANGUAGE.ADD")),t(3),c(s(7,5,"LANGUAGE.ADD")),t(2),G(m.languageList()))},dependencies:[R,j,P,D,U,F,k],styles:[".tempCol[_ngcontent-%COMP%]{grid-template-columns:43px auto auto 43px;grid-template-rows:34px}"]});let i=n;return i})();export{ge as LanguagesComponent};
