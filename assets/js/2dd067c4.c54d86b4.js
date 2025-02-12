"use strict";(self.webpackChunkdocumentation=self.webpackChunkdocumentation||[]).push([[56425],{58860:(e,n,t)=>{t.d(n,{xA:()=>d,yg:()=>m});var r=t(37953);function a(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function o(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function i(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?o(Object(t),!0).forEach((function(n){a(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function l(e,n){if(null==e)return{};var t,r,a=function(e,n){if(null==e)return{};var t,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)t=o[r],n.indexOf(t)>=0||(a[t]=e[t]);return a}(e,n);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)t=o[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}var p=r.createContext({}),s=function(e){var n=r.useContext(p),t=n;return e&&(t="function"==typeof e?e(n):i(i({},n),e)),t},d=function(e){var n=s(e.components);return r.createElement(p.Provider,{value:n},e.children)},c="mdxType",g={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},u=r.forwardRef((function(e,n){var t=e.components,a=e.mdxType,o=e.originalType,p=e.parentName,d=l(e,["components","mdxType","originalType","parentName"]),c=s(t),u=a,m=c["".concat(p,".").concat(u)]||c[u]||g[u]||o;return t?r.createElement(m,i(i({ref:n},d),{},{components:t})):r.createElement(m,i({ref:n},d))}));function m(e,n){var t=arguments,a=n&&n.mdxType;if("string"==typeof e||a){var o=t.length,i=new Array(o);i[0]=u;var l={};for(var p in n)hasOwnProperty.call(n,p)&&(l[p]=n[p]);l.originalType=e,l[c]="string"==typeof e?e:a,i[1]=l;for(var s=2;s<o;s++)i[s]=t[s];return r.createElement.apply(null,i)}return r.createElement.apply(null,t)}u.displayName="MDXCreateElement"},27112:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>d,contentTitle:()=>p,default:()=>v,frontMatter:()=>l,metadata:()=>s,toc:()=>c});t(37953);var r=t(58860);function a(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function o(e,n){return n=null!=n?n:{},Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):function(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})),e}function i(e,n){if(null==e)return{};var t,r,a=function(e,n){if(null==e)return{};var t,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)t=o[r],n.indexOf(t)>=0||(a[t]=e[t]);return a}(e,n);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)t=o[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}const l={title:"<FilterDropdown />"},p=void 0,s={unversionedId:"ui-integrations/ant-design/components/filter-dropdown/index",id:"ui-integrations/ant-design/components/filter-dropdown/index",title:"<FilterDropdown />",description:"Usage",source:"@site/docs/ui-integrations/ant-design/components/filter-dropdown/index.md",sourceDirName:"ui-integrations/ant-design/components/filter-dropdown",slug:"/ui-integrations/ant-design/components/filter-dropdown/",permalink:"/docs/ui-integrations/ant-design/components/filter-dropdown/",draft:!1,editUrl:"https://github.com/refinedev/refine/tree/master/documentation/docs/ui-integrations/ant-design/components/filter-dropdown/index.md",tags:[],version:"current",lastUpdatedBy:"Matteo Roggia",lastUpdatedAt:1739391271,formattedLastUpdatedAt:"Feb 12, 2025",frontMatter:{title:"<FilterDropdown />"},sidebar:"mainSidebar",previous:{title:"Breadcrumb",permalink:"/docs/ui-integrations/ant-design/components/breadcrumb/"},next:{title:"<AutoSaveIndicator />",permalink:"/docs/ui-integrations/ant-design/components/auto-save-indicator/"}},d={},c=[{value:"Usage",id:"usage",level:2},{value:"Properties",id:"properties",level:2},{value:"selectedKeys, setSelectedKeys, confirm, clearFilters",id:"selectedkeys-setselectedkeys-confirm-clearfilters",level:3},{value:"mapValue",id:"mapvalue",level:3},{value:"rangePickerFilterMapper",id:"rangepickerfiltermapper",level:4},{value:"Example",id:"example",level:2}],g=e=>function(n){return console.warn("Component "+e+" was not imported, exported, or provided by MDXProvider as global scope"),(0,r.yg)("div",n)},u=g("DocThumbsUpDownFeedbackWidget"),m=g("Image"),y=g("PropsTable"),f=g("CodeSandboxExample"),b={toc:c},h="wrapper";function v(e){var{components:n}=e,t=i(e,["components"]);return(0,r.yg)(h,o(function(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{},r=Object.keys(t);"function"==typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(t).filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})))),r.forEach((function(n){a(e,n,t[n])}))}return e}({},b,t),{components:n,mdxType:"MDXLayout"}),(0,r.yg)("h2",{id:"usage"},"Usage"),(0,r.yg)(u,{id:"usage",mdxType:"DocThumbsUpDownFeedbackWidget"},(0,r.yg)("p",null,(0,r.yg)("inlineCode",{parentName:"p"},"<FilterDropdown>")," is a helper component for ",(0,r.yg)("a",{parentName:"p",href:"https://ant.design/components/table/#components-table-demo-custom-filter-panel"},"filter dropdowns in Ant Design's ",(0,r.yg)("inlineCode",{parentName:"a"},"<Table>")," components.")),(0,r.yg)("p",null,"It serves as a bridge by synchronizing between its children's input value and ",(0,r.yg)("inlineCode",{parentName:"p"},"<Table>"),"'s filter values."),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-tsx",metastring:'title="components/pages/postList.tsx"',title:'"components/pages/postList.tsx"'},'import {\n  List,\n  // highlight-start\n  FilterDropdown,\n  // highlight-end\n  useTable,\n} from "@refinedev/antd";\nimport { Table, Select } from "antd";\n\nconst PostList: React.FC = (props) => {\n  const { tableProps } = useTable<IPost>();\n\n  return (\n    <List>\n      <Table {...tableProps} rowKey="id">\n        <Table.Column dataIndex="id" title="ID" />\n        <Table.Column\n          dataIndex={["category", "id"]}\n          title="Category"\n          key="category.id"\n          // highlight-start\n          filterDropdown={(props) => (\n            <FilterDropdown {...props}>\n              <Select\n                mode="multiple"\n                placeholder="Select Category"\n                options={[\n                  { label: "Ergonomic", value: "1" },\n                  { label: "Island", value: "2" },\n                ]}\n              />\n            </FilterDropdown>\n          )}\n          // highlight-end\n        />\n      </Table>\n    </List>\n  );\n};\n\ninterface IPost {\n  id: number;\n  category: {\n    id: number;\n  };\n}\n')),(0,r.yg)("p",null,"Selecting categories from dropdown will send the id's of categories as filtering values to ",(0,r.yg)("strong",{parentName:"p"},"Table")," and data will be updated by Refine under the hood."),(0,r.yg)("p",null,(0,r.yg)("inlineCode",{parentName:"p"},"<FilterDropdown>")," will put two buttons for filtering and clearing filter actions."),(0,r.yg)(m,{src:"https://refine.ams3.cdn.digitaloceanspaces.com/website/static/img/category_filter-dropdown.png",alt:"Show record action",mdxType:"Image"}),(0,r.yg)("p",null,"We added category options for ",(0,r.yg)("inlineCode",{parentName:"p"},"<Select>")," manually for the sake of simplicity but the ",(0,r.yg)("a",{parentName:"p",href:"/docs/ui-integrations/ant-design/hooks/use-select"},"useSelect")," hook can be used to populate the props of ",(0,r.yg)("inlineCode",{parentName:"p"},"<Select>")),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-tsx"},'const { selectProps: categorySelectProps } = useSelect<ICategory>({\n  resource: "categories",\n  optionLabel: "title",\n  optionValue: "id",\n});\n\n<Select {...categorySelectProps} />;\n'))),(0,r.yg)("h2",{id:"properties"},"Properties"),(0,r.yg)("h3",{id:"selectedkeys-setselectedkeys-confirm-clearfilters"},"selectedKeys, setSelectedKeys, confirm, clearFilters"),(0,r.yg)(u,{id:"selectedkeys-setselectedkeys-confirm-clearfilters",mdxType:"DocThumbsUpDownFeedbackWidget"},(0,r.yg)("p",null,"These are to be passed from ",(0,r.yg)("a",{parentName:"p",href:"https://ant.design/components/table/#Column"},(0,r.yg)("inlineCode",{parentName:"a"},"<Table.Column>"),"'s filterDropdown")," prop.")),(0,r.yg)("h3",{id:"mapvalue"},"mapValue"),(0,r.yg)(u,{id:"mapvalue",mdxType:"DocThumbsUpDownFeedbackWidget"},(0,r.yg)("p",null,"The ",(0,r.yg)("inlineCode",{parentName:"p"},"mapValue")," function is a utility function used to transform the ",(0,r.yg)("inlineCode",{parentName:"p"},"selectedKeys")," based on certain events."),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-ts"},'function mapValue(selectedKeys: React.Key[], event: "onChange" | "value"): any;\n')),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("inlineCode",{parentName:"li"},"selectedKeys"),": The selected keys from the dropdown."),(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("inlineCode",{parentName:"li"},"event"),": The event that triggered the ",(0,r.yg)("inlineCode",{parentName:"li"},"mapValue")," function. It can be either ",(0,r.yg)("inlineCode",{parentName:"li"},"onChange")," or ",(0,r.yg)("inlineCode",{parentName:"li"},"value"),".",(0,r.yg)("ul",{parentName:"li"},(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("inlineCode",{parentName:"li"},"onChange"),": The event that is triggered when the value of the dropdown changes. It is used to map the value to the format that the Refine expects(data provider, syncWithLocation etc.)."),(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("inlineCode",{parentName:"li"},"value"),": When the value needs to be mapped for the child component.")))),(0,r.yg)("p",null,"For example when using ",(0,r.yg)("a",{parentName:"p",href:"/docs/ui-integrations/ant-design/hooks/use-select/"},(0,r.yg)("inlineCode",{parentName:"a"},"useSelect"))," for ",(0,r.yg)("a",{parentName:"p",href:"https://ant.design/components/select/"},(0,r.yg)("inlineCode",{parentName:"a"},"<Select />"))," component, in which case, the values must be mapped to ",(0,r.yg)("inlineCode",{parentName:"p"},"number"),"s using ",(0,r.yg)("inlineCode",{parentName:"p"},"mapValue"),"."),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-tsx"},'import { getDefaultFilter } from "@refinedev/core";\nimport { useTable, FilterDropdown, useSelect } from "@refinedev/antd";\nimport { Table, Select } from "antd";\n\nconst { tableProps, filters } = useTable<IPost>({\n  filters: {\n    initial: [\n      {\n        field: "category.id",\n        value: [1, 2],\n        operator: "in",\n      },\n    ],\n  },\n});\n\nconst { selectProps: categorySelectProps } = useSelect<ICategory>({\n  resource: "categories",\n  optionLabel: "title",\n  optionValue: "id",\n  defaultValue: getDefaultFilter("category.id", filters, "in"),\n});\n\n<Table>\n  <Table.Column dataIndex="id" title="ID" />\n  <Table.Column\n    dataIndex={["category", "id"]}\n    title="Category"\n    key="category.id"\n    filterDropdown={(props) => (\n      <FilterDropdown\n        {...props}\n        mapValue={(selectedKeys) =>\n          selectedKeys.map((i) => parseInt(i.toString()))\n        }\n      >\n        <Select\n          style={{ minWidth: 200 }}\n          mode="multiple"\n          placeholder="Select Category"\n          {...categorySelectProps}\n        />\n      </FilterDropdown>\n    )}\n    defaultFilteredValue={getDefaultFilter("category.id", filters, "in")}\n  />\n</Table>;\n'))),(0,r.yg)("h4",{id:"rangepickerfiltermapper"},"rangePickerFilterMapper"),(0,r.yg)(u,{id:"rangepickerfiltermapper",mdxType:"DocThumbsUpDownFeedbackWidget"},(0,r.yg)("p",null,"A more complex example is using a filter dropdown with a date picker."),(0,r.yg)("p",null,"Imagine you need to filter data based on a date range where Refine's data provider expects dates in ",(0,r.yg)("a",{parentName:"p",href:"https://en.wikipedia.org/wiki/ISO_8601"},"ISO 8601")," format, but Ant Design's ",(0,r.yg)("a",{parentName:"p",href:"https://ant.design/components/date-picker"},(0,r.yg)("inlineCode",{parentName:"a"},"<DatePicker.RangePicker />"))," uses Dayjs objects. To solve this, use the ",(0,r.yg)("inlineCode",{parentName:"p"},"mapValue")," and ",(0,r.yg)("a",{parentName:"p",href:"https://github.com/refinedev/refine/blob/master/packages/antd/src/definitions/filter-mappers/index.ts"},(0,r.yg)("inlineCode",{parentName:"a"},"rangePickerFilterMapper"))," utility function to convert ",(0,r.yg)("inlineCode",{parentName:"p"},"selectedKeys")," to satisfy both the data provider and ",(0,r.yg)("inlineCode",{parentName:"p"},"<DatePicker.RangePicker />"),"."),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-tsx"},'import { getDefaultFilter } from "@refinedev/core";\nimport {\n  DateField,\n  FilterDropdown,\n  rangePickerFilterMapper,\n  useTable,\n} from "@refinedev/antd";\nimport { Table, DatePicker } from "antd";\n\nexport const Posts = () => {\n  const { tableProps, filters } = useTable({\n    filters: {\n      initial: [\n        {\n          field: "created_at",\n          value: ["2022-01-01", "2022-01-31"],\n          operator: "between",\n        },\n      ],\n    },\n  });\n\n  return (\n    <Table {...tableProps} rowKey="id">\n      <Table.Column dataIndex="id" title="ID" />\n      <Table.Column dataIndex="title" title="Title" />\n      <Table.Column\n        dataIndex="createdAt"\n        title="Created At"\n        filterDropdown={(props) => (\n          <FilterDropdown\n            {...props}\n            mapValue={(selectedKeys, event) => {\n              return rangePickerFilterMapper(selectedKeys, event);\n            }}\n          >\n            <DatePicker.RangePicker />\n          </FilterDropdown>\n        )}\n        defaultFilteredValue={getDefaultFilter(\n          "created_at",\n          filters,\n          "between",\n        )}\n      />\n    </Table>\n  );\n};\n')),(0,r.yg)("p",null,"Let's closer look at the ",(0,r.yg)("a",{parentName:"p",href:"https://github.com/refinedev/refine/blob/master/packages/antd/src/definitions/filter-mappers/index.ts"},(0,r.yg)("inlineCode",{parentName:"a"},"rangePickerFilterMapper"))," function source code to understand how it works."),(0,r.yg)("p",null,"when the ",(0,r.yg)("inlineCode",{parentName:"p"},"event")," is:"),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("inlineCode",{parentName:"li"},'"value"'),": It converts the ",(0,r.yg)("inlineCode",{parentName:"li"},"selectedKeys")," to Dayjs objects to be used in the ",(0,r.yg)("inlineCode",{parentName:"li"},"<DatePicker.RangePicker />")," component."),(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("inlineCode",{parentName:"li"},'"onChange"'),", It converts the Dayjs objects to ISO 8601 string format to be used in the Refine(data-provider, syncWithLocation etc.) filter.")),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-ts"},'import type {\n  FilterDropdownProps,\n  MapValueEvent,\n} from "@components/table/components";\nimport dayjs from "dayjs";\n\nexport const rangePickerFilterMapper = (\n  selectedKeys: FilterDropdownProps["selectedKeys"],\n  event: MapValueEvent,\n) => {\n  if (!selectedKeys) {\n    return selectedKeys;\n  }\n\n  if (event === "value") {\n    return selectedKeys.map((key) => {\n      if (typeof key === "string") {\n        return dayjs(key);\n      }\n\n      return key;\n    });\n  }\n\n  if (event === "onChange") {\n    if (selectedKeys.every(dayjs.isDayjs)) {\n      return selectedKeys.map((date: any) => dayjs(date).toISOString());\n    }\n  }\n\n  return selectedKeys;\n};\n')),(0,r.yg)("admonition",{title:"Good to know",type:"simple"},(0,r.yg)("p",{parentName:"admonition"},"If ",(0,r.yg)("a",{parentName:"p",href:"/docs/core/refine-component#syncwithlocation"},"syncWithLocation")," is enabled, on page refresh, the filter values will be type of ",(0,r.yg)("inlineCode",{parentName:"p"},"string")," since they will be parsed from URL. This might produce some incompatibility if data for filter input comes from an API and it's not type of ",(0,r.yg)("inlineCode",{parentName:"p"},"string"),"."),(0,r.yg)("p",{parentName:"admonition"},(0,r.yg)("inlineCode",{parentName:"p"},"getDefaultFilter")," finds filter values for a given column from the given filters. In the example, ",(0,r.yg)("inlineCode",{parentName:"p"},"filters")," passed to ",(0,r.yg)("inlineCode",{parentName:"p"},"getDefaultFilter")," includes filter values from the URL since it comes from ",(0,r.yg)("inlineCode",{parentName:"p"},"useTable"),".")),(0,r.yg)(y,{module:"@refinedev/antd/FilterDropdown",mdxType:"PropsTable"})),(0,r.yg)("h2",{id:"example"},"Example"),(0,r.yg)(u,{id:"example",mdxType:"DocThumbsUpDownFeedbackWidget"},(0,r.yg)(f,{path:"table-antd-use-table",mdxType:"CodeSandboxExample"})))}v.isMDXComponent=!0}}]);