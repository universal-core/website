"use strict";(self.webpackChunkdocumentation=self.webpackChunkdocumentation||[]).push([[89881],{58860:(e,n,t)=>{t.d(n,{xA:()=>l,yg:()=>g});var r=t(37953);function o(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function i(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function a(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?i(Object(t),!0).forEach((function(n){o(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):i(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function p(e,n){if(null==e)return{};var t,r,o=function(e,n){if(null==e)return{};var t,r,o={},i=Object.keys(e);for(r=0;r<i.length;r++)t=i[r],n.indexOf(t)>=0||(o[t]=e[t]);return o}(e,n);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)t=i[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(o[t]=e[t])}return o}var s=r.createContext({}),d=function(e){var n=r.useContext(s),t=n;return e&&(t="function"==typeof e?e(n):a(a({},n),e)),t},l=function(e){var n=d(e.components);return r.createElement(s.Provider,{value:n},e.children)},c="mdxType",u={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},m=r.forwardRef((function(e,n){var t=e.components,o=e.mdxType,i=e.originalType,s=e.parentName,l=p(e,["components","mdxType","originalType","parentName"]),c=d(t),m=o,g=c["".concat(s,".").concat(m)]||c[m]||u[m]||i;return t?r.createElement(g,a(a({ref:n},l),{},{components:t})):r.createElement(g,a({ref:n},l))}));function g(e,n){var t=arguments,o=n&&n.mdxType;if("string"==typeof e||o){var i=t.length,a=new Array(i);a[0]=m;var p={};for(var s in n)hasOwnProperty.call(n,s)&&(p[s]=n[s]);p.originalType=e,p[c]="string"==typeof e?e:o,a[1]=p;for(var d=2;d<i;d++)a[d]=t[d];return r.createElement.apply(null,a)}return r.createElement.apply(null,t)}m.displayName="MDXCreateElement"},42858:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>l,contentTitle:()=>s,default:()=>y,frontMatter:()=>p,metadata:()=>d,toc:()=>c});t(37953);var r=t(58860);function o(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function i(e,n){return n=null!=n?n:{},Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):function(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})),e}function a(e,n){if(null==e)return{};var t,r,o=function(e,n){if(null==e)return{};var t,r,o={},i=Object.keys(e);for(r=0;r<i.length;r++)t=i[r],n.indexOf(t)>=0||(o[t]=e[t]);return o}(e,n);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)t=i[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(o[t]=e[t])}return o}const p={id:"list",title:"List",swizzle:!0},s=void 0,d={unversionedId:"api-reference/mantine/components/basic-views/list",id:"version-3.xx.xx/api-reference/mantine/components/basic-views/list",title:"List",description:"`` provides us a layout to display the page. It does not contain any logic but adds extra functionalities like a create button or giving the page titles.",source:"@site/versioned_docs/version-3.xx.xx/api-reference/mantine/components/basic-views/list.md",sourceDirName:"api-reference/mantine/components/basic-views",slug:"/api-reference/mantine/components/basic-views/list",permalink:"/docs/3.xx.xx/api-reference/mantine/components/basic-views/list",draft:!1,editUrl:"https://github.com/refinedev/refine/tree/master/documentation/versioned_docs/version-3.xx.xx/api-reference/mantine/components/basic-views/list.md",tags:[],version:"3.xx.xx",lastUpdatedBy:"Matteo Roggia",lastUpdatedAt:1741814323,formattedLastUpdatedAt:"Mar 12, 2025",frontMatter:{id:"list",title:"List",swizzle:!0},sidebar:"someSidebar",previous:{title:"Edit",permalink:"/docs/3.xx.xx/api-reference/mantine/components/basic-views/edit"},next:{title:"Show",permalink:"/docs/3.xx.xx/api-reference/mantine/components/basic-views/show"}},l={},c=[{value:"Properties",id:"properties",level:2},{value:"<code>title</code>",id:"title",level:3},{value:"<code>resource</code>",id:"resource",level:3},{value:"<code>canCreate</code> and <code>createButtonProps</code>",id:"cancreate-and-createbuttonprops",level:3},{value:"<code>breadcrumb</code>",id:"breadcrumb",level:3},{value:"<code>wrapperProps</code>",id:"wrapperprops",level:3},{value:"<code>headerProps</code>",id:"headerprops",level:3},{value:"<code>contentProps</code>",id:"contentprops",level:3},{value:"<code>headerButtons</code>",id:"headerbuttons",level:3},{value:"<code>headerButtonProps</code>",id:"headerbuttonprops",level:3},{value:"API Reference",id:"api-reference",level:2},{value:"Props",id:"props",level:3}],u=e=>function(n){return console.warn("Component "+e+" was not imported, exported, or provided by MDXProvider as global scope"),(0,r.yg)("div",n)},m=u("DocThumbsUpDownFeedbackWidget"),g=u("PropsTable"),h={toc:c},f="wrapper";function y(e){var{components:n}=e,t=a(e,["components"]);return(0,r.yg)(f,i(function(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{},r=Object.keys(t);"function"==typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(t).filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})))),r.forEach((function(n){o(e,n,t[n])}))}return e}({},h,t),{components:n,mdxType:"MDXLayout"}),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-tsx",metastring:"live shared",live:!0,shared:!0},'setRefineProps({\n  notificationProvider: RefineMantine.useNotificationProvider,\n  Layout: RefineMantine.Layout,\n  Sider: () => null,\n});\n\nconst Wrapper = ({ children }) => {\n  return (\n    <RefineMantine.MantineProvider\n      theme={RefineMantine.LightTheme}\n      withNormalizeCSS\n      withGlobalStyles\n    >\n      <RefineMantine.Global\n        styles={{ body: { WebkitFontSmoothing: "auto" } }}\n      />\n      <RefineMantine.NotificationsProvider position="top-right">\n        {children}\n      </RefineMantine.NotificationsProvider>\n    </RefineMantine.MantineProvider>\n  );\n};\n\ninterface ICategory {\n  id: number;\n  title: string;\n}\n\ninterface IPost {\n  id: number;\n  title: string;\n  content: string;\n  status: "published" | "draft" | "rejected";\n  category: { id: number };\n}\n')),(0,r.yg)("p",null,(0,r.yg)("inlineCode",{parentName:"p"},"<List>")," provides us a layout to display the page. It does not contain any logic but adds extra functionalities like a create button or giving the page titles."),(0,r.yg)("p",null,"We will show what ",(0,r.yg)("inlineCode",{parentName:"p"},"<List>")," does using properties with examples."),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-tsx",metastring:"live url=http://localhost:3000/posts previewHeight=420px hideCode",live:!0,url:"http://localhost:3000/posts",previewHeight:"420px",hideCode:!0},'setInitialRoutes(["/posts"]);\nimport { Refine } from "@pankod/refine-core";\nimport routerProvider from "@pankod/refine-react-router-v6";\nimport dataProvider from "@pankod/refine-simple-rest";\n\n// visible-block-start\nimport { List, DateField, Table, Pagination } from "@pankod/refine-mantine";\nimport { useTable, ColumnDef, flexRender } from "@pankod/refine-react-table";\n\nconst PostList: React.FC = () => {\n  const columns = React.useMemo<ColumnDef<IPost>[]>(\n    () => [\n      {\n        id: "id",\n        header: "ID",\n        accessorKey: "id",\n      },\n      {\n        id: "title",\n        header: "Title",\n        accessorKey: "title",\n      },\n      {\n        id: "status",\n        header: "Status",\n        accessorKey: "status",\n      },\n      {\n        id: "createdAt",\n        header: "Created At",\n        accessorKey: "createdAt",\n        cell: function render({ getValue }) {\n          return <DateField value={getValue() as string} format="LLL" />;\n        },\n      },\n    ],\n    [],\n  );\n\n  const {\n    getHeaderGroups,\n    getRowModel,\n    refineCore: { setCurrent, pageCount, current },\n  } = useTable({\n    columns,\n  });\n\n  return (\n    <List>\n      <Table>\n        <thead>\n          {getHeaderGroups().map((headerGroup) => (\n            <tr key={headerGroup.id}>\n              {headerGroup.headers.map((header) => (\n                <th key={header.id}>\n                  {header.isPlaceholder\n                    ? null\n                    : flexRender(\n                        header.column.columnDef.header,\n                        header.getContext(),\n                      )}\n                </th>\n              ))}\n            </tr>\n          ))}\n        </thead>\n        <tbody>\n          {getRowModel().rows.map((row) => (\n            <tr key={row.id}>\n              {row.getVisibleCells().map((cell) => (\n                <td key={cell.id}>\n                  {flexRender(cell.column.columnDef.cell, cell.getContext())}\n                </td>\n              ))}\n            </tr>\n          ))}\n        </tbody>\n      </Table>\n      <br />\n      <Pagination\n        position="right"\n        total={pageCount}\n        page={current}\n        onChange={setCurrent}\n      />\n    </List>\n  );\n};\n// visible-block-end\n\nconst App = () => {\n  return (\n    <Refine\n      routerProvider={routerProvider}\n      dataProvider={dataProvider("https://api.fake-rest.refine.dev")}\n      resources={[\n        {\n          name: "posts",\n          list: PostList,\n        },\n      ]}\n    />\n  );\n};\nrender(\n  <Wrapper>\n    <App />\n  </Wrapper>,\n);\n')),(0,r.yg)("admonition",{title:"Swizzle",type:"info-tip"},(0,r.yg)("p",{parentName:"admonition"},"You can swizzle this component to customize it with the ",(0,r.yg)("a",{parentName:"p",href:"/docs/3.xx.xx/packages/documentation/cli"},(0,r.yg)("strong",{parentName:"a"},"refine CLI")))),(0,r.yg)("h2",{id:"properties"},"Properties"),(0,r.yg)("h3",{id:"title"},(0,r.yg)("inlineCode",{parentName:"h3"},"title")),(0,r.yg)(m,{id:"title",mdxType:"DocThumbsUpDownFeedbackWidget"},(0,r.yg)("p",null,"It allows adding a title for the ",(0,r.yg)("inlineCode",{parentName:"p"},"<List>")," component. if you don't pass title props, it uses plural form of resource name by default."),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-tsx",metastring:"live url=http://localhost:3000/posts previewHeight=280px",live:!0,url:"http://localhost:3000/posts",previewHeight:"280px"},'setInitialRoutes(["/posts"]);\nimport { Refine } from "@pankod/refine-core";\nimport routerProvider from "@pankod/refine-react-router-v6";\nimport dataProvider from "@pankod/refine-simple-rest";\n\n// visible-block-start\nimport { List, Title } from "@pankod/refine-mantine";\n\nconst PostList: React.FC = () => {\n  return (\n    /* highlight-next-line */\n    <List title={<Title order={3}>Custom Title</Title>}>\n      <p>Rest of your page here</p>\n    </List>\n  );\n};\n// visible-block-end\n\nconst App = () => {\n  return (\n    <Refine\n      routerProvider={routerProvider}\n      dataProvider={dataProvider("https://api.fake-rest.refine.dev")}\n      resources={[\n        {\n          name: "posts",\n          list: PostList,\n        },\n      ]}\n    />\n  );\n};\nrender(\n  <Wrapper>\n    <App />\n  </Wrapper>,\n);\n'))),(0,r.yg)("h3",{id:"resource"},(0,r.yg)("inlineCode",{parentName:"h3"},"resource")),(0,r.yg)(m,{id:"resource",mdxType:"DocThumbsUpDownFeedbackWidget"},(0,r.yg)("p",null,(0,r.yg)("inlineCode",{parentName:"p"},"<List>")," component reads the ",(0,r.yg)("inlineCode",{parentName:"p"},"resource")," information from the route by default. This default behavior will not work on custom pages. If you want to use the ",(0,r.yg)("inlineCode",{parentName:"p"},"<List>")," component in a custom page, you can use the ",(0,r.yg)("inlineCode",{parentName:"p"},"resource")," prop."),(0,r.yg)("p",null,(0,r.yg)("a",{parentName:"p",href:"/docs/3.xx.xx/advanced-tutorials/custom-pages"},"Refer to the custom pages documentation for detailed usage. ","\u2192")),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-tsx",metastring:"live url=http://localhost:3000/custom previewHeight=280px",live:!0,url:"http://localhost:3000/custom",previewHeight:"280px"},'setInitialRoutes(["/custom"]);\n\n// visible-block-start\nimport { Refine } from "@pankod/refine-core";\nimport { List, Layout } from "@pankod/refine-mantine";\nimport routerProvider from "@pankod/refine-react-router-v6";\nimport dataProvider from "@pankod/refine-simple-rest";\n\nconst CustomPage: React.FC = () => {\n  return (\n    /* highlight-next-line */\n    <List resource="categories">\n      <p>Rest of your page here</p>\n    </List>\n  );\n};\n// visible-block-end\n\nconst App = () => {\n  return (\n    <Refine\n      routerProvider={{\n        ...routerProvider,\n        // highlight-start\n        routes: [\n          {\n            element: <CustomPage />,\n            path: "/custom",\n          },\n        ],\n        // highlight-end\n      }}\n      Layout={Layout}\n      dataProvider={dataProvider("https://api.fake-rest.refine.dev")}\n      resources={[{ name: "posts" }]}\n    />\n  );\n};\nrender(\n  <Wrapper>\n    <App />\n  </Wrapper>,\n);\n'))),(0,r.yg)("h3",{id:"cancreate-and-createbuttonprops"},(0,r.yg)("inlineCode",{parentName:"h3"},"canCreate")," and ",(0,r.yg)("inlineCode",{parentName:"h3"},"createButtonProps")),(0,r.yg)(m,{id:"cancreate-and-createbuttonprops",mdxType:"DocThumbsUpDownFeedbackWidget"},(0,r.yg)("p",null,(0,r.yg)("inlineCode",{parentName:"p"},"canCreate")," allows us to add the create button inside the ",(0,r.yg)("inlineCode",{parentName:"p"},"<List>")," component. If resource is passed a create component, ",(0,r.yg)("strong",{parentName:"p"},"refine")," adds the create button by default. If you want to customize this button you can use ",(0,r.yg)("inlineCode",{parentName:"p"},"createButtonProps")," property like the code below."),(0,r.yg)("p",null,"Create button redirects to the create page of the resource according to the value it reads from the URL."),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-tsx",metastring:"live url=http://localhost:3000/posts previewHeight=280px",live:!0,url:"http://localhost:3000/posts",previewHeight:"280px"},'setInitialRoutes(["/posts"]);\nimport { Refine } from "@pankod/refine-core";\nimport routerProvider from "@pankod/refine-react-router-v6";\nimport dataProvider from "@pankod/refine-simple-rest";\n\n// visible-block-start\nimport { List } from "@pankod/refine-mantine";\nimport { usePermissions } from "@pankod/refine-core";\n\nconst PostList: React.FC = () => {\n  const { data: permissionsData } = usePermissions();\n  return (\n    <List\n      /* highlight-start */\n      canCreate={permissionsData?.includes("admin")}\n      createButtonProps={{ variant: "subtle" }}\n      /* highlight-end */\n    >\n      <p>Rest of your page here</p>\n    </List>\n  );\n};\n// visible-block-end\n\nconst App = () => {\n  const simpleRestDataProvider = dataProvider(\n    "https://api.fake-rest.refine.dev",\n  );\n\n  const customDataProvider = {\n    ...simpleRestDataProvider,\n    deleteOne: async ({ resource, id, variables }) => {\n      return {\n        data: {},\n      };\n    },\n  };\n\n  const authProvider = {\n    login: () => Promise.resolve(),\n    logout: () => Promise.resolve(),\n    checkAuth: () => Promise.resolve(),\n    checkError: () => Promise.resolve(),\n    getPermissions: () => Promise.resolve("admin"),\n    getUserIdentity: () => Promise.resolve(),\n  };\n\n  return (\n    <Refine\n      routerProvider={routerProvider}\n      dataProvider={customDataProvider}\n      authProvider={authProvider}\n      resources={[\n        {\n          name: "posts",\n          list: PostList,\n        },\n      ]}\n    />\n  );\n};\nrender(\n  <Wrapper>\n    <App />\n  </Wrapper>,\n);\n'))),(0,r.yg)("h3",{id:"breadcrumb"},(0,r.yg)("inlineCode",{parentName:"h3"},"breadcrumb")),(0,r.yg)(m,{id:"breadcrumb",mdxType:"DocThumbsUpDownFeedbackWidget"},(0,r.yg)("p",null,"To customize or disable the breadcrumb, you can use the ",(0,r.yg)("inlineCode",{parentName:"p"},"breadcrumb")," property. By default it uses the ",(0,r.yg)("inlineCode",{parentName:"p"},"Breadcrumb")," component from ",(0,r.yg)("inlineCode",{parentName:"p"},"@pankod/refine-mantine")," package."),(0,r.yg)("p",null,(0,r.yg)("a",{parentName:"p",href:"/docs/3.xx.xx/api-reference/mantine/components/breadcrumb"},"Refer to the ",(0,r.yg)("inlineCode",{parentName:"a"},"Breadcrumb")," documentation for detailed usage. ","\u2192")),(0,r.yg)("admonition",{type:"tip"},(0,r.yg)("p",{parentName:"admonition"},"This feature can be managed globally via the ",(0,r.yg)("inlineCode",{parentName:"p"},"<Refine>")," component's ",(0,r.yg)("a",{parentName:"p",href:"/docs/3.xx.xx/api-reference/core/components/refine-config/#breadcrumb"},"options"))),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-tsx",metastring:"live url=http://localhost:3000/posts previewHeight=280px",live:!0,url:"http://localhost:3000/posts",previewHeight:"280px"},'setInitialRoutes(["/posts"]);\nimport { Refine } from "@pankod/refine-core";\nimport routerProvider from "@pankod/refine-react-router-v6";\nimport dataProvider from "@pankod/refine-simple-rest";\n\n// visible-block-start\nimport { List } from "@pankod/refine-mantine";\n\nconst CustomBreadcrumb: React.FC = () => {\n  return (\n    <p\n      style={{\n        padding: "3px 6px",\n        border: "2px dashed cornflowerblue",\n      }}\n    >\n      My Custom Breadcrumb\n    </p>\n  );\n};\n\nconst PostList: React.FC = () => {\n  return (\n    <List\n      // highlight-start\n      breadcrumb={<CustomBreadcrumb />}\n      // highlight-end\n    >\n      <p>Rest of your page here</p>\n    </List>\n  );\n};\n// visible-block-end\n\nconst App = () => {\n  return (\n    <Refine\n      routerProvider={routerProvider}\n      dataProvider={dataProvider("https://api.fake-rest.refine.dev")}\n      resources={[\n        {\n          name: "posts",\n          list: PostList,\n        },\n      ]}\n    />\n  );\n};\nrender(\n  <Wrapper>\n    <App />\n  </Wrapper>,\n);\n'))),(0,r.yg)("h3",{id:"wrapperprops"},(0,r.yg)("inlineCode",{parentName:"h3"},"wrapperProps")),(0,r.yg)(m,{id:"wrapperprops",mdxType:"DocThumbsUpDownFeedbackWidget"},(0,r.yg)("p",null,"If you want to customize the wrapper of the ",(0,r.yg)("inlineCode",{parentName:"p"},"<List/>")," component, you can use the ",(0,r.yg)("inlineCode",{parentName:"p"},"wrapperProps")," property. For ",(0,r.yg)("inlineCode",{parentName:"p"},"@pankod/refine-mantine")," wrapper element is ",(0,r.yg)("inlineCode",{parentName:"p"},"<Card>"),"s and ",(0,r.yg)("inlineCode",{parentName:"p"},"wrapperProps")," can get every attribute that ",(0,r.yg)("inlineCode",{parentName:"p"},"<Card>")," can get."),(0,r.yg)("p",null,(0,r.yg)("a",{parentName:"p",href:"https://mantine.dev/core/card/"},"Refer to the ",(0,r.yg)("inlineCode",{parentName:"a"},"Card")," documentation from Mantine for detailed usage. ","\u2192")),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-tsx",metastring:"live url=http://localhost:3000/posts previewHeight=280px",live:!0,url:"http://localhost:3000/posts",previewHeight:"280px"},'setInitialRoutes(["/posts"]);\nimport { Refine } from "@pankod/refine-core";\nimport routerProvider from "@pankod/refine-react-router-v6";\nimport dataProvider from "@pankod/refine-simple-rest";\n\n// visible-block-start\nimport { List } from "@pankod/refine-mantine";\n\nconst PostList: React.FC = () => {\n  return (\n    <List\n      // highlight-start\n      wrapperProps={{\n        style: {\n          border: "2px dashed cornflowerblue",\n          padding: "16px",\n        },\n      }}\n      // highlight-end\n    >\n      <p>Rest of your page here</p>\n    </List>\n  );\n};\n// visible-block-end\n\nconst App = () => {\n  return (\n    <Refine\n      routerProvider={routerProvider}\n      dataProvider={dataProvider("https://api.fake-rest.refine.dev")}\n      resources={[\n        {\n          name: "posts",\n          list: PostList,\n        },\n      ]}\n    />\n  );\n};\nrender(\n  <Wrapper>\n    <App />\n  </Wrapper>,\n);\n'))),(0,r.yg)("h3",{id:"headerprops"},(0,r.yg)("inlineCode",{parentName:"h3"},"headerProps")),(0,r.yg)(m,{id:"headerprops",mdxType:"DocThumbsUpDownFeedbackWidget"},(0,r.yg)("p",null,"If you want to customize the header of the ",(0,r.yg)("inlineCode",{parentName:"p"},"<List/>")," component, you can use the ",(0,r.yg)("inlineCode",{parentName:"p"},"headerProps")," property."),(0,r.yg)("p",null,(0,r.yg)("a",{parentName:"p",href:"https://mantine.dev/core/group/"},"Refer to the ",(0,r.yg)("inlineCode",{parentName:"a"},"Group")," documentation from Mantine for detailed usage. ","\u2192")),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-tsx",metastring:"live url=http://localhost:3000/posts previewHeight=280px",live:!0,url:"http://localhost:3000/posts",previewHeight:"280px"},'setInitialRoutes(["/posts"]);\nimport { Refine } from "@pankod/refine-core";\nimport routerProvider from "@pankod/refine-react-router-v6";\nimport dataProvider from "@pankod/refine-simple-rest";\n\n// visible-block-start\nimport { List } from "@pankod/refine-mantine";\n\nconst PostList: React.FC = () => {\n  return (\n    <List\n      // highlight-start\n      headerProps={{\n        style: {\n          border: "2px dashed cornflowerblue",\n          padding: "16px",\n        },\n      }}\n      // highlight-end\n    >\n      <p>Rest of your page here</p>\n    </List>\n  );\n};\n// visible-block-end\n\nconst App = () => {\n  return (\n    <Refine\n      routerProvider={routerProvider}\n      dataProvider={dataProvider("https://api.fake-rest.refine.dev")}\n      resources={[\n        {\n          name: "posts",\n          list: PostList,\n        },\n      ]}\n    />\n  );\n};\nrender(\n  <Wrapper>\n    <App />\n  </Wrapper>,\n);\n'))),(0,r.yg)("h3",{id:"contentprops"},(0,r.yg)("inlineCode",{parentName:"h3"},"contentProps")),(0,r.yg)(m,{id:"contentprops",mdxType:"DocThumbsUpDownFeedbackWidget"},(0,r.yg)("p",null,"If you want to customize the content of the ",(0,r.yg)("inlineCode",{parentName:"p"},"<List/>")," component, you can use the ",(0,r.yg)("inlineCode",{parentName:"p"},"contentProps")," property."),(0,r.yg)("p",null,(0,r.yg)("a",{parentName:"p",href:"https://mantine.dev/core/box/"},"Refer to the ",(0,r.yg)("inlineCode",{parentName:"a"},"Box")," documentation from Mantine for detailed usage. ","\u2192")),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-tsx",metastring:"live url=http://localhost:3000/posts previewHeight=280px",live:!0,url:"http://localhost:3000/posts",previewHeight:"280px"},'setInitialRoutes(["/posts"]);\nimport { Refine } from "@pankod/refine-core";\nimport routerProvider from "@pankod/refine-react-router-v6";\nimport dataProvider from "@pankod/refine-simple-rest";\n\n// visible-block-start\nimport { List } from "@pankod/refine-mantine";\n\nconst PostList: React.FC = () => {\n  return (\n    <List\n      // highlight-start\n      contentProps={{\n        style: {\n          border: "2px dashed cornflowerblue",\n          padding: "16px",\n        },\n      }}\n      // highlight-end\n    >\n      <p>Rest of your page here</p>\n    </List>\n  );\n};\n// visible-block-end\n\nconst App = () => {\n  return (\n    <Refine\n      routerProvider={routerProvider}\n      dataProvider={dataProvider("https://api.fake-rest.refine.dev")}\n      resources={[\n        {\n          name: "posts",\n          list: PostList,\n        },\n      ]}\n    />\n  );\n};\nrender(\n  <Wrapper>\n    <App />\n  </Wrapper>,\n);\n'))),(0,r.yg)("h3",{id:"headerbuttons"},(0,r.yg)("inlineCode",{parentName:"h3"},"headerButtons")),(0,r.yg)(m,{id:"headerbuttons",mdxType:"DocThumbsUpDownFeedbackWidget"},(0,r.yg)("p",null,"You can customize the buttons at the header by using the ",(0,r.yg)("inlineCode",{parentName:"p"},"headerButtons")," property. It accepts ",(0,r.yg)("inlineCode",{parentName:"p"},"React.ReactNode")," or a render function ",(0,r.yg)("inlineCode",{parentName:"p"},"({ defaultButtons }) => React.ReactNode")," which you can use to keep the existing buttons and add your own."),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-tsx",metastring:"live url=http://localhost:3000/posts previewHeight=280px",live:!0,url:"http://localhost:3000/posts",previewHeight:"280px"},'setInitialRoutes(["/posts"]);\nimport { Refine } from "@pankod/refine-core";\nimport routerProvider from "@pankod/refine-react-router-v6";\nimport dataProvider from "@pankod/refine-simple-rest";\n\n// visible-block-start\nimport { List, Button } from "@pankod/refine-mantine";\n\nconst PostList: React.FC = () => {\n  return (\n    <List\n      // highlight-start\n      headerButtons={({ defaultButtons }) => (\n        <>\n          {defaultButtons}\n          <Button variant="outline" type="primary">\n            Custom Button\n          </Button>\n        </>\n      )}\n      // highlight-end\n    >\n      <p>Rest of your page here</p>\n    </List>\n  );\n};\n// visible-block-end\n\nconst App = () => {\n  return (\n    <Refine\n      routerProvider={routerProvider}\n      dataProvider={dataProvider("https://api.fake-rest.refine.dev")}\n      resources={[\n        {\n          name: "posts",\n          list: PostList,\n        },\n      ]}\n    />\n  );\n};\nrender(\n  <Wrapper>\n    <App />\n  </Wrapper>,\n);\n'))),(0,r.yg)("h3",{id:"headerbuttonprops"},(0,r.yg)("inlineCode",{parentName:"h3"},"headerButtonProps")),(0,r.yg)(m,{id:"headerbuttonprops",mdxType:"DocThumbsUpDownFeedbackWidget"},(0,r.yg)("p",null,"You can customize the wrapper element of the buttons at the header by using the ",(0,r.yg)("inlineCode",{parentName:"p"},"headerButtonProps")," property."),(0,r.yg)("p",null,(0,r.yg)("a",{parentName:"p",href:"https://mantine.dev/core/group/"},"Refer to the ",(0,r.yg)("inlineCode",{parentName:"a"},"Group")," documentation from Mantine for detailed usage. ","\u2192")),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-tsx",metastring:"live url=http://localhost:3000/posts previewHeight=280px",live:!0,url:"http://localhost:3000/posts",previewHeight:"280px"},'setInitialRoutes(["/posts"]);\nimport { Refine } from "@pankod/refine-core";\nimport routerProvider from "@pankod/refine-react-router-v6";\nimport dataProvider from "@pankod/refine-simple-rest";\n\n// visible-block-start\nimport { List, Button } from "@pankod/refine-mantine";\n\nconst PostList: React.FC = () => {\n  return (\n    <List\n      // highlight-start\n      headerButtonProps={{\n        style: {\n          border: "2px dashed cornflowerblue",\n          padding: "16px",\n        },\n      }}\n      // highlight-end\n      headerButtons={\n        <Button variant="outline" type="primary">\n          Custom Button\n        </Button>\n      }\n    >\n      <p>Rest of your page here</p>\n    </List>\n  );\n};\n// visible-block-end\n\nconst App = () => {\n  return (\n    <Refine\n      routerProvider={routerProvider}\n      dataProvider={dataProvider("https://api.fake-rest.refine.dev")}\n      resources={[\n        {\n          name: "posts",\n          list: PostList,\n        },\n      ]}\n    />\n  );\n};\nrender(\n  <Wrapper>\n    <App />\n  </Wrapper>,\n);\n'))),(0,r.yg)("h2",{id:"api-reference"},"API Reference"),(0,r.yg)("h3",{id:"props"},"Props"),(0,r.yg)(m,{id:"props",mdxType:"DocThumbsUpDownFeedbackWidget"},(0,r.yg)(g,{module:"@pankod/refine-mantine/List","title-default":"`<Title order={3}>{resource.name}</Title>`",mdxType:"PropsTable"})))}y.isMDXComponent=!0}}]);