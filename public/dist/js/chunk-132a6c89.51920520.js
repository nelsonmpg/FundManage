(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-132a6c89"],{"2f21":function(t,e,n){"use strict";var a=n("79e5");t.exports=function(t,e){return!!t&&a(function(){e?t.call(null,function(){},1):t.call(null)})}},"55dd":function(t,e,n){"use strict";var a=n("5ca1"),o=n("d8e8"),i=n("4bf8"),r=n("79e5"),s=[].sort,u=[1,2,3];a(a.P+a.F*(r(function(){u.sort(void 0)})||!r(function(){u.sort(null)})||!n("2f21")(s)),"Array",{sort:function(t){return void 0===t?s.call(i(this)):s.call(i(this),o(t))}})},"93be":function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("b-row",{staticClass:"animated fadeIn"},[n("b-col",{attrs:{cols:"12"}},[n("transition",{attrs:{name:"slide"}},[n("b-card",{attrs:{header:t.caption}},[n("b-button",{staticClass:"mb-2",attrs:{block:"",variant:"outline-success"},on:{click:t.createNewFund}},[n("i",{staticClass:"cui-pencil icons"}),t._v(" Create New Fund\n        ")]),n("b-table",{attrs:{hover:"",stripe:"",bordered:"",small:"",fixed:"",responsive:"sm",items:t.items,fields:t.fields,"current-page":t.currentPage,"per-page":t.perPage},on:{"row-clicked":t.rowClicked},scopedSlots:t._u([{key:"lastUpdate",fn:function(e){return[t._v(t._s(t.utils.dateFormat(e.item.lastUpdate)))]}},{key:"lastHistoryDate",fn:function(e){return[t._v(t._s(t.utils.onlyDateFormat(e.item.lastHistoryDate)))]}},{key:"fundStart",fn:function(e){return[t._v(t._s(t.utils.onlyDateFormat(e.item.fundStart)))]}}])}),n("nav",[n("b-pagination",{attrs:{size:"sm",align:"center","total-rows":t.getRowCount(t.items),"per-page":t.perPage,"prev-text":"Prev","next-text":"Next"},model:{value:t.currentPage,callback:function(e){t.currentPage=e},expression:"currentPage"}})],1)],1)],1)],1)],1)},o=[],i=(n("6b54"),n("55dd"),n("9be8")),r={components:{},name:"Funds",props:{caption:{type:String,default:"Funds"},hover:{type:Boolean,default:!0},striped:{type:Boolean,default:!0},bordered:{type:Boolean,default:!1},small:{type:Boolean,default:!1},fixed:{type:Boolean,default:!1}},data:function(){return{items:[],fields:[{key:"isin",sortable:!0},{key:"name",sortable:!0},{key:"fundStart",label:"Fund Created",sortable:!0},{key:"lastUpdate",label:"Date Updated"},{key:"lastHistoryDate",label:"Last Date Record"},{key:"lastValue"}],currentPage:1,perPage:10,totalRows:0,utils:i["a"]}},computed:{},methods:{createNewFund:function(){this.$router.push("/funds/fund")},getAllFunds:function(){this.$http.get(i["a"].geturl()+"/api/funds").then(function(t){var e=t.data;!0===e.status?(this.items=e.data,this.items=this.items.sort(i["a"].dynamicSort("name"))):this.$notify({group:"notification",title:"New fund existes.",type:"danger",text:"The fund '"+e.data+"' exists in database.",position:"top center"}),this.$loading.hide()}).catch(function(t){console.log("Error",t),t&&401===t.status?(this.$router.push("/login"),localStorage.removeItem("user"),this.$notify({group:"notification",title:"Login Error.",type:"danger",text:t.body.data,position:"top center"})):this.$notify({group:"notification",title:"Get funds error.",type:"danger",text:"Error "+t,position:"top center"}),this.$loading.hide()})},getRowCount:function(t){return t.length},userLink:function(t){return"/funds/fundView/".concat(t.toString())},rowClicked:function(t){var e=this.userLink(t.isin);this.$router.push({path:e})}},created:function(){this.getAllFunds()},mounted:function(){this.$loading.show()},beforeCreate:function(){},beforeDestroy:function(){}},s=r,u=(n("de77"),n("2877")),l=Object(u["a"])(s,a,o,!1,null,"2b08f1e1",null);e["default"]=l.exports},ca4a:function(t,e,n){},de77:function(t,e,n){"use strict";var a=n("ca4a"),o=n.n(a);o.a}}]);
//# sourceMappingURL=chunk-132a6c89.51920520.js.map