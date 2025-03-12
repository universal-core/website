"use strict";(self.webpackChunkdocumentation=self.webpackChunkdocumentation||[]).push([[10710],{58860:(e,t,a)=>{a.d(t,{xA:()=>c,yg:()=>y});var r=a(37953);function n(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function o(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,r)}return a}function i(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?o(Object(a),!0).forEach((function(t){n(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):o(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function l(e,t){if(null==e)return{};var a,r,n=function(e,t){if(null==e)return{};var a,r,n={},o=Object.keys(e);for(r=0;r<o.length;r++)a=o[r],t.indexOf(a)>=0||(n[a]=e[a]);return n}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)a=o[r],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(n[a]=e[a])}return n}var s=r.createContext({}),p=function(e){var t=r.useContext(s),a=t;return e&&(a="function"==typeof e?e(t):i(i({},t),e)),a},c=function(e){var t=p(e.components);return r.createElement(s.Provider,{value:t},e.children)},u="mdxType",h={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var a=e.components,n=e.mdxType,o=e.originalType,s=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),u=p(a),d=n,y=u["".concat(s,".").concat(d)]||u[d]||h[d]||o;return a?r.createElement(y,i(i({ref:t},c),{},{components:a})):r.createElement(y,i({ref:t},c))}));function y(e,t){var a=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var o=a.length,i=new Array(o);i[0]=d;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l[u]="string"==typeof e?e:n,i[1]=l;for(var p=2;p<o;p++)i[p]=a[p];return r.createElement.apply(null,i)}return r.createElement.apply(null,a)}d.displayName="MDXCreateElement"},17524:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>c,contentTitle:()=>s,default:()=>y,frontMatter:()=>l,metadata:()=>p,toc:()=>u});a(37953);var r=a(58860);function n(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function o(e,t){return t=null!=t?t:{},Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):function(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,r)}return a}(Object(t)).forEach((function(a){Object.defineProperty(e,a,Object.getOwnPropertyDescriptor(t,a))})),e}function i(e,t){if(null==e)return{};var a,r,n=function(e,t){if(null==e)return{};var a,r,n={},o=Object.keys(e);for(r=0;r<o.length;r++)a=o[r],t.indexOf(a)>=0||(n[a]=e[a]);return n}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)a=o[r],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(n[a]=e[a])}return n}const l={title:"How to Use the JavaScript Ternary Operator",description:"We expound on the use of JS Ternary Operator with examples of what it is, how it works and discuss the best practices.",slug:"javascript-ternary-operator",authors:"abdullah_numan",tags:["javascript"],image:"https://refine.ams3.cdn.digitaloceanspaces.com/blog/2022-11-15-js-ternary/social.png",hide_table_of_contents:!1},s=void 0,p={permalink:"/blog/javascript-ternary-operator",source:"@site/blog/2024-10-08-js-ternary.md",title:"How to Use the JavaScript Ternary Operator",description:"We expound on the use of JS Ternary Operator with examples of what it is, how it works and discuss the best practices.",date:"2024-10-08T00:00:00.000Z",formattedDate:"October 8, 2024",tags:[{label:"javascript",permalink:"/blog/tags/javascript"}],readingTime:12.17,hasTruncateMarker:!1,authors:[{name:"Abdullah Numan",title:"Fullstack Developer",url:"https://github.com/anewman15/",imageURL:"https://github.com/anewman15.png",key:"abdullah_numan"}],frontMatter:{title:"How to Use the JavaScript Ternary Operator",description:"We expound on the use of JS Ternary Operator with examples of what it is, how it works and discuss the best practices.",slug:"javascript-ternary-operator",authors:"abdullah_numan",tags:["javascript"],image:"https://refine.ams3.cdn.digitaloceanspaces.com/blog/2022-11-15-js-ternary/social.png",hide_table_of_contents:!1},prevItem:{title:"Understanding the React useRef Hook",permalink:"/blog/react-useref-hook-and-ref"},nextItem:{title:"An Intro to Server Components in React",permalink:"/blog/react-server-components"},relatedPosts:[{title:"How to upload files from your HTML form using Base64 encoding",description:"Uploading files using Base64 encoding is a common practice. In this guide, I'm going to show you how to upload files using base64 encoding",permalink:"/blog/how-to-base64-upload",formattedDate:"December 22, 2021",authors:[{name:"Melih Ekinci",title:"Frontend Developer",url:"https://github.com/mlhekinci",imageURL:"https://github.com/mlhekinci.png",key:"melih"}],readingTime:3.145,date:"2021-12-22T00:00:00.000Z"},{title:"JavaScript Substring Method",description:"We'll learn how to use JavaScript substring method to extract substrings from a parent string.",permalink:"/blog/javascript-substring-method",formattedDate:"October 23, 2023",authors:[{name:"Abdullah Numan",title:"Fullstack Developer",url:"https://github.com/anewman15/",imageURL:"https://github.com/anewman15.png",key:"abdullah_numan"}],readingTime:8.88,date:"2023-10-23T00:00:00.000Z"},{title:"Error Handling With try, catch and finally Blocks in JavaScript",description:"We'll see how to handle errors in JavaScript using the try/catch/finally blocks.",permalink:"/blog/javascript-try-catch-finally",formattedDate:"October 30, 2024",authors:[{name:"Abdullah Numan",title:"Fullstack Developer",url:"https://github.com/anewman15/",imageURL:"https://github.com/anewman15.png",key:"abdullah_numan"}],readingTime:15.29,date:"2024-10-30T00:00:00.000Z"}],authorPosts:[{title:"Error Handling With try, catch and finally Blocks in JavaScript",description:"We'll see how to handle errors in JavaScript using the try/catch/finally blocks.",permalink:"/blog/javascript-try-catch-finally",formattedDate:"October 30, 2024",authors:[{name:"Abdullah Numan",title:"Fullstack Developer",url:"https://github.com/anewman15/",imageURL:"https://github.com/anewman15.png",key:"abdullah_numan"}],readingTime:15.29,date:"2024-10-30T00:00:00.000Z"},{title:"Ref Forwarding with React forwardRef",description:"We discuss in detail how ref forwarding with React forwardRef works.",permalink:"/blog/react-forwardref",formattedDate:"June 12, 2024",authors:[{name:"Abdullah Numan",title:"Fullstack Developer",url:"https://github.com/anewman15/",imageURL:"https://github.com/anewman15.png",key:"abdullah_numan"}],readingTime:19.785,date:"2024-06-12T00:00:00.000Z"},{title:"TypeScript Decorators in Brief",description:"We'll explore four main types of TypeScript Decorators with examples from a class that resembles those in typical class based TypeScript libraries.",permalink:"/blog/typescript-decorators",formattedDate:"July 24, 2023",authors:[{name:"Abdullah Numan",title:"Fullstack Developer",url:"https://github.com/anewman15/",imageURL:"https://github.com/anewman15.png",key:"abdullah_numan"}],readingTime:9.6,date:"2023-07-24T00:00:00.000Z"}]},c={authorsImageUrls:[void 0]},u=[{value:"Introduction",id:"introduction",level:2},{value:"What is JavaScript Ternary Operator ?",id:"what-is-javascript-ternary-operator-",level:2},{value:"How JS Ternary Operator Works",id:"how-js-ternary-operator-works",level:2},{value:"What are Truthy/Falsy Values ?",id:"what-are-truthyfalsy-values-",level:3},{value:"When to Use the JS Ternary Operator ?",id:"when-to-use-the-js-ternary-operator-",level:2},{value:"JavaScript Ternary Operator: A Shorthand for <code>if/else</code>",id:"javascript-ternary-operator-a-shorthand-for-ifelse",level:3},{value:"Using the JavaScript Ternary Operator to Test a Function&#39;s Truthiness",id:"using-the-javascript-ternary-operator-to-test-a-functions-truthiness",level:3},{value:"Handling Nullish Values with JS Ternary Operator",id:"handling-nullish-values-with-js-ternary-operator",level:3},{value:"JavaScript Ternary Operator: When The Return Value Rules",id:"javascript-ternary-operator-when-the-return-value-rules",level:3},{value:"Chaining Ternary Operators in JavaScript",id:"chaining-ternary-operators-in-javascript",level:3},{value:"Bonus: Quick Ternary Operator Tips for Beginners",id:"bonus-quick-ternary-operator-tips-for-beginners",level:2},{value:"Performance considerations",id:"performance-considerations",level:2},{value:"Performance Comparison: if/else vs. Ternary Operator",id:"performance-comparison-ifelse-vs-ternary-operator",level:3},{value:"using if/else",id:"using-ifelse",level:4},{value:"Using Ternary Operator",id:"using-ternary-operator",level:4},{value:"Benchmark Example",id:"benchmark-example",level:4},{value:"JavaScript Ternary Operator Best Practices",id:"javascript-ternary-operator-best-practices",level:2},{value:"Summary",id:"summary",level:2}],h={toc:u},d="wrapper";function y(e){var{components:t}=e,a=i(e,["components"]);return(0,r.yg)(d,o(function(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{},r=Object.keys(a);"function"==typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(a).filter((function(e){return Object.getOwnPropertyDescriptor(a,e).enumerable})))),r.forEach((function(t){n(e,t,a[t])}))}return e}({},h,a),{components:t,mdxType:"MDXLayout"}),(0,r.yg)("p",null,(0,r.yg)("strong",{parentName:"p"},(0,r.yg)("em",{parentName:"strong"},"TThis article was last updated on October 08, 2024 to include deeper performance considerations, technical insights on how JavaScript engines process the Ternary Operator, and examples illustrating the use of the operator in complex scenarios such as handling asynchronous operations."))),(0,r.yg)("h2",{id:"introduction"},"Introduction"),(0,r.yg)("p",null,"This post is about the Ternary Operator in JavaScript. We discuss what the ternary operator is and how it works. We go over some examples demonstrating when and why to use it and how it compares to other JavaScript control structures like ",(0,r.yg)("inlineCode",{parentName:"p"},"if/else"),", ",(0,r.yg)("inlineCode",{parentName:"p"},"if/else if/else")," and ",(0,r.yg)("inlineCode",{parentName:"p"},"switch"),". We also learn about some of the best practices while using JS Ternary Operator."),(0,r.yg)("p",null,"Steps we'll cover:"),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("a",{parentName:"li",href:"#introduction"},"Introduction")),(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("a",{parentName:"li",href:"#what-is-javascript-ternary-operator-"},"What is JavaScript Ternary Operator ?")),(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("a",{parentName:"li",href:"#how-js-ternary-operator-works"},"How JS Ternary Operator Works"),(0,r.yg)("ul",{parentName:"li"},(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("a",{parentName:"li",href:"#what-are-truthyfalsy-values-"},"What are Truthy/Falsy Values ?")))),(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("a",{parentName:"li",href:"#when-to-use-the-js-ternary-operator-"},"When to Use the JS Ternary Operator ?"),(0,r.yg)("ul",{parentName:"li"},(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("a",{parentName:"li",href:"#javascript-ternary-operator-a-shorthand-for-ifelse"},"JavaScript Ternary Operator: A Shorthand for ",(0,r.yg)("inlineCode",{parentName:"a"},"if/else"))),(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("a",{parentName:"li",href:"#using-the-javascript-ternary-operator-to-test-a-functions-truthiness"},"Using the JavaScript Ternary Operator to Test a Function's Truthiness")),(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("a",{parentName:"li",href:"#handling-nullish-values-with-js-ternary-operator"},"Handling Nullish Values with JS Ternary Operator")),(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("a",{parentName:"li",href:"#javascript-ternary-operator-when-the-return-value-rules"},"JavaScript Ternary Operator: When The Return Value Rules")),(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("a",{parentName:"li",href:"#chaining-ternary-operators-in-javascript"},"Chaining Ternary Operators in JavaScript")))),(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("a",{parentName:"li",href:"#bonus-quick-ternary-operator-tips-for-beginners"},"Bonus: Quick Ternary Operator Tips for Beginners")),(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("a",{parentName:"li",href:"#performance-considerations"},"Performance considerations"),(0,r.yg)("ul",{parentName:"li"},(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("a",{parentName:"li",href:"#performance-comparison-ifelse-vs-ternary-operator"},"Performance Comparison: if/else vs. Ternary Operator"),(0,r.yg)("ul",{parentName:"li"},(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("a",{parentName:"li",href:"#using-ifelse"},"using if/else")),(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("a",{parentName:"li",href:"#using-ternary-operator"},"Using Ternary Operator")),(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("a",{parentName:"li",href:"#benchmark-example"},"Benchmark Example")))))),(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("a",{parentName:"li",href:"#javascript-ternary-operator-best-practices"},"JavaScript Ternary Operator Best Practices")),(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("a",{parentName:"li",href:"#summary"},"Summary"))),(0,r.yg)("h2",{id:"what-is-javascript-ternary-operator-"},"What is JavaScript Ternary Operator ?"),(0,r.yg)("p",null,"The Ternary Operator in JavaScript is a conditional control structure that checks for the return value of an expression and executes a block of code based on whether the value is truthy or falsy. It then returns the return value of the executed block."),(0,r.yg)("p",null,"The JavaScript Ternary Operator is also referred to as the Conditional Operator."),(0,r.yg)("h2",{id:"how-js-ternary-operator-works"},"How JS Ternary Operator Works"),(0,r.yg)("p",null,"The Ternary Operator in JavaScript is denoted by the question mark: ",(0,r.yg)("inlineCode",{parentName:"p"},"?"),". It is called so because it takes three operands:"),(0,r.yg)("ol",null,(0,r.yg)("li",{parentName:"ol"},"The conditional expression that returns either ",(0,r.yg)("inlineCode",{parentName:"li"},"true")," or ",(0,r.yg)("inlineCode",{parentName:"li"},"false")," based on a check that evaluates to either ",(0,r.yg)("a",{parentName:"li",href:"https://developer.mozilla.org/en-US/docs/Glossary/Truthy"},"truthy")," or ",(0,r.yg)("a",{parentName:"li",href:"https://developer.mozilla.org/en-US/docs/Glossary/Falsy"},"falsy"),"."),(0,r.yg)("li",{parentName:"ol"},"The block of code which should be executed if the conditional check returns ",(0,r.yg)("inlineCode",{parentName:"li"},"true"),"."),(0,r.yg)("li",{parentName:"ol"},"The block that should run if it returns ",(0,r.yg)("inlineCode",{parentName:"li"},"false"),".")),(0,r.yg)("p",null,"The syntax for the JavaScript Ternary Operator looks like this:"),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-ts"},"conditionalExpression ? exprIfTruthy : exprIfFalsy;\n")),(0,r.yg)("p",null,"As we can see, the Ternary Operator places the conditional expression before the ",(0,r.yg)("inlineCode",{parentName:"p"},"?")," and accepts the executable expressions as two other operands that are separated by a colon, ",(0,r.yg)("inlineCode",{parentName:"p"},":"),"."),(0,r.yg)("p",null,"If the ",(0,r.yg)("inlineCode",{parentName:"p"},"conditionalExpression")," evaluates to a truthy value, ",(0,r.yg)("inlineCode",{parentName:"p"},"exprIfTruthy")," is executed. If it evaluates to a falsy value, ",(0,r.yg)("inlineCode",{parentName:"p"},"exprIfFalsy")," is executed."),(0,r.yg)("h3",{id:"what-are-truthyfalsy-values-"},"What are Truthy/Falsy Values ?"),(0,r.yg)("p",null,"In JavaScript, a ",(0,r.yg)("strong",{parentName:"p"},"truthy")," value corresponds to a value that is considered equivalent to ",(0,r.yg)("inlineCode",{parentName:"p"},"true"),' had that been converted to a Boolean. This is another way of saying "this thing exists". All values in JavaScript are truthy if they do not evaluate to or are not defined to be ',(0,r.yg)("strong",{parentName:"p"},"falsy"),"."),(0,r.yg)("p",null,"A falsy value is a value that is casted as ",(0,r.yg)("inlineCode",{parentName:"p"},"false")," when it is converted to a Boolean. In JavaScript, the following values are coerced / converted to ",(0,r.yg)("inlineCode",{parentName:"p"},"false"),":"),(0,r.yg)("p",null,(0,r.yg)("inlineCode",{parentName:"p"},"false"),", ",(0,r.yg)("inlineCode",{parentName:"p"},"0"),", ",(0,r.yg)("inlineCode",{parentName:"p"},"-0"),", ",(0,r.yg)("inlineCode",{parentName:"p"},"0n")," ",(0,r.yg)("inlineCode",{parentName:"p"},'""'),", ",(0,r.yg)("inlineCode",{parentName:"p"},"null"),", ",(0,r.yg)("inlineCode",{parentName:"p"},"undefined"),", ",(0,r.yg)("inlineCode",{parentName:"p"},"NaN")," and ",(0,r.yg)("inlineCode",{parentName:"p"},"document.all"),"."),(0,r.yg)("p",null,"Expressions that evaluate to anything other than these are considered ",(0,r.yg)("strong",{parentName:"p"},"truthy"),"."),(0,r.yg)("h2",{id:"when-to-use-the-js-ternary-operator-"},"When to Use the JS Ternary Operator ?"),(0,r.yg)("p",null,"We use the JavaScript Ternary Operator when we need to control execution flow between two paths based on a conditional check that returns a Boolean."),(0,r.yg)("p",null,"A simplest example involves testing the value of an expression stored in a variable to see whether it exists or not, and then pursue an execution path based on the outcome. If it exists, we do relevant stuff and return it; if not, do some other relevant stuff and return that. The below code shows how:"),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-ts"},'// Example\n\nconst student = "Abd";\nconst welcomeStudent = student ? `Welcome, ${student}!` : "Welcome, Guest!";\n\nconsole.log(welcomeStudent); // Welcome, Abd!\n')),(0,r.yg)("p",null,"In the above snippet, ",(0,r.yg)("inlineCode",{parentName:"p"},"student ?")," tests to see if ",(0,r.yg)("inlineCode",{parentName:"p"},"student")," is truthy. The value from this conditional test is used to decide the value of the stored variable, ",(0,r.yg)("inlineCode",{parentName:"p"},"welcomeStudent"),". In other words, we are using the conditional operator to control the value of ",(0,r.yg)("inlineCode",{parentName:"p"},"welcomeStudent")," based on the value of ",(0,r.yg)("inlineCode",{parentName:"p"},"student"),"."),(0,r.yg)("p",null,"Notice that the return value of the executed block following the check is returned as the operator's return value. That allow us to store it in ",(0,r.yg)("inlineCode",{parentName:"p"},"welcomeStudent"),"."),(0,r.yg)("h3",{id:"javascript-ternary-operator-a-shorthand-for-ifelse"},"JavaScript Ternary Operator: A Shorthand for ",(0,r.yg)("inlineCode",{parentName:"h3"},"if/else")),(0,r.yg)("p",null,"The Ternary Operator is a concise alternative to ",(0,r.yg)("inlineCode",{parentName:"p"},"if/else"),". For example, we could have written the above control flow like this:"),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-js"},'const student = "Abd";\nlet welcomeStudent;\n\nif (student) {\n  welcomeStudent = `Welcome, ${student.name}!`;\n} else {\n  welcomeStudent = "Welcome, Guest!";\n}\n\nconsole.log(welcomeStudent); // Welcome, Abd!\n')),(0,r.yg)("p",null,"Notice how the ternary operator used previously helped avoid using the above procedural ",(0,r.yg)("inlineCode",{parentName:"p"},"if/else")," flow. The Ternary Operator made the code more readable, reusable and the logic easier to follow."),(0,r.yg)("h3",{id:"using-the-javascript-ternary-operator-to-test-a-functions-truthiness"},"Using the JavaScript Ternary Operator to Test a Function's Truthiness"),(0,r.yg)("p",null,"The ternary operator can also be used when we need to test the return a value of a function. As in the ",(0,r.yg)("inlineCode",{parentName:"p"},"welcomeStudentTernary")," function below:"),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-ts"},'// With if/else\nconst welcomeStudent = (student) => {\n  if (student) {\n    return `Welcome, ${student}!`;\n  } else {\n    return "Welcome, Guest!";\n  }\n};\n\nconsole.log(welcomeStudent("Abd")); // Welcome, Abd!\nconsole.log(welcomeStudent("")); // Welcome, Guest!\nconsole.log(welcomeStudent(null)); // Welcome, Guest!\n\n// With ternary operator\nconst welcomeStudentTernary = (student) =>\n  student ? `Welcome, ${student}!` : "Welcome, Guest!";\n\nconsole.log(welcomeStudentTernary("Abd")); // Welcome, Abd!\nconsole.log(welcomeStudentTernary("")); // Welcome, Guest!\nconsole.log(welcomeStudentTernary(null)); // Welcome, Guest!\n')),(0,r.yg)("p",null,"Again, it provides conciseness. And goes well with arrow functions."),(0,r.yg)("h3",{id:"handling-nullish-values-with-js-ternary-operator"},"Handling Nullish Values with JS Ternary Operator"),(0,r.yg)("p",null,"Notice how the nullish arguments are being considered in both cases. With just a few characters added, the Ternary one-liner offers more convenience to an efficient developer who doesn't want to waste lines for dealing with nullish logic."),(0,r.yg)("h3",{id:"javascript-ternary-operator-when-the-return-value-rules"},"JavaScript Ternary Operator: When The Return Value Rules"),(0,r.yg)("p",null,"It is important to notice that with the Ternary Operator, we are only interested in the return value of the conditional check as well as those of the two execution blocks. Side effects are less important."),(0,r.yg)("p",null,"For example, the Ternary Operator would not be useful for us had being polite or yelling was important to us:"),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-ts"},'const welcomeStudent = (student) => {\n  if (student) {\n    console.log("First YELL!");\n    return `Welcome, ${student}!`;\n  } else {\n    console.log("Be composed and polite.");\n    return "Welcome, Guest!";\n  }\n};\n\nconsole.log(welcomeStudent("Abd"));\n// "First YELL!"\n// Welcome, Abd!\nconsole.log(welcomeStudent());\n// "Be composed and polite."\n// Welcome, Guest!\n\n// With ternary operator\nconst welcomeStudentTernary = (student) =>\n  student ? `Welcome, ${student}!` : "Welcome, Guest!";\n\nconsole.log(welcomeStudentTernary("Abd")); // Welcome, Abd!\nconsole.log(welcomeStudentTernary("")); // Welcome, Guest!\n')),(0,r.yg)("p",null,"In the case when they are more important, we should be using ",(0,r.yg)("inlineCode",{parentName:"p"},"if/else")," statements, as in ",(0,r.yg)("inlineCode",{parentName:"p"},"welcomeStudent"),". So, the JavaScript Ternary Operator is useful in cases when the return value of the expressions matter more. This is a major distinction between the usage of ",(0,r.yg)("inlineCode",{parentName:"p"},"if/else")," and the Ternary operator in JavaScript."),(0,r.yg)("h3",{id:"chaining-ternary-operators-in-javascript"},"Chaining Ternary Operators in JavaScript"),(0,r.yg)("p",null,"We can chain ternary operators to emulate a ",(0,r.yg)("inlineCode",{parentName:"p"},"if/else if/else")," control structure or a ",(0,r.yg)("inlineCode",{parentName:"p"},"switch")," statement:"),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-ts"},'// With if/else if/else\nconst grade = (mark) => {\n  if (mark > 100) {\n    return;\n  } else if (mark > 80) {\n    return "A";\n  } else if (mark > 70) {\n    return "B";\n  } else if (mark > 60) {\n    return "C";\n  } else if (mark > 50) {\n    return "D";\n  } else {\n    return "F";\n  }\n};\n\nconsole.log(grade(100)); // A\nconsole.log(grade(1000)); // undefined\nconsole.log(grade(10)); // F\n\n// With chained ternary operators\nconst grade = (mark) =>\n  mark > 100\n    ? undefined\n    : mark > 80\n    ? "A"\n    : mark > 70\n    ? "B"\n    : mark > 60\n    ? "C"\n    : mark > 50\n    ? "D"\n    : "F";\n\nconsole.log(grade(100)); // A\nconsole.log(grade(1000)); // undefined\nconsole.log(grade(10)); // F\n')),(0,r.yg)("p",null,"Here, we chained an additional conditional operator into the third operand at each level."),(0,r.yg)("h2",{id:"bonus-quick-ternary-operator-tips-for-beginners"},"Bonus: Quick Ternary Operator Tips for Beginners"),(0,r.yg)("p",null,"I wanted to share a few quick insights about the JavaScript Ternary Operator that might be useful:"),(0,r.yg)("ol",null,(0,r.yg)("li",{parentName:"ol"},"Using Ternary Operator for Short-Circuiting Logic")),(0,r.yg)("p",null,"Sometimes we use ternary operators to simplify code and short-circuit logic. It\u2019s a quick way to check a condition and return something based on it without writing an if/else block. For example:"),(0,r.yg)("p",null,"const result = condition ? 'Value if true' : 'Value if false';"),(0,r.yg)("p",null,"This can be super helpful when you want to make quick decisions based on a condition without too much boilerplate."),(0,r.yg)("ol",{start:2},(0,r.yg)("li",{parentName:"ol"},"Error Handling with Ternary Operators")),(0,r.yg)("p",null,"We can also use the ternary operator for error handling. For example, if we want to check if a value exists before performing an action, we can use a ternary operator to handle errors or defaults:"),(0,r.yg)("p",null,"const data = response ? response.data : 'No data available';"),(0,r.yg)("p",null,"It\u2019s a simple way to avoid undefined errors or fallback to default values when something goes wrong."),(0,r.yg)("ol",{start:3},(0,r.yg)("li",{parentName:"ol"},"Ternary Operator in JSX for Conditional Rendering")),(0,r.yg)("p",null,"In React, the ternary operator is commonly used in JSX for conditional rendering. Instead of using if/else, we can conditionally render components or HTML like this:"),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-jsx"},"return <div>{isLoggedIn ? <Dashboard /> : <Login />}</div>;\n")),(0,r.yg)("p",null,"This makes React code cleaner and more readable by keeping conditional logic inline."),(0,r.yg)("p",null,"Just following up with a couple more tips on the JavaScript Ternary Operator that might come in handy:"),(0,r.yg)("ol",{start:4},(0,r.yg)("li",{parentName:"ol"},"Handling Nullish Values with Ternary Operator")),(0,r.yg)("p",null,"Sometimes we deal with null or undefined values, and the ternary operator can help handle those cases efficiently. For instance:"),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre"},"const result = value !== null && value !== undefined ? value : 'Default value';\n")),(0,r.yg)("p",null,"This ensures that if value is null or undefined, we can fall back on a default value, making the code safer and preventing unexpected errors."),(0,r.yg)("ol",{start:5},(0,r.yg)("li",{parentName:"ol"},"Chaining Ternary Operators for Multiple Conditions")),(0,r.yg)("p",null,"Though it\u2019s not always the most readable, you can chain ternary operators to handle multiple conditions. It works like an inline if/else if/else block. Here\u2019s an example:"),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-tsx"},'const grade = score > 90 ? "A" : score > 80 ? "B" : score > 70 ? "C" : "F";\n')),(0,r.yg)("p",null,"This can be helpful for small decision trees, but we should avoid over-complicating the logic as it can reduce readability."),(0,r.yg)("h2",{id:"performance-considerations"},"Performance considerations"),(0,r.yg)("p",null,"We can get into more detail with performance considerations of the JavaScript Ternary Operator, notably how the JavaScript engines process the operator technically."),(0,r.yg)("p",null,"Ternary Operator from the Point of View of a JavaScript Engine\nJavaScript engines, such as V8, used in Chrome and Node.js, offer Just-In-Time compilation. Modern JavaScript engines have optimized both if/else statements and the ternary operator to be relatively fast. Nevertheless, there are performance and optimization advantages to the ternary operator:"),(0,r.yg)("p",null,(0,r.yg)("strong",{parentName:"p"},"Simplification of code:")),(0,r.yg)("p",null,"Notice how the ternary operator reduces the bloat of your code by taking large conditional logic and putting it into a single line. This allows JavaScript engines more easily to optimize it because smaller, more predictable code is often better inlined - execution is faster."),(0,r.yg)("p",null,(0,r.yg)("strong",{parentName:"p"},"Control Flow Branch Prediction:")),(0,r.yg)("p",null,"Ternary operators are conciser and result in better predictability of the engine, especially for simple use cases, since modern CPUs utilize branch prediction that tries to forecast the outcome of a condition for faster execution. So one comparison in a ternary operator may cause fewer mispredictions, especially in performance-critical applications."),(0,r.yg)("p",null,(0,r.yg)("strong",{parentName:"p"},"Faster generation of byte code:")),(0,r.yg)("p",null,"During compilation by JIT, the JavaScript engine compiles code to bytecode. Usually, bytecode for the ternary operator is somewhat more efficient compared to bytecode for an equivalent if/else statement because the ternary operator returns a value in one logical step without requiring multiple jumps in the control flow."),(0,r.yg)("h3",{id:"performance-comparison-ifelse-vs-ternary-operator"},"Performance Comparison: if/else vs. Ternary Operator"),(0,r.yg)("p",null,"Generally speaking, the performance difference between if/else versus the ternary operator for most uses is negligible. Of course, we may want to run some performance tests-PRIMARY-to confirm this, especially if we\u2019re using either one of these in tight loops."),(0,r.yg)("p",null,"Let me elaborate with an example:"),(0,r.yg)("h4",{id:"using-ifelse"},"using if/else"),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-js"},"let result;\nif (Condition) {\n  result = trueValue;\n} else {\n  result = falseValue;\n}\n")),(0,r.yg)("h4",{id:"using-ternary-operator"},"Using Ternary Operator"),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-js"},"let result = condition ? trueValue : falseValue;\n")),(0,r.yg)("p",null,"Both snippets work in the same way, but the ternary operator creates less bytecode because it needs fewer instructions to evaluate and return."),(0,r.yg)("h4",{id:"benchmark-example"},"Benchmark Example"),(0,r.yg)("p",null,"Here\u2019s how we might benchmark the ternary operator against if/else in Node.js:"),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-js"},'console.time("ternary");\nfor (let i = 0; i < 1e7; i++) {\n  let result = i % 2 === 0 ? "even" : "odd";\n}\nconsole.timeEnd("ternary");\n\nconsole.time("ifElse");\nfor (let i = 0; i < 1e7; i++) {\n  let result;\n  if (i % 2 === 0) result = "even";\n  else result = "odd";\n}\nconsole.timeEnd("ifElse");\n')),(0,r.yg)("p",null,"When benchmarking this, it is usually observed that the ternary operator may be very slightly faster than if/else because of simpler control flow and fewer bytecode instructions. However, in real-world applications, the difference is so tiny usually that readability and maintainability are more important than such micro-optimizations."),(0,r.yg)("h2",{id:"javascript-ternary-operator-best-practices"},"JavaScript Ternary Operator Best Practices"),(0,r.yg)("p",null,"Many developers do not prefer chained ternary operators like the one above because multiple conditional checks hurt readability and maintainability. Instead of chaining ternary operators, using plain ",(0,r.yg)("inlineCode",{parentName:"p"},"if/else if/else")," or ",(0,r.yg)("inlineCode",{parentName:"p"},"switch")," statements are recommended when there are multiple paths in a control flow."),(0,r.yg)("p",null,"So, here are some best practices:"),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},"Use the JavaScript Ternary Operator when there are only two paths in the control flow."),(0,r.yg)("li",{parentName:"ul"},"Use the JS Ternary Operator consistently."),(0,r.yg)("li",{parentName:"ul"},"Avoid using chained Ternary Operators as they make the code difficult to read and maintain."),(0,r.yg)("li",{parentName:"ul"},"Use a JavaScript Ternary Operator with arrow functions as they also produce good one-liners."),(0,r.yg)("li",{parentName:"ul"},"In the case complex conditional checks are involved, use parentheses to properly implement the logic. This also improves readability and maintainability")),(0,r.yg)("h2",{id:"summary"},"Summary"),(0,r.yg)("p",null,"In this post, we expounded on the use of the Ternary Operator in JavaScript. We acknowledged its importance in writing concise code, especially in situations that involve a conditional check and two execution paths."),(0,r.yg)("p",null,"We saw with examples that the JS Ternary Operator is a good alternative to ",(0,r.yg)("inlineCode",{parentName:"p"},"if/else")," and is preferable when the return values of the expressions matter more than side effects. We covered a case where it is useful for storing the value returned from evaluating primitives across the execution path as well as one where the same is done after executing a function."),(0,r.yg)("p",null,"We also encountered an example that shows JavaScript Ternary Operators can be chained to emulate ",(0,r.yg)("inlineCode",{parentName:"p"},"if/else if/else")," and ",(0,r.yg)("inlineCode",{parentName:"p"},"switch")," blocks, but the recommended way is to avoid chaining multiple Ternary Operators. We learned about other best practices such as using it consistently in situations where there are only two paths in the control flow, with arrow functions and with parentheses when needed."))}y.isMDXComponent=!0}}]);