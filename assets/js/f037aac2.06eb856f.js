"use strict";(self.webpackChunkdocumentation=self.webpackChunkdocumentation||[]).push([[62374],{58860:(e,t,a)=>{a.d(t,{xA:()=>u,yg:()=>g});var n=a(37953);function r(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function o(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function i(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?o(Object(a),!0).forEach((function(t){r(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):o(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function l(e,t){if(null==e)return{};var a,n,r=function(e,t){if(null==e)return{};var a,n,r={},o=Object.keys(e);for(n=0;n<o.length;n++)a=o[n],t.indexOf(a)>=0||(r[a]=e[a]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)a=o[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}var s=n.createContext({}),m=function(e){var t=n.useContext(s),a=t;return e&&(a="function"==typeof e?e(t):i(i({},t),e)),a},u=function(e){var t=m(e.components);return n.createElement(s.Provider,{value:t},e.children)},p="mdxType",c={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},d=n.forwardRef((function(e,t){var a=e.components,r=e.mdxType,o=e.originalType,s=e.parentName,u=l(e,["components","mdxType","originalType","parentName"]),p=m(a),d=r,g=p["".concat(s,".").concat(d)]||p[d]||c[d]||o;return a?n.createElement(g,i(i({ref:t},u),{},{components:a})):n.createElement(g,i({ref:t},u))}));function g(e,t){var a=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=a.length,i=new Array(o);i[0]=d;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l[p]="string"==typeof e?e:r,i[1]=l;for(var m=2;m<o;m++)i[m]=a[m];return n.createElement.apply(null,i)}return n.createElement.apply(null,a)}d.displayName="MDXCreateElement"},77938:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>u,contentTitle:()=>s,default:()=>g,frontMatter:()=>l,metadata:()=>m,toc:()=>p});a(37953);var n=a(58860);function r(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function o(e,t){return t=null!=t?t:{},Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):function(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}(Object(t)).forEach((function(a){Object.defineProperty(e,a,Object.getOwnPropertyDescriptor(t,a))})),e}function i(e,t){if(null==e)return{};var a,n,r=function(e,t){if(null==e)return{};var a,n,r={},o=Object.keys(e);for(n=0;n<o.length;n++)a=o[n],t.indexOf(a)>=0||(r[a]=e[a]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)a=o[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}const l={title:"React Hook Form vs Formik - Comparing the most popular React form libraries",description:"This article will compare React Hook Form and Formik by highlighting their strengths and weaknesses.",slug:"react-hook-form-vs-formik",authors:"joseph_mawa",tags:["react-hook-form","comparison"],image:"https://refine.ams3.cdn.digitaloceanspaces.com/blog/2023-01-30-compare-form-libraries/social-2.png",hide_table_of_contents:!1},s=void 0,m={permalink:"/blog/react-hook-form-vs-formik",source:"@site/blog/2024-07-23-compare-form-libraries.md",title:"React Hook Form vs Formik - Comparing the most popular React form libraries",description:"This article will compare React Hook Form and Formik by highlighting their strengths and weaknesses.",date:"2024-07-23T00:00:00.000Z",formattedDate:"July 23, 2024",tags:[{label:"react-hook-form",permalink:"/blog/tags/react-hook-form"},{label:"comparison",permalink:"/blog/tags/comparison"}],readingTime:11.68,hasTruncateMarker:!1,authors:[{name:"Joseph Mawa",title:"Web Developer",url:"https://github.com/nibble0101",imageURL:"/img/generic-profile.png",key:"joseph_mawa"}],frontMatter:{title:"React Hook Form vs Formik - Comparing the most popular React form libraries",description:"This article will compare React Hook Form and Formik by highlighting their strengths and weaknesses.",slug:"react-hook-form-vs-formik",authors:"joseph_mawa",tags:["react-hook-form","comparison"],image:"https://refine.ams3.cdn.digitaloceanspaces.com/blog/2023-01-30-compare-form-libraries/social-2.png",hide_table_of_contents:!1},prevItem:{title:"Refine.new - Technical Architecture and Engineering Decisions Explored Part - 1",permalink:"/blog/refine-new-explored-part-1"},nextItem:{title:"Best React Admin Dashboard Libraries 2023",permalink:"/blog/react-admin-dashboard"},relatedPosts:[{title:"refine vs Blitz.js",description:"We will take a closer look at how to set both up, what are their internal builds, how they handle the data sources, how to implement the CRUD functionality, add authentication, and how to deploy them to production.",permalink:"/blog/react-admin-frameworks-refine-vs-blitz-js",formattedDate:"March 15, 2023",authors:[{name:"Madars Bi\u0161s",title:"Software Developer",url:"https://github.com/madzadev",imageURL:"https://github.com/madzadev.png",key:"madars_biss"}],readingTime:18.935,date:"2023-03-15T00:00:00.000Z"},{title:"gRPC vs REST - A Brief Comparison",description:"We'll explore practical use cases of REST and gRPC to enable you to select the most appropriate API for your project.",permalink:"/blog/grpc-vs-rest",formattedDate:"September 24, 2024",authors:[{name:"Deborah Emeni",title:"Software Engineer",url:"https://github.com/debemenitammy",imageURL:"https://github.com/debemenitammy.png",key:"deborah_emeni"}],readingTime:22.01,date:"2024-09-24T00:00:00.000Z"},{title:"React Hook Form Validation with Complete Examples",description:"We'll implement React Hook Form custom validations and schema validations using yup.",permalink:"/blog/react-hook-form-validation-examples",formattedDate:"September 27, 2022",authors:[{name:"David Omotayo",title:"Frontend developer",url:"https://github.com/david4473",imageURL:"https://github.com/david4473.png",key:"david_omotayo"}],readingTime:19.94,date:"2022-09-27T00:00:00.000Z"}],authorPosts:[{title:"How to use the useParams hook in React Router",description:"We'll discover how to access the parameters of the current route with the useParams hook in React Router.",permalink:"/blog/react-router-useparams",formattedDate:"September 24, 2022",authors:[{name:"Joseph Mawa",title:"Web Developer",url:"https://github.com/nibble0101",imageURL:"/img/generic-profile.png",key:"joseph_mawa"}],readingTime:4.445,date:"2022-09-24T00:00:00.000Z"},{title:"Top 6 Free Online Code Editors and IDEs with Pros and Cons",description:"We'll compare the best online IDEs and code editors for web development. We'll also look at the pros and cons of each.",permalink:"/blog/6-best-online-code-editors-comparison",formattedDate:"November 11, 2024",authors:[{name:"Joseph Mawa",title:"Web Developer",url:"https://github.com/nibble0101",imageURL:"/img/generic-profile.png",key:"joseph_mawa"}],readingTime:22.655,date:"2024-11-11T00:00:00.000Z"},{title:"Redirect in React Router V6 with useNavigate hook",description:"We'll discover how to perform a redirect using useNavigate in React Router V6",permalink:"/blog/usenavigate-react-router-redirect",formattedDate:"June 24, 2024",authors:[{name:"Joseph Mawa",title:"Web Developer",url:"https://github.com/nibble0101",imageURL:"/img/generic-profile.png",key:"joseph_mawa"}],readingTime:9.78,date:"2024-06-24T00:00:00.000Z"}]},u={authorsImageUrls:[void 0]},p=[{value:"Introduction",id:"introduction",level:2},{value:"The most popular React form libraries",id:"the-most-popular-react-form-libraries",level:2},{value:"React Hook Form",id:"react-hook-form",level:3},{value:"How to use React Hook Form",id:"how-to-use-react-hook-form",level:4},{value:"Pros of React Hook Form",id:"pros-of-react-hook-form",level:4},{value:"Cons of React Hook Form library",id:"cons-of-react-hook-form-library",level:4},{value:"Formik",id:"formik",level:3},{value:"How to use Formik",id:"how-to-use-formik",level:4},{value:"Pros of Formik",id:"pros-of-formik",level:4},{value:"Cons of Formik",id:"cons-of-formik",level:4},{value:"Comparing Formik and React Hook Form",id:"comparing-formik-and-react-hook-form",level:2},{value:"Custom Validation with React Hook Form",id:"custom-validation-with-react-hook-form",level:2},{value:"Custom Validation with Formik",id:"custom-validation-with-formik",level:2},{value:"Implementing Accessibility Features in React Forms",id:"implementing-accessibility-features-in-react-forms",level:2},{value:"Accessibility with React Hook Form",id:"accessibility-with-react-hook-form",level:3},{value:"Accessibility with Formik",id:"accessibility-with-formik",level:3},{value:"Conclusion",id:"conclusion",level:2}],c={toc:p},d="wrapper";function g(e){var{components:t}=e,a=i(e,["components"]);return(0,n.yg)(d,o(function(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{},n=Object.keys(a);"function"==typeof Object.getOwnPropertySymbols&&(n=n.concat(Object.getOwnPropertySymbols(a).filter((function(e){return Object.getOwnPropertyDescriptor(a,e).enumerable})))),n.forEach((function(t){r(e,t,a[t])}))}return e}({},c,a),{components:t,mdxType:"MDXLayout"}),(0,n.yg)("p",null,(0,n.yg)("strong",{parentName:"p"},"This article was last updated on July 23, 2024, to add sections for Custom Validation and Accessibility Features.")),(0,n.yg)("h2",{id:"introduction"},"Introduction"),(0,n.yg)("p",null,"Forms are a handy feature for collecting data from users. Unfortunately, creating, styling, and validating forms is not always straightforward, especially when using front-end frameworks such as React. Fortunately, packages such as ",(0,n.yg)("a",{parentName:"p",href:"https://react-hook-form.com/"},"React Hook Form")," and ",(0,n.yg)("a",{parentName:"p",href:"https://formik.org/"},"Formik")," exist to simplify working with forms in React and React frameworks."),(0,n.yg)("p",null,"Among other benefits, most form libraries simplify working with forms by handling form validation and submission out of the box for you. Despite the advantages of using a library for form management, each library has strengths and weaknesses."),(0,n.yg)("p",null,"Formik and React hook form are among the most popular libraries for form management in the React ecosystem. This article will compare Formik and React hook form by highlighting their strengths and weaknesses. Hopefully, it will help you choose a form library that will meet your project's requirements."),(0,n.yg)("h2",{id:"the-most-popular-react-form-libraries"},"The most popular React form libraries"),(0,n.yg)("p",null,"As mentioned above, there are several React packages that you can use when working with forms. However, React Hook Form and Formik are the most popular. We will explore the two libraries in this section. We will highlight how to use them and their pros and cons."),(0,n.yg)("h3",{id:"react-hook-form"},"React Hook Form"),(0,n.yg)("p",null,"React Hook Form is another library for managing forms in React and React frameworks like Next and Gatsby. Similar to Formik, React Hook Form is a free, open-source library. It is MIT licensed. Therefore, you can use it pretty much any way you want."),(0,n.yg)("p",null,"You can use it to manage your form state and field validation. You can integrate it with some popular UI libraries like Material UI. As its name suggests, React Hook Form was built using React hooks. Therefore, you can't use it directly in class components."),(0,n.yg)("h4",{id:"how-to-use-react-hook-form"},"How to use React Hook Form"),(0,n.yg)("p",null,"You can install React Hook Form from the NPM package registry like any other package before using it. Run one of the commands below in an existing React or React Native project."),(0,n.yg)("pre",null,(0,n.yg)("code",{parentName:"pre",className:"language-sh"},"# npm\nnpm install react-hook-form\n\n# yarn\nyarn add react-hook-form\n")),(0,n.yg)("p",null,"The code below shows a simple login form demonstrating the most basic usage of React Hook Form. In the example code below, we are using the ",(0,n.yg)("inlineCode",{parentName:"p"},"useForm")," hook. It is one of the hooks that simplifies form management, and you will almost always use it when working with React Hook Form. The ",(0,n.yg)("inlineCode",{parentName:"p"},"useForm")," hook takes an optional object as an argument and returns several methods."),(0,n.yg)("p",null,"The method worth mentioning is the ",(0,n.yg)("inlineCode",{parentName:"p"},"register")," function. You can use it to register input elements and apply validation rules. It takes a unique input name string as the first argument and an optional object as the second. You can use the second argument to add input validation fields like the example below."),(0,n.yg)("pre",null,(0,n.yg)("code",{parentName:"pre",className:"language-tsx"},'import { useForm } from "react-hook-form";\n\nexport function Form() {\n  const { register, handleSubmit, watch, formState } = useForm();\n\n  const submitHandler = (data) => console.log(data);\n\n  return (\n    <form onSubmit={handleSubmit(submitHandler)}>\n      <p>\n        <label htmlFor="username">Username</label>\n        <input\n          type="text"\n          id="username"\n          {...register("username", { required: true, minLength: 4 })}\n        />\n      </p>\n      <p>\n        <label htmlFor="Password">Password</label>\n        <input\n          type="password"\n          id="password"\n          {...register("password", { required: true, minLength: 10 })}\n          required\n        />\n      </p>\n      <button> Submit </button>\n    </form>\n  );\n}\n')),(0,n.yg)("p",null,"The example above is a basic illustration of React Hook Form. Do check out the React Hook Form documentation for more advanced features."),(0,n.yg)("h4",{id:"pros-of-react-hook-form"},"Pros of React Hook Form"),(0,n.yg)("ul",null,(0,n.yg)("li",{parentName:"ul"},"It is free and open source."),(0,n.yg)("li",{parentName:"ul"},"React Hook Form has no dependencies and a small bundle size. It has a gzipped bundle size of 12.12KB, according to\xa0",(0,n.yg)("a",{parentName:"li",href:"https://bundlejs.com/"},"bundlejs"),"."),(0,n.yg)("li",{parentName:"ul"},"It is MIT licensed"),(0,n.yg)("li",{parentName:"ul"},"It is easy to pick up."),(0,n.yg)("li",{parentName:"ul"},"Good documentation"),(0,n.yg)("li",{parentName:"ul"},"It is performant"),(0,n.yg)("li",{parentName:"ul"},"You can use it in both React and React Native."),(0,n.yg)("li",{parentName:"ul"},"It validates form fields out of the box."),(0,n.yg)("li",{parentName:"ul"},"It is in active maintenance."),(0,n.yg)("li",{parentName:"ul"},"It has an active community."),(0,n.yg)("li",{parentName:"ul"},"You can integrate React Hook Form with UI libraries like Material UI and\xa0",(0,n.yg)("a",{parentName:"li",href:"https://refine.dev/"},"Refine"),". With Refine, you can use the\xa0",(0,n.yg)("a",{parentName:"li",href:"https://github.com/refinedev/refine/tree/master/packages/react-hook-form"},"@refinedev/react-hook-form"),"\xa0adapter. You can handle forms using ",(0,n.yg)("a",{parentName:"li",href:"https://refine.dev/docs/packages/documentation/react-hook-form/useForm/"},(0,n.yg)("inlineCode",{parentName:"a"},"useForm"))," hook in your Refine CRUD apps with React Hook Form."),(0,n.yg)("li",{parentName:"ul"},(0,n.yg)("a",{parentName:"li",href:"https://refine.dev/blog/dynamic-forms-in-react-hook-form/"},"Refer to article on using React Hook Form dynamic form fields with Refine"),".")),(0,n.yg)("h4",{id:"cons-of-react-hook-form-library"},"Cons of React Hook Form library"),(0,n.yg)("ul",null,(0,n.yg)("li",{parentName:"ul"},"React Hook Form uses React hooks. Therefore, you can't use it directly in class components.")),(0,n.yg)("h3",{id:"formik"},"Formik"),(0,n.yg)("p",null,"Formik is a free, popular open-source package for building forms in React and React Native. It has built-in features for managing form validation, error messages, and form submissions. It has a minimal API surface area. Therefore, it shouldn't be hard to start using, even for an absolute beginner to Formik."),(0,n.yg)("p",null,"It has over thirty thousand GitHub stars, two million weekly downloads on the NPM package registry, and is Apache 2.0 Licensed."),(0,n.yg)("h4",{id:"how-to-use-formik"},"How to use Formik"),(0,n.yg)("p",null,"Depending on your package manager of choice, you can install Formik in any React or React Native project using one of the commands below."),(0,n.yg)("pre",null,(0,n.yg)("code",{parentName:"pre",className:"language-sh"},"# npm\nnpm install formik\n\n# yarn\nyarn add formik\n")),(0,n.yg)("p",null,"If you are not using a package bundler like webpack, you can also load it from the unpkg CDN using an HTML ",(0,n.yg)("inlineCode",{parentName:"p"},"script")," tag like so:"),(0,n.yg)("pre",null,(0,n.yg)("code",{parentName:"pre",className:"language-html"},'<script src="https://unpkg.com/formik/dist/formik.umd.production.min.js"><\/script>\n')),(0,n.yg)("p",null,"The code below illustrates the most basic use of Formik for building a simple login form. The login form comprises text and email ",(0,n.yg)("inlineCode",{parentName:"p"},"input")," fields. It uses the built-in ",(0,n.yg)("inlineCode",{parentName:"p"},"Form"),", ",(0,n.yg)("inlineCode",{parentName:"p"},"Formik"),", and ",(0,n.yg)("inlineCode",{parentName:"p"},"Field")," components."),(0,n.yg)("p",null,"The ",(0,n.yg)("inlineCode",{parentName:"p"},"Formik")," component is one of the built-in components you use when building forms with Formik. It internally uses render props. Therefore, you can pass a render prop to the ",(0,n.yg)("inlineCode",{parentName:"p"},"Formik")," component or use it to wrap a child component. In addition to the render prop, the ",(0,n.yg)("inlineCode",{parentName:"p"},"Formik")," Component also takes several other props you can look up in the documentation."),(0,n.yg)("p",null,(0,n.yg)("inlineCode",{parentName:"p"},"Form")," is another built-in component that wraps the HTML form element. Internally, it has access to the ",(0,n.yg)("inlineCode",{parentName:"p"},"onSubmit")," prop and several other props you pass to ",(0,n.yg)("inlineCode",{parentName:"p"},"Formik"),"."),(0,n.yg)("p",null,(0,n.yg)("inlineCode",{parentName:"p"},"Field")," is a built-in component for adding ",(0,n.yg)("inlineCode",{parentName:"p"},"input")," elements to your form. For a complete list of props it takes and how to use them, check the Formik documentation."),(0,n.yg)("pre",null,(0,n.yg)("code",{parentName:"pre",className:"language-tsx"},'import { Form, Formik, Field } from "formik";\n\nexport function LoginForm() {\n  return (\n    <>\n      <h1>Login form</h1>\n      <Formik\n        initialValues={{ userName: "", password: "" }}\n        onSubmit={(values) => console.log("values ", values)}\n      >\n        <Form>\n          <p>\n            <label htmlFor="username">Username</label>\n            <Field id="username" required type="text" name="userName" />\n          </p>\n          <p>\n            <label htmlFor="password">Password</label>\n            <Field id="password" required type="password" name="password" />\n          </p>\n          <button type="submit">Login</button>\n        </Form>\n      </Formik>\n    </>\n  );\n}\n')),(0,n.yg)("p",null,"Formik leaves form validation to you. You can do it yourself or use a third-party library like\xa0",(0,n.yg)("a",{parentName:"p",href:"https://github.com/jquense/yup"},"Yup"),"."),(0,n.yg)("p",null,"The above code illustrates a simple use case of the Formik library. It has several complex features for solving a variety of problems. Check the Formik documentation for all the other features I have not hinted at in this article."),(0,n.yg)("h4",{id:"pros-of-formik"},"Pros of Formik"),(0,n.yg)("ul",null,(0,n.yg)("li",{parentName:"ul"},"You can use it with both React and React Native."),(0,n.yg)("li",{parentName:"ul"},"It is free"),(0,n.yg)("li",{parentName:"ul"},"It is performant"),(0,n.yg)("li",{parentName:"ul"},"It has a flexible licensing requirement. Released under the terms of the Apache License version 2.0"),(0,n.yg)("li",{parentName:"ul"},"It is lightweight. According to\xa0",(0,n.yg)("a",{parentName:"li",href:"https://bundlejs.com/"},"bundlejs.com"),", the gzipped bundle size of Formik is 44.34KB."),(0,n.yg)("li",{parentName:"ul"},"It has excellent documentation."),(0,n.yg)("li",{parentName:"ul"},"It is easy to pick up."),(0,n.yg)("li",{parentName:"ul"},"It has bindings for popular UI frameworks like Ant design, Material UI, and Semantic UI.")),(0,n.yg)("h4",{id:"cons-of-formik"},"Cons of Formik"),(0,n.yg)("ul",null,(0,n.yg)("li",{parentName:"ul"},"Formik is not actively maintained at the moment. The last Git commit to the project repository was a year ago. Similarly, there hasn't been any new version released for at least one year.")),(0,n.yg)("h2",{id:"comparing-formik-and-react-hook-form"},"Comparing Formik and React Hook Form"),(0,n.yg)("table",null,(0,n.yg)("thead",{parentName:"table"},(0,n.yg)("tr",{parentName:"thead"},(0,n.yg)("th",{parentName:"tr",align:null}),(0,n.yg)("th",{parentName:"tr",align:null},"Formik"),(0,n.yg)("th",{parentName:"tr",align:null},"React Hook Form"))),(0,n.yg)("tbody",{parentName:"table"},(0,n.yg)("tr",{parentName:"tbody"},(0,n.yg)("td",{parentName:"tr",align:null},"Gzipped bundle size"),(0,n.yg)("td",{parentName:"tr",align:null},"44.34KB"),(0,n.yg)("td",{parentName:"tr",align:null},"12.12KB")),(0,n.yg)("tr",{parentName:"tbody"},(0,n.yg)("td",{parentName:"tr",align:null},"Dependencies"),(0,n.yg)("td",{parentName:"tr",align:null},"7"),(0,n.yg)("td",{parentName:"tr",align:null},"0")),(0,n.yg)("tr",{parentName:"tbody"},(0,n.yg)("td",{parentName:"tr",align:null},"GitHub stars"),(0,n.yg)("td",{parentName:"tr",align:null},"31.6k"),(0,n.yg)("td",{parentName:"tr",align:null},"32.2k")),(0,n.yg)("tr",{parentName:"tbody"},(0,n.yg)("td",{parentName:"tr",align:null},"Active maintenance"),(0,n.yg)("td",{parentName:"tr",align:null},"No"),(0,n.yg)("td",{parentName:"tr",align:null},"Yes")),(0,n.yg)("tr",{parentName:"tbody"},(0,n.yg)("td",{parentName:"tr",align:null},"Performance"),(0,n.yg)("td",{parentName:"tr",align:null},"Good"),(0,n.yg)("td",{parentName:"tr",align:null},"Good")),(0,n.yg)("tr",{parentName:"tbody"},(0,n.yg)("td",{parentName:"tr",align:null},"Documentation"),(0,n.yg)("td",{parentName:"tr",align:null},"Good"),(0,n.yg)("td",{parentName:"tr",align:null},"Good")),(0,n.yg)("tr",{parentName:"tbody"},(0,n.yg)("td",{parentName:"tr",align:null},"License"),(0,n.yg)("td",{parentName:"tr",align:null},"Apache License version 2.0"),(0,n.yg)("td",{parentName:"tr",align:null},"MIT")),(0,n.yg)("tr",{parentName:"tbody"},(0,n.yg)("td",{parentName:"tr",align:null},"NPM weekly downloads"),(0,n.yg)("td",{parentName:"tr",align:null},"2.1 Million"),(0,n.yg)("td",{parentName:"tr",align:null},"2.7 Million")),(0,n.yg)("tr",{parentName:"tbody"},(0,n.yg)("td",{parentName:"tr",align:null},"Pricing"),(0,n.yg)("td",{parentName:"tr",align:null},"Free"),(0,n.yg)("td",{parentName:"tr",align:null},"Free")),(0,n.yg)("tr",{parentName:"tbody"},(0,n.yg)("td",{parentName:"tr",align:null},"Community support"),(0,n.yg)("td",{parentName:"tr",align:null},"Good"),(0,n.yg)("td",{parentName:"tr",align:null},"Good")),(0,n.yg)("tr",{parentName:"tbody"},(0,n.yg)("td",{parentName:"tr",align:null},"Open GitHub issues"),(0,n.yg)("td",{parentName:"tr",align:null},"635"),(0,n.yg)("td",{parentName:"tr",align:null},"3")),(0,n.yg)("tr",{parentName:"tbody"},(0,n.yg)("td",{parentName:"tr",align:null},"Closed GitHub issues"),(0,n.yg)("td",{parentName:"tr",align:null},"1497"),(0,n.yg)("td",{parentName:"tr",align:null},"3528")))),(0,n.yg)("h2",{id:"custom-validation-with-react-hook-form"},"Custom Validation with React Hook Form"),(0,n.yg)("p",null,"This would be a post to share some insights on how to apply custom validation in React forms using React Hook Form and Formik. I hope this simple guide will help all of us in our next project."),(0,n.yg)("p",null,"Custom validation is pretty easy using React Hook Form. We'll set up our validation rules using the register function directly on input fields. Here's an example:"),(0,n.yg)("pre",null,(0,n.yg)("code",{parentName:"pre",className:"language-javascript"},'import { useForm } from "react-hook-form";\n\nfunction MyForm() {\n  const {\n    register,\n    handleSubmit,\n    formState: { errors },\n  } = useForm();\n\n  const onSubmit = (data) => {\n    console.log(data);\n  };\n\n  return (\n    <form onSubmit={handleSubmit(onSubmit)}>\n      <input\n        {...register("username", {\n          required: "Username is required",\n          validate: (value) =>\n            value.length >= 4 || "Username must be at least 4 characters",\n        })}\n      />\n      {errors.username && <p>{errors.username.message}</p>}\n\n      <input\n        {...register("email", {\n          required: "Email is required",\n          pattern: {\n            value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$/,\n            message: "Invalid email address",\n          },\n        })}\n      />\n      {errors.email && <p>{errors.email.message}</p>}\n\n      <button type="submit">Submit</button>\n    </form>\n  );\n}\n')),(0,n.yg)("p",null,"In the above example, we put in place some custom validation messages for the username and email fields."),(0,n.yg)("h2",{id:"custom-validation-with-formik"},"Custom Validation with Formik"),(0,n.yg)("p",null,"Formik also allows custom validation through its ",(0,n.yg)("inlineCode",{parentName:"p"},"validate")," prop. We can write our validation logic inside a function and pass it to Formik. Here's an example:"),(0,n.yg)("pre",null,(0,n.yg)("code",{parentName:"pre",className:"language-javascript"},'import { Formik, Form, Field, ErrorMessage } from "formik";\n\nfunction MyForm() {\n  return (\n    <Formik\n      initialValues={{ username: "", email: "" }}\n      validate={(values) => {\n        const errors = {};\n        if (!values.username) {\n          errors.username = "Username is required";\n        } else if (values.username.length < 4) {\n          errors.username = "Username must be at least 4 characters";\n        }\n        if (!values.email) {\n          errors.email = "Email is required";\n        } else if (\n          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,}$/i.test(values.email)\n        ) {\n          errors.email = "Invalid email address";\n        }\n        return errors;\n      }}\n      onSubmit={(values) => {\n        console.log(values);\n      }}\n    >\n      {({ handleSubmit }) => (\n        <Form onSubmit={handleSubmit}>\n          <Field name="username" />\n          <ErrorMessage name="username" component="div" />\n\n          <Field name="email" />\n          <ErrorMessage name="email" component="div" />\n\n          <button type="submit">Submit</button>\n        </Form>\n      )}\n    </Formik>\n  );\n}\n')),(0,n.yg)("p",null,"In this case, we implemented custom validation for the ",(0,n.yg)("inlineCode",{parentName:"p"},"username")," and ",(0,n.yg)("inlineCode",{parentName:"p"},"email")," fields using a ",(0,n.yg)("inlineCode",{parentName:"p"},"validate")," function."),(0,n.yg)("h2",{id:"implementing-accessibility-features-in-react-forms"},"Implementing Accessibility Features in React Forms"),(0,n.yg)("p",null,"I would like to share a few tips on how to implement the necessary accessibility features in our React forms with the help of React Hook Form and Formik. Accessibility is so important because it ensures our applications are accessible to everyone, including people with disabilities. Below are some guidelines with examples on how to enhance the accessibility of our forms."),(0,n.yg)("h3",{id:"accessibility-with-react-hook-form"},"Accessibility with React Hook Form"),(0,n.yg)("p",null,"With React Hook Form, form accessibility is just as easy. We should use semantic HTML elements and ARIA attributes where necessary. Here's an example:"),(0,n.yg)("pre",null,(0,n.yg)("code",{parentName:"pre",className:"language-tsx"},'import { useForm } from "react-hook-form";\n\nfunction AccessibleForm() {\n  const {\n    register,\n    handleSubmit,\n    formState: { errors },\n  } = useForm();\n\n  const onSubmit = (data) => {\n    console.log(data);\n  };\n\n  return (\n    <form onSubmit={handleSubmit(onSubmit)}>\n      <div>\n        <label htmlFor="username">Username</label>\n        <input\n          id="username"\n          aria-invalid={errors.username ? "true" : "false"}\n          {...register("username", { required: "Username is required" })}\n        />\n        {errors.username && <span role="alert">{errors.username.message}</span>}\n      </div>\n\n      <div>\n        <label htmlFor="email">Email</label>\n        <input\n          id="email"\n          type="email"\n          aria-invalid={errors.email ? "true" : "false"}\n          {...register("email", {\n            required: "Email is required",\n            pattern: {\n              value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$/,\n              message: "Invalid email address",\n            },\n          })}\n        />\n        {errors.email && <span role="alert">{errors.email.message}</span>}\n      </div>\n\n      <button type="submit">Submit</button>\n    </form>\n  );\n}\n')),(0,n.yg)("p",null,"In this example, we have used ",(0,n.yg)("inlineCode",{parentName:"p"},"aria-invalid")," to indicate invalid fields and ",(0,n.yg)("inlineCode",{parentName:"p"},'role="alert"')," to announce error messages to screen readers."),(0,n.yg)("h3",{id:"accessibility-with-formik"},"Accessibility with Formik"),(0,n.yg)("p",null,"Formik also supports accessibility enhancements. We should go ahead to support the same by the right use of semantic HTML elements and ARIA attributes. Here is an example:"),(0,n.yg)("pre",null,(0,n.yg)("code",{parentName:"pre",className:"language-tsx"},'import { Formik, Form, Field, ErrorMessage } from "formik";\n\nfunction AccessibleForm() {\n  return (\n    <Formik\n      initialValues={{ username: "", email: "" }}\n      validate={(values) => {\n        const errors = {};\n        if (!values.username) {\n          errors.username = "Username is required";\n        }\n        if (!values.email) {\n          errors.email = "Email is required";\n        } else if (\n          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,}$/i.test(values.email)\n        ) {\n          errors.email = "Invalid email address";\n        }\n        return errors;\n      }}\n      onSubmit={(values) => {\n        console.log(values);\n      }}\n    >\n      {({ handleSubmit, errors, touched }) => (\n        <Form onSubmit={handleSubmit}>\n          <div>\n            <label htmlFor="username">Username</label>\n            <Field\n              id="username"\n              name="username"\n              aria-invalid={\n                errors.username && touched.username ? "true" : "false"\n              }\n            />\n            <ErrorMessage name="username" component="span" role="alert" />\n          </div>\n\n          <div>\n            <label htmlFor="email">Email</label>\n            <Field\n              id="email"\n              name="email"\n              type="email"\n              aria-invalid={errors.email && touched.email ? "true" : "false"}\n            />\n            <ErrorMessage name="email" component="span" role="alert" />\n          </div>\n\n          <button type="submit">Submit</button>\n        </Form>\n      )}\n    </Formik>\n  );\n}\n')),(0,n.yg)("p",null,"In this example, we ensured all the form fields have proper labels and ARIA attributes so they can be more accessible. Implementing these accessibility features will make our forms more user-friendly."),(0,n.yg)("h2",{id:"conclusion"},"Conclusion"),(0,n.yg)("p",null,"Form management is an area of web development that may be difficult to get right, especially when using front-end frameworks like React. The HTML5 built-in form functionality comes in handy when validating form fields, managing errors, and submitting forms."),(0,n.yg)("p",null,"However, solutions like Formik and React Hook Form also exist to simplify form management in React and React frameworks. Formik and React Hook Form are popular, free, open-source, mature, and battle-tested. They are both excellent packages for form management. You can use them alongside the native HTML5 form functionality."),(0,n.yg)("p",null,"On the flip side, judging by its commit and release history on GitHub, Formik is not actively maintained. While writing this article, the Formik GitHub repository has not had a recent Git commit or new release in the last year."),(0,n.yg)("p",null,"Additionally, Formik has a relatively larger bundle size than React Hook Form. According to\xa0",(0,n.yg)("a",{parentName:"p",href:"https://bundlejs.com/"},"bundlejs"),", the gzipped bundle size of Formik is 44.34KB, while that of React Hook Forms is 12.12 KB. Furthermore, Formik internally relies on seven dependencies, while React Hook Form has no dependency."),(0,n.yg)("p",null,"Given the pros and cons of both packages highlighted above, your best bet is React Hook Form when looking to use one of the two libraries in a new project. Hopefully, this article has given you insights into which form library to pick for your next project."))}g.isMDXComponent=!0}}]);