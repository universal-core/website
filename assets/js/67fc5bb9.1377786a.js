"use strict";(self.webpackChunkdocumentation=self.webpackChunkdocumentation||[]).push([[3597],{58860:(e,n,t)=>{t.d(n,{xA:()=>c,yg:()=>h});var o=t(37953);function r(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function a(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);n&&(o=o.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,o)}return t}function i(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?a(Object(t),!0).forEach((function(n){r(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):a(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function p(e,n){if(null==e)return{};var t,o,r=function(e,n){if(null==e)return{};var t,o,r={},a=Object.keys(e);for(o=0;o<a.length;o++)t=a[o],n.indexOf(t)>=0||(r[t]=e[t]);return r}(e,n);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(o=0;o<a.length;o++)t=a[o],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(r[t]=e[t])}return r}var s=o.createContext({}),l=function(e){var n=o.useContext(s),t=n;return e&&(t="function"==typeof e?e(n):i(i({},n),e)),t},c=function(e){var n=l(e.components);return o.createElement(s.Provider,{value:n},e.children)},u="mdxType",d={inlineCode:"code",wrapper:function(e){var n=e.children;return o.createElement(o.Fragment,{},n)}},g=o.forwardRef((function(e,n){var t=e.components,r=e.mdxType,a=e.originalType,s=e.parentName,c=p(e,["components","mdxType","originalType","parentName"]),u=l(t),g=r,h=u["".concat(s,".").concat(g)]||u[g]||d[g]||a;return t?o.createElement(h,i(i({ref:n},c),{},{components:t})):o.createElement(h,i({ref:n},c))}));function h(e,n){var t=arguments,r=n&&n.mdxType;if("string"==typeof e||r){var a=t.length,i=new Array(a);i[0]=g;var p={};for(var s in n)hasOwnProperty.call(n,s)&&(p[s]=n[s]);p.originalType=e,p[u]="string"==typeof e?e:r,i[1]=p;for(var l=2;l<a;l++)i[l]=t[l];return o.createElement.apply(null,i)}return o.createElement.apply(null,t)}g.displayName="MDXCreateElement"},98841:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>c,contentTitle:()=>s,default:()=>b,frontMatter:()=>p,metadata:()=>l,toc:()=>u});t(37953);var o=t(58860);function r(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function a(e,n){return n=null!=n?n:{},Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):function(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);n&&(o=o.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,o)}return t}(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})),e}function i(e,n){if(null==e)return{};var t,o,r=function(e,n){if(null==e)return{};var t,o,r={},a=Object.keys(e);for(o=0;o<a.length;o++)t=a[o],n.indexOf(t)>=0||(r[t]=e[t]);return r}(e,n);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(o=0;o<a.length;o++)t=a[o],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(r[t]=e[t])}return r}const p={id:"useCheckboxGroup",title:"useCheckboxGroup"},s=void 0,l={unversionedId:"api-reference/antd/hooks/field/useCheckboxGroup",id:"version-3.xx.xx/api-reference/antd/hooks/field/useCheckboxGroup",title:"useCheckboxGroup",description:"useCheckboxGroup hook allows you to manage an Ant Design Checkbox.Group component when records in a resource needs to be used as checkbox options.",source:"@site/versioned_docs/version-3.xx.xx/api-reference/antd/hooks/field/useCheckboxGroup.md",sourceDirName:"api-reference/antd/hooks/field",slug:"/api-reference/antd/hooks/field/useCheckboxGroup",permalink:"/docs/3.xx.xx/api-reference/antd/hooks/field/useCheckboxGroup",draft:!1,editUrl:"https://github.com/refinedev/refine/tree/master/documentation/versioned_docs/version-3.xx.xx/api-reference/antd/hooks/field/useCheckboxGroup.md",tags:[],version:"3.xx.xx",lastUpdatedBy:"Matteo Roggia",lastUpdatedAt:1741812574,formattedLastUpdatedAt:"Mar 12, 2025",frontMatter:{id:"useCheckboxGroup",title:"useCheckboxGroup"},sidebar:"someSidebar",previous:{title:"Ant Design API",permalink:"/docs/3.xx.xx/api-reference/antd"},next:{title:"useRadioGroup",permalink:"/docs/3.xx.xx/api-reference/antd/hooks/field/useRadioGroup"}},c={},u=[{value:"Usage",id:"usage",level:2},{value:"Options",id:"options",level:2},{value:"<code>resource</code>",id:"resource",level:3},{value:"<code>defaultValue</code>",id:"defaultvalue",level:3},{value:"<code>optionLabel</code> and <code>optionValue</code>",id:"optionlabel-and-optionvalue",level:3},{value:"<code>filters</code>",id:"filters",level:3},{value:"<code>sort</code>",id:"sort",level:3},{value:"<code>fetchSize</code>",id:"fetchsize",level:3},{value:"<code>queryOptions</code>",id:"queryoptions",level:3},{value:"<code>pagination</code>",id:"pagination",level:3},{value:"API Reference",id:"api-reference",level:2},{value:"Properties",id:"properties",level:3},{value:"Example",id:"example",level:2}],d=e=>function(n){return console.warn("Component "+e+" was not imported, exported, or provided by MDXProvider as global scope"),(0,o.yg)("div",n)},g=d("DocThumbsUpDownFeedbackWidget"),h=d("PropsTable"),y=d("CodeSandboxExample"),m={toc:u},f="wrapper";function b(e){var{components:n}=e,t=i(e,["components"]);return(0,o.yg)(f,a(function(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{},o=Object.keys(t);"function"==typeof Object.getOwnPropertySymbols&&(o=o.concat(Object.getOwnPropertySymbols(t).filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})))),o.forEach((function(n){r(e,n,t[n])}))}return e}({},m,t),{components:n,mdxType:"MDXLayout"}),(0,o.yg)("p",null,(0,o.yg)("inlineCode",{parentName:"p"},"useCheckboxGroup")," hook allows you to manage an Ant Design ",(0,o.yg)("a",{parentName:"p",href:"https://ant.design/components/checkbox/#components-checkbox-demo-group"},"Checkbox.Group")," component when records in a resource needs to be used as checkbox options."),(0,o.yg)("h2",{id:"usage"},"Usage"),(0,o.yg)(g,{id:"usage",mdxType:"DocThumbsUpDownFeedbackWidget"},(0,o.yg)("p",null,"We will demonstrate how to get data at the ",(0,o.yg)("inlineCode",{parentName:"p"},"/tags")," endpoint from the ",(0,o.yg)("inlineCode",{parentName:"p"},"https://api.fake-rest.refine.dev")," REST API."),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-ts",metastring:'title="https://api.fake-rest.refine.dev/tags"',title:'"https://api.fake-rest.refine.dev/tags"'},'{\n  [\n    {\n      id: 1,\n      title: "Driver Deposit",\n    },\n    {\n      id: 2,\n      title: "Index Compatible Synergistic",\n    },\n    {\n      id: 3,\n      title: "Plum",\n    },\n  ];\n}\n')),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-tsx",metastring:'title="pages/posts/create.tsx"',title:'"pages/posts/create.tsx"'},'import { Form, Checkbox, useCheckboxGroup } from "@pankod/refine-antd";\n\nexport const PostCreate: React.FC = () => {\n  // highlight-start\n  const { checkboxGroupProps } = useCheckboxGroup<ITag>({\n    resource: "tags",\n  });\n  // highlight-end\n\n  return (\n    <Form>\n      <Form.Item label="Tags" name="tags">\n        // highlight-next-line\n        <Checkbox.Group {...checkboxGroupProps} />\n      </Form.Item>\n    </Form>\n  );\n};\n\ninterface ITag {\n  id: number;\n  title: string;\n}\n')),(0,o.yg)("br",null),(0,o.yg)("p",null,"All we have to do is pass the ",(0,o.yg)("inlineCode",{parentName:"p"},"checkboxGroupProps")," it returns to the ",(0,o.yg)("inlineCode",{parentName:"p"},"<Checkbox.Group>")," component.\n",(0,o.yg)("inlineCode",{parentName:"p"},"useCheckboxGroup")," uses the ",(0,o.yg)("inlineCode",{parentName:"p"},"useList")," hook for fetching data. ",(0,o.yg)("a",{parentName:"p",href:"/docs/3.xx.xx/api-reference/core/hooks/data/useList"},"Refer to ",(0,o.yg)("inlineCode",{parentName:"a"},"useList")," hook for details. ","\u2192")),(0,o.yg)("img",{src:"https://refine.ams3.cdn.digitaloceanspaces.com/website/static/img/hooks/useCheckboxGroup/basic.png",alt:"Tags"})),(0,o.yg)("h2",{id:"options"},"Options"),(0,o.yg)("h3",{id:"resource"},(0,o.yg)("inlineCode",{parentName:"h3"},"resource")),(0,o.yg)(g,{id:"resource",mdxType:"DocThumbsUpDownFeedbackWidget"},(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-tsx"},'const { checkboxGroupProps } = useCheckboxGroup({\n  resource: "tags",\n});\n')),(0,o.yg)("p",null,(0,o.yg)("inlineCode",{parentName:"p"},"resource")," property determines which? API resource endpoint to fetch records from ",(0,o.yg)("a",{parentName:"p",href:"/docs/3.xx.xx/api-reference/core/providers/data-provider"},(0,o.yg)("inlineCode",{parentName:"a"},"dataProvider")),". It returns properly configured ",(0,o.yg)("inlineCode",{parentName:"p"},"options")," values for checkboxes."),(0,o.yg)("p",null,(0,o.yg)("a",{parentName:"p",href:"https://ant.design/components/checkbox"},"Refer to Ant Design Checkbox.Group component documentation for detailed info for ",(0,o.yg)("inlineCode",{parentName:"a"},"options"),". ","\u2192"))),(0,o.yg)("h3",{id:"defaultvalue"},(0,o.yg)("inlineCode",{parentName:"h3"},"defaultValue")),(0,o.yg)(g,{id:"defaultvalue",mdxType:"DocThumbsUpDownFeedbackWidget"},(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-tsx"},'const { selectProps } = useCheckboxGroup({\n  resource: "languages",\n  // highlight-next-line\n  defaultValue: [1, 2],\n});\n')),(0,o.yg)("p",null,"The easiest way to selecting a default values for checkbox fields is by passing in ",(0,o.yg)("inlineCode",{parentName:"p"},"defaultValue"),".")),(0,o.yg)("h3",{id:"optionlabel-and-optionvalue"},(0,o.yg)("inlineCode",{parentName:"h3"},"optionLabel")," and ",(0,o.yg)("inlineCode",{parentName:"h3"},"optionValue")),(0,o.yg)(g,{id:"optionlabel-and-optionvalue",mdxType:"DocThumbsUpDownFeedbackWidget"},(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-tsx"},'const { checkboxGroupProps } = useCheckboxGroup({\n  resource: "tags",\n  // highlight-start\n  optionLabel: "title",\n  optionValue: "id",\n  // highlight-end\n});\n')),(0,o.yg)("p",null,(0,o.yg)("inlineCode",{parentName:"p"},"optionLabel")," and ",(0,o.yg)("inlineCode",{parentName:"p"},"optionValue")," allows you to change the values and appearances of your options. Default values are ",(0,o.yg)("inlineCode",{parentName:"p"},'optionLabel = "title"')," and ",(0,o.yg)("inlineCode",{parentName:"p"},'optionValue = "id"'),"."),(0,o.yg)("admonition",{type:"tip"},(0,o.yg)("p",{parentName:"admonition"},"Supports use with ",(0,o.yg)("inlineCode",{parentName:"p"},"optionLabel")," and ",(0,o.yg)("inlineCode",{parentName:"p"},"optionValue")," ",(0,o.yg)("a",{parentName:"p",href:"https://lodash.com/docs/4.17.15#get"},"Object path")," syntax."),(0,o.yg)("pre",{parentName:"admonition"},(0,o.yg)("code",{parentName:"pre",className:"language-tsx"},'const { options } = useSelect({\n  resource: "categories",\n  // highlight-start\n  optionLabel: "nested.title",\n  optionValue: "nested.id",\n  // highlight-end\n});\n')))),(0,o.yg)("h3",{id:"filters"},(0,o.yg)("inlineCode",{parentName:"h3"},"filters")),(0,o.yg)(g,{id:"filters",mdxType:"DocThumbsUpDownFeedbackWidget"},(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-tsx"},'const { checkboxGroupProps } = useCheckboxGroup({\n  resource: "tags",\n  // highlight-start\n  filters: [\n    {\n      field: "title",\n      operator: "eq",\n      value: "Driver Deposit",\n    },\n  ],\n  // highlight-end\n});\n')),(0,o.yg)("p",null,"It allows us to add some filters while fetching the data. For example, if you want to list only the ",(0,o.yg)("inlineCode",{parentName:"p"},"titles")," that are equal to ",(0,o.yg)("inlineCode",{parentName:"p"},'"Driver Deposit"')," records.")),(0,o.yg)("h3",{id:"sort"},(0,o.yg)("inlineCode",{parentName:"h3"},"sort")),(0,o.yg)(g,{id:"sort",mdxType:"DocThumbsUpDownFeedbackWidget"},(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-tsx"},'const { checkboxGroupProps } = useCheckboxGroup({\n  resource: "tags",\n  // highlight-start\n  sort: [\n    {\n      field: "title",\n      order: "asc",\n    },\n  ],\n  // highlight-end\n});\n')),(0,o.yg)("p",null,"It allows us to sort the ",(0,o.yg)("inlineCode",{parentName:"p"},"options"),". For example, if you want to sort your list according to ",(0,o.yg)("inlineCode",{parentName:"p"},"title")," by ascending.")),(0,o.yg)("h3",{id:"fetchsize"},(0,o.yg)("inlineCode",{parentName:"h3"},"fetchSize")),(0,o.yg)(g,{id:"fetchsize",mdxType:"DocThumbsUpDownFeedbackWidget"},(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-tsx"},'const { selectProps } = useCheckboxGroup({\n  resource: "languages",\n  // highlight-next-line\n  fetchSize: 20,\n});\n')),(0,o.yg)("p",null,"Amount of records to fetch in checkboxes.")),(0,o.yg)("h3",{id:"queryoptions"},(0,o.yg)("inlineCode",{parentName:"h3"},"queryOptions")),(0,o.yg)(g,{id:"queryoptions",mdxType:"DocThumbsUpDownFeedbackWidget"},(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-tsx"},'const { checkboxGroupProps } = useCheckboxGroup({\n  resource: "tags",\n  // highlight-start\n  queryOptions: {\n    onError: () => {\n      console.log("triggers when on query return Error");\n    },\n  },\n  // highlight-end\n});\n')),(0,o.yg)("p",null,(0,o.yg)("a",{parentName:"p",href:"https://react-query.tanstack.com/reference/useQuery"},"useQuery")," options can be set by passing ",(0,o.yg)("inlineCode",{parentName:"p"},"queryOptions")," property.")),(0,o.yg)("h3",{id:"pagination"},(0,o.yg)("inlineCode",{parentName:"h3"},"pagination")),(0,o.yg)(g,{id:"pagination",mdxType:"DocThumbsUpDownFeedbackWidget"},(0,o.yg)("p",null,"Allows us to set page and items per page values."),(0,o.yg)("p",null,"For example imagine that we have 1000 post records:"),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-ts"},'const { selectProps } = useSelect({\n  resource: "categories",\n  // highlight-next-line\n  pagination: { current: 3, pageSize: 8 },\n});\n')),(0,o.yg)("blockquote",null,(0,o.yg)("p",{parentName:"blockquote"},"Listing will start from page 3 showing 8 records."))),(0,o.yg)("h2",{id:"api-reference"},"API Reference"),(0,o.yg)("h3",{id:"properties"},"Properties"),(0,o.yg)(g,{id:"properties",mdxType:"DocThumbsUpDownFeedbackWidget"},(0,o.yg)(h,{module:"@pankod/refine-antd/useCheckboxGroup",mdxType:"PropsTable"})),(0,o.yg)("h2",{id:"example"},"Example"),(0,o.yg)(g,{id:"example",mdxType:"DocThumbsUpDownFeedbackWidget"},(0,o.yg)(y,{path:"field-antd-use-checkbox-group",mdxType:"CodeSandboxExample"})))}b.isMDXComponent=!0}}]);