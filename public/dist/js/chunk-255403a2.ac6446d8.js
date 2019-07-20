(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-255403a2"],{"2f21":function(t,e,a){"use strict";var n=a("79e5");t.exports=function(t,e){return!!t&&n(function(){e?t.call(null,function(){},1):t.call(null)})}},"55dd":function(t,e,a){"use strict";var n=a("5ca1"),o=a("d8e8"),r=a("4bf8"),s=a("79e5"),l=[].sort,i=[1,2,3];n(n.P+n.F*(s(function(){i.sort(void 0)})||!s(function(){i.sort(null)})||!a("2f21")(l)),"Array",{sort:function(t){return void 0===t?l.call(r(this)):l.call(r(this),o(t))}})},"5caf":function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("b-row",{staticClass:"animated fadeIn"},[a("b-col",{attrs:{cols:"12"}},[a("transition",{attrs:{name:"slide"}},[a("b-card",[a("template",{slot:"header"},[a("b-row",[a("b-col",{attrs:{cols:"12"}},[a("h3",{staticClass:"card-title"},[t._v(t._s(t.caption))])])],1)],1),a("b-button",{staticClass:"mb-3",attrs:{block:"",variant:"outline-success"},on:{click:t.createNewFund}},[a("i",{staticClass:"cui-pencil icons"}),t._v(" Create New Portfolio Fund\n        ")]),a("b-table",{attrs:{hover:t.hover,striped:"",bordered:"",responsive:"sm",items:t.items,fields:t.fields,"current-page":t.currentPage,"per-page":t.perPage},on:{"row-clicked":t.rowClicked},scopedSlots:t._u([{key:"nameWallet",fn:function(e){return[a("strong",[t._v(t._s(e.item.nameWallet))])]}},{key:"startWalletMoney",fn:function(e){return[t._v(t._s(t.utils.formatCurrency(e.item.startWalletMoney)))]}},{key:"lastWalletMoney",fn:function(e){return[t._v(t._s(t.utils.formatCurrency(e.item.lastWalletMoney)))]}},{key:"dateLastUpdateWallet",fn:function(e){return[t._v(t._s(t.utils.dateFormat(e.item.dateLastUpdateWallet)))]}},{key:"rendLiquido",fn:function(e){return[t._v(t._s(t.utils.formatPercentage(e.item.rendLiquido,3)))]}},{key:"rendBruto",fn:function(e){return[t._v(t._s(t.utils.formatPercentage(e.item.rendBruto,3)))]}},{key:"status",fn:function(t){return[a("b-card",{staticClass:"mt-0 mb-0 pt-0 pb-0",class:"bg-"+(t.item.status>0?"success":t.item.status="danger"),attrs:{"no-body":!0}},[a("i",{staticClass:"fa pt-2 pb-2",class:"fa-thumbs-"+(t.item.status>=0?"up":"down")})])]}},{key:"gain",fn:function(e){return[a("b-card",{staticClass:"mt-0 mb-0 pt-0 pb-0",class:e.item.gain>0?"bg-success":"bg-danger",attrs:{"no-body":!0}},[a("b",[t._v(t._s(t.utils.formatCurrency(e.item.gain)))])])]}}])},[t._v("cotacaoUp\n          ")]),a("nav",[a("b-pagination",{attrs:{size:"sm",align:"center","total-rows":t.getRowCount(t.items),"per-page":t.perPage,"prev-text":"Prev","next-text":"Next"},model:{value:t.currentPage,callback:function(e){t.currentPage=e},expression:"currentPage"}})],1)],2)],1)],1)],1)},o=[],r=(a("6b54"),a("55dd"),a("9be8")),s={components:{},name:"Portfoliofunds",props:{caption:{type:String,default:"Portfolio of Funds"},hover:{type:Boolean,default:!0},striped:{type:Boolean,default:!0},bordered:{type:Boolean,default:!1},small:{type:Boolean,default:!1},fixed:{type:Boolean,default:!1}},data:function(){return{items:[],fields:[{key:"_id",thClass:"d-none",tdClass:"d-none"},{key:"nameWallet",label:"Portfolio Name",sortable:!0},{key:"dateLastUpdateWallet",label:"Last Update"},{key:"startWalletMoney",label:"€ Invested"},{key:"lastWalletMoney",label:"€ Last Update"},{key:"rendLiquido",label:"Net income"},{key:"gain"}],currentPage:1,perPage:10,totalRows:0,utils:r["a"]}},computed:{},methods:{createNewFund:function(){this.$router.push("/Portfoliofunds/Portfoliofund")},getAllOwnerWallets:function(){this.$http.get(r["a"].geturl()+"/api/portfoliofunds/"+JSON.parse(localStorage.getItem("user")).data._id).then(function(t){var e=t.data;if(!0===e.status){for(var a=e.data,n=[],o=0;o<a.length;o++){var s=(a[o].lastWalletMoney-a[o].startWalletMoney)/a[o].startWalletMoney;n.push({nameWallet:a[o].nameWallet,startWalletMoney:a[o].startWalletMoney,lastWalletMoney:a[o].lastWalletMoney,dateLastUpdateWallet:a[o].dateLastUpdateWallet,_id:a[o]._id,rendLiquido:s,rendBruto:.72*s,gain:a[o].lastWalletMoney-a[o].startWalletMoney,status:a[o].lastWalletMoney-a[o].startWalletMoney})}this.items=n,this.items=this.items.sort(r["a"].dynamicSort("nameWallet"))}else this.$notify({group:"notification",title:"Error get user portfolios.",type:"danger",text:"The Portfolio find database.",position:"top center"});this.$loading.hide()}).catch(function(t){console.log("Error",t),t&&401===t.status?(this.$router.push("/login"),localStorage.removeItem("user"),this.$notify({group:"notification",title:"Login Error.",type:"danger",text:t.body.data,position:"top center"})):this.$notify({group:"notification",title:"Error get portfolios.",type:"danger",text:"Error "+t,position:"top center"}),this.$loading.hide()})},getRowCount:function(t){return t.length},walletLink:function(t){return"/Portfoliofunds/PortfolioView/".concat(t.toString())},rowClicked:function(t){var e=this.walletLink(t._id);this.$router.push({path:e})}},created:function(){this.getAllOwnerWallets()},mounted:function(){this.$loading.show()},beforeCreate:function(){},beforeDestroy:function(){}},l=s,i=(a("ba2b"),a("2877")),u=Object(i["a"])(l,n,o,!1,null,"07c44d6a",null);e["default"]=u.exports},ba2b:function(t,e,a){"use strict";var n=a("c9f8"),o=a.n(n);o.a},c9f8:function(t,e,a){}}]);
//# sourceMappingURL=chunk-255403a2.ac6446d8.js.map