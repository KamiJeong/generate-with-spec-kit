import{j as i}from"./jsx-runtime-D_zvdyIk.js";import{c as m}from"./utils-BQHNewu7.js";import{L as c}from"./loader-circle-zDUiR7Z-.js";import"./createLucideIcon-C70vjQTX.js";import"./iframe-DbkQVXnW.js";import"./preload-helper-Dp1pzeXC.js";function t({className:n,size:e="default",...l}){return i.jsx(c,{"data-slot":"spinner","aria-label":"Loading",className:m("animate-spin text-primary",e==="sm"&&"size-4",e==="default"&&"size-5",e==="lg"&&"size-6",n),...l})}t.__docgenInfo={description:"",methods:[],displayName:"Spinner",props:{size:{required:!1,tsType:{name:"union",raw:"'sm' | 'default' | 'lg'",elements:[{name:"literal",value:"'sm'"},{name:"literal",value:"'default'"},{name:"literal",value:"'lg'"}]},description:"",defaultValue:{value:"'default'",computed:!1}}}};const{expect:p,within:d}=__STORYBOOK_MODULE_TEST__,y={title:"Components/Spinner",component:t,tags:["autodocs"]},a={render:()=>i.jsx(t,{}),play:async({canvasElement:n})=>{const e=d(n);await p(e.getByLabelText("Loading")).toBeInTheDocument()}};var s,r,o;a.parameters={...a.parameters,docs:{...(s=a.parameters)==null?void 0:s.docs,source:{originalSource:`{
  render: () => <Spinner />,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByLabelText('Loading')).toBeInTheDocument();
  }
}`,...(o=(r=a.parameters)==null?void 0:r.docs)==null?void 0:o.source}}};const L=["Default"];export{a as Default,L as __namedExportsOrder,y as default};
