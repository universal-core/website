"use strict";(self.webpackChunkdocumentation=self.webpackChunkdocumentation||[]).push([[94316],{58860:(e,t,r)=>{r.d(t,{xA:()=>p,yg:()=>g});var n=r(37953);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function l(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var s=n.createContext({}),c=function(e){var t=n.useContext(s),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},p=function(e){var t=c(e.components);return n.createElement(s.Provider,{value:t},e.children)},u="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},m=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,o=e.originalType,s=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),u=c(r),m=a,g=u["".concat(s,".").concat(m)]||u[m]||d[m]||o;return r?n.createElement(g,i(i({ref:t},p),{},{components:r})):n.createElement(g,i({ref:t},p))}));function g(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=r.length,i=new Array(o);i[0]=m;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l[u]="string"==typeof e?e:a,i[1]=l;for(var c=2;c<o;c++)i[c]=r[c];return n.createElement.apply(null,i)}return n.createElement.apply(null,r)}m.displayName="MDXCreateElement"},66531:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>p,contentTitle:()=>s,default:()=>g,frontMatter:()=>l,metadata:()=>c,toc:()=>u});r(37953);var n=r(58860);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){return t=null!=t?t:{},Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):function(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))})),e}function i(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}const l={title:"Build a Progressive Web App (PWA) with Next.js",description:"We will walk you through the entire process of building a PWA using Next.JS and Refine framework, from start to finish!",slug:"next-js-pwa",authors:"david_omotayo",tags:["nextjs","tutorial","Refine"],image:"https://refine.ams3.cdn.digitaloceanspaces.com/blog/2022-09-11-next-refine-pwa/social-2.png",hide_table_of_contents:!1},s=void 0,c={permalink:"/blog/next-js-pwa",source:"@site/blog/2024-06-25-next-refine-pwa.md",title:"Build a Progressive Web App (PWA) with Next.js",description:"We will walk you through the entire process of building a PWA using Next.JS and Refine framework, from start to finish!",date:"2024-06-25T00:00:00.000Z",formattedDate:"June 25, 2024",tags:[{label:"nextjs",permalink:"/blog/tags/nextjs"},{label:"tutorial",permalink:"/blog/tags/tutorial"},{label:"Refine",permalink:"/blog/tags/refine"}],readingTime:23.09,hasTruncateMarker:!0,authors:[{name:"David Omotayo",title:"Frontend developer",url:"https://github.com/david4473",imageURL:"https://github.com/david4473.png",key:"david_omotayo"}],frontMatter:{title:"Build a Progressive Web App (PWA) with Next.js",description:"We will walk you through the entire process of building a PWA using Next.JS and Refine framework, from start to finish!",slug:"next-js-pwa",authors:"david_omotayo",tags:["nextjs","tutorial","Refine"],image:"https://refine.ams3.cdn.digitaloceanspaces.com/blog/2022-09-11-next-refine-pwa/social-2.png",hide_table_of_contents:!1},prevItem:{title:"How to use React Fragments?",permalink:"/blog/how-react-fragments-is-works"},nextItem:{title:"Creating a React search bar and content filtering components",permalink:"/blog/react-search-bar-and-filtering"},relatedPosts:[{title:"Adding PDF Renderer",description:"We are going to add PDF renderer to our PDF Invoice Generator app that we have been building last few days. This is also where we summarize our accomplishments and wrap up the series.",permalink:"/blog/refine-react-invoice-generator-5",formattedDate:"April 14, 2023",authors:[{name:"Abdullah Numan",title:"Fullstack Developer",url:"https://github.com/anewman15/",imageURL:"https://github.com/anewman15.png",key:"abdullah_numan"}],readingTime:8.625,date:"2023-04-14T00:00:00.000Z"},{title:"Setting Up the Client App",description:"We'll initialize our Pixels app using Refine and get familiar with the boilerplate code to be created with the create refine-app CLI tool.",permalink:"/blog/refine-pixels-2",formattedDate:"February 15, 2023",authors:[{name:"Abdullah Numan",title:"Fullstack Developer",url:"https://github.com/anewman15/",imageURL:"https://github.com/anewman15.png",key:"abdullah_numan"}],readingTime:15.07,date:"2023-02-15T00:00:00.000Z"},{title:"A Guide for Next.js with TypeScript",description:"We will explain the entire process of how to use Next.js in TypeScript",permalink:"/blog/next-js-with-typescript",formattedDate:"June 10, 2024",authors:[{name:"Michael Hungbo",title:"Software Developer",url:"https://github.com/Mich45",imageURL:"https://github.com/Mich45.png",key:"michael"}],readingTime:11.765,date:"2024-06-10T00:00:00.000Z"}],authorPosts:[{title:"Creating responsive tooltips in React with react-tooltip",description:"We'll explore how to create a custom tooltip component in a React application, as well as integrating the react-tooltip library.",permalink:"/blog/react-tooltip",formattedDate:"August 4, 2024",authors:[{name:"David Omotayo",title:"Frontend developer",url:"https://github.com/david4473",imageURL:"https://github.com/david4473.png",key:"david_omotayo"}],readingTime:16.24,date:"2024-08-04T00:00:00.000Z"},{title:"Creating Polished Content with React Markdown",description:"We will explore the process of integrating the markdown editor into a Refine application",permalink:"/blog/react-markdown",formattedDate:"August 16, 2024",authors:[{name:"David Omotayo",title:"Frontend developer",url:"https://github.com/david4473",imageURL:"https://github.com/david4473.png",key:"david_omotayo"}],readingTime:16.745,date:"2024-08-16T00:00:00.000Z"},{title:"Using React Hot Toast as a Notification Provider for CRUD apps",description:"We'll introduce create a custom notification provider using the react-hot-toast library.",permalink:"/blog/react-hot-toast",formattedDate:"August 20, 2024",authors:[{name:"David Omotayo",title:"Frontend developer",url:"https://github.com/david4473",imageURL:"https://github.com/david4473.png",key:"david_omotayo"}],readingTime:15.12,date:"2024-08-20T00:00:00.000Z"}]},p={authorsImageUrls:[void 0]},u=[{value:"Introduction",id:"introduction",level:2}],d={toc:u},m="wrapper";function g(e){var{components:t}=e,r=i(e,["components"]);return(0,n.yg)(m,o(function(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{},n=Object.keys(r);"function"==typeof Object.getOwnPropertySymbols&&(n=n.concat(Object.getOwnPropertySymbols(r).filter((function(e){return Object.getOwnPropertyDescriptor(r,e).enumerable})))),n.forEach((function(t){a(e,t,r[t])}))}return e}({},d,r),{components:t,mdxType:"MDXLayout"}),(0,n.yg)("p",null,(0,n.yg)("strong",{parentName:"p"},"This article was last updated on Jun 25, 2024, to add new SEO considerations, accessibility, and configuring Service Worker for Next PWA apps")),(0,n.yg)("h2",{id:"introduction"},"Introduction"),(0,n.yg)("p",null,"Building a complex site requires a one-size-fits-all framework that not only simplifies the complexity but also integrates seamlessly with other build tools on a whim."),(0,n.yg)("p",null,"Over the years, frameworks and libraries such as React have been the go-to packages for building complex and large applications, even in the face of their susceptible nature to tiresome caveats."),(0,n.yg)("p",null,"Fast forward to today, there are several frameworks and libraries in the picture, and they all promise to do a better job than their predecessors. However, many still don't meet the flexibility mark, except for a handful of them."),(0,n.yg)("p",null,"In this article, we'll look at what Refine is and demonstrate how to use it to build a ",(0,n.yg)("strong",{parentName:"p"},"Next.js PWA")," storefront application."))}g.isMDXComponent=!0}}]);