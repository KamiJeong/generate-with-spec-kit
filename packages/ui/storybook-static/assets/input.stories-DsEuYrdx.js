import{j as l}from"./jsx-runtime-D_zvdyIk.js";import{I as a}from"./input-T73Dfm3p.js";import"./utils-BQHNewu7.js";const{expect:p,userEvent:i,within:c}=__STORYBOOK_MODULE_TEST__,E={title:"Components/Input",component:a,tags:["autodocs"],render:()=>l.jsx(a,{"aria-label":"Email",placeholder:"Email"})},e={play:async({canvasElement:r})=>{const t=c(r).getByRole("textbox");await i.type(t,"hello"),await p(t).toHaveValue("hello")}};var n,o,s;e.parameters={...e.parameters,docs:{...(n=e.parameters)==null?void 0:n.docs,source:{originalSource:`{
  play: async ({
    canvasElement
  }) => {
    const input = within(canvasElement).getByRole('textbox');
    await userEvent.type(input, 'hello');
    await expect(input).toHaveValue('hello');
  }
}`,...(s=(o=e.parameters)==null?void 0:o.docs)==null?void 0:s.source}}};const d=["Default"];export{e as Default,d as __namedExportsOrder,E as default};
