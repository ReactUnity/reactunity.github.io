(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[5773],{5658:function(e,n,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/reference/css/appearance",function(){return t(2166)}])},1338:function(e,n,t){"use strict";t.d(n,{Z:function(){return c}});var r=t(5893),a=(t(7294),t(1387)),l=t(5976),s=t(9693);function i(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function o(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{},r=Object.keys(t);"function"===typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(t).filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})))),r.forEach((function(n){i(e,n,t[n])}))}return e}function c(e){var n=function(n){return(0,r.jsx)(l.$,o({},n,{meta:e}))};return n.appShell=u,n}function u(e){return(0,r.jsx)(s.T,o({routeTree:a},e))}},5976:function(e,n,t){"use strict";t.d(n,{$:function(){return y}});var r=t(5893),a=t(7294),l=t(3905),s=t(4922),i=t(7548),o=t(3760),c=t(1664),u=t.n(c);var p=function(){var e=(0,o.e)().breadcrumbs;return e?(0,r.jsx)("div",{className:"flex",children:e.map((function(e,n){return e.path&&(0,r.jsx)("div",{className:"flex mb-3 mt-0.5 items-center",children:(0,r.jsxs)(a.Fragment,{children:[(0,r.jsx)(u(),{href:e.path,children:(0,r.jsx)("a",{className:"text-link dark:text-link-dark text-sm tracking-wide font-bold uppercase mr-1 hover:underline",children:e.title})}),(0,r.jsx)("span",{className:"inline-block mr-1 text-link dark:text-link-dark text-lg",children:(0,r.jsx)("svg",{width:"20",height:"20",viewBox:"0 0 20 20",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:(0,r.jsx)("path",{d:"M6.86612 13.6161C6.37796 14.1043 6.37796 14.8957 6.86612 15.3839C7.35427 15.872 8.14572 15.872 8.63388 15.3839L13.1339 10.8839C13.622 10.3957 13.622 9.60428 13.1339 9.11612L8.63388 4.61612C8.14572 4.12797 7.35427 4.12797 6.86612 4.61612C6.37796 5.10428 6.37796 5.89573 6.86612 6.38388L10.4822 10L6.86612 13.6161Z",fill:"currentColor"})})})]},e.path)},n)}))}):null},d=t(4184),m=t.n(d),x={foundation:{name:"Foundation",classes:"bg-yellow-50 text-white"},intermediate:{name:"Intermediate",classes:"bg-purple-40 text-white"},advanced:{name:"Advanced",classes:"bg-green-40 text-white"},experimental:{name:"Experimental",classes:"bg-ui-orange text-white"},deprecated:{name:"Deprecated",classes:"bg-red-40 text-white"}};var h=function(e){var n=e.text,t=e.variant,a=e.className,l=x[t],s=l.name,i=l.classes;return(0,r.jsx)("span",{className:m()("mr-2",a),children:(0,r.jsx)("span",{className:m()("inline font-bold text-sm uppercase py-1 px-2 rounded",i),children:n||s})})},f=t(5992);var v=function(e){var n=e.title,t=e.status,a=e.description,l=e.tags,s=void 0===l?[]:l;return(0,r.jsx)("div",{className:"px-5 sm:px-12 pt-5",children:(0,r.jsxs)("div",{className:"max-w-4xl ml-0 2xl:mx-auto",children:[s?(0,r.jsx)(p,{}):null,(0,r.jsxs)(f.H1,{className:"mt-0 text-primary dark:text-primary-dark -mx-.5",children:[n,t?(0,r.jsxs)("em",{children:["\u2014",t]}):""]}),a&&(0,r.jsx)("p",{className:"mt-4 mb-6 text-primary dark:text-primary-dark text-xl text-gray-90 leading-large",children:a}),(null===s||void 0===s?void 0:s.length)>0&&(0,r.jsx)("div",{className:"mt-4",children:s.map((function(e){return(0,r.jsx)(h,{variant:e},e)}))})]})})},g=t(887),b=t(7451);function j(e){var n=e.children;return(0,r.jsx)("div",{className:"max-w-4xl ml-0 2xl:mx-auto",children:n})}function y(e){var n=e.children,t=e.meta,c=function(e){k.length>0&&(N.push((0,r.jsx)(j,{children:k},e)),k=[])},u=(0,o.e)(),p=u.route,d=u.nextRoute,m=u.prevRoute,x=t.title||(null===p||void 0===p?void 0:p.title)||"",h=t.description||(null===p||void 0===p?void 0:p.description)||"",f=a.Children.toArray(n).filter((function(e){var n;return!!(null===(n=e.props)||void 0===n?void 0:n.mdxType)&&["h1","h2","h3","Challenges","Recap"].includes(e.props.mdxType)})).map((function(e){var n,t;return"Challenges"===e.props.mdxType?{url:"#challenges",depth:0,text:"Challenges"}:"Recap"===e.props.mdxType?{url:"#recap",depth:0,text:"Recap"}:{url:"#"+e.props.id,depth:null!==(t=(null===(n=e.props)||void 0===n?void 0:n.mdxType)&&parseInt(e.props.mdxType.replace("h",""),0))&&void 0!==t?t:0,text:e.props.children}}));f.length>0&&f.unshift({depth:1,text:"Overview",url:"#"}),null==p&&console.error("This page was not added to one of the sidebar JSON files.");var y="/"===(null===p||void 0===p?void 0:p.path),w=["Sandpack","FullWidth","Illustration","IllustrationBlock","Challenges","Recipes"],k=[],N=[];return a.Children.forEach(n,(function(e,n){null!=e&&("object"===typeof e&&w.includes(e.props.mdxType)?(c(n),N.push(e)):k.push(e))})),c("last"),(0,r.jsxs)("article",{className:"h-full mx-auto relative w-full min-w-0",children:[(0,r.jsxs)("div",{className:"lg:pt-0 pt-20 pl-0 lg:pl-80 2xl:px-80 ",children:[(0,r.jsx)(g.p,{title:x}),!y&&(0,r.jsx)(v,{title:x,description:h,tags:null===p||void 0===p?void 0:p.tags}),(0,r.jsxs)("div",{className:"px-5 sm:px-12",children:[(0,r.jsx)("div",{className:"max-w-7xl mx-auto",children:(0,r.jsx)(l.pC.Provider,{value:i.t,children:N})}),(0,r.jsx)(s.h,{route:p,nextRoute:d,prevRoute:m})]})]}),(0,r.jsx)("div",{className:"w-full lg:max-w-xs hidden 2xl:block",children:!y&&f.length>0&&(0,r.jsx)(b.o,{headings:f})})]})}},2166:function(e,n,t){"use strict";t.r(n),t.d(n,{default:function(){return u}});t(7294);var r=t(3905),a=t(1338);function l(e,n){if(null==e)return{};var t,r,a=function(e,n){if(null==e)return{};var t,r,a={},l=Object.keys(e);for(r=0;r<l.length;r++)t=l[r],n.indexOf(t)>=0||(a[t]=e[t]);return a}(e,n);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(r=0;r<l.length;r++)t=l[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}var s,i=(s="Sandpack",function(e){return console.warn("Component "+s+" was not imported, exported, or provided by MDXProvider as global scope"),(0,r.kt)("div",Object.assign({},e))}),o={},c=(0,a.Z)({title:"Appearance",layout:"API"});function u(e){var n=e.components,t=l(e,["components"]);return(0,r.kt)(c,Object.assign({},o,t,{components:n,mdxType:"MDXLayout"}),(0,r.kt)("p",null,"Remove native styling from elements which have it, such as button, input and toggle. This allows styling those element more accurately if desired."),(0,r.kt)("p",null,"Valid values are ",(0,r.kt)("inlineCode",{parentName:"p"},"none")," or ",(0,r.kt)("inlineCode",{parentName:"p"},"button"),"."),(0,r.kt)(i,{mdxType:"Sandpack"},(0,r.kt)("pre",null,(0,r.kt)("code",Object.assign({parentName:"pre"},{className:"language-js",metastring:"App.js","App.js":!0}),"export default function App() {\n  return <>\n    <button>Appearance: button</button>\n    <button>Appearance: none</button>\n    Click the buttons to see style differences\n  </>;\n}\n")),(0,r.kt)("pre",null,(0,r.kt)("code",Object.assign({parentName:"pre"},{className:"language-css",metastring:"style.css active","style.css":!0,active:!0}),":root {\n  justify-content: space-around;\n  align-items: center;\n  background-color: white;\n}\n\nbutton {\n  background-color: cornflowerblue;\n  color: white;\n}\n\nbutton:nth-child(1) {\n  appearance: button;\n}\n\nbutton:nth-child(2) {\n  appearance: none;\n}\n"))))}u.isMDXComponent=!0}},function(e){e.O(0,[3033,5762,4051,410,9693,4864,9774,2888,179],(function(){return n=5658,e(e.s=n);var n}));var n=e.O();_N_E=n}]);