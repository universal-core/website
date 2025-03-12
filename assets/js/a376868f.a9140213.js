"use strict";(self.webpackChunkdocumentation=self.webpackChunkdocumentation||[]).push([[93787],{58860:(e,t,r)=>{r.d(t,{xA:()=>s,yg:()=>g});var a=r(37953);function n(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,a)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){n(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function d(e,t){if(null==e)return{};var r,a,n=function(e,t){if(null==e)return{};var r,a,n={},o=Object.keys(e);for(a=0;a<o.length;a++)r=o[a],t.indexOf(r)>=0||(n[r]=e[r]);return n}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)r=o[a],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(n[r]=e[r])}return n}var l=a.createContext({}),p=function(e){var t=a.useContext(l),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},s=function(e){var t=p(e.components);return a.createElement(l.Provider,{value:t},e.children)},c="mdxType",u={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},y=a.forwardRef((function(e,t){var r=e.components,n=e.mdxType,o=e.originalType,l=e.parentName,s=d(e,["components","mdxType","originalType","parentName"]),c=p(r),y=n,g=c["".concat(l,".").concat(y)]||c[y]||u[y]||o;return r?a.createElement(g,i(i({ref:t},s),{},{components:r})):a.createElement(g,i({ref:t},s))}));function g(e,t){var r=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var o=r.length,i=new Array(o);i[0]=y;var d={};for(var l in t)hasOwnProperty.call(t,l)&&(d[l]=t[l]);d.originalType=e,d[c]="string"==typeof e?e:n,i[1]=d;for(var p=2;p<o;p++)i[p]=r[p];return a.createElement.apply(null,i)}return a.createElement.apply(null,r)}y.displayName="MDXCreateElement"},82903:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>s,contentTitle:()=>l,default:()=>f,frontMatter:()=>d,metadata:()=>p,toc:()=>c});r(37953);var a=r(58860);function n(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){return t=null!=t?t:{},Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):function(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,a)}return r}(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))})),e}function i(e,t){if(null==e)return{};var r,a,n=function(e,t){if(null==e)return{};var r,a,n={},o=Object.keys(e);for(a=0;a<o.length;a++)r=o[a],t.indexOf(r)>=0||(n[r]=e[r]);return n}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)r=o[a],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(n[r]=e[r])}return n}const d={title:"useDataProvider",source:"packages/core/src/hooks/data/useDataProvider.tsx"},l=void 0,p={unversionedId:"data/hooks/use-data-provider/index",id:"data/hooks/use-data-provider/index",title:"useDataProvider",description:"useDataProvider is a React hook that returns the dataProvider which is passed to `` component.",source:"@site/docs/data/hooks/use-data-provider/index.md",sourceDirName:"data/hooks/use-data-provider",slug:"/data/hooks/use-data-provider/",permalink:"/docs/data/hooks/use-data-provider/",draft:!1,editUrl:"https://github.com/refinedev/refine/tree/master/documentation/docs/data/hooks/use-data-provider/index.md",tags:[],version:"current",lastUpdatedBy:"Matteo Roggia",lastUpdatedAt:1741812888,formattedLastUpdatedAt:"Mar 12, 2025",frontMatter:{title:"useDataProvider",source:"packages/core/src/hooks/data/useDataProvider.tsx"},sidebar:"mainSidebar",previous:{title:"useCustomMutation",permalink:"/docs/data/hooks/use-custom-mutation/"},next:{title:"useApiUrl",permalink:"/docs/data/hooks/use-api-url/"}},s={},c=[{value:"Usage",id:"usage",level:2},{value:"API Reference",id:"api-reference",level:2},{value:"Properties",id:"properties",level:3},{value:"Return value",id:"return-value",level:3}],u=(y="DocThumbsUpDownFeedbackWidget",function(e){return console.warn("Component "+y+" was not imported, exported, or provided by MDXProvider as global scope"),(0,a.yg)("div",e)});var y;const g={toc:c},m="wrapper";function f(e){var{components:t}=e,r=i(e,["components"]);return(0,a.yg)(m,o(function(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{},a=Object.keys(r);"function"==typeof Object.getOwnPropertySymbols&&(a=a.concat(Object.getOwnPropertySymbols(r).filter((function(e){return Object.getOwnPropertyDescriptor(r,e).enumerable})))),a.forEach((function(t){n(e,t,r[t])}))}return e}({},g,r),{components:t,mdxType:"MDXLayout"}),(0,a.yg)("p",null,(0,a.yg)("inlineCode",{parentName:"p"},"useDataProvider")," is a React hook that returns the ",(0,a.yg)("inlineCode",{parentName:"p"},"dataProvider")," which is passed to ",(0,a.yg)("a",{parentName:"p",href:"/docs/core/refine-component"},(0,a.yg)("inlineCode",{parentName:"a"},"<Refine>"))," component."),(0,a.yg)("p",null,"It is useful when you have multiple data providers and you want to access one of them."),(0,a.yg)("h2",{id:"usage"},"Usage"),(0,a.yg)(u,{id:"usage",mdxType:"DocThumbsUpDownFeedbackWidget"},(0,a.yg)("p",null,"Let's say we have two data providers:"),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-tsx"},'import { Refine } from "@refinedev/core";\nimport dataProvider from "@refinedev/simple-rest";\n\nconst App = () => (\n  <Refine\n    dataProvider={{\n      default: dataProvider("API_URL"),\n      second: dataProvider("SECOND_API_URL"),\n    }}\n  >\n    {/* ... */}\n  </Refine>\n);\n')),(0,a.yg)("p",null,"Now we can access the data providers with the ",(0,a.yg)("inlineCode",{parentName:"p"},"useDataProvider")," hook:"),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-tsx"},'import { useDataProvider } from "@refinedev/core";\n\nconst dataProvider = useDataProvider();\n\nconst defaultDataProvider = dataProvider(); // return default data provider\nconst secondDataProvider = dataProvider("second"); // return second data provider\n'))),(0,a.yg)("h2",{id:"api-reference"},"API Reference"),(0,a.yg)("h3",{id:"properties"},"Properties"),(0,a.yg)(u,{id:"properties",mdxType:"DocThumbsUpDownFeedbackWidget"},(0,a.yg)("table",null,(0,a.yg)("thead",{parentName:"table"},(0,a.yg)("tr",{parentName:"thead"},(0,a.yg)("th",{parentName:"tr",align:null},"Property"),(0,a.yg)("th",{parentName:"tr",align:null},"Description"),(0,a.yg)("th",{parentName:"tr",align:null},"Type"),(0,a.yg)("th",{parentName:"tr",align:null},"Default"))),(0,a.yg)("tbody",{parentName:"table"},(0,a.yg)("tr",{parentName:"tbody"},(0,a.yg)("td",{parentName:"tr",align:null},"dataProviderName"),(0,a.yg)("td",{parentName:"tr",align:null},"The name of the data provider you want to access"),(0,a.yg)("td",{parentName:"tr",align:null},(0,a.yg)("inlineCode",{parentName:"td"},"string")),(0,a.yg)("td",{parentName:"tr",align:null},(0,a.yg)("inlineCode",{parentName:"td"},"default")))))),(0,a.yg)("h3",{id:"return-value"},"Return value"),(0,a.yg)(u,{id:"return-value",mdxType:"DocThumbsUpDownFeedbackWidget"},(0,a.yg)("table",null,(0,a.yg)("thead",{parentName:"table"},(0,a.yg)("tr",{parentName:"thead"},(0,a.yg)("th",{parentName:"tr",align:null},"Description"),(0,a.yg)("th",{parentName:"tr",align:null},"Type"))),(0,a.yg)("tbody",{parentName:"table"},(0,a.yg)("tr",{parentName:"tbody"},(0,a.yg)("td",{parentName:"tr",align:null},"Data Provider"),(0,a.yg)("td",{parentName:"tr",align:null},(0,a.yg)("a",{parentName:"td",href:"/docs/data/data-provider"},(0,a.yg)("inlineCode",{parentName:"a"},"Data Provider"))))))))}f.isMDXComponent=!0}}]);