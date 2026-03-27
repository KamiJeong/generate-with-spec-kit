import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{B as r}from"./button-BZR5abGy.js";import{D as c,a as h,b as x,c as B,d as w,e as v}from"./dialog-UKOwXT5-.js";import{F as b}from"./field-BtZbgYMo.js";import{I as T}from"./input-T73Dfm3p.js";import"./index-D1SQP9Z-.js";import"./utils-BQHNewu7.js";import"./index-w9VdMtCx.js";import"./iframe-DbkQVXnW.js";import"./preload-helper-Dp1pzeXC.js";import"./x-CAUJzWuC.js";import"./createLucideIcon-C70vjQTX.js";import"./index-BSREP8AL.js";import"./index-GCRTAmoH.js";import"./index-C49Q2X48.js";import"./index-CTivEnE2.js";import"./index-BVnTzB98.js";import"./index-BDrHUf07.js";import"./index-BoarJmkW.js";import"./index-CHeuj1W8.js";import"./index-ubtiBORr.js";import"./index-D4Sy_61g.js";import"./index-ujLtpNxK.js";import"./index-BGWwd7pO.js";import"./index-A7AzpwxW.js";import"./label-B3xzkCEn.js";const{expect:t,userEvent:m,within:s}=__STORYBOOK_MODULE_TEST__,W={title:"Components/Dialog",component:c,tags:["autodocs"],render:()=>e.jsxs(c,{children:[e.jsx(h,{asChild:!0,children:e.jsx(r,{children:"Open dialog"})}),e.jsx(x,{children:e.jsxs(B,{children:[e.jsx(w,{children:"Dialog title"}),e.jsx(v,{children:"Dialog content"})]})})]})},i={play:async({canvasElement:o})=>{const l=s(o),a=s(o.ownerDocument.body);await m.click(l.getByRole("button",{name:"Open dialog"})),await t(await a.findByRole("dialog")).toBeInTheDocument(),await t(await a.findByText("Dialog title")).toBeInTheDocument(),await t(a.getByRole("button",{name:"Close"})).toHaveFocus(),await m.keyboard("{Escape}"),await t(a.queryByText("Dialog title")).not.toBeInTheDocument()}},n={name:"Dialog + Form",render:()=>e.jsxs(c,{children:[e.jsx(h,{asChild:!0,children:e.jsx(r,{children:"Create user"})}),e.jsxs(x,{children:[e.jsxs(B,{children:[e.jsx(w,{children:"Create user"}),e.jsx(v,{children:"Provide the required details."})]}),e.jsxs("div",{className:"grid gap-4",children:[e.jsx(b,{label:"Email",error:"Email is required",children:e.jsx(T,{"aria-label":"Email address",placeholder:"name@example.com"})}),e.jsxs("div",{className:"flex justify-end gap-2",children:[e.jsx(r,{variant:"outline",children:"Cancel"}),e.jsx(r,{children:"Save"})]})]})]})]}),play:async({canvasElement:o})=>{const l=s(o),a=s(o.ownerDocument.body);await m.click(l.getByRole("button",{name:"Create user"})),await t(await a.findByText("Email is required")).toBeInTheDocument(),await t(a.getByRole("button",{name:"Save"})).toBeInTheDocument()}};var d,p,u;i.parameters={...i.parameters,docs:{...(d=i.parameters)==null?void 0:d.docs,source:{originalSource:`{
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const body = within(canvasElement.ownerDocument.body);
    await userEvent.click(canvas.getByRole('button', {
      name: 'Open dialog'
    }));
    await expect(await body.findByRole('dialog')).toBeInTheDocument();
    await expect(await body.findByText('Dialog title')).toBeInTheDocument();
    await expect(body.getByRole('button', {
      name: 'Close'
    })).toHaveFocus();
    await userEvent.keyboard('{Escape}');
    await expect(body.queryByText('Dialog title')).not.toBeInTheDocument();
  }
}`,...(u=(p=i.parameters)==null?void 0:p.docs)==null?void 0:u.source}}};var g,D,y;n.parameters={...n.parameters,docs:{...(g=n.parameters)==null?void 0:g.docs,source:{originalSource:`{
  name: 'Dialog + Form',
  render: () => <Dialog>\r
      <DialogTrigger asChild>\r
        <Button>Create user</Button>\r
      </DialogTrigger>\r
      <DialogContent>\r
        <DialogHeader>\r
          <DialogTitle>Create user</DialogTitle>\r
          <DialogDescription>Provide the required details.</DialogDescription>\r
        </DialogHeader>\r
        <div className="grid gap-4">\r
          <Field label="Email" error="Email is required">\r
            <Input aria-label="Email address" placeholder="name@example.com" />\r
          </Field>\r
          <div className="flex justify-end gap-2">\r
            <Button variant="outline">Cancel</Button>\r
            <Button>Save</Button>\r
          </div>\r
        </div>\r
      </DialogContent>\r
    </Dialog>,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const body = within(canvasElement.ownerDocument.body);
    await userEvent.click(canvas.getByRole('button', {
      name: 'Create user'
    }));
    await expect(await body.findByText('Email is required')).toBeInTheDocument();
    await expect(body.getByRole('button', {
      name: 'Save'
    })).toBeInTheDocument();
  }
}`,...(y=(D=n.parameters)==null?void 0:D.docs)==null?void 0:y.source}}};const X=["Default","DialogFormComposition"];export{i as Default,n as DialogFormComposition,X as __namedExportsOrder,W as default};
