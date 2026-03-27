import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{C as o,a as l,b as h,c as u,d as r,e as t,f as s,g as x}from"./command-DjQ73hv9.js";import"./index-BSREP8AL.js";import"./iframe-DbkQVXnW.js";import"./preload-helper-Dp1pzeXC.js";import"./index-GCRTAmoH.js";import"./index-C49Q2X48.js";import"./index-w9VdMtCx.js";import"./index-CTivEnE2.js";import"./index-BVnTzB98.js";import"./index-BDrHUf07.js";import"./index-BoarJmkW.js";import"./index-CHeuj1W8.js";import"./index-ubtiBORr.js";import"./index-D4Sy_61g.js";import"./index-ujLtpNxK.js";import"./index-BGWwd7pO.js";import"./index-A7AzpwxW.js";import"./utils-BQHNewu7.js";import"./createLucideIcon-C70vjQTX.js";const{expect:C,userEvent:j,within:g}=__STORYBOOK_MODULE_TEST__,U={title:"Components/Command",component:o,tags:["autodocs"],render:()=>e.jsxs(o,{className:"rounded-lg border shadow-md md:min-w-[420px]",children:[e.jsx(l,{placeholder:"Search commands..."}),e.jsxs(h,{children:[e.jsx(u,{children:"No results found."}),e.jsxs(r,{heading:"Suggestions",children:[e.jsxs(t,{value:"calendar",children:["Calendar",e.jsx(s,{children:"G C"})]}),e.jsxs(t,{value:"search",children:["Search",e.jsx(s,{children:"G S"})]})]}),e.jsx(x,{}),e.jsx(r,{heading:"Settings",children:e.jsx(t,{value:"profile",children:"Profile"})})]})]})},a={play:async({canvasElement:d})=>{const n=g(d),p=n.getByPlaceholderText("Search commands...");await j.type(p,"cal"),await C(n.getByText("Calendar")).toBeInTheDocument()}};var m,c,i;a.parameters={...a.parameters,docs:{...(m=a.parameters)==null?void 0:m.docs,source:{originalSource:`{
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByPlaceholderText('Search commands...');
    await userEvent.type(input, 'cal');
    await expect(canvas.getByText('Calendar')).toBeInTheDocument();
  }
}`,...(i=(c=a.parameters)==null?void 0:c.docs)==null?void 0:i.source}}};const Y=["Default"];export{a as Default,Y as __namedExportsOrder,U as default};
