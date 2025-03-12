"use strict";(self.webpackChunkdocumentation=self.webpackChunkdocumentation||[]).push([[44650],{58860:(e,r,t)=>{t.d(r,{xA:()=>l,yg:()=>m});var n=t(37953);function o(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function a(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);r&&(n=n.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,n)}return t}function i(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?a(Object(t),!0).forEach((function(r){o(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):a(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}function p(e,r){if(null==e)return{};var t,n,o=function(e,r){if(null==e)return{};var t,n,o={},a=Object.keys(e);for(n=0;n<a.length;n++)t=a[n],r.indexOf(t)>=0||(o[t]=e[t]);return o}(e,r);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)t=a[n],r.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(o[t]=e[t])}return o}var u=n.createContext({}),s=function(e){var r=n.useContext(u),t=r;return e&&(t="function"==typeof e?e(r):i(i({},r),e)),t},l=function(e){var r=s(e.components);return n.createElement(u.Provider,{value:r},e.children)},d="mdxType",c={inlineCode:"code",wrapper:function(e){var r=e.children;return n.createElement(n.Fragment,{},r)}},h=n.forwardRef((function(e,r){var t=e.components,o=e.mdxType,a=e.originalType,u=e.parentName,l=p(e,["components","mdxType","originalType","parentName"]),d=s(t),h=o,m=d["".concat(u,".").concat(h)]||d[h]||c[h]||a;return t?n.createElement(m,i(i({ref:r},l),{},{components:t})):n.createElement(m,i({ref:r},l))}));function m(e,r){var t=arguments,o=r&&r.mdxType;if("string"==typeof e||o){var a=t.length,i=new Array(a);i[0]=h;var p={};for(var u in r)hasOwnProperty.call(r,u)&&(p[u]=r[u]);p.originalType=e,p[d]="string"==typeof e?e:o,i[1]=p;for(var s=2;s<a;s++)i[s]=t[s];return n.createElement.apply(null,i)}return n.createElement.apply(null,t)}h.displayName="MDXCreateElement"},80745:(e,r,t)=>{t.d(r,{Ay:()=>s});t(37953);var n=t(58860);function o(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function a(e,r){return r=null!=r?r:{},Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):function(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);r&&(n=n.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,n)}return t}(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))})),e}function i(e,r){if(null==e)return{};var t,n,o=function(e,r){if(null==e)return{};var t,n,o={},a=Object.keys(e);for(n=0;n<a.length;n++)t=a[n],r.indexOf(t)>=0||(o[t]=e[t]);return o}(e,r);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)t=a[n],r.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(o[t]=e[t])}return o}const p={toc:[]},u="wrapper";function s(e){var{components:r}=e,t=i(e,["components"]);return(0,n.yg)(u,a(function(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{},n=Object.keys(t);"function"==typeof Object.getOwnPropertySymbols&&(n=n.concat(Object.getOwnPropertySymbols(t).filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})))),n.forEach((function(r){o(e,r,t[r])}))}return e}({},p,t),{components:r,mdxType:"MDXLayout"}),(0,n.yg)("p",null,"You can use the following auth provider examples as a starting point for your own auth provider or you can use them as it is. Check the links below to see the details of each example."),(0,n.yg)("ul",null,(0,n.yg)("li",{parentName:"ul"},(0,n.yg)("a",{parentName:"li",href:"/docs/examples/authentication/headless/"},"Basic")," - A basic auth provider example."),(0,n.yg)("li",{parentName:"ul"},(0,n.yg)("a",{parentName:"li",href:"/docs/enterprise-edition/okta"},"Okta")," - Okta, the enterprise-grade identity management service."),(0,n.yg)("li",{parentName:"ul"},(0,n.yg)("a",{parentName:"li",href:"/docs/examples/auth-provider/keycloak"},"Keycloak")," - An auth provider example with Keycloak."),(0,n.yg)("li",{parentName:"ul"},(0,n.yg)("a",{parentName:"li",href:"/docs/examples/auth-provider/auth0"},"Auth0")," - An auth provider example with Auth0."),(0,n.yg)("li",{parentName:"ul"},(0,n.yg)("a",{parentName:"li",href:"/docs/examples/auth-provider/google-auth"},"Google Auth")," - An auth provider example with Google Auth."),(0,n.yg)("li",{parentName:"ul"},(0,n.yg)("a",{parentName:"li",href:"/docs/examples/auth-provider/otpLogin"},"OTP Login")," - An auth provider example with OTP Login."),(0,n.yg)("li",{parentName:"ul"},(0,n.yg)("a",{parentName:"li",href:"/docs/examples/data-provider/appwrite"},"Appwrite")," - An auth provider example with Appwrite."),(0,n.yg)("li",{parentName:"ul"},(0,n.yg)("a",{parentName:"li",href:"/docs/examples/data-provider/supabase"},"Supabase")," - An auth provider example with Supabase."),(0,n.yg)("li",{parentName:"ul"},(0,n.yg)("a",{parentName:"li",href:"/docs/examples/data-provider/strapi-v4"},"Strapi")," - An auth provider example with Strapi."),(0,n.yg)("li",{parentName:"ul"},(0,n.yg)("a",{parentName:"li",href:"/docs/examples/next-js/"},"Basic with Nextjs")," - A basic auth provider example with Nextjs."),(0,n.yg)("li",{parentName:"ul"},(0,n.yg)("a",{parentName:"li",href:"/docs/examples/remix/remix-headless"},"Basic with Remix")," - A basic auth provider example with Remix."),(0,n.yg)("li",{parentName:"ul"},(0,n.yg)("a",{parentName:"li",href:"/docs/examples/auth-provider/kinde"},"Kinde")," - An auth provider example with Kinde.")))}s.isMDXComponent=!0},90388:(e,r,t)=>{t.r(r),t.d(r,{assets:()=>d,contentTitle:()=>s,default:()=>b,frontMatter:()=>u,metadata:()=>l,toc:()=>c});t(37953);var n=t(58860),o=t(80745);function a(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function i(e,r){return r=null!=r?r:{},Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):function(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);r&&(n=n.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,n)}return t}(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))})),e}function p(e,r){if(null==e)return{};var t,n,o=function(e,r){if(null==e)return{};var t,n,o={},a=Object.keys(e);for(n=0;n<a.length;n++)t=a[n],r.indexOf(t)>=0||(o[t]=e[t]);return o}(e,r);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)t=a[n],r.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(o[t]=e[t])}return o}const u={id:"index",title:"1. Auth Provider",tutorial:{order:0,prev:!1,next:"3.xx.xx/tutorial/understanding-authprovider/create-authprovider"}},s=void 0,l={unversionedId:"tutorial/understanding-authprovider/index",id:"version-3.xx.xx/tutorial/understanding-authprovider/index",title:"1. Auth Provider",description:"What is auth provider?",source:"@site/versioned_docs/version-3.xx.xx/tutorial/5-understanding-authprovider/0-intro.md",sourceDirName:"tutorial/5-understanding-authprovider",slug:"/tutorial/understanding-authprovider/index",permalink:"/docs/3.xx.xx/tutorial/understanding-authprovider/index",draft:!1,editUrl:"https://github.com/refinedev/refine/tree/master/documentation/versioned_docs/version-3.xx.xx/tutorial/5-understanding-authprovider/0-intro.md",tags:[],version:"3.xx.xx",lastUpdatedBy:"Matteo Roggia",lastUpdatedAt:1741814323,formattedLastUpdatedAt:"Mar 12, 2025",sidebarPosition:0,frontMatter:{id:"index",title:"1. Auth Provider",tutorial:{order:0,prev:!1,next:"3.xx.xx/tutorial/understanding-authprovider/create-authprovider"}}},d={},c=[{value:"What is auth provider?",id:"what-is-auth-provider",level:2},{value:"Using Auth Providers in refine",id:"using-auth-providers-in-refine",level:2},{value:"How are auth provider methods used in the app?",id:"how-are-auth-provider-methods-used-in-the-app",level:2},{value:"Auth Provider Examples",id:"auth-provider-examples",level:2}],h=e=>function(r){return console.warn("Component "+e+" was not imported, exported, or provided by MDXProvider as global scope"),(0,n.yg)("div",r)},m=h("DocThumbsUpDownFeedbackWidget"),y=h("Checklist"),g=h("ChecklistItem"),f={toc:c},v="wrapper";function b(e){var{components:r}=e,t=p(e,["components"]);return(0,n.yg)(v,i(function(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{},n=Object.keys(t);"function"==typeof Object.getOwnPropertySymbols&&(n=n.concat(Object.getOwnPropertySymbols(t).filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})))),n.forEach((function(r){a(e,r,t[r])}))}return e}({},f,t),{components:r,mdxType:"MDXLayout"}),(0,n.yg)("h2",{id:"what-is-auth-provider"},"What is auth provider?"),(0,n.yg)(m,{id:"what-is-auth-provider",mdxType:"DocThumbsUpDownFeedbackWidget"},(0,n.yg)("p",null,"Auth provider is a object which contains methods to handle authentication and authorization in your app. It provides a way to authenticate users and authorize them to access resources. ",(0,n.yg)("strong",{parentName:"p"},"refine")," consumes these methods via auth hooks."),(0,n.yg)("p",null,"Auth provider's methods expect to return a Promise. So, you can use async methods to create auth provider. Therefore, to create auth provider from scratch, you can use any third-party authentication service like Auth0, Okta, etc. or your own custom methods. We'll see how to create auth provider in the next sections."),(0,n.yg)("p",null,"Moreover, ",(0,n.yg)("strong",{parentName:"p"},"refine")," offers built-in examples for auth providers. You can use them as a starting point for your own auth provider. You can check ",(0,n.yg)("a",{parentName:"p",href:"#auth-provider-examples"},"Auth Provider Examples")," to see the list of examples."),(0,n.yg)("p",null,"The typical auth provider has following methods:"),(0,n.yg)("pre",null,(0,n.yg)("code",{parentName:"pre",className:"language-ts"},'import { AuthProvider } from "@pankod/refine-core";\n\nconst authProvider: AuthProvider = {\n    login: (params) => Promise,\n    logout: (params) => Promise,\n    checkAuth: (params?) => Promise,\n    checkError: (error) => Promise,\n    ...\n}\n')),(0,n.yg)("blockquote",null,(0,n.yg)("p",{parentName:"blockquote"},"Above methods are required. You can find other optional methods in next section.")),(0,n.yg)("p",null,"These methods are used to perform auth operations by ",(0,n.yg)("strong",{parentName:"p"},"refine")," hooks. You can check ",(0,n.yg)("a",{parentName:"p",href:"/docs/3.xx.xx/api-reference/core/providers/auth-provider/"},"Auth Provider")," documentation to see the details of each method.")),(0,n.yg)("h2",{id:"using-auth-providers-in-refine"},"Using Auth Providers in refine"),(0,n.yg)(m,{id:"using-auth-providers-in-refine",mdxType:"DocThumbsUpDownFeedbackWidget"},(0,n.yg)("p",null,"When you create a new auth provider, you need to pass it to the ",(0,n.yg)("inlineCode",{parentName:"p"},"<Refine/>")," component as a prop. So, ",(0,n.yg)("strong",{parentName:"p"},"refine")," can use it to handle authentication."),(0,n.yg)("pre",null,(0,n.yg)("code",{parentName:"pre",className:"language-tsx"},'...\nimport { AuthProvider } from "@pankod/refine-core";\n\n// It is a mock auth provider.\nconst authProvider: AuthProvider = {\n    login: (params) => Promise,\n    logout: (params) => Promise,\n    checkAuth: (params?) => Promise,\n    checkError: (error) => Promise,\n    ...\n}\n\n<Refine\n    ...\n    authProvider={authProvider}\n/>;\n')),(0,n.yg)("p",null,(0,n.yg)("a",{parentName:"p",href:"/docs/3.xx.xx/api-reference/core/components/refine-config/"},"Refer to the ",(0,n.yg)("inlineCode",{parentName:"a"},"<Refine/>")," documentation for more information ","\u2192"))),(0,n.yg)("h2",{id:"how-are-auth-provider-methods-used-in-the-app"},"How are auth provider methods used in the app?"),(0,n.yg)(m,{id:"how-are-auth-provider-methods-used-in-the-app",mdxType:"DocThumbsUpDownFeedbackWidget"},(0,n.yg)("p",null,"Each method of auth provider is corresponding to a hook in ",(0,n.yg)("strong",{parentName:"p"},"refine"),". So, you can use these hooks to perform auth operations in your app. You can check ",(0,n.yg)("a",{parentName:"p",href:"/docs/3.xx.xx/api-reference/core/hooks/auth/useAuthenticated/"},"Auth Hooks")," documentation to see the details of each hook."),(0,n.yg)("p",null,"For example, you can use ",(0,n.yg)("inlineCode",{parentName:"p"},"useLogin")," hook to perform login operation like below:"),(0,n.yg)("pre",null,(0,n.yg)("code",{parentName:"pre",className:"language-tsx"},'import { useLogin } from "@pankod/refine-core";\n\ntype LoginVariables = {\n  email: string;\n  password: string;\n};\n\nconst { mutate } = useLogin<LoginVariables>();\n\nconst handleLogin = async (values) => {\n  await mutate(values);\n};\n')),(0,n.yg)("p",null,"As you can see, ",(0,n.yg)("inlineCode",{parentName:"p"},"useLogin")," hook returns a ",(0,n.yg)("inlineCode",{parentName:"p"},"mutate")," function. When you call this function, it calls the ",(0,n.yg)("inlineCode",{parentName:"p"},"login")," method of auth provider like below:"),(0,n.yg)("pre",null,(0,n.yg)("code",{parentName:"pre",className:"language-ts"},'const authProvider: AuthProvider = {\n    login: ({ email, password }) => {\n        const response = await axios.post("/api/login", { email, password });\n\n        if (response.status === 200) {\n            return Promise.resolve(response.data);\n        }\n\n        return Promise.reject();\n    },\n    ...\n};\n')),(0,n.yg)("p",null,"If the ",(0,n.yg)("inlineCode",{parentName:"p"},"login")," method will return a resolved Promise, the ",(0,n.yg)("inlineCode",{parentName:"p"},"mutate")," function will return a resolved Promise. Otherwise, it will return a rejected Promise. So, you can use the returned Promise to handle the login operation."),(0,n.yg)("admonition",{type:"info"},(0,n.yg)("p",{parentName:"admonition"},"We made an example to show the relationship between auth provider methods and auth hooks. We used ",(0,n.yg)("inlineCode",{parentName:"p"},"useLogin")," hook in the example, but all auth hooks work the same way."))),(0,n.yg)("h2",{id:"auth-provider-examples"},"Auth Provider Examples"),(0,n.yg)(m,{id:"auth-provider-examples",mdxType:"DocThumbsUpDownFeedbackWidget"},(0,n.yg)(o.Ay,{mdxType:"AuthProviderExamplesLinks"}),(0,n.yg)("br",null),(0,n.yg)("br",null),(0,n.yg)(y,{mdxType:"Checklist"},(0,n.yg)(g,{id:"auth-provider-intro",mdxType:"ChecklistItem"},"I understood what is auth provider and how it works."),(0,n.yg)(g,{id:"auth-provider-intro-2",mdxType:"ChecklistItem"},"I learned that refine offers built-in auth provider examples."))))}b.isMDXComponent=!0}}]);