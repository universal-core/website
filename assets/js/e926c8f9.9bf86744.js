"use strict";(self.webpackChunkdocumentation=self.webpackChunkdocumentation||[]).push([[25375],{58860:(e,t,n)=>{n.d(t,{xA:()=>u,yg:()=>p});var i=n(37953);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,i)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,i,r=function(e,t){if(null==e)return{};var n,i,r={},o=Object.keys(e);for(i=0;i<o.length;i++)n=o[i],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(i=0;i<o.length;i++)n=o[i],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var l=i.createContext({}),c=function(e){var t=i.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):a(a({},t),e)),n},u=function(e){var t=c(e.components);return i.createElement(l.Provider,{value:t},e.children)},m="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return i.createElement(i.Fragment,{},t)}},g=i.forwardRef((function(e,t){var n=e.components,r=e.mdxType,o=e.originalType,l=e.parentName,u=s(e,["components","mdxType","originalType","parentName"]),m=c(n),g=r,p=m["".concat(l,".").concat(g)]||m[g]||d[g]||o;return n?i.createElement(p,a(a({ref:t},u),{},{components:n})):i.createElement(p,a({ref:t},u))}));function p(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=n.length,a=new Array(o);a[0]=g;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s[m]="string"==typeof e?e:r,a[1]=s;for(var c=2;c<o;c++)a[c]=n[c];return i.createElement.apply(null,a)}return i.createElement.apply(null,n)}g.displayName="MDXCreateElement"},42813:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>u,contentTitle:()=>l,default:()=>p,frontMatter:()=>s,metadata:()=>c,toc:()=>m});n(37953);var i=n(58860);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){return t=null!=t?t:{},Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):function(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,i)}return n}(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))})),e}function a(e,t){if(null==e)return{};var n,i,r=function(e,t){if(null==e)return{};var n,i,r={},o=Object.keys(e);for(i=0;i<o.length;i++)n=o[i],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(i=0;i<o.length;i++)n=o[i],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}const s={title:"Check Kubernetes Version - Advanced Use Cases with kubectl version",description:"Kubectl version is a very basic command, however, you might still face some errors like connection issues, version mismatches, or configuration problems. Here are some steps to debug these common errors.",slug:"kubectl-version",authors:"muhammad_khabbab",tags:["kubernetes","docker"],image:"https://refine.ams3.cdn.digitaloceanspaces.com/blog/2024-01-05-kubectl-version/social.png",hide_table_of_contents:!1},l=void 0,c={permalink:"/blog/kubectl-version",source:"@site/blog/2024-01-05-kubectl-version.md",title:"Check Kubernetes Version - Advanced Use Cases with kubectl version",description:"Kubectl version is a very basic command, however, you might still face some errors like connection issues, version mismatches, or configuration problems. Here are some steps to debug these common errors.",date:"2024-01-05T00:00:00.000Z",formattedDate:"January 5, 2024",tags:[{label:"kubernetes",permalink:"/blog/tags/kubernetes"},{label:"docker",permalink:"/blog/tags/docker"}],readingTime:6.98,hasTruncateMarker:!1,authors:[{name:"Muhammad Khabbab",title:"Project Manager",imageURL:"/img/generic-profile.png",key:"muhammad_khabbab"}],frontMatter:{title:"Check Kubernetes Version - Advanced Use Cases with kubectl version",description:"Kubectl version is a very basic command, however, you might still face some errors like connection issues, version mismatches, or configuration problems. Here are some steps to debug these common errors.",slug:"kubectl-version",authors:"muhammad_khabbab",tags:["kubernetes","docker"],image:"https://refine.ams3.cdn.digitaloceanspaces.com/blog/2024-01-05-kubectl-version/social.png",hide_table_of_contents:!1},prevItem:{title:"Build Access Control Mechanism using Permify",permalink:"/blog/access-control"},nextItem:{title:"Kubernetes Statefulset vs Deployment with Examples",permalink:"/blog/kubernetes-statefulset-vs-deployment"},relatedPosts:[{title:"Kubernetes Statefulset vs Deployment with Examples",description:"We'll discuss the practical differences between Deployments and StatefulSets.",permalink:"/blog/kubernetes-statefulset-vs-deployment",formattedDate:"January 4, 2024",authors:[{name:"Muhammad Khabbab",title:"Project Manager",imageURL:"/img/generic-profile.png",key:"muhammad_khabbab"}],readingTime:9.095,date:"2024-01-04T00:00:00.000Z"},{title:"How to deploy Postgres on Kubernetes",description:"This article will serve as a guide for installing PostgreSQL on Kubernetes, covering pre-requisites such as setting up Kubectl, Kubernetes clusters, and Docker.",permalink:"/blog/postgres-on-kubernetes",formattedDate:"January 22, 2024",authors:[{name:"Muhammad Khabbab",title:"Project Manager",imageURL:"/img/generic-profile.png",key:"muhammad_khabbab"}],readingTime:9.045,date:"2024-01-22T00:00:00.000Z"},{title:"Kubernetes vs Docker - A Detailed Comparison",description:"Explore an in-depth comparison between Docker and Kubernetes, focusing on their unique features, advantages, and ideal use scenarios.",permalink:"/blog/kubernetes-vs-docker",formattedDate:"January 26, 2024",authors:[{name:"Muhammad Khabbab",title:"Project Manager",imageURL:"/img/generic-profile.png",key:"muhammad_khabbab"}],readingTime:14.36,date:"2024-01-26T00:00:00.000Z"}],authorPosts:[{title:"Kubernetes Terminated with exit code 1 error",description:'This article will help you troubleshoot the "Terminated with exit code 1" error in Kubernetes.',permalink:"/blog/kubernetes-terminated-with-exit-code-1",formattedDate:"January 31, 2024",authors:[{name:"Muhammad Khabbab",title:"Project Manager",imageURL:"/img/generic-profile.png",key:"muhammad_khabbab"}],readingTime:10.295,date:"2024-01-31T00:00:00.000Z"},{title:"Django REST Framework - How to use it to create APIs?",description:"Explore the Django REST Framework and learn how to create APIs using it.",permalink:"/blog/django-rest-framework",formattedDate:"April 3, 2024",authors:[{name:"Muhammad Khabbab",title:"Project Manager",imageURL:"/img/generic-profile.png",key:"muhammad_khabbab"}],readingTime:7.68,date:"2024-04-03T00:00:00.000Z"},{title:"Introduction to Docker Networking",description:"We'll go over the basics of Docker networking, including the default networks, bridge networking, host networking, overlay networking, Macvlan networking, and custom bridge networking.",permalink:"/blog/docker-networking",formattedDate:"October 18, 2023",authors:[{name:"Muhammad Khabbab",title:"Project Manager",imageURL:"/img/generic-profile.png",key:"muhammad_khabbab"}],readingTime:8.925,date:"2023-10-18T00:00:00.000Z"}]},u={authorsImageUrls:[void 0]},m=[{value:"Introduction",id:"introduction",level:2},{value:"Getting Started with kubectl",id:"getting-started-with-kubectl",level:2},{value:"Installation of kubectl",id:"installation-of-kubectl",level:3},{value:"How to use the kubectl version command",id:"how-to-use-the-kubectl-version-command",level:3},{value:"Basic usage of kubectl version",id:"basic-usage-of-kubectl-version",level:2},{value:"Understanding the output: client and server versions",id:"understanding-the-output-client-and-server-versions",level:3},{value:"Detailed breakdown of version information",id:"detailed-breakdown-of-version-information",level:2},{value:"Explanation of version components",id:"explanation-of-version-components",level:4},{value:"Common scenarios and troubleshooting",id:"common-scenarios-and-troubleshooting",level:2},{value:"Scenario 1: Checking compatibility between client and server versions",id:"scenario-1-checking-compatibility-between-client-and-server-versions",level:3},{value:"Scenario 2: Debugging common errors",id:"scenario-2-debugging-common-errors",level:3},{value:"Steps to debug:",id:"steps-to-debug",level:4},{value:"Advanced usage of <code>kubectl version</code>",id:"advanced-usage-of-kubectl-version",level:2},{value:"Using <code>kubectl version</code> with different output formats (JSON, YAML)",id:"using-kubectl-version-with-different-output-formats-json-yaml",level:3},{value:"JSON format",id:"json-format",level:3},{value:"YAML format",id:"yaml-format",level:3},{value:"Checking version without a Kubernetes cluster (offline mode)",id:"checking-version-without-a-kubernetes-cluster-offline-mode",level:2},{value:"Conclusion",id:"conclusion",level:2}],d={toc:m},g="wrapper";function p(e){var{components:t}=e,n=a(e,["components"]);return(0,i.yg)(g,o(function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{},i=Object.keys(n);"function"==typeof Object.getOwnPropertySymbols&&(i=i.concat(Object.getOwnPropertySymbols(n).filter((function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable})))),i.forEach((function(t){r(e,t,n[t])}))}return e}({},d,n),{components:t,mdxType:"MDXLayout"}),(0,i.yg)("h2",{id:"introduction"},"Introduction"),(0,i.yg)("p",null,"Kubernetes is a container orchestration powerhouse, and kubectl is its main command-line tool for developers. Understanding your kubectl version affects Kubernetes cluster compatibility and application deployment and management. This article will discuss the ",(0,i.yg)("inlineCode",{parentName:"p"},"kubectl version")," command in detail. We will cover installation, basic and advanced use, output, and common issues."),(0,i.yg)("p",null,"This guide will also show you how to utilize the ",(0,i.yg)("inlineCode",{parentName:"p"},"kubectl version")," command in various situations. Let's get started with its installation, followed by the advanced use cases."),(0,i.yg)("h2",{id:"getting-started-with-kubectl"},"Getting Started with kubectl"),(0,i.yg)("h3",{id:"installation-of-kubectl"},"Installation of kubectl"),(0,i.yg)("p",null,"Make sure kubectl is installed before using it. ",(0,i.yg)("inlineCode",{parentName:"p"},"kubectl")," lets you run Kubernetes cluster instructions from the command line. Behind the scenes, kubectl communicates with Kubernetes API server. This simple guide will get you started:"),(0,i.yg)("ol",null,(0,i.yg)("li",{parentName:"ol"},(0,i.yg)("strong",{parentName:"li"},"Download kubectl"),": You can download the latest version of ",(0,i.yg)("inlineCode",{parentName:"li"},"kubectl")," from the official ",(0,i.yg)("a",{parentName:"li",href:"https://kubernetes.io/docs/tasks/tools/"},"Kubernetes website"),". This URL has thorough instructions for Windows, macOS, and Linux."),(0,i.yg)("li",{parentName:"ol"},(0,i.yg)("strong",{parentName:"li"},"Install the binary"),": Follow OS-specific instructions. Downloading and executing the binary is typical. Windows requires installing the.exe file and adding its installation location to the environment variables. Use a package manager to install it and then move it to a directory in your PATH, here is an example: ",(0,i.yg)("inlineCode",{parentName:"li"},"sudo mv /usr/local/bin/")),(0,i.yg)("li",{parentName:"ol"},(0,i.yg)("strong",{parentName:"li"},"Verify the installation"),": After installation, run ",(0,i.yg)("inlineCode",{parentName:"li"},"kubectl version --client")," in your terminal to check. This command shows the installed kubectl version.",(0,i.yg)("div",{className:"centered-image"},(0,i.yg)("img",{src:"https://refine.ams3.cdn.digitaloceanspaces.com/blog/2024-01-05-kubectl-version/image1.png",alt:"Verifying Kubectl installation"})))),(0,i.yg)("h3",{id:"how-to-use-the-kubectl-version-command"},"How to use the kubectl version command"),(0,i.yg)("p",null,"Using ",(0,i.yg)("inlineCode",{parentName:"p"},"kubectl version")," is pretty simple. This command checks the version of kubectl and the Kubernetes server it connects to. Here's how you use it:"),(0,i.yg)("ul",null,(0,i.yg)("li",{parentName:"ul"},"Open your terminal."),(0,i.yg)("li",{parentName:"ul"},"Type ",(0,i.yg)("inlineCode",{parentName:"li"},"kubectl version")," and enter. It returns client (kubectl) and server (Kubernetes cluster) information.",(0,i.yg)("div",{className:"centered-image"},(0,i.yg)("img",{src:"https://refine.ams3.cdn.digitaloceanspaces.com/blog/2024-01-05-kubectl-version/image2.png",alt:"Checking kubectl version"})))),(0,i.yg)("h2",{id:"basic-usage-of-kubectl-version"},"Basic usage of kubectl version"),(0,i.yg)("h3",{id:"understanding-the-output-client-and-server-versions"},"Understanding the output: client and server versions"),(0,i.yg)("p",null,"The ",(0,i.yg)("inlineCode",{parentName:"p"},"kubectl version")," command output has two primary parts:"),(0,i.yg)("ol",null,(0,i.yg)("li",{parentName:"ol"},(0,i.yg)("p",{parentName:"li"},(0,i.yg)("strong",{parentName:"p"},"Client version"),": This shows the version of the kubectl client utility on your machine. Version number, build date, git commit, platform, and more are included. Cloud vendors prepare kubectl for you if you connect to cloud-hosted Kubernetes via their web-based cloud shell. The GCP console below shows the kubectl client tool provisioned in the same browser."),(0,i.yg)("div",{className:"centered-image"},(0,i.yg)("img",{src:"https://refine.ams3.cdn.digitaloceanspaces.com/blog/2024-01-05-kubectl-version/image3.png",alt:"Cloud based shell access"}))),(0,i.yg)("li",{parentName:"ol"},(0,i.yg)("p",{parentName:"li"},(0,i.yg)("strong",{parentName:"p"},"Server version"),": When connected to a Kubernetes cluster, ",(0,i.yg)("inlineCode",{parentName:"p"},"kubectl")," will display the server version. Similar details as the client version, but for the server. If no server version is displayed, the kubectl client has been installed but not connected to a Kubernetes server."))),(0,i.yg)("p",null,"Understanding both versions is critical because client-server compatibility affects cluster resource management. We'll explore the version information provided by ",(0,i.yg)("inlineCode",{parentName:"p"},"kubectl")," in this section. Developers need to understand these components for Kubernetes troubleshooting and compatibility."),(0,i.yg)("h2",{id:"detailed-breakdown-of-version-information"},"Detailed breakdown of version information"),(0,i.yg)("h4",{id:"explanation-of-version-components"},"Explanation of version components"),(0,i.yg)("p",null,"To see the details of the version, just run the command ",(0,i.yg)("inlineCode",{parentName:"p"},"kubectl version --output=yaml")),(0,i.yg)("div",{className:"centered-image"},(0,i.yg)("img",{src:"https://refine.ams3.cdn.digitaloceanspaces.com/blog/2024-01-05-kubectl-version/image4.png",alt:"Details of kubectl version"})),(0,i.yg)("p",null,(0,i.yg)("strong",{parentName:"p"},"Major"),": This number denotes kubectl's major version. big version changes frequently require big updates and may be incompatible."),(0,i.yg)("p",null,(0,i.yg)("strong",{parentName:"p"},"Minor"),": Minor version numbers indicate smaller, more frequent upgrades. Updates usually add functionality while maintaining compatibility with the major version."),(0,i.yg)("p",null,(0,i.yg)("strong",{parentName:"p"},"GitVersion:")," This field lists the major and minor versions of kubectl, as well as pre-release IDs like alpha, beta, etc."),(0,i.yg)("p",null,(0,i.yg)("strong",{parentName:"p"},"GitCommit"),":Every kubectl version has a source code repository commit. This Git commit hash shows which code modifications are in your version."),(0,i.yg)("p",null,(0,i.yg)("strong",{parentName:"p"},"GitTreeState:")," Indicates whether the kubectl binary's source tree was clean or modified. Clean means the binary was built without uncommitted changes."),(0,i.yg)("p",null,(0,i.yg)("strong",{parentName:"p"},"BuildDate:")," The kubectl binary was built at this time. It shows how new your version is."),(0,i.yg)("p",null,(0,i.yg)("strong",{parentName:"p"},"GoVersion"),": Kubectl is written in Go, hence this shows its GoVersion. It helps determine compatibility and performance."),(0,i.yg)("p",null,(0,i.yg)("strong",{parentName:"p"},"Compiler"),":This shows the compiler used to build kubectl. Go compiler gc is typical."),(0,i.yg)("p",null,(0,i.yg)("strong",{parentName:"p"},"Platform:")," The kubectl binary's operating system and architecture, such as linux/amd64 or windows/amd64."),(0,i.yg)("h2",{id:"common-scenarios-and-troubleshooting"},"Common scenarios and troubleshooting"),(0,i.yg)("h3",{id:"scenario-1-checking-compatibility-between-client-and-server-versions"},"Scenario 1: Checking compatibility between client and server versions"),(0,i.yg)("p",null,"When working with Kubernetes, make sure that your ",(0,i.yg)("inlineCode",{parentName:"p"},"kubectl")," client version is compatible with the server's version. Here are few tips regarding backward compatibility of client and server versions."),(0,i.yg)("p",null,"\u2022 Newer clients typically work with older servers. Using a newer kubectl client allows the management of older Kubernetes clusters."),(0,i.yg)("p",null,"\u2022 Some new client features may not work on older servers. Warnings or errors may occur when using features with an incompatible server."),(0,i.yg)("p",null,"\u2022 Older clients may not work with newer servers. Older clients may not understand newer server features or APIs, causing errors or unexpected behavior."),(0,i.yg)("p",null,"\u2022 For the latest features, bug fixes, and security improvements, keep your client and server versions updated. Knowing your older client's compatibility limitations is helpful if updating the server isn't possible."),(0,i.yg)("p",null,"Note that the official ",(0,i.yg)("a",{parentName:"p",href:"https://kubernetes.io/docs/tasks/administer-cluster/kubeadm/kubeadm-upgrade/"},"documentation")," states that within one minor version (older or newer), the client and server versions are generally considered compatible. For example, a v1.28 kubectl client is compatible with server versions v1.27, v1.28, and v1.29. Differences in the patch number (the ",(0,i.yg)("inlineCode",{parentName:"p"},"x")," in ",(0,i.yg)("inlineCode",{parentName:"p"},"1.26.x"),") are usually not a concern for compatibility as they typically involve bug fixes and security patches."),(0,i.yg)("h3",{id:"scenario-2-debugging-common-errors"},"Scenario 2: Debugging common errors"),(0,i.yg)("p",null,"Although the `kubectl version is a very basic command, however, you might still face some errors like connection issues, version mismatches, or configuration problems. Here are some steps to debug these common errors:"),(0,i.yg)("h4",{id:"steps-to-debug"},"Steps to debug:"),(0,i.yg)("ol",null,(0,i.yg)("li",{parentName:"ol"},(0,i.yg)("strong",{parentName:"li"},"Check connectivity"),": If you can't connect to the Kubernetes server, check your internet and/or network stability. Sometimes firewalls cause problems too.")),(0,i.yg)("p",null,"Example of a network connectivity issue is shown below."),(0,i.yg)("div",{className:"centered-image"},(0,i.yg)("img",{src:"https://refine.ams3.cdn.digitaloceanspaces.com/blog/2024-01-05-kubectl-version/image5.png",alt:"network connectivity issue"})),(0,i.yg)("ol",null,(0,i.yg)("li",{parentName:"ol"},(0,i.yg)("p",{parentName:"li"},(0,i.yg)("strong",{parentName:"p"},"Version mismatch"),": For version-related problems, compare client and server versions as in Scenario 1. The warning of a version mismatch is highlighted in red below."),(0,i.yg)("div",{className:"centered-image"},(0,i.yg)("img",{src:"https://refine.ams3.cdn.digitaloceanspaces.com/blog/2024-01-05-kubectl-version/image6.png",alt:"Version mismatch"}))),(0,i.yg)("li",{parentName:"ol"},(0,i.yg)("p",{parentName:"li"},(0,i.yg)("strong",{parentName:"p"},"Configuration check"),": You need to make sure that your ",(0,i.yg)("inlineCode",{parentName:"p"},"kubectl")," is configured correctly. Use the command ",(0,i.yg)("inlineCode",{parentName:"p"},"kubectl config view")," to check your current configuration. This command can help you track down different issues like:"))),(0,i.yg)("ul",null,(0,i.yg)("li",{parentName:"ul"},"Incorrect current context"),(0,i.yg)("li",{parentName:"ul"},"Authentication failures"),(0,i.yg)("li",{parentName:"ul"},"Misconfigured namespaces"),(0,i.yg)("li",{parentName:"ul"},"Certificate problems"),(0,i.yg)("li",{parentName:"ul"},"User and role misconfigurations")),(0,i.yg)("p",null,"As you can see in the screenshot below, the command ",(0,i.yg)("inlineCode",{parentName:"p"},"kubectl config view")," provides a lot of details, including the server clusters, context, namespace, etc."),(0,i.yg)("div",{className:"centered-image"},(0,i.yg)("img",{src:"https://refine.ams3.cdn.digitaloceanspaces.com/blog/2024-01-05-kubectl-version/image7.png",alt:"kubectl config view"})),(0,i.yg)("h2",{id:"advanced-usage-of-kubectl-version"},"Advanced usage of ",(0,i.yg)("inlineCode",{parentName:"h2"},"kubectl version")),(0,i.yg)("h3",{id:"using-kubectl-version-with-different-output-formats-json-yaml"},"Using ",(0,i.yg)("inlineCode",{parentName:"h3"},"kubectl version")," with different output formats (JSON, YAML)"),(0,i.yg)("p",null,"You can use ",(0,i.yg)("inlineCode",{parentName:"p"},"kubectl")," to display the output in JSON and YAML; these formats are ideal for scripting and automation because they can be parsed and processed programmatically. Let's try both."),(0,i.yg)("h3",{id:"json-format"},"JSON format"),(0,i.yg)("p",null,"To get the version details in JSON format, use the command:\n",(0,i.yg)("inlineCode",{parentName:"p"},"kubectl version -o json")),(0,i.yg)("p",null,"This command will display detailed version information for both the client and the server (if connected to a Kubernetes cluster) in JSON format. See the screenshot below."),(0,i.yg)("div",{className:"centered-image"},(0,i.yg)("img",{src:"https://refine.ams3.cdn.digitaloceanspaces.com/blog/2024-01-05-kubectl-version/image8.png",alt:"kubectl version json"})),(0,i.yg)("h3",{id:"yaml-format"},"YAML format"),(0,i.yg)("p",null,"If you prefer YAML, which is often used in Kubernetes configurations, you can use the command:"),(0,i.yg)("p",null,(0,i.yg)("inlineCode",{parentName:"p"},"kubectl version -o yaml")),(0,i.yg)("p",null,"This will output the version information in YAML format, another structured and easy-to-read format that's widely used in Kubernetes environments. See the below screenshot for reference."),(0,i.yg)("div",{className:"centered-image"},(0,i.yg)("img",{src:"https://refine.ams3.cdn.digitaloceanspaces.com/blog/2024-01-05-kubectl-version/image9.png",alt:"kubectl version yaml"})),(0,i.yg)("h2",{id:"checking-version-without-a-kubernetes-cluster-offline-mode"},"Checking version without a Kubernetes cluster (offline mode)"),(0,i.yg)("p",null,"Checking the version of ",(0,i.yg)("inlineCode",{parentName:"p"},"kubectl")," without access to a Kubernetes cluster may be necessary at time. This helps in installations and troubleshooting."),(0,i.yg)("p",null,"To verify ",(0,i.yg)("inlineCode",{parentName:"p"},"kubectl")," version without connecting to a cluster, use the ",(0,i.yg)("inlineCode",{parentName:"p"},"--client")," flag:"),(0,i.yg)("p",null,(0,i.yg)("inlineCode",{parentName:"p"},"kubectl version --client")),(0,i.yg)("p",null,"This command only displays the ",(0,i.yg)("inlineCode",{parentName:"p"},"kubectl")," client version, requiring no active Kubernetes cluster connection. An example screenshot below:"),(0,i.yg)("div",{className:"centered-image"},(0,i.yg)("img",{src:"https://refine.ams3.cdn.digitaloceanspaces.com/blog/2024-01-05-kubectl-version/image10.png",alt:"kubectl version client only"})),(0,i.yg)("h2",{id:"conclusion"},"Conclusion"),(0,i.yg)("p",null,"Kubernetes developers use the ",(0,i.yg)("inlineCode",{parentName:"p"},"kubectl version")," command not just to check the version but to ensure client-server compatibility, troubleshoot, and streamline deployment as well. This command is a valuable tool for identifying any issues in your Kubernetes configuration and improving productivity."),(0,i.yg)("p",null,"You can use this command for installation preparation, cluster management, and environment compliance. In this article, we have gone through all the use cases that developers face during their day-to-day Kubernetes management. ",(0,i.yg)("inlineCode",{parentName:"p"},"Kubectl version")," is an under-utilized command that needs more attention, and developers need to keep it in hand to utilize it effectively."))}p.isMDXComponent=!0}}]);