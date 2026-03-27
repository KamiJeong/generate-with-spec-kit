import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{I as s}from"./input-T73Dfm3p.js";import{L as i}from"./label-B3xzkCEn.js";import"./utils-BQHNewu7.js";import"./iframe-DbkQVXnW.js";import"./preload-helper-Dp1pzeXC.js";import"./index-BoarJmkW.js";import"./index-CHeuj1W8.js";import"./index-ubtiBORr.js";import"./index-w9VdMtCx.js";const{expect:n,within:l}=__STORYBOOK_MODULE_TEST__,j={title:"Components/Label",component:i,tags:["autodocs"],render:()=>e.jsxs("div",{className:"grid gap-4",children:[e.jsxs("div",{className:"grid gap-2",children:[e.jsx(i,{htmlFor:"email",children:"Email"}),e.jsx(s,{id:"email","aria-label":"Email"})]}),e.jsxs("div",{className:"grid gap-2",children:[e.jsxs(i,{htmlFor:"required-field",children:["Required ",e.jsx("span",{className:"text-destructive",children:"*"})]}),e.jsx(s,{id:"required-field","aria-label":"Required"})]})]})},a={play:async({canvasElement:m})=>{const t=l(m);await n(t.getByText("Email")).toBeInTheDocument(),await n(t.getByText("Required")).toBeInTheDocument(),await n(t.getByLabelText("Email")).toBeInTheDocument()}};var r,o,c;a.parameters={...a.parameters,docs:{...(r=a.parameters)==null?void 0:r.docs,source:{originalSource:`{
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Email')).toBeInTheDocument();
    await expect(canvas.getByText('Required')).toBeInTheDocument();
    await expect(canvas.getByLabelText('Email')).toBeInTheDocument();
  }
}`,...(c=(o=a.parameters)==null?void 0:o.docs)==null?void 0:c.source}}};const y=["Default"];export{a as Default,y as __namedExportsOrder,j as default};
