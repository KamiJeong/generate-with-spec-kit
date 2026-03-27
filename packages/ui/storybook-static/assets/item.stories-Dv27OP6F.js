import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{c as u}from"./utils-BQHNewu7.js";import{c as x}from"./createLucideIcon-C70vjQTX.js";import"./iframe-DbkQVXnW.js";import"./preload-helper-Dp1pzeXC.js";/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const y=[["path",{d:"M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2",key:"975kel"}],["circle",{cx:"12",cy:"7",r:"4",key:"17ys0d"}]],f=x("user",y);function a({className:s,icon:t,label:d,shortcut:o,children:l,...p}){return e.jsxs("div",{"data-slot":"item",className:u("flex min-h-9 items-center justify-between gap-3 rounded-md border px-3 py-2 text-sm",s),...p,children:[e.jsxs("span",{className:"flex items-center gap-2",children:[t?e.jsx("span",{className:"text-muted-foreground",children:t}):null,e.jsx("span",{children:d}),l]}),o?e.jsx("span",{className:"font-mono text-xs text-muted-foreground",children:o}):null]})}a.__docgenInfo={description:"",methods:[],displayName:"Item",props:{icon:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},label:{required:!0,tsType:{name:"string"},description:""},shortcut:{required:!1,tsType:{name:"string"},description:""}}};const{expect:c,within:h}=__STORYBOOK_MODULE_TEST__,v={title:"Components/Item",component:a,tags:["autodocs"],render:()=>e.jsxs("div",{className:"grid w-80 gap-3",children:[e.jsx(a,{label:"Profile",shortcut:"P"}),e.jsx(a,{icon:e.jsx(f,{className:"size-4"}),label:"Account",shortcut:"A"})]})},n={play:async({canvasElement:s})=>{const t=h(s);await c(t.getByText("Profile")).toBeInTheDocument(),await c(t.getByText("Account")).toBeInTheDocument(),await c(t.getByText("P")).toBeInTheDocument()}};var r,i,m;n.parameters={...n.parameters,docs:{...(r=n.parameters)==null?void 0:r.docs,source:{originalSource:`{
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Profile')).toBeInTheDocument();
    await expect(canvas.getByText('Account')).toBeInTheDocument();
    await expect(canvas.getByText('P')).toBeInTheDocument();
  }
}`,...(m=(i=n.parameters)==null?void 0:i.docs)==null?void 0:m.source}}};const w=["Default"];export{n as Default,w as __namedExportsOrder,v as default};
