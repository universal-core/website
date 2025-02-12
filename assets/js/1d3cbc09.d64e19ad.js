"use strict";(self.webpackChunkdocumentation=self.webpackChunkdocumentation||[]).push([[69678],{58860:(e,t,a)=>{a.d(t,{xA:()=>p,yg:()=>f});var n=a(37953);function r(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function o(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function c(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?o(Object(a),!0).forEach((function(t){r(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):o(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function l(e,t){if(null==e)return{};var a,n,r=function(e,t){if(null==e)return{};var a,n,r={},o=Object.keys(e);for(n=0;n<o.length;n++)a=o[n],t.indexOf(a)>=0||(r[a]=e[a]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)a=o[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}var i=n.createContext({}),s=function(e){var t=n.useContext(i),a=t;return e&&(a="function"==typeof e?e(t):c(c({},t),e)),a},p=function(e){var t=s(e.components);return n.createElement(i.Provider,{value:t},e.children)},d="mdxType",b={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},u=n.forwardRef((function(e,t){var a=e.components,r=e.mdxType,o=e.originalType,i=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),d=s(a),u=r,f=d["".concat(i,".").concat(u)]||d[u]||b[u]||o;return a?n.createElement(f,c(c({ref:t},p),{},{components:a})):n.createElement(f,c({ref:t},p))}));function f(e,t){var a=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=a.length,c=new Array(o);c[0]=u;var l={};for(var i in t)hasOwnProperty.call(t,i)&&(l[i]=t[i]);l.originalType=e,l[d]="string"==typeof e?e:r,c[1]=l;for(var s=2;s<o;s++)c[s]=a[s];return n.createElement.apply(null,c)}return n.createElement.apply(null,a)}u.displayName="MDXCreateElement"},22184:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>p,contentTitle:()=>i,default:()=>y,frontMatter:()=>l,metadata:()=>s,toc:()=>d});a(37953);var n=a(58860);function r(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function o(e,t){return t=null!=t?t:{},Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):function(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}(Object(t)).forEach((function(a){Object.defineProperty(e,a,Object.getOwnPropertyDescriptor(t,a))})),e}function c(e,t){if(null==e)return{};var a,n,r=function(e,t){if(null==e)return{};var a,n,r={},o=Object.keys(e);for(n=0;n<o.length;n++)a=o[n],t.indexOf(a)>=0||(r[a]=e[a]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)a=o[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}const l={id:"advanced-tanstack-table",title:"Advanced Tables with Tanstack Table",sidebar_label:"Advanced Table","example-title":"Advanced TanStack Table","example-tags":["table","react-table","tanstack-table"]},i=void 0,s={unversionedId:"examples/table/tanstack-table/advanced-tanstack-table",id:"examples/table/tanstack-table/advanced-tanstack-table",title:"Advanced Tables with Tanstack Table",description:"It is an example of Advanced TanStack Table created with Refine's @refinedev/react-table adapter. In addition to the Basic TanStack Table example, deletion editing and filtering features are used together in your table. For more information, you can view the live example or review the source code.",source:"@site/docs/examples/table/tanstack-table/advanced.md",sourceDirName:"examples/table/tanstack-table",slug:"/examples/table/tanstack-table/advanced-tanstack-table",permalink:"/docs/examples/table/tanstack-table/advanced-tanstack-table",draft:!1,editUrl:"https://github.com/refinedev/refine/tree/master/documentation/docs/examples/table/tanstack-table/advanced.md",tags:[],version:"current",lastUpdatedBy:"Matteo Roggia",lastUpdatedAt:1739391271,formattedLastUpdatedAt:"Feb 12, 2025",frontMatter:{id:"advanced-tanstack-table",title:"Advanced Tables with Tanstack Table",sidebar_label:"Advanced Table","example-title":"Advanced TanStack Table","example-tags":["table","react-table","tanstack-table"]},sidebar:"mainSidebar",previous:{title:"Basic Table",permalink:"/docs/examples/table/tanstack-table/basic-tanstack-table"},next:{title:"Introduction",permalink:"/docs/packages/react-hook-form/introduction/"}},p={},d=[],b=(u="CodeSandboxExample",function(e){return console.warn("Component "+u+" was not imported, exported, or provided by MDXProvider as global scope"),(0,n.yg)("div",e)});var u;const f={toc:d},m="wrapper";function y(e){var{components:t}=e,a=c(e,["components"]);return(0,n.yg)(m,o(function(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{},n=Object.keys(a);"function"==typeof Object.getOwnPropertySymbols&&(n=n.concat(Object.getOwnPropertySymbols(a).filter((function(e){return Object.getOwnPropertyDescriptor(a,e).enumerable})))),n.forEach((function(t){r(e,t,a[t])}))}return e}({},f,a),{components:t,mdxType:"MDXLayout"}),(0,n.yg)("p",null,"It is an example of Advanced ",(0,n.yg)("a",{parentName:"p",href:"https://tanstack.com/table"},"TanStack Table")," created with Refine's ",(0,n.yg)("inlineCode",{parentName:"p"},"@refinedev/react-table")," adapter. In addition to the Basic TanStack Table example, deletion editing and filtering features are used together in your table. For more information, you can view the live example or review the source code."),(0,n.yg)(b,{path:"table-react-table-advanced",mdxType:"CodeSandboxExample"}))}y.isMDXComponent=!0}}]);