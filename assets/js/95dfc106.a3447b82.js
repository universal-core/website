"use strict";(self.webpackChunkdocumentation=self.webpackChunkdocumentation||[]).push([[75033],{58860:(e,n,t)=>{t.d(n,{xA:()=>l,yg:()=>g});var o=t(37953);function r(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function i(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);n&&(o=o.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,o)}return t}function a(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?i(Object(t),!0).forEach((function(n){r(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):i(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function s(e,n){if(null==e)return{};var t,o,r=function(e,n){if(null==e)return{};var t,o,r={},i=Object.keys(e);for(o=0;o<i.length;o++)t=i[o],n.indexOf(t)>=0||(r[t]=e[t]);return r}(e,n);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(o=0;o<i.length;o++)t=i[o],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(r[t]=e[t])}return r}var p=o.createContext({}),d=function(e){var n=o.useContext(p),t=n;return e&&(t="function"==typeof e?e(n):a(a({},n),e)),t},l=function(e){var n=d(e.components);return o.createElement(p.Provider,{value:n},e.children)},c="mdxType",h={inlineCode:"code",wrapper:function(e){var n=e.children;return o.createElement(o.Fragment,{},n)}},u=o.forwardRef((function(e,n){var t=e.components,r=e.mdxType,i=e.originalType,p=e.parentName,l=s(e,["components","mdxType","originalType","parentName"]),c=d(t),u=r,g=c["".concat(p,".").concat(u)]||c[u]||h[u]||i;return t?o.createElement(g,a(a({ref:n},l),{},{components:t})):o.createElement(g,a({ref:n},l))}));function g(e,n){var t=arguments,r=n&&n.mdxType;if("string"==typeof e||r){var i=t.length,a=new Array(i);a[0]=u;var s={};for(var p in n)hasOwnProperty.call(n,p)&&(s[p]=n[p]);s.originalType=e,s[c]="string"==typeof e?e:r,a[1]=s;for(var d=2;d<i;d++)a[d]=t[d];return o.createElement.apply(null,a)}return o.createElement.apply(null,t)}u.displayName="MDXCreateElement"},5212:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>l,contentTitle:()=>p,default:()=>f,frontMatter:()=>s,metadata:()=>d,toc:()=>c});t(37953);var o=t(58860);function r(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function i(e,n){return n=null!=n?n:{},Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):function(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);n&&(o=o.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,o)}return t}(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})),e}function a(e,n){if(null==e)return{};var t,o,r=function(e,n){if(null==e)return{};var t,o,r={},i=Object.keys(e);for(o=0;o<i.length;o++)t=i[o],n.indexOf(t)>=0||(r[t]=e[t]);return r}(e,n);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(o=0;o<i.length;o++)t=i[o],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(r[t]=e[t])}return r}const s={id:"show",title:"Show",swizzle:!0},p=void 0,d={unversionedId:"api-reference/antd/components/basic-views/show",id:"version-3.xx.xx/api-reference/antd/components/basic-views/show",title:"Show",description:"`` provides us a layout for displaying the page. It does not contain any logic but adds extra functionalities like a refresh button or giving title to the page.",source:"@site/versioned_docs/version-3.xx.xx/api-reference/antd/components/basic-views/show.md",sourceDirName:"api-reference/antd/components/basic-views",slug:"/api-reference/antd/components/basic-views/show",permalink:"/docs/3.xx.xx/api-reference/antd/components/basic-views/show",draft:!1,editUrl:"https://github.com/refinedev/refine/tree/master/documentation/versioned_docs/version-3.xx.xx/api-reference/antd/components/basic-views/show.md",tags:[],version:"3.xx.xx",lastUpdatedBy:"Matteo Roggia",lastUpdatedAt:1741814323,formattedLastUpdatedAt:"Mar 12, 2025",frontMatter:{id:"show",title:"Show",swizzle:!0},sidebar:"someSidebar",previous:{title:"List",permalink:"/docs/3.xx.xx/api-reference/antd/components/basic-views/list"},next:{title:"Breadcrumb",permalink:"/docs/3.xx.xx/api-reference/antd/components/breadcrumb"}},l={},c=[{value:"Properties",id:"properties",level:2},{value:"<code>title</code>",id:"title",level:3},{value:"<code>resource</code>",id:"resource",level:3},{value:"<code>canDelete</code> and <code>canEdit</code>",id:"candelete-and-canedit",level:3},{value:"<code>recordItemId</code>",id:"recorditemid",level:3},{value:"<code>dataProviderName</code>",id:"dataprovidername",level:3},{value:"<code>goBack</code>",id:"goback",level:3},{value:"<code>isLoading</code>",id:"isloading",level:3},{value:"<code>breadcrumb</code>",id:"breadcrumb",level:3},{value:"<code>wrapperProps</code>",id:"wrapperprops",level:3},{value:"<code>headerProps</code>",id:"headerprops",level:3},{value:"<code>contentProps</code>",id:"contentprops",level:3},{value:"<code>headerButtons</code>",id:"headerbuttons",level:3},{value:"<code>headerButtonProps</code>",id:"headerbuttonprops",level:3},{value:"<code>footerButtons</code>",id:"footerbuttons",level:3},{value:"<code>footerButtonProps</code>",id:"footerbuttonprops",level:3},{value:"API Reference",id:"api-reference",level:2},{value:"Properties",id:"properties-1",level:3}],h=e=>function(n){return console.warn("Component "+e+" was not imported, exported, or provided by MDXProvider as global scope"),(0,o.yg)("div",n)},u=h("DocThumbsUpDownFeedbackWidget"),g=h("PropsTable"),m={toc:c},y="wrapper";function f(e){var{components:n}=e,t=a(e,["components"]);return(0,o.yg)(y,i(function(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{},o=Object.keys(t);"function"==typeof Object.getOwnPropertySymbols&&(o=o.concat(Object.getOwnPropertySymbols(t).filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})))),o.forEach((function(n){r(e,n,t[n])}))}return e}({},m,t),{components:n,mdxType:"MDXLayout"}),(0,o.yg)("p",null,(0,o.yg)("inlineCode",{parentName:"p"},"<Show>")," provides us a layout for displaying the page. It does not contain any logic but adds extra functionalities like a refresh button or giving title to the page."),(0,o.yg)("p",null,"We will show what ",(0,o.yg)("inlineCode",{parentName:"p"},"<Show>")," does using properties with examples."),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-tsx",metastring:"live hideCode url=http://localhost:3000/posts/show/2",live:!0,hideCode:!0,url:"http://localhost:3000/posts/show/2"},'// visible-block-start\nimport { Show, Typography, MarkdownField } from "@pankod/refine-antd";\nimport { useShow, IResourceComponentsProps, useOne } from "@pankod/refine-core";\n\nconst { Title, Text } = Typography;\n\nconst PostShow: React.FC<IResourceComponentsProps> = () => {\n  const { queryResult } = useShow<IPost>();\n  const { data, isLoading } = queryResult;\n  const record = data?.data;\n\n  const { data: categoryData, isLoading: categoryIsLoading } =\n    useOne<ICategory>({\n      resource: "categories",\n      id: record?.category.id || "",\n      queryOptions: {\n        enabled: !!record,\n      },\n    });\n\n  return (\n    <Show isLoading={isLoading}>\n      <Title level={5}>Id</Title>\n      <Text>{record?.id}</Text>\n\n      <Title level={5}>Title</Title>\n      <Text>{record?.title}</Text>\n\n      <Title level={5}>Category</Title>\n      <Text>{categoryIsLoading ? "Loading..." : categoryData?.data.title}</Text>\n\n      <Title level={5}>Content</Title>\n      <MarkdownField value={record?.content} />\n    </Show>\n  );\n};\n// visible-block-end\n\nrender(\n  <RefineAntdDemo\n    initialRoutes={["/posts/show/2"]}\n    resources={[\n      {\n        name: "posts",\n        list: () => (\n          <div>\n            <p>This page is empty.</p>\n            <ShowButton recordItemId="2">Edit Item 2</ShowButton>\n          </div>\n        ),\n        show: PostShow,\n      },\n    ]}\n  />,\n);\n')),(0,o.yg)("admonition",{title:"Swizzle",type:"info-tip"},(0,o.yg)("p",{parentName:"admonition"},"You can swizzle this component to customize it with the ",(0,o.yg)("a",{parentName:"p",href:"/docs/3.xx.xx/packages/documentation/cli"},(0,o.yg)("strong",{parentName:"a"},"refine CLI")))),(0,o.yg)("h2",{id:"properties"},"Properties"),(0,o.yg)("h3",{id:"title"},(0,o.yg)("inlineCode",{parentName:"h3"},"title")),(0,o.yg)(u,{id:"title",mdxType:"DocThumbsUpDownFeedbackWidget"},(0,o.yg)("p",null,"It allows adding a title for the ",(0,o.yg)("inlineCode",{parentName:"p"},"<Show>"),' component. if you don\'t pass title props it uses the "Show" prefix and the singular resource name by default. For example, for the "posts" resource, it will be "Show post".'),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-tsx",metastring:"live disableScroll previewHeight=280px url=http://localhost:3000/posts/show/2",live:!0,disableScroll:!0,previewHeight:"280px",url:"http://localhost:3000/posts/show/2"},'const { ShowButton } = RefineAntd;\nconst { default: simpleRest } = RefineSimpleRest;\n\nconst dataProvider = simpleRest("https://api.fake-rest.refine.dev");\n\nconst customDataProvider = {\n  ...dataProvider,\n  deleteOne: async ({ resource, id, variables }) => {\n    return {\n      data: {},\n    };\n  },\n};\n\n// visible-block-start\nimport { Show } from "@pankod/refine-antd";\n\nconst PostShow: React.FC = () => {\n  return (\n    /* highlight-next-line */\n    <Show title="Custom Title">\n      <p>Rest of your page here</p>\n    </Show>\n  );\n};\n// visible-block-end\n\nrender(\n  <RefineAntdDemo\n    initialRoutes={["/posts/show/2"]}\n    resources={[\n      {\n        name: "posts",\n        list: () => (\n          <div>\n            <p>This page is empty.</p>\n            <ShowButton recordItemId="2">Show Item 2</ShowButton>\n          </div>\n        ),\n        show: PostShow,\n      },\n    ]}\n  />,\n);\n'))),(0,o.yg)("h3",{id:"resource"},(0,o.yg)("inlineCode",{parentName:"h3"},"resource")),(0,o.yg)(u,{id:"resource",mdxType:"DocThumbsUpDownFeedbackWidget"},(0,o.yg)("p",null,"The ",(0,o.yg)("inlineCode",{parentName:"p"},"<Show>")," component reads the ",(0,o.yg)("inlineCode",{parentName:"p"},"resource")," information from the route by default. This default behavior will not work on custom pages. If you want to use the ",(0,o.yg)("inlineCode",{parentName:"p"},"<Show>")," component in a custom page, you can use the ",(0,o.yg)("inlineCode",{parentName:"p"},"resource")," property."),(0,o.yg)("p",null,(0,o.yg)("a",{parentName:"p",href:"/docs/3.xx.xx/advanced-tutorials/custom-pages"},"Refer to the custom pages documentation for detailed usage. ","\u2192")),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-tsx",metastring:"live disableScroll previewHeight=280px url=http://localhost:3000/custom/2",live:!0,disableScroll:!0,previewHeight:"280px",url:"http://localhost:3000/custom/2"},'setInitialRoutes(["/custom/2"]);\n\n// visible-block-start\nimport { Refine } from "@pankod/refine-core";\nimport { Show } from "@pankod/refine-antd";\nimport routerProvider from "@pankod/refine-react-router-v6";\nimport dataProvider from "@pankod/refine-simple-rest";\n\nconst CustomPage: React.FC = () => {\n  return (\n    /* highlight-next-line */\n    <Show resource="posts">\n      <p>Rest of your page here</p>\n    </Show>\n  );\n};\n\nconst App: React.FC = () => {\n  return (\n    <Refine\n      routerProvider={{\n        ...routerProvider,\n        // highlight-start\n        routes: [\n          {\n            element: <CustomPage />,\n            path: "/custom/:id",\n          },\n        ],\n        // highlight-end\n      }}\n      dataProvider={dataProvider("https://api.fake-rest.refine.dev")}\n      resources={[{ name: "posts" }]}\n    />\n  );\n};\n// visible-block-end\n\nrender(<App />);\n'))),(0,o.yg)("h3",{id:"candelete-and-canedit"},(0,o.yg)("inlineCode",{parentName:"h3"},"canDelete")," and ",(0,o.yg)("inlineCode",{parentName:"h3"},"canEdit")),(0,o.yg)(u,{id:"candelete-and-canedit",mdxType:"DocThumbsUpDownFeedbackWidget"},(0,o.yg)("p",null,(0,o.yg)("inlineCode",{parentName:"p"},"canDelete")," and ",(0,o.yg)("inlineCode",{parentName:"p"},"canEdit")," allows us to add the delete and edit buttons inside the ",(0,o.yg)("inlineCode",{parentName:"p"},"<Show>")," component. If the resource has ",(0,o.yg)("inlineCode",{parentName:"p"},"canDelete")," or ",(0,o.yg)("inlineCode",{parentName:"p"},"canEdit")," property refine adds the buttons by default."),(0,o.yg)("p",null,"When clicked on, delete button executes the ",(0,o.yg)("inlineCode",{parentName:"p"},"useDelete")," method provided by the ",(0,o.yg)("a",{parentName:"p",href:"/docs/3.xx.xx/api-reference/core/providers/data-provider"},(0,o.yg)("inlineCode",{parentName:"a"},"dataProvider"))," and the edit button redirects the user to the record edit page."),(0,o.yg)("p",null,"Refer to the ",(0,o.yg)("a",{parentName:"p",href:"/docs/3.xx.xx/api-reference/antd/components/buttons/delete-button"},(0,o.yg)("inlineCode",{parentName:"a"},"<DeleteButton>"))," and the ",(0,o.yg)("a",{parentName:"p",href:"/docs/3.xx.xx/api-reference/antd/components/buttons/edit-button"},(0,o.yg)("inlineCode",{parentName:"a"},"<EditButton>"))," documentation for detailed usage."),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-tsx",metastring:"live disableScroll previewHeight=280px url=http://localhost:3000/posts/show/2",live:!0,disableScroll:!0,previewHeight:"280px",url:"http://localhost:3000/posts/show/2"},'const { ShowButton, Edit } = RefineAntd;\nconst { usePermissions } = RefineCore;\n\nconst { default: simpleRest } = RefineSimpleRest;\n\nconst dataProvider = simpleRest("https://api.fake-rest.refine.dev");\n\nconst customDataProvider = {\n  ...dataProvider,\n  deleteOne: async ({ resource, id, variables }) => {\n    return {\n      data: {},\n    };\n  },\n};\n\nconst authProvider = {\n  login: () => Promise.resolve(),\n  logout: () => Promise.resolve(),\n  checkAuth: () => Promise.resolve(),\n  checkError: () => Promise.resolve(),\n  getPermissions: () => Promise.resolve("admin"),\n  getUserIdentity: () => Promise.resolve(),\n};\n\n// visible-block-start\nimport { Show } from "@pankod/refine-antd";\nimport { usePermissions } from "@pankod/refine-core";\n\nconst PostShow: React.FC = () => {\n  const { data: permissionsData } = usePermissions();\n  return (\n    <Show\n      /* highlight-start */\n      canDelete={permissionsData?.includes("admin")}\n      canEdit={permissionsData?.includes("admin")}\n      /* highlight-end */\n    >\n      <p>Rest of your page here</p>\n    </Show>\n  );\n};\n// visible-block-end\n\nrender(\n  <RefineAntdDemo\n    authProvider={authProvider}\n    dataProvider={customDataProvider}\n    initialRoutes={["/posts/show/2"]}\n    resources={[\n      {\n        name: "posts",\n        list: () => (\n          <div>\n            <p>This page is empty.</p>\n            <ShowButton>Show Item 2</ShowButton>\n          </div>\n        ),\n        show: PostShow,\n        edit: () => {\n          return <Edit>Edit Page</Edit>;\n        },\n      },\n    ]}\n  />,\n);\n')),(0,o.yg)("p",null,(0,o.yg)("a",{parentName:"p",href:"/docs/3.xx.xx/api-reference/core/hooks/auth/usePermissions"},"Refer to the ",(0,o.yg)("inlineCode",{parentName:"a"},"usePermission")," documentation for detailed usage. ","\u2192"))),(0,o.yg)("h3",{id:"recorditemid"},(0,o.yg)("inlineCode",{parentName:"h3"},"recordItemId")),(0,o.yg)(u,{id:"recorditemid",mdxType:"DocThumbsUpDownFeedbackWidget"},(0,o.yg)("p",null,(0,o.yg)("inlineCode",{parentName:"p"},"<Show>")," component reads the ",(0,o.yg)("inlineCode",{parentName:"p"},"id")," information from the route by default. ",(0,o.yg)("inlineCode",{parentName:"p"},"recordItemId")," is used when it cannot read from the URL (when used on a custom page, modal or drawer)."),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-tsx",metastring:"live disableScroll previewHeight=280px url=http://localhost:3000/posts/show/2",live:!0,disableScroll:!0,previewHeight:"280px",url:"http://localhost:3000/posts/show/2"},'const { ShowButton } = RefineAntd;\n\n// visible-block-start\nimport { Show, useModalForm, Modal, Button } from "@pankod/refine-antd";\n\nconst PostShow: React.FC = () => {\n  const { modalProps, id, show } = useModalForm({\n    action: "show",\n  });\n\n  return (\n    <div>\n      <Button onClick={() => show()}>Show Button</Button>\n      <Modal {...modalProps}>\n        {/* highlight-next-line */}\n        <Show recordItemId={id}>\n          <p>Rest of your page here</p>\n        </Show>\n      </Modal>\n    </div>\n  );\n};\n// visible-block-end\n\nrender(\n  <RefineAntdDemo\n    initialRoutes={["/posts/show/2"]}\n    resources={[\n      {\n        name: "posts",\n        list: () => (\n          <div>\n            <p>This page is empty.</p>\n            <ShowButton recordItemId="2">Show Item 2</ShowButton>\n          </div>\n        ),\n        show: PostShow,\n      },\n    ]}\n  />,\n);\n')),(0,o.yg)("admonition",{type:"note"},(0,o.yg)("p",{parentName:"admonition"},(0,o.yg)("inlineCode",{parentName:"p"},"<Show>")," component needs the ",(0,o.yg)("inlineCode",{parentName:"p"},"id")," information for ",(0,o.yg)("inlineCode",{parentName:"p"},"<RefreshButton>")," to work properly."))),(0,o.yg)("h3",{id:"dataprovidername"},(0,o.yg)("inlineCode",{parentName:"h3"},"dataProviderName")),(0,o.yg)(u,{id:"dataprovidername",mdxType:"DocThumbsUpDownFeedbackWidget"},(0,o.yg)("p",null,"If not specified, Refine will use the default data provider. If you have multiple data providers and want to use a different one, you can use the ",(0,o.yg)("inlineCode",{parentName:"p"},"dataProviderName")," property."),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-tsx"},'import { Refine } from "@pankod/refine-core";\nimport { Show } from "@pankod/refine-antd";\nimport routerProvider from "@pankod/refine-react-router-v6";\nimport dataProvider from "@pankod/refine-simple-rest";\n\n// highlight-start\nconst PostShow = () => {\n  return <Show dataProviderName="other">...</Show>;\n};\n// highlight-end\n\nexport const App: React.FC = () => {\n  return (\n    <Refine\n      routerProvider={routerProvider}\n      // highlight-start\n      dataProvider={{\n        default: dataProvider("https://api.fake-rest.refine.dev/"),\n        other: dataProvider("https://other-api.fake-rest.refine.dev/"),\n      }}\n      // highlight-end\n      resources={[{ name: "posts", show: PostShow }]}\n    />\n  );\n};\n'))),(0,o.yg)("h3",{id:"goback"},(0,o.yg)("inlineCode",{parentName:"h3"},"goBack")),(0,o.yg)(u,{id:"goback",mdxType:"DocThumbsUpDownFeedbackWidget"},(0,o.yg)("p",null,"To customize the back button or to disable it, you can use the ",(0,o.yg)("inlineCode",{parentName:"p"},"goBack")," property."),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-tsx",metastring:"live disableScroll previewHeight=280px url=http://localhost:3000/posts/show/2",live:!0,disableScroll:!0,previewHeight:"280px",url:"http://localhost:3000/posts/show/2"},'const { ShowButton } = RefineAntd;\n\n// visible-block-start\nimport { Show, Icons } from "@pankod/refine-antd";\n\nconst PostShow: React.FC = () => {\n  return (\n    /* highlight-next-line */\n    <Show goBack={<Icons.SmileOutlined />}>\n      <p>Rest of your page here</p>\n    </Show>\n  );\n};\n// visible-block-end\n\nrender(\n  <RefineAntdDemo\n    initialRoutes={["/posts", "/posts/show/2"]}\n    resources={[\n      {\n        name: "posts",\n        list: () => (\n          <div>\n            <p>This page is empty.</p>\n            <ShowButton>Show Item 2</ShowButton>\n          </div>\n        ),\n        show: PostShow,\n      },\n    ]}\n  />,\n);\n'))),(0,o.yg)("h3",{id:"isloading"},(0,o.yg)("inlineCode",{parentName:"h3"},"isLoading")),(0,o.yg)(u,{id:"isloading",mdxType:"DocThumbsUpDownFeedbackWidget"},(0,o.yg)("p",null,"Since ",(0,o.yg)("inlineCode",{parentName:"p"},"<Show>")," uses the Ant Design ",(0,o.yg)("a",{parentName:"p",href:"https://ant.design/components/card/"},(0,o.yg)("inlineCode",{parentName:"a"},"<Card>"))," component, the ",(0,o.yg)("inlineCode",{parentName:"p"},"isLoading")," property can be set like the below."),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-tsx",metastring:"live disableScroll previewHeight=280px url=http://localhost:3000/posts/show/2",live:!0,disableScroll:!0,previewHeight:"280px",url:"http://localhost:3000/posts/show/2"},'const { ShowButton } = RefineAntd;\n\n// visible-block-start\nimport { Show } from "@pankod/refine-antd";\n\nconst PostShow: React.FC = () => {\n  return (\n    /* highlight-next-line */\n    <Show isLoading={true}>\n      <p>Rest of your page here</p>\n    </Show>\n  );\n};\n// visible-block-end\n\nrender(\n  <RefineAntdDemo\n    initialRoutes={["/posts/show/2"]}\n    resources={[\n      {\n        name: "posts",\n        list: () => (\n          <div>\n            <p>This page is empty.</p>\n            <ShowButton />\n          </div>\n        ),\n        show: PostShow,\n      },\n    ]}\n  />,\n);\n'))),(0,o.yg)("h3",{id:"breadcrumb"},(0,o.yg)("inlineCode",{parentName:"h3"},"breadcrumb")),(0,o.yg)(u,{id:"breadcrumb",mdxType:"DocThumbsUpDownFeedbackWidget"},(0,o.yg)("p",null,"To customize or disable the breadcrumb, you can use the ",(0,o.yg)("inlineCode",{parentName:"p"},"breadcrumb")," property. By default it uses the ",(0,o.yg)("inlineCode",{parentName:"p"},"Breadcrumb")," component from ",(0,o.yg)("inlineCode",{parentName:"p"},"@pankod/refine-antd")," package."),(0,o.yg)("p",null,(0,o.yg)("a",{parentName:"p",href:"/docs/3.xx.xx/api-reference/antd/components/breadcrumb"},"Refer to the ",(0,o.yg)("inlineCode",{parentName:"a"},"Breadcrumb")," documentation for detailed usage. ","\u2192")),(0,o.yg)("admonition",{type:"tip"},(0,o.yg)("p",{parentName:"admonition"},"This feature can be managed globally via the ",(0,o.yg)("inlineCode",{parentName:"p"},"<Refine>")," component's ",(0,o.yg)("a",{parentName:"p",href:"/docs/3.xx.xx/api-reference/core/components/refine-config/#breadcrumb"},"options"))),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-tsx",metastring:"live disableScroll previewHeight=280px url=http://localhost:3000/posts/show/2",live:!0,disableScroll:!0,previewHeight:"280px",url:"http://localhost:3000/posts/show/2"},'const { ShowButton } = RefineAntd;\n\n// visible-block-start\nimport { Show, Breadcrumb } from "@pankod/refine-antd";\n\nconst PostShow: React.FC = () => {\n  return (\n    <Show\n      // highlight-start\n      breadcrumb={\n        <div\n          style={{\n            padding: "3px 6px",\n            border: "2px dashed cornflowerblue",\n          }}\n        >\n          <Breadcrumb />\n        </div>\n      }\n      // highlight-end\n    >\n      <p>Rest of your page here</p>\n    </Show>\n  );\n};\n// visible-block-end\n\nrender(\n  <RefineAntdDemo\n    initialRoutes={["/posts/show"]}\n    resources={[\n      {\n        name: "posts",\n        list: () => (\n          <div>\n            <p>This page is empty.</p>\n            <ShowButton />\n          </div>\n        ),\n        show: PostShow,\n      },\n    ]}\n  />,\n);\n'))),(0,o.yg)("h3",{id:"wrapperprops"},(0,o.yg)("inlineCode",{parentName:"h3"},"wrapperProps")),(0,o.yg)(u,{id:"wrapperprops",mdxType:"DocThumbsUpDownFeedbackWidget"},(0,o.yg)("p",null,"If you want to customize the wrapper of the ",(0,o.yg)("inlineCode",{parentName:"p"},"<Show/>")," component, you can use the ",(0,o.yg)("inlineCode",{parentName:"p"},"wrapperProps")," property. For ",(0,o.yg)("inlineCode",{parentName:"p"},"@pankod/refine-antd")," wrapper elements are simple ",(0,o.yg)("inlineCode",{parentName:"p"},"<div/>"),"s and ",(0,o.yg)("inlineCode",{parentName:"p"},"wrapperProps")," can get every attribute that ",(0,o.yg)("inlineCode",{parentName:"p"},"<div/>")," can get."),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-tsx",metastring:"live disableScroll previewHeight=280px url=http://localhost:3000/posts/show/2",live:!0,disableScroll:!0,previewHeight:"280px",url:"http://localhost:3000/posts/show/2"},'const { ShowButton } = RefineAntd;\n\n// visible-block-start\nimport { Show } from "@pankod/refine-antd";\n\nconst PostShow: React.FC = () => {\n  return (\n    <Show\n      // highlight-start\n      wrapperProps={{\n        style: {\n          backgroundColor: "cornflowerblue",\n          padding: "16px",\n        },\n      }}\n      // highlight-end\n    >\n      <p>Rest of your page here</p>\n    </Show>\n  );\n};\n// visible-block-end\n\nrender(\n  <RefineAntdDemo\n    initialRoutes={["/posts/show"]}\n    resources={[\n      {\n        name: "posts",\n        list: () => (\n          <div>\n            <p>This page is empty.</p>\n            <ShowButton />\n          </div>\n        ),\n        show: PostShow,\n      },\n    ]}\n  />,\n);\n'))),(0,o.yg)("h3",{id:"headerprops"},(0,o.yg)("inlineCode",{parentName:"h3"},"headerProps")),(0,o.yg)(u,{id:"headerprops",mdxType:"DocThumbsUpDownFeedbackWidget"},(0,o.yg)("p",null,"If you want to customize the header of the ",(0,o.yg)("inlineCode",{parentName:"p"},"<Show/>")," component, you can use the ",(0,o.yg)("inlineCode",{parentName:"p"},"headerProps")," property."),(0,o.yg)("p",null,(0,o.yg)("a",{parentName:"p",href:"https://procomponents.ant.design/en-US/components/page-header"},"Refer to the ",(0,o.yg)("inlineCode",{parentName:"a"},"PageHeader")," documentation from Ant Design for detailed usage. ","\u2192")),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-tsx",metastring:"live disableScroll previewHeight=280px url=http://localhost:3000/posts/show/2",live:!0,disableScroll:!0,previewHeight:"280px",url:"http://localhost:3000/posts/show/2"},'const { ShowButton } = RefineAntd;\n\n// visible-block-start\nimport { Show } from "@pankod/refine-antd";\n\nconst PostShow: React.FC = () => {\n  return (\n    <Show\n      // highlight-start\n      headerProps={{\n        subTitle: "This is a subtitle",\n        style: {\n          backgroundColor: "cornflowerblue",\n          padding: "16px",\n        },\n      }}\n      // highlight-end\n    >\n      <p>Rest of your page here</p>\n    </Show>\n  );\n};\n// visible-block-end\n\nrender(\n  <RefineAntdDemo\n    initialRoutes={["/posts/show/2"]}\n    resources={[\n      {\n        name: "posts",\n        list: () => (\n          <div>\n            <p>This page is empty.</p>\n            <ShowButton />\n          </div>\n        ),\n        show: PostShow,\n      },\n    ]}\n  />,\n);\n'))),(0,o.yg)("h3",{id:"contentprops"},(0,o.yg)("inlineCode",{parentName:"h3"},"contentProps")),(0,o.yg)(u,{id:"contentprops",mdxType:"DocThumbsUpDownFeedbackWidget"},(0,o.yg)("p",null,"If you want to customize the content of the ",(0,o.yg)("inlineCode",{parentName:"p"},"<Show/>")," component, you can use the ",(0,o.yg)("inlineCode",{parentName:"p"},"contentProps")," property."),(0,o.yg)("p",null,(0,o.yg)("a",{parentName:"p",href:"https://ant.design/components/card/"},"Refer to the ",(0,o.yg)("inlineCode",{parentName:"a"},"Card")," documentation from Ant Design for detailed usage. ","\u2192")),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-tsx",metastring:"live disableScroll previewHeight=280px url=http://localhost:3000/posts/show/2",live:!0,disableScroll:!0,previewHeight:"280px",url:"http://localhost:3000/posts/show/2"},'const { ShowButton } = RefineAntd;\n\n// visible-block-start\nimport { Show } from "@pankod/refine-antd";\n\nconst PostShow: React.FC = () => {\n  return (\n    <Show\n      // highlight-start\n      contentProps={{\n        style: {\n          backgroundColor: "cornflowerblue",\n          padding: "16px",\n        },\n      }}\n      // highlight-end\n    >\n      <p>Rest of your page here</p>\n    </Show>\n  );\n};\n// visible-block-end\n\nrender(\n  <RefineAntdDemo\n    initialRoutes={["/posts/show"]}\n    resources={[\n      {\n        name: "posts",\n        list: () => (\n          <div>\n            <p>This page is empty.</p>\n            <ShowButton />\n          </div>\n        ),\n        show: PostShow,\n      },\n    ]}\n  />,\n);\n'))),(0,o.yg)("h3",{id:"headerbuttons"},(0,o.yg)("inlineCode",{parentName:"h3"},"headerButtons")),(0,o.yg)(u,{id:"headerbuttons",mdxType:"DocThumbsUpDownFeedbackWidget"},(0,o.yg)("p",null,"You can customize the buttons at the header by using the ",(0,o.yg)("inlineCode",{parentName:"p"},"headerButtons")," property. It accepts ",(0,o.yg)("inlineCode",{parentName:"p"},"React.ReactNode")," or a render function ",(0,o.yg)("inlineCode",{parentName:"p"},"({ defaultButtons }) => React.ReactNode")," which you can use to keep the existing buttons and add your own."),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-tsx",metastring:"live disableScroll previewHeight=280px url=http://localhost:3000/posts/show/2",live:!0,disableScroll:!0,previewHeight:"280px",url:"http://localhost:3000/posts/show/2"},'const { ShowButton } = RefineAntd;\n\n// visible-block-start\nimport { Show, Button } from "@pankod/refine-antd";\n\nconst PostShow: React.FC = () => {\n  return (\n    <Show\n      // highlight-start\n      headerButtons={({ defaultButtons }) => (\n        <>\n          {defaultButtons}\n          <Button type="primary">Custom Button</Button>\n        </>\n      )}\n      // highlight-end\n    >\n      <p>Rest of your page here</p>\n    </Show>\n  );\n};\n// visible-block-end\n\nrender(\n  <RefineAntdDemo\n    initialRoutes={["/posts/show/2"]}\n    resources={[\n      {\n        name: "posts",\n        list: () => (\n          <div>\n            <p>This page is empty.</p>\n            <ShowButton />\n          </div>\n        ),\n        show: PostShow,\n      },\n    ]}\n  />,\n);\n'))),(0,o.yg)("h3",{id:"headerbuttonprops"},(0,o.yg)("inlineCode",{parentName:"h3"},"headerButtonProps")),(0,o.yg)(u,{id:"headerbuttonprops",mdxType:"DocThumbsUpDownFeedbackWidget"},(0,o.yg)("p",null,"You can customize the wrapper element of the buttons at the header by using the ",(0,o.yg)("inlineCode",{parentName:"p"},"headerButtonProps")," property."),(0,o.yg)("p",null,(0,o.yg)("a",{parentName:"p",href:"https://ant.design/components/space/"},"Refer to the ",(0,o.yg)("inlineCode",{parentName:"a"},"Space")," documentation from Ant Design for detailed usage. ","\u2192")),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-tsx",metastring:"live disableScroll previewHeight=280px url=http://localhost:3000/posts/edit/2",live:!0,disableScroll:!0,previewHeight:"280px",url:"http://localhost:3000/posts/edit/2"},'const { ShowButton } = RefineAntd;\n\n// visible-block-start\nimport { Show, Button } from "@pankod/refine-antd";\n\nconst PostShow: React.FC = () => {\n  return (\n    <Show\n      // highlight-start\n      headerButtonProps={{\n        style: {\n          backgroundColor: "cornflowerblue",\n          padding: "16px",\n        },\n      }}\n      // highlight-end\n      headerButtons={<Button type="primary">Custom Button</Button>}\n    >\n      <p>Rest of your page here</p>\n    </Show>\n  );\n};\n// visible-block-end\n\nrender(\n  <RefineAntdDemo\n    initialRoutes={["/posts/show"]}\n    resources={[\n      {\n        name: "posts",\n        list: () => (\n          <div>\n            <p>This page is empty.</p>\n            <ShowButton />\n          </div>\n        ),\n        show: PostShow,\n      },\n    ]}\n  />,\n);\n'))),(0,o.yg)("h3",{id:"footerbuttons"},(0,o.yg)("inlineCode",{parentName:"h3"},"footerButtons")),(0,o.yg)(u,{id:"footerbuttons",mdxType:"DocThumbsUpDownFeedbackWidget"},(0,o.yg)("p",null,"You can customize the buttons at the footer by using the ",(0,o.yg)("inlineCode",{parentName:"p"},"footerButtons")," property. It accepts ",(0,o.yg)("inlineCode",{parentName:"p"},"React.ReactNode")," or a render function ",(0,o.yg)("inlineCode",{parentName:"p"},"({ defaultButtons }) => React.ReactNode")," which you can use to keep the existing buttons and add your own."),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-tsx",metastring:"live disableScroll previewHeight=280px url=http://localhost:3000/posts/show/2",live:!0,disableScroll:!0,previewHeight:"280px",url:"http://localhost:3000/posts/show/2"},'const { ShowButton } = RefineAntd;\n\n// visible-block-start\nimport { Show, Button } from "@pankod/refine-antd";\n\nconst PostShow: React.FC = () => {\n  return (\n    <Show\n      // highlight-start\n      footerButtons={({ defaultButtons }) => (\n        <>\n          {defaultButtons}\n          <Button type="primary">Custom Button</Button>\n        </>\n      )}\n      // highlight-end\n    >\n      <p>Rest of your page here</p>\n    </Show>\n  );\n};\n// visible-block-end\n\nrender(\n  <RefineAntdDemo\n    initialRoutes={["/posts/show"]}\n    resources={[\n      {\n        name: "posts",\n        list: () => (\n          <div>\n            <p>This page is empty.</p>\n            <ShowButton />\n          </div>\n        ),\n        show: PostShow,\n      },\n    ]}\n  />,\n);\n'))),(0,o.yg)("h3",{id:"footerbuttonprops"},(0,o.yg)("inlineCode",{parentName:"h3"},"footerButtonProps")),(0,o.yg)(u,{id:"footerbuttonprops",mdxType:"DocThumbsUpDownFeedbackWidget"},(0,o.yg)("p",null,"You can customize the wrapper element of the buttons at the footer by using the ",(0,o.yg)("inlineCode",{parentName:"p"},"footerButtonProps")," property."),(0,o.yg)("p",null,(0,o.yg)("a",{parentName:"p",href:"https://ant.design/components/space/"},"Refer to the ",(0,o.yg)("inlineCode",{parentName:"a"},"Space")," documentation from Ant Design for detailed usage. ","\u2192")),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-tsx",metastring:"live disableScroll previewHeight=280px url=http://localhost:3000/posts/show/2",live:!0,disableScroll:!0,previewHeight:"280px",url:"http://localhost:3000/posts/show/2"},'const { ShowButton } = RefineAntd;\n\n// visible-block-start\nimport { Show, Button } from "@pankod/refine-antd";\n\nconst PostShow: React.FC = () => {\n  return (\n    <Show\n      footerButtons={({ defaultButtons }) => (\n        <>\n          {defaultButtons}\n          <Button type="primary">Custom Button</Button>\n        </>\n      )}\n      // highlight-start\n      footerButtonProps={{\n        style: {\n          // hide-start\n          float: "right",\n          marginRight: 24,\n          // hide-end\n          backgroundColor: "cornflowerblue",\n          padding: "16px",\n        },\n      }}\n      // highlight-end\n    >\n      <p>Rest of your page here</p>\n    </Show>\n  );\n};\n// visible-block-end\n\nrender(\n  <RefineAntdDemo\n    initialRoutes={["/posts/show"]}\n    resources={[\n      {\n        name: "posts",\n        list: () => (\n          <div>\n            <p>This page is empty.</p>\n            <ShowButton />\n          </div>\n        ),\n        show: PostShow,\n      },\n    ]}\n  />,\n);\n'))),(0,o.yg)("h2",{id:"api-reference"},"API Reference"),(0,o.yg)("h3",{id:"properties-1"},"Properties"),(0,o.yg)(u,{id:"properties-1",mdxType:"DocThumbsUpDownFeedbackWidget"},(0,o.yg)(g,{module:"@pankod/refine-antd/Show","contentProps-type":"[`CardProps`](https://ant.design/components/card/#API)","headerProps-type":"[`PageHeaderProps`](https://procomponents.ant.design/en-US/components/page-header)","headerButtons-default":"[`ListButton`](https://refine.dev/docs/api-reference/antd/components/buttons/list-button/), [`RefreshButton`](https://refine.dev/docs/api-reference/antd/components/buttons/refresh-button/), [`EditButton`](https://refine.dev/docs/api-reference/antd/components/buttons/edit-button/) and [`DeleteButton`](https://refine.dev/docs/api-reference/antd/components/buttons/delete-button/)","headerButtonProps-type":"[`SpaceProps`](https://ant.design/components/space/)","deleteButtonProps-type":"[`DeleteButtonProps`](/docs/3.xx.xx/api-reference/antd/components/buttons/delete-button/)","saveButtonProps-type":"[`SaveButtonProps`](https://refine.dev/docs/api-reference/antd/components/buttons/save-button/)","footerButtonsProps-type":"[`SpaceProps`](https://ant.design/components/space/)","breadcrumb-default":"[`<Breadcrumb>`](https://ant.design/components/breadcrumb/)","goBack-default":"`<ArrowLeft />`","goBack-type":"`ReactNode`",mdxType:"PropsTable"})))}f.isMDXComponent=!0}}]);