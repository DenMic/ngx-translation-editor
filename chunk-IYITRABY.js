import{a as h}from"./chunk-OHTYLYFK.js";import{a as m,b as n}from"./chunk-TYSA4IXJ.js";import{a as c}from"./chunk-NFYRXBCV.js";import{_ as p,_a as o,a as s,ea as a}from"./chunk-VRK5N2JK.js";function d(i){let t=JSON.stringify(i);return JSON.parse(t)}var v=(()=>{let t=class t{constructor(){this.appSettingsService=a(c),this.projectService=a(h),this.project=o(void 0),this.selectedLang=o(void 0),this.idParentTranslation=void 0,this.dropDownParam=o(void 0),this.$dropDownParam=n(this.dropDownParam),this.popParam=o(void 0),this.$popParam=n(this.popParam)}loadProjectFromStore(e){this.prjFromStore=d(this.selectProject(e)),this.prjFromStore&&!this.titleSubscriber&&(this.titleSubscriber=this.appSettingsService.setTitleFromTranslation("TRANSLATION.TITLE_PAGE",{prjName:this.prjFromStore.name}).pipe(m()).subscribe())}setDropDownParam(e){this.dropDownParam.set(e)}setPopParam(e){this.popParam.set(e)}selectProject(e){let r=this.projectService.getProjectById(e);return r&&(this.project.set(s({},r)),this.selectedLang.set(s({},r.languages[0]))),r}};t.\u0275fac=function(r){return new(r||t)},t.\u0275prov=p({token:t,factory:t.\u0275fac});let i=t;return i})();export{d as a,v as b};
