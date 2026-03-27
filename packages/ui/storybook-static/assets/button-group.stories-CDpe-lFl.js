import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{B as a}from"./button-BZR5abGy.js";import{c as u}from"./utils-BQHNewu7.js";import"./index-D1SQP9Z-.js";import"./index-w9VdMtCx.js";import"./iframe-DbkQVXnW.js";import"./preload-helper-Dp1pzeXC.js";function o({className:r,orientation:t="horizontal",...m}){return e.jsx("div",{"data-slot":"button-group","data-orientation":t,className:u("inline-flex items-center gap-2",t==="vertical"&&"flex-col items-stretch",r),role:"group",...m})}o.__docgenInfo={description:"",methods:[],displayName:"ButtonGroup",props:{orientation:{required:!1,tsType:{name:"union",raw:"'horizontal' | 'vertical'",elements:[{name:"literal",value:"'horizontal'"},{name:"literal",value:"'vertical'"}]},description:"",defaultValue:{value:"'horizontal'",computed:!1}}}};const{expect:i,userEvent:d,within:p}=__STORYBOOK_MODULE_TEST__,f={title:"Components/ButtonGroup",component:o,tags:["autodocs"],render:()=>e.jsxs("div",{className:"grid gap-4",children:[e.jsxs(o,{children:[e.jsx(a,{children:"Primary"}),e.jsx(a,{variant:"outline",children:"Secondary"}),e.jsx(a,{disabled:!0,children:"Disabled"})]}),e.jsxs(o,{orientation:"vertical",className:"w-48",children:[e.jsx(a,{children:"Top"}),e.jsx(a,{variant:"outline",children:"Middle"}),e.jsx(a,{disabled:!0,children:"Bottom"})]})]})},n={play:async({canvasElement:r})=>{const t=p(r);await i(t.getByText("Primary")).toBeInTheDocument(),await i(t.getByText("Top")).toBeInTheDocument(),await d.click(t.getByRole("button",{name:"Primary"}))}};var s,c,l;n.parameters={...n.parameters,docs:{...(s=n.parameters)==null?void 0:s.docs,source:{originalSource:`{
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Primary')).toBeInTheDocument();
    await expect(canvas.getByText('Top')).toBeInTheDocument();
    await userEvent.click(canvas.getByRole('button', {
      name: 'Primary'
    }));
  }
}`,...(l=(c=n.parameters)==null?void 0:c.docs)==null?void 0:l.source}}};const j=["Default"];export{n as Default,j as __namedExportsOrder,f as default};
