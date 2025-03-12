"use strict";(self.webpackChunkdocumentation=self.webpackChunkdocumentation||[]).push([[58864],{58860:(e,t,n)=>{n.d(t,{xA:()=>p,yg:()=>f});var r=n(37953);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var s=r.createContext({}),c=function(e){var t=r.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},p=function(e){var t=c(e.components);return r.createElement(s.Provider,{value:t},e.children)},b="mdxType",u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,s=e.parentName,p=i(e,["components","mdxType","originalType","parentName"]),b=c(n),d=a,f=b["".concat(s,".").concat(d)]||b[d]||u[d]||o;return n?r.createElement(f,l(l({ref:t},p),{},{components:n})):r.createElement(f,l({ref:t},p))}));function f(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,l=new Array(o);l[0]=d;var i={};for(var s in t)hasOwnProperty.call(t,s)&&(i[s]=t[s]);i.originalType=e,i[b]="string"==typeof e?e:a,l[1]=i;for(var c=2;c<o;c++)l[c]=n[c];return r.createElement.apply(null,l)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},6114:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>p,contentTitle:()=>s,default:()=>y,frontMatter:()=>i,metadata:()=>c,toc:()=>b});n(37953);var r=n(58860);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){return t=null!=t?t:{},Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):function(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))})),e}function l(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}const i={id:"useEditableTable",title:"useEditableTable","example-title":"Ant Design useEditableTable Hook","example-tags":["table","antd"]},s=void 0,c={unversionedId:"examples/table/antd/useEditableTable",id:"examples/table/antd/useEditableTable",title:"useEditableTable",description:"useEditableTable, includes all of the capabilities of useTable. It also enables you to edit your Table in addition to these advantages. It returns Ant Design Table and Form components props.",source:"@site/docs/examples/table/antd/useEditableTable.md",sourceDirName:"examples/table/antd",slug:"/examples/table/antd/useEditableTable",permalink:"/docs/examples/table/antd/useEditableTable",draft:!1,editUrl:"https://github.com/refinedev/refine/tree/master/documentation/docs/examples/table/antd/useEditableTable.md",tags:[],version:"current",lastUpdatedBy:"Matteo Roggia",lastUpdatedAt:1741814802,formattedLastUpdatedAt:"Mar 12, 2025",frontMatter:{id:"useEditableTable",title:"useEditableTable","example-title":"Ant Design useEditableTable Hook","example-tags":["table","antd"]},sidebar:"mainSidebar",previous:{title:"Table Filters",permalink:"/docs/examples/table/antd/tableFilter"},next:{title:"Advanced Table",permalink:"/docs/examples/table/antd/advancedTable"}},p={},b=[],u=(d="CodeSandboxExample",function(e){return console.warn("Component "+d+" was not imported, exported, or provided by MDXProvider as global scope"),(0,r.yg)("div",e)});var d;const f={toc:b},m="wrapper";function y(e){var{components:t}=e,n=l(e,["components"]);return(0,r.yg)(m,o(function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{},r=Object.keys(n);"function"==typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(n).filter((function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable})))),r.forEach((function(t){a(e,t,n[t])}))}return e}({},f,n),{components:t,mdxType:"MDXLayout"}),(0,r.yg)("p",null,(0,r.yg)("inlineCode",{parentName:"p"},"useEditableTable"),", includes all of the capabilities of ",(0,r.yg)("a",{parentName:"p",href:"/docs/ui-integrations/ant-design/hooks/use-table"},(0,r.yg)("inlineCode",{parentName:"a"},"useTable")),". It also enables you to edit your Table in addition to these advantages. It returns Ant Design ",(0,r.yg)("a",{parentName:"p",href:"https://ant.design/components/table/#API"},"Table")," and ",(0,r.yg)("a",{parentName:"p",href:"https://ant.design/components/form/#API"},"Form")," components props."),(0,r.yg)("p",null,(0,r.yg)("a",{parentName:"p",href:"/docs/ui-integrations/ant-design/hooks/use-editable-table"},"Refer to the Refine useEditableTable hook documentation for more information. \u2192")),(0,r.yg)(u,{path:"table-antd-use-editable-table",mdxType:"CodeSandboxExample"}))}y.isMDXComponent=!0}}]);