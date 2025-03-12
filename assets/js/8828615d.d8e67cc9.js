"use strict";(self.webpackChunkdocumentation=self.webpackChunkdocumentation||[]).push([[50605],{58860:(e,n,a)=>{a.d(n,{xA:()=>p,yg:()=>d});var i=a(37953);function t(e,n,a){return n in e?Object.defineProperty(e,n,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[n]=a,e}function r(e,n){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);n&&(i=i.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),a.push.apply(a,i)}return a}function o(e){for(var n=1;n<arguments.length;n++){var a=null!=arguments[n]?arguments[n]:{};n%2?r(Object(a),!0).forEach((function(n){t(e,n,a[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):r(Object(a)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(a,n))}))}return e}function l(e,n){if(null==e)return{};var a,i,t=function(e,n){if(null==e)return{};var a,i,t={},r=Object.keys(e);for(i=0;i<r.length;i++)a=r[i],n.indexOf(a)>=0||(t[a]=e[a]);return t}(e,n);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(i=0;i<r.length;i++)a=r[i],n.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(t[a]=e[a])}return t}var s=i.createContext({}),g=function(e){var n=i.useContext(s),a=n;return e&&(a="function"==typeof e?e(n):o(o({},n),e)),a},p=function(e){var n=g(e.components);return i.createElement(s.Provider,{value:n},e.children)},m="mdxType",u={inlineCode:"code",wrapper:function(e){var n=e.children;return i.createElement(i.Fragment,{},n)}},y=i.forwardRef((function(e,n){var a=e.components,t=e.mdxType,r=e.originalType,s=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),m=g(a),y=t,d=m["".concat(s,".").concat(y)]||m[y]||u[y]||r;return a?i.createElement(d,o(o({ref:n},p),{},{components:a})):i.createElement(d,o({ref:n},p))}));function d(e,n){var a=arguments,t=n&&n.mdxType;if("string"==typeof e||t){var r=a.length,o=new Array(r);o[0]=y;var l={};for(var s in n)hasOwnProperty.call(n,s)&&(l[s]=n[s]);l.originalType=e,l[m]="string"==typeof e?e:t,o[1]=l;for(var g=2;g<r;g++)o[g]=a[g];return i.createElement.apply(null,o)}return i.createElement.apply(null,a)}y.displayName="MDXCreateElement"},49593:(e,n,a)=>{a.r(n),a.d(n,{assets:()=>p,contentTitle:()=>s,default:()=>_,frontMatter:()=>l,metadata:()=>g,toc:()=>m});a(37953);var i=a(58860);function t(e,n,a){return n in e?Object.defineProperty(e,n,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[n]=a,e}function r(e,n){return n=null!=n?n:{},Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):function(e,n){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);n&&(i=i.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),a.push.apply(a,i)}return a}(Object(n)).forEach((function(a){Object.defineProperty(e,a,Object.getOwnPropertyDescriptor(n,a))})),e}function o(e,n){if(null==e)return{};var a,i,t=function(e,n){if(null==e)return{};var a,i,t={},r=Object.keys(e);for(i=0;i<r.length;i++)a=r[i],n.indexOf(a)>=0||(t[a]=e[a]);return t}(e,n);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(i=0;i<r.length;i++)a=r[i],n.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(t[a]=e[a])}return t}const l={title:"Wiki Configuration",displayed_sidebar:"mainSidebar"},s="Wiki Configuration and Localization Documentation",g={unversionedId:"wiki/configuration",id:"wiki/configuration",title:"Wiki Configuration",description:"This documentation explains how the Wiki configuration file and the localization file work together.",source:"@site/docs/wiki/configuration.md",sourceDirName:"wiki",slug:"/wiki/configuration",permalink:"/docs/wiki/configuration",draft:!1,editUrl:"https://github.com/refinedev/refine/tree/master/documentation/docs/wiki/configuration.md",tags:[],version:"current",lastUpdatedBy:"Matteo Roggia",lastUpdatedAt:1741814802,formattedLastUpdatedAt:"Mar 12, 2025",frontMatter:{title:"Wiki Configuration",displayed_sidebar:"mainSidebar"},sidebar:"mainSidebar",previous:{title:"Wiki Component Tags",permalink:"/docs/wiki/ui-components"},next:{title:"Wiki Url Format",permalink:"/docs/wiki/url"}},p={},m=[{value:"What is YAML and Common Pitfalls",id:"what-is-yaml-and-common-pitfalls",level:2},{value:"How Configuration Binds with Localization",id:"how-configuration-binds-with-localization",level:2},{value:"File Locations",id:"file-locations",level:2},{value:"Range Expansion",id:"range-expansion",level:2},{value:"config.yaml",id:"configyaml",level:2},{value:"PACKED_QUERY",id:"packed_query",level:3},{value:"ITEM_ORIGIN_LOCALE_MAPPING &amp; MOB_ORIGIN_LOCALE_MAPPING",id:"item_origin_locale_mapping--mob_origin_locale_mapping",level:3},{value:"QUEST_NAMES, RAID_NAMES, DUNGEON_NAMES, MAP_INFO",id:"quest_names-raid_names-dungeon_names-map_info",level:3},{value:"QUEST_NAMES",id:"quest_names",level:4},{value:"RAID_NAMES",id:"raid_names",level:4},{value:"DUNGEON_NAMES",id:"dungeon_names",level:4},{value:"MAP_INFO",id:"map_info",level:4},{value:"WIKI_CATEGORIES",id:"wiki_categories",level:3},{value:"INDEXED_PAGES",id:"indexed_pages",level:3},{value:"SEARCH_RESULT_CATEGORY",id:"search_result_category",level:3},{value:"whitelists.yaml",id:"whitelistsyaml",level:2},{value:"ITEM/MOB Whitelists",id:"itemmob-whitelists",level:2}],u=(y="DocThumbsUpDownFeedbackWidget",function(e){return console.warn("Component "+y+" was not imported, exported, or provided by MDXProvider as global scope"),(0,i.yg)("div",e)});var y;const d={toc:m},c="wrapper";function _(e){var{components:n}=e,a=o(e,["components"]);return(0,i.yg)(c,r(function(e){for(var n=1;n<arguments.length;n++){var a=null!=arguments[n]?arguments[n]:{},i=Object.keys(a);"function"==typeof Object.getOwnPropertySymbols&&(i=i.concat(Object.getOwnPropertySymbols(a).filter((function(e){return Object.getOwnPropertyDescriptor(a,e).enumerable})))),i.forEach((function(n){t(e,n,a[n])}))}return e}({},d,a),{components:n,mdxType:"MDXLayout"}),(0,i.yg)("h1",{id:"wiki-configuration-and-localization-documentation"},"Wiki Configuration and Localization Documentation"),(0,i.yg)("p",null,"This documentation explains how the Wiki configuration file and the localization file work together.",(0,i.yg)("br",{parentName:"p"}),"\n","Each section includes detailed explanations and complete examples to help you understand how to customize and maintain your Wiki."),(0,i.yg)("h2",{id:"what-is-yaml-and-common-pitfalls"},"What is YAML and Common Pitfalls"),(0,i.yg)(u,{id:"what-is-yaml-and-common-pitfalls",mdxType:"DocThumbsUpDownFeedbackWidget"},(0,i.yg)("p",null,"YAML is a human-friendly data serialization language commonly used for configuration files. Its are readability and ease of editing lead the choice of using it as gonfiguration language instead of ",(0,i.yg)("inlineCode",{parentName:"p"},"json"),", but it has some pitfalls:"),(0,i.yg)("ul",null,(0,i.yg)("li",{parentName:"ul"},(0,i.yg)("strong",{parentName:"li"},"Indentation Matters:")," YAML relies on correct indentation using spaces. Mixing tabs and spaces or using inconsistent indentation can lead to parsing errors."),(0,i.yg)("li",{parentName:"ul"},(0,i.yg)("strong",{parentName:"li"},"Data Structure Sensitivity:")," The structure (lists and dictionaries) depends entirely on indentation. A small mistake can change the hierarchy of your data."),(0,i.yg)("li",{parentName:"ul"},(0,i.yg)("strong",{parentName:"li"},"Quotes and Special Characters:")," Use quotes when needed, but be consistent. Improper quoting may cause errors or misinterpretation of values.")),(0,i.yg)("p",null,(0,i.yg)("em",{parentName:"p"},"Example of correct YAML syntax:")),(0,i.yg)("pre",null,(0,i.yg)("code",{parentName:"pre",className:"language-yaml"},"PACKED_QUERY:\n  NEW_FILTER: [101, 102, 103, 104]\n")),(0,i.yg)("p",null,"Ensure every nested level is indented equally (usually 2 spaces) and avoid tabs.")),(0,i.yg)("h2",{id:"how-configuration-binds-with-localization"},"How Configuration Binds with Localization"),(0,i.yg)(u,{id:"how-configuration-binds-with-localization",mdxType:"DocThumbsUpDownFeedbackWidget"},(0,i.yg)("p",null,"The configuration file (",(0,i.yg)("inlineCode",{parentName:"p"},"config.yaml"),") uses keys that map directly to entries in the localization file (",(0,i.yg)("inlineCode",{parentName:"p"},"locale.json"),"). The keys use dot notation to indicate hierarchy. For example, the locale key ",(0,i.yg)("inlineCode",{parentName:"p"},'"items.origin.fishing"')," in the configuration corresponds to a nested entry in the localization file"),(0,i.yg)("p",null,(0,i.yg)("em",{parentName:"p"},"Example:"),"\nFor example ",(0,i.yg)("inlineCode",{parentName:"p"},'"items.origin.fishing"')," key will select the string associated to the below locale tree"),(0,i.yg)("pre",null,(0,i.yg)("code",{parentName:"pre",className:"language-json"},'{\n    "items": {\n        "origin": {\n            "fishing": "Obtanable fishing"\n        }\n    }\n}\n'))),(0,i.yg)("h2",{id:"file-locations"},"File Locations"),(0,i.yg)(u,{id:"file-locations",mdxType:"DocThumbsUpDownFeedbackWidget"},(0,i.yg)("p",null,"All configuration and localization files are located within the locale directory for each supported language:"),(0,i.yg)("ul",null,(0,i.yg)("li",{parentName:"ul"},(0,i.yg)("strong",{parentName:"li"},"Configuration File:")," ",(0,i.yg)("inlineCode",{parentName:"li"},"locale/[localization]/config.yaml")),(0,i.yg)("li",{parentName:"ul"},(0,i.yg)("strong",{parentName:"li"},"Whitelists File:")," ",(0,i.yg)("inlineCode",{parentName:"li"},"locale/[localization]/whitelists.yaml")),(0,i.yg)("li",{parentName:"ul"},(0,i.yg)("strong",{parentName:"li"},"Localization File:")," ",(0,i.yg)("inlineCode",{parentName:"li"},"locale/[localization]/locale.json"))),(0,i.yg)("p",null,"These files are essential for the Wiki's operation and should be maintained carefully.")),(0,i.yg)("h2",{id:"range-expansion"},"Range Expansion"),(0,i.yg)(u,{id:"range-expansion",mdxType:"DocThumbsUpDownFeedbackWidget"},(0,i.yg)("p",null,"To keep configuration files concise, ranges can be specified instead of listing every individual number. This is supported in several sections:"),(0,i.yg)("ul",null,(0,i.yg)("li",{parentName:"ul"},(0,i.yg)("strong",{parentName:"li"},"config.yaml - PACKED_QUERY")),(0,i.yg)("li",{parentName:"ul"},(0,i.yg)("strong",{parentName:"li"},"config.yaml - ITEM_ORIGIN_LOCALE_MAPPING")),(0,i.yg)("li",{parentName:"ul"},(0,i.yg)("strong",{parentName:"li"},"config.yaml - MOB_ORIGIN_LOCALE_MAPPING")),(0,i.yg)("li",{parentName:"ul"},(0,i.yg)("strong",{parentName:"li"},"whitelists.yaml - ITEM_WHITELIST")),(0,i.yg)("li",{parentName:"ul"},(0,i.yg)("strong",{parentName:"li"},"whitelists.yaml - MOB_WHITELIST"))),(0,i.yg)("p",null,"A range is defined with a ",(0,i.yg)("inlineCode",{parentName:"p"},"range")," key, for example:"),(0,i.yg)("pre",null,(0,i.yg)("code",{parentName:"pre",className:"language-yaml"},"- range: [10, 19]\n")),(0,i.yg)("p",null,"This instructs the system to expand the range into all integers from 10 to 19. This method reduces repetition and minimizes errors when listing many sequential values.",(0,i.yg)("br",{parentName:"p"}),"\n","Ranges can be combined with normal numbers:"),(0,i.yg)("pre",null,(0,i.yg)("code",{parentName:"pre",className:"language-yaml"},"MOB_WHITELIST:\n  - 501\n  - 502\n  - 504\n  - 101\n  - range: [102, 115]\n  - 10001\n"))),(0,i.yg)("h2",{id:"configyaml"},"config.yaml"),(0,i.yg)(u,{id:"configyaml",mdxType:"DocThumbsUpDownFeedbackWidget"},(0,i.yg)("p",null,"Below the sections of ",(0,i.yg)("inlineCode",{parentName:"p"},"config.yaml")," are explained.")),(0,i.yg)("h3",{id:"packed_query"},"PACKED_QUERY"),(0,i.yg)(u,{id:"packed_query",mdxType:"DocThumbsUpDownFeedbackWidget"},(0,i.yg)("p",null,(0,i.yg)("strong",{parentName:"p"},"What It Is and Its Purpose:"),(0,i.yg)("br",{parentName:"p"}),"\n",(0,i.yg)("inlineCode",{parentName:"p"},"PACKED_QUERY")," defines groups of item or filter identifiers (vnums) used to set filter target values and URL parameters. When a template uses a value like ",(0,i.yg)("inlineCode",{parentName:"p"},'"packed_query:HELMETS_WARRIOR"'),", the ",(0,i.yg)("inlineCode",{parentName:"p"},"fun.Var")," function recognizes it and replaces it with a comma-separated list of numbers from the PACKED_QUERY section."),(0,i.yg)("admonition",{type:"caution"},(0,i.yg)("p",{parentName:"admonition"},"Since ",(0,i.yg)("inlineCode",{parentName:"p"},"PACKED_QUERY")," are expected to be lists, it is important to pass an empty array as second parameter of ",(0,i.yg)("inlineCode",{parentName:"p"},'fun.getv("query:vnums", [])'),", to force ",(0,i.yg)("strong",{parentName:"p"},"UCHTML")," engine to return a list.")),(0,i.yg)("p",null,(0,i.yg)("strong",{parentName:"p"},"Example \u2013 Creating a New Packed Query and using it as filger:")),(0,i.yg)("p",null,(0,i.yg)("em",{parentName:"p"},"Configuration (in ",(0,i.yg)("inlineCode",{parentName:"em"},"config.yaml"),"):")),(0,i.yg)("pre",null,(0,i.yg)("code",{parentName:"pre",className:"language-yaml"},"PACKED_QUERY:\n  NEW_FILTER: [101, 102, 103, 104]\n")),(0,i.yg)("p",null,(0,i.yg)("em",{parentName:"p"},"Usage in a Template:")),(0,i.yg)("pre",null,(0,i.yg)("code",{parentName:"pre",className:"language-html"},'<div width="auto">\n    <filter-group type="buttons" default="packed_query:ARMORS_WARRIOR" align="center" filter-target="query:race">\n        <filter type="button" path="d:/ymir work/ui/wiki/class_w_{}.tga" filter-value="packed_query:NEW_FILTER"/>\n        <filter type="button" path="d:/ymir work/ui/wiki/class_n_{}.tga" filter-value="packed_query:OLD_FILTER"/>\n    </filter-group>\n</div>\n<main>\n    <lazy-div>\n        {% for value in fun.getv("query:race", []) %}\n            <item-stats width="auto" vnum="{{ value }}"/>\n            <spacer height="5" />\n        {% endfor %}\n    </lazy-div>\n</main>\n')),(0,i.yg)("p",null,"When one of the buttons (filter) is clicked, the page puts ",(0,i.yg)("inlineCode",{parentName:"p"},"packed_query:NEW_FILTER")," or ",(0,i.yg)("inlineCode",{parentName:"p"},"packed_query:OLD_FILTER")," in the variable ",(0,i.yg)("inlineCode",{parentName:"p"},"query:race"),".",(0,i.yg)("br",{parentName:"p"}),"\n","Then using ",(0,i.yg)("inlineCode",{parentName:"p"},'fun.getv("query:race", [])')," we can unpack and use the single values to iterate over them and, for example, place an ",(0,i.yg)("a",{parentName:"p",href:"/docs/wiki/ui-components#item-stats"},(0,i.yg)("inlineCode",{parentName:"a"},"<item-stats>"))," for each vnum."),(0,i.yg)("p",null,(0,i.yg)("strong",{parentName:"p"},"Example \u2013 Using PACKED_QUERY as a Category/Hyperlink Parameter:")),(0,i.yg)("p",null,(0,i.yg)("em",{parentName:"p"},"Configuration (in ",(0,i.yg)("inlineCode",{parentName:"em"},"config.yaml"),"):")),(0,i.yg)("pre",null,(0,i.yg)("code",{parentName:"pre",className:"language-yaml"},"PACKED_QUERY:\n  SPECIAL_ITEMS: [201, 202, 203]\n")),(0,i.yg)("p",null,(0,i.yg)("em",{parentName:"p"},"Usage in a Category Link:")),(0,i.yg)("pre",null,(0,i.yg)("code",{parentName:"pre",className:"language-jinja"},'<a href="wiki://p/items/special?vnums=packed_query:SPECIAL_ITEMS">\n  Special Items\n</a>\n')),(0,i.yg)("admonition",{type:"note"},(0,i.yg)("p",{parentName:"admonition"},"The hyperling will carry the information that ",(0,i.yg)("inlineCode",{parentName:"p"},"vnums")," is the shothand for ",(0,i.yg)("inlineCode",{parentName:"p"},"[201, 202, 203]")," and whe can later use it in a page (in this case ",(0,i.yg)("inlineCode",{parentName:"p"},"items/special.html"),")")),(0,i.yg)("p",null,(0,i.yg)("em",{parentName:"p"},"Usage in ",(0,i.yg)("inlineCode",{parentName:"em"},"items/special.html"),":")),(0,i.yg)("pre",null,(0,i.yg)("code",{parentName:"pre",className:"language-jinja"},'{% set new_filter = fun.getv("query:vnums", []) %}\n<lazy-div>\n    {% for value in new_filter %}\n        <item-stats width="auto" vnum="{{ value }}"/>\n        <spacer height="5" />\n    {% endfor %}\n</lazy-div>\n')),(0,i.yg)("p",null,"The for loop will iterate over ",(0,i.yg)("strong",{parentName:"p"},"all values")," defined in ",(0,i.yg)("inlineCode",{parentName:"p"},"config.yaml")," (201, 202, 203)")),(0,i.yg)("h3",{id:"item_origin_locale_mapping--mob_origin_locale_mapping"},"ITEM_ORIGIN_LOCALE_MAPPING & MOB_ORIGIN_LOCALE_MAPPING"),(0,i.yg)(u,{id:"item_origin_locale_mapping--mob_origin_locale_mapping",mdxType:"DocThumbsUpDownFeedbackWidget"},(0,i.yg)("p",null,(0,i.yg)("strong",{parentName:"p"},"What Is It and How It Works:"),(0,i.yg)("br",{parentName:"p"}),"\n","The Mob/Item Origin sections (",(0,i.yg)("inlineCode",{parentName:"p"},"ITEM_ORIGIN_LOCALE_MAPPING")," and ",(0,i.yg)("inlineCode",{parentName:"p"},"MOB_ORIGIN_LOCALE_MAPPING"),') map specific vnums to locale keys. This means that any mob or item whose vnum is listed in these mappings will have its "origin" automatically set to the corresponding localized string when using functions like ',(0,i.yg)("inlineCode",{parentName:"p"},"mob.get_mob_origin(vnum)")," or ",(0,i.yg)("inlineCode",{parentName:"p"},"item.get_item_origin(vnum)"),". "),(0,i.yg)("p",null,"Tags such as ",(0,i.yg)("inlineCode",{parentName:"p"},"<monster-card>")," and ",(0,i.yg)("inlineCode",{parentName:"p"},"<chest-card>")," will display this origin information."),(0,i.yg)("p",null,(0,i.yg)("strong",{parentName:"p"},"Example \u2013 Creating a New Origin Group:")),(0,i.yg)("p",null,(0,i.yg)("em",{parentName:"p"},"Configuration (in ",(0,i.yg)("inlineCode",{parentName:"em"},"config.yaml"),"):")),(0,i.yg)("pre",null,(0,i.yg)("code",{parentName:"pre",className:"language-yaml"},'ITEM_ORIGIN_LOCALE_MAPPING:\n  "items.origin.mystic": [50001, 50002, 50003]\n  \nMOB_ORIGIN_LOCALE_MAPPING:\n  "mobs.origin.forest":\n    - range: [600, 610]\n')),(0,i.yg)("p",null,(0,i.yg)("em",{parentName:"p"},"Localization (in ",(0,i.yg)("inlineCode",{parentName:"em"},"locale.json"),"):")),(0,i.yg)("pre",null,(0,i.yg)("code",{parentName:"pre",className:"language-json"},'{\n    "items": {\n        "origin": {\n            "mystic": "Mystic Lands"\n        }\n    },\n    "mobs": {\n        "origin": {\n            "forest": "Brave Forest"\n        }\n    }\n}\n')),(0,i.yg)("p",null,(0,i.yg)("em",{parentName:"p"},"Expected Behavior:"),"  "),(0,i.yg)("ul",null,(0,i.yg)("li",{parentName:"ul"},"When ",(0,i.yg)("inlineCode",{parentName:"li"},"item.get_item_origin(50002)")," is called, it will find the locale key ",(0,i.yg)("inlineCode",{parentName:"li"},'"items.origin.mystic"')," and display the corresponding localized string ",(0,i.yg)("strong",{parentName:"li"},"Mystic Lands"),"."),(0,i.yg)("li",{parentName:"ul"},"Similarly, ",(0,i.yg)("inlineCode",{parentName:"li"},"mob.get_mob_origin(605)")," will return the localized string for ",(0,i.yg)("inlineCode",{parentName:"li"},'"mobs.origin.forest"')," ",(0,i.yg)("strong",{parentName:"li"},"Brave Forest"),"."))),(0,i.yg)("h3",{id:"quest_names-raid_names-dungeon_names-map_info"},"QUEST_NAMES, RAID_NAMES, DUNGEON_NAMES, MAP_INFO"),(0,i.yg)(u,{id:"quest_names-raid_names-dungeon_names-map_info",mdxType:"DocThumbsUpDownFeedbackWidget"},(0,i.yg)("p",null,"These configuration sections associate identifiers with locale keys (and in the case of MAP_INFO, additional properties) to be used in hyperlink tags.")),(0,i.yg)("h4",{id:"quest_names"},"QUEST_NAMES"),(0,i.yg)(u,{id:"quest_names",mdxType:"DocThumbsUpDownFeedbackWidget"},(0,i.yg)("p",null,(0,i.yg)("inlineCode",{parentName:"p"},"QUEST_NAMES")," Associates quest IDs with locale keys."),(0,i.yg)("p",null,"  ",(0,i.yg)("em",{parentName:"p"},"Example:")),(0,i.yg)("pre",null,(0,i.yg)("code",{parentName:"pre",className:"language-yaml"},'QUEST_NAMES:\n  ue_main_quest_lv10: "quest_names.ue_main_quest_lv10"\n  ue_main_quest_lv25: "quest_names.ue_main_quest_lv25"\n  ue_main_quest_lv40: "quest_names.ue_main_quest_lv40"\n'))),(0,i.yg)("h4",{id:"raid_names"},"RAID_NAMES"),(0,i.yg)(u,{id:"raid_names",mdxType:"DocThumbsUpDownFeedbackWidget"},(0,i.yg)("p",null,(0,i.yg)("inlineCode",{parentName:"p"},"RAID_NAMES")," Maps raid IDs to locale keys."),(0,i.yg)("p",null,"  ",(0,i.yg)("em",{parentName:"p"},"Example:")),(0,i.yg)("pre",null,(0,i.yg)("code",{parentName:"pre",className:"language-yaml"},'RAID_NAMES:\n  ue_raid_solo_rounds_1: "raid_names.ue_raid_solo_rounds_1"\n  ue_miliarstone_raid: "raid_names.ue_miliarstone_raid"\n'))),(0,i.yg)("h4",{id:"dungeon_names"},"DUNGEON_NAMES"),(0,i.yg)(u,{id:"dungeon_names",mdxType:"DocThumbsUpDownFeedbackWidget"},(0,i.yg)("p",null,(0,i.yg)("inlineCode",{parentName:"p"},"DUNGEON_NAMES")," Associates dungeon IDs with locale keys."),(0,i.yg)("p",null,"  ",(0,i.yg)("em",{parentName:"p"},"Example:")),(0,i.yg)("pre",null,(0,i.yg)("code",{parentName:"pre",className:"language-yaml"},"DUNGEON_NAMES:\n  ue_dungeon_30min_specquest: dungeon_names.ue_dungeon_30min_specquest\n  ue_dungeon_diseased_peak: dungeon_names.ue_dungeon_diseased_peak\n"))),(0,i.yg)("h4",{id:"map_info"},"MAP_INFO"),(0,i.yg)(u,{id:"map_info",mdxType:"DocThumbsUpDownFeedbackWidget"},(0,i.yg)("p",null,(0,i.yg)("inlineCode",{parentName:"p"},"MAP_INFO")," Contains map IDs, each mapping to an object with a ",(0,i.yg)("inlineCode",{parentName:"p"},"name")," (locale key) and a ",(0,i.yg)("inlineCode",{parentName:"p"},"path"),". The ",(0,i.yg)("inlineCode",{parentName:"p"},"path")," is used by tags like ",(0,i.yg)("inlineCode",{parentName:"p"},"<atlas-info>")," and ",(0,i.yg)("inlineCode",{parentName:"p"},"<monster-spawn>")," to load atlas images."),(0,i.yg)("p",null,"  ",(0,i.yg)("em",{parentName:"p"},"Example:")),(0,i.yg)("pre",null,(0,i.yg)("code",{parentName:"pre",className:"language-yaml"},'MAP_INFO:\n  "61":\n    name: "maps.snow"\n    path: map_n_snowm_01\n  "63":\n    name: "maps.desert"\n    path: metin2_map_n_desert_01\n')),(0,i.yg)("hr",null),(0,i.yg)("p",null,(0,i.yg)("em",{parentName:"p"},"Localization (in ",(0,i.yg)("inlineCode",{parentName:"em"},"locale.json"),") for above entries:")),(0,i.yg)("pre",null,(0,i.yg)("code",{parentName:"pre",className:"language-json"},'{\n  "quest_names": {\n    "ue_main_quest_lv10": "Main Quest Level 10",\n    "ue_main_quest_lv25": "Main Quest Level 25",\n    "ue_main_quest_lv40": "Main Quest Level 40"\n  },\n  "raid_names": {\n    "ue_raid_solo_rounds_1": "Solo Rounds Raid",\n    "ue_miliarstone_raid": "Miliarstone Raid"\n  },\n  "dungeon_names": {\n    "ue_dungeon_30min_specquest": "30-Minute Special Quest Dungeon",\n    "ue_dungeon_diseased_peak": "Diseased Peak Dungeon"\n  },\n  "maps": {\n    "snow": "Snow Map",\n    "desert": "Desert Map"\n  }\n}\n'))),(0,i.yg)("h3",{id:"wiki_categories"},"WIKI_CATEGORIES"),(0,i.yg)(u,{id:"wiki_categories",mdxType:"DocThumbsUpDownFeedbackWidget"},(0,i.yg)("p",null,(0,i.yg)("strong",{parentName:"p"},"What It Does:"),(0,i.yg)("br",{parentName:"p"}),"\n",(0,i.yg)("inlineCode",{parentName:"p"},"WIKI_CATEGORIES")," defines the navigational structure of the Wiki by creating a category-subcategory tree. Each category can have multiple subcategories, each linking to a Wiki page."),(0,i.yg)("p",null,(0,i.yg)("strong",{parentName:"p"},"Example \u2013 Creating a New Category-Subcategory:")),(0,i.yg)("p",null,(0,i.yg)("em",{parentName:"p"},"Configuration (in ",(0,i.yg)("inlineCode",{parentName:"em"},"config.yaml"),"):")),(0,i.yg)("pre",null,(0,i.yg)("code",{parentName:"pre",className:"language-yaml"},'WIKI_CATEGORIES:\n  - category: "categories.equipment"\n    subcategories:\n      - name: "subcategories.equipment.new_weapons"\n        url: "wiki://p/items/new_weapons"\n      - name: "subcategories.equipment.new_armor"\n        url: "wiki://p/items/new_armors"\n')),(0,i.yg)("p",null,(0,i.yg)("em",{parentName:"p"},"Locale Example (in ",(0,i.yg)("inlineCode",{parentName:"em"},"locale.json"),"):")),(0,i.yg)("pre",null,(0,i.yg)("code",{parentName:"pre",className:"language-json"},'{\n  "categories": {\n    "equipment": "Equipment"\n  },\n  "subcategories": {\n    "equipment": {\n      "new_weapons": "New Weapons",\n      "new_armor": "New Armor"\n    }\n  }\n}\n')),(0,i.yg)("p",null,'This configuration creates a new category called "Equipment" with subcategories "New Weapons" and "New Armor", linking to their respective Wiki pages.')),(0,i.yg)("h3",{id:"indexed_pages"},"INDEXED_PAGES"),(0,i.yg)(u,{id:"indexed_pages",mdxType:"DocThumbsUpDownFeedbackWidget"},(0,i.yg)("p",null,(0,i.yg)("strong",{parentName:"p"},"What It Does:"),(0,i.yg)("br",{parentName:"p"}),"\n",(0,i.yg)("inlineCode",{parentName:"p"},"INDEXED_PAGES")," lists the Wiki pages that are indexed by the search engine. Each entry specifies a category, a title, and a URL.",(0,i.yg)("br",{parentName:"p"}),"\n",(0,i.yg)("strong",{parentName:"p"},"Mobs")," and ",(0,i.yg)("strong",{parentName:"p"},"Items")," are indexed automatically (following ",(0,i.yg)("a",{parentName:"p",href:"#itemmob-whitelists"},"Whitelists")," rules). All other custom pages like dungeons, systems, guides need to be manually indexed.  "),(0,i.yg)("admonition",{type:"caution"},(0,i.yg)("p",{parentName:"admonition"},"Page not indexed are not returned from the search bar.")),(0,i.yg)("p",null,(0,i.yg)("strong",{parentName:"p"},"Example \u2013 Adding a Document to the Search Engine:")),(0,i.yg)("p",null,(0,i.yg)("em",{parentName:"p"},"Configuration (in ",(0,i.yg)("inlineCode",{parentName:"em"},"config.yaml"),"):")),(0,i.yg)("pre",null,(0,i.yg)("code",{parentName:"pre",className:"language-yaml"},'INDEXED_PAGES:\n  - category: dungeon\n    title: dungeon_names.new_dungeon\n    url: "wiki://p/dungeons/new_dungeon"\n')),(0,i.yg)("p",null,'This entry makes the new dungeon page searchable and categorizes it under "dungeon".'),(0,i.yg)("p",null,(0,i.yg)("em",{parentName:"p"},"Locale Example (in ",(0,i.yg)("inlineCode",{parentName:"em"},"locale.json"),"):")),(0,i.yg)("pre",null,(0,i.yg)("code",{parentName:"pre",className:"language-json"},'{\n  "dungeon_names": {\n    "new_dungeon": "A Fresh new Dungeon"\n  },\n}\n'))),(0,i.yg)("h3",{id:"search_result_category"},"SEARCH_RESULT_CATEGORY"),(0,i.yg)(u,{id:"search_result_category",mdxType:"DocThumbsUpDownFeedbackWidget"},(0,i.yg)("p",null,(0,i.yg)("strong",{parentName:"p"},"What It Does:"),(0,i.yg)("br",{parentName:"p"}),"\n",(0,i.yg)("inlineCode",{parentName:"p"},"SEARCH_RESULT_CATEGORY")," configures how search results are grouped and displayed. Each category has a defined color and a display name used in the search result visualization.",(0,i.yg)("br",{parentName:"p"}),"\n","The category defined in ",(0,i.yg)("a",{parentName:"p",href:"#indexed_pages"},"INDEXED_PAGES")," refers to this section. When a page with a given category is returned, the name of category is appended in front of the page name in the search result list."),(0,i.yg)("p",null,(0,i.yg)("strong",{parentName:"p"},"Example \u2013 Creating a New Search Result Category:")),(0,i.yg)("p",null,(0,i.yg)("em",{parentName:"p"},"Configuration (in ",(0,i.yg)("inlineCode",{parentName:"em"},"config.yaml"),"):")),(0,i.yg)("pre",null,(0,i.yg)("code",{parentName:"pre",className:"language-yaml"},"SEARCH_RESULT_CATEGORY:\n  item:\n    color: fffa4834\n    name: results_category.item\n  dungeon:\n    color: fffa4834\n    name: results_category.dungeon\n  new_category:\n    color: ffaabbcc\n    name: results_category.new_category\n")),(0,i.yg)("p",null,'This configuration adds a new search result category called "new_category" with the specified color.'),(0,i.yg)("p",null,(0,i.yg)("em",{parentName:"p"},"Locale Example (in ",(0,i.yg)("inlineCode",{parentName:"em"},"locale.json"),"):")),(0,i.yg)("pre",null,(0,i.yg)("code",{parentName:"pre",className:"language-json"},'{\n  "results_category": {\n    "item": "Items",\n    "dungeon": "Dungeon",\n    "new_category": "New Sparkly Category",\n  },\n}\n')),(0,i.yg)("hr",null),(0,i.yg)("p",null,"Using the above ",(0,i.yg)("a",{parentName:"p",href:"#indexed_pages"},"INDEXED_PAGES")," example, the page indexed will return as:"),(0,i.yg)("pre",null,(0,i.yg)("code",{parentName:"pre"},"[Dungeon] A Fresh new Dungeon \n"))),(0,i.yg)("h2",{id:"whitelistsyaml"},"whitelists.yaml"),(0,i.yg)("h2",{id:"itemmob-whitelists"},"ITEM/MOB Whitelists"),(0,i.yg)(u,{id:"itemmob-whitelists",mdxType:"DocThumbsUpDownFeedbackWidget"},(0,i.yg)("p",null,(0,i.yg)("strong",{parentName:"p"},"What They Are:"),(0,i.yg)("br",{parentName:"p"}),"\n","Whitelists control which item and mob vnums are enabled for search and Wiki build. Only those included in the whitelist will be processed and displayed in the Wiki."),(0,i.yg)("p",null,(0,i.yg)("strong",{parentName:"p"},"Example \u2013 Modifying Whitelists:")),(0,i.yg)("p",null,(0,i.yg)("em",{parentName:"p"},"ITEM_WHITELIST (in ",(0,i.yg)("inlineCode",{parentName:"em"},"whitelists.yaml"),"):")),(0,i.yg)("pre",null,(0,i.yg)("code",{parentName:"pre",className:"language-yaml"},"ITEM_WHITELIST:\n  - 1\n  - 2\n  - 3\n  - 4\n  - 5\n  - 6\n  - 7\n  - 8\n  - 9\n  - range: [10, 19]\n  - 100\n")),(0,i.yg)("p",null,(0,i.yg)("em",{parentName:"p"},"MOB_WHITELIST (in ",(0,i.yg)("inlineCode",{parentName:"em"},"whitelists.yaml"),"):")),(0,i.yg)("pre",null,(0,i.yg)("code",{parentName:"pre",className:"language-yaml"},"MOB_WHITELIST:\n  - 107\n  - 109\n  - 113\n  - 115\n  - 401\n  - 402\n  - 501\n  - 502\n  - 504\n  - 101\n  - range: [102, 115]\n  - 404\n  - 405\n  - range: [191, 194]\n  - range: [493, 496]\n")),(0,i.yg)("p",null,"To add a new mob, simply add its vnum (or a range) to the corresponding list. To remove one, delete it from the list.")))}_.isMDXComponent=!0}}]);