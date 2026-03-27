import{j as t}from"./jsx-runtime-D_zvdyIk.js";import{B as p}from"./button-BZR5abGy.js";import{R as m,C as d,a as u}from"./index-BEQaYejZ.js";import"./index-D1SQP9Z-.js";import"./utils-BQHNewu7.js";import"./index-w9VdMtCx.js";import"./iframe-DbkQVXnW.js";import"./preload-helper-Dp1pzeXC.js";import"./index-GCRTAmoH.js";import"./index-C49Q2X48.js";import"./index-CTivEnE2.js";import"./index-BoarJmkW.js";import"./index-CHeuj1W8.js";import"./index-ubtiBORr.js";import"./index-A7AzpwxW.js";import"./index-BVnTzB98.js";function n({...e}){return t.jsx(m,{"data-slot":"collapsible",...e})}function r({...e}){return t.jsx(d,{"data-slot":"collapsible-trigger",...e})}function c({...e}){return t.jsx(u,{"data-slot":"collapsible-content",...e})}n.__docgenInfo={description:"",methods:[],displayName:"Collapsible"};c.__docgenInfo={description:"",methods:[],displayName:"CollapsibleContent"};r.__docgenInfo={description:"",methods:[],displayName:"CollapsibleTrigger"};const{expect:g,userEvent:b,within:x}=__STORYBOOK_MODULE_TEST__,H={title:"Components/Collapsible",component:n,tags:["autodocs"],render:()=>t.jsxs(n,{className:"w-80 space-y-2",defaultOpen:!1,children:[t.jsx(r,{asChild:!0,children:t.jsx(p,{variant:"outline",children:"Toggle details"})}),t.jsx(c,{className:"rounded-md border p-4 text-sm",children:"Hidden content is now visible."})]})},o={play:async({canvasElement:e})=>{const a=x(e);await b.click(a.getByRole("button",{name:"Toggle details"})),await g(a.getByText("Hidden content is now visible.")).toBeInTheDocument()}};var s,i,l;o.parameters={...o.parameters,docs:{...(s=o.parameters)==null?void 0:s.docs,source:{originalSource:`{
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', {
      name: 'Toggle details'
    }));
    await expect(canvas.getByText('Hidden content is now visible.')).toBeInTheDocument();
  }
}`,...(l=(i=o.parameters)==null?void 0:i.docs)==null?void 0:l.source}}};const S=["Default"];export{o as Default,S as __namedExportsOrder,H as default};
