import{a as pe}from"./chunk-5TNV7STC.js";import{g as $}from"./chunk-B4UFVJKA.js";import{a as X,b as se}from"./chunk-PXAGP5W6.js";import{b as Y,d as Z,e as ee,h as te,i as ie,j as re,k as ne,l as oe,m as ae,n as le}from"./chunk-YP4A4WQX.js";import"./chunk-BYXBJQAS.js";import{a as z}from"./chunk-TYSA4IXJ.js";import{a as q,b as W,d as E,g as K}from"./chunk-NFYRXBCV.js";import{c as Q,d as U,e as H}from"./chunk-NAXA2R4W.js";import{$a as S,Ab as b,Hb as V,Ib as A,Jb as C,Kb as j,Lb as T,Ma as R,Mb as g,Oa as i,Qb as M,Rb as D,Sb as J,Tb as l,Ub as p,Vb as G,_a as I,ea as x,gb as N,ha as O,lb as f,nb as B,pb as L,qb as w,rb as y,sa as m,sb as k,ta as u,tb as n,ub as a,vb as v,xb as F,zb as _}from"./chunk-VRK5N2JK.js";var ce=["edtAddPrj"],me=["edtRemovePrj"],ue=r=>({prjName:r});function fe(r,s){if(r&1&&v(0,"span",30),r&2){let d=s.$implicit;B("fi fi-"+d.flagName)}}function ve(r,s){if(r&1){let d=F();n(0,"div",23),_("dblclick",function(){let e=m(d).$implicit,t=b();return u(t.goToTranslation(e.id))}),n(1,"div")(2,"div",24),_("click",function(){let e=m(d).$implicit,t=b();return u(t.goToTranslation(e.id))}),j(3),a(),n(4,"div",25),j(5),a()(),n(6,"div",26),y(7,fe,1,2,"span",27,w),a(),n(9,"div",28),_("click",function(){let e=m(d).$implicit,t=b();return u(t.showDeletePop(e))}),v(10,"i",29),n(11,"span"),j(12),l(13,"translate"),a()()()}if(r&2){let d=s.$implicit;i(3),g(" ",d.name," "),i(2),g(" ",d.description," "),i(2),k(d.languages),i(5),T(p(13,3,"PROJECT.REMOVE"))}}function _e(r,s){r&1&&(n(0,"div",8)(1,"span",31),j(2),l(3,"translate"),a()()),r&2&&(i(2),T(p(3,1,"INFO.NO_PROJECT")))}function je(r,s){if(r&1&&(v(0,"p",20),l(1,"translate")),r&2){let d=b();f("innerHTML",G(1,1,"PROJECT.QUESTIONS.DELETE_PROJECT",J(4,ue,d.selectedPrj.name)),R)}}var Be=(()=>{let s=class s{constructor(){this.edtAddPrj=S("edtAddPrj"),this.edtRemovePrj=S("edtRemovePrj"),this.appSettingsService=x(q),this.storageService=x(W),this.fb=x(ne),this.router=x($),this.selectedPrj=void 0,this.projectList=I([]),this.newProjectForm=this.fb.group({name:[void 0,[Y.required,pe()]],description:[void 0],languages:[[]]}),this.titleSubsciber=this.appSettingsService.setTitleFromTranslation("PROJECT.TITLE_PAGE").pipe(z()).subscribe()}ngOnInit(){this.projectList.set(this.storageService.retrieveObj(E)??[])}goToTranslation(o){this.router.navigate([`translations/${this.appSettingsService.layoutPage()}`,o])}addProject(){if(this.newProjectForm.valid){let o=this.newProjectForm.value,e=1;this.projectList().length>0&&(e=(Math.max(...this.projectList().map(c=>c.id))??0)+1);let t={id:e,name:o.name&&o.name(),description:o.description&&o.description()};t.languages=this.storageService.retrieveObj(K)??[],this.projectList.update(c=>(c.push(t),c)),this.storageService.store(E,this.projectList()),this.edtAddPrj()?.toggle()}}showDeletePop(o){this.selectedPrj=o,this.edtRemovePrj()?.showPop()}removePrj(){this.projectList.update(o=>o.filter(e=>e.id!=this.selectedPrj.id)),this.storageService.store(E,this.projectList()),this.selectedPrj=void 0,this.edtRemovePrj()?.closePop()}};s.\u0275fac=function(e){return new(e||s)},s.\u0275cmp=O({type:s,selectors:[["app-projects"]],viewQuery:function(e,t){e&1&&(V(t.edtAddPrj,ce,5),V(t.edtRemovePrj,me,5)),e&2&&A(2)},standalone:!0,features:[M([Q]),D],decls:41,vars:31,consts:[["edtAddPrj",""],["edtName",""],["edtRemovePrj",""],[1,"flex","flex-col","justify-center","items-center","defaultText"],[1,"flex","flex-row-reverse","w-2/3","pb-3","mb-3","borderBottom","z-20"],[1,"buttonPrimary",3,"click"],[1,"fa-solid","fa-plus","text-base"],[1,"flex","justify-between","items-center","w-2/3","p-4","my-2","borderBottom","hover:rounded-md","hover:border-transparent","hover:cursor-pointer","hover:bg-black/10","dark:hover:bg-white/10"],[1,"p-12","text-center","text-lg"],[1,"p-8","defaultText"],[1,"mb-8","font-semibold","text-2xl"],[3,"submit","formGroup"],[1,"flex","flex-col","gap-3","mb-6","w-96"],["formControlName","name",3,"label"],["inputType","area","formControlName","description",3,"label"],[1,"flex","gap-4","justify-end"],["level","secondary",3,"onClick","label"],[3,"label","disabled"],[1,"flex","gap-4","items-center","mb-8","font-semibold","text-2xl"],[1,"fa-solid","fa-circle-exclamation","text-red-600","dark:text-red-500"],[3,"innerHTML"],[1,"flex","gap-4","justify-end","mt-8"],[3,"onClick","label"],[1,"flex","justify-between","items-center","w-2/3","p-4","my-2","borderBottom","hover:rounded-md","hover:border-transparent","hover:cursor-pointer","hover:bg-black/10","dark:hover:bg-white/10",3,"dblclick"],[1,"text-2xl","font-medium","text-left","pb-2","hover:text-green-700","hover:underline",3,"click"],[1,"text-base","text-left"],[1,"flex","gap-2","justify-center"],[1,"text-base",3,"class"],[1,"buttonSecondary",3,"click"],[1,"fa-solid","fa-trash"],[1,"text-base"],[1,"font-semibold","text-neutral-600","dark:","dark:text-neutral-500"]],template:function(e,t){if(e&1){let c=F();n(0,"div",3)(1,"div",4)(2,"div",5),_("click",function(){m(c);let P=C(11),de=C(19);return P.toggle(),u(de.focusOnInput())}),v(3,"i",6),n(4,"span"),j(5),l(6,"translate"),a()()(),y(7,ve,14,5,"div",7,w,!1,_e,4,3,"div",8),a(),n(10,"edt-popup",null,0)(12,"div",9)(13,"div",10),j(14),l(15,"translate"),a(),n(16,"form",11),_("submit",function(){return m(c),u(t.addProject())}),n(17,"div",12),v(18,"edt-input",13,1),l(20,"translate"),v(21,"edt-input",14),l(22,"translate"),a(),n(23,"div",15)(24,"edt-button",16),l(25,"translate"),_("onClick",function(){m(c);let P=C(11);return u(P.toggle())}),a(),v(26,"edt-button",17),l(27,"translate"),a()()()(),n(28,"edt-popup",null,2)(30,"div",9)(31,"div",18),v(32,"i",19),j(33),l(34,"translate"),a(),N(35,je,2,6,"p",20),n(36,"div",21)(37,"edt-button",16),l(38,"translate"),_("onClick",function(){m(c);let P=C(29);return u(P.toggle())}),a(),n(39,"edt-button",22),l(40,"translate"),_("onClick",function(){return m(c),u(t.removePrj())}),a()()()()}e&2&&(i(5),T(p(6,13,"PROJECT.NEW")),i(2),k(t.projectList()),i(7),g(" ",p(15,15,"PROJECT.ADD")," "),i(2),f("formGroup",t.newProjectForm),i(2),f("label",p(20,17,"NAME")),i(3),f("label",p(22,19,"DESCRIPTION")),i(3),f("label",p(25,21,"CLOSE")),i(2),f("label",p(27,23,"ADD"))("disabled",!t.newProjectForm.valid),i(7),g(" ",p(34,25,"PROJECT.REMOVE")," "),i(2),L(35,t.selectedPrj?35:-1),i(2),f("label",p(38,27,"CANCEL")),i(2),f("label",p(40,29,"CONTINUE")))},dependencies:[oe,te,Z,ee,ae,ie,re,X,se,le,H,U],styles:[".tempCol[_ngcontent-%COMP%]{grid-template-columns:43px 200px 300px auto 43px;grid-template-rows:34px}"]});let r=s;return r})();export{Be as ProjectsComponent};