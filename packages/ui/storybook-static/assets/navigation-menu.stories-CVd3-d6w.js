import{j as t}from"./jsx-runtime-D_zvdyIk.js";import{N as n,a as c,b as m,c as p,d as l,e as d}from"./navigation-menu-DCrp7lPO.js";import"./index-D1SQP9Z-.js";import"./utils-BQHNewu7.js";import"./chevron-down-DiXGYKpU.js";import"./createLucideIcon-C70vjQTX.js";import"./iframe-DbkQVXnW.js";import"./preload-helper-Dp1pzeXC.js";import"./index-CHeuj1W8.js";import"./index-ubtiBORr.js";import"./index-CTivEnE2.js";import"./index-GCRTAmoH.js";import"./index-C49Q2X48.js";import"./index-BoarJmkW.js";import"./index-w9VdMtCx.js";import"./index-CZ4X0Sbg.js";import"./index-A7AzpwxW.js";import"./index-BVnTzB98.js";import"./index-BDrHUf07.js";import"./index-D4Sy_61g.js";import"./index-CnP8QKve.js";const{expect:u,userEvent:x,within:v}=__STORYBOOK_MODULE_TEST__,P={title:"Components/NavigationMenu",component:n,tags:["autodocs"],render:()=>t.jsx(n,{viewport:!1,children:t.jsx(c,{children:t.jsxs(m,{children:[t.jsx(p,{children:"Products"}),t.jsx(l,{children:t.jsx("ul",{className:"grid gap-2 p-2 md:w-[320px]",children:t.jsx("li",{children:t.jsxs(d,{href:"#",children:[t.jsx("span",{className:"font-medium",children:"UI Kit"}),t.jsx("span",{className:"text-muted-foreground",children:"Reusable interface primitives"})]})})})})]})})})},e={play:async({canvasElement:s})=>{const a=v(s);await x.click(a.getByRole("button",{name:"Products"})),await u(await a.findByText("UI Kit")).toBeInTheDocument()}};var i,o,r;e.parameters={...e.parameters,docs:{...(i=e.parameters)==null?void 0:i.docs,source:{originalSource:`{
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', {
      name: 'Products'
    }));
    await expect(await canvas.findByText('UI Kit')).toBeInTheDocument();
  }
}`,...(r=(o=e.parameters)==null?void 0:o.docs)==null?void 0:r.source}}};const S=["Default"];export{e as Default,S as __namedExportsOrder,P as default};
