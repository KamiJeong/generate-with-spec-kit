import{j as a}from"./jsx-runtime-D_zvdyIk.js";import{B as T}from"./button-BZR5abGy.js";import{C as y,a as P,b as v,d as B}from"./card-BzpuUYH0.js";import{D as o}from"./data-table-iUXRPT14.js";import{P as w,a as b,b as s,d as c}from"./pagination-CDQyfugV.js";import"./index-D1SQP9Z-.js";import"./utils-BQHNewu7.js";import"./index-w9VdMtCx.js";import"./iframe-DbkQVXnW.js";import"./preload-helper-Dp1pzeXC.js";import"./input-T73Dfm3p.js";import"./table-DM31YIq1.js";import"./chevron-left-Bm3jT5NV.js";import"./createLucideIcon-C70vjQTX.js";import"./ellipsis-D9ggGc3f.js";import"./chevron-right-Bwsx0MMS.js";const{expect:i,userEvent:j,within:u}=__STORYBOOK_MODULE_TEST__,h=[{id:"1",name:"Alice",email:"alice@example.com"},{id:"2",name:"Bob",email:"bob@example.com"}],C=[{accessorKey:"name",header:({column:e})=>a.jsx(T,{variant:"ghost",size:"sm",onClick:()=>e.toggleSorting(e.getIsSorted()==="asc"),children:"Name"})},{accessorKey:"email",header:"Email"}],M={title:"Components/DataTable",component:o,tags:["autodocs"],render:()=>a.jsx(o,{columns:C,data:h,searchKey:"name",pageSize:1})},n={play:async({canvasElement:e})=>{const t=u(e);await i(t.getByText("Alice")).toBeInTheDocument(),await j.click(t.getByRole("button",{name:"Name"})),await i(t.getByText("Alice")).toBeInTheDocument()}},r={name:"Card + DataTable + Pagination",render:()=>a.jsxs(y,{className:"w-full max-w-2xl",children:[a.jsx(P,{children:a.jsx(v,{children:"Users"})}),a.jsxs(B,{className:"grid gap-4",children:[a.jsx(o,{columns:C,data:h,searchKey:"name",pageSize:1}),a.jsx(w,{children:a.jsxs(b,{children:[a.jsx(s,{children:a.jsx(c,{href:"#",isActive:!0,children:"1"})}),a.jsx(s,{children:a.jsx(c,{href:"#",children:"2"})})]})})]})]}),play:async({canvasElement:e})=>{const t=u(e);await i(t.getByText("Users")).toBeInTheDocument(),await i(t.getByRole("link",{name:"1"})).toHaveAttribute("aria-current","page")}};var m,l,d;n.parameters={...n.parameters,docs:{...(m=n.parameters)==null?void 0:m.docs,source:{originalSource:`{
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Alice')).toBeInTheDocument();
    await userEvent.click(canvas.getByRole('button', {
      name: 'Name'
    }));
    await expect(canvas.getByText('Alice')).toBeInTheDocument();
  }
}`,...(d=(l=n.parameters)==null?void 0:l.docs)==null?void 0:d.source}}};var p,g,x;r.parameters={...r.parameters,docs:{...(p=r.parameters)==null?void 0:p.docs,source:{originalSource:`{
  name: 'Card + DataTable + Pagination',
  render: () => <Card className="w-full max-w-2xl">\r
      <CardHeader>\r
        <CardTitle>Users</CardTitle>\r
      </CardHeader>\r
      <CardContent className="grid gap-4">\r
        <DataTable columns={columns} data={data} searchKey="name" pageSize={1} />\r
        <Pagination>\r
          <PaginationContent>\r
            <PaginationItem>\r
              <PaginationLink href="#" isActive>\r
                1\r
              </PaginationLink>\r
            </PaginationItem>\r
            <PaginationItem>\r
              <PaginationLink href="#">2</PaginationLink>\r
            </PaginationItem>\r
          </PaginationContent>\r
        </Pagination>\r
      </CardContent>\r
    </Card>,
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Users')).toBeInTheDocument();
    await expect(canvas.getByRole('link', {
      name: '1'
    })).toHaveAttribute('aria-current', 'page');
  }
}`,...(x=(g=r.parameters)==null?void 0:g.docs)==null?void 0:x.source}}};const Y=["Default","CardTablePaginationComposition"];export{r as CardTablePaginationComposition,n as Default,Y as __namedExportsOrder,M as default};
