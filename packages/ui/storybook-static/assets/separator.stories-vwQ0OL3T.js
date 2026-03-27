import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{S as n}from"./separator-Cgiv2Oaa.js";import"./utils-BQHNewu7.js";import"./iframe-DbkQVXnW.js";import"./preload-helper-Dp1pzeXC.js";import"./index-BoarJmkW.js";import"./index-CHeuj1W8.js";import"./index-ubtiBORr.js";import"./index-w9VdMtCx.js";const{expect:s,within:p}=__STORYBOOK_MODULE_TEST__,u={title:"Components/Separator",component:n,tags:["autodocs"],render:()=>e.jsxs("div",{className:"grid gap-4",children:[e.jsxs("div",{className:"w-64 space-y-2",children:[e.jsx("div",{children:"Top"}),e.jsx(n,{decorative:!1}),e.jsx("div",{children:"Bottom"})]}),e.jsxs("div",{className:"flex h-12 items-center gap-3",children:[e.jsx("span",{children:"Left"}),e.jsx(n,{decorative:!1,orientation:"vertical"}),e.jsx("span",{children:"Right"})]})]})},t={play:async({canvasElement:i})=>{const a=p(i);await s(a.getByText("Top")).toBeInTheDocument(),await s(a.getByText("Right")).toBeInTheDocument(),await s(a.getAllByRole("separator").length).toBeGreaterThan(0)}};var o,r,c;t.parameters={...t.parameters,docs:{...(o=t.parameters)==null?void 0:o.docs,source:{originalSource:`{
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Top')).toBeInTheDocument();
    await expect(canvas.getByText('Right')).toBeInTheDocument();
    await expect(canvas.getAllByRole('separator').length).toBeGreaterThan(0);
  }
}`,...(c=(r=t.parameters)==null?void 0:r.docs)==null?void 0:c.source}}};const j=["Default"];export{t as Default,j as __namedExportsOrder,u as default};
