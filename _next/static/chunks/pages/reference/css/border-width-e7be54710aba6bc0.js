(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[1034],{1126:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/reference/css/border-width",function(){return n(3116)}])},9027:function(e,t,n){"use strict";n.d(t,{Z:function(){return o}});var r=n(1799),l=n(9396),i=n(5893),a=(n(7294),n(1387)),s=n(9769),d=n(6671);function o(e){function t(t){return(0,i.jsx)(s.$,(0,l.Z)((0,r.Z)({},t),{meta:e}))}return t.appShell=c,t}function c(e){return(0,i.jsx)(d.T,(0,r.Z)({routeTree:a},e))}},9769:function(e,t,n){"use strict";n.d(t,{$:function(){return k}});var r=n(5893),l=n(7294),i=n(3905),a=n(7016),s=n(8338),d=n(1178),o=n(1664),c=n.n(o);var p=function(){const{breadcrumbs:e}=(0,d.e)();return e?(0,r.jsx)("div",{className:"flex",children:e.map(((e,t)=>e.path&&(0,r.jsx)("div",{className:"flex mb-3 mt-0.5 items-center",children:(0,r.jsxs)(l.Fragment,{children:[(0,r.jsx)(c(),{href:e.path,children:(0,r.jsx)("a",{className:"text-link dark:text-link-dark text-sm tracking-wide font-bold uppercase mr-1 hover:underline",children:e.title})}),(0,r.jsx)("span",{className:"inline-block mr-1 text-link dark:text-link-dark text-lg",children:(0,r.jsx)("svg",{width:"20",height:"20",viewBox:"0 0 20 20",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:(0,r.jsx)("path",{d:"M6.86612 13.6161C6.37796 14.1043 6.37796 14.8957 6.86612 15.3839C7.35427 15.872 8.14572 15.872 8.63388 15.3839L13.1339 10.8839C13.622 10.3957 13.622 9.60428 13.1339 9.11612L8.63388 4.61612C8.14572 4.12797 7.35427 4.12797 6.86612 4.61612C6.37796 5.10428 6.37796 5.89573 6.86612 6.38388L10.4822 10L6.86612 13.6161Z",fill:"currentColor"})})})]},e.path)},t)))}):null},u=n(4184),h=n.n(u);const x={foundation:{name:"Foundation",classes:"bg-yellow-50 text-white"},intermediate:{name:"Intermediate",classes:"bg-purple-40 text-white"},advanced:{name:"Advanced",classes:"bg-green-40 text-white"},experimental:{name:"Experimental",classes:"bg-ui-orange text-white"},deprecated:{name:"Deprecated",classes:"bg-red-40 text-white"}};var m=function(e){let{text:t,variant:n,className:l}=e;const{name:i,classes:a}=x[n];return(0,r.jsx)("span",{className:h()("mr-2",l),children:(0,r.jsx)("span",{className:h()("inline font-bold text-sm uppercase py-1 px-2 rounded",a),children:t||i})})},v=n(2937);var w=function(e){let{title:t,status:n,description:l,tags:i=[]}=e;return(0,r.jsx)("div",{className:"px-5 sm:px-12 pt-5",children:(0,r.jsxs)("div",{className:"max-w-4xl ml-0 2xl:mx-auto",children:[i?(0,r.jsx)(p,{}):null,(0,r.jsxs)(v.H1,{className:"mt-0 text-primary dark:text-primary-dark -mx-.5",children:[t,n?(0,r.jsxs)("em",{children:["\u2014",n]}):""]}),l&&(0,r.jsx)("p",{className:"mt-4 mb-6 text-primary dark:text-primary-dark text-xl text-gray-90 leading-large",children:l}),(null===i||void 0===i?void 0:i.length)>0&&(0,r.jsx)("div",{className:"mt-4",children:i.map((e=>(0,r.jsx)(m,{variant:e},e)))})]})})},g=n(6875),f=n(9729);function b(e){let{children:t}=e;return(0,r.jsx)("div",{className:"max-w-4xl ml-0 2xl:mx-auto",children:t})}function k(e){let{children:t,meta:n}=e;const{route:o,nextRoute:c,prevRoute:p}=(0,d.e)(),u=n.title||(null===o||void 0===o?void 0:o.title)||"",h=n.description||(null===o||void 0===o?void 0:o.description)||"";let x=l.Children.toArray(t).filter((e=>{var t;return!!(null===(t=e.props)||void 0===t?void 0:t.mdxType)&&["h1","h2","h3","Challenges","Recap"].includes(e.props.mdxType)})).map((e=>{var t,n;return"Challenges"===e.props.mdxType?{url:"#challenges",depth:0,text:"Challenges"}:"Recap"===e.props.mdxType?{url:"#recap",depth:0,text:"Recap"}:{url:"#"+e.props.id,depth:null!==(n=(null===(t=e.props)||void 0===t?void 0:t.mdxType)&&parseInt(e.props.mdxType.replace("h",""),0))&&void 0!==n?n:0,text:e.props.children}}));x.length>0&&x.unshift({depth:1,text:"Overview",url:"#"}),null==o&&console.error("This page was not added to one of the sidebar JSON files.");const m="/"===(null===o||void 0===o?void 0:o.path);let v=["Sandpack","FullWidth","Illustration","IllustrationBlock","Challenges","Recipes"],k=[],j=[];function N(e){k.length>0&&(j.push((0,r.jsx)(b,{children:k},e)),k=[])}return l.Children.forEach(t,(function(e,t){null!=e&&("object"===typeof e&&v.includes(e.props.mdxType)?(N(t),j.push(e)):k.push(e))})),N("last"),(0,r.jsxs)("article",{className:"h-full mx-auto relative w-full min-w-0",children:[(0,r.jsxs)("div",{className:"lg:pt-0 pt-20 pl-0 lg:pl-80 2xl:px-80 ",children:[(0,r.jsx)(g.p,{title:u}),!m&&(0,r.jsx)(w,{title:u,description:h,tags:null===o||void 0===o?void 0:o.tags}),(0,r.jsxs)("div",{className:"px-5 sm:px-12",children:[(0,r.jsx)("div",{className:"max-w-7xl mx-auto",children:(0,r.jsx)(i.pC.Provider,{value:s.t,children:j})}),(0,r.jsx)(a.h,{route:o,nextRoute:c,prevRoute:p})]})]}),(0,r.jsx)("div",{className:"w-full lg:max-w-xs hidden 2xl:block",children:!m&&x.length>0&&(0,r.jsx)(f.o,{headings:x})})]})}},3116:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return c}});var r=n(9534),l=(n(7294),n(3905)),i=n(9027);const a=(s="Sandpack",function(e){return console.warn("Component "+s+" was not imported, exported, or provided by MDXProvider as global scope"),(0,l.kt)("div",Object.assign({},e))});var s;const d={},o=(0,i.Z)({title:"Border",layout:"API"});function c(e){var{components:t}=e,n=(0,r.Z)(e,["components"]);return(0,l.kt)(o,Object.assign({},d,n,{components:t,mdxType:"MDXLayout"}),(0,l.kt)("p",null,"Changes the border width of all sides of the element\u2019s rectangle."),(0,l.kt)("p",null,"Alternatively, each side can be set separately with the following properties:"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("inlineCode",{parentName:"li"},"border-top-width")),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("inlineCode",{parentName:"li"},"border-right-width")),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("inlineCode",{parentName:"li"},"border-bottom-width")),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("inlineCode",{parentName:"li"},"border-left-width"))),(0,l.kt)(a,{mdxType:"Sandpack"},(0,l.kt)("pre",null,(0,l.kt)("code",Object.assign({parentName:"pre"},{className:"language-js",metastring:"App.js","App.js":!0}),"export default function App() {\n  return <>\n    <view />\n    <view />\n    <view />\n    <view />\n  </>;\n}\n")),(0,l.kt)("pre",null,(0,l.kt)("code",Object.assign({parentName:"pre"},{className:"language-css",metastring:"style.css active","style.css":!0,active:!0}),"view {\n  flex-grow: 1;\n  margin: 20px;\n  background-color: cornflowerblue;\n}\n\nview:nth-child(1) {\n  border-width: 10px;\n}\n\nview:nth-child(2) {\n  border-width: 10px;\n  border-bottom-width: 0;\n}\n\nview:nth-child(3) {\n  border-right-width: 14px;\n  border-bottom-width: 4px;\n}\n\nview:nth-child(4) {\n  border-width: 4px;\n  border-bottom-width: 20px;\n  border-radius: 20px;\n}\n"))))}c.isMDXComponent=!0}},function(e){e.O(0,[3033,5762,9024,744,6671,8617,9774,2888,179],(function(){return t=1126,e(e.s=t);var t}));var t=e.O();_N_E=t}]);