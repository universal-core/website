"use strict";(self.webpackChunkdocumentation=self.webpackChunkdocumentation||[]).push([[73147],{58860:(e,t,n)=>{n.d(t,{xA:()=>s,yg:()=>g});var r=n(37953);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function d(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var m=r.createContext({}),p=function(e){var t=r.useContext(m),n=t;return e&&(n="function"==typeof e?e(t):a(a({},t),e)),n},s=function(e){var t=p(e.components);return r.createElement(m.Provider,{value:t},e.children)},c="mdxType",l={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},h=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,i=e.originalType,m=e.parentName,s=d(e,["components","mdxType","originalType","parentName"]),c=p(n),h=o,g=c["".concat(m,".").concat(h)]||c[h]||l[h]||i;return n?r.createElement(g,a(a({ref:t},s),{},{components:n})):r.createElement(g,a({ref:t},s))}));function g(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var i=n.length,a=new Array(i);a[0]=h;var d={};for(var m in t)hasOwnProperty.call(t,m)&&(d[m]=t[m]);d.originalType=e,d[c]="string"==typeof e?e:o,a[1]=d;for(var p=2;p<i;p++)a[p]=n[p];return r.createElement.apply(null,a)}return r.createElement.apply(null,n)}h.displayName="MDXCreateElement"},1047:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>s,contentTitle:()=>m,default:()=>y,frontMatter:()=>d,metadata:()=>p,toc:()=>c});n(37953);var r=n(58860);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){return t=null!=t?t:{},Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):function(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))})),e}function a(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}const d={title:"Theming"},m=void 0,p={unversionedId:"ui-integrations/ant-design/theming/index",id:"ui-integrations/ant-design/theming/index",title:"Theming",description:"Ant Design allows you to customize design tokens to satisfy UI diversity from business or brand requirements, including primary color, border radius, border color, etc.",source:"@site/docs/ui-integrations/ant-design/theming/index.md",sourceDirName:"ui-integrations/ant-design/theming",slug:"/ui-integrations/ant-design/theming/",permalink:"/docs/ui-integrations/ant-design/theming/",draft:!1,editUrl:"https://github.com/refinedev/refine/tree/master/documentation/docs/ui-integrations/ant-design/theming/index.md",tags:[],version:"current",lastUpdatedBy:"Matteo Roggia",lastUpdatedAt:1741814802,formattedLastUpdatedAt:"Mar 12, 2025",frontMatter:{title:"Theming"},sidebar:"mainSidebar",previous:{title:"Storybook",permalink:"/docs/examples/storybook/antd-storybook"},next:{title:"Migration Guide",permalink:"/docs/ui-integrations/ant-design/migration-guide/"}},s={},c=[{value:"Predefined Themes",id:"predefined-themes",level:2},{value:"Theme customization",id:"theme-customization",level:2},{value:"Overriding the themes",id:"overriding-the-themes",level:3},{value:"Use Preset Algorithms",id:"use-preset-algorithms",level:3},{value:"Switching to dark theme",id:"switching-to-dark-theme",level:4},{value:"<code>useNotificationProvider</code> compatible with Theme",id:"usenotificationprovider-compatible-with-theme",level:3},{value:"Example",id:"example",level:2}],l=e=>function(t){return console.warn("Component "+e+" was not imported, exported, or provided by MDXProvider as global scope"),(0,r.yg)("div",t)},h=l("DocThumbsUpDownFeedbackWidget"),g=l("CodeSandboxExample"),u={toc:c},f="wrapper";function y(e){var{components:t}=e,n=a(e,["components"]);return(0,r.yg)(f,i(function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{},r=Object.keys(n);"function"==typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(n).filter((function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable})))),r.forEach((function(t){o(e,t,n[t])}))}return e}({},u,n),{components:t,mdxType:"MDXLayout"}),(0,r.yg)("p",null,"Ant Design allows you to customize design tokens to satisfy UI diversity from business or brand requirements, including primary color, border radius, border color, etc.\nDesign Tokens are the smallest element that affects the theme. By modifying the Design Token, we can present various themes or components."),(0,r.yg)("blockquote",null,(0,r.yg)("p",{parentName:"blockquote"},"For more information, refer to the ",(0,r.yg)("a",{parentName:"p",href:"https://ant.design/docs/react/customize-theme"},"Ant Design documentation about theme customization ","\u2192"))),(0,r.yg)("h2",{id:"predefined-themes"},"Predefined Themes"),(0,r.yg)(h,{id:"predefined-themes",mdxType:"DocThumbsUpDownFeedbackWidget"},(0,r.yg)("p",null,(0,r.yg)("a",{parentName:"p",href:"https://github.com/refinedev/refine/blob/master/packages/antd/src/definitions/themes/index.ts"},(0,r.yg)("inlineCode",{parentName:"a"},"RefineThemes"))," has predefined themes that you can use by importing them from ",(0,r.yg)("inlineCode",{parentName:"p"},"@refinedev/antd")," package."),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-ts"},"const { Blue, Purple, Magenta, Red, Orange, Yellow } = RefineThemes;\n")),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-tsx"},'import { Refine } from "@refinedev/core";\nimport { ThemedLayoutV2, RefineThemes } from "@refinedev/antd";\n\nimport { ConfigProvider } from "antd";\n\nconst App: React.FC = () => {\n  return (\n    <ConfigProvider theme={RefineThemes.Blue}>\n      <Refine\n      /* ... */\n      >\n        <ThemedLayoutV2>{/* ... */}</ThemedLayoutV2>\n      </Refine>\n    </ConfigProvider>\n  );\n};\n')),(0,r.yg)("p",null,"If you want to see how themes change the look of the application, check out this ",(0,r.yg)("a",{parentName:"p",href:"/docs/examples/themes/refine-themes-antd/"},"example ","\u2192"))),(0,r.yg)("h2",{id:"theme-customization"},"Theme customization"),(0,r.yg)(h,{id:"theme-customization",mdxType:"DocThumbsUpDownFeedbackWidget"},(0,r.yg)("p",null,"You can use either the ",(0,r.yg)("a",{parentName:"p",href:"https://ant.design/components/config-provider/#components-config-provider-demo-theme"},(0,r.yg)("inlineCode",{parentName:"a"},"<ConfigProvider/>"))," component or the ",(0,r.yg)("inlineCode",{parentName:"p"},"RefineThemes")," provided by Refine to change the theme. This is not required if you decide to use the default theme.")),(0,r.yg)("h3",{id:"overriding-the-themes"},"Overriding the themes"),(0,r.yg)(h,{id:"overriding-the-themes",mdxType:"DocThumbsUpDownFeedbackWidget"},(0,r.yg)("p",null,"You can not only override or extend the default themes, but also create your own, just like this:"),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-tsx"},'import { Refine } from "@refinedev/core";\nimport { ThemedLayoutV2 } from "@refinedev/antd";\n\nimport { ConfigProvider } from "antd";\n\nconst API_URL = "https://api.fake-rest.refine.dev";\n\nconst App: React.FC = () => {\n  return (\n    // highlight-start\n    <ConfigProvider\n      theme={{\n        components: {\n          Button: {\n            borderRadius: 0,\n          },\n          Typography: {\n            colorTextHeading: "#1890ff",\n          },\n        },\n        token: {\n          colorPrimary: "#f0f",\n        },\n      }}\n    >\n      {/* highlight-end */}\n      <Refine\n      /* ... */\n      >\n        <ThemedLayoutV2>{/* ... */}</ThemedLayoutV2>\n      </Refine>\n      // highlight-next-line\n    </ConfigProvider>\n  );\n};\n'))),(0,r.yg)("h3",{id:"use-preset-algorithms"},"Use Preset Algorithms"),(0,r.yg)(h,{id:"use-preset-algorithms",mdxType:"DocThumbsUpDownFeedbackWidget"},(0,r.yg)("p",null,"Themes with different styles can be quickly generated by modifying the algorithm. Ant Design 5.0 provides three sets of ",(0,r.yg)("a",{parentName:"p",href:"https://ant.design/docs/react/customize-theme#theme-presets"},"preset algorithms by default"),": the default algorithm ",(0,r.yg)("inlineCode",{parentName:"p"},"theme.defaultAlgorithm"),", the dark algorithm ",(0,r.yg)("inlineCode",{parentName:"p"},"theme.darkAlgorithm")," and the compact algorithm ",(0,r.yg)("inlineCode",{parentName:"p"},"theme.compactAlgorithm"),"."),(0,r.yg)("p",null,"You can switch between algorithms by modifying the algorithm property of theme in ",(0,r.yg)("a",{parentName:"p",href:"https://ant.design/components/config-provider/#components-config-provider-demo-theme"},(0,r.yg)("inlineCode",{parentName:"a"},"<ConfigProvider/>")),"."),(0,r.yg)("blockquote",null,(0,r.yg)("p",{parentName:"blockquote"},"For more information, refer to the ",(0,r.yg)("a",{parentName:"p",href:"https://ant.design/docs/react/customize-theme#use-preset-algorithms"},"Ant Design documentation on customizing themes","\u2192")))),(0,r.yg)("h4",{id:"switching-to-dark-theme"},"Switching to dark theme"),(0,r.yg)(h,{id:"switching-to-dark-theme",mdxType:"DocThumbsUpDownFeedbackWidget"},(0,r.yg)("p",null,"Let's start with adding a switch to the ",(0,r.yg)("inlineCode",{parentName:"p"},"Header")," component:"),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-tsx"},'import { Space, Button } from "antd";\n\ninterface HeaderProps {\n  theme: "light" | "dark";\n  setTheme: (theme: "light" | "dark") => void;\n}\n\nconst Header: FC<HeaderProps> = (props) => {\n  return (\n    <Space\n      direction="vertical"\n      align="end"\n      style={{\n        padding: "1rem",\n      }}\n    >\n      <Button\n        onClick={() => {\n          props.setTheme(props.theme === "light" ? "dark" : "light");\n        }}\n        icon={props.theme === "light" ? <IconMoonStars /> : <IconSun />}\n      />\n    </Space>\n  );\n};\n')),(0,r.yg)("p",null,"Then, we can use the ",(0,r.yg)("inlineCode",{parentName:"p"},"theme")," property of the ",(0,r.yg)("inlineCode",{parentName:"p"},"ConfigProvider")," component to switch between light and dark themes:"),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-tsx"},'import { Refine } from "@refinedev/core";\nimport { ThemedLayoutV2 } from "@refinedev/antd";\nimport { ConfigProvider, theme } from "antd";\n\nimport { Header } from "./Header";\n\nconst App: React.FC = () => {\n  // highlight-next-line\n  const [currentTheme, setCurrentTheme] = useState<"light" | "dark">("dark");\n\n  return (\n    <ConfigProvider\n      // highlight-start\n      theme={{\n        algorithm:\n          currentTheme === "light"\n            ? theme.defaultAlgorithm\n            : theme.darkAlgorithm,\n      }}\n      // highlight-end\n    >\n      <Refine\n      /* ... */\n      >\n        <ThemedLayoutV2 Header={Header}>{/* ... */}</ThemedLayoutV2>\n      </Refine>\n    </ConfigProvider>\n  );\n};\n'))),(0,r.yg)("h3",{id:"usenotificationprovider-compatible-with-theme"},(0,r.yg)("inlineCode",{parentName:"h3"},"useNotificationProvider")," compatible with Theme"),(0,r.yg)(h,{id:"usenotificationprovider-compatible-with-theme",mdxType:"DocThumbsUpDownFeedbackWidget"},(0,r.yg)("p",null,"The ",(0,r.yg)("inlineCode",{parentName:"p"},"notificationProvider")," export has been deprecated because it cannot consume the current ",(0,r.yg)("inlineCode",{parentName:"p"},"theme")," context by default. To enable the ",(0,r.yg)("inlineCode",{parentName:"p"},"Notification")," component to consume the current ",(0,r.yg)("inlineCode",{parentName:"p"},"theme")," context, import the ",(0,r.yg)("inlineCode",{parentName:"p"},"App")," component from ",(0,r.yg)("inlineCode",{parentName:"p"},"antd")," and the ",(0,r.yg)("inlineCode",{parentName:"p"},"useNotificationProvider")," export from ",(0,r.yg)("inlineCode",{parentName:"p"},"@refinedev/antd")," and pass it as highlighted below:"),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-tsx"},'import { Refine } from "@refinedev/core";\nimport { ThemedLayoutV2, useNotificationProvider } from "@refinedev/antd";\n\nimport { ConfigProvider, App as AntdApp } from "antd";\n\nconst API_URL = "https://api.fake-rest.refine.dev";\n\nconst App: React.FC = () => {\n    return (\n        <ConfigProvider theme={RefineThemes.Blue}>\n            {/* highlight-next-line */}\n            <AntdApp>\n                <Refine\n                    //...\n                    {/* highlight-next-line */}\n                    notificationProvider={useNotificationProvider}\n                >\n                    <ThemedLayoutV2>{/* ... */}</ThemedLayoutV2>\n                </Refine>\n                {/* highlight-next-line */}\n            </AntdApp>\n        </ConfigProvider>\n    );\n};\n')),(0,r.yg)("p",null,"If you want to customize the default layout elements provided with ",(0,r.yg)("inlineCode",{parentName:"p"},"@refinedev/antd")," package, check out the ",(0,r.yg)("a",{parentName:"p",href:"/docs/advanced-tutorials/custom-layout"},"Custom Layout")," tutorial.")),(0,r.yg)("h2",{id:"example"},"Example"),(0,r.yg)(h,{id:"example",mdxType:"DocThumbsUpDownFeedbackWidget"},(0,r.yg)(g,{path:"customization-theme-antd",mdxType:"CodeSandboxExample"})))}y.isMDXComponent=!0}}]);