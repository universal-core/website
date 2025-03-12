"use strict";(self.webpackChunkdocumentation=self.webpackChunkdocumentation||[]).push([[98810],{58860:(e,t,r)=>{r.d(t,{xA:()=>l,yg:()=>y});var n=r(37953);function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach((function(t){o(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function c(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},a=Object.keys(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var s=n.createContext({}),p=function(e){var t=n.useContext(s),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},l=function(e){var t=p(e.components);return n.createElement(s.Provider,{value:t},e.children)},u="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},f=n.forwardRef((function(e,t){var r=e.components,o=e.mdxType,a=e.originalType,s=e.parentName,l=c(e,["components","mdxType","originalType","parentName"]),u=p(r),f=o,y=u["".concat(s,".").concat(f)]||u[f]||d[f]||a;return r?n.createElement(y,i(i({ref:t},l),{},{components:r})):n.createElement(y,i({ref:t},l))}));function y(e,t){var r=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=r.length,i=new Array(a);i[0]=f;var c={};for(var s in t)hasOwnProperty.call(t,s)&&(c[s]=t[s]);c.originalType=e,c[u]="string"==typeof e?e:o,i[1]=c;for(var p=2;p<a;p++)i[p]=r[p];return n.createElement.apply(null,i)}return n.createElement.apply(null,r)}f.displayName="MDXCreateElement"},60603:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>l,contentTitle:()=>s,default:()=>b,frontMatter:()=>c,metadata:()=>p,toc:()=>u});r(37953);var n=r(58860);function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function a(e,t){return t=null!=t?t:{},Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):function(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))})),e}function i(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},a=Object.keys(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}const c={title:"Testing"},s=void 0,p={unversionedId:"further-readings/testing",id:"further-readings/testing",title:"Testing",description:"Refine's components and hooks are made from small pieces of code. Each component or hook is designed to be testable and work independently of each other.",source:"@site/docs/further-readings/testing.md",sourceDirName:"further-readings",slug:"/further-readings/testing",permalink:"/docs/further-readings/testing",draft:!1,editUrl:"https://github.com/refinedev/refine/tree/master/documentation/docs/further-readings/testing.md",tags:[],version:"current",lastUpdatedBy:"Matteo Roggia",lastUpdatedAt:1741812574,formattedLastUpdatedAt:"Mar 12, 2025",frontMatter:{title:"Testing"},sidebar:"mainSidebar",previous:{title:"Migrating Router Provider",permalink:"/docs/migration-guide/router-provider"},next:{title:"Telemetry",permalink:"/docs/further-readings/telemetry"}},l={},u=[{value:"Example",id:"example",level:2}],d=e=>function(t){return console.warn("Component "+e+" was not imported, exported, or provided by MDXProvider as global scope"),(0,n.yg)("div",t)},f=d("DocThumbsUpDownFeedbackWidget"),y=d("CodeSandboxExample"),m={toc:u},g="wrapper";function b(e){var{components:t}=e,r=i(e,["components"]);return(0,n.yg)(g,a(function(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{},n=Object.keys(r);"function"==typeof Object.getOwnPropertySymbols&&(n=n.concat(Object.getOwnPropertySymbols(r).filter((function(e){return Object.getOwnPropertyDescriptor(r,e).enumerable})))),n.forEach((function(t){o(e,t,r[t])}))}return e}({},m,r),{components:t,mdxType:"MDXLayout"}),(0,n.yg)("p",null,(0,n.yg)("strong",{parentName:"p"},"Refine"),"'s components and hooks are made from small pieces of code. Each component or hook is designed to be testable and work independently of each other."),(0,n.yg)("p",null,"So, you don't need unit testing, because ",(0,n.yg)("strong",{parentName:"p"},"Refine")," is already tested by its maintainers. However, you can write unit tests in your own code (helper, definitions, etc.)."),(0,n.yg)("p",null,"We strongly recommend that you write end-to-end tests of your application. ",(0,n.yg)("strong",{parentName:"p"},"Refine")," used the ",(0,n.yg)("a",{parentName:"p",href:"https://www.cypress.io/"},"cypress")," framework as an example. You are free to write tests with any framework you want."),(0,n.yg)("h2",{id:"example"},"Example"),(0,n.yg)(f,{id:"example",mdxType:"DocThumbsUpDownFeedbackWidget"},(0,n.yg)(y,{path:"with-cypress",mdxType:"CodeSandboxExample"})))}b.isMDXComponent=!0}}]);