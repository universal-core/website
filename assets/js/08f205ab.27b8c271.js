"use strict";(self.webpackChunkdocumentation=self.webpackChunkdocumentation||[]).push([[79939],{58860:(e,n,t)=>{t.d(n,{xA:()=>p,yg:()=>h});var o=t(37953);function a(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function r(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);n&&(o=o.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,o)}return t}function i(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?r(Object(t),!0).forEach((function(n){a(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):r(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function s(e,n){if(null==e)return{};var t,o,a=function(e,n){if(null==e)return{};var t,o,a={},r=Object.keys(e);for(o=0;o<r.length;o++)t=r[o],n.indexOf(t)>=0||(a[t]=e[t]);return a}(e,n);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(o=0;o<r.length;o++)t=r[o],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}var l=o.createContext({}),d=function(e){var n=o.useContext(l),t=n;return e&&(t="function"==typeof e?e(n):i(i({},n),e)),t},p=function(e){var n=d(e.components);return o.createElement(l.Provider,{value:n},e.children)},u="mdxType",c={inlineCode:"code",wrapper:function(e){var n=e.children;return o.createElement(o.Fragment,{},n)}},m=o.forwardRef((function(e,n){var t=e.components,a=e.mdxType,r=e.originalType,l=e.parentName,p=s(e,["components","mdxType","originalType","parentName"]),u=d(t),m=a,h=u["".concat(l,".").concat(m)]||u[m]||c[m]||r;return t?o.createElement(h,i(i({ref:n},p),{},{components:t})):o.createElement(h,i({ref:n},p))}));function h(e,n){var t=arguments,a=n&&n.mdxType;if("string"==typeof e||a){var r=t.length,i=new Array(r);i[0]=m;var s={};for(var l in n)hasOwnProperty.call(n,l)&&(s[l]=n[l]);s.originalType=e,s[u]="string"==typeof e?e:a,i[1]=s;for(var d=2;d<r;d++)i[d]=t[d];return o.createElement.apply(null,i)}return o.createElement.apply(null,t)}m.displayName="MDXCreateElement"},61555:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>p,contentTitle:()=>l,default:()=>v,frontMatter:()=>s,metadata:()=>d,toc:()=>u});t(37953);var o=t(58860);function a(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function r(e,n){return n=null!=n?n:{},Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):function(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);n&&(o=o.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,o)}return t}(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})),e}function i(e,n){if(null==e)return{};var t,o,a=function(e,n){if(null==e)return{};var t,o,a={},r=Object.keys(e);for(o=0;o<r.length;o++)t=r[o],n.indexOf(t)>=0||(a[t]=e[t]);return a}(e,n);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(o=0;o<r.length;o++)t=r[o],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}const s={title:"Frequently Asked Questions",sidebar_label:"FAQ"},l=void 0,d={unversionedId:"guides-concepts/faq/index",id:"guides-concepts/faq/index",title:"Frequently Asked Questions",description:"How can I change the form data before submitting it to the API?",source:"@site/docs/guides-concepts/faq/index.md",sourceDirName:"guides-concepts/faq",slug:"/guides-concepts/faq/",permalink:"/docs/guides-concepts/faq/",draft:!1,editUrl:"https://github.com/refinedev/refine/tree/master/documentation/docs/guides-concepts/faq/index.md",tags:[],version:"current",lastUpdatedBy:"Matteo Roggia",lastUpdatedAt:1741812888,formattedLastUpdatedAt:"Mar 12, 2025",frontMatter:{title:"Frequently Asked Questions",sidebar_label:"FAQ"},sidebar:"mainSidebar",previous:{title:"Contributing",permalink:"/docs/guides-concepts/contributing/"},next:{title:"<Refine>",permalink:"/docs/core/refine-component/"}},p={},u=[{value:"How can I change the form data before submitting it to the API?",id:"how-can-i-change-the-form-data-before-submitting-it-to-the-api",level:2},{value:"How can I refetch data?",id:"how-can-i-refetch-data",level:2},{value:"How can I request an API with nested route?",id:"how-can-i-request-an-api-with-nested-route",level:2},{value:"How can I ensure a query is only run after a certain variable is available and not on load?",id:"how-can-i-ensure-a-query-is-only-run-after-a-certain-variable-is-available-and-not-on-load",level:2},{value:"Can I work with JavaScript?",id:"can-i-work-with-javascript",level:2},{value:"How I can override specific function of Data Providers?",id:"how-i-can-override-specific-function-of-data-providers",level:2},{value:"Why are API calls triggering twice?",id:"why-are-api-calls-triggering-twice",level:2},{value:"How can I add an item to the Sider component?",id:"how-can-i-add-an-item-to-the-sider-component",level:2},{value:"Using Resource Definitions",id:"using-resource-definitions",level:4},{value:"Using <code>render</code> property of <code>&lt;Sider&gt;</code> component",id:"using-render-property-of-sider-component",level:4},{value:"Using <code>swizzle</code> command",id:"using-swizzle-command",level:4},{value:"How to hide items from the Sider component?",id:"how-to-hide-items-from-the-sider-component",level:2},{value:"How can I remove GitHub Banner?",id:"how-can-i-remove-github-banner",level:2},{value:"How to solve &quot;Module &#39;X&#39; has no exported member &#39;Y&#39;&quot; error?",id:"how-to-solve-module-x-has-no-exported-member-y-error",level:2},{value:"How to use React Query DevTools with Refine?",id:"how-to-use-react-query-devtools-with-refine",level:2},{value:"How do invalidation works in queries?",id:"how-do-invalidation-works-in-queries",level:2},{value:"How to handle filters and sorters when using client side pagination?",id:"how-to-handle-filters-and-sorters-when-using-client-side-pagination",level:2},{value:"How to handle server side validation errors?",id:"how-to-handle-server-side-validation-errors",level:2},{value:"How to work offline in local environment?",id:"how-to-work-offline-in-local-environment",level:2},{value:"Why are there network errors showing in the console?",id:"why-are-there-network-errors-showing-in-the-console",level:2}],c=e=>function(n){return console.warn("Component "+e+" was not imported, exported, or provided by MDXProvider as global scope"),(0,o.yg)("div",n)},m=c("DocThumbsUpDownFeedbackWidget"),h=c("Tabs"),y=c("TabItem"),g={toc:u},f="wrapper";function v(e){var{components:n}=e,t=i(e,["components"]);return(0,o.yg)(f,r(function(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{},o=Object.keys(t);"function"==typeof Object.getOwnPropertySymbols&&(o=o.concat(Object.getOwnPropertySymbols(t).filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})))),o.forEach((function(n){a(e,n,t[n])}))}return e}({},g,t),{components:n,mdxType:"MDXLayout"}),(0,o.yg)("h2",{id:"how-can-i-change-the-form-data-before-submitting-it-to-the-api"},"How can I change the form data before submitting it to the API?"),(0,o.yg)(m,{id:"how-can-i-change-the-form-data-before-submitting-it-to-the-api",mdxType:"DocThumbsUpDownFeedbackWidget"},(0,o.yg)("p",null,"You may need to modify the form data before it is sent to the API for various reasons. For example, you may want to add a field to the form data or change the value of a field before submitting it to the API. This can be achieved easily by Refine's ",(0,o.yg)("inlineCode",{parentName:"p"},"useForm")," implementations."),(0,o.yg)("p",null,"Check out the ",(0,o.yg)("a",{parentName:"p",href:"/docs/guides-concepts/forms/#modifying-data-before-submission"},"Modifying Data Before Submission section in Forms guide")," to learn how to achieve this.")),(0,o.yg)("h2",{id:"how-can-i-refetch-data"},"How can I refetch data?"),(0,o.yg)(m,{id:"how-can-i-refetch-data",mdxType:"DocThumbsUpDownFeedbackWidget"},(0,o.yg)("p",null,"Refine automatically invalidates the affected resources after mutations. However, in some cases you may want to refetch manually."),(0,o.yg)(h,{defaultValue:"refetch",values:[{label:"React Query Refetch",value:"refetch"},{label:"useInvalidate Hook",value:"useinvalidate"}],mdxType:"Tabs"},(0,o.yg)(y,{value:"refetch",mdxType:"TabItem"},(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-tsx"},'import { useTable, useForm, useShow } from "@refinedev/core";\n\n// All "data" related hooks provided by Refine can use query\' refetch function\nconst { tableQuery: { refetch } } = useTable();\nconst { tableQueryResult: { refetch } } = useTable();\nconst { query: { refetch } } = useForm();\n...\n...\nconst { query: { refetch } } = useShow();\n...\n...\n'))),(0,o.yg)(y,{value:"useinvalidate",mdxType:"TabItem"},(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-tsx"},'import { useInvalidate } from "@refinedev/core";\n\nconst invalidate = useInvalidate();\n\n// To invalidate the list and many states of the Posts resource\ninvalidate({\n  resource: "posts",\n  invalidates: ["list", "many"],\n});\n\n// To invalidate the state of a Posts with an id of 1\ninvalidate({\n  resource: "posts",\n  invalidates: ["detail"],\n  id: 1,\n});\n\n// To invalidate the list and many states of the Posts resource of the dataProvider named "second-data-provider"\ninvalidate({\n  resource: "posts",\n  dataProviderName: "second-data-provider",\n  invalidates: ["list"],\n});\n\n// To invalidate all states of dataprovider named "second-data-provider"\ninvalidate({\n  dataProviderName: "second-data-provider",\n  invalidates: ["all"],\n});\n')),(0,o.yg)("p",null,(0,o.yg)("a",{parentName:"p",href:"/docs/core/hooks/data/use-invalidate"},"Refer to the Refine useInvalidate hook documentation for more information. \u2192"))))),(0,o.yg)("h2",{id:"how-can-i-request-an-api-with-nested-route"},"How can I request an API with nested route?"),(0,o.yg)(m,{id:"how-can-i-request-an-api-with-nested-route",mdxType:"DocThumbsUpDownFeedbackWidget"},(0,o.yg)("p",null,"Refine's way of doing this is with the ",(0,o.yg)("inlineCode",{parentName:"p"},"resource")," property on all data hooks. You can think of the ",(0,o.yg)("inlineCode",{parentName:"p"},"resource")," property as the URL."),(0,o.yg)("p",null,"For example, If you want to make a request of the URL ",(0,o.yg)("inlineCode",{parentName:"p"},"/user/1/posts"),"."),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-tsx"},'import { useTable, useOne } from "@refinedev/core";\n\nuseTable({\n  resource: "/users/1/posts",\n});\n'))),(0,o.yg)("h2",{id:"how-can-i-ensure-a-query-is-only-run-after-a-certain-variable-is-available-and-not-on-load"},"How can I ensure a query is only run after a certain variable is available and not on load?"),(0,o.yg)(m,{id:"how-can-i-ensure-a-query-is-only-run-after-a-certain-variable-is-available-and-not-on-load",mdxType:"DocThumbsUpDownFeedbackWidget"},(0,o.yg)("p",null,"Note that ",(0,o.yg)("inlineCode",{parentName:"p"},"data")," related hooks (",(0,o.yg)("inlineCode",{parentName:"p"},"useMany"),", ",(0,o.yg)("inlineCode",{parentName:"p"},"useOne"),", etc.) can also accept all ",(0,o.yg)("inlineCode",{parentName:"p"},"useQuery")," options, which allows you to implement dependent queries whereby a query is only run after a certain data is available. This is particularly useful if you want ",(0,o.yg)("inlineCode",{parentName:"p"},"useMany")," to only run after a certain data is available and not on load."),(0,o.yg)("p",null,(0,o.yg)("a",{parentName:"p",href:"https://react-query.tanstack.com/guides/dependent-queries"},"Refer to react-query docs on ",(0,o.yg)("strong",{parentName:"a"},"dependent queries")," for more information \u2192 ")),(0,o.yg)("ul",null,(0,o.yg)("li",{parentName:"ul"},"Suppose you want this query to run after ",(0,o.yg)("inlineCode",{parentName:"li"},"categoryIds")," is fetched by a preceding query, you can set ",(0,o.yg)("inlineCode",{parentName:"li"},"enabled")," to ",(0,o.yg)("inlineCode",{parentName:"li"},"categoryIds.length > 0"),". This will ensure that ",(0,o.yg)("inlineCode",{parentName:"li"},"useMany")," is only run after ",(0,o.yg)("inlineCode",{parentName:"li"},"categoryIds")," is fetched.")),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-tsx"},'useMany({\n  resource: "categories",\n  ids: categoryIds,\n  // highlight-next-line\n  queryOptions: { enabled: categoryIds.length > 0 },\n});\n'))),(0,o.yg)("h2",{id:"can-i-work-with-javascript"},"Can I work with JavaScript?"),(0,o.yg)(m,{id:"can-i-work-with-javascript",mdxType:"DocThumbsUpDownFeedbackWidget"},(0,o.yg)("p",null,"Although Refine is written in TypeScript and it is recommended to use TypeScript, you can also work with Javascript without any problems. Check out the ",(0,o.yg)("a",{parentName:"p",href:"https://github.com/refinedev/refine/tree/master/examples/with-javascript"},"Refine with Javascript example \u2192"))),(0,o.yg)("h2",{id:"how-i-can-override-specific-function-of-data-providers"},"How I can override specific function of Data Providers?"),(0,o.yg)(m,{id:"how-i-can-override-specific-function-of-data-providers",mdxType:"DocThumbsUpDownFeedbackWidget"},(0,o.yg)("p",null,"In some cases, you may need to override functions of Refine data providers. The simplest way to do this is to use the ",(0,o.yg)("a",{parentName:"p",href:"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax"},"Spread syntax")),(0,o.yg)("p",null,"Below code sample, overrides the ",(0,o.yg)("inlineCode",{parentName:"p"},"update")," function of the ",(0,o.yg)("a",{parentName:"p",href:"https://github.com/refinedev/refine/tree/master/packages/simple-rest"},(0,o.yg)("inlineCode",{parentName:"a"},"@refinedev/simple-rest")),". You can apply custom logic to the data provider methods or handle a custom ",(0,o.yg)("inlineCode",{parentName:"p"},"meta")," property for your needs."),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-tsx"},'import dataProvider from "@refinedev/simple-rest";\n\nconst simpleRestProvider = dataProvider("API_URL");\nconst myDataProvider = {\n  ...simpleRestProvider,\n  update: async ({ resource, id, variables, meta }) => {\n    console.log("Overriding the update function");\n\n    // You can either send a request from scratch or use the original function\n    return await simpleRestProvider.update({ resource, id, variables, meta });\n  },\n};\n\n<Refine dataProvider={myDataProvider} />;\n'))),(0,o.yg)("h2",{id:"why-are-api-calls-triggering-twice"},"Why are API calls triggering twice?"),(0,o.yg)(m,{id:"why-are-api-calls-triggering-twice",mdxType:"DocThumbsUpDownFeedbackWidget"},(0,o.yg)("p",null,"This is the expected behavior if you use ","[",(0,o.yg)("inlineCode",{parentName:"p"},"<React.StrictMode>"),"][https://react.dev/reference/react/StrictMode]",". In this mode, React will render the components twice in ",(0,o.yg)("strong",{parentName:"p"},"development mode")," to identify unsafe life cycles, unexpected side effects, and legacy or deprecated APIs. It's used for highlighting possible problems. You can also check out the related issue on the ",(0,o.yg)("a",{parentName:"p",href:"https://github.com/TanStack/query/issues/3633"},"TanStack Query repository"),".")),(0,o.yg)("h2",{id:"how-can-i-add-an-item-to-the-sider-component"},"How can I add an item to the Sider component?"),(0,o.yg)(m,{id:"how-can-i-add-an-item-to-the-sider-component",mdxType:"DocThumbsUpDownFeedbackWidget"},(0,o.yg)("p",null,(0,o.yg)("inlineCode",{parentName:"p"},"<Sider />")," components use the ",(0,o.yg)("inlineCode",{parentName:"p"},"resources")," property of the ",(0,o.yg)("inlineCode",{parentName:"p"},"<Refine>")," component to render the navigation links. If a resource has a ",(0,o.yg)("inlineCode",{parentName:"p"},"list")," property, it will be rendered as a navigation link in the sider. To add a custom item to the sider, you can use three different approaches:")),(0,o.yg)("h4",{id:"using-resource-definitions"},"Using Resource Definitions"),(0,o.yg)(m,{id:"using-resource-definitions",mdxType:"DocThumbsUpDownFeedbackWidget"},(0,o.yg)("p",null,"The first and simplest way is to use the ",(0,o.yg)("inlineCode",{parentName:"p"},"resources")," property on the ",(0,o.yg)("inlineCode",{parentName:"p"},"<Refine>")," component. The ",(0,o.yg)("inlineCode",{parentName:"p"},"<Sider>")," component shows the resources whose ",(0,o.yg)("inlineCode",{parentName:"p"},"list")," property is set. So, you can have an extra navigation link by adding a resource with the ",(0,o.yg)("inlineCode",{parentName:"p"},"list")," attribute."),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-tsx"},'import { Refine } from "@refinedev/core";\n\n<Refine\n    ...\n    resources={[\n        {\n            name: "dashboard",\n            list: "/",\n            meta: {\n                label: "Dashboard",\n                icon: "\ud83c\udfe0",\n            },\n        },\n    ]}\n/>;\n'))),(0,o.yg)("h4",{id:"using-render-property-of-sider-component"},"Using ",(0,o.yg)("inlineCode",{parentName:"h4"},"render")," property of ",(0,o.yg)("inlineCode",{parentName:"h4"},"<Sider>")," component"),(0,o.yg)(m,{id:"using-render-property-of-sider-component",mdxType:"DocThumbsUpDownFeedbackWidget"},(0,o.yg)("p",null,"The second way is to use the ",(0,o.yg)("inlineCode",{parentName:"p"},"render")," property of the ",(0,o.yg)("inlineCode",{parentName:"p"},"<Sider>")," component. The ",(0,o.yg)("inlineCode",{parentName:"p"},"render")," property is a function that receives an object with the ",(0,o.yg)("inlineCode",{parentName:"p"},"items")," and ",(0,o.yg)("inlineCode",{parentName:"p"},"logout")," properties. The ",(0,o.yg)("inlineCode",{parentName:"p"},"items")," property is the list of navigation items and the ",(0,o.yg)("inlineCode",{parentName:"p"},"logout")," property is the logout button."),(0,o.yg)(h,{defaultValue:"antd",values:[{label:"Ant Design",value:"antd"},{label:"Material UI",value:"mui"},{label:"Mantine",value:"mantine"},{label:"Chakra UI",value:"chakra-ui"}],mdxType:"Tabs"},(0,o.yg)(y,{value:"antd",mdxType:"TabItem"},(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-tsx"},'import { Layout, Sider } from "@refinedev/antd";\n\nconst CustomSider = () => {\n  return (\n    <Sider\n      render={({ items, logout }) => {\n        return (\n          <>\n            <a href="https://refine.dev/">\ud83d\udc4b Navigation Link</a>\n            {items}\n            {logout}\n          </>\n        );\n      }}\n    />\n  );\n};\n\nconst CustomLayout = () => {\n  return <Layout Sider={CustomSider}>...</Layout>;\n};\n'))),(0,o.yg)(y,{value:"mui",mdxType:"TabItem"},(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-tsx"},'import { Layout, Sider } from "@refinedev/mui";\n\nconst CustomSider = () => {\n  return (\n    <Sider\n      render={({ items, logout }) => {\n        return (\n          <>\n            <a href="https://refine.dev/">\ud83d\udc4b Navigation Link</a>\n            {items}\n            {logout}\n          </>\n        );\n      }}\n    />\n  );\n};\n\nconst CustomLayout = () => {\n  return <Layout Sider={CustomSider}>...</Layout>;\n};\n'))),(0,o.yg)(y,{value:"mantine",mdxType:"TabItem"},(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-tsx"},'import { Layout, Sider } from "@refinedev/mantine";\n\nconst CustomSider = () => {\n  return (\n    <Sider\n      render={({ items, logout }) => {\n        return (\n          <>\n            <a href="https://refine.dev/">\ud83d\udc4b Navigation Link</a>\n            {items}\n            {logout}\n          </>\n        );\n      }}\n    />\n  );\n};\n\nconst CustomLayout = () => {\n  return <Layout Sider={CustomSider}>...</Layout>;\n};\n'))),(0,o.yg)(y,{value:"chakra-ui",mdxType:"TabItem"},(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-tsx"},'import { Layout, Sider } from "@refinedev/chakra-ui";\n\nconst CustomSider = () => {\n  return (\n    <Sider\n      render={({ items, logout }) => {\n        return (\n          <>\n            <a href="https://refine.dev/">\ud83d\udc4b Navigation Link</a>\n            {items}\n            {logout}\n          </>\n        );\n      }}\n    />\n  );\n};\n\nconst CustomLayout = () => {\n  return <Layout Sider={CustomSider}>...</Layout>;\n};\n'))))),(0,o.yg)("h4",{id:"using-swizzle-command"},"Using ",(0,o.yg)("inlineCode",{parentName:"h4"},"swizzle")," command"),(0,o.yg)(m,{id:"using-swizzle-command",mdxType:"DocThumbsUpDownFeedbackWidget"},(0,o.yg)("p",null,"The third way is to use the ",(0,o.yg)("inlineCode",{parentName:"p"},"swizzle")," command."),(0,o.yg)("p",null,"You can use the command to copy the default ",(0,o.yg)("inlineCode",{parentName:"p"},"Sider")," component to your project. This will allow you to customize the sider as you want."),(0,o.yg)("p",null,(0,o.yg)("a",{parentName:"p",href:"/docs/guides-concepts/development/#using-swizzle"},"Refer to the swizzle section of Development guide. ","\u2192"))),(0,o.yg)("h2",{id:"how-to-hide-items-from-the-sider-component"},"How to hide items from the Sider component?"),(0,o.yg)(m,{id:"how-to-hide-items-from-the-sider-component",mdxType:"DocThumbsUpDownFeedbackWidget"},(0,o.yg)("p",null,"Refine's ",(0,o.yg)("a",{parentName:"p",href:"/docs/core/hooks/utilities/use-menu/"},(0,o.yg)("inlineCode",{parentName:"a"},"useMenu"))," hook and ",(0,o.yg)("inlineCode",{parentName:"p"},"<Sider />")," components use the ",(0,o.yg)("inlineCode",{parentName:"p"},"resources")," property of the ",(0,o.yg)("inlineCode",{parentName:"p"},"<Refine>")," component to render the navigation links. If a resource has a ",(0,o.yg)("inlineCode",{parentName:"p"},"list")," property, it will be rendered as a navigation link in the sider. To hide a resource from the menu, you can use the ",(0,o.yg)("inlineCode",{parentName:"p"},"meta.hide")," property of the resource."),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-tsx",metastring:'title="App.tsx"',title:'"App.tsx"'},'import { Refine } from "@refinedev/core";\n\nconst App = () => (\n  <Refine\n    ...\n    resources={[\n      {\n        name: "posts",\n        list: "/posts",\n        meta: {\n          label: "Posts",\n          icon: "\ud83d\udcdd",\n        },\n      },\n      {\n        name: "users",\n        list: "/users",\n        meta: {\n          // Users resource will be hidden from the menu but will be accessible via the URL\n          hide: true,\n        },\n      },\n    ]}\n  />\n);\n'))),(0,o.yg)("h2",{id:"how-can-i-remove-github-banner"},"How can I remove GitHub Banner?"),(0,o.yg)(m,{id:"how-can-i-remove-github-banner",mdxType:"DocThumbsUpDownFeedbackWidget"},(0,o.yg)("p",null,"To remove the GitHub Banner, you need to find and remove the ",(0,o.yg)("inlineCode",{parentName:"p"},"<GitHubBanner />")," component from your React application. The specific location of this component may vary depending on the React platform you are using."),(0,o.yg)("p",null,"Here are the locations where you can find and remove the ",(0,o.yg)("inlineCode",{parentName:"p"},"<GitHubBanner />")," component based on different React platforms:"),(0,o.yg)("ul",null,(0,o.yg)("li",{parentName:"ul"},"Vite: ",(0,o.yg)("inlineCode",{parentName:"li"},"src/App.tsx")," - ",(0,o.yg)("a",{parentName:"li",href:"https://github.com/refinedev/refine/blob/master/examples/auth-antd/src/App.tsx#L161"},"See an example")),(0,o.yg)("li",{parentName:"ul"},"Next.js: ",(0,o.yg)("inlineCode",{parentName:"li"},"src/app/layout.tsx")," - ",(0,o.yg)("a",{parentName:"li",href:"https://github.com/refinedev/refine/blob/master/examples/with-nextjs/src/app/layout.tsx#L37"},"See an example")),(0,o.yg)("li",{parentName:"ul"},"Remix: ",(0,o.yg)("inlineCode",{parentName:"li"},"app/root.tsx")," - ",(0,o.yg)("a",{parentName:"li",href:"https://github.com/refinedev/refine/blob/master/examples/with-remix-antd/app/root.tsx#L37"},"See an example")))),(0,o.yg)("h2",{id:"how-to-solve-module-x-has-no-exported-member-y-error"},"How to solve \"Module 'X' has no exported member 'Y'\" error?"),(0,o.yg)(m,{id:"how-to-solve-module-x-has-no-exported-member-y-error",mdxType:"DocThumbsUpDownFeedbackWidget"},(0,o.yg)("p",null,"The error message \"Module 'X' has no exported member 'Y'\" typically occurs when using ",(0,o.yg)("inlineCode",{parentName:"p"},"pnpm")," due to its cache system. We are aware of this issue and are actively working on resolving it by updating our peer dependencies with each version release. However, this is still a work in progress. In the meantime, you can resolve this error by using the ",(0,o.yg)("inlineCode",{parentName:"p"},"npm i <module-name>@latest")," command."),(0,o.yg)("p",null,"Here are a couple of examples of reported errors and their corresponding fix:"),(0,o.yg)("ol",null,(0,o.yg)("li",{parentName:"ol"},(0,o.yg)("p",{parentName:"li"},"Error: \"Module '@refinedev/mantine' has no exported member 'HamburgerMenu'\""),(0,o.yg)("ul",{parentName:"li"},(0,o.yg)("li",{parentName:"ul"},"Solution: Run ",(0,o.yg)("inlineCode",{parentName:"li"},"npm i @refinedev/mantine@latest")," to install the latest version of the ",(0,o.yg)("inlineCode",{parentName:"li"},"@refinedev/mantine")," module."))),(0,o.yg)("li",{parentName:"ol"},(0,o.yg)("p",{parentName:"li"},"Error: \"Module '@refinedev/antd' has no exported member 'ThemedLayoutV2'\""),(0,o.yg)("ul",{parentName:"li"},(0,o.yg)("li",{parentName:"ul"},"Solution: Execute ",(0,o.yg)("inlineCode",{parentName:"li"},"npm i @refinedev/antd@latest")," to install the latest version of the ",(0,o.yg)("inlineCode",{parentName:"li"},"@refinedev/antd")," module.")))),(0,o.yg)("p",null,'By following these steps and updating to the latest module versions, you should be able to resolve the "not exported" error.')),(0,o.yg)("h2",{id:"how-to-use-react-query-devtools-with-refine"},"How to use React Query DevTools with Refine?"),(0,o.yg)(m,{id:"how-to-use-react-query-devtools-with-refine",mdxType:"DocThumbsUpDownFeedbackWidget"},(0,o.yg)("p",null,"Until ",(0,o.yg)("inlineCode",{parentName:"p"},"@refinedev/core"),"'s version ",(0,o.yg)("inlineCode",{parentName:"p"},"4.28.2"),", Refine had the ",(0,o.yg)("inlineCode",{parentName:"p"},"@tanstack/react-query-devtools")," package available by default. However, this package has been removed from the core package and is no longer available by default."),(0,o.yg)("p",null,"We're recommending ",(0,o.yg)("a",{parentName:"p",href:"/docs/guides-concepts/development/#using-devtools"},(0,o.yg)("inlineCode",{parentName:"a"},"@refinedev/devtools"))," as an alternative to ",(0,o.yg)("inlineCode",{parentName:"p"},"@tanstack/react-query-devtools"),". ",(0,o.yg)("inlineCode",{parentName:"p"},"@refinedev/devtools")," is tailored for Refine and provides more detailed information about the queries and mutations with its monitoring panel and much more.")),(0,o.yg)("h2",{id:"how-do-invalidation-works-in-queries"},"How do invalidation works in queries?"),(0,o.yg)(m,{id:"how-do-invalidation-works-in-queries",mdxType:"DocThumbsUpDownFeedbackWidget"},(0,o.yg)("p",null,"Refine invalidates and refetches the related queries after a successful mutation. To have a better understanding of how invalidation works in Refine, check out the ",(0,o.yg)("a",{parentName:"p",href:"docs/guides-concepts/general-concepts/#state-management"},"State Management section of General Concepts guide."))),(0,o.yg)("h2",{id:"how-to-handle-filters-and-sorters-when-using-client-side-pagination"},"How to handle filters and sorters when using client side pagination?"),(0,o.yg)(m,{id:"how-to-handle-filters-and-sorters-when-using-client-side-pagination",mdxType:"DocThumbsUpDownFeedbackWidget"},(0,o.yg)("p",null,"When you're implementing client side pagination with the ",(0,o.yg)("inlineCode",{parentName:"p"},"pagination.mode"),' set to "client," you might run into issues when applying client side filtering and sorting. This is due to the fact that client side filtering and sorting are applied to the sliced data, not the whole data. To ensure that the client side filtering and sorting are applied to the whole data, you need to use the ',(0,o.yg)("inlineCode",{parentName:"p"},'pagination.mode: "off"')," prop.")),(0,o.yg)("h2",{id:"how-to-handle-server-side-validation-errors"},"How to handle server side validation errors?"),(0,o.yg)(m,{id:"how-to-handle-server-side-validation-errors",mdxType:"DocThumbsUpDownFeedbackWidget"},(0,o.yg)("p",null,"When working with forms and mutations, using only client side validation might not be enough. You may also need to validate the data on the server side. Refine provides an interface ",(0,o.yg)("a",{parentName:"p",href:"/docs/core/interface-references/#httperror"},(0,o.yg)("inlineCode",{parentName:"a"},"HttpError"))," to propagate the server side validation errors to the form values. You can use this interface to handle server side validation errors."),(0,o.yg)("p",null,"To learn more about server side validation and see an example, check out the ",(0,o.yg)("a",{parentName:"p",href:"/docs/guides-concepts/forms/#server-side-validation-"},"Server Side Validation section of the Forms guide."))),(0,o.yg)("h2",{id:"how-to-work-offline-in-local-environment"},"How to work offline in local environment?"),(0,o.yg)(m,{id:"how-to-work-offline-in-local-environment",mdxType:"DocThumbsUpDownFeedbackWidget"},(0,o.yg)("p",null,"When working without a network connection, ",(0,o.yg)("inlineCode",{parentName:"p"},"@tanstack/query")," prevents requests from being made until a successful connection is established. You might feel frustrated and wonder,"),(0,o.yg)("blockquote",null,(0,o.yg)("p",{parentName:"blockquote"},"Why can't I work with my own data? Must I use an internet connection to run this library?")),(0,o.yg)("p",null,"Don't worry; according to the ",(0,o.yg)("inlineCode",{parentName:"p"},"@tanstack/query")," ",(0,o.yg)("a",{parentName:"p",href:"https://tanstack.com/query/latest/docs/react/guides/network-mode"},"documentation"),", you can simply add the ",(0,o.yg)("inlineCode",{parentName:"p"},'networkMode: "always"')," option to the ",(0,o.yg)("inlineCode",{parentName:"p"},"reactQuery")," props on the ",(0,o.yg)("inlineCode",{parentName:"p"},"<Refine/>")," component."),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-javascript"},'<Refine\n  // ...\n  options: {\n    // ...\n    reactQuery: {\n      clientConfig: {\n        defaultOptions: {\n          queries: { // For fetching data\n            networkMode: "always", // Apply this to mutations as well, as shown below\n          },\n          mutations: { // For posting data\n            networkMode: "always" // It defaults to "online," preventing requests when there is no connection\n          },\n        },\n      },\n    },\n  }\n/>\n'))),(0,o.yg)("h2",{id:"why-are-there-network-errors-showing-in-the-console"},"Why are there network errors showing in the console?"),(0,o.yg)(m,{id:"why-are-there-network-errors-showing-in-the-console",mdxType:"DocThumbsUpDownFeedbackWidget"},(0,o.yg)("p",null,"When working with Refine in development environment you may receive network errors in the console. Browsers will log network errors regardless of the status of the Promise. This is a common behavior in development environments and does not affect the functionality of the application."),(0,o.yg)("p",null,"Still, there two common errors that you may encounter when working with Refine in development environment but you can safely ignore them:"),(0,o.yg)("ul",null,(0,o.yg)("li",{parentName:"ul"},(0,o.yg)("p",{parentName:"li"},(0,o.yg)("inlineCode",{parentName:"p"},"401 (Unauthorized) from :5001/api/.auth/sessions/whoami")," - This error is related with the Refine's Devtools and logged if there are no active authentication sessions in Devtools. You can get rid of this error by logging in to the Devtools.")),(0,o.yg)("li",{parentName:"ul"},(0,o.yg)("p",{parentName:"li"},"Numerous ",(0,o.yg)("inlineCode",{parentName:"p"},"404 (Not Found)")," errors when using Refine's Inferencer - These errors are related with the Inferencer component since the main logic behind Inferencer components are to infer the data structure from the API. When trying to infer the data structure, Inferencer may send requests to the API to determine relationships between resources. You can safely ignore these errors as they are not affecting the functionality of the application. To learn more about the functionality of Inferencer, check out the ",(0,o.yg)("a",{parentName:"p",href:"/docs/packages/inferencer/#how-the-fields-are-inferred"},"How the fields are inferred? section in Inferencer docs"),"."))),(0,o.yg)("p",null,"If you have any other network errors thrown by Refine and have no relation with the above mentioned errors or not caused by your project's logic, please reach out to us via ",(0,o.yg)("a",{parentName:"p",href:"https://github.com/refinedev/refine/issues"},"GitHub Issues")," or our ",(0,o.yg)("a",{parentName:"p",href:"https://discord.gg/refine"},"Discord Community"),".")))}v.isMDXComponent=!0}}]);