"use strict";(self.webpackChunkdocumentation=self.webpackChunkdocumentation||[]).push([[77689],{58860:(e,t,r)=>{r.d(t,{xA:()=>p,yg:()=>g});var o=r(37953);function n(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,o)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach((function(t){n(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function l(e,t){if(null==e)return{};var r,o,n=function(e,t){if(null==e)return{};var r,o,n={},a=Object.keys(e);for(o=0;o<a.length;o++)r=a[o],t.indexOf(r)>=0||(n[r]=e[r]);return n}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(o=0;o<a.length;o++)r=a[o],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(n[r]=e[r])}return n}var d=o.createContext({}),c=function(e){var t=o.useContext(d),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},p=function(e){var t=c(e.components);return o.createElement(d.Provider,{value:t},e.children)},u="mdxType",s={inlineCode:"code",wrapper:function(e){var t=e.children;return o.createElement(o.Fragment,{},t)}},f=o.forwardRef((function(e,t){var r=e.components,n=e.mdxType,a=e.originalType,d=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),u=c(r),f=n,g=u["".concat(d,".").concat(f)]||u[f]||s[f]||a;return r?o.createElement(g,i(i({ref:t},p),{},{components:r})):o.createElement(g,i({ref:t},p))}));function g(e,t){var r=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var a=r.length,i=new Array(a);i[0]=f;var l={};for(var d in t)hasOwnProperty.call(t,d)&&(l[d]=t[d]);l.originalType=e,l[u]="string"==typeof e?e:n,i[1]=l;for(var c=2;c<a;c++)i[c]=r[c];return o.createElement.apply(null,i)}return o.createElement.apply(null,r)}f.displayName="MDXCreateElement"},38733:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>p,contentTitle:()=>d,default:()=>y,frontMatter:()=>l,metadata:()=>c,toc:()=>u});r(37953);var o=r(58860);function n(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function a(e,t){return t=null!=t?t:{},Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):function(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,o)}return r}(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))})),e}function i(e,t){if(null==e)return{};var r,o,n=function(e,t){if(null==e)return{};var r,o,n={},a=Object.keys(e);for(o=0;o<a.length;o++)r=a[o],t.indexOf(r)>=0||(n[r]=e[r]);return n}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(o=0;o<a.length;o++)r=a[o],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(n[r]=e[r])}return n}const l={id:"audit-log-provider",title:"Audit Log Provider","example-tags":["audit-log-provider"],"example-title":"Audit Log with Headless"},d=void 0,c={unversionedId:"examples/audit-log/audit-log-provider",id:"examples/audit-log/audit-log-provider",title:"Audit Log Provider",description:"Refine allows you to track changes and who made them in your data by sending a new log event record whenever a new record is created, updated or deleted. This example demonstrates how to create an audit log provider.",source:"@site/docs/examples/audit-log/audit-log-provider.md",sourceDirName:"examples/audit-log",slug:"/examples/audit-log/audit-log-provider",permalink:"/docs/examples/audit-log/audit-log-provider",draft:!1,editUrl:"https://github.com/refinedev/refine/tree/master/documentation/docs/examples/audit-log/audit-log-provider.md",tags:[],version:"current",lastUpdatedBy:"Matteo Roggia",lastUpdatedAt:1739391271,formattedLastUpdatedAt:"Feb 12, 2025",frontMatter:{id:"audit-log-provider",title:"Audit Log Provider","example-tags":["audit-log-provider"],"example-title":"Audit Log with Headless"},sidebar:"mainSidebar",previous:{title:"Audit Log with Antd",permalink:"/docs/examples/audit-log/audit-log-antd"},next:{title:"<AutoSaveIndicator />",permalink:"/docs/core/components/auto-save-indicator/"}},p={},u=[],s=(f="CodeSandboxExample",function(e){return console.warn("Component "+f+" was not imported, exported, or provided by MDXProvider as global scope"),(0,o.yg)("div",e)});var f;const g={toc:u},m="wrapper";function y(e){var{components:t}=e,r=i(e,["components"]);return(0,o.yg)(m,a(function(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{},o=Object.keys(r);"function"==typeof Object.getOwnPropertySymbols&&(o=o.concat(Object.getOwnPropertySymbols(r).filter((function(e){return Object.getOwnPropertyDescriptor(r,e).enumerable})))),o.forEach((function(t){n(e,t,r[t])}))}return e}({},g,r),{components:t,mdxType:"MDXLayout"}),(0,o.yg)("p",null,"Refine allows you to track changes and who made them in your data by sending a new log event record whenever a new record is created, updated or deleted. This example demonstrates how to create an audit log provider."),(0,o.yg)("p",null,(0,o.yg)("a",{parentName:"p",href:"/docs/audit-logs/audit-log-provider"},"Refer to the Refine Audit Log Provider documentation for more information. \u2192")),(0,o.yg)(s,{path:"audit-log-provider",mdxType:"CodeSandboxExample"}))}y.isMDXComponent=!0}}]);