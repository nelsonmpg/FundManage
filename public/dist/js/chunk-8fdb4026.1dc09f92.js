(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-8fdb4026"],{"71aa":function(t,o,e){"use strict";e.r(o);var n=function(){var t=this,o=t.$createElement,e=t._self._c||o;return e("div",{staticClass:"app flex-row align-items-center"},[e("div",{staticClass:"container"},[e("b-row",{staticClass:"justify-content-center"},[e("b-col",{attrs:{md:"8"}},[e("b-card-group",[e("b-card",{staticClass:"p-4",attrs:{"no-body":""}},[e("b-card-body",[e("b-form",[e("h1",[t._v("Login")]),e("p",{staticClass:"text-muted"},[t._v("Sign In to your account")]),e("b-input-group",{staticClass:"mb-3"},[e("b-input-group-prepend",[e("b-input-group-text",[e("i",{staticClass:"icon-user"})])],1),e("b-form-input",{staticClass:"form-control user-mail",attrs:{type:"text",placeholder:"Email",autocomplete:"username email",name:"email"}})],1),e("b-input-group",{staticClass:"mb-4"},[e("b-input-group-prepend",[e("b-input-group-text",[e("i",{staticClass:"icon-lock"})])],1),e("b-form-input",{staticClass:"form-control user-pass",attrs:{type:"password",placeholder:"Password",autocomplete:"current-password",name:"password"},on:{keyup:function(o){return!o.type.indexOf("key")&&t._k(o.keyCode,"enter",13,o.key,"Enter")?null:t.login()}}})],1),e("b-row",[e("b-col",{attrs:{cols:"12"}},[e("b-button",{staticClass:"px-4",attrs:{block:"",variant:"outline-success",value:"Login"},on:{click:function(o){return t.login()}}},[t._v("Login")]),e("b-button",{staticClass:"px-4",attrs:{block:"",variant:"outline-primary"},on:{click:function(o){return t.register()}}},[t._v("Register Now!")])],1)],1)],1)],1)],1)],1)],1)],1)],1)])},r=[],i=(e("6b54"),e("f499")),s=e.n(i),a=(e("7f7f"),e("9be8")),c={name:"Login",data:function(){return{utils:a["a"]}},methods:{login:function(){var t=this,o={email:document.getElementsByClassName("user-mail")[0].value,password:window.btoa(unescape(encodeURIComponent(document.getElementsByClassName("user-pass")[0].value)))};if(0===o.email.trim().length||0===o.password.trim().length)return this.$notify({group:"notification",title:"Error",text:"Insert valid email and password to login.",type:"danger",position:"top center"});this.$http.post(a["a"].geturl()+"/api/login",o).then(function(o){var e=o.data;!0===e.status?(console.log("Logged in"),t.$notify({group:"notification",title:"Login Success",text:"Welcome "+e.data.name,type:"success",position:"top center"}),localStorage.setItem("user",s()(e)),t.$router.push("/home")):(console.log("Logged Error"),t.$notify({group:"notification",title:"Login Error",text:e.data,type:"danger",position:"top center"}))}).catch(function(o){console.log(o.toString()),o&&401===o.status?(t.$router.push("/login"),localStorage.removeItem("user"),t.$notify({group:"notification",title:"Login Error.",type:"danger",text:o.body.data,position:"top center"})):t.$notify({group:"notification",title:"Login error.",type:"danger",text:"Error "+o,position:"top center"})})},register:function(){this.$router.push("/register")}}},u=c,l=e("2877"),p=Object(l["a"])(u,n,r,!1,null,null,null);o["default"]=p.exports},"7f7f":function(t,o,e){var n=e("86cc").f,r=Function.prototype,i=/^\s*function ([^ (]*)/,s="name";s in r||e("9e1e")&&n(r,s,{configurable:!0,get:function(){try{return(""+this).match(i)[1]}catch(t){return""}}})},a21f:function(t,o,e){var n=e("584a"),r=n.JSON||(n.JSON={stringify:JSON.stringify});t.exports=function(t){return r.stringify.apply(r,arguments)}},f499:function(t,o,e){t.exports=e("a21f")}}]);
//# sourceMappingURL=chunk-8fdb4026.1dc09f92.js.map