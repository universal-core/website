"use strict";(self.webpackChunkdocumentation=self.webpackChunkdocumentation||[]).push([[36838],{36838:(e,t,r)=>{r.r(t),r.d(t,{SandpackNode:()=>ee});var n=r(8160),s=Object.create,i=Object.defineProperty,o=Object.getOwnPropertyDescriptor,a=Object.getOwnPropertyNames,c=Object.getPrototypeOf,d=Object.prototype.hasOwnProperty,l=(e,t)=>function(){return t||(0,e[a(e)[0]])((t={exports:{}}).exports,t),t.exports},h=(e,t,r)=>(r=null!=e?s(c(e)):{},((e,t,r,n)=>{if(t&&"object"==typeof t||"function"==typeof t)for(let s of a(t))d.call(e,s)||s===r||i(e,s,{get:()=>t[s],enumerable:!(n=o(t,s))||n.enumerable});return e})(!t&&e&&e.__esModule?r:i(r,"default",{value:e,enumerable:!0}),e)),u=(e,t,r)=>(((e,t,r)=>{t in e?i(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r})(e,"symbol"!=typeof t?t+"":t,r),r),p=(e,t,r)=>{if(!t.has(e))throw TypeError("Cannot "+r)},m=(e,t,r)=>(p(e,t,"read from private field"),r?r.call(e):t.get(e)),f=(e,t,r)=>{if(t.has(e))throw TypeError("Cannot add the same private member more than once");t instanceof WeakSet?t.add(e):t.set(e,r)},w=(e,t,r,n)=>(p(e,t,"write to private field"),n?n.call(e,r):t.set(e,r),r),v=(e,t,r)=>(p(e,t,"access private method"),r),y=l({"../../node_modules/.pnpm/cuid@2.1.8/node_modules/cuid/lib/pad.js"(e,t){t.exports=function(e,t){var r="000000000"+e;return r.substr(r.length-t)}}}),g=l({"../../node_modules/.pnpm/cuid@2.1.8/node_modules/cuid/lib/fingerprint.browser.js"(e,t){var r=y(),n="object"==typeof window?window:self,s=Object.keys(n).length,i=r(((navigator.mimeTypes?navigator.mimeTypes.length:0)+navigator.userAgent.length).toString(36)+s.toString(36),4);t.exports=function(){return i}}}),b=l({"../../node_modules/.pnpm/cuid@2.1.8/node_modules/cuid/lib/getRandomValue.browser.js"(e,t){var r,n,s="undefined"!=typeof window&&(window.crypto||window.msCrypto)||"undefined"!=typeof self&&self.crypto;s?(n=Math.pow(2,32)-1,r=function(){return Math.abs(s.getRandomValues(new Uint32Array(1))[0]/n)}):r=Math.random,t.exports=r}}),_=l({"../../node_modules/.pnpm/cuid@2.1.8/node_modules/cuid/index.js"(e,t){var r=g(),n=y(),s=b(),i=0,o=Math.pow(36,4);function a(){return n((s()*o|0).toString(36),4)}function c(){return i=i<o?i:0,++i-1}function d(){return"c"+(new Date).getTime().toString(36)+n(c().toString(36),4)+r()+(a()+a())}d.slug=function(){var e=(new Date).getTime().toString(36),t=c().toString(36).slice(-4),n=r().slice(0,1)+r().slice(-1),s=a().slice(-2);return e.slice(-2)+t+n+s},d.isCuid=function(e){return"string"==typeof e&&!!e.startsWith("c")},d.isSlug=function(e){if("string"!=typeof e)return!1;var t=e.length;return t>=7&&t<=10},d.fingerprint=r,t.exports=d}}),P=l({"../../node_modules/.pnpm/@open-draft+deferred-promise@2.1.0/node_modules/@open-draft/deferred-promise/build/createDeferredExecutor.js"(e){Object.defineProperty(e,"__esModule",{value:!0}),e.createDeferredExecutor=void 0,e.createDeferredExecutor=function(){const e=(t,r)=>{e.state="pending",e.resolve=r=>{if("pending"!==e.state)return;e.result=r;return t(r instanceof Promise?r:Promise.resolve(r).then((t=>(e.state="fulfilled",t))))},e.reject=t=>{if("pending"===e.state)return queueMicrotask((()=>{e.state="rejected"})),r(e.rejectionReason=t)}};return e}}}),E=l({"../../node_modules/.pnpm/@open-draft+deferred-promise@2.1.0/node_modules/@open-draft/deferred-promise/build/DeferredPromise.js"(e){Object.defineProperty(e,"__esModule",{value:!0}),e.DeferredPromise=void 0;var t=P();e.DeferredPromise=class extends Promise{#e;resolve;reject;constructor(e=null){const r=(0,t.createDeferredExecutor)();super(((t,n)=>{r(t,n),e?.(r.resolve,r.reject)})),this.#e=r,this.resolve=this.#e.resolve,this.reject=this.#e.reject}get state(){return this.#e.state}get rejectionReason(){return this.#e.rejectionReason}then(e,t){return this.#t(super.then(e,t))}catch(e){return this.#t(super.catch(e))}finally(e){return this.#t(super.finally(e))}#t(e){return Object.defineProperties(e,{resolve:{configurable:!0,value:this.resolve},reject:{configurable:!0,value:this.reject}})}}}}),S=l({"../../node_modules/.pnpm/@open-draft+deferred-promise@2.1.0/node_modules/@open-draft/deferred-promise/build/index.js"(e){var t=e&&e.__createBinding||(Object.create?function(e,t,r,n){void 0===n&&(n=r);var s=Object.getOwnPropertyDescriptor(t,r);s&&!("get"in s?!t.__esModule:s.writable||s.configurable)||(s={enumerable:!0,get:function(){return t[r]}}),Object.defineProperty(e,n,s)}:function(e,t,r,n){void 0===n&&(n=r),e[n]=t[r]}),r=e&&e.__exportStar||function(e,r){for(var n in e)"default"===n||Object.prototype.hasOwnProperty.call(r,n)||t(r,e,n)};Object.defineProperty(e,"__esModule",{value:!0}),r(P(),e),r(E(),e)}}),j=l({"../../node_modules/.pnpm/strict-event-emitter@0.4.3/node_modules/strict-event-emitter/lib/MemoryLeakError.js"(e){Object.defineProperty(e,"__esModule",{value:!0}),e.MemoryLeakError=void 0;var t=class extends Error{emitter;type;count;constructor(e,t,r){super(`Possible EventEmitter memory leak detected. ${r} ${t.toString()} listeners added. Use emitter.setMaxListeners() to increase limit`),this.emitter=e,this.type=t,this.count=r,this.name="MaxListenersExceededWarning"}};e.MemoryLeakError=t}}),k=l({"../../node_modules/.pnpm/strict-event-emitter@0.4.3/node_modules/strict-event-emitter/lib/Emitter.js"(e){Object.defineProperty(e,"__esModule",{value:!0}),e.Emitter=void 0;var t,r,n,s,i,o,a,c,d,l,h,p=j(),y=class{constructor(){f(this,s),f(this,o),f(this,c),f(this,l),f(this,t,void 0),f(this,r,void 0),f(this,n,void 0),w(this,t,new Map),w(this,r,y.defaultMaxListeners),w(this,n,!1)}static listenerCount(e,t){return e.listenerCount(t)}setMaxListeners(e){return w(this,r,e),this}getMaxListeners(){return m(this,r)}eventNames(){return Array.from(m(this,t).keys())}emit(e,...t){const r=v(this,s,i).call(this,e);return r.forEach((e=>{e.apply(this,t)})),r.length>0}addListener(e,o){v(this,l,h).call(this,"newListener",e,o);const a=v(this,s,i).call(this,e).concat(o);if(m(this,t).set(e,a),m(this,r)>0&&this.listenerCount(e)>m(this,r)&&!m(this,n)){w(this,n,!0);const t=new p.MemoryLeakError(this,e,this.listenerCount(e));console.warn(t)}return this}on(e,t){return this.addListener(e,t)}once(e,t){return this.addListener(e,v(this,c,d).call(this,e,t))}prependListener(e,r){const n=v(this,s,i).call(this,e);if(n.length>0){const s=[r].concat(n);m(this,t).set(e,s)}else m(this,t).set(e,n.concat(r));return this}prependOnceListener(e,t){return this.prependListener(e,v(this,c,d).call(this,e,t))}removeListener(e,r){const n=v(this,s,i).call(this,e);return n.length>0&&(v(this,o,a).call(this,n,r),m(this,t).set(e,n),v(this,l,h).call(this,"removeListener",e,r)),this}off(e,t){return this.removeListener(e,t)}removeAllListeners(e){return e?m(this,t).delete(e):m(this,t).clear(),this}listeners(e){return Array.from(v(this,s,i).call(this,e))}listenerCount(e){return v(this,s,i).call(this,e).length}rawListeners(e){return this.listeners(e)}},g=y;t=new WeakMap,r=new WeakMap,n=new WeakMap,s=new WeakSet,i=function(e){return m(this,t).get(e)||[]},o=new WeakSet,a=function(e,t){const r=e.indexOf(t);return r>-1&&e.splice(r,1),[]},c=new WeakSet,d=function(e,t){const r=(...n)=>{this.removeListener(e,r),t.apply(this,n)};return r},l=new WeakSet,h=function(e,t,r){this.emit(e,t,r)},u(g,"defaultMaxListeners",10),e.Emitter=g}}),I=l({"../../node_modules/.pnpm/strict-event-emitter@0.4.3/node_modules/strict-event-emitter/lib/index.js"(e){var t=e&&e.__createBinding||(Object.create?function(e,t,r,n){void 0===n&&(n=r);var s=Object.getOwnPropertyDescriptor(t,r);s&&!("get"in s?!t.__esModule:s.writable||s.configurable)||(s={enumerable:!0,get:function(){return t[r]}}),Object.defineProperty(e,n,s)}:function(e,t,r,n){void 0===n&&(n=r),e[n]=t[r]}),r=e&&e.__exportStar||function(e,r){for(var n in e)"default"===n||Object.prototype.hasOwnProperty.call(r,n)||t(r,e,n)};Object.defineProperty(e,"__esModule",{value:!0}),r(k(),e),r(j(),e)}}),L=h(_()),x=/(%?)(%([sdjo]))/g;function C(e,...t){if(0===t.length)return e;let r=0,n=e.replace(x,((e,n,s,i)=>{const o=function(e,t){switch(t){case"s":return e;case"d":case"i":return Number(e);case"j":return JSON.stringify(e);case"o":{if("string"==typeof e)return e;const t=JSON.stringify(e);return"{}"===t||"[]"===t||/^\[object .+?\]$/.test(t)?e:t}}}(t[r],i);return n?e:(r++,o)}));return r<t.length&&(n+=` ${t.slice(r).join(" ")}`),n=n.replace(/%{2,2}/g,"%"),n}var M=class extends Error{constructor(e,...t){super(e),this.message=e,this.name="Invariant Violation",this.message=C(e,...t),function(e){if(!e.stack)return;const t=e.stack.split("\n");t.splice(1,2),e.stack=t.join("\n")}(this)}},F=(e,t,...r)=>{if(!e)throw new M(t,...r)};F.as=(e,t,r,...n)=>{if(!t){throw null!=e.prototype.name?new e(C(r,n)):e(C(r,n))}};var O=h(S()),D=window.localStorage.CSB_EMULATOR_DEBUG,A="\x1b[36;1m",U={preview:"\x1b[33;1m",emulator:"\x1b[35;1m",runtime:A,bridge:"\x1b[34m","runtime:worker":A};function T(e){return function(t,...r){if("true"===D){const n=()=>t.includes("sender")?"\x1b[32;1msender":t.includes("receiver")?"\x1b[31mreceiver":"",s=t.replace(/\[.+\]:/,"");console.debug(`${U[e]}${e}:${n()}\x1b[0m:${s}`,...r)}}}var R=T("emulator"),W=class{constructor(e){this.target=e,this.emitter=new EventTarget,this.channel=new MessageChannel,this.receiverPort=this.channel.port1;const t=new O.DeferredPromise,r=e=>{"internal/ready"===e.data.type&&(R("[message-sender]: runtime is ready"),t.resolve())};window.addEventListener("message",r),t.then((()=>{window.removeEventListener("message",r)})),this.receiverReadyPromise=t,this.receiverPort.onmessage=e=>{const t=e.data;null!=t.type&&(R('[message-sender]: emitting "%s" event...',t.type,t.payload),this.emitter.dispatchEvent(new MessageEvent(t.type,{data:t.payload})))}}emitter;channel;receiverPort;receiverReadyPromise;async handshake(){const e=new O.DeferredPromise;await this.receiverReadyPromise,R("[message-sender]: sending handshake"),this.target.postMessage({type:"internal/handshake"},"*",[this.channel.port2]),this.on("internal/handshake/done",(()=>{e.resolve(),clearTimeout(t)}));const t=setTimeout((()=>{e.reject(new Error("MessageSender: Handshake timeout"))}),5e3);return e}on(e,t,r){R('[message-sender]: add listener "%s"',e),this.emitter.addEventListener(e,(e=>{e instanceof MessageEvent&&t(e)}),r)}off(e,t,r){this.emitter.removeEventListener(e,t,r)}async send(e,...t){const r=new O.DeferredPromise,n=(0,L.default)(),s=t[0]||{};R('[message-sender]: send "%s" (%s)',e,n,s),this.receiverPort.postMessage({type:e,payload:{operationId:n,payload:s}}),R('[message-sender]: adding done listener for "%s" (%s)',e,n);const i=t=>{const{data:s}=t;if(s.operationId===n){const t=s.listenerPayload||{};R('[message-sender]: resolving "%s (%s) promise!',e,n),r.resolve({...t,operationId:s.operationId})}},o=t=>{const{data:s}=t;s.operationId===n&&(R('[message-sender]: rejecting "%s (%s) promise!',e,n),r.reject(s.error))};return this.on("internal/operation/done",i),this.on("internal/operation/failed",o),r.finally((()=>{this.emitter.removeEventListener("internal/operation/done",i),this.emitter.removeEventListener("internal/operation/failed",o)}))}},N=h(S()),$=h(_()),H=class{constructor(e){this.channel=e}async init(e){await this.channel.send("fs/init",{files:e})}async readFile(e,t){const r=await this.channel.send("fs/readFile",{path:e,encoding:t}).catch((t=>{throw new Error(C('Failed to read file at path "%s"',e),{cause:t})}));if(!r)throw new Error("File not found");return r.data}async writeFile(e,t,r){let n,s=!1;"object"==typeof r?(n=r.encoding,s=!!r.recursive):"string"==typeof r&&(n=r),await this.channel.send("fs/writeFile",{path:e,content:t,encoding:n,recursive:s}).catch((t=>{throw new Error(C('Failed to write file at path "%s"',e),{cause:t})}))}async readdir(e){const t=await this.channel.send("fs/readdir",{path:e}).catch((t=>{throw new Error(C('Failed to read directory at path "%s"',e),{cause:t})}));if(!t)throw new Error("Directory not found");return t.data}async mkdir(e,t){const r=!!t?.recursive;await this.channel.send("fs/mkdir",{path:e,recursive:r}).catch((t=>{throw new Error(C('Failed to make directory at path "%s"',e),{cause:t})}))}async stat(e){const t=await this.channel.send("fs/stat",{path:e}).catch((t=>{throw new Error(C('Failed to stat file at path "%s"',e),{cause:t})}));if(!t)throw new Error("File not found");return t.data}async rm(e,t){const{force:r,recursive:n}=t||{};await this.channel.send("fs/rm",{path:e,force:r,recursive:n}).catch((t=>{throw new Error(C('Failed to remove file at path "%s"',e),{cause:t})}))}async watch(e,t,r){const n=(0,$.default)();return await this.channel.send("fs/watch",{watcherId:n,includes:e,excludes:t}),this.channel.on("fs/watch-event",(({data:e})=>{if(e.watcherId===n&&r){const t={...e};delete t.watcherId,r(t)}})),{dispose:()=>this.channel.send("fs/unwatch",{watcherId:n})}}},B=h(I()),V=class{constructor(e){this.channel=e}create(){return new z(this.channel)}},z=class{constructor(e){this.channel=e,this.state="running",this.stdout=new B.Emitter,this.stderr=new B.Emitter,this.stdin={write:e=>{if(!this.id)throw new Error("Failed to write to stdin, no process is currently running");return this.channel.send("shell/stdin",{data:e,workerId:this.id})}},this.forwardStdEvents()}id;state;stdout;stderr;stdin;forwardStdEvents(){this.channel.on("worker/tty",(e=>{const{data:t}=e;if(t.workerId===this.id)switch(t.payload.type){case"out":this.stdout.emit("data",t.payload.data);break;case"err":this.stderr.emit("data",t.payload.data)}}))}async runCommand(e,t,r={}){F(!this.id,'Failed to run "runCommand" on a ShellProcess: there is already a process running.');const n=await this.channel.send("shell/runCommand",{command:e,args:t,options:r});return F(n,'Failed to run "runCommand" on a ShellProcess: was not able to retrieve a running process.'),this.id=n.id,this.state="running",n}async on(e,t){switch(e){case"progress":return void this.channel.on("worker/progress",(({data:e})=>{t(e.status)}));case"exit":return void this.channel.on("worker/exit",(({data:e})=>{e.workerId===this.id&&t(e.exitCode,e.error)}))}}async kill(){F(this.id,'Failed to run "kill" on a ShellProcess: there is no process running. Did you forget to run it?'),this.state="idle",await this.channel.send("shell/exit",{id:this.id}).catch((e=>{throw new Error(C('Failed to kill shell with ID "%s"',this.id),{cause:e})})),this.id=void 0}},J=h(S()),q=class{constructor(e){this.channel=e}async waitFor(e,t,r=2e4){const n=new J.DeferredPromise,s=setTimeout((()=>{n.reject()}),r),i=await this.channel.send("preview/get/info",e).catch((t=>{n.reject(new Error(C('Failed to look up preview information for shell ID "%s" (port: %d)',e.sourceShellId,e.port)))})),o=i&&t(i);return o&&n.resolve({url:i.url,port:i.port,sourceShellId:i.sourceShellId}),this.channel.on("preview/port/ready",(({data:e})=>{!o&&t(e)&&n.resolve({url:e.url,port:e.port,sourceShellId:e.sourceShellId})})),n.finally((()=>{clearTimeout(s)}))}async getByShellId(e,t){return this.waitFor({sourceShellId:e},(t=>t.sourceShellId===e),t).catch((t=>{throw new Error(C('Failed to get shell by ID "%s"',e),{cause:t})}))}async waitForPort(e,t){return this.waitFor({port:e},(t=>t.port===e),t).catch((t=>{throw new Error(C("Failed to await port %d",e),{cause:t})}))}},G=T("emulator"),K=class{constructor(e){this.options=e,F(this.options.iframe,'Failed to create a Nodebox: expected "iframe" argument to be a reference to an <iframe> element but got %j',this.options.iframe),this.url=this.options.runtimeUrl||"https://nodebox-runtime.codesandbox.io",this.isConnected=!1}channel=null;isConnected;url;fileSystemApi=null;shellApi=null;previewApi=null;async connect(){const{iframe:e,cdnUrl:t}=this.options;G("[message-sender]: Connecting to node emulator...");const r=new N.DeferredPromise;this.url||r.reject(new Error("Nodebox URL is missing. Did you forget to provide it when creating this Nodebox instance?")),F(e.contentWindow,"Failed to create a MessageChannel with the Nodebox iframe: no content window found"),this.channel=new W(e.contentWindow);const n=new N.DeferredPromise;return e.setAttribute("src",this.url),e.addEventListener("load",(()=>{n.resolve()}),{once:!0}),e.addEventListener("error",(e=>{n.reject(e.error)}),{once:!0}),await n,G("[message-sender]: IFrame loaded..."),await this.channel.handshake(),G("[message-sender]: Handshake completed..."),this.channel.send("connect",{cdnUrl:t}),this.channel.on("runtime/ready",(()=>{r.resolve()})),r.then((()=>{G("[message-sender]: Connected to runtime..."),this.isConnected=!0}))}get fs(){return F(this.isConnected,'Failed to access the File System API: consumer is not connected. Did you forget to run "connect()"?'),this.fileSystemApi||(this.fileSystemApi=new H(this.channel)),this.fileSystemApi}get shell(){return F(this.isConnected,'Failed to access the Shell API: consumer is not connected. Did you forget to run "connect()"?'),this.shellApi||(this.shellApi=new V(this.channel)),this.shellApi}get preview(){return F(this.isConnected,'Failed to access the Preview API: consumer is not connected. Did you forget to run "connect()"?'),this.previewApi||(this.previewApi=new q(this.channel)),this.previewApi}},Q=r(29271),X=r(77577);r(31282),r(96131);function Y(e,t){return(0,n._)(this,void 0,void 0,(function(){var r,s,i;return(0,n.a)(this,(function(o){return r=e.contentWindow,(0,n.n)(r,"Failed to await preview iframe: no content window found"),9e4,20,s=0,[2,new Promise((function(r,o){var a=function(){var c=function(){clearTimeout(i),s=20,r(),e.removeEventListener("load",c)};s>=20?o((0,n.c)("Could not able to connect to preview.")):(e.setAttribute("src",t),i=setTimeout((function(){a(),e.removeEventListener("load",c)}),9e4),s+=1,e.addEventListener("load",c))};e.addEventListener("error",(function(){return o(new Error("Iframe error"))})),e.addEventListener("abort",(function(){return o(new Error("Aborted"))})),a()}))]}))}))}var Z=[{code:function(e){var t=e.scope,r=window.history.__proto__,n=[],s=0,i=function(e){parent.postMessage({type:"urlchange",url:e,back:s>0,forward:s<n.length-1,channelId:t.channelId},"*")};Object.assign(window.history,{go:function(e){var t=s+e;if(t>=0&&t<=n.length-1){var o=n[s=t],a=o.url,c=o.state;r.replaceState.call(window.history,c,"",a);var d=document.location.href;i(d),window.dispatchEvent(new PopStateEvent("popstate",{state:c}))}},back:function(){window.history.go(-1)},forward:function(){window.history.go(1)},pushState:function(e,t,o){r.replaceState.call(window.history,e,t,o),function(e,t){n.splice(s+1),n.push({url:e,state:t}),s=n.length-1}(o,e),i(document.location.href)},replaceState:function(e,t,o){r.replaceState.call(window.history,e,t,o),n[s]={state:e,url:o},i(document.location.href)}}),window.addEventListener("message",(function(e){var t=e.data;"urlback"===t.type?history.back():"urlforward"===t.type?history.forward():"refresh"===t.type&&document.location.reload()}))}.toString(),id:"historyListener"},{code:"function consoleHook({ scope }) {"+X.c+"\n};",id:"consoleHook"},{code:function(e){var t,r=e.scope,n=0;function s(){var e=function(){if("undefined"==typeof window)return 0;var e=document.body,t=document.documentElement;return Math.max(e.scrollHeight,e.offsetHeight,t.offsetHeight)}();n!==e&&window.parent.postMessage({type:"resize",height:e,codesandbox:!0,channelId:r.channelId},"*"),n=e}s(),new MutationObserver((function(){void 0===t&&(s(),t=setTimeout((function(){t=void 0}),300))})).observe(document,{attributes:!0,childList:!0,subtree:!0}),setInterval(s,300)}.toString(),id:"watchResize"}],ee=function(e){function t(t,r,s){void 0===s&&(s={});var i=e.call(this,t,r,(0,n.h)((0,n.h)({},s),{bundlerURL:s.bundlerURL}))||this;return i._modulesCache=new Map,i.messageChannelId=(0,X.g)(),i._initPromise=null,i.emitter=new X.E,i.manageIframes(t),i.emulator=new K({iframe:i.emulatorIframe,runtimeUrl:i.options.bundlerURL}),i.updateSandbox(r),i}return(0,n.g)(t,e),t.prototype._init=function(e){return(0,n._)(this,void 0,void 0,(function(){return(0,n.a)(this,(function(t){switch(t.label){case 0:return[4,this.emulator.connect()];case 1:return t.sent(),[4,this.emulator.fs.init(e)];case 2:return t.sent(),[4,this.globalListeners()];case 3:return t.sent(),[2]}}))}))},t.prototype.compile=function(e){return(0,n._)(this,void 0,void 0,(function(){var t,r;return(0,n.a)(this,(function(n){switch(n.label){case 0:return n.trys.push([0,5,,6]),this.status="initializing",this.dispatch({type:"start",firstLoad:!0}),this._initPromise||(this._initPromise=this._init(e)),[4,this._initPromise];case 1:return n.sent(),this.dispatch({type:"connected"}),[4,this.createShellProcessFromTask(e)];case 2:return t=n.sent().id,[4,this.createPreviewURLFromId(t)];case 3:return n.sent(),[4,this.setLocationURLIntoIFrame()];case 4:return n.sent(),this.dispatchDoneMessage(),[3,6];case 5:return r=n.sent(),this.dispatch({type:"action",action:"notification",notificationType:"error",title:(0,X.a)(r)}),this.dispatch({type:"done",compilatonError:!0}),[3,6];case 6:return[2]}}))}))},t.prototype.createShellProcessFromTask=function(e){return(0,n._)(this,void 0,void 0,(function(){var t,r,s=this;return(0,n.a)(this,(function(i){switch(i.label){case 0:return t=(0,X.r)(e["/package.json"]),this.emulatorCommand=(0,X.b)(t),this.emulatorShellProcess=this.emulator.shell.create(),[4,this.emulatorShellProcess.on("exit",(function(e){s.dispatch({type:"action",action:"notification",notificationType:"error",title:(0,n.c)("Error: process.exit(".concat(e,") called."))})}))];case 1:return i.sent(),[4,this.emulatorShellProcess.on("progress",(function(e){var t,r;if("command_running"===e.state||"starting_command"===e.state)return s.dispatch({type:"shell/progress",data:(0,n.h)((0,n.h)({},e),{command:[null===(t=s.emulatorCommand)||void 0===t?void 0:t[0],null===(r=s.emulatorCommand)||void 0===r?void 0:r[1].join(" ")].join(" ")})}),void(s.status="installing-dependencies");s.dispatch({type:"shell/progress",data:e})}))];case 2:return i.sent(),this.emulatorShellProcess.stdout.on("data",(function(e){s.dispatch({type:"stdout",payload:{data:e,type:"out"}})})),this.emulatorShellProcess.stderr.on("data",(function(e){s.dispatch({type:"stdout",payload:{data:e,type:"err"}})})),[4,(r=this.emulatorShellProcess).runCommand.apply(r,this.emulatorCommand)];case 3:return[2,i.sent()]}}))}))},t.prototype.createPreviewURLFromId=function(e){var t;return(0,n._)(this,void 0,void 0,(function(){var r;return(0,n.a)(this,(function(n){switch(n.label){case 0:return this.iframePreviewUrl=void 0,[4,this.emulator.preview.getByShellId(e)];case 1:return r=n.sent().url,this.iframePreviewUrl=r+(null!==(t=this.options.startRoute)&&void 0!==t?t:""),[2]}}))}))},t.prototype.manageIframes=function(e){var t,r,s;if("string"==typeof e){var i=document.querySelector(e);(0,n.n)(i,"The element '".concat(e,"' was not found")),this.iframe=document.createElement("iframe"),null==i||i.appendChild(this.iframe)}else this.iframe=e;r=this.iframe,s=this.options,r.style.border="0",r.style.width=s.width||"100%",r.style.height=s.height||"100%",r.style.overflow="hidden",r.allow="cross-origin-isolated",(0,n.n)(this.iframe.parentNode,"The given iframe does not have a parent."),this.emulatorIframe=document.createElement("iframe"),this.emulatorIframe.classList.add("sp-bridge-frame"),null===(t=this.iframe.parentNode)||void 0===t||t.appendChild(this.emulatorIframe)},t.prototype.setLocationURLIntoIFrame=function(){return(0,n._)(this,void 0,void 0,(function(){return(0,n.a)(this,(function(e){switch(e.label){case 0:return this.iframePreviewUrl?[4,Y(this.iframe,this.iframePreviewUrl)]:[3,2];case 1:e.sent(),e.label=2;case 2:return[2]}}))}))},t.prototype.dispatchDoneMessage=function(){this.status="done",this.dispatch({type:"done",compilatonError:!1}),this.iframePreviewUrl&&this.dispatch({type:"urlchange",url:this.iframePreviewUrl,back:!1,forward:!1})},t.prototype.globalListeners=function(){return(0,n._)(this,void 0,void 0,(function(){var e=this;return(0,n.a)(this,(function(t){switch(t.label){case 0:return window.addEventListener("message",(function(t){var r,n;"PREVIEW_LOADED"===t.data.type&&(r=e.iframe,n=e.messageChannelId,Z.forEach((function(e){var t,s=e.code,i={uid:e.id,type:"INJECT_AND_INVOKE",code:"exports.activate = ".concat(s),scope:{channelId:n}};null===(t=r.contentWindow)||void 0===t||t.postMessage(i,"*")}))),"urlchange"===t.data.type&&t.data.channelId===e.messageChannelId?e.dispatch({type:"urlchange",url:t.data.url,back:t.data.back,forward:t.data.forward}):t.data.channelId===e.messageChannelId&&e.dispatch(t.data)})),[4,this.emulator.fs.watch(["*"],[".next","node_modules","build","dist","vendor",".config",".vuepress"],(function(t){return(0,n._)(e,void 0,void 0,(function(){var e,r,s,i,o;return(0,n.a)(this,(function(n){switch(n.label){case 0:return t?(r="newPath"in(e=t)?e.newPath:"path"in e?e.path:"",[4,this.emulator.fs.stat(r)]):[2];case 1:if("file"!==n.sent().type)return[2,null];n.label=2;case 2:switch(n.trys.push([2,10,,11]),e.type){case"change":case"create":return[3,3];case"remove":return[3,5];case"rename":return[3,6];case"close":return[3,8]}return[3,9];case 3:return[4,this.emulator.fs.readFile(e.path,"utf8")];case 4:return s=n.sent(),this.dispatch({type:"fs/change",path:e.path,content:s}),this._modulesCache.set(e.path,(0,X.w)(s)),[3,9];case 5:return this.dispatch({type:"fs/remove",path:e.path}),this._modulesCache.delete(e.path),[3,9];case 6:return this.dispatch({type:"fs/remove",path:e.oldPath}),this._modulesCache.delete(e.oldPath),[4,this.emulator.fs.readFile(e.newPath,"utf8")];case 7:return i=n.sent(),this.dispatch({type:"fs/change",path:e.newPath,content:i}),this._modulesCache.set(e.newPath,(0,X.w)(i)),[3,9];case 8:return[3,9];case 9:return[3,11];case 10:return o=n.sent(),this.dispatch({type:"action",action:"notification",notificationType:"error",title:(0,X.a)(o)}),[3,11];case 11:return[2]}}))}))}))];case 1:return t.sent(),[2]}}))}))},t.prototype.restartShellProcess=function(){var e;return(0,n._)(this,void 0,void 0,(function(){return(0,n.a)(this,(function(t){switch(t.label){case 0:return this.emulatorShellProcess&&this.emulatorCommand?(this.dispatch({type:"start",firstLoad:!0}),this.status="initializing",[4,this.emulatorShellProcess.kill()]):[3,3];case 1:return t.sent(),null===(e=this.iframe)||void 0===e||e.removeAttribute("attr"),this.emulator.fs.rm("/node_modules/.vite",{recursive:!0,force:!0}),[4,this.compile(Object.fromEntries(this._modulesCache))];case 2:t.sent(),t.label=3;case 3:return[2]}}))}))},t.prototype.updateSandbox=function(e){var t,r=this,n=(0,X.f)(e.files);"running"!==(null===(t=this.emulatorShellProcess)||void 0===t?void 0:t.state)?(this.dispatch({codesandbox:!0,modules:n,template:e.template,type:"compile"}),Object.entries(n).forEach((function(e){var t=e[0],n=e[1];r._modulesCache.set(t,(0,X.w)(n))}))):Object.entries(n).forEach((function(e){var t=e[0],n=e[1];r._modulesCache.get(t)&&(0,X.r)(n)===(0,X.r)(r._modulesCache.get(t))||r.emulator.fs.writeFile(t,n,{recursive:!0})}))},t.prototype.dispatch=function(e){var t,r;return(0,n._)(this,void 0,void 0,(function(){return(0,n.a)(this,(function(n){switch(n.label){case 0:switch(e.type){case"compile":return[3,1];case"refresh":return[3,2];case"urlback":case"urlforward":return[3,4];case"shell/restart":return[3,5];case"shell/openPreview":return[3,6]}return[3,7];case 1:return this.compile(e.modules),[3,8];case 2:return[4,this.setLocationURLIntoIFrame()];case 3:return n.sent(),[3,8];case 4:return null===(r=null===(t=this.iframe)||void 0===t?void 0:t.contentWindow)||void 0===r||r.postMessage(e,"*"),[3,8];case 5:return this.restartShellProcess(),[3,8];case 6:return window.open(this.iframePreviewUrl,"_blank"),[3,8];case 7:this.emitter.dispatch(e),n.label=8;case 8:return[2]}}))}))},t.prototype.listen=function(e){return this.emitter.listener(e)},t.prototype.destroy=function(){this.emulatorIframe.remove(),this.emitter.cleanup()},t}(Q.S)}}]);