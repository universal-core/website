"use strict";(self.webpackChunkdocumentation=self.webpackChunkdocumentation||[]).push([[3122],{58860:(e,n,t)=>{t.d(n,{xA:()=>u,yg:()=>h});var r=t(37953);function o(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function a(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function i(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?a(Object(t),!0).forEach((function(n){o(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):a(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function c(e,n){if(null==e)return{};var t,r,o=function(e,n){if(null==e)return{};var t,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)t=a[r],n.indexOf(t)>=0||(o[t]=e[t]);return o}(e,n);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)t=a[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(o[t]=e[t])}return o}var p=r.createContext({}),s=function(e){var n=r.useContext(p),t=n;return e&&(t="function"==typeof e?e(n):i(i({},n),e)),t},u=function(e){var n=s(e.components);return r.createElement(p.Provider,{value:n},e.children)},d="mdxType",m={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},l=r.forwardRef((function(e,n){var t=e.components,o=e.mdxType,a=e.originalType,p=e.parentName,u=c(e,["components","mdxType","originalType","parentName"]),d=s(t),l=o,h=d["".concat(p,".").concat(l)]||d[l]||m[l]||a;return t?r.createElement(h,i(i({ref:n},u),{},{components:t})):r.createElement(h,i({ref:n},u))}));function h(e,n){var t=arguments,o=n&&n.mdxType;if("string"==typeof e||o){var a=t.length,i=new Array(a);i[0]=l;var c={};for(var p in n)hasOwnProperty.call(n,p)&&(c[p]=n[p]);c.originalType=e,c[d]="string"==typeof e?e:o,i[1]=c;for(var s=2;s<a;s++)i[s]=t[s];return r.createElement.apply(null,i)}return r.createElement.apply(null,t)}l.displayName="MDXCreateElement"},17413:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>u,contentTitle:()=>p,default:()=>g,frontMatter:()=>c,metadata:()=>s,toc:()=>d});t(37953);var r=t(58860);function o(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function a(e,n){return n=null!=n?n:{},Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):function(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})),e}function i(e,n){if(null==e)return{};var t,r,o=function(e,n){if(null==e)return{};var t,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)t=a[r],n.indexOf(t)>=0||(o[t]=e[t]);return o}(e,n);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)t=a[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(o[t]=e[t])}return o}const c={title:"Breadcrumb",swizzle:!0},p=void 0,s={unversionedId:"ui-integrations/mantine/components/breadcrumb/index",id:"ui-integrations/mantine/components/breadcrumb/index",title:"Breadcrumb",description:"A breadcrumb displays the current location within a hierarchy. It allows going back to states higher up in the hierarchy. ` component built with Mantine Breadcrumb components using the useBreadcrumb` hook.",source:"@site/docs/ui-integrations/mantine/components/breadcrumb/index.md",sourceDirName:"ui-integrations/mantine/components/breadcrumb",slug:"/ui-integrations/mantine/components/breadcrumb/",permalink:"/docs/ui-integrations/mantine/components/breadcrumb/",draft:!1,editUrl:"https://github.com/refinedev/refine/tree/master/documentation/docs/ui-integrations/mantine/components/breadcrumb/index.md",tags:[],version:"current",lastUpdatedBy:"Luscha",lastUpdatedAt:1735844086,formattedLastUpdatedAt:"Jan 2, 2025",frontMatter:{title:"Breadcrumb",swizzle:!0},sidebar:"mainSidebar",previous:{title:"<AuthPage />",permalink:"/docs/ui-integrations/mantine/components/auth-page/"},next:{title:"<AutoSaveIndicator />",permalink:"/docs/ui-integrations/mantine/components/auto-save-indicator/"}},u={},d=[{value:"Properties",id:"properties",level:2},{value:"breadcrumbProps",id:"breadcrumbprops",level:3},{value:"showHome",id:"showhome",level:3},{value:"meta",id:"meta",level:3},{value:"hideIcons",id:"hideicons",level:3},{value:"API Reference",id:"api-reference",level:2},{value:"Properties",id:"properties-1",level:3}],m=e=>function(n){return console.warn("Component "+e+" was not imported, exported, or provided by MDXProvider as global scope"),(0,r.yg)("div",n)},l=m("DocThumbsUpDownFeedbackWidget"),h=m("PropsTable"),y={toc:d},b="wrapper";function g(e){var{components:n}=e,t=i(e,["components"]);return(0,r.yg)(b,a(function(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{},r=Object.keys(t);"function"==typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(t).filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})))),r.forEach((function(n){o(e,n,t[n])}))}return e}({},y,t),{components:n,mdxType:"MDXLayout"}),(0,r.yg)("p",null,"A breadcrumb displays the current location within a hierarchy. It allows going back to states higher up in the hierarchy. ",(0,r.yg)("inlineCode",{parentName:"p"},"<Breadcrumb>")," component built with Mantine ",(0,r.yg)("a",{parentName:"p",href:"https://mantine.dev/core/breadcrumbs/"},"Breadcrumb")," components using the ",(0,r.yg)("a",{parentName:"p",href:"/docs/core/hooks/utilities/use-breadcrumb"},(0,r.yg)("inlineCode",{parentName:"a"},"useBreadcrumb"))," hook."),(0,r.yg)("admonition",{title:"Good to know",type:"simple"},(0,r.yg)("ul",{parentName:"admonition"},(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("p",{parentName:"li"},"You can swizzle this component to customize it with the ",(0,r.yg)("a",{parentName:"p",href:"/docs/packages/list-of-packages"},(0,r.yg)("strong",{parentName:"a"},"Refine CLI")))),(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("p",{parentName:"li"},"In earlier versions of Refine, ",(0,r.yg)("inlineCode",{parentName:"p"},"<Refine>")," component had accepted ",(0,r.yg)("inlineCode",{parentName:"p"},"DashboardPage")," which could be used to add an index page to your app. With the changes in ",(0,r.yg)("inlineCode",{parentName:"p"},"routerProvider")," API of Refine, ",(0,r.yg)("inlineCode",{parentName:"p"},"DashboardPage")," is deprecated. You can now define an index route yourself manually by your router package.")),(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("p",{parentName:"li"},"In earlier versions, the home icon in the ",(0,r.yg)("inlineCode",{parentName:"p"},"Breadcrumb")," was created by the ",(0,r.yg)("inlineCode",{parentName:"p"},"DashboardPage"),", now it is rendered if you define a an action route as ",(0,r.yg)("inlineCode",{parentName:"p"},"/")," in any one of your resources. It will be rendered with the home icon regardless of the current route. You can also hide the home icon by setting ",(0,r.yg)("inlineCode",{parentName:"p"},"showHome")," to ",(0,r.yg)("inlineCode",{parentName:"p"},"false"),".")))),(0,r.yg)("h2",{id:"properties"},"Properties"),(0,r.yg)("h3",{id:"breadcrumbprops"},"breadcrumbProps"),(0,r.yg)(l,{id:"breadcrumbprops",mdxType:"DocThumbsUpDownFeedbackWidget"},(0,r.yg)("p",null,"The ",(0,r.yg)("inlineCode",{parentName:"p"},"<Breadcrumb />")," component uses the Mantine ",(0,r.yg)("a",{parentName:"p",href:"https://mantine.dev/core/breadcrumbs/"},"Breadcrumb")," component so it can be configured with the ",(0,r.yg)("inlineCode",{parentName:"p"},"breadcrumbProps")," property."),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-tsx"},'import { Show, Breadcrumb } from "@refinedev/mantine";\n\nconst PostShow: React.FC = () => {\n  return (\n    <Show\n      // highlight-next-line\n      breadcrumb={<Breadcrumb breadcrumbProps={{ separator: "-" }} />}\n    >\n      <p>Rest of your page here</p>\n    </Show>\n  );\n};\n'))),(0,r.yg)("h3",{id:"showhome"},"showHome"),(0,r.yg)(l,{id:"showhome",mdxType:"DocThumbsUpDownFeedbackWidget"},(0,r.yg)("p",null,"If you have a page with route ",(0,r.yg)("inlineCode",{parentName:"p"},"/"),", it will be used as the root of the hierarchy and shown in the ",(0,r.yg)("inlineCode",{parentName:"p"},"Breadcrumb")," with a home icon. To hide the root item, set ",(0,r.yg)("inlineCode",{parentName:"p"},"showHome")," to ",(0,r.yg)("inlineCode",{parentName:"p"},"false.")),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-tsx"},'import { List, Breadcrumb } from "@refinedev/mantine";\n\nexport const PostList: React.FC = () => {\n  return (\n    <List\n      // highlight-next-line\n      breadcrumb={<Breadcrumb showHome={true} />}\n    >\n      ...\n    </List>\n  );\n};\n'))),(0,r.yg)("h3",{id:"meta"},"meta"),(0,r.yg)(l,{id:"meta",mdxType:"DocThumbsUpDownFeedbackWidget"},(0,r.yg)("p",null,"If your routes has additional parameters in their paths, you can pass the ",(0,r.yg)("inlineCode",{parentName:"p"},"meta")," property to the ",(0,r.yg)("inlineCode",{parentName:"p"},"<Breadcrumb>")," component to use them while creating the paths and filling the parameters in the paths. By default, existing URL parameters are used. You can use ",(0,r.yg)("inlineCode",{parentName:"p"},"meta")," to override them or add new ones."),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-tsx"},'import { List, Breadcrumb } from "@refinedev/mantine";\n\nexport const PostList: React.FC = () => {\n  return (\n    <List\n      // highlight-next-line\n      breadcrumb={<Breadcrumb meta={{ authorId: "123" }} />}\n    >\n      ...\n    </List>\n  );\n};\n'))),(0,r.yg)("h3",{id:"hideicons"},"hideIcons"),(0,r.yg)(l,{id:"hideicons",mdxType:"DocThumbsUpDownFeedbackWidget"},(0,r.yg)("p",null,"If you don't want to show the resource icons on the breadcrumb, you can set ",(0,r.yg)("inlineCode",{parentName:"p"},"hideIcons")," to ",(0,r.yg)("inlineCode",{parentName:"p"},"true"),"."),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-tsx"},'import { Show, Breadcrumb } from "@refinedev/mantine";\n\nconst PostShow: React.FC = () => {\n  return (\n    <Show\n      // highlight-next-line\n      breadcrumb={<Breadcrumb hideIcons />}\n    >\n      <p>Rest of your page here</p>\n    </Show>\n  );\n};\n'))),(0,r.yg)("h2",{id:"api-reference"},"API Reference"),(0,r.yg)("h3",{id:"properties-1"},"Properties"),(0,r.yg)(l,{id:"properties-1",mdxType:"DocThumbsUpDownFeedbackWidget"},(0,r.yg)(h,{module:"@refinedev/mantine/Breadcrumb",mdxType:"PropsTable"})))}g.isMDXComponent=!0}}]);