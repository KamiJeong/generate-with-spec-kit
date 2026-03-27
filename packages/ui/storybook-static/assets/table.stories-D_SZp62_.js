import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{T as r,a as h,b as m,c as s,d as n,e as j,f as a}from"./table-DM31YIq1.js";import"./utils-BQHNewu7.js";const{expect:o,within:p}=__STORYBOOK_MODULE_TEST__,g={title:"Components/Table",component:r,tags:["autodocs"],render:()=>e.jsxs(r,{children:[e.jsx(h,{children:"Recent invoices"}),e.jsx(m,{children:e.jsxs(s,{children:[e.jsx(n,{children:"Invoice"}),e.jsx(n,{children:"Status"}),e.jsx(n,{className:"text-right",children:"Amount"})]})}),e.jsxs(j,{children:[e.jsxs(s,{children:[e.jsx(a,{children:"INV-001"}),e.jsx(a,{children:"Paid"}),e.jsx(a,{className:"text-right",children:"$250.00"})]}),e.jsxs(s,{children:[e.jsx(a,{children:"INV-002"}),e.jsx(a,{children:"Pending"}),e.jsx(a,{className:"text-right",children:"$150.00"})]})]})]})},t={play:async({canvasElement:x})=>{const c=p(x);await o(c.getByRole("table")).toBeInTheDocument(),await o(c.getByText("INV-001")).toBeInTheDocument()}};var l,i,d;t.parameters={...t.parameters,docs:{...(l=t.parameters)==null?void 0:l.docs,source:{originalSource:`{
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('table')).toBeInTheDocument();
    await expect(canvas.getByText('INV-001')).toBeInTheDocument();
  }
}`,...(d=(i=t.parameters)==null?void 0:i.docs)==null?void 0:d.source}}};const B=["Default"];export{t as Default,B as __namedExportsOrder,g as default};
