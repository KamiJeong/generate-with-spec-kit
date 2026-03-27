import{j as a}from"./jsx-runtime-D_zvdyIk.js";import{F as n}from"./field-BtZbgYMo.js";import{I as p}from"./input-T73Dfm3p.js";import"./iframe-DbkQVXnW.js";import"./preload-helper-Dp1pzeXC.js";import"./label-B3xzkCEn.js";import"./utils-BQHNewu7.js";import"./index-BoarJmkW.js";import"./index-CHeuj1W8.js";import"./index-ubtiBORr.js";import"./index-w9VdMtCx.js";const{expect:o,within:l}=__STORYBOOK_MODULE_TEST__,b={title:"Components/Field",component:n,tags:["autodocs"],render:()=>a.jsx(n,{label:"Email",error:"Required field",children:a.jsx(p,{"aria-label":"Email"})})},t={play:async({canvasElement:m})=>{const e=l(m),c=e.getByRole("textbox",{name:"Email"});await o(e.getByText("Required field")).toBeInTheDocument(),await o(c).toHaveAttribute("aria-invalid","true")}};var i,r,s;t.parameters={...t.parameters,docs:{...(i=t.parameters)==null?void 0:i.docs,source:{originalSource:`{
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('textbox', {
      name: 'Email'
    });
    await expect(canvas.getByText('Required field')).toBeInTheDocument();
    await expect(input).toHaveAttribute('aria-invalid', 'true');
  }
}`,...(s=(r=t.parameters)==null?void 0:r.docs)==null?void 0:s.source}}};const g=["Default"];export{t as Default,g as __namedExportsOrder,b as default};
