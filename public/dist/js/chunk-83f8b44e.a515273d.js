(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-83f8b44e"],{"5ced":function(t,e,s){},bb51:function(t,e,s){"use strict";s.r(e);var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"animated fadeIn"},[s("CRow",[s("CCol",{attrs:{xl:"6",lg:"12",md:"12",sm:"12",xs:"12"}},[s("CCard",{attrs:{"no-header":""}},[s("CCardHeader",[s("CIcon",{attrs:{name:"cil-calendar"}}),t._v(" Date / "),s("CIcon",{attrs:{name:"cil-clock"}}),t._v(" Time")],1),s("CCardBody",[s("CRow",[s("CCol",{attrs:{col:"12",id:"clock"}},[s("h1",{staticClass:"date"},[t._v(t._s(t.clock.date))]),s("h1",{staticClass:"time"},[t._v(t._s(t.clock.time))])])],1)],1)],1),s("CCard",{directives:[{name:"show",rawName:"v-show",value:t.continersArticles.length>0,expression:"continersArticles.length > 0"}],attrs:{"no-header":""}},[s("b-carousel",{attrs:{id:"carousel1",controls:"",indicators:"","img-width":"1024","img-height":"480",interval:4e3},on:{"sliding-start":t.onSlideStart,"sliding-end":t.onSlideEnd},model:{value:t.slide,callback:function(e){t.slide=e},expression:"slide"}},t._l(t.continersArticles,(function(e,a){return s("b-carousel-slide",{key:a,attrs:{"img-blank":""}},[s("CCard",{attrs:{"no-body":"","border-variant":"info"}},[s("div",{staticClass:"brand-card-header bg-gray-900"},[s("i",{class:e.classIcon})]),s("div",{staticClass:"h4 mt-2",domProps:{innerHTML:t._s(t.utils.decode_utf8(e.local))}}),s("div",{staticClass:"h5",domProps:{innerHTML:t._s(t.utils.decode_utf8(e.state))}}),s("div",{staticClass:"brand-card-body p-0 m-0"},[s("div",[s("div",{staticClass:"text-value",domProps:{innerHTML:t._s(e.maxval)}}),s("div",{staticClass:"text-uppercase small"},[t._v("Max")])]),s("div",[s("div",{staticClass:"text-value",domProps:{innerHTML:t._s(e.minval)}}),s("div",{staticClass:"text-uppercase small"},[t._v("Min")])])])])],1)})),1)],1)],1),s("CCol",{attrs:{xl:"6",lg:"12",md:"12",sm:"12",xs:"12"}},[s("CRow",[s("CCol",{attrs:{col:"12"}},[s("CCard",{attrs:{"no-header":""}},[s("CCardHeader",[t._v("Actions")]),s("CCardBody",[s("CRow",[s("CCol",{attrs:{cols:"12"}},[s("CButton",{staticClass:"mb-3",attrs:{block:"",disabled:t.uupdatefundsAll.status,variant:"outline",color:"success"},on:{click:t.updateFundsAndPortfolio}},[s("CIcon",{attrs:{name:"cil-reload"}}),t._v(" Force update All Funds and Portfolio ")],1)],1)],1),s("fundupdateinfo",{attrs:{fundupdate:t.uupdatefundsAll,fundstep:t.msgUpdateall,fundval:t.valUpdateall}})],1)],1)],1),s("CCol",{attrs:{col:"12"}},[s("CCard",{attrs:{"no-header":""}},[s("CCardHeader",[t._v("List Fund Now Update in Data Base")]),s("CCardBody",t._l(t.listFundsUpdate,(function(t,e){return s("fundupdateinfo",{key:e,attrs:{fundupdate:t,fundstep:t.step,fundval:t.val}})})),1)],1)],1)],1)],1)],1)],1)},i=[],n=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("CRow",{directives:[{name:"show",rawName:"v-show",value:t.fundupdate.status,expression:"fundupdate.status"}]},[s("CCol",{attrs:{col:"12"}},[s("h5",[t._v(t._s(t.fundupdate.name))])]),s("CCol",{attrs:{col:"12"}},[s("CProgress",[s("CProgressBar",{attrs:{color:"info",striped:"",animated:"",value:t.pbStyle,max:t.max}})],1)],1),s("CCol",[t._v(t._s(t.text))]),s("CCol",{staticClass:"ml-auto"},[t._v(t._s(t.pbarVal)+"%")])],1)},o=[],d={props:["fundupdate","fundstep","fundval"],name:"Progress Bar Update Fund Info",data:function(){return{execProcess:!1,showProgressBar:!1,pbarVal:this.fundupdate.val,pbStyle:this.pbarVal,text:this.fundupdate.step,striped:!0,animate:!0,max:100}},beforeDestroy:function(){},watch:{fundstep:function(t){this.text=t},fundval:function(t){this.pbarVal=t,this.pbStyle=this.pbarVal}}},l=d,r=s("2877"),u=Object(r["a"])(l,n,o,!1,null,null,null),c=u.exports,p=s("9be8"),h={name:"Home",components:{fundupdateinfo:c},data:function(){return{slide:0,sliding:null,continersArticles:"",listFundsUpdate:[],uupdatefundsAll:{status:!1,name:"Update All Funds and Portfolios.",msg:"Step 1 / 2",val:0},msgUpdateall:"",valUpdateall:0,week:["SUN","MON","TUE","WED","THU","FRI","SAT"],clock:{time:"",date:""},timerID:null,utils:p["a"]}},methods:{updateFundsAndPortfolio:function(){this.$loading.show(),this.$http.get(p["a"].geturl()+"/api/updateallelements").then((function(t){var e=t.data;!0===e.status?(this.$notify({group:"notification",title:"New fund created.",text:e.data,type:"info",position:"top center"}),this.uupdatefundsAll.status=!0):this.$notify({group:"notification",title:"Update database.",type:"warning",text:"Update all elements in data base.",position:"top center"}),this.$loading.hide()})).catch((function(t){t&&401===t.status?(this.$router.push("/login"),localStorage.removeItem("user"),this.$notify({group:"notification",title:"Login Error.",type:"danger",text:t.body.data,position:"top center"})):this.$notify({group:"notification",title:"New fund existes.",type:"danger",text:"Error "+t,position:"top center"}),this.$loading.hide()}))},zeroPadding:function(t,e){for(var s="",a=0;a<e;a++)s+="0";return(s+t).slice(-e)},updateTime:function(){var t=new Date;this.clock.time=this.zeroPadding(t.getHours(),2)+":"+this.zeroPadding(t.getMinutes(),2)+":"+this.zeroPadding(t.getSeconds(),2),this.clock.date=this.zeroPadding(t.getFullYear(),4)+"-"+this.zeroPadding(t.getMonth()+1,2)+"-"+this.zeroPadding(t.getDate(),2)+" "+this.week[t.getDay()]},getWeather:function(){this.continersArticles=[],this.$http.get(p["a"].geturl()+"/api/WeatherList").then((function(t){var e=t.data;if(!0===e.status){var s=e.data;this.continersArticles=s}else this.$notify({group:"notification",title:"Find fund.",type:"warning",text:e.data,position:"top center"})})).catch((function(t){console.log("Error",t),t&&401===t.status?(this.$router.push("/login"),localStorage.removeItem("user"),this.$notify({group:"notification",title:"Login Error.",type:"danger",text:t.body.data,position:"top center"})):this.$notify({group:"notification",title:"Get Weather List.",type:"danger",text:"Error get Weather List.",position:"top center"})}))},onSlideStart:function(t){this.sliding=!0},onSlideEnd:function(t){var e=this;this.sliding=!1,this.continersArticles.length-1==t&&setTimeout((function(){e.getWeather()}),3500)}},created:function(){this.timerID=setInterval(this.updateTime,1e3),this.updateTime(),this.getWeather()},beforeDestroy:function(){},sockets:{updateProgressBar:function(t){var e=!1;if(!0===t.status){for(var s in this.listFundsUpdate)this.listFundsUpdate[s]&&this.listFundsUpdate[s].isin===t.fund.isin&&(this.listFundsUpdate[s].step=t.msg,this.listFundsUpdate[s].val=t.val,e=!0,"savecomplete"===t.proc&&(this.listFundsUpdate[s].status=!1,this.listFundsUpdate.slice(s,1)));e||this.listFundsUpdate.push({status:t.status,isin:t.fund.isin,name:t.fund.name,step:t.msg,val:t.val})}else{for(var a in this.listFundsUpdate)this.listFundsUpdate[a]&&this.listFundsUpdate[a].isin===t.fund.isin&&"savecomplete"===t.proc&&(this.listFundsUpdate[a].status=!1,this.listFundsUpdate.slice(a,1));console.log("Status = False.")}},updateFundsAndWallets:function(t){!0===t.status?(this.uupdatefundsAll.status=!0,this.msgUpdateall=t.msg,this.valUpdateall=t.val):(this.uupdatefundsAll.status=!1,console.log("Status = False."))}}},f=h,g=(s("cccb"),Object(r["a"])(f,a,i,!1,null,null,null));e["default"]=g.exports},cccb:function(t,e,s){"use strict";var a=s("5ced"),i=s.n(a);i.a}}]);
//# sourceMappingURL=chunk-83f8b44e.a515273d.js.map