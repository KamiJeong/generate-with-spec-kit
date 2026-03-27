import{j as t}from"./jsx-runtime-D_zvdyIk.js";import{B as c}from"./button-BZR5abGy.js";import{S as n,a as d,b as l,c as h,d as u,e as x}from"./sheet-BQ6-ZQqu.js";import"./index-D1SQP9Z-.js";import"./utils-BQHNewu7.js";import"./index-w9VdMtCx.js";import"./iframe-DbkQVXnW.js";import"./preload-helper-Dp1pzeXC.js";import"./x-CAUJzWuC.js";import"./createLucideIcon-C70vjQTX.js";import"./index-BSREP8AL.js";import"./index-GCRTAmoH.js";import"./index-C49Q2X48.js";import"./index-CTivEnE2.js";import"./index-BVnTzB98.js";import"./index-BDrHUf07.js";import"./index-BoarJmkW.js";import"./index-CHeuj1W8.js";import"./index-ubtiBORr.js";import"./index-D4Sy_61g.js";import"./index-ujLtpNxK.js";import"./index-BGWwd7pO.js";import"./index-A7AzpwxW.js";const{expect:y,userEvent:f,within:r}=__STORYBOOK_MODULE_TEST__,z={title:"Components/Sheet",component:n,tags:["autodocs"],render:()=>t.jsxs(n,{children:[t.jsx(d,{asChild:!0,children:t.jsx(c,{variant:"outline",children:"Open sheet"})}),t.jsx(l,{children:t.jsxs(h,{children:[t.jsx(u,{children:"Edit profile"}),t.jsx(x,{children:"Update your personal details."})]})})]})},e={play:async({canvasElement:o})=>{const p=r(o),m=r(o.ownerDocument.body);await f.click(p.getByRole("button",{name:"Open sheet"})),await y(await m.findByText("Edit profile")).toBeInTheDocument()}};var i,a,s;e.parameters={...e.parameters,docs:{...(i=e.parameters)==null?void 0:i.docs,source:{originalSource:`{
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const body = within(canvasElement.ownerDocument.body);
    await userEvent.click(canvas.getByRole('button', {
      name: 'Open sheet'
    }));
    await expect(await body.findByText('Edit profile')).toBeInTheDocument();
  }
}`,...(s=(a=e.parameters)==null?void 0:a.docs)==null?void 0:s.source}}};const A=["Default"];export{e as Default,A as __namedExportsOrder,z as default};
