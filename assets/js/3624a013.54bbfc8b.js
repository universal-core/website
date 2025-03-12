"use strict";(self.webpackChunkdocumentation=self.webpackChunkdocumentation||[]).push([[20989],{88123:(e,t,n)=>{n.d(t,{O:()=>m});var o=n(68835),r=n(37953),a=n(86743),i=n(6375),s=n(62201);const l=({horizontalSize:e,onMouseDown:t})=>r.createElement("div",{className:(0,o.A)("resize-handler","hidden","md:block","absolute","z-[3]","top-0","bottom-0","w-2.5","cursor-ew-resize"),"data-direction":"horizontal",onMouseDown:t,style:{left:`calc(${e}% - 5px)`}});function d(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function c(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{},o=Object.keys(n);"function"==typeof Object.getOwnPropertySymbols&&(o=o.concat(Object.getOwnPropertySymbols(n).filter((function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable})))),o.forEach((function(t){d(e,t,n[t])}))}return e}function p(e,t){return t=null!=t?t:{},Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):function(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))})),e}function u(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},a=Object.keys(e);for(o=0;o<a.length;o++)n=a[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(o=0;o<a.length;o++)n=a[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}const m=e=>"nextjs"===(null==e?void 0:e.template)?r.createElement(h,e):r.createElement(v,e),v=e=>{var t,n,d,m,v,h,{startRoute:g,showNavigator:y,showLineNumbers:f,showOpenInCodeSandbox:b,initialPercentage:w=50,dependencies:x,showReadOnly:O,options:k={showTabs:!0,initMode:"lazy",classes:{"sp-bridge-frame":"!hidden","sp-layout":"!rounded-lg !border-gray-300 dark:!border-gray-700","sp-editor":"!gap-0 border-r !border-r-gray-300 dark:!border-r-gray-700","sp-tabs":"!border-b-gray-300 dark:!border-b-gray-700 !bg-gray-0 dark:!bg-gray-800","sp-tabs-scrollable-container":"!min-h-[32px]","sp-input":"!text-gray-800 dark:!text-gray-100","sp-cm":(0,o.A)("p-0 bg-transparent","[&>.cm-editor]:!bg-refine-react-light-code","[&>.cm-editor]:dark:!bg-refine-react-dark-code","[&_.cm-activeLine]:!bg-gray-100 [&_.cm-activeLine]:dark:!bg-gray-800"),"sp-icon-standalone":"!bg-gray-300 dark:!bg-gray-700 !text-gray-400 dark:!text-gray-500","sp-file-explorer":"border-r !border-r-gray-300 dark:!border-r-gray-700","sp-console":(0,o.A)("not-prose","!border-t-0 !border !border-solid !border-t-none","!border-gray-300 dark:!border-gray-700","!rounded-bl-lg !rounded-br-lg","!bg-refine-react-light-code","dark:!bg-refine-react-dark-code"),"sp-console-header":(0,o.A)("!bg-gray-0 dark:!bg-gray-800","border-b border-solid !border-b-gray-300 dark:!border-b-gray-700","!h-[32px] !min-h-[32px]"),"sp-console-header-actions":(0,o.A)("h-full","!gap-0"),"sp-console-header-button":(0,o.A)("!bg-transparent","!border !border-solid !border-b-0 !border-x-gray-300 dark:!border-x-gray-700","!border-t-2 !border-t-transparent [&[data-active='true']]:!border-t-refine-react-light-link dark:[&[data-active='true']]:!border-t-refine-react-dark-link","h-full","!text-gray-800 dark:!text-gray-100","!rounded-none","-ml-px"),"sp-console-list":(0,o.A)("!bg-refine-react-light-code","dark:!bg-refine-react-dark-code","[&>code]:!bg-transparent"),"sp-tab-button":(0,o.A)("!h-8","!px-2 !pb-2 !pt-1.5","!text-gray-800 dark:!text-gray-100","!border !border-solid !border-b-0 !border-x-gray-300 dark:!border-x-gray-700","-ml-px first:ml-0","!border-t-2 !border-t-transparent [&[data-active='true']]:!border-t-refine-react-light-link dark:[&[data-active='true']]:!border-t-refine-react-dark-link")}},template:E="react-ts",customSetup:D,files:P,previewOnly:N,layout:R,height:C=420,wrapperClassName:j,className:_,showFiles:S=!1,showConsole:A=!1,hidePreview:M=!1}=e,T=u(e,["startRoute","showNavigator","showLineNumbers","showOpenInCodeSandbox","initialPercentage","dependencies","showReadOnly","options","template","customSetup","files","previewOnly","layout","height","wrapperClassName","className","showFiles","showConsole","hidePreview"]);const[F,L]=r.useState(!1);r.useEffect((()=>{L(!0)}),[]);const{colorMode:z}=(0,s.G)();var I,U;null!=k||(k={}),null!==(I=(v=k).resizablePanels)&&void 0!==I||(v.resizablePanels=!0),null!==(U=(h=k).editorWidthPercentage)&&void 0!==U||(h.editorWidthPercentage=null!=w?w:50);const $={showTabs:k.showTabs,showLineNumbers:k.showLineNumbers,showInlineErrors:k.showInlineErrors,wrapContent:k.wrapContent,closableTabs:k.closableTabs,initMode:k.initMode,extensions:null===(t=k.codeEditor)||void 0===t?void 0:t.extensions,extensionsKeymap:null===(n=k.codeEditor)||void 0===n?void 0:n.extensionsKeymap,readOnly:k.readOnly,showReadOnly:null!=O?O:k.showReadOnly,additionalLanguages:null===(d=k.codeEditor)||void 0===d?void 0:d.additionalLanguages},W={activeFile:k.activeFile,visibleFiles:k.visibleFiles,recompileMode:k.recompileMode,recompileDelay:k.recompileDelay,autorun:k.autorun,autoReload:k.autoReload,bundlerURL:k.bundlerURL,startRoute:k.startRoute,skipEval:k.skipEval,fileResolver:k.fileResolver,initMode:k.initMode,initModeObserverOptions:k.initModeObserverOptions,externalResources:k.externalResources,logLevel:k.logLevel,classes:k.classes},[X,H]=r.useState(!1),{onHandleMouseDown:B,horizontalSize:q}=(({initialSize:e=50})=>{const[t,n]=r.useState(e),o=r.useRef(null),a=e=>{if(!o.current)return;const t=o.current.parentElement;if(!t)return;const{left:r,width:a}=t.getBoundingClientRect(),i=(e.clientX-r)/a*100,s=Math.min(Math.max(i,25),75);n(s),t.querySelectorAll(".sp-stack").forEach((e=>{e.style.pointerEvents="none"}))},i=()=>{var e;const t=null===(e=o.current)||void 0===e?void 0:e.parentElement;t&&(t.querySelectorAll(".sp-stack").forEach((e=>{e.style.pointerEvents=""})),o.current=null)};return r.useEffect((()=>(document.body.addEventListener("mousemove",a),document.body.addEventListener("mouseup",i),()=>{document.body.removeEventListener("mousemove",a),document.body.removeEventListener("mouseup",i)})),[]),{horizontalSize:t,onHandleMouseDown:r.useCallback((e=>{o.current=e.target}),[])}})({initialSize:k.editorWidthPercentage}),G=!N&&!(null==R?void 0:R.includes("col"));var Y,V,K,Z,J;return r.createElement(r.Fragment,null,r.createElement("div",{className:(0,o.A)("pb-6",j)},r.createElement("div",{className:(0,o.A)("absolute","left-0","right-0","w-full","px-2","md:px-4","xl:px-6","max-w-screen-xl","mx-auto",_)},r.createElement(i.l5,c({key:`${E}-${z}-${F}`,customSetup:c({dependencies:x},D),files:P,options:p(c({},W),{classes:p(c({},W.classes),{"sp-layout":(0,o.A)(null===(m=W.classes)||void 0===m?void 0:m["sp-layout"],A&&"!rounded-bl-none !rounded-br-none")})}),template:E,theme:"light"===z?p(c({},a.Zw),{colors:p(c({},a.Zw.colors),{accent:"#1D1E30",surface1:"transparent",surface2:"transparent",surface3:"transparent"})}):p(c({},a.hc),{colors:p(c({},a.hc.colors),{surface1:"transparent",surface2:"transparent",surface3:"transparent"})}),className:(0,o.A)("not-prose sandpack-container","max-w-screen-xl","animate-reveal")},T),r.createElement(i.am,{className:(0,o.A)("col"===R&&"!flex-col","col-reverse"===R&&"!flex-col-reverse")},S&&r.createElement(i.Lm,{autoHiddenFiles:!0,style:{height:null!==(Y=k.editorHeight)&&void 0!==Y?Y:C}}),!N&&r.createElement(i.cW,p(c({},$),{showLineNumbers:f,closableTabs:S,initMode:"lazy",style:p(c({height:null!==(V=k.editorHeight)&&void 0!==V?V:C},(null==R?void 0:R.includes("col"))?{flex:"initial"}:{flexGrow:q,flexShrink:q,flexBasis:0}),{overflow:"hidden"})})),G?r.createElement(l,{onMouseDown:B,horizontalSize:q}):null,M?null:r.createElement(r.Fragment,null,r.createElement(i.G5,{showOpenInCodeSandbox:b,startRoute:g,showNavigator:null!=y?y:k.showNavigator,showRefreshButton:k.showRefreshButton,style:p(c({display:M?"none":"flex"},(null==R?void 0:R.includes("col"))?{flex:"initial",width:"100%"}:{flexGrow:100-q,flexShrink:100-q,flexBasis:0,width:N?"100%":100-q+"%"}),{gap:0,height:null!==(K=k.editorHeight)&&void 0!==K?K:C})},r.createElement("div",{className:"sp-custom-loading"},r.createElement("img",{src:"https://refine.ams3.cdn.digitaloceanspaces.com/website/static/assets/spinner.gif",className:(0,o.A)("w-12","h-12","rounded-full")}))))),A?r.createElement(i.X2,{style:p(c({height:200},(null==R?void 0:R.includes("col"))?{flex:"initial"}:{flexGrow:q,flexShrink:q,flexBasis:0}),{overflow:"hidden"})}):null)),r.createElement("div",{className:(0,o.A)(""),style:{height:Number(null!==(Z=k.editorHeight)&&void 0!==Z?Z:C)+2}}),r.createElement("div",{className:(0,o.A)((null==R?void 0:R.includes("col"))?"block":"block md:hidden"),style:{height:Number(null!==(J=k.editorHeight)&&void 0!==J?J:C)+2}}),r.createElement("div",{className:(0,o.A)(A?"block":"hidden","h-[200px]")})),r.createElement("section",{className:"hidden max-w-0 max-h-0"},r.createElement("p",null,`Dependencies: ${Object.keys(null!=x?x:{}).map((e=>`${e}@${x[e]}`))}`),r.createElement("h3",null,"Code Files"),Object.keys(null!=P?P:{}).map((e=>r.createElement("div",{key:e},r.createElement("div",null,`File: ${e}`),r.createElement("div",null,`Content: ${"code"in P[e]?P[e].code:P[e]}`))))))},h=e=>{const t={hidePreview:!0,showConsole:!1};return r.createElement(v,p(c({},t,e),{template:"react-ts"}))}},19209:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>b,contentTitle:()=>y,default:()=>D,frontMatter:()=>g,metadata:()=>f,toc:()=>w});var o=n(37953),r=n(58860),a=n(88123);function i(){return o.createElement(a.O,{showNavigator:!1,showLineNumbers:!0,showFiles:!0,hidePreview:!0,showOpenInCodeSandbox:!1,dependencies:{"@refinedev/core":"latest","@refinedev/simple-rest":"latest","@refinedev/react-router-v6":"latest","react-router-dom":"latest","react-router":"latest"},files:{"/App.tsx":{code:s},"/package.json":{code:l},"/Dockerfile.dev":{code:d},"/Dockerfile.devtools":{code:c},"/docker-compose.yml":{code:p},"/nginx.conf":{code:u},"/style.css":{code:"",hidden:!0}}})}const s='\nimport { Refine } from "@refinedev/core";\nimport { DevtoolsProvider, DevtoolsPanel } from "@refinedev/devtools";\n\nexport default function App() {\n    return (\n        <DevtolsProvider\n            url="http://devtools.local"\n        >\n            <Refine\n                // ...\n            >\n                {/* ... */}\n                <DevtoolsPanel />\n            </Refine>\n        </DevtolsProvider>\n    )\n}\n'.trim(),l='\n{\n  "name": "my-app",\n  "version": "1.0.0",\n  "private": true,\n  "type": "module",\n  "scripts": {\n    "dev": "refine dev --devtools false -- --host",\n    "devtools": "refine devtools",\n    "refine": "refine"\n  },\n  "dependencies": {\n    "@refinedev/cli": "^2.16.36",\n    "@refinedev/core": "^4.53.0",\n    "@refinedev/devtools": "^1.2.6"\n  }\n}\n'.trim(),d='\n# We\'re setting up our development server and running it on port 5173.\n# We\'ll then use Nginx to reverse proxy the requests to the correct services.\n# We\'re running the application at port 5173 and we\'ll access it via http://my-app.local.\n\n# Use the official Node.js image as a parent image\nFROM refinedev/node\n\n# Copy the package.json and package-lock.json\nCOPY package*.json ./\n\n# Install dependencies\nRUN npm install\n\n# Copy the rest of the application\nCOPY . .\n\n# Expose the port the app runs on\nEXPOSE 5173\n\n# Command to run the development server\nCMD ["npm", "run", "dev"]\n'.trim(),c='\n# We\'re setting up our Devtools server and running it on port 5001.\n# We\'ll then use Nginx to reverse proxy the requests to the correct services.\n# We\'re running devtools at port 5001 and we\'ll access it via http://devtools.local.\n\n# Use the Refine\'s Node.js image as a parent image\nFROM refinedev/node\n\n# Copy the package.json and package-lock.json\nCOPY package*.json ./\n\n# Install dependencies\nRUN npm install\n\n# Copy the rest of the application\nCOPY . .\n\n# Expose the port the devtools server runs on\nEXPOSE 5001\n\n# Command to run the devtools server\nCMD ["npm", "run", "devtools"]\n'.trim(),p='\n# We\'re setting up a development environment with two services: dev and devtools.\n# The dev service is the main service that runs the application.\n# The devtools service is the service that runs the Refine Devtools.\nversion: "3"\nservices:\n  dev:\n    build:\n      context: .\n      dockerfile: Dockerfile.dev\n    volumes:\n      - app:/app/refine\n      - /app/refine/node_modules\n    networks:\n      - dev-network\n  devtools:\n    build:\n      context: .\n      dockerfile: Dockerfile.devtools\n    volumes:\n      - app:/app/refine\n      - /app/refine/node_modules\n    networks:\n      - dev-network\n  nginx:\n    image: nginx:latest\n    ports:\n      - "80:80"\n    volumes:\n      - ./nginx.conf:/etc/nginx/nginx.conf\n    networks:\n      - dev-network\nnetworks:\n  dev-network:\n    driver: bridge\nvolumes:\n  app:\n'.trim(),u="\n# We're setting up a reverse proxy to map the requests to the correct services.\n# Then we'll add the necessary aliases to the /etc/hosts file to make the services accessible via the domain names.\nevents {\n    worker_connections 1024;\n}\nhttp {\n    server {\n        listen 80;\n        server_name my-app.local;\n        location / {\n            proxy_pass http://dev:5173;\n            proxy_set_header Host $host;\n            proxy_set_header X-Real-IP $remote_addr;\n            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;\n            proxy_set_header X-Forwarded-Proto $scheme;\n        }\n    }\n    server {\n        listen 80;\n        server_name devtools.local;\n        location / {\n            proxy_pass http://devtools:5001;\n            proxy_set_header Host $host;\n            proxy_set_header X-Real-IP $remote_addr;\n            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;\n            proxy_set_header X-Forwarded-Proto $scheme;\n        }\n    }\n}\n".trim();function m(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function v(e,t){return t=null!=t?t:{},Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):function(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))})),e}function h(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},a=Object.keys(e);for(o=0;o<a.length;o++)n=a[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(o=0;o<a.length;o++)n=a[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}const g={title:"Devtools"},y="Refine Devtools",f={unversionedId:"enterprise-edition/devtools/index",id:"enterprise-edition/devtools/index",title:"Devtools",description:"In addition to the features provided by the Refine Devtools, Enterprise Edition allows you to change the port of the devtools server or use a custom domain for the devtools server. This is useful if you're dockerizing your app and devtools server separately or using multiple Refine apps and want to use Refine Devtools for multiple apps.",source:"@site/docs/enterprise-edition/devtools/index.md",sourceDirName:"enterprise-edition/devtools",slug:"/enterprise-edition/devtools/",permalink:"/docs/enterprise-edition/devtools/",draft:!1,editUrl:"https://github.com/refinedev/refine/tree/master/documentation/docs/enterprise-edition/devtools/index.md",tags:[],version:"current",lastUpdatedBy:"Matteo Roggia",lastUpdatedAt:1741812888,formattedLastUpdatedAt:"Mar 12, 2025",frontMatter:{title:"Devtools"},sidebar:"mainSidebar",previous:{title:"Okta Auth Provider",permalink:"/docs/enterprise-edition/okta/"},next:{title:"Multitenancy",permalink:"/docs/enterprise-edition/multitenancy/"}},b={},w=[{value:"Specifying the Port",id:"specifying-the-port",level:2},{value:"Using Custom Domains with Docker",id:"using-custom-domains-with-docker",level:2}],x=(O="DocThumbsUpDownFeedbackWidget",function(e){return console.warn("Component "+O+" was not imported, exported, or provided by MDXProvider as global scope"),(0,r.yg)("div",e)});var O;const k={toc:w},E="wrapper";function D(e){var{components:t}=e,n=h(e,["components"]);return(0,r.yg)(E,v(function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{},o=Object.keys(n);"function"==typeof Object.getOwnPropertySymbols&&(o=o.concat(Object.getOwnPropertySymbols(n).filter((function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable})))),o.forEach((function(t){m(e,t,n[t])}))}return e}({},k,n),{components:t,mdxType:"MDXLayout"}),(0,r.yg)("h1",{id:"refine-devtools"},"Refine Devtools"),(0,r.yg)("p",null,"In addition to the features provided by the ",(0,r.yg)("a",{parentName:"p",href:"/docs/guides-concepts/development/#using-devtools"},"Refine Devtools"),", Enterprise Edition allows you to change the port of the devtools server or use a custom domain for the devtools server. This is useful if you're dockerizing your app and devtools server separately or using multiple Refine apps and want to use Refine Devtools for multiple apps."),(0,r.yg)("h2",{id:"specifying-the-port"},"Specifying the Port"),(0,r.yg)(x,{id:"specifying-the-port",mdxType:"DocThumbsUpDownFeedbackWidget"},(0,r.yg)("p",null,"You can be using ",(0,r.yg)("inlineCode",{parentName:"p"},"@refinedev/cli")," or ",(0,r.yg)("inlineCode",{parentName:"p"},"@refinedev/devtools-server")," to start the devtools server. Both of these tools will respect the ",(0,r.yg)("inlineCode",{parentName:"p"},"REFINE_DEVTOOLS_PORT")," environment variable. Changing the port is as simple as setting the ",(0,r.yg)("inlineCode",{parentName:"p"},"REFINE_DEVTOOLS_PORT")," environment variable to the desired port number."),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-bash"},"REFINE_DEVTOOLS_PORT=5002 refine dev\n")),(0,r.yg)("p",null,"When ",(0,r.yg)("inlineCode",{parentName:"p"},"REFINE_DEVTOOLS_PORT")," is set in ",(0,r.yg)("inlineCode",{parentName:"p"},"refine dev")," command, it will be automatically propagated to your App and made available as an environment variable. The environment variable will automatically be used by the ",(0,r.yg)("inlineCode",{parentName:"p"},"<DevtoolsProvider />")," component of the ",(0,r.yg)("inlineCode",{parentName:"p"},"@refinedev/devtools")," to connect to the devtools server. If the environment variable is not working in the browser or you want to use a custom domain, you can manually set the URL in the ",(0,r.yg)("inlineCode",{parentName:"p"},"<DevtoolsProvider />")," component via the ",(0,r.yg)("inlineCode",{parentName:"p"},"url")," prop."),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-tsx",metastring:'title="App.tsx"',title:'"App.tsx"'},'import Refine from "@refinedev/core";\nimport { DevtoolsProvider, DevtoolsPanel } from "@refinedev/devtools";\n\nconst App = () => {\n  return (\n    <DevtoolsProvider\n      // highlight-next-line\n      url="http://refine-devtools.local"\n    >\n      <Refine>\n        {/* ... */}\n        <DevtoolsPanel />\n      </Refine>\n  );\n};\n'))),(0,r.yg)("h2",{id:"using-custom-domains-with-docker"},"Using Custom Domains with Docker"),(0,r.yg)(x,{id:"using-custom-domains-with-docker",mdxType:"DocThumbsUpDownFeedbackWidget"},(0,r.yg)("p",null,"In this example, we'll dockerize a Refine app and Refine Devtools separately and serve them on ",(0,r.yg)("inlineCode",{parentName:"p"},"http://my-app.local")," and ",(0,r.yg)("inlineCode",{parentName:"p"},"http://devtools.local")," respectively. After our setup is complete, we'll use the ",(0,r.yg)("inlineCode",{parentName:"p"},"url")," prop of the ",(0,r.yg)("inlineCode",{parentName:"p"},"<DevtoolsProvider />")," component to connect to the devtools server."),(0,r.yg)(i,{mdxType:"DockerUsage"}),(0,r.yg)("p",null,"Then, we'll need to update our ",(0,r.yg)("inlineCode",{parentName:"p"},"/etc/hosts")," file to point ",(0,r.yg)("inlineCode",{parentName:"p"},"my-app.local")," and ",(0,r.yg)("inlineCode",{parentName:"p"},"devtools.local")," to ",(0,r.yg)("inlineCode",{parentName:"p"},"127.0.0.1"),","),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-txt"},"127.0.0.1 my-app.local\n127.0.0.1 devtools.local\n")),(0,r.yg)("p",null,"That's it! Now you can run your Refine app and Refine Devtools separately in Docker containers and connect to the devtools server using the custom domain. Notice that we're only changing one line in our ",(0,r.yg)("inlineCode",{parentName:"p"},"App.tsx")," file to use the custom domain, rest will be handled by the ",(0,r.yg)("inlineCode",{parentName:"p"},"@refinedev/devtools")," package.")))}D.isMDXComponent=!0}}]);