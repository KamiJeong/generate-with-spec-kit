import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{B as n}from"./button-BZR5abGy.js";import"./index-D1SQP9Z-.js";import"./utils-BQHNewu7.js";import"./index-w9VdMtCx.js";import"./iframe-DbkQVXnW.js";import"./preload-helper-Dp1pzeXC.js";const{expect:s,userEvent:d,within:m}=__STORYBOOK_MODULE_TEST__,y={title:"Components/Button",component:n,tags:["autodocs"],parameters:{docs:{description:{story:"Default and destructive variants resolve through token-backed theme variables such as `--color-primary` and `--color-destructive`."}}},render:()=>e.jsxs("div",{className:"flex gap-3",children:[e.jsx(n,{children:"Button"}),e.jsx(n,{disabled:!0,children:"Disabled"})]})},t={play:async({canvasElement:l})=>{const a=m(l),o=a.getByRole("button",{name:"Button"}),u=a.getByRole("button",{name:"Disabled"});await d.click(o),await s(o).toBeInTheDocument(),await s(u).toBeDisabled()}};var r,c,i;t.parameters={...t.parameters,docs:{...(r=t.parameters)==null?void 0:r.docs,source:{originalSource:`{
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', {
      name: 'Button'
    });
    const disabledButton = canvas.getByRole('button', {
      name: 'Disabled'
    });
    await userEvent.click(button);
    await expect(button).toBeInTheDocument();
    await expect(disabledButton).toBeDisabled();
  }
}`,...(i=(c=t.parameters)==null?void 0:c.docs)==null?void 0:i.source}}};const g=["Default"];export{t as Default,g as __namedExportsOrder,y as default};
