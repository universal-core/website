"use strict";(self.webpackChunkdocumentation=self.webpackChunkdocumentation||[]).push([[52480],{58860:(e,t,n)=>{n.d(t,{xA:()=>u,yg:()=>g});var r=n(37953);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function p(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var s=r.createContext({}),l=function(e){var t=r.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):a(a({},t),e)),n},u=function(e){var t=l(e.components);return r.createElement(s.Provider,{value:t},e.children)},m="mdxType",c={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,i=e.originalType,s=e.parentName,u=p(e,["components","mdxType","originalType","parentName"]),m=l(n),d=o,g=m["".concat(s,".").concat(d)]||m[d]||c[d]||i;return n?r.createElement(g,a(a({ref:t},u),{},{components:n})):r.createElement(g,a({ref:t},u))}));function g(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var i=n.length,a=new Array(i);a[0]=d;var p={};for(var s in t)hasOwnProperty.call(t,s)&&(p[s]=t[s]);p.originalType=e,p[m]="string"==typeof e?e:o,a[1]=p;for(var l=2;l<i;l++)a[l]=n[l];return r.createElement.apply(null,a)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},73702:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>u,contentTitle:()=>s,default:()=>f,frontMatter:()=>p,metadata:()=>l,toc:()=>m});n(37953);var r=n(58860);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){return t=null!=t?t:{},Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):function(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))})),e}function a(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}const p={title:"Import",swizzle:!0},s=void 0,l={unversionedId:"ui-integrations/material-ui/components/buttons/import-button/index",id:"ui-integrations/material-ui/components/buttons/import-button/index",title:"Import",description:"` is compatible with the useImport hook and is meant to be used as it's upload button. It uses Material UI  component and native html  element. It wraps a  with a  component and ` element and accepts it's own properties for separately.",source:"@site/docs/ui-integrations/material-ui/components/buttons/import-button/index.md",sourceDirName:"ui-integrations/material-ui/components/buttons/import-button",slug:"/ui-integrations/material-ui/components/buttons/import-button/",permalink:"/docs/ui-integrations/material-ui/components/buttons/import-button/",draft:!1,editUrl:"https://github.com/refinedev/refine/tree/master/documentation/docs/ui-integrations/material-ui/components/buttons/import-button/index.md",tags:[],version:"current",lastUpdatedBy:"Matteo Roggia",lastUpdatedAt:1741812888,formattedLastUpdatedAt:"Mar 12, 2025",frontMatter:{title:"Import",swizzle:!0},sidebar:"mainSidebar",previous:{title:"Export",permalink:"/docs/ui-integrations/material-ui/components/buttons/export-button/"},next:{title:"List",permalink:"/docs/ui-integrations/material-ui/components/buttons/list-button/"}},u={},m=[{value:"Usage",id:"usage",level:2},{value:"Properties",id:"properties",level:2},{value:"hideText",id:"hidetext",level:3},{value:"API Reference",id:"api-reference",level:2},{value:"Properties",id:"properties-1",level:3}],c=e=>function(t){return console.warn("Component "+e+" was not imported, exported, or provided by MDXProvider as global scope"),(0,r.yg)("div",t)},d=c("DocThumbsUpDownFeedbackWidget"),g=c("PropsTable"),y={toc:m},b="wrapper";function f(e){var{components:t}=e,n=a(e,["components"]);return(0,r.yg)(b,i(function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{},r=Object.keys(n);"function"==typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(n).filter((function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable})))),r.forEach((function(t){o(e,t,n[t])}))}return e}({},y,n),{components:t,mdxType:"MDXLayout"}),(0,r.yg)("p",null,(0,r.yg)("inlineCode",{parentName:"p"},"<ImportButton>")," is compatible with the ",(0,r.yg)("inlineCode",{parentName:"p"},"useImport")," hook and is meant to be used as it's upload button. It uses Material UI ",(0,r.yg)("a",{parentName:"p",href:"https://mui.com/material-ui/api/loading-button/#main-content"},(0,r.yg)("inlineCode",{parentName:"a"},"<LoadingButton>"))," component and native html ",(0,r.yg)("a",{parentName:"p",href:"https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input"},(0,r.yg)("inlineCode",{parentName:"a"},"<input>"))," element. It wraps a ",(0,r.yg)("a",{parentName:"p",href:"https://developer.mozilla.org/en-US/docs/Web/HTML/Element/label"},(0,r.yg)("inlineCode",{parentName:"a"},"<label>"))," with a ",(0,r.yg)("a",{parentName:"p",href:"https://mui.com/material-ui/api/loading-button/#main-content"},(0,r.yg)("inlineCode",{parentName:"a"},"<LoadingButton>"))," component and ",(0,r.yg)("a",{parentName:"p",href:"https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input"},(0,r.yg)("inlineCode",{parentName:"a"},"<input>"))," element and accepts it's own properties for separately."),(0,r.yg)("blockquote",null,(0,r.yg)("p",{parentName:"blockquote"},"For more information, refer to the ",(0,r.yg)("a",{parentName:"p",href:"/docs/core/hooks/utilities/use-import"},(0,r.yg)("inlineCode",{parentName:"a"},"useImport")," documentation ","\u2192"))),(0,r.yg)("admonition",{title:"Good to know",type:"simple"},(0,r.yg)("p",{parentName:"admonition"},"You can swizzle this component with the ",(0,r.yg)("a",{parentName:"p",href:"/docs/packages/list-of-packages"},(0,r.yg)("strong",{parentName:"a"},"Refine CLI"))," to customize it.")),(0,r.yg)("h2",{id:"usage"},"Usage"),(0,r.yg)(d,{id:"usage",mdxType:"DocThumbsUpDownFeedbackWidget"},(0,r.yg)("p",null,"Use it like any other Material UI ",(0,r.yg)("a",{parentName:"p",href:"https://mui.com/material-ui/api/loading-button/#main-content"},(0,r.yg)("inlineCode",{parentName:"a"},"<LoadingButton>")),". You can use it with ",(0,r.yg)("a",{parentName:"p",href:"/docs/core/hooks/utilities/use-import"},"useImport"),":"),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-tsx",metastring:"live url=http://localhost:3000/posts previewHeight=340px",live:!0,url:"http://localhost:3000/posts",previewHeight:"340px"},'// visible-block-start\nimport { useImport } from "@refinedev/core";\nimport {\n  useDataGrid,\n  List,\n  // highlight-next-line\n  ImportButton,\n} from "@refinedev/mui";\nimport { DataGrid, GridColDef } from "@mui/x-data-grid";\n\nconst columns: GridColDef[] = [\n  { field: "id", headerName: "ID", type: "number" },\n  { field: "title", headerName: "Title", minWidth: 400, flex: 1 },\n];\n\nconst PostsList: React.FC = () => {\n  const { dataGridProps } = useDataGrid<IPost>();\n\n  const { inputProps, isLoading } = useImport<IPost>();\n\n  return (\n    <List\n      // highlight-start\n      headerButtons={\n        <ImportButton inputProps={inputProps} loading={isLoading} />\n      }\n      // highlight-end\n    >\n      <DataGrid {...dataGridProps} columns={columns} autoHeight />\n    </List>\n  );\n};\n\ninterface IPost {\n  id: number;\n  title: string;\n}\n// visible-block-end\n\nrender(\n  <RefineMuiDemo\n    resources={[\n      {\n        name: "posts",\n        list: PostsList,\n      },\n    ]}\n  />,\n);\n'))),(0,r.yg)("h2",{id:"properties"},"Properties"),(0,r.yg)("h3",{id:"hidetext"},"hideText"),(0,r.yg)(d,{id:"hidetext",mdxType:"DocThumbsUpDownFeedbackWidget"},(0,r.yg)("p",null,(0,r.yg)("inlineCode",{parentName:"p"},"hideText")," is used to show and hide the text of the button. When ",(0,r.yg)("inlineCode",{parentName:"p"},"true"),", only the button icon is visible."),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-tsx",metastring:"live disableScroll previewHeight=120px",live:!0,disableScroll:!0,previewHeight:"120px"},'const { useRouterContext } = RefineCore;\n\n// visible-block-start\nimport { ImportButton } from "@refinedev/mui";\n\nconst MyImportComponent = () => {\n  return (\n    <ImportButton\n      // highlight-next-line\n      hideText={true}\n    />\n  );\n};\n// visible-block-end\n\nrender(\n  <RefineMuiDemo\n    initialRoutes={["/"]}\n    resources={[\n      {\n        name: "posts",\n        list: MyImportComponent,\n      },\n    ]}\n  />,\n);\n'))),(0,r.yg)("h2",{id:"api-reference"},"API Reference"),(0,r.yg)("h3",{id:"properties-1"},"Properties"),(0,r.yg)(d,{id:"properties-1",mdxType:"DocThumbsUpDownFeedbackWidget"},(0,r.yg)(g,{module:"@refinedev/mui/ImportButton",mdxType:"PropsTable"}),(0,r.yg)("admonition",{title:"External Props",type:"simple"},(0,r.yg)("p",{parentName:"admonition"},"It also accepts all props of Material UI ",(0,r.yg)("a",{parentName:"p",href:"https://mui.com/material-ui/api/loading-button/#main-content"},"LoadingButton"),"."))))}f.isMDXComponent=!0}}]);