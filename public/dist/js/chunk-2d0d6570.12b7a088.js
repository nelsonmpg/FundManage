(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0d6570"],{"71aa":function(t,e,o){"use strict";o.r(e);var n=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("CContainer",{staticClass:"min-vh-100 d-flex align-items-center"},[o("CRow",{staticClass:"w-100 justify-content-center"},[o("CCol",{attrs:{md:"8",sm:"12"}},[o("CCard",{staticClass:"mx-4 mb-4"},[o("CCardBody",{staticClass:"p-4"},[o("CForm",[o("h1",[t._v("Login")]),o("p",{staticClass:"text-muted"},[t._v("Sign In to your account")]),o("CInput",{staticClass:"user-mail",attrs:{type:"text",placeholder:"Email",autocomplete:"username email",name:"email"},scopedSlots:t._u([{key:"prepend",fn:function(){return[o("CButton",{attrs:{color:"dark",disabled:""}},[o("CIcon",{attrs:{name:"cil-at"}})],1)]},proxy:!0}])}),o("CInput",{staticClass:"user-pass",attrs:{placeholder:"Password",type:"password",autocomplete:"curent-password",name:"password"},on:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.login()}},scopedSlots:t._u([{key:"prepend",fn:function(){return[o("CButton",{attrs:{color:"dark",disabled:""}},[o("CIcon",{attrs:{name:"cil-lock-locked"}})],1)]},proxy:!0}])}),o("CRow",[o("CCol",{attrs:{col:"12"}},[o("CButton",{attrs:{variant:"outline",color:"success",block:""},on:{click:function(e){return t.login()}}},[t._v("Login")])],1)],1)],1)],1),o("CCardFooter",{staticClass:"p-4"},[o("CRow",[o("CCol",{attrs:{col:"12"}},[o("CButton",{attrs:{variant:"outline",color:"primary",block:""},on:{click:function(e){return t.register()}}},[t._v(" Register Now!")])],1)],1)],1)],1)],1)],1)],1)},r=[],a=o("9be8"),i={name:"Login",data:function(){return{utils:a["a"]}},methods:{login:function(){var t=this,e={email:document.getElementsByName("email")[0].value,password:window.btoa(unescape(encodeURIComponent(document.getElementsByName("password")[0].value)))};if(0===e.email.trim().length||0===e.password.trim().length)return this.$notify({group:"notification",title:"Error",text:"Insert valid email and password to login.",type:"danger",position:"top center"});this.$http.post(a["a"].geturl()+"/api/login",e).then((function(e){var o=e.data;!0===o.status?(console.log("Logged in"),t.$notify({group:"notification",title:"Login Success",text:"Welcome "+o.data.name,type:"success",position:"top center"}),localStorage.setItem("user",JSON.stringify(o)),t.$router.push("/home")):(console.log("Logged Error"),t.$notify({group:"notification",title:"Login Error",text:o.data,type:"danger",position:"top center"}))})).catch((function(e){console.log(e.toString()),e&&401===e.status?(t.$router.push("/login"),localStorage.removeItem("user"),t.$notify({group:"notification",title:"Login Error.",type:"danger",text:e.body.data,position:"top center"})):t.$notify({group:"notification",title:"Login error.",type:"danger",text:"Error "+e,position:"top center"})}))},register:function(){this.$router.push("/register")}}},s=i,l=o("2877"),c=Object(l["a"])(s,n,r,!1,null,null,null);e["default"]=c.exports}}]);
//# sourceMappingURL=chunk-2d0d6570.12b7a088.js.map