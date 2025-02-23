"use strict";(self.webpackChunkdocumentation=self.webpackChunkdocumentation||[]).push([[30812],{58860:(e,t,n)=>{n.d(t,{xA:()=>d,yg:()=>g});var a=n(37953);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},i=Object.keys(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var l=a.createContext({}),p=function(e){var t=a.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},d=function(e){var t=p(e.components);return a.createElement(l.Provider,{value:t},e.children)},c="mdxType",u={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},m=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,i=e.originalType,l=e.parentName,d=s(e,["components","mdxType","originalType","parentName"]),c=p(n),m=r,g=c["".concat(l,".").concat(m)]||c[m]||u[m]||i;return n?a.createElement(g,o(o({ref:t},d),{},{components:n})):a.createElement(g,o({ref:t},d))}));function g(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=n.length,o=new Array(i);o[0]=m;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s[c]="string"==typeof e?e:r,o[1]=s;for(var p=2;p<i;p++)o[p]=n[p];return a.createElement.apply(null,o)}return a.createElement.apply(null,n)}m.displayName="MDXCreateElement"},63803:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>d,contentTitle:()=>l,default:()=>T,frontMatter:()=>s,metadata:()=>p,toc:()=>c});n(37953);var a=n(58860);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){return t=null!=t?t:{},Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):function(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))})),e}function o(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},i=Object.keys(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}const s={title:"Multitenancy",guide:!0},l='Multitenancy <GuideBadge id="guides-concepts/multitenancy" />',p={unversionedId:"enterprise-edition/multitenancy/index",id:"enterprise-edition/multitenancy/index",title:"Multitenancy",description:"Refine's Enterprise Edition provides built-in support for Multitenancy. This feature allows you to build applications that can serve multiple tenants with a single codebase with help of",source:"@site/docs/enterprise-edition/multitenancy/index.md",sourceDirName:"enterprise-edition/multitenancy",slug:"/enterprise-edition/multitenancy/",permalink:"/docs/enterprise-edition/multitenancy/",draft:!1,editUrl:"https://github.com/refinedev/refine/tree/master/documentation/docs/enterprise-edition/multitenancy/index.md",tags:[],version:"current",lastUpdatedBy:"Matteo Roggia",lastUpdatedAt:1740315756,formattedLastUpdatedAt:"Feb 23, 2025",frontMatter:{title:"Multitenancy",guide:!0},sidebar:"mainSidebar",previous:{title:"Devtools",permalink:"/docs/enterprise-edition/devtools/"},next:{title:"3.x.x to 4.x.x",permalink:"/docs/migration-guide/3x-to-4x"}},d={},c=[{value:"Installation",id:"installation",level:2},{value:"Usage",id:"usage",level:2},{value:"multitenancyProvider",id:"multitenancyprovider",level:2},{value:"fetchTenants",id:"fetchtenants",level:3},{value:"adapters",id:"adapters",level:3},{value:"useRouterAdapter",id:"userouteradapter",level:4},{value:"useLocalStorageAdapter",id:"uselocalstorageadapter",level:4},{value:"Components",id:"components",level:2},{value:"WithTenant",id:"withtenant",level:3},{value:"Tenant Select components",id:"tenant-select-components",level:3},{value:"Hooks",id:"hooks",level:3},{value:"useMultitenancy",id:"usemultitenancy",level:4},{value:"Handling Multi-tenant Requests in Data Providers",id:"handling-multi-tenant-requests-in-data-providers",level:2},{value:"Examples",id:"examples",level:3}],u=e=>function(t){return console.warn("Component "+e+" was not imported, exported, or provided by MDXProvider as global scope"),(0,a.yg)("div",t)},m=u("GuideBadge"),g=u("DocThumbsUpDownFeedbackWidget"),y=u("InstallPackagesCommand"),h=u("Tabs"),f=u("TabItem"),v={toc:c},b="wrapper";function T(e){var{components:t}=e,n=o(e,["components"]);return(0,a.yg)(b,i(function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{},a=Object.keys(n);"function"==typeof Object.getOwnPropertySymbols&&(a=a.concat(Object.getOwnPropertySymbols(n).filter((function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable})))),a.forEach((function(t){r(e,t,n[t])}))}return e}({},v,n),{components:t,mdxType:"MDXLayout"}),(0,a.yg)("h1",{id:"multitenancy-"},"Multitenancy ",(0,a.yg)(m,{id:"guides-concepts/multitenancy",mdxType:"GuideBadge"})),(0,a.yg)("p",null,"Refine's Enterprise Edition provides built-in support for ",(0,a.yg)("a",{parentName:"p",href:"/docs/guides-concepts/multitenancy/"},"Multitenancy"),". This feature allows you to build applications that can serve multiple tenants with a single codebase with help of\npre-built components and hooks with minimal configuration."),(0,a.yg)("h2",{id:"installation"},"Installation"),(0,a.yg)(g,{id:"installation",mdxType:"DocThumbsUpDownFeedbackWidget"},(0,a.yg)("p",null,"This package is included in Refine's Enterprise Edition. To learn more about Refine's Enterprise Edition, please ",(0,a.yg)("a",{parentName:"p",href:"https://s.refine.dev/okta-enterprise"},"contact us"),"."),(0,a.yg)(y,{args:"@refinedev-ee/enterprise @refinedev-ee/multitenancy",mdxType:"InstallPackagesCommand"},(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-yml",metastring:'title=".npmrc"',title:'".npmrc"'},"# A registry with the auth token should be added for the @refinedev-ee scope\n@refinedev-ee:registry=https://registry.npmjs.org/\n//registry.npmjs.org/:_authToken=$NPM_TOKEN\n")))),(0,a.yg)("h2",{id:"usage"},"Usage"),(0,a.yg)(g,{id:"usage",mdxType:"DocThumbsUpDownFeedbackWidget"},(0,a.yg)("p",null,"To use the multitenancy feature, we need to wrap our application with the ",(0,a.yg)("inlineCode",{parentName:"p"},"<RefineEnterprise />")," component and provide the ",(0,a.yg)("inlineCode",{parentName:"p"},"multitenancyProvider")," prop."),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-tsx"},'import { RefineEnterprise } from "@refinedev-ee/enterprise";\nimport { useRouterAdapter, WithTenant } from "@refinedev-ee/multitenancy";\n\ntype Tenant = {\n  id: string;\n  name: string;\n};\n\n// ... other imports\n\nconst App = () => {\n  return (\n    <RefineEnterprise\n      // ... other props\n      multitenancyProvider={{\n        adapter: useRouterAdapter(),\n        fetchTenants: async () => {\n          const response = await dataProvider("<API_URL>").getList<Tenant>({\n            resource: "tenants",\n            pagination: {\n              mode: "off",\n            },\n          });\n          const tenants = response.data;\n          const defaultTenant = tenants[0];\n\n          return {\n            tenants,\n            defaultTenant,\n          };\n        },\n      }}\n    >\n      <WithTenant\n        fallback={<div>Tenant not found</div>}\n        loadingComponent={<div>Loading...</div>}\n      >\n        {/* Your app code */}\n      </WithTenant>\n    </RefineEnterprise>\n  );\n};\n'))),(0,a.yg)("h2",{id:"multitenancyprovider"},"multitenancyProvider"),(0,a.yg)(g,{id:"multitenancyprovider",mdxType:"DocThumbsUpDownFeedbackWidget"},(0,a.yg)("p",null,"The ",(0,a.yg)("inlineCode",{parentName:"p"},"multitenancyProvider")," is a prop that accepts an object with two properties: ",(0,a.yg)("inlineCode",{parentName:"p"},"adapter")," and ",(0,a.yg)("inlineCode",{parentName:"p"},"fetchTenants"),".")),(0,a.yg)("h3",{id:"fetchtenants"},"fetchTenants"),(0,a.yg)(g,{id:"fetchtenants",mdxType:"DocThumbsUpDownFeedbackWidget"},(0,a.yg)("p",null,"The ",(0,a.yg)("inlineCode",{parentName:"p"},"fetchTenants")," function is a crucial part of the ",(0,a.yg)("inlineCode",{parentName:"p"},"multitenancyProvider"),", responsible for fetching tenant data from an API or data source and determining the default tenant for the app. The function should return an object with two properties: ",(0,a.yg)("inlineCode",{parentName:"p"},"tenants")," and ",(0,a.yg)("inlineCode",{parentName:"p"},"defaultTenant"),".")),(0,a.yg)("h3",{id:"adapters"},"adapters"),(0,a.yg)(g,{id:"adapters",mdxType:"DocThumbsUpDownFeedbackWidget"},(0,a.yg)("p",null,"Adapters define where tenant information is stored. Refine offers ",(0,a.yg)("inlineCode",{parentName:"p"},"useRouterAdapter")," for storing tenants in the URL and ",(0,a.yg)("inlineCode",{parentName:"p"},"useLocalStorageAdapter")," for local storage.")),(0,a.yg)("h4",{id:"userouteradapter"},"useRouterAdapter"),(0,a.yg)(g,{id:"userouteradapter",mdxType:"DocThumbsUpDownFeedbackWidget"},(0,a.yg)("p",null,"Extracts the tenantId from the URL and updates the route when the tenant changes."),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-tsx"},'import { useRouterAdapter } from "@refinedev-ee/multitenancy";\n\nconst multitenancyProvider = {\n  adapter: useRouterAdapter({\n    // The parameter name to use in the URL. (eg: localhost:3000/:tenantId/products)\n    parameterName: "tenantId",\n    // The tenant field to use in the route params. (eg: localhost:3000/:tenantId/products)\n    parameterKey: "id",\n    // Determines if the query string should be used to get the tenant instead of the route params. (eg: localhost:3000/products?tenantId=1)\n    useQueryString: false,\n  }),\n  fetchTenants: async () => {\n    // Fetch tenants from the API\n  },\n};\n'))),(0,a.yg)("h4",{id:"uselocalstorageadapter"},"useLocalStorageAdapter"),(0,a.yg)(g,{id:"uselocalstorageadapter",mdxType:"DocThumbsUpDownFeedbackWidget"},(0,a.yg)("p",null,"Retrieves tenantId from local storage and updates it when the tenant changes."),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-tsx"},'import { useLocalStorageAdapter } from "@refinedev-ee/multitenancy";\n\nconst multitenancyProvider = {\n  adapter: useLocalStorageAdapter({\n    // The key to use in the local storage. (eg: localStorage.getItem(key))\n    storageKey: "tenantId",\n  }),\n  fetchTenants: async () => {\n    // Fetch tenants from the API\n  },\n};\n'))),(0,a.yg)("h2",{id:"components"},"Components"),(0,a.yg)("h3",{id:"withtenant"},"WithTenant"),(0,a.yg)(g,{id:"withtenant",mdxType:"DocThumbsUpDownFeedbackWidget"},(0,a.yg)("p",null,"The ",(0,a.yg)("inlineCode",{parentName:"p"},"<WithTenant />")," component is required to wrap your app code. It fetches ",(0,a.yg)("inlineCode",{parentName:"p"},"tenants"),", handling the loading state and error state."),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-tsx"},'import { RefineEnterprise } from "@refinedev-ee/enterprise";\nimport { WithTenant } from "@refinedev-ee/multitenancy";\n\n<WithTenant\n  // render a component when the tenant is not available.\n  fallback={<div>Tenant not found</div>}\n  // render a component while the tenant is loading.\n  loadingComponent={<div>Loading...</div>}\n>\n  {/* Your app code */}\n</WithTenant>;\n'))),(0,a.yg)("h3",{id:"tenant-select-components"},"Tenant Select components"),(0,a.yg)(g,{id:"tenant-select-components",mdxType:"DocThumbsUpDownFeedbackWidget"},(0,a.yg)("p",null,"These components allow users to select a tenant from a list of available tenants. They are automatically change the current tenant when a new tenant is selected from the list."),(0,a.yg)(h,{wrapContent:!1,mdxType:"Tabs"},(0,a.yg)(f,{value:"Ant Design",mdxType:"TabItem"},(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-tsx"},'import { TenantSelect } from "@refinedev-ee/multitenancy/antd";\n\n<TenantSelect\n  // Specifies the tenant object field to display in the select component.\n  optionLabel="title"\n  // Specifies the tenant object field to use as the value in the select component.\n  optionValue="id"\n  // Event handler for when a tenant is selected, receiving the selected tenant as an argument.\n  onChange={(tenant) => console.log(tenant)}\n  // Function to sort tenants.\n  sortTenants={(a, b) => a.name.localeCompare(b.name)}\n/>;\n'))),(0,a.yg)(f,{value:"Material UI",mdxType:"TabItem"},(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-tsx"},'import { TenantSelect } from "@refinedev-ee/multitenancy/mui";\n\n<TenantSelect\n  // Specifies the tenant object field to display in the select component.\n  optionLabel="title"\n  // Specifies the tenant object field to use as the value in the select component.\n  optionValue="id"\n  // Event handler for when a tenant is selected, receiving the selected tenant as an argument.\n  onChange={(tenant) => console.log(tenant)}\n  // Function to sort tenants.\n  sortTenants={(a, b) => a.name.localeCompare(b.name)}\n/>;\n'))))),(0,a.yg)("h3",{id:"hooks"},"Hooks"),(0,a.yg)(g,{id:"hooks",mdxType:"DocThumbsUpDownFeedbackWidget"},(0,a.yg)("p",null,"Refine provides hooks to interact with the multitenancy feature.")),(0,a.yg)("h4",{id:"usemultitenancy"},"useMultitenancy"),(0,a.yg)(g,{id:"usemultitenancy",mdxType:"DocThumbsUpDownFeedbackWidget"},(0,a.yg)("p",null,"The ",(0,a.yg)("inlineCode",{parentName:"p"},"useMultitenancy")," hook is used to interact with the multitenancy context."),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-tsx"},'import { useMultitenancy } from "@refinedev-ee/multitenancy";\n\nconst {\n  // The current tenant object.\n  tenant,\n  // The list of available tenants.\n  tenants,\n  // The loading state of the tenants.\n  isLoading,\n  // It triggers `authProvider.fetchTenants` to fetch tenants.\n  fetchTenants,\n  // It sets the current tenant. It accepts a tenant object as an argument.\n  setTenant,\n  // It deletes the current tenant.\n  deleteTenant,\n} = useMultitenancy();\n'))),(0,a.yg)("h2",{id:"handling-multi-tenant-requests-in-data-providers"},"Handling Multi-tenant Requests in Data Providers"),(0,a.yg)(g,{id:"handling-multi-tenant-requests-in-data-providers",mdxType:"DocThumbsUpDownFeedbackWidget"},(0,a.yg)("p",null,"Refine automatically sends the ",(0,a.yg)("inlineCode",{parentName:"p"},"tenantId")," to the data provider in the ",(0,a.yg)("inlineCode",{parentName:"p"},"meta")," object. You can access the ",(0,a.yg)("inlineCode",{parentName:"p"},"tenantId")," in the data provider and use it to fetch tenant-specific data."),(0,a.yg)("p",null,"To customize the data providers, you can override each method in the data provider instance or use the ",(0,a.yg)("a",{parentName:"p",href:"/docs/packages/cli/#swizzle"},(0,a.yg)("inlineCode",{parentName:"a"},"swizzle"))," command to be fully able to customize the data provider for your needs."),(0,a.yg)("p",null,"An example implementation of a custom ",(0,a.yg)("inlineCode",{parentName:"p"},"getList")," method is shown below."),(0,a.yg)("pre",null,(0,a.yg)("code",{parentName:"pre",className:"language-ts"},'import dataProvider from "@refinedev/simple-rest";\n\nconst API_URL = "<API_URL>";\nconst baseDataProvider = dataProvider(API_URL);\n\nconst customDataProvider = {\n  ...baseDataProvider,\n  getList: async ({ resource, filters = [], meta, ...props }) => {\n    const { tenantId } = meta;\n\n    // We\'re adding the tenantId to the filters\n    // Your API may have a different way of handling this\n    if (meta?.tenantId) {\n      filters.push({\n        field: "organization",\n        operator: "eq",\n        value: meta.tenantId,\n      });\n    }\n\n    // Call the base data provider\'s getList method with the updated filters\n    return baseDataProvider.getList({\n      resource,\n      filters,\n      meta,\n      ...props,\n    });\n  },\n};\n'))),(0,a.yg)("h3",{id:"examples"},"Examples"),(0,a.yg)(g,{id:"examples",mdxType:"DocThumbsUpDownFeedbackWidget"},(0,a.yg)("p",null,"Here are some examples of multi-tenant apps built with ",(0,a.yg)("a",{parentName:"p",href:"https://refine.dev/enterprise/"},"Refine Enterprise Edition"),":"),(0,a.yg)("ul",null,(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("a",{parentName:"li",href:"https://refine.dev/templates/multitenancy-strapi/"},"Multitenancy App with Strapi")),(0,a.yg)("li",{parentName:"ul"},(0,a.yg)("a",{parentName:"li",href:"https://multitenancy-isolated.netlify.app/"},"Isolated Multitenancy App with Rest API")))))}T.isMDXComponent=!0}}]);