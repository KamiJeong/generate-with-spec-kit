import{j as t}from"./jsx-runtime-D_zvdyIk.js";import{B as c}from"./button-BZR5abGy.js";import{P as n,a as l,b as d,c as v,d as u,e as h}from"./popover-BQ7RkCkS.js";import"./index-D1SQP9Z-.js";import"./utils-BQHNewu7.js";import"./index-w9VdMtCx.js";import"./iframe-DbkQVXnW.js";import"./preload-helper-Dp1pzeXC.js";import"./index-GCRTAmoH.js";import"./index-C49Q2X48.js";import"./index-CTivEnE2.js";import"./index-BDrHUf07.js";import"./index-BoarJmkW.js";import"./index-CHeuj1W8.js";import"./index-ubtiBORr.js";import"./index-D4Sy_61g.js";import"./index-ujLtpNxK.js";import"./index-BVnTzB98.js";import"./index-BgPbOraK.js";import"./index-BPVtdLvp.js";import"./index-BGWwd7pO.js";import"./index-A7AzpwxW.js";const{expect:x,userEvent:y,within:r}=__STORYBOOK_MODULE_TEST__,Y={title:"Components/Popover",component:n,tags:["autodocs"],render:()=>t.jsxs(n,{children:[t.jsx(l,{asChild:!0,children:t.jsx(c,{variant:"outline",children:"Open popover"})}),t.jsx(d,{children:t.jsxs(v,{children:[t.jsx(u,{children:"Invite teammates"}),t.jsx(h,{children:"Share a project link with collaborators."})]})})]})},e={play:async({canvasElement:o})=>{const p=r(o),m=r(o.ownerDocument.body);await y.click(p.getByRole("button",{name:"Open popover"})),await x(await m.findByText("Invite teammates")).toBeInTheDocument()}};var a,i,s;e.parameters={...e.parameters,docs:{...(a=e.parameters)==null?void 0:a.docs,source:{originalSource:`{
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const body = within(canvasElement.ownerDocument.body);
    await userEvent.click(canvas.getByRole('button', {
      name: 'Open popover'
    }));
    await expect(await body.findByText('Invite teammates')).toBeInTheDocument();
  }
}`,...(s=(i=e.parameters)==null?void 0:i.docs)==null?void 0:s.source}}};const q=["Default"];export{e as Default,q as __namedExportsOrder,Y as default};
