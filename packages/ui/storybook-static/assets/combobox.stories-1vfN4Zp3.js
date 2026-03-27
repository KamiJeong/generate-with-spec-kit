import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{r as B}from"./iframe-DbkQVXnW.js";import{B as E}from"./button-BZR5abGy.js";import{C as F,a as S,b as _,c as D,d as k,e as q}from"./command-DjQ73hv9.js";import{P as A,a as I,b as N}from"./popover-BQ7RkCkS.js";import{c as x}from"./utils-BQHNewu7.js";import{c as O}from"./createLucideIcon-C70vjQTX.js";import{C as R}from"./check-BhLSdPqn.js";import{F as H}from"./field-BtZbgYMo.js";import"./preload-helper-Dp1pzeXC.js";import"./index-D1SQP9Z-.js";import"./index-w9VdMtCx.js";import"./index-BSREP8AL.js";import"./index-GCRTAmoH.js";import"./index-C49Q2X48.js";import"./index-CTivEnE2.js";import"./index-BVnTzB98.js";import"./index-BDrHUf07.js";import"./index-BoarJmkW.js";import"./index-CHeuj1W8.js";import"./index-ubtiBORr.js";import"./index-D4Sy_61g.js";import"./index-ujLtpNxK.js";import"./index-BGWwd7pO.js";import"./index-A7AzpwxW.js";import"./index-BgPbOraK.js";import"./index-BPVtdLvp.js";import"./label-B3xzkCEn.js";/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const P=[["path",{d:"m7 15 5 5 5-5",key:"1hf1tw"}],["path",{d:"m7 9 5-5 5 5",key:"sgt6xg"}]],L=O("chevrons-up-down",P);function i({className:o,options:a,value:n,onValueChange:p,placeholder:u="Select an option","aria-label":T}){const[d,b]=B.useState(!1),c=a.find(t=>t.value===n);return e.jsxs(A,{open:d,onOpenChange:b,children:[e.jsx(I,{asChild:!0,children:e.jsxs(E,{variant:"outline",role:"combobox","aria-expanded":d,"aria-label":T??u,className:x("w-full justify-between",o),children:[(c==null?void 0:c.label)??u,e.jsx(L,{className:"opacity-50"})]})}),e.jsx(N,{className:"w-[var(--radix-popover-trigger-width)] p-0",children:e.jsxs(F,{children:[e.jsx(S,{placeholder:"Search..."}),e.jsxs(_,{children:[e.jsx(D,{children:"No results found."}),e.jsx(k,{children:a.map(t=>e.jsxs(q,{value:t.value,onSelect:j=>{p==null||p(j),b(!1)},children:[t.label,e.jsx(R,{className:x("ml-auto",n===t.value?"opacity-100":"opacity-0")})]},t.value))})]})]})})]})}i.__docgenInfo={description:"",methods:[],displayName:"Combobox",props:{className:{required:!1,tsType:{name:"string"},description:""},options:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
  label: string;
  value: string;
}`,signature:{properties:[{key:"label",value:{name:"string",required:!0}},{key:"value",value:{name:"string",required:!0}}]}}],raw:"ComboboxOption[]"},description:""},value:{required:!1,tsType:{name:"string"},description:""},onValueChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(value: string) => void",signature:{arguments:[{type:{name:"string"},name:"value"}],return:{name:"void"}}},description:""},placeholder:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'Select an option'",computed:!1}},"aria-label":{required:!1,tsType:{name:"string"},description:""}}};const{expect:l,userEvent:v,within:m}=__STORYBOOK_MODULE_TEST__,xe={title:"Components/Combobox",component:i,tags:["autodocs"],render:()=>{const[o,a]=B.useState();return e.jsx(i,{"aria-label":"Select fruit",options:[{label:"Apple",value:"apple"},{label:"Banana",value:"banana"}],placeholder:"Select fruit",value:o,onValueChange:a})}},r={play:async({canvasElement:o})=>{const a=m(o),n=m(o.ownerDocument.body);await v.click(a.getByRole("combobox")),await l(await n.findByText("Apple")).toBeInTheDocument(),await v.click(n.getByText("Banana")),await l(a.getByRole("combobox")).toHaveTextContent(/Banana/)}},s={name:"Combobox + Field",render:()=>e.jsx(H,{label:"Fruit",error:"Choose an option",children:e.jsx(i,{"aria-label":"Fruit selector",options:[{label:"Apple",value:"apple"},{label:"Banana",value:"banana"}],value:"apple"})}),play:async({canvasElement:o})=>{const a=m(o);await l(a.getByText("Choose an option")).toBeInTheDocument(),await l(a.getByRole("combobox")).toHaveTextContent("Apple")}};var y,g,f;r.parameters={...r.parameters,docs:{...(y=r.parameters)==null?void 0:y.docs,source:{originalSource:`{
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const body = within(canvasElement.ownerDocument.body);
    await userEvent.click(canvas.getByRole('combobox'));
    await expect(await body.findByText('Apple')).toBeInTheDocument();
    await userEvent.click(body.getByText('Banana'));
    await expect(canvas.getByRole('combobox')).toHaveTextContent(/Banana/);
  }
}`,...(f=(g=r.parameters)==null?void 0:g.docs)==null?void 0:f.source}}};var h,C,w;s.parameters={...s.parameters,docs:{...(h=s.parameters)==null?void 0:h.docs,source:{originalSource:`{
  name: 'Combobox + Field',
  render: () => <Field label="Fruit" error="Choose an option">\r
      <Combobox aria-label="Fruit selector" options={[{
      label: 'Apple',
      value: 'apple'
    }, {
      label: 'Banana',
      value: 'banana'
    }]} value="apple" />\r
    </Field>,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Choose an option')).toBeInTheDocument();
    await expect(canvas.getByRole('combobox')).toHaveTextContent('Apple');
  }
}`,...(w=(C=s.parameters)==null?void 0:C.docs)==null?void 0:w.source}}};const ve=["Default","ComboboxFieldComposition"];export{s as ComboboxFieldComposition,r as Default,ve as __namedExportsOrder,xe as default};
