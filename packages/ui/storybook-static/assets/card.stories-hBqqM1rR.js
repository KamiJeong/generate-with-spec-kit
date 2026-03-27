import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{B as i}from"./button-BZR5abGy.js";import{C as a,a as c,b as d,c as m,d as p,e as l}from"./card-BzpuUYH0.js";import"./index-D1SQP9Z-.js";import"./utils-BQHNewu7.js";import"./index-w9VdMtCx.js";import"./iframe-DbkQVXnW.js";import"./preload-helper-Dp1pzeXC.js";const{expect:x,within:C}=__STORYBOOK_MODULE_TEST__,D={title:"Components/Card",component:a,tags:["autodocs"],render:()=>e.jsxs(a,{className:"w-96",children:[e.jsxs(c,{children:[e.jsx(d,{children:"Card title"}),e.jsx(m,{children:"Card description"})]}),e.jsx(p,{children:"Card content"}),e.jsx(l,{children:e.jsx(i,{size:"sm",children:"Action"})})]})},t={play:async({canvasElement:o})=>{await x(C(o).getByText("Card title")).toBeInTheDocument()}};var r,s,n;t.parameters={...t.parameters,docs:{...(r=t.parameters)==null?void 0:r.docs,source:{originalSource:`{
  play: async ({
    canvasElement
  }) => {
    await expect(within(canvasElement).getByText('Card title')).toBeInTheDocument();
  }
}`,...(n=(s=t.parameters)==null?void 0:s.docs)==null?void 0:n.source}}};const E=["Default"];export{t as Default,E as __namedExportsOrder,D as default};
