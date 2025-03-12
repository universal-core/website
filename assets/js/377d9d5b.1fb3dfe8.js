"use strict";(self.webpackChunkdocumentation=self.webpackChunkdocumentation||[]).push([[54694],{58860:(e,t,a)=>{a.d(t,{xA:()=>d,yg:()=>g});var n=a(37953);function r(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function o(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function i(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?o(Object(a),!0).forEach((function(t){r(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):o(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function s(e,t){if(null==e)return{};var a,n,r=function(e,t){if(null==e)return{};var a,n,r={},o=Object.keys(e);for(n=0;n<o.length;n++)a=o[n],t.indexOf(a)>=0||(r[a]=e[a]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)a=o[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}var p=n.createContext({}),l=function(e){var t=n.useContext(p),a=t;return e&&(a="function"==typeof e?e(t):i(i({},t),e)),a},d=function(e){var t=l(e.components);return n.createElement(p.Provider,{value:t},e.children)},u="mdxType",c={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},m=n.forwardRef((function(e,t){var a=e.components,r=e.mdxType,o=e.originalType,p=e.parentName,d=s(e,["components","mdxType","originalType","parentName"]),u=l(a),m=r,g=u["".concat(p,".").concat(m)]||u[m]||c[m]||o;return a?n.createElement(g,i(i({ref:t},d),{},{components:a})):n.createElement(g,i({ref:t},d))}));function g(e,t){var a=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=a.length,i=new Array(o);i[0]=m;var s={};for(var p in t)hasOwnProperty.call(t,p)&&(s[p]=t[p]);s.originalType=e,s[u]="string"==typeof e?e:r,i[1]=s;for(var l=2;l<o;l++)i[l]=a[l];return n.createElement.apply(null,i)}return n.createElement.apply(null,a)}m.displayName="MDXCreateElement"},10531:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>d,contentTitle:()=>p,default:()=>v,frontMatter:()=>s,metadata:()=>l,toc:()=>u});a(37953);var n=a(58860);function r(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function o(e,t){return t=null!=t?t:{},Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):function(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}(Object(t)).forEach((function(a){Object.defineProperty(e,a,Object.getOwnPropertyDescriptor(t,a))})),e}function i(e,t){if(null==e)return{};var a,n,r=function(e,t){if(null==e)return{};var a,n,r={},o=Object.keys(e);for(n=0;n<o.length;n++)a=o[n],t.indexOf(a)>=0||(r[a]=e[a]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)a=o[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}const s={title:"GraphQL",source:"https://github.com/refinedev/refine/tree/master/packages/graphql",swizzle:!0},p=void 0,l={unversionedId:"data/packages/graphql/index",id:"data/packages/graphql/index",title:"GraphQL",description:"Refine provides a data provider for GraphQL APIs that has all the features of Refine without giving up the GraphQL features.",source:"@site/docs/data/packages/graphql/index.md",sourceDirName:"data/packages/graphql",slug:"/data/packages/graphql/",permalink:"/docs/data/packages/graphql/",draft:!1,editUrl:"https://github.com/refinedev/refine/tree/master/documentation/docs/data/packages/graphql/index.md",tags:[],version:"current",lastUpdatedBy:"Matteo Roggia",lastUpdatedAt:1741814323,formattedLastUpdatedAt:"Mar 12, 2025",frontMatter:{title:"GraphQL",source:"https://github.com/refinedev/refine/tree/master/packages/graphql",swizzle:!0},sidebar:"mainSidebar",previous:{title:"Appwrite",permalink:"/docs/data/packages/appwrite/"},next:{title:"Simple REST",permalink:"/docs/data/packages/simple-rest/"}},d={},u=[{value:"Installation",id:"installation",level:2},{value:"Usage",id:"usage",level:2},{value:"Options",id:"options",level:3},{value:"Realtime",id:"realtime",level:2},{value:"Queries and Mutations",id:"queries-and-mutations",level:2},{value:"Authentication",id:"authentication",level:2},{value:"Usage with Inferencer",id:"usage-with-inferencer",level:2},{value:"Example",id:"example",level:2}],c=e=>function(t){return console.warn("Component "+e+" was not imported, exported, or provided by MDXProvider as global scope"),(0,n.yg)("div",t)},m=c("DocThumbsUpDownFeedbackWidget"),g=c("InstallPackagesCommand"),y=c("CodeSandboxExample"),h={toc:u},f="wrapper";function v(e){var{components:t}=e,a=i(e,["components"]);return(0,n.yg)(f,o(function(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{},n=Object.keys(a);"function"==typeof Object.getOwnPropertySymbols&&(n=n.concat(Object.getOwnPropertySymbols(a).filter((function(e){return Object.getOwnPropertyDescriptor(a,e).enumerable})))),n.forEach((function(t){r(e,t,a[t])}))}return e}({},h,a),{components:t,mdxType:"MDXLayout"}),(0,n.yg)("p",null,"Refine provides a data provider for GraphQL APIs that has all the features of Refine without giving up the GraphQL features."),(0,n.yg)("admonition",{title:"Good to know",type:"simple"},(0,n.yg)("ul",{parentName:"admonition"},(0,n.yg)("li",{parentName:"ul"},"GraphQL Data Provider expects ",(0,n.yg)("a",{parentName:"li",href:"https://github.com/urql-graphql/urql"},(0,n.yg)("inlineCode",{parentName:"a"},"@urql/core"))," client instance."),(0,n.yg)("li",{parentName:"ul"},"You are responsible for passing ",(0,n.yg)("inlineCode",{parentName:"li"},"gqlQuery"),", ",(0,n.yg)("inlineCode",{parentName:"li"},"gqlMutation"),". ",(0,n.yg)("inlineCode",{parentName:"li"},"gql")," export of ",(0,n.yg)("inlineCode",{parentName:"li"},"@urql/core")," can be used to write GraphQL Operations."),(0,n.yg)("li",{parentName:"ul"},"To learn more about data fetching in Refine, check out the ",(0,n.yg)("a",{parentName:"li",href:"/docs/guides-concepts/data-fetching"},"Data Fetching")," guide."))),(0,n.yg)("h2",{id:"installation"},"Installation"),(0,n.yg)(m,{id:"installation",mdxType:"DocThumbsUpDownFeedbackWidget"},(0,n.yg)(g,{args:"@refinedev/graphql @urql/core graphql-ws",mdxType:"InstallPackagesCommand"})),(0,n.yg)("h2",{id:"usage"},"Usage"),(0,n.yg)(m,{id:"usage",mdxType:"DocThumbsUpDownFeedbackWidget"},(0,n.yg)("p",null,"We'll create a GraphQL Client with our API url and pass it to the ",(0,n.yg)("inlineCode",{parentName:"p"},"dataProvider")," function to create a data provider."),(0,n.yg)("pre",null,(0,n.yg)("code",{parentName:"pre",className:"language-tsx",metastring:'title="app.tsx"',title:'"app.tsx"'},'import Refine from "@refinedev/core";\nimport { Client, fetchExchange } from "@urql/core";\nimport createDataProvider from "@refinedev/graphql";\n\nexport const API_URL = "https://api.nestjs-query.refine.dev/graphql";\n\nconst gqlClient = new Client({ url: API_URL, exchanges: [fetchExchange] });\n\nconst dataProvider = createDataProvider(gqlClient);\n\nconst App = () => <Refine dataProvider={dataProvider}>{/* ... */}</Refine>;\n'))),(0,n.yg)("h3",{id:"options"},"Options"),(0,n.yg)(m,{id:"options",mdxType:"DocThumbsUpDownFeedbackWidget"},(0,n.yg)("p",null,"It's also possible to pass a 2nd parameter to GraphQL data provider. 2nd parameter is an object that consist of builder pieces for each data provider method such as getList, updateMany, etc...\nAll fields in this options config are optional and fields that are provided will be deep merged into default options. So you can just pass certain methods you want to override, and the rest will fallback to default."),(0,n.yg)("p",null,"Let's say you have the following query:"),(0,n.yg)("pre",null,(0,n.yg)("code",{parentName:"pre",className:"language-graphql"},"query PostList($where: JSON, $sort: String) {\n  allBlogPosts(where: $where, sort: $sort) {\n    nodes {\n      id\n      title\n      content\n      category {\n        id\n      }\n    }\n  }\n}\n")),(0,n.yg)("p",null,"By default, our data provider expects a plural form of the resource in the response, so if you have ",(0,n.yg)("inlineCode",{parentName:"p"},"allPosts"),", you would need to swizzle GraphQL data provider and customize it yourself. With these options, we help you extract data from your response. So you don't need to create custom data provider for such cases."),(0,n.yg)("pre",null,(0,n.yg)("code",{parentName:"pre",className:"language-ts"},'import dataProvider, {\n  GraphQLClient,\n  defaultGetDataFn,\n} from "@refinedev/graphql";\nimport camelCase from "camelcase";\n\nconst client = /** client init **/\n\nconst dataProvider = createDataProvider(client, {\n  getList: {\n     dataMapper: (response: OperationResult<any>, params: GetListParams) => {\n      // resource: blogPosts\n      const operationName = `all${camelcase(resource, {pascal: true})}`\n      // operationName: allBlogPosts\n      return response.data?.[operationName].nodes;\n    },\n  }\n})\n')),(0,n.yg)("pre",null,(0,n.yg)("code",{parentName:"pre",className:"language-typescript"},"type ActionMethod = {\n  dataMapper: (\n    response: OperationResult<any>,\n    params: GetOneParams | GetListParams | etc,\n  ) => {} | [];\n  buildVariables: (params: CreateParams | UpdateParams | etc) => {};\n};\n")),(0,n.yg)("p",null,"We have ActionMethod type for each of the data provider actions. Additionally, ",(0,n.yg)("inlineCode",{parentName:"p"},"getOne")," has ",(0,n.yg)("inlineCode",{parentName:"p"},"convertMutationToQuery")," and ",(0,n.yg)("inlineCode",{parentName:"p"},"getList")," has ",(0,n.yg)("inlineCode",{parentName:"p"},"getTotalCount")," methods."),(0,n.yg)("p",null,(0,n.yg)("inlineCode",{parentName:"p"},"convertMutationToQuery")," method on ",(0,n.yg)("inlineCode",{parentName:"p"},"getOne")," might be needed because ",(0,n.yg)("inlineCode",{parentName:"p"},"useForm")," hook also uses it. ",(0,n.yg)("inlineCode",{parentName:"p"},"useForm")," hook has an optional gqlQuery field, we may only get ",(0,n.yg)("inlineCode",{parentName:"p"},"gqlMutation"),". For this reason, we need to convert mutation to query to get initial data on edit, if needed."),(0,n.yg)("p",null,(0,n.yg)("inlineCode",{parentName:"p"},"getTotalCount")," can be used to extract total count of the list query from the response."),(0,n.yg)("details",null,(0,n.yg)("summary",null,"See all options"),(0,n.yg)("pre",null,(0,n.yg)("code",{parentName:"pre",className:"language-typescript"},'import type {\n  CreateManyParams,\n  CreateParams,\n  CustomParams,\n  DeleteManyParams,\n  DeleteOneParams,\n  GetListParams,\n  GetManyParams,\n  GetOneParams,\n  UpdateManyParams,\n  UpdateParams,\n} from "@refinedev/core";\nimport type { OperationResult } from "@urql/core";\nimport { buildSorters, buildFilters, buildPagination } from "../utils";\n\nexport const defaultOptions = {\n  create: {\n    dataMapper: (response: OperationResult<any>, params: CreateParams<any>) =>\n      response,\n    buildVariables: (params: CreateParams<any>) => params.variables,\n  },\n  createMany: {\n    dataMapper: (\n      response: OperationResult<any>,\n      params: CreateManyParams<any>,\n    ) => response,\n    buildVariables: (params: CreateManyParams<any>) => params.variables,\n  },\n  getOne: {\n    dataMapper: (response: OperationResult<any>, params: GetOneParams) =>\n      response,\n    buildVariables: (params: GetOneParams) => ({ id: params.id }),\n    convertMutationToQuery: (params: GetOneParams) => {},\n  },\n  getList: {\n    dataMapper: (response: OperationResult<any>, params: GetListParams) =>\n      response,\n    getTotalCount: (response: OperationResult<any>, params: GetListParams) => 0,\n    buildSorters: (params: GetListParams) => buildSorters(params.sorters),\n    buildFilters: (params: GetListParams) => buildFilters(params.filters),\n    buildPagination: (params: GetListParams) =>\n      buildPagination(params.pagination),\n  },\n  getMany: {\n    buildFilter: (params: GetManyParams) => ({\n      filter: { id: { in: params.ids } },\n    }),\n    dataMapper: (response: OperationResult<any>, params: GetManyParams) =>\n      response,\n  },\n  update: {\n    dataMapper: (response: OperationResult<any>, params: UpdateParams<any>) =>\n      response,\n    buildVariables: (params: UpdateParams<any>) => params.variables,\n  },\n  updateMany: {\n    dataMapper: (\n      response: OperationResult<any>,\n      params: UpdateManyParams<any>,\n    ) => response,\n    buildVariables: (params: UpdateManyParams<any>) => params.variables,\n  },\n  deleteOne: {\n    dataMapper: (\n      response: OperationResult<any>,\n      params: DeleteOneParams<any>,\n    ) => response,\n  },\n  deleteMany: {\n    dataMapper: (\n      response: OperationResult<any>,\n      params: DeleteManyParams<any>,\n    ) => response,\n    buildVariables: (params: DeleteManyParams<any>) => params.variables,\n    custom: {\n      dataMapper: (response: OperationResult<any>, params: CustomParams) =>\n        response.data,\n      buildVariables: (params: CustomParams) => {},\n    },\n  },\n};\n')))),(0,n.yg)("h2",{id:"realtime"},"Realtime"),(0,n.yg)(m,{id:"realtime",mdxType:"DocThumbsUpDownFeedbackWidget"},(0,n.yg)("p",null,(0,n.yg)("inlineCode",{parentName:"p"},"@refinedev/graphql")," also provides a ",(0,n.yg)("inlineCode",{parentName:"p"},"createLiveProvider")," function to enable realtime features of Refine. These features are powered by GraphQL subscriptions and uses ",(0,n.yg)("a",{parentName:"p",href:"https://the-guild.dev/graphql/ws"},(0,n.yg)("inlineCode",{parentName:"a"},"graphql-ws"))," to handle the connections."),(0,n.yg)("pre",null,(0,n.yg)("code",{parentName:"pre",className:"language-tsx",metastring:'title="app.tsx"',title:'"app.tsx"'},'import Refine from "@refinedev/core";\nimport { createLiveProvider } from "@refinedev/graphql";\nimport createClient from "graphql-ws";\n\nconst WSS_URL = "wss://api.nestjs-query.refine.dev/graphql";\nconst wsClient = createClient({ url: WSS_URL });\n\nconst liveProvider = createLiveProvider(wsClient);\n\nconst App = () => (\n  <Refine\n    // highlight-next-line\n    liveProvider={liveProvider}\n    options={{ liveMode: "auto" }}\n  >\n    {/* ... */}\n  </Refine>\n);\n'))),(0,n.yg)("h2",{id:"queries-and-mutations"},"Queries and Mutations"),(0,n.yg)(m,{id:"queries-and-mutations",mdxType:"DocThumbsUpDownFeedbackWidget"},(0,n.yg)("p",null,"You can use ",(0,n.yg)("inlineCode",{parentName:"p"},"gql")," export from ",(0,n.yg)("inlineCode",{parentName:"p"},"@urql/core")," to write your queries and mutations."),(0,n.yg)("p",null,"Refine hooks' ",(0,n.yg)("inlineCode",{parentName:"p"},"meta")," object has ",(0,n.yg)("inlineCode",{parentName:"p"},"gqlQuery")," and ",(0,n.yg)("inlineCode",{parentName:"p"},"gqlMutation")," properties, you can use them to write your queries and mutations."),(0,n.yg)("p",null,"As a best-practice, we suggest writing your queries/mutations in a separate file, next to the component that uses it."),(0,n.yg)("pre",null,(0,n.yg)("code",{parentName:"pre",className:"language-tsx",metastring:'title="src/pages/posts/queries.ts"',title:'"src/pages/posts/queries.ts"'},'import gql from "graphql-tag";\n\nconst POSTS_LIST_QUERY = gql`\n  query PostList($where: JSON, $sort: String) {\n    posts(where: $where, sort: $sort) {\n      id\n      title\n      content\n      category {\n        id\n      }\n    }\n  }\n`;\n\nconst POST_CREATE_MUTATION = gql`\n  mutation createPost($input: createPostInput!) {\n    createPost(input: $input) {\n      id\n      title\n      content\n      category {\n        id\n      }\n    }\n  }\n`;\n')),(0,n.yg)("pre",null,(0,n.yg)("code",{parentName:"pre",className:"language-tsx",metastring:'title="src/pages/posts/list.tsx"',title:'"src/pages/posts/list.tsx"'},'import { useList } from "@refinedev/core";\nimport { POSTS_LIST_QUERY } from "./queries";\n\nexport const PostListPage () => {\n  const { data } = useList({\n    resource: "posts",\n    // highlight-next-line\n    meta: { gqlQuery: POSTS_LIST_QUERY },\n  });\n\n  return (\n    <div>\n      {/* ... */}\n    </div>\n  );\n}\n')),(0,n.yg)("pre",null,(0,n.yg)("code",{parentName:"pre",className:"language-tsx",metastring:'title="src/pages/posts/create.tsx"',title:'"src/pages/posts/create.tsx"'},'import { useForm } from "@refinedev/core";\nimport { POST_CREATE_MUTATION } from "./queries";\n\nexport const PostCreatePage () => {\n  const { formProps } = useForm({\n    resource: "posts",\n    // highlight-next-line\n    meta: { gqlMutation: POST_CREATE_MUTATION },\n  });\n\n  return (\n    <div>\n      {/* ... */}\n    </div>\n  );\n}\n'))),(0,n.yg)("h2",{id:"authentication"},"Authentication"),(0,n.yg)(m,{id:"authentication",mdxType:"DocThumbsUpDownFeedbackWidget"},(0,n.yg)("p",null,"If your API uses authentication, you can easily provide a custom fetcher for the requests and handle the authentication logic there. When creating a GraphQL Client, you can pass a ",(0,n.yg)("inlineCode",{parentName:"p"},"fetch")," function to the client options. This function will be used to append the authentication headers to the requests."),(0,n.yg)("p",null,"TBA: ",(0,n.yg)("a",{parentName:"p",href:"https://commerce.nearform.com/open-source/urql/docs/advanced/authentication/"},"https://commerce.nearform.com/open-source/urql/docs/advanced/authentication/")),(0,n.yg)("pre",null,(0,n.yg)("code",{parentName:"pre",className:"language-tsx",metastring:'title="data-provider.tsx"',title:'"data-provider.tsx"'},'import graphqlDataProvider, { GraphQLClient } from "@refinedev/graphql";\n\nconst client = new GraphQLClient(API_URL, {\n  fetch: (url: string, options: RequestInit) => {\n    return fetch(url, {\n      ...options,\n      headers: {\n        ...options.headers,\n        /**\n         * For demo purposes, we\'re using `localStorage` to access the token.\n         * You can use your own authentication logic here.\n         * In real world applications, you\'ll need to handle it in sync with your `authProvider`.\n         */\n        // highlight-next-line\n        Authorization: `Bearer ${localStorage.getItem("token")}`,\n      },\n    });\n  },\n});\n\n/**\n * Create the data provider with the custom client.\n */\nconst dataProvider = graphqlDataProvider(client);\n'))),(0,n.yg)("h2",{id:"usage-with-inferencer"},"Usage with Inferencer"),(0,n.yg)(m,{id:"usage-with-inferencer",mdxType:"DocThumbsUpDownFeedbackWidget"},(0,n.yg)("p",null,"You can also use ",(0,n.yg)("inlineCode",{parentName:"p"},"@refinedev/inferencer")," package to generate sample codes for your views. Since the GraphQL data providers rely on ",(0,n.yg)("inlineCode",{parentName:"p"},"meta")," fields, you'll need to provide some ",(0,n.yg)("inlineCode",{parentName:"p"},"meta")," values beforehand and then Inferencer will use these values to infer the fields of the data provider's response, generate a code and a preview."),(0,n.yg)("p",null,(0,n.yg)("a",{parentName:"p",href:"/docs/packages/list-of-packages#usage-with-graphql-backends-and-meta-values"},"Check out Inferencer docs for more information. ","\u2192"))),(0,n.yg)("h2",{id:"example"},"Example"),(0,n.yg)(m,{id:"example",mdxType:"DocThumbsUpDownFeedbackWidget"},(0,n.yg)(y,{path:"data-provider-nestjs-query",mdxType:"CodeSandboxExample"})))}v.isMDXComponent=!0}}]);