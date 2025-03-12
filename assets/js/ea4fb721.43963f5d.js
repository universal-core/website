"use strict";(self.webpackChunkdocumentation=self.webpackChunkdocumentation||[]).push([[90233],{58860:(e,n,t)=>{t.d(n,{xA:()=>d,yg:()=>g});var r=t(37953);function a(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function o(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function i(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?o(Object(t),!0).forEach((function(n){a(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function s(e,n){if(null==e)return{};var t,r,a=function(e,n){if(null==e)return{};var t,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)t=o[r],n.indexOf(t)>=0||(a[t]=e[t]);return a}(e,n);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)t=o[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}var p=r.createContext({}),l=function(e){var n=r.useContext(p),t=n;return e&&(t="function"==typeof e?e(n):i(i({},n),e)),t},d=function(e){var n=l(e.components);return r.createElement(p.Provider,{value:n},e.children)},c="mdxType",m={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},u=r.forwardRef((function(e,n){var t=e.components,a=e.mdxType,o=e.originalType,p=e.parentName,d=s(e,["components","mdxType","originalType","parentName"]),c=l(t),u=a,g=c["".concat(p,".").concat(u)]||c[u]||m[u]||o;return t?r.createElement(g,i(i({ref:n},d),{},{components:t})):r.createElement(g,i({ref:n},d))}));function g(e,n){var t=arguments,a=n&&n.mdxType;if("string"==typeof e||a){var o=t.length,i=new Array(o);i[0]=u;var s={};for(var p in n)hasOwnProperty.call(n,p)&&(s[p]=n[p]);s.originalType=e,s[c]="string"==typeof e?e:a,i[1]=s;for(var l=2;l<o;l++)i[l]=t[l];return r.createElement.apply(null,i)}return r.createElement.apply(null,t)}u.displayName="MDXCreateElement"},12119:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>d,contentTitle:()=>p,default:()=>v,frontMatter:()=>s,metadata:()=>l,toc:()=>c});t(37953);var r=t(58860);function a(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function o(e,n){return n=null!=n?n:{},Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):function(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})),e}function i(e,n){if(null==e)return{};var t,r,a=function(e,n){if(null==e)return{};var t,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)t=o[r],n.indexOf(t)>=0||(a[t]=e[t]);return a}(e,n);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)t=o[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}const s={id:"appwrite",title:"Appwrite"},p=void 0,l={unversionedId:"advanced-tutorials/data-provider/appwrite",id:"version-3.xx.xx/advanced-tutorials/data-provider/appwrite",title:"Appwrite",description:"Introduction",source:"@site/versioned_docs/version-3.xx.xx/advanced-tutorials/data-provider/appwrite.md",sourceDirName:"advanced-tutorials/data-provider",slug:"/advanced-tutorials/data-provider/appwrite",permalink:"/docs/3.xx.xx/advanced-tutorials/data-provider/appwrite",draft:!1,editUrl:"https://github.com/refinedev/refine/tree/master/documentation/versioned_docs/version-3.xx.xx/advanced-tutorials/data-provider/appwrite.md",tags:[],version:"3.xx.xx",lastUpdatedBy:"Matteo Roggia",lastUpdatedAt:1741812888,formattedLastUpdatedAt:"Mar 12, 2025",frontMatter:{id:"appwrite",title:"Appwrite"},sidebar:"someSidebar",previous:{title:"Custom Pages",permalink:"/docs/3.xx.xx/advanced-tutorials/custom-pages"},next:{title:"GraphQL",permalink:"/docs/3.xx.xx/advanced-tutorials/data-provider/graphql"}},d={},c=[{value:"Introduction",id:"introduction",level:2},{value:"Setup",id:"setup",level:2},{value:"Usage",id:"usage",level:2},{value:"Creating Appwrite Client",id:"creating-appwrite-client",level:3},{value:"Creating Auth Provider",id:"creating-auth-provider",level:3},{value:"Configure Refine Component",id:"configure-refine-component",level:3},{value:"Create Collections",id:"create-collections",level:2},{value:"Permissions",id:"permissions",level:3},{value:"Login page\u200b",id:"login-page",level:2},{value:"List Page",id:"list-page",level:2},{value:"Create Page",id:"create-page",level:2},{value:"Edit Page",id:"edit-page",level:2},{value:"Example",id:"example",level:2}],m=e=>function(n){return console.warn("Component "+e+" was not imported, exported, or provided by MDXProvider as global scope"),(0,r.yg)("div",n)},u=m("DocThumbsUpDownFeedbackWidget"),g=m("InstallPackagesCommand"),y=m("CodeSandboxExample"),f={toc:c},h="wrapper";function v(e){var{components:n}=e,t=i(e,["components"]);return(0,r.yg)(h,o(function(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{},r=Object.keys(t);"function"==typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(t).filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})))),r.forEach((function(n){a(e,n,t[n])}))}return e}({},f,t),{components:n,mdxType:"MDXLayout"}),(0,r.yg)("h2",{id:"introduction"},"Introduction"),(0,r.yg)(u,{id:"introduction",mdxType:"DocThumbsUpDownFeedbackWidget"},(0,r.yg)("p",null,(0,r.yg)("strong",{parentName:"p"},"refine")," and ",(0,r.yg)("a",{parentName:"p",href:"https://appwrite.io/"},"Appwrite")," work in harmony, offering you quick development options. You can use your data (API, Database) very simply by using ",(0,r.yg)("strong",{parentName:"p"},"refine"),"'s Appwrite data provider."),(0,r.yg)("admonition",{type:"info"},(0,r.yg)("p",{parentName:"admonition"},(0,r.yg)("a",{parentName:"p",href:"https://appwrite.io/"},"Appwrite")," version >= 1.0 is required")),(0,r.yg)("p",null,"You can only focus on your UI as we can handle your data quickly and simply."),(0,r.yg)("admonition",{type:"caution"},(0,r.yg)("p",{parentName:"admonition"},"This guide has been prepared assuming you know the basics of ",(0,r.yg)("strong",{parentName:"p"},"refine"),". If you haven't learned these basics yet, we recommend reading the ",(0,r.yg)("a",{parentName:"p",href:"https://refine.dev/docs/"},"Tutorial"),"."))),(0,r.yg)("h2",{id:"setup"},"Setup"),(0,r.yg)(u,{id:"setup",mdxType:"DocThumbsUpDownFeedbackWidget"},(0,r.yg)(g,{args:"@pankod/refine-appwrite",mdxType:"InstallPackagesCommand"}),(0,r.yg)("admonition",{type:"caution"},(0,r.yg)("p",{parentName:"admonition"},"To make this example more visual, we used the ",(0,r.yg)("a",{parentName:"p",href:"https://github.com/refinedev/refine/tree/v3/packages/refine-antd"},(0,r.yg)("inlineCode",{parentName:"a"},"@pankod/refine-antd"))," package. If you are using Refine headless, you need to provide the components, hooks or helpers imported from the ",(0,r.yg)("a",{parentName:"p",href:"https://github.com/refinedev/refine/tree/v3/packages/refine-antd"},(0,r.yg)("inlineCode",{parentName:"a"},"@pankod/refine-antd"))," package."))),(0,r.yg)("h2",{id:"usage"},"Usage"),(0,r.yg)(u,{id:"usage",mdxType:"DocThumbsUpDownFeedbackWidget"},(0,r.yg)("p",null,"It is very simple to use and consists of two steps. First, define your Appwrite project id and then give it to the dataprovider.")),(0,r.yg)("h3",{id:"creating-appwrite-client"},"Creating Appwrite Client"),(0,r.yg)(u,{id:"creating-appwrite-client",mdxType:"DocThumbsUpDownFeedbackWidget"},(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-tsx",metastring:'title="appwriteClient.ts"',title:'"appwriteClient.ts"'},'import { Appwrite, Account, Storage } from "@pankod/refine-appwrite";\n\nconst APPWRITE_URL = "http://YOUR_COOL_APPWRITE_API/v1";\n//highlight-start\nconst APPWRITE_PROJECT = "YOUR_APPWRITE_PROJECT_ID";\n//highlight-end\n\nconst appwriteClient = new Appwrite();\n\nappwriteClient.setEndpoint(APPWRITE_URL).setProject(APPWRITE_PROJECT);\n\n// for authentication\nconst account = new Account(appwriteClient);\n// for file upload\nconst storage = new Storage(appwriteClient);\n\nexport { appwriteClient, account, storage };\n'))),(0,r.yg)("h3",{id:"creating-auth-provider"},"Creating Auth Provider"),(0,r.yg)(u,{id:"creating-auth-provider",mdxType:"DocThumbsUpDownFeedbackWidget"},(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-tsx",metastring:'title="authProvider.ts"',title:'"authProvider.ts"'},'import { AuthProvider } from "@pankod/refine-core";\n\nimport { account } from "./appwriteClient";\n\nexport const authProvider: AuthProvider = {\n  login: async ({ email, password }) => {\n    try {\n      await account.createEmailSession(email, password);\n      return Promise.resolve();\n    } catch (e) {\n      return Promise.reject();\n    }\n  },\n  logout: async () => {\n    await account.deleteSession("current");\n\n    return "/";\n  },\n  checkError: () => Promise.resolve(),\n  checkAuth: async () => {\n    const session = await account.get();\n\n    if (session) {\n      return Promise.resolve();\n    }\n\n    return Promise.reject();\n  },\n  getPermissions: () => Promise.resolve(),\n  getUserIdentity: async () => {\n    const user = await account.get();\n\n    if (user) {\n      return user;\n    }\n  },\n};\n'))),(0,r.yg)("h3",{id:"configure-refine-component"},"Configure Refine Component"),(0,r.yg)(u,{id:"configure-refine-component",mdxType:"DocThumbsUpDownFeedbackWidget"},(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-tsx",metastring:'title="App.tsx"',title:'"App.tsx"'},'import { Refine, AuthProvider } from "@pankod/refine-core";\nimport {\n  Layout,\n  ReadyPage,\n  useNotificationProvider,\n  ErrorComponent,\n} from "@pankod/refine-antd";\nimport routerProvider from "@pankod/refine-react-router-v6";\n\n//highlight-start\nimport { dataProvider, liveProvider } from "@pankod/refine-appwrite";\n//highlight-end\n\n//highlight-start\nimport { appwriteClient, account } from "./appwriteClient";\nimport authProvider from "./authProvider";\n//highlight-end\n\nconst App: React.FC = () => {\n  return (\n    <Refine\n      //highlight-start\n      dataProvider={dataProvider(appwriteClient, {\n        databaseId: "default",\n      })}\n      liveProvider={liveProvider(appwriteClient, {\n        databaseId: "default",\n      })}\n      options={{ liveMode: "auto" }}\n      authProvider={authProvider}\n      //highlight-end\n      routerProvider={routerProvider}\n      Layout={Layout}\n      ReadyPage={ReadyPage}\n      notificationProvider={useNotificationProvider}\n      catchAll={<ErrorComponent />}\n    />\n  );\n};\n')),(0,r.yg)("admonition",{title:"Live/Realtime \ud83d\ude80",type:"tip"},(0,r.yg)("p",{parentName:"admonition"},(0,r.yg)("inlineCode",{parentName:"p"},"@pankod/refine-appwrite")," package supports Live/Realtime Provider natively \ud83d\ude80"),(0,r.yg)("p",{parentName:"admonition"},(0,r.yg)("a",{parentName:"p",href:"/docs/3.xx.xx/api-reference/core/providers/live-provider/"},"Refer to the Live/Realtime Provider docs for detailed usage. \u2192")))),(0,r.yg)("h2",{id:"create-collections"},"Create Collections"),(0,r.yg)(u,{id:"create-collections",mdxType:"DocThumbsUpDownFeedbackWidget"},(0,r.yg)("p",null,"We created two collections on Appwrite Database as ",(0,r.yg)("inlineCode",{parentName:"p"},"posts")," and ",(0,r.yg)("inlineCode",{parentName:"p"},"categories")," and added a relation between them."),(0,r.yg)("p",null,(0,r.yg)("inlineCode",{parentName:"p"},"Category Collection"),":"),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},"Title: text")),(0,r.yg)("img",{src:"https://refine.ams3.cdn.digitaloceanspaces.com/website/static/img/guides-and-concepts/data-provider/appwrite/category.png",alt:"category"}),(0,r.yg)("br",null),(0,r.yg)("p",null,(0,r.yg)("inlineCode",{parentName:"p"},"Post Collection"),":"),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},"Title: text"),(0,r.yg)("li",{parentName:"ul"},"CategoryId: text"),(0,r.yg)("li",{parentName:"ul"},"Content: text"),(0,r.yg)("li",{parentName:"ul"},"Images: wilcard")),(0,r.yg)("img",{src:"https://refine.ams3.cdn.digitaloceanspaces.com/website/static/img/guides-and-concepts/data-provider/appwrite/posts.png",alt:"posts"}),(0,r.yg)("br",null),(0,r.yg)("p",null,"Then we need to create an appwrite user to be able to login with ",(0,r.yg)("strong",{parentName:"p"},"refine"),"."),(0,r.yg)("img",{src:"https://refine.ams3.cdn.digitaloceanspaces.com/website/static/img/guides-and-concepts/data-provider/appwrite/user.png",alt:"user"}),(0,r.yg)("br",null)),(0,r.yg)("h3",{id:"permissions"},"Permissions"),(0,r.yg)(u,{id:"permissions",mdxType:"DocThumbsUpDownFeedbackWidget"},(0,r.yg)("p",null,"In order to list posts and categories, you need to give read and write permission by Appwrite."),(0,r.yg)("p",null,"Example: ",(0,r.yg)("inlineCode",{parentName:"p"},"Post Collection Permissons")),(0,r.yg)("img",{src:"https://refine.ams3.cdn.digitaloceanspaces.com/website/static/img/guides-and-concepts/data-provider/appwrite/permission.png",alt:"permission"}),(0,r.yg)("br",null),(0,r.yg)("p",null,'We indicate that the read and write permission is open to everyone by giving the "',"*",'" parameter.'),(0,r.yg)("p",null,(0,r.yg)("a",{parentName:"p",href:"https://appwrite.io/docs/permissions"},"Refer to the Appwrite Permissions documentation for detailed information.\u2192")),(0,r.yg)("p",null,(0,r.yg)("a",{parentName:"p",href:"#create-page"},"Check out how you can use permissions when creating posts with ",(0,r.yg)("strong",{parentName:"a"},"refine")," \u2192"))),(0,r.yg)("h2",{id:"login-page"},"Login page\u200b"),(0,r.yg)(u,{id:"login-page",mdxType:"DocThumbsUpDownFeedbackWidget"},(0,r.yg)("p",null,(0,r.yg)("strong",{parentName:"p"},"refine")," default login screen allows you to login with username. Appwrite allows login with email, therefore we need to override the login page."),(0,r.yg)("details",null,(0,r.yg)("summary",null,"Show Code"),(0,r.yg)("p",null,(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-tsx",metastring:'title="pages/login.tsx"',title:'"pages/login.tsx"'},'import React from "react";\n\nimport { useLogin } from "@pankod/refine-core";\nimport {\n  Row,\n  Col,\n  AntdLayout,\n  Card,\n  Typography,\n  Form,\n  Input,\n  Button,\n  Checkbox,\n} from "@pankod/refine-antd";\n\nimport "./styles.css";\n\nconst { Text, Title } = Typography;\n\nexport interface ILoginForm {\n  username: string;\n  password: string;\n  remember: boolean;\n}\n\nexport const Login: React.FC = () => {\n  const [form] = Form.useForm<ILoginForm>();\n\n  const { mutate: login } = useLogin<ILoginForm>();\n\n  const CardTitle = (\n    <Title level={3} className="title">\n      Sign in your account\n    </Title>\n  );\n\n  return (\n    <AntdLayout className="layout">\n      <Row\n        justify="center"\n        align="middle"\n        style={{\n          height: "100vh",\n        }}\n      >\n        <Col xs={22}>\n          <div className="container">\n            <div className="imageContainer">\n              <img src="./refine.svg" alt="Refine Logo" />\n            </div>\n            <Card title={CardTitle} headStyle={{ borderBottom: 0 }}>\n              <Form<ILoginForm>\n                layout="vertical"\n                form={form}\n                onFinish={(values) => {\n                  login(values);\n                }}\n                requiredMark={false}\n              >\n                <Form.Item\n                  name="email"\n                  label="Email"\n                  rules={[{ required: true, type: "email" }]}\n                >\n                  <Input size="large" placeholder="Email" />\n                </Form.Item>\n                <Form.Item\n                  name="password"\n                  label="Password"\n                  rules={[{ required: true }]}\n                  style={{ marginBottom: "12px" }}\n                >\n                  <Input type="password" placeholder="\u25cf\u25cf\u25cf\u25cf\u25cf\u25cf\u25cf\u25cf" size="large" />\n                </Form.Item>\n                <div style={{ marginBottom: "12px" }}>\n                  <Form.Item name="remember" valuePropName="checked" noStyle>\n                    <Checkbox\n                      style={{\n                        fontSize: "12px",\n                      }}\n                    >\n                      Remember me\n                    </Checkbox>\n                  </Form.Item>\n\n                  <a\n                    style={{\n                      float: "right",\n                      fontSize: "12px",\n                    }}\n                    href="#"\n                  >\n                    Forgot password?\n                  </a>\n                </div>\n                <Button type="primary" size="large" htmlType="submit" block>\n                  Sign in\n                </Button>\n              </Form>\n              <div style={{ marginTop: 8 }}>\n                <Text style={{ fontSize: 12 }}>\n                  Don\u2019t have an account?{" "}\n                  <a href="#" style={{ fontWeight: "bold" }}>\n                    Sign up\n                  </a>\n                </Text>\n              </div>\n            </Card>\n          </div>\n        </Col>\n      </Row>\n    </AntdLayout>\n  );\n};\n')))),(0,r.yg)("img",{src:"https://refine.ams3.cdn.digitaloceanspaces.com/website/static/img/guides-and-concepts/data-provider/appwrite/login.png",alt:"login"}),(0,r.yg)("br",null),(0,r.yg)("p",null,"Now we can login with the user we created by Appwrite. We can then list, create and edit posts."),(0,r.yg)("admonition",{type:"tip"},(0,r.yg)("p",{parentName:"admonition"},(0,r.yg)("strong",{parentName:"p"},"refine")," resource name must be the same as Appwrite Collection ID. You can change your label with resource options."),(0,r.yg)("pre",{parentName:"admonition"},(0,r.yg)("code",{parentName:"pre",className:"language-tsx"},'const App: React.FC = () => {\n  return (\n    <Refine\n      dataProvider={dataProvider(appwriteClient, {\n        databaseId: "default",\n      })}\n      liveProvider={liveProvider(appwriteClient, {\n        databaseId: "default",\n      })}\n      options={{ liveMode: "auto" }}\n      authProvider={authProvider}\n      routerProvider={routerProvider}\n      Layout={Layout}\n      ReadyPage={ReadyPage}\n      notificationProvider={useNotificationProvider}\n      catchAll={<ErrorComponent />}\n      LoginPage={Login}\n      resources={[\n        {\n          //highlight-start\n          name: "61bc3660648a6",\n          //highlight-end\n          options: {\n            //highlight-start\n            label: "Post",\n            //highlight-end\n          },\n        },\n      ]}\n    />\n  );\n};\n\nexport default App;\n')))),(0,r.yg)("h2",{id:"list-page"},"List Page"),(0,r.yg)(u,{id:"list-page",mdxType:"DocThumbsUpDownFeedbackWidget"},(0,r.yg)("p",null,"Now that we've created our collections, we can create and list documents. Let's list the posts and categories that we have created by Appwrite with ",(0,r.yg)("strong",{parentName:"p"},"refine"),"."),(0,r.yg)("details",null,(0,r.yg)("summary",null,"Show Code"),(0,r.yg)("p",null,(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-tsx"},'import { useMany, IResourceComponentsProps } from "@pankod/refine-core";\nimport {\n  List,\n  Table,\n  TextField,\n  useTable,\n  Space,\n  EditButton,\n  ShowButton,\n  getDefaultSortOrder,\n} from "@pankod/refine-antd";\n\nimport { IPost, ICategory } from "interfaces";\n\nexport const PostsList: React.FC<IResourceComponentsProps> = () => {\n  const { tableProps, sorter } = useTable<IPost>({\n    initialSorter: [\n      {\n        field: "$id",\n        order: "asc",\n      },\n    ],\n  });\n\n  const categoryIds =\n    tableProps?.dataSource?.map((item) => item.categoryId) ?? [];\n  const { data, isLoading } = useMany<ICategory>({\n    resource: "61bc4afa9ee2c",\n    ids: categoryIds,\n    queryOptions: {\n      enabled: categoryIds.length > 0,\n    },\n  });\n\n  return (\n    <List>\n      <Table {...tableProps} rowKey="id">\n        <Table.Column\n          dataIndex="id"\n          title="ID"\n          sorter\n          defaultSortOrder={getDefaultSortOrder("id", sorter)}\n        />\n        <Table.Column dataIndex="title" title="Title" sorter />\n        <Table.Column\n          dataIndex="categoryId"\n          title="Category"\n          render={(value) => {\n            if (isLoading) {\n              return <TextField value="Loading..." />;\n            }\n\n            return (\n              <TextField\n                value={data?.data.find((item) => item.id === value)?.title}\n              />\n            );\n          }}\n        />\n        <Table.Column<IPost>\n          title="Actions"\n          dataIndex="actions"\n          render={(_, record) => (\n            <Space>\n              <EditButton hideText size="small" recordItemId={record.id} />\n              <ShowButton hideText size="small" recordItemId={record.id} />\n            </Space>\n          )}\n        />\n      </Table>\n    </List>\n  );\n};\n')))),(0,r.yg)("img",{src:"https://refine.ams3.cdn.digitaloceanspaces.com/website/static/img/guides-and-concepts/data-provider/appwrite/list.png",alt:"list"}),(0,r.yg)("br",null)),(0,r.yg)("h2",{id:"create-page"},"Create Page"),(0,r.yg)(u,{id:"create-page",mdxType:"DocThumbsUpDownFeedbackWidget"},(0,r.yg)("p",null,"We can now create posts and set categories from our ",(0,r.yg)("strong",{parentName:"p"},"refine")," UI."),(0,r.yg)("details",null,(0,r.yg)("summary",null,"Show Code"),(0,r.yg)("p",null,(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-tsx"},'import { useState } from "react";\n\nimport { IResourceComponentsProps } from "@pankod/refine-core";\nimport {\n  Create,\n  Form,\n  Input,\n  Select,\n  Upload,\n  useForm,\n  useSelect,\n  RcFile,\n} from "@pankod/refine-antd";\n\nimport MDEditor from "@uiw/react-md-editor";\n\nimport { IPost, ICategory } from "interfaces";\nimport { storage, normalizeFile } from "utility";\n\nexport const PostsCreate: React.FC<IResourceComponentsProps> = () => {\n  const { formProps, saveButtonProps } = useForm<IPost>();\n\n  const { selectProps: categorySelectProps } = useSelect<ICategory>({\n    resource: "61bc4afa9ee2c",\n    optionLabel: "title",\n    optionValue: "id",\n  });\n\n  return (\n    <Create saveButtonProps={saveButtonProps}>\n      <Form {...formProps} layout="vertical">\n        <Form.Item\n          label="Title"\n          name="title"\n          rules={[\n            {\n              required: true,\n            },\n          ]}\n        >\n          <Input />\n        </Form.Item>\n        <Form.Item\n          label="Category"\n          name="categoryId"\n          rules={[\n            {\n              required: true,\n            },\n          ]}\n        >\n          <Select {...categorySelectProps} />\n        </Form.Item>\n        <Form.Item\n          label="Content"\n          name="content"\n          rules={[\n            {\n              required: true,\n            },\n          ]}\n        >\n          <MDEditor data-color-mode="light" />\n        </Form.Item>\n        <Form.Item label="Images">\n          <Form.Item\n            name="images"\n            valuePropName="fileList"\n            normalize={normalizeFile}\n            noStyle\n          >\n            <Upload.Dragger\n              name="file"\n              listType="picture"\n              multiple\n              customRequest={async ({ file, onError, onSuccess }) => {\n                try {\n                  const rcFile = file as RcFile;\n\n                  const { $id } = await storage.createFile(\n                    "default",\n                    rcFile.name,\n                    rcFile,\n                  );\n\n                  const url = storage.getFileView("default", $id);\n\n                  onSuccess?.({ url }, new XMLHttpRequest());\n                } catch (error) {\n                  onError?.(new Error("Upload Error"));\n                }\n              }}\n            >\n              <p className="ant-upload-text">\n                Drag &amp; drop a file in this area\n              </p>\n            </Upload.Dragger>\n          </Form.Item>\n        </Form.Item>\n      </Form>\n    </Create>\n  );\n};\n')))),(0,r.yg)("img",{src:"https://refine.ams3.cdn.digitaloceanspaces.com/website/static/img/guides-and-concepts/data-provider/appwrite/create.gif",alt:"create"}),(0,r.yg)("br",null),(0,r.yg)("admonition",{type:"tip"},(0,r.yg)("p",{parentName:"admonition"},"As we mentioned above, we need permissions to list or create documents in Appwrite. By default, Read Access and Write Access are public when creating documents from ",(0,r.yg)("strong",{parentName:"p"},"refine")," UI."),(0,r.yg)("p",{parentName:"admonition"},"If you want to restrict ",(0,r.yg)("a",{parentName:"p",href:"https://appwrite.io/docs/permissions#permission-types"},"permissions")," and only allow specific users, you need to specify it in metaData."),(0,r.yg)("pre",{parentName:"admonition"},(0,r.yg)("code",{parentName:"pre",className:"language-tsx"},'import { Permission, Role } from "@pankod/refine-appwrite";\nconst { formProps, saveButtonProps } = useForm<IPost>({\n  metaData: {\n    writePermissions: [Permission.read(Role.any())],\n    readPermissions: [Permission.read(Role.any())],\n  },\n});\n')))),(0,r.yg)("h2",{id:"edit-page"},"Edit Page"),(0,r.yg)(u,{id:"edit-page",mdxType:"DocThumbsUpDownFeedbackWidget"},(0,r.yg)("p",null,"You can edit the posts and categories we have created update your data."),(0,r.yg)("details",null,(0,r.yg)("summary",null,"Show Code"),(0,r.yg)("p",null,(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-tsx"},'import React from "react";\n\nimport { IResourceComponentsProps } from "@pankod/refine-core";\nimport {\n  Edit,\n  Form,\n  Input,\n  RcFile,\n  Select,\n  Upload,\n  useForm,\n  useSelect,\n} from "@pankod/refine-antd";\n\nimport MDEditor from "@uiw/react-md-editor";\n\nimport { IPost, ICategory } from "interfaces";\nimport { storage, normalizeFile } from "utility";\n\nexport const PostsEdit: React.FC<IResourceComponentsProps> = () => {\n  const { formProps, saveButtonProps, queryResult } = useForm<IPost>();\n\n  const postData = queryResult?.data?.data;\n  const { selectProps: categorySelectProps } = useSelect<ICategory>({\n    resource: "61bc4afa9ee2c",\n    defaultValue: postData?.categoryId,\n    optionLabel: "title",\n    optionValue: "id",\n  });\n\n  return (\n    <Edit saveButtonProps={saveButtonProps}>\n      <Form {...formProps} layout="vertical">\n        <Form.Item\n          label="Title"\n          name="title"\n          rules={[\n            {\n              required: true,\n            },\n          ]}\n        >\n          <Input />\n        </Form.Item>\n        <Form.Item\n          label="Category"\n          name="categoryId"\n          rules={[\n            {\n              required: true,\n            },\n          ]}\n        >\n          <Select {...categorySelectProps} />\n        </Form.Item>\n        <Form.Item\n          label="Content"\n          name="content"\n          rules={[\n            {\n              required: true,\n            },\n          ]}\n        >\n          <MDEditor data-color-mode="light" />\n        </Form.Item>\n        <Form.Item label="Images">\n          <Form.Item\n            name="images"\n            valuePropName="fileList"\n            normalize={normalizeFile}\n            noStyle\n          >\n            <Upload.Dragger\n              name="file"\n              listType="picture"\n              multiple\n              customRequest={async ({ file, onError, onSuccess }) => {\n                try {\n                  const rcFile = file as RcFile;\n\n                  const { $id } = await storage.createFile(\n                    "default",\n                    rcFile.name,\n                    rcFile,\n                  );\n\n                  const url = storage.getFileView("default", $id);\n\n                  onSuccess?.({ url }, new XMLHttpRequest());\n                } catch (error) {\n                  onError?.(new Error("Upload Error"));\n                }\n              }}\n            >\n              <p className="ant-upload-text">\n                Drag &amp; drop a file in this area\n              </p>\n            </Upload.Dragger>\n          </Form.Item>\n        </Form.Item>\n      </Form>\n    </Edit>\n  );\n};\n')))),(0,r.yg)("img",{src:"https://refine.ams3.cdn.digitaloceanspaces.com/website/static/img/guides-and-concepts/data-provider/appwrite/edit.png",alt:"edit"})),(0,r.yg)("h2",{id:"example"},"Example"),(0,r.yg)(u,{id:"example",mdxType:"DocThumbsUpDownFeedbackWidget"},(0,r.yg)("admonition",{type:"additional"},(0,r.yg)("p",{parentName:"admonition"},"Username: ",(0,r.yg)("inlineCode",{parentName:"p"},"demo@refine.dev")),(0,r.yg)("p",{parentName:"admonition"},"Password: ",(0,r.yg)("inlineCode",{parentName:"p"},"demodemo"))),(0,r.yg)(y,{path:"data-provider-appwrite",mdxType:"CodeSandboxExample"})))}v.isMDXComponent=!0}}]);