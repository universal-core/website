"use strict";(self.webpackChunkdocumentation=self.webpackChunkdocumentation||[]).push([[69194],{58860:(e,t,n)=>{n.d(t,{xA:()=>l,yg:()=>h});var o=n(37953);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function p(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},a=Object.keys(e);for(o=0;o<a.length;o++)n=a[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(o=0;o<a.length;o++)n=a[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var s=o.createContext({}),g=function(e){var t=o.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},l=function(e){var t=g(e.components);return o.createElement(s.Provider,{value:t},e.children)},d="mdxType",m={inlineCode:"code",wrapper:function(e){var t=e.children;return o.createElement(o.Fragment,{},t)}},u=o.forwardRef((function(e,t){var n=e.components,r=e.mdxType,a=e.originalType,s=e.parentName,l=p(e,["components","mdxType","originalType","parentName"]),d=g(n),u=r,h=d["".concat(s,".").concat(u)]||d[u]||m[u]||a;return n?o.createElement(h,i(i({ref:t},l),{},{components:n})):o.createElement(h,i({ref:t},l))}));function h(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var a=n.length,i=new Array(a);i[0]=u;var p={};for(var s in t)hasOwnProperty.call(t,s)&&(p[s]=t[s]);p.originalType=e,p[d]="string"==typeof e?e:r,i[1]=p;for(var g=2;g<a;g++)i[g]=n[g];return o.createElement.apply(null,i)}return o.createElement.apply(null,n)}u.displayName="MDXCreateElement"},54314:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>s,default:()=>P,frontMatter:()=>p,metadata:()=>g,toc:()=>d});n(37953);var o=n(58860);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){return t=null!=t?t:{},Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):function(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))})),e}function i(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},a=Object.keys(e);for(o=0;o<a.length;o++)n=a[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(o=0;o<a.length;o++)n=a[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}const p={id:"auth-pages",title:"3. Auth Pages",tutorial:{prev:"3.xx.xx/tutorial/understanding-authprovider/create-authprovider",next:!1}},s=void 0,g={unversionedId:"tutorial/understanding-authprovider/mantine/auth-pages",id:"version-3.xx.xx/tutorial/understanding-authprovider/mantine/auth-pages",title:"3. Auth Pages",description:"In this section, we will learn how to create auth pages such as login, signup, forgot password and reset password using the `` component.",source:"@site/versioned_docs/version-3.xx.xx/tutorial/5-understanding-authprovider/mantine/2-auth-pages.md",sourceDirName:"tutorial/5-understanding-authprovider/mantine",slug:"/tutorial/understanding-authprovider/mantine/auth-pages",permalink:"/docs/3.xx.xx/tutorial/understanding-authprovider/mantine/auth-pages",draft:!1,editUrl:"https://github.com/refinedev/refine/tree/master/documentation/versioned_docs/version-3.xx.xx/tutorial/5-understanding-authprovider/mantine/2-auth-pages.md",tags:[],version:"3.xx.xx",lastUpdatedBy:"Matteo Roggia",lastUpdatedAt:1740315756,formattedLastUpdatedAt:"Feb 23, 2025",sidebarPosition:2,frontMatter:{id:"auth-pages",title:"3. Auth Pages",tutorial:{prev:"3.xx.xx/tutorial/understanding-authprovider/create-authprovider",next:!1}}},l={},d=[{value:"Login Page",id:"login-page",level:2},{value:"Register Page",id:"register-page",level:2},{value:"Forgot Password Page",id:"forgot-password-page",level:2},{value:"Update Password Page",id:"update-password-page",level:2},{value:"Customizing Auth Pages",id:"customizing-auth-pages",level:2}],m=e=>function(t){return console.warn("Component "+e+" was not imported, exported, or provided by MDXProvider as global scope"),(0,o.yg)("div",t)},u=m("DocThumbsUpDownFeedbackWidget"),h=m("Checklist"),c=m("ChecklistItem"),y={toc:d},f="wrapper";function P(e){var{components:t}=e,n=i(e,["components"]);return(0,o.yg)(f,a(function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{},o=Object.keys(n);"function"==typeof Object.getOwnPropertySymbols&&(o=o.concat(Object.getOwnPropertySymbols(n).filter((function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable})))),o.forEach((function(t){r(e,t,n[t])}))}return e}({},y,n),{components:t,mdxType:"MDXLayout"}),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-tsx",metastring:"live shared",live:!0,shared:!0},'window.__refineAuthStatus = false;\n\nconst authProvider = {\n  login: (params) => {\n    window.__refineAuthStatus = true;\n    console.log("login: ", params);\n    return Promise.resolve();\n  },\n  register: (params) => {\n    console.log("register: ", params);\n    return Promise.resolve();\n  },\n  forgotPassword: () => {\n    console.log("forgotPassword: ", params);\n    return Promise.resolve();\n  },\n  updatePassword: () => {\n    console.log("updatePassword: ", params);\n    return Promise.resolve();\n  },\n  logout: () => {\n    window.__refineAuthStatus = false;\n  },\n  checkAuth: () =>\n    window.__refineAuthStatus ? Promise.resolve() : Promise.reject(),\n  checkError: () => Promise.resolve(),\n  getPermissions: () => Promise.resolve(),\n  getUserIdentity: () => Promise.resolve(),\n};\n\nimport { Refine } from "@pankod/refine-core";\nimport routerProvider from "@pankod/refine-react-router-v6";\nimport dataProvider from "@pankod/refine-simple-rest";\nimport {\n  MantineProvider,\n  Global,\n  NotificationsProvider,\n  useNotificationProvider,\n  LightTheme,\n  Layout,\n  ReadyPage,\n  ErrorComponent,\n  AuthPage,\n} from "@pankod/refine-mantine";\nimport { MantineInferencer } from "@pankod/refine-inferencer/mantine";\n\nconst App = () => {\n  return (\n    <MantineProvider theme={LightTheme} withNormalizeCSS withGlobalStyles>\n      <Global styles={{ body: { WebkitFontSmoothing: "auto" } }} />\n      <NotificationsProvider position="top-right">\n        <Refine\n          dataProvider={dataProvider("https://api.fake-rest.refine.dev")}\n          authProvider={authProvider}\n          routerProvider={{\n            ...routerProvider,\n            routes: [\n              { path: "/login", element: <AuthPage /> },\n              {\n                path: "/register",\n                element: <AuthPage type="register" />,\n              },\n              {\n                path: "/forgot-password",\n                element: <AuthPage type="forgotPassword" />,\n              },\n              {\n                path: "/update-password",\n                element: <AuthPage type="updatePassword" />,\n              },\n            ],\n          }}\n          notificationProvider={useNotificationProvider}\n          ReadyPage={ReadyPage}\n          catchAll={<ErrorComponent />}\n          Layout={Layout}\n          resources={[\n            {\n              name: "blog_posts",\n              list: MantineInferencer,\n              show: MantineInferencer,\n              create: MantineInferencer,\n              edit: MantineInferencer,\n            },\n          ]}\n        />\n      </NotificationsProvider>\n    </MantineProvider>\n  );\n};\n')),(0,o.yg)("p",null,"In this section, we will learn how to create auth pages such as login, signup, forgot password and reset password using the ",(0,o.yg)("inlineCode",{parentName:"p"},"<AuthPage/>")," component."),(0,o.yg)("p",null,(0,o.yg)("a",{parentName:"p",href:"/docs/3.xx.xx/api-reference/mantine/components/mantine-auth-page/"},"Refer to the ",(0,o.yg)("inlineCode",{parentName:"a"},"<AuthPage/>")," documentation for more information ","\u2192")),(0,o.yg)("p",null,(0,o.yg)("inlineCode",{parentName:"p"},"<AuthPage/>")," component provides auth pages for login, signup, forgot password and reset password. It also provides a way to customize theses pages with various props. So, ",(0,o.yg)("inlineCode",{parentName:"p"},"<AuthPage/>")," is a quick starting point for creating auth pages."),(0,o.yg)("p",null,"Before using ",(0,o.yg)("inlineCode",{parentName:"p"},"<AuthPage/>")," component, we need to create an auth provider because ",(0,o.yg)("inlineCode",{parentName:"p"},"<AuthPage/>")," component uses the auth provider to perform auth operations. However, we have already created an auth provider in the previous section. So, we will use the same auth provider for this section."),(0,o.yg)("p",null,"Let's create the auth pages step by step."),(0,o.yg)("h2",{id:"login-page"},"Login Page"),(0,o.yg)(u,{id:"login-page",mdxType:"DocThumbsUpDownFeedbackWidget"},(0,o.yg)("p",null,"Login page is used to authenticate users. It provides a basic form to enter email, password and remember. After submitting the form, it sends the email, password and remember to the auth provider's ",(0,o.yg)("inlineCode",{parentName:"p"},"login")," method via ",(0,o.yg)("inlineCode",{parentName:"p"},"useLogin")," hook."),(0,o.yg)("ol",null,(0,o.yg)("li",{parentName:"ol"},(0,o.yg)("p",{parentName:"li"},"Open ",(0,o.yg)("inlineCode",{parentName:"p"},"src/App.tsx")," file and import the ",(0,o.yg)("inlineCode",{parentName:"p"},"<AuthPage/>")," component."),(0,o.yg)("pre",{parentName:"li"},(0,o.yg)("code",{parentName:"pre",className:"language-tsx"},'import { AuthPage } from "@pankod/refine-mantine";\n'))),(0,o.yg)("li",{parentName:"ol"},(0,o.yg)("p",{parentName:"li"},"Add the ",(0,o.yg)("inlineCode",{parentName:"p"},"<AuthPage/>")," component to the ",(0,o.yg)("inlineCode",{parentName:"p"},"routes")," prop of the ",(0,o.yg)("inlineCode",{parentName:"p"},"routerProvider")," prop of the ",(0,o.yg)("inlineCode",{parentName:"p"},"<Refine/>")," component."),(0,o.yg)("pre",{parentName:"li"},(0,o.yg)("code",{parentName:"pre",className:"language-tsx"},'import { Refine } from "@pankod/refine-core";\nimport routerProvider from "@pankod/refine-react-router-v6";\nimport dataProvider from "@pankod/refine-simple-rest";\nimport {\n  MantineProvider,\n  Global,\n  NotificationsProvider,\n  useNotificationProvider,\n  LightTheme,\n  Layout,\n  ReadyPage,\n  ErrorComponent,\n  //highlight-next-line\n  AuthPage,\n} from "@pankod/refine-mantine";\n\nimport { BlogPostList } from "pages/blog-posts/list";\nimport { BlogPostEdit } from "pages/blog-posts/edit";\nimport { BlogPostShow } from "pages/blog-posts/show";\nimport { BlogPostCreate } from "pages/blog-posts/create";\n\nimport { authProvider } from "./authProvider";\n\nconst App = () => {\n  return (\n    <MantineProvider theme={LightTheme} withNormalizeCSS withGlobalStyles>\n      <Global styles={{ body: { WebkitFontSmoothing: "auto" } }} />\n      <NotificationsProvider position="top-right">\n        <Refine\n          authProvider={authProvider}\n          //highlight-start\n          routerProvider={{\n            ...routerProvider,\n            routes: [{ path: "/login", element: <AuthPage /> }],\n          }}\n          //highlight-end\n          dataProvider={dataProvider("https://api.fake-rest.refine.dev")}\n          notificationProvider={useNotificationProvider}\n          ReadyPage={ReadyPage}\n          catchAll={<ErrorComponent />}\n          Layout={Layout}\n          resources={[\n            {\n              name: "blog_posts",\n              list: BlogPostList,\n              edit: BlogPostEdit,\n              show: BlogPostShow,\n              create: BlogPostCreate,\n            },\n          ]}\n        />\n      </NotificationsProvider>\n    </MantineProvider>\n  );\n};\n')),(0,o.yg)("p",{parentName:"li"},"By default, ",(0,o.yg)("inlineCode",{parentName:"p"},"<AuthPage>")," component renders the login page. So, we don't need to pass any props to the ",(0,o.yg)("inlineCode",{parentName:"p"},"<AuthPage/>")," component."),(0,o.yg)("admonition",{parentName:"li",type:"note"},(0,o.yg)("p",{parentName:"admonition"},"When the user submits the login form, it passes the email, password and remember to the auth provider's ",(0,o.yg)("inlineCode",{parentName:"p"},"login")," method like below:"),(0,o.yg)("pre",{parentName:"admonition"},(0,o.yg)("code",{parentName:"pre",className:"language-ts"},"const authProvider = {\n    login: ({ email, password, remember }) => {\n        ...\n    },\n    ...\n};\n")))),(0,o.yg)("li",{parentName:"ol"},(0,o.yg)("p",{parentName:"li"},"Run the app and navigate to the ",(0,o.yg)("inlineCode",{parentName:"p"},"/login")," page."))),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-tsx",metastring:"live previewOnly previewHeight=600px url=http://localhost:3000/login",live:!0,previewOnly:!0,previewHeight:"600px",url:"http://localhost:3000/login"},'setInitialRoutes(["/login"]);\n\nrender(<App />);\n')),(0,o.yg)("br",null),(0,o.yg)("admonition",{type:"tip"},(0,o.yg)("p",{parentName:"admonition"},"You can also use the ",(0,o.yg)("inlineCode",{parentName:"p"},"LoginPage")," prop of the ",(0,o.yg)("inlineCode",{parentName:"p"},"<Refine/>")," component to render the login page."),(0,o.yg)("pre",{parentName:"admonition"},(0,o.yg)("code",{parentName:"pre",className:"language-tsx"},"<Refine\n    authProvider={authProvider}\n    routerProvider={routerProvider}\n    ...\n    //highlight-start\n    LoginPage={AuthPage}\n    //highlight-end\n/>\n")),(0,o.yg)("p",{parentName:"admonition"},(0,o.yg)("a",{parentName:"p",href:"/docs/3.xx.xx/api-reference/core/components/refine-config/#loginpage"},"Refer to the ",(0,o.yg)("inlineCode",{parentName:"a"},"<Refine/>")," documentation for more information ","\u2192")))),(0,o.yg)("h2",{id:"register-page"},"Register Page"),(0,o.yg)(u,{id:"register-page",mdxType:"DocThumbsUpDownFeedbackWidget"},(0,o.yg)("p",null,"Register page is used to register new users. It provides a basic form to enter email and password. After submitting the form, it sends the email and password to the auth provider's ",(0,o.yg)("inlineCode",{parentName:"p"},"register")," method via ",(0,o.yg)("inlineCode",{parentName:"p"},"useRegister")," hook."),(0,o.yg)("ol",null,(0,o.yg)("li",{parentName:"ol"},(0,o.yg)("p",{parentName:"li"},"Open ",(0,o.yg)("inlineCode",{parentName:"p"},"src/App.tsx")," file and add the ",(0,o.yg)("inlineCode",{parentName:"p"},"<AuthPage/>")," component to the ",(0,o.yg)("inlineCode",{parentName:"p"},"routes")," prop of the ",(0,o.yg)("inlineCode",{parentName:"p"},"routerProvider")," prop of the ",(0,o.yg)("inlineCode",{parentName:"p"},"<Refine/>")," component."),(0,o.yg)("pre",{parentName:"li"},(0,o.yg)("code",{parentName:"pre",className:"language-tsx"},'import { Refine } from "@pankod/refine-core";\nimport routerProvider from "@pankod/refine-react-router-v6";\nimport dataProvider from "@pankod/refine-simple-rest";\nimport {\n  MantineProvider,\n  Global,\n  NotificationsProvider,\n  useNotificationProvider,\n  LightTheme,\n  Layout,\n  ReadyPage,\n  ErrorComponent,\n  //highlight-next-line\n  AuthPage,\n} from "@pankod/refine-mantine";\n\nimport { BlogPostList } from "pages/blog-posts/list";\nimport { BlogPostEdit } from "pages/blog-posts/edit";\nimport { BlogPostShow } from "pages/blog-posts/show";\nimport { BlogPostCreate } from "pages/blog-posts/create";\n\nimport { authProvider } from "./authProvider";\n\nconst App = () => {\n  return (\n    <MantineProvider theme={LightTheme} withNormalizeCSS withGlobalStyles>\n      <Global styles={{ body: { WebkitFontSmoothing: "auto" } }} />\n      <NotificationsProvider position="top-right">\n        <Refine\n          authProvider={authProvider}\n          routerProvider={{\n            ...routerProvider,\n            routes: [\n              { path: "/login", element: <AuthPage /> },\n              //highlight-start\n              {\n                path: "/register",\n                element: <AuthPage type="register" />,\n              },\n              //highlight-end\n            ],\n          }}\n          dataProvider={dataProvider("https://api.fake-rest.refine.dev")}\n          notificationProvider={useNotificationProvider}\n          ReadyPage={ReadyPage}\n          catchAll={<ErrorComponent />}\n          Layout={Layout}\n          resources={[\n            {\n              name: "blog_posts",\n              list: BlogPostList,\n              edit: BlogPostEdit,\n              show: BlogPostShow,\n              create: BlogPostCreate,\n            },\n          ]}\n        />\n      </NotificationsProvider>\n    </MantineProvider>\n  );\n};\n')),(0,o.yg)("p",{parentName:"li"},"We need to pass the ",(0,o.yg)("inlineCode",{parentName:"p"},"type")," prop to the ",(0,o.yg)("inlineCode",{parentName:"p"},"<AuthPage/>")," component to render the register page."),(0,o.yg)("admonition",{parentName:"li",type:"note"},(0,o.yg)("p",{parentName:"admonition"},"When the user submits the register form, it passes the email and password to the auth provider's ",(0,o.yg)("inlineCode",{parentName:"p"},"register")," method like below:"),(0,o.yg)("pre",{parentName:"admonition"},(0,o.yg)("code",{parentName:"pre",className:"language-ts"},"const authProvider = {\n    register: ({ email, password }) => {\n        ...\n    },\n    ...\n};\n")))),(0,o.yg)("li",{parentName:"ol"},(0,o.yg)("p",{parentName:"li"},"Run the app and navigate to the ",(0,o.yg)("inlineCode",{parentName:"p"},"/register")," page."))),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-tsx",metastring:"live previewOnly previewHeight=600px url=http://localhost:3000/register",live:!0,previewOnly:!0,previewHeight:"600px",url:"http://localhost:3000/register"},'setInitialRoutes(["/register"]);\n\nrender(<App />);\n'))),(0,o.yg)("h2",{id:"forgot-password-page"},"Forgot Password Page"),(0,o.yg)(u,{id:"forgot-password-page",mdxType:"DocThumbsUpDownFeedbackWidget"},(0,o.yg)("p",null,"Forgot password page is used to send a reset password link to the user's email. It provides a basic form to enter email. After submitting the form, it sends the email to the auth provider's ",(0,o.yg)("inlineCode",{parentName:"p"},"forgotPassword")," method via ",(0,o.yg)("inlineCode",{parentName:"p"},"useForgotPassword")," hook."),(0,o.yg)("ol",null,(0,o.yg)("li",{parentName:"ol"},(0,o.yg)("p",{parentName:"li"},"Open ",(0,o.yg)("inlineCode",{parentName:"p"},"src/App.tsx")," file and add the ",(0,o.yg)("inlineCode",{parentName:"p"},"<AuthPage/>")," component to the ",(0,o.yg)("inlineCode",{parentName:"p"},"routes")," prop of the ",(0,o.yg)("inlineCode",{parentName:"p"},"routerProvider")," prop of the ",(0,o.yg)("inlineCode",{parentName:"p"},"<Refine/>")," component."),(0,o.yg)("pre",{parentName:"li"},(0,o.yg)("code",{parentName:"pre",className:"language-tsx"},'import { Refine } from "@pankod/refine-core";\nimport routerProvider from "@pankod/refine-react-router-v6";\nimport dataProvider from "@pankod/refine-simple-rest";\nimport {\n  MantineProvider,\n  Global,\n  NotificationsProvider,\n  useNotificationProvider,\n  LightTheme,\n  Layout,\n  ReadyPage,\n  ErrorComponent,\n  //highlight-next-line\n  AuthPage,\n} from "@pankod/refine-mantine";\n\nimport { BlogPostList } from "pages/blog-posts/list";\nimport { BlogPostEdit } from "pages/blog-posts/edit";\nimport { BlogPostShow } from "pages/blog-posts/show";\nimport { BlogPostCreate } from "pages/blog-posts/create";\n\nimport { authProvider } from "./authProvider";\n\nconst App = () => {\n  return (\n    <MantineProvider theme={LightTheme} withNormalizeCSS withGlobalStyles>\n      <Global styles={{ body: { WebkitFontSmoothing: "auto" } }} />\n      <NotificationsProvider position="top-right">\n        <Refine\n          authProvider={authProvider}\n          routerProvider={{\n            ...routerProvider,\n            routes: [\n              { path: "/login", element: <AuthPage /> },\n              {\n                path: "/register",\n                element: <AuthPage type="register" />,\n              },\n              //highlight-start\n              {\n                path: "/forgot-password",\n                element: <AuthPage type="forgotPassword" />,\n              },\n              //highlight-end\n            ],\n          }}\n          dataProvider={dataProvider("https://api.fake-rest.refine.dev")}\n          notificationProvider={useNotificationProvider}\n          ReadyPage={ReadyPage}\n          catchAll={<ErrorComponent />}\n          Layout={Layout}\n          resources={[\n            {\n              name: "blog_posts",\n              list: BlogPostList,\n              edit: BlogPostEdit,\n              show: BlogPostShow,\n              create: BlogPostCreate,\n            },\n          ]}\n        />\n      </NotificationsProvider>\n    </MantineProvider>\n  );\n};\n')),(0,o.yg)("p",{parentName:"li"},"We need to pass the ",(0,o.yg)("inlineCode",{parentName:"p"},"forgotPassword")," prop to the ",(0,o.yg)("inlineCode",{parentName:"p"},"<AuthPage/>")," component to render the forgot password page."),(0,o.yg)("admonition",{parentName:"li",type:"note"},(0,o.yg)("p",{parentName:"admonition"},"When the user submits the forgot password form, it passes the email to the auth provider's ",(0,o.yg)("inlineCode",{parentName:"p"},"forgotPassword")," method like below:"),(0,o.yg)("pre",{parentName:"admonition"},(0,o.yg)("code",{parentName:"pre",className:"language-ts"},"\nconst authProvider = {\n    forgotPassword: ({ email }) => {\n        ...\n    },\n    ...\n};\n")))),(0,o.yg)("li",{parentName:"ol"},(0,o.yg)("p",{parentName:"li"},"Run the app and navigate to the ",(0,o.yg)("inlineCode",{parentName:"p"},"/forgot-password")," page."))),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-tsx",metastring:"live previewOnly previewHeight=600px url=http://localhost:3000/forgot-password",live:!0,previewOnly:!0,previewHeight:"600px",url:"http://localhost:3000/forgot-password"},'setInitialRoutes(["/forgot-password"]);\n\nrender(<App />);\n'))),(0,o.yg)("h2",{id:"update-password-page"},"Update Password Page"),(0,o.yg)(u,{id:"update-password-page",mdxType:"DocThumbsUpDownFeedbackWidget"},(0,o.yg)("p",null,"Update password page is used to update the user's password. It provides a basic form to enter new password and confirm password. After submitting the form, it sends the new password and confirm password to the auth provider's ",(0,o.yg)("inlineCode",{parentName:"p"},"updatePassword")," method via ",(0,o.yg)("inlineCode",{parentName:"p"},"useUpdatePassword")," hook."),(0,o.yg)("ol",null,(0,o.yg)("li",{parentName:"ol"},(0,o.yg)("p",{parentName:"li"},"Open ",(0,o.yg)("inlineCode",{parentName:"p"},"src/App.tsx")," file and add the ",(0,o.yg)("inlineCode",{parentName:"p"},"<AuthPage/>")," component to the ",(0,o.yg)("inlineCode",{parentName:"p"},"routes")," prop of the ",(0,o.yg)("inlineCode",{parentName:"p"},"routerProvider")," prop of the ",(0,o.yg)("inlineCode",{parentName:"p"},"<Refine/>")," component."),(0,o.yg)("pre",{parentName:"li"},(0,o.yg)("code",{parentName:"pre",className:"language-tsx"},'import { Refine } from "@pankod/refine-core";\nimport routerProvider from "@pankod/refine-react-router-v6";\nimport dataProvider from "@pankod/refine-simple-rest";\nimport {\n  MantineProvider,\n  Global,\n  NotificationsProvider,\n  useNotificationProvider,\n  LightTheme,\n  Layout,\n  ReadyPage,\n  ErrorComponent,\n  //highlight-next-line\n  AuthPage,\n} from "@pankod/refine-mantine";\n\nimport { BlogPostList } from "pages/blog-posts/list";\nimport { BlogPostEdit } from "pages/blog-posts/edit";\nimport { BlogPostShow } from "pages/blog-posts/show";\nimport { BlogPostCreate } from "pages/blog-posts/create";\n\nimport { authProvider } from "./authProvider";\n\nconst App = () => {\n  return (\n    <MantineProvider theme={LightTheme} withNormalizeCSS withGlobalStyles>\n      <Global styles={{ body: { WebkitFontSmoothing: "auto" } }} />\n      <NotificationsProvider position="top-right">\n        <Refine\n          authProvider={authProvider}\n          routerProvider={{\n            ...routerProvider,\n            routes: [\n              { path: "/login", element: <AuthPage /> },\n              {\n                path: "/register",\n                element: <AuthPage type="register" />,\n              },\n              {\n                path: "/forgot-password",\n                element: <AuthPage type="forgotPassword" />,\n              },\n              //highlight-start\n              {\n                path: "/update-password",\n                element: <AuthPage type="updatePassword" />,\n              },\n              //highlight-end\n            ],\n          }}\n          dataProvider={dataProvider("https://api.fake-rest.refine.dev")}\n          notificationProvider={useNotificationProvider}\n          ReadyPage={ReadyPage}\n          catchAll={<ErrorComponent />}\n          Layout={Layout}\n          resources={[\n            {\n              name: "blog_posts",\n              list: BlogPostList,\n              edit: BlogPostEdit,\n              show: BlogPostShow,\n              create: BlogPostCreate,\n            },\n          ]}\n        />\n      </NotificationsProvider>\n    </MantineProvider>\n  );\n};\n')),(0,o.yg)("p",{parentName:"li"},"We need to pass the ",(0,o.yg)("inlineCode",{parentName:"p"},"updatePassword")," prop to the ",(0,o.yg)("inlineCode",{parentName:"p"},"<AuthPage/>")," component to render the update password page."),(0,o.yg)("admonition",{parentName:"li",type:"note"},(0,o.yg)("p",{parentName:"admonition"},"When the user submits the update password form, it passes the new password and confirm password to the auth provider's ",(0,o.yg)("inlineCode",{parentName:"p"},"updatePassword")," method like below:"),(0,o.yg)("pre",{parentName:"admonition"},(0,o.yg)("code",{parentName:"pre",className:"language-ts"},"const authProvider = {\n    updatePassword: ({ password, confirmPassword }) => {\n        ...\n    },\n    ...\n};\n")))),(0,o.yg)("li",{parentName:"ol"},(0,o.yg)("p",{parentName:"li"},"Run the app and navigate to the ",(0,o.yg)("inlineCode",{parentName:"p"},"/update-password")," page."))),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-tsx",metastring:"live previewOnly previewHeight=600px url=http://localhost:3000/update-password",live:!0,previewOnly:!0,previewHeight:"600px",url:"http://localhost:3000/update-password"},'setInitialRoutes(["/update-password"]);\n\nrender(<App />);\n'))),(0,o.yg)("h2",{id:"customizing-auth-pages"},"Customizing Auth Pages"),(0,o.yg)(u,{id:"customizing-auth-pages",mdxType:"DocThumbsUpDownFeedbackWidget"},(0,o.yg)("p",null,"You can customize the auth pages by using the ",(0,o.yg)("inlineCode",{parentName:"p"},"<AuthPage/>")," component's props. Also, you can use ",(0,o.yg)("a",{parentName:"p",href:"/docs/3.xx.xx/packages/documentation/cli/"},(0,o.yg)("inlineCode",{parentName:"a"},"refine-cli"))," to ",(0,o.yg)("a",{parentName:"p",href:"/docs/3.xx.xx/packages/documentation/cli/#swizzle"},"swizzle")," the auth pages."),(0,o.yg)("p",null,(0,o.yg)("a",{parentName:"p",href:"/docs/3.xx.xx/api-reference/mantine/components/mantine-auth-page/#props"},"Refer to the ",(0,o.yg)("inlineCode",{parentName:"a"},"<AuthPage/>")," component's props to customize the auth pages ","\u2192")),(0,o.yg)("p",null,"When you swizzle the auth pages, default auth pages will be copied to the ",(0,o.yg)("inlineCode",{parentName:"p"},"components/pages/auth")," folder. You can customize the auth pages as you want by editing the files."),(0,o.yg)("p",null,"Let's customize the auth pages."),(0,o.yg)("ol",null,(0,o.yg)("li",{parentName:"ol"},(0,o.yg)("p",{parentName:"li"},"Run the following command in the project directory."),(0,o.yg)("pre",{parentName:"li"},(0,o.yg)("code",{parentName:"pre",className:"language-bash"},"npm run refine swizzle\n"))),(0,o.yg)("li",{parentName:"ol"},(0,o.yg)("p",{parentName:"li"},"Select the ",(0,o.yg)("inlineCode",{parentName:"p"},"@pankod/refine-mantine")," package."),(0,o.yg)("pre",{parentName:"li"},(0,o.yg)("code",{parentName:"pre",className:"language-bash"},"    ? Which package do you want to swizzle?\n    UI Framework\n    \u276f  @pankod/refine-mantine\n"))),(0,o.yg)("li",{parentName:"ol"},(0,o.yg)("p",{parentName:"li"},"Select the ",(0,o.yg)("inlineCode",{parentName:"p"},"AuthPage")," component."),(0,o.yg)("pre",{parentName:"li"},(0,o.yg)("code",{parentName:"pre",className:"language-bash"},"    ? Which component do you want to swizzle?\n    Pages\n       ErrorPage\n    \u276f  AuthPage\n")))),(0,o.yg)("p",null,"After swizzling the auth pages, you will show the success message like below."),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-bash"},"    Successfully swizzled AuthPage\n\n    Files created:\n    - src/components/pages/auth/index.tsx\n    - src/components/pages/auth/components/forgotPassword.tsx\n    - src/components/pages/auth/components/login.tsx\n    - src/components/pages/auth/components/register.tsx\n    - src/components/pages/auth/components/updatePassword.tsx\n    - src/components/pages/auth/components/index.tsx\n    - src/components/pages/auth/components/styles.ts\n    ...\n")),(0,o.yg)("p",null,"Now, you can customize the auth pages by editing the files in the ",(0,o.yg)("inlineCode",{parentName:"p"},"src/components/pages/auth")," folder."),(0,o.yg)("br",null),(0,o.yg)("br",null),(0,o.yg)(h,{mdxType:"Checklist"},(0,o.yg)(c,{id:"auth-provider-mantine-auth-pages",mdxType:"ChecklistItem"},"I understood how to use AuthPage component to render auth pages."),(0,o.yg)(c,{id:"auth-provider-mantine-auth-pages-2",mdxType:"ChecklistItem"},"I understood how to customize auth pages."))))}P.isMDXComponent=!0}}]);