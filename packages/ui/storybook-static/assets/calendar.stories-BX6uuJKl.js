import{j as g}from"./jsx-runtime-D_zvdyIk.js";import{r as y}from"./iframe-DbkQVXnW.js";import{C as r}from"./calendar-D7U-r-5-.js";import"./preload-helper-Dp1pzeXC.js";import"./button-BZR5abGy.js";import"./index-D1SQP9Z-.js";import"./utils-BQHNewu7.js";import"./index-w9VdMtCx.js";import"./chevron-left-Bm3jT5NV.js";import"./createLucideIcon-C70vjQTX.js";import"./chevron-right-Bwsx0MMS.js";import"./chevron-down-DiXGYKpU.js";const{expect:o,userEvent:w,within:d}=__STORYBOOK_MODULE_TEST__,T={title:"Components/Calendar",component:r,tags:["autodocs"],render:()=>{const[e,t]=y.useState(new Date(2026,2,27));return g.jsx(r,{mode:"single",selected:e,onSelect:t})}},n={play:async({canvasElement:e})=>{const t=d(e),u=t.getByRole("button",{name:/28/});await o(t.getByRole("grid")).toBeInTheDocument(),await w.click(u),await o(t.getByRole("button",{name:/28/})).toHaveAttribute("data-selected-single","true")}},a={args:{mode:"range",selected:{from:new Date(2026,2,24),to:new Date(2026,2,29)},numberOfMonths:2},play:async({canvasElement:e})=>{await o(d(e).getAllByRole("grid").length).toBeGreaterThan(0)}};var s,c,m;n.parameters={...n.parameters,docs:{...(s=n.parameters)==null?void 0:s.docs,source:{originalSource:`{
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const nextDay = canvas.getByRole('button', {
      name: /28/
    });
    await expect(canvas.getByRole('grid')).toBeInTheDocument();
    await userEvent.click(nextDay);
    await expect(canvas.getByRole('button', {
      name: /28/
    })).toHaveAttribute('data-selected-single', 'true');
  }
}`,...(m=(c=n.parameters)==null?void 0:c.docs)==null?void 0:m.source}}};var i,l,p;a.parameters={...a.parameters,docs:{...(i=a.parameters)==null?void 0:i.docs,source:{originalSource:`{
  args: {
    mode: 'range',
    selected: {
      from: new Date(2026, 2, 24),
      to: new Date(2026, 2, 29)
    },
    numberOfMonths: 2
  },
  play: async ({
    canvasElement
  }) => {
    await expect(within(canvasElement).getAllByRole('grid').length).toBeGreaterThan(0);
  }
}`,...(p=(l=a.parameters)==null?void 0:l.docs)==null?void 0:p.source}}};const A=["Default","Range"];export{n as Default,a as Range,A as __namedExportsOrder,T as default};
