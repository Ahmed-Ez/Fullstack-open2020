(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{14:function(e,t,n){e.exports=n(37)},36:function(e,t,n){},37:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),c=n(13),u=n.n(c),o=n(2),l=n(3),i=n.n(l),m="https://sheltered-earth-74112.herokuapp.com/api/persons",s=function(){return i.a.get(m).then((function(e){return e.data}))},d=function(e){return i.a.post(m,e).then((function(e){return e.data}))},f=function(e){return i.a.delete("".concat(m,"/").concat(e))},p=function(e,t){return i.a.put("".concat(m,"/").concat(e),t).then((function(e){return e.data}))},h=function(e){var t=e.formHandler,n=e.inputHandler,a=e.name,c=e.phone;return r.a.createElement("div",null,r.a.createElement("h3",null,"Add New Number"),r.a.createElement("form",{onSubmit:t},r.a.createElement("div",null,"Name: ",r.a.createElement("input",{name:"NewName",onChange:n,value:a})),r.a.createElement("div",null,"Phone: ",r.a.createElement("input",{name:"NewPhone",onChange:n,value:c})),r.a.createElement("div",null,r.a.createElement("button",{type:"submit"},"add"))))},v=function(e){var t=e.person;return r.a.createElement("div",null,r.a.createElement("p",null,"Name: ",t.name," - Phone:",t.phone))},E=function(e){var t=e.persons,n=e.deleteHandler;return r.a.createElement("div",null,r.a.createElement("h3",null,"Numbers"),t.map((function(e){return r.a.createElement("div",{key:e.name},r.a.createElement(v,{person:e}),r.a.createElement("button",{value:e.id,onClick:n},"delete"))})))},b=function(e){var t=e.filterHandler;return r.a.createElement("div",null,"Search: ",r.a.createElement("input",{type:"text",name:"filter",onChange:t}))},g=function(e){var t=e.message;return t?r.a.createElement("div",{className:"".concat(t.type," message")},t.text):null},w=(n(36),function(){var e=Object(a.useState)([]),t=Object(o.a)(e,2),n=t[0],c=t[1],u=Object(a.useState)(""),l=Object(o.a)(u,2),i=l[0],m=l[1],v=Object(a.useState)(""),w=Object(o.a)(v,2),y=w[0],N=w[1],j=Object(a.useState)(null),O=Object(o.a)(j,2),k=O[0],x=O[1],H=Object(a.useState)(""),C=Object(o.a)(H,2),S=C[0],P=C[1];Object(a.useEffect)((function(){s().then((function(e){return c(e)}))}),[S]);return r.a.createElement("div",null,r.a.createElement("h1",null,"Phonebook"),r.a.createElement(g,{message:S}),r.a.createElement(b,{filterHandler:function(e){""===e.target.value?x(null):x(n.filter((function(t){return t.name.toLowerCase().includes(e.target.value.toLowerCase())})))}}),r.a.createElement(h,{formHandler:function(e){e.preventDefault(),m(""),N("");var t=n.find((function(e){return e.name===i}));t?window.confirm("".concat(i," already exists in the phonebook would u like to \n      replace the old number with new one ?"))&&p(t.id,{name:i,phone:y}).then((function(e){c(n.map((function(t){return t.id===e.id?e:t}))),k&&x(k.map((function(t){return t.id===e.id?e:t}))),P({text:"".concat(i," phone Changed successfully"),type:"success"}),setTimeout((function(){P("")}),3e3)})).catch((function(e){P({text:"".concat(i," has already been deleted"),type:"error"}),setTimeout((function(){P("")}),3e3)})):(d({name:i,phone:y}).then((function(e){return c(n.concat({name:i,phone:y}))})),P({text:"".concat(i," added successfully"),type:"success"}),setTimeout((function(){P("")}),3e3))},inputHandler:function(e){"NewName"===e.target.name?m(e.target.value):"NewPhone"===e.target.name&&N(e.target.value)},name:i,phone:y}),r.a.createElement(E,{persons:k||n,deleteHandler:function(e){var t=n.find((function(t){return t.id==e.target.value}));window.confirm("Delete ".concat(t.name," ?"))&&(f(e.target.value).then((function(){})).catch((function(e){P({text:"".concat(t.name," has already been deleted"),type:"error"}),setTimeout((function(){P("")}),3e3)})),c(n.filter((function(t){return t.id!=e.target.value}))),k&&x(k.filter((function(t){return t.id!=e.target.value}))),P({text:"".concat(t.name," deleted successfully"),type:"success"}),setTimeout((function(){P("")}),3e3))}}))});u.a.render(r.a.createElement(w,null),document.getElementById("root"))}},[[14,1,2]]]);
//# sourceMappingURL=main.1ac527d9.chunk.js.map