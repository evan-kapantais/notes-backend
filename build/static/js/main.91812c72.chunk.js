(this.webpackJsonpnotes=this.webpackJsonpnotes||[]).push([[0],{24:function(t,n,e){},42:function(t,n,e){"use strict";e.r(n);var o=e(0),r=e(2),c=e.n(r),i=e(17),a=e.n(i),u=(e(24),e(18)),s=e(8),b=e(6),j=e(5),d=e.n(j),l="https://fast-chamber-86642.herokuapp.com/api/notes",m={getAll:function(){return d.a.get(l).then((function(t){return t.data}))},createNote:function(t){return d.a.post(l,t).then((function(t){return t.data}))},updateNote:function(t,n){return d.a.put("".concat(l,"/").concat(t),n).then((function(t){return t.data}))}},p=function(t){var n=t.note,e=t.toggleImportance,r=n.important?"make not important":"make important";return Object(o.jsxs)("li",{style:{maxWidth:350,marginBottom:"1rem",padding:"1rem",boxShadow:"1px 2px 2px rgba(0, 0, 0, 0.2)",borderRadius:3},children:[Object(o.jsx)("p",{style:{marginBottom:10},children:n.content}),Object(o.jsx)("button",{type:"button",onClick:e,children:r})]})},f=function(t){return Object(o.jsxs)("form",{onSubmit:t.handleSubmit,children:[Object(o.jsx)("input",{value:t.noteText,onChange:function(n){return t.setNoteText(n.target.value)},type:"text"}),Object(o.jsx)("button",{type:"submit",children:"Submit"})]})},h=function(){var t=Object(r.useState)([]),n=Object(b.a)(t,2),e=n[0],c=n[1],i=Object(r.useState)(""),a=Object(b.a)(i,2),j=a[0],d=a[1],l=Object(r.useState)(!0),h=Object(b.a)(l,2),x=h[0],O=h[1];Object(r.useEffect)((function(){setTimeout((function(){m.getAll().then((function(t){return c(t)}))}),1e3)}),[]);var g=function(t){var n=e.find((function(n){return n.id===t})),o=Object(s.a)(Object(s.a)({},n),{},{important:!n.important});m.updateNote(t,o).then((function(n){c(e.map((function(e){return e.id!==t?e:n})))})).catch((function(n){alert("The note with id ".concat(t," was not found"))})),c(e.filter((function(n){return n.id!==t})))};return Object(o.jsxs)("div",{style:{margin:"2rem"},children:[Object(o.jsx)("h1",{children:"Notes"}),Object(o.jsxs)("button",{style:{marginBottom:20},type:"botton",onClick:function(){return O(!x)},children:["Show ",x?"Important":"All"]}),Object(o.jsxs)("ul",{style:{listStyle:"none"},children:[0===e.length&&Object(o.jsx)("p",{children:"Loading notes..."}),x&&e.map((function(t){return Object(o.jsx)(p,{toggleImportance:function(){return g(t.id)},note:t},t.id)})),!x&&e.filter((function(t){return t.important})).map((function(t){return Object(o.jsx)(p,{toggleImportance:function(){return g(t.id)},note:t},t.id)}))]}),Object(o.jsx)(f,{handleSubmit:function(t){t.preventDefault();var n={content:j,important:Math.random()<.5};m.createNote(n).then((function(t){c([].concat(Object(u.a)(e),[t])),d("")}))},noteText:j,setNoteText:d})]})};a.a.render(Object(o.jsx)(c.a.StrictMode,{children:Object(o.jsx)(h,{})}),document.getElementById("root"))}},[[42,1,2]]]);
//# sourceMappingURL=main.91812c72.chunk.js.map