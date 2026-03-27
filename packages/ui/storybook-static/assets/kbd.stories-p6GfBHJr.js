import{j as a}from"./jsx-runtime-D_zvdyIk.js";import{c as i}from"./utils-BQHNewu7.js";function n({className:o,...e}){return a.jsx("kbd",{"data-slot":"kbd",className:i("inline-flex min-h-6 items-center rounded-md border bg-muted px-2 font-mono text-xs font-medium text-muted-foreground shadow-xs",o),...e})}n.__docgenInfo={description:"",methods:[],displayName:"Kbd"};const{expect:s,within:d}=__STORYBOOK_MODULE_TEST__,p={title:"Components/Kbd",component:n,tags:["autodocs"],render:()=>a.jsxs("div",{className:"flex gap-3",children:[a.jsx(n,{children:"K"}),a.jsx(n,{children:"Shift + K"})]})},t={play:async({canvasElement:o})=>{const e=d(o);await s(e.getAllByText(/K/)[0].tagName).toBe("KBD"),await s(e.getByText("K")).toBeInTheDocument(),await s(e.getByText("Shift + K")).toBeInTheDocument()}};var c,r,m;t.parameters={...t.parameters,docs:{...(c=t.parameters)==null?void 0:c.docs,source:{originalSource:`{
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getAllByText(/K/)[0].tagName).toBe('KBD');
    await expect(canvas.getByText('K')).toBeInTheDocument();
    await expect(canvas.getByText('Shift + K')).toBeInTheDocument();
  }
}`,...(m=(r=t.parameters)==null?void 0:r.docs)==null?void 0:m.source}}};const u=["Default"];export{t as Default,u as __namedExportsOrder,p as default};
