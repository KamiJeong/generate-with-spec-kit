import{j as t}from"./jsx-runtime-D_zvdyIk.js";import{P as n,a as m,b as e,c as p,d as i,e as l,f as x}from"./pagination-CDQyfugV.js";import"./button-BZR5abGy.js";import"./index-D1SQP9Z-.js";import"./utils-BQHNewu7.js";import"./index-w9VdMtCx.js";import"./iframe-DbkQVXnW.js";import"./preload-helper-Dp1pzeXC.js";import"./chevron-left-Bm3jT5NV.js";import"./createLucideIcon-C70vjQTX.js";import"./ellipsis-D9ggGc3f.js";import"./chevron-right-Bwsx0MMS.js";const{expect:d,within:h}=__STORYBOOK_MODULE_TEST__,b={title:"Components/Pagination",component:n,tags:["autodocs"],render:()=>t.jsx(n,{children:t.jsxs(m,{children:[t.jsx(e,{children:t.jsx(p,{href:"#"})}),t.jsx(e,{children:t.jsx(i,{href:"#",isActive:!0,children:"1"})}),t.jsx(e,{children:t.jsx(i,{href:"#",children:"2"})}),t.jsx(e,{children:t.jsx(l,{})}),t.jsx(e,{children:t.jsx(x,{href:"#"})})]})})},a={play:async({canvasElement:c})=>{await d(h(c).getByRole("link",{name:"1"})).toHaveAttribute("aria-current","page")}};var r,s,o;a.parameters={...a.parameters,docs:{...(r=a.parameters)==null?void 0:r.docs,source:{originalSource:`{
  play: async ({
    canvasElement
  }) => {
    await expect(within(canvasElement).getByRole('link', {
      name: '1'
    })).toHaveAttribute('aria-current', 'page');
  }
}`,...(o=(s=a.parameters)==null?void 0:s.docs)==null?void 0:o.source}}};const k=["Default"];export{a as Default,k as __namedExportsOrder,b as default};
