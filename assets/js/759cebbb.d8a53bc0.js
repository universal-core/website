"use strict";(self.webpackChunkdocumentation=self.webpackChunkdocumentation||[]).push([[12610],{58860:(e,t,n)=>{n.d(t,{xA:()=>d,yg:()=>m});var r=n(37953);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var l=r.createContext({}),p=function(e){var t=r.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},d=function(e){var t=p(e.components);return r.createElement(l.Provider,{value:t},e.children)},s="mdxType",u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},b=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,l=e.parentName,d=c(e,["components","mdxType","originalType","parentName"]),s=p(n),b=a,m=s["".concat(l,".").concat(b)]||s[b]||u[b]||o;return n?r.createElement(m,i(i({ref:t},d),{},{components:n})):r.createElement(m,i({ref:t},d))}));function m(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,i=new Array(o);i[0]=b;var c={};for(var l in t)hasOwnProperty.call(t,l)&&(c[l]=t[l]);c.originalType=e,c[s]="string"==typeof e?e:a,i[1]=c;for(var p=2;p<o;p++)i[p]=n[p];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}b.displayName="MDXCreateElement"},86370:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>d,contentTitle:()=>l,default:()=>y,frontMatter:()=>c,metadata:()=>p,toc:()=>s});n(37953);var r=n(58860);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){return t=null!=t?t:{},Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):function(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))})),e}function i(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}const c={id:"advanced-react-table",title:"Advanced Tables with Mantine",sidebar_label:"Advanced Table","example-title":"Advanced React Table with Mantine","example-tags":["table","mantine","react-table"]},l=void 0,p={unversionedId:"examples/table/mantine/advanced-react-table",id:"examples/table/mantine/advanced-react-table",title:"Advanced Tables with Mantine",description:"It is an example of Mantine Advanced React Table created with Refine's @refinedev/react-table adapter. In addition to the Mantine Basic React Table example, deletion editing and filtering features are used together in your table. For more information, you can view the live example or review the source code to see how it's used with Mantine.",source:"@site/docs/examples/table/mantine/advanced.md",sourceDirName:"examples/table/mantine",slug:"/examples/table/mantine/advanced-react-table",permalink:"/docs/examples/table/mantine/advanced-react-table",draft:!1,editUrl:"https://github.com/refinedev/refine/tree/master/documentation/docs/examples/table/mantine/advanced.md",tags:[],version:"current",lastUpdatedBy:"Luscha",lastUpdatedAt:1735844086,formattedLastUpdatedAt:"Jan 2, 2025",frontMatter:{id:"advanced-react-table",title:"Advanced Tables with Mantine",sidebar_label:"Advanced Table","example-title":"Advanced React Table with Mantine","example-tags":["table","mantine","react-table"]},sidebar:"mainSidebar",previous:{title:"Basic Table",permalink:"/docs/examples/table/mantine/basic"},next:{title:"useForm",permalink:"/docs/examples/form/mantine/useForm"}},d={},s=[],u=(b="CodeSandboxExample",function(e){return console.warn("Component "+b+" was not imported, exported, or provided by MDXProvider as global scope"),(0,r.yg)("div",e)});var b;const m={toc:s},f="wrapper";function y(e){var{components:t}=e,n=i(e,["components"]);return(0,r.yg)(f,o(function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{},r=Object.keys(n);"function"==typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(n).filter((function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable})))),r.forEach((function(t){a(e,t,n[t])}))}return e}({},m,n),{components:t,mdxType:"MDXLayout"}),(0,r.yg)("p",null,"It is an example of Mantine Advanced ",(0,r.yg)("a",{parentName:"p",href:"https://react-table.tanstack.com/"},"React Table")," created with Refine's ",(0,r.yg)("inlineCode",{parentName:"p"},"@refinedev/react-table")," adapter. In addition to the Mantine Basic React Table example, deletion editing and filtering features are used together in your table. For more information, you can view the live example or review the source code to see how it's used with Mantine."),(0,r.yg)(u,{path:"table-mantine-advanced",mdxType:"CodeSandboxExample"}))}y.isMDXComponent=!0}}]);