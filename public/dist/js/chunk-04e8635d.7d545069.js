(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-04e8635d"],{"0748":function(t,e,a){"use strict";var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("CCard",[""!=t.caption.trim()?a("CCardHeader",[t._t("header",[a("CIcon",{attrs:{name:"cil-grid"}}),t._v(" "+t._s(t.caption)+" ")])],2):t._e(),a("CCardBody",[a("CDataTable",{attrs:{hover:t.hover,striped:t.striped,bordered:t.bordered,small:t.small,fixed:t.fixed,items:t.items,fields:t.fields,"items-per-page":t.perPage,"current-page":t.currentPage,dark:t.dark,pagination:t.pagination,size:"sm"},on:{"row-clicked":t.rowClicked},scopedSlots:t._u([{key:"lastUpdate",fn:function(e){var n=e.item;return[a("td",{staticClass:"text-center"},[t._v(t._s(t.utils.dateFormat(n.lastUpdate)))])]}},{key:"lastHistoryDate",fn:function(e){var n=e.item;return[a("td",{staticClass:"text-center"},[t._v(" "+t._s(t.utils.onlyDateFormat(n.lastHistoryDate))+" ")])]}},{key:"fundStart",fn:function(e){var n=e.item;return[a("td",{staticClass:"text-center"},[t._v(" "+t._s(t.utils.onlyDateFormat(n.fundStart))+" ")])]}},{key:"lastValue",fn:function(e){var n=e.item;return[a("td",{staticClass:"text-center"},[t._v(" "+t._s(t.utils.formatCurrency(n.lastValue))+" ")])]}},{key:"nameWallet",fn:function(e){var n=e.item;return[a("td",{staticClass:"text-center"},[a("strong",[t._v(t._s(n.nameWallet))])])]}},{key:"startWalletMoney",fn:function(e){var n=e.item;return[a("td",{staticClass:"text-center"},[t._v(t._s(t.utils.formatCurrency(n.startWalletMoney)))])]}},{key:"lastWalletMoney",fn:function(e){var n=e.item;return[a("td",{staticClass:"text-center"},[t._v(t._s(t.utils.formatCurrency(n.lastWalletMoney)))])]}},{key:"dateLastUpdateWallet",fn:function(e){var n=e.item;return[a("td",{staticClass:"text-center"},[t._v(t._s(t.utils.dateFormat(n.dateLastUpdateWallet)))])]}},{key:"rendLiquido",fn:function(e){var n=e.item;return[a("td",{staticClass:"text-center"},[t._v(t._s(t.utils.formatPercentage(n.rendLiquido,3)))])]}},{key:"rendBruto",fn:function(e){var n=e.item;return[a("td",{staticClass:"text-center"},[t._v(t._s(t.utils.formatPercentage(n.rendBruto,3)))])]}},{key:"status",fn:function(t){var e=t.item;return[a("td",{staticClass:"text-center"},[a("CCard",{staticClass:"mt-0 mb-0 pt-0 pb-0",class:e.status>0?"bg-success":e.status="bg-danger",attrs:{"no-body":!0}},[a("CIcon",{staticClass:"pt-2 pb-2",attrs:{name:e.status>0?"cil-hand-point-up":"cil-hand-point-down",height:30}})],1)],1)]}},{key:"gain",fn:function(e){var n=e.item;return[a("td",{staticClass:"text-center"},[a("CCard",{staticClass:"mt-0 mb-0 pt-0 pb-0",class:n.gain>0?"bg-success":"bg-danger",attrs:{"no-body":!0}},[a("b",[t._v(t._s(t.utils.formatCurrency(n.gain)))])])],1)]}},{key:"dateInvest",fn:function(e){var n=e.item;return[a("td",{staticClass:"text-center"},[t._v(t._s(t.utils.onlyDateFormat(n.dateInvest)))])]}},{key:"cotacaoUp",fn:function(e){var n=e.item;return[a("td",{staticClass:"text-center"},[t._v(t._s(t.utils.formatCurrency(n.cotacaoUp)))])]}},{key:"valInvest",fn:function(e){var n=e.item;return[a("td",{staticClass:"text-center"},[t._v(t._s(t.utils.formatCurrency(n.valInvest)))])]}},{key:"active",fn:function(t){var e=t.item;return[a("td",{staticClass:"text-center"},[a("input",{attrs:{type:"checkbox",disabled:""},domProps:{checked:e.active}})])]}},{key:"dateInative",fn:function(e){var n=e.item;return[a("td",{staticClass:"text-center"},[n.active?a("n",[t._v("- - -")]):a("n",[t._v(t._s(t.utils.onlyDateFormat(n.dateInative)))])],1)]}},{key:"lastvalUp",fn:function(e){var n=e.item;return[a("td",{staticClass:"text-center"},[t._v(t._s(t.utils.formatCurrency(n.lastvalUp)))])]}},{key:"lastDate",fn:function(e){var n=e.item;return[a("td",{staticClass:"text-center"},[t._v(t._s(t.utils.onlyDateFormat(n.lastDate)))])]}},{key:"lastVal",fn:function(e){var n=e.item;return[a("td",{staticClass:"text-center"},[t._v(t._s(t.utils.formatCurrency(n.lastVal)))])]}},{key:"gainValue",fn:function(e){var n=e.item;return[a("td",{staticClass:"text-center"},[a("CCard",{staticClass:"mt-0 mb-0 pt-0 pb-0",class:n.gainValue>0?"bg-success":"bg-danger",attrs:{"no-body":!0}},[n.active?a("b",[t._v(t._s(t.utils.formatCurrency(n.gainValue)))]):a("b",[t._v("0,00")])])],1)]}}])})],1)],1)},s=[],o=a("9be8"),l={name:"Table",data:function(){return{currentPage:1,perPage:10,totalRows:0,utils:o["a"]}},props:{hover:{type:Boolean,default:!0},striped:{type:Boolean,default:!0},bordered:{type:Boolean,default:!0},small:{type:Boolean,default:!0},fixed:{type:Boolean,default:!0},pagination:{type:Boolean,default:!0},dark:{type:Boolean,default:!1},sorter:{type:Boolean,default:!0},responsive:{type:Boolean,default:!0},caption:{type:String,default:"Table"},place:{type:String,default:""},items:Array,fields:Array},methods:{getRowCount:function(t){return t.length},walletLink:function(t){return"/Portfoliofunds/PortfolioView/".concat(t.toString())},userLink:function(t){return"/funds/fundView/".concat(t.toString())},rowClicked:function(t){var e=null;if("funds"==this.place)e=this.userLink(t.isin);else{if("portfolios"!=this.place)return;e=this.walletLink(t._id)}this.$router.push({path:e})}},created:function(){},mounted:function(){var t=document.getElementsByClassName("pagination")[0];t.classList.remove("justify-content-start"),t.classList.add("justify-content-center"),t.classList.add("pagination-sm"),t.firstElementChild.getElementsByTagName("a")[0].innerHTML="First",t.lastElementChild.getElementsByTagName("a")[0].innerHTML="Last",t.firstElementChild.nextElementSibling.getElementsByTagName("a")[0].innerHTML="Prev",t.lastElementChild.previousElementSibling.getElementsByTagName("a")[0].innerHTML="Next"},beforeCreate:function(){},beforeDestroy:function(){}},r=l,i=(a("71be"),a("2877")),c=Object(i["a"])(r,n,s,!1,null,"49d1324c",null);e["a"]=c.exports},2306:function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("CRow",{staticClass:"animated fadeIn"},[a("CCol",{attrs:{col:"12"}},[a("CCard",{attrs:{"no-header":""}},[a("CCardHeader",[a("CRow",[a("CCol",{attrs:{col:"6"}},[a("h3",{staticClass:"card-title"},[t._v("Portfolio Details")])]),a("CCol",{staticClass:"d-none d-md-block",attrs:{col:"6"}},[a("CButton",{staticClass:"float-right mb-2",attrs:{color:"danger",variant:"outline"},on:{click:t.deleteWallet}},[a("CIcon",{attrs:{name:"cil-trash"}}),t._v(" Delete ")],1),a("CButton",{staticClass:"float-right mb-2",attrs:{color:"info",variant:"outline"},on:{click:t.openWalletEdit}},[a("CIcon",{attrs:{name:"cil-pen-alt"}}),t._v(" Edit ")],1)],1)],1)],1),a("CCardBody",[a("CForm",[a("CRow",[a("CCol",{staticClass:"mb-2",attrs:{col:"12"}},[a("CInput",{staticClass:"mb-0",attrs:{value:t.walletName,type:"text",disabled:""},scopedSlots:t._u([{key:"prepend",fn:function(){return[a("CButton",{attrs:{color:"dark",disabled:""}},[t._v("Portfolio Name")])]},proxy:!0}])})],1)],1),a("CRow",[a("CCol",{staticClass:"mb-2",attrs:{xl:"3",lg:"3",md:"12",sm:"12",xs:"12"}},[a("CInput",{staticClass:"mb-0",attrs:{value:t.utils.formatCurrency(t.totalInvest),type:"text",disabled:""},scopedSlots:t._u([{key:"prepend",fn:function(){return[a("CButton",{attrs:{color:"dark",disabled:""}},[t._v("Total Invest")])]},proxy:!0}])})],1),a("CCol",{staticClass:"mb-2",attrs:{xl:"3",lg:"3",md:"12",sm:"12",xs:"12"}},[a("CInput",{staticClass:"mb-0",attrs:{value:t.utils.formatCurrency(t.totalEnd),type:"text",disabled:""},scopedSlots:t._u([{key:"prepend",fn:function(){return[a("CButton",{attrs:{color:"dark",disabled:""}},[t._v("€ Total")])]},proxy:!0}])})],1),a("CCol",{staticClass:"mb-2",attrs:{xl:"3",lg:"3",md:"12",sm:"12",xs:"12"}},[a("CInput",{staticClass:"mb-0",attrs:{value:t.utils.formatCurrency(t.totalEnd-t.totalInvest),type:"text",disabled:""},scopedSlots:t._u([{key:"prepend",fn:function(){return[a("CButton",{attrs:{color:"dark",disabled:""}},[t._v("€ Total Gain")])]},proxy:!0}])})],1),a("CCol",{staticClass:"mb-2",attrs:{xl:"3",lg:"3",md:"12",sm:"12",xs:"12"}},[a("div",{staticClass:"input-group"},[a("div",{staticClass:"input-group-prepend"},[a("button",{staticClass:"btn btn-dark disabled",attrs:{type:"button",disabled:"disabled"}},[t._v("Status")])]),a("div",{staticClass:"form-control",staticStyle:{"background-color":"hsla(0,0%,100%,.12)"}},[t.valArrow>=0?a("CIcon",{class:t.valArrow>0?"bg-success":"bg-danger",attrs:{name:t.valArrow>0?"cil-hand-point-up":"cil-hand-point-down",height:20}}):t._e()],1)])])],1)],1),a("CRow",[a("CCol",{staticClass:"mb-0 pb-0",attrs:{col:"12"}},[a("CCard",{attrs:{"no-body":""}},[a("CCardBody",[a("CTableWrapper",{attrs:{items:t.items,fields:t.fields,hover:"",striped:"",bordered:"",small:"",fixed:"",sorter:"",responsive:"",caption:"List Funds in Portfolio",place:"funds"}})],1)],1)],1)],1),a("CRow",[t.showChart?a("CCol",{attrs:{col:"12"}},[a("resize-chart-line",{attrs:{lineChartId:"lineChart-1",dataChartVals:t.walletMoney}})],1):t._e()],1)],1),a("CCardFooter",[a("CRow",[a("CCol",{attrs:{col:"12"}},[a("CButton",{attrs:{block:"",variant:"outline",color:"primary"},on:{click:t.goBack}},[a("CIcon",{attrs:{name:"cil-account-logout"}}),t._v(" Back ")],1)],1)],1)],1)],1)],1),a("CModal",{attrs:{show:t.deleteWalletModal,"no-close-on-backdrop":!0,centered:!0,title:"Attention",color:"danger"},on:{"update:show":function(e){t.deleteWalletModal=e}},scopedSlots:t._u([{key:"header",fn:function(){return[a("h6",{staticClass:"modal-title"},[t._v("Attention")]),a("CButtonClose",{staticClass:"text-white",on:{click:function(e){t.deleteWalletModal=!1}}})]},proxy:!0},{key:"footer",fn:function(){return[a("CButton",{attrs:{variant:"outline",color:"info"},on:{click:function(e){t.deleteWalletModal=!1}}},[t._v("Cancel")]),a("CButton",{attrs:{variant:"outline",color:"danger"},on:{click:function(e){return t.deleteWalletModal()}}},[t._v("Ok")])]},proxy:!0}])},[t._v(" Are you sure you want to delete the Portfolio? "),a("br"),t._v(' "'+t._s(t.walletName)+'" ')])],1)},s=[],o=a("0748"),l=a("666c"),r=a("9be8"),i={components:{ResizeChartLine:l["a"],CTableWrapper:o["a"]},name:"PortfolioView",data:function(){return{wallet:"",walletName:"",items:[],fields:[{key:"name",label:"Fund Name",_classes:"text-center"},{key:"isin",_classes:"text-center"},{key:"dateInvest",label:"Invested Date",_classes:"text-center"},{key:"nUps",label:"Nº Ups",_classes:"text-center"},{key:"cotacaoUp",label:"Buy Price",_classes:"text-center"},{key:"valInvest",label:"Invested Value",_classes:"text-center"},{key:"lastvalUp",label:"Last Value Up",_classes:"text-center"},{key:"lastDate",label:"Last Date Update",_classes:"text-center"},{key:"lastVal",label:"Last Value",_classes:"text-center"},{key:"gainValue",label:"Gain",_classes:"text-center"},{key:"active",label:"Active",_classes:"text-center"},{key:"dateInative",_classes:"text-center"}],currentPage:1,perPage:10,totalRows:0,walletMoney:{labels:[],values:[],title:"Portfolio History"},charFundsData:[],showChart:!1,deleteWalletModal:!1,totalInvest:0,totalEnd:0,valArrow:0,utils:r["a"]}},methods:{goBack:function(){this.$router.go(-1),this.$router.replace({path:"/Portfoliofunds"})},deleteWallet:function(){this.deleteWalletModal=!0},closeModalAccept:function(){this.deleteWalletModal=!1,this.$loading.show(),this.$http.delete(r["a"].geturl()+"/api/portfoliofunds/"+JSON.parse(localStorage.getItem("user")).data._id+"/"+this.wallet).then((function(t){var e=t.data;!0===e.status?(this.$notify({group:"notification",title:"Delete Portfolio.",type:"success",text:e.data,position:"top center"}),this.$router.push("/Portfoliofunds")):this.$notify({group:"notification",title:"Delete Portfolio.",type:"warning",text:e.data,position:"top center"}),this.$loading.hide()})).catch((function(t){console.log("Error",t),t&&401===t.status?(this.$router.push("/login"),localStorage.removeItem("user"),this.$notify({group:"notification",title:"Login Error.",type:"danger",text:t.body.data,position:"top center"})):this.$notify({group:"notification",title:"Error Delete Portfolio.",type:"danger",text:"Error "+t,position:"top center"}),this.$loading.hide()}))},openWalletEdit:function(){this.$router.push("/Portfoliofunds/PortfolioEdit/"+this.wallet)},getWalletFundList:function(){this.$http.get(r["a"].geturl()+"/api/portfoliofunds/"+JSON.parse(localStorage.getItem("user")).data._id+"/"+this.wallet).then((function(t){var e=t.data;if(!0===e.status){var a=e.data,n=a.listFunds,s=[];this.walletName=a.nameWallet,this.totalInvest=a.startWalletMoney,this.totalEnd=a.lastWalletMoney,this.valArrow=this.totalEnd-this.totalInvest;for(var o=0;o<n.length;o++)if(n[o]){s.push({isin:n[o].isin,name:n[o].name,dateInvest:n[o].dateInvest,nUps:n[o].nUps,cotacaoUp:n[o].cotacaoUp,valInvest:n[o].valInvest,lastvalUp:n[o].moneyFund[n[o].moneyFund.length-1].Value,lastDate:n[o].moneyFund[n[o].moneyFund.length-1].EndDate,lastVal:n[o].moneyFund[n[o].moneyFund.length-1].moneyCalc,gainValue:n[o].moneyFund[n[o].moneyFund.length-1].moneyCalc-n[o].valInvest,active:n[o].active,dateInative:n[o].dateInative});for(var l=[],i=[],c=0;c<n[o].moneyFund.length;c++)l.push(r["a"].onlyShortDateFormat(n[o].moneyFund[c].EndDate)),i.push(n[o].moneyFund[c].moneyCalc);this.charFundsData.push({labels:l,values:i,title:n[o].name+" - "+n[o].isin})}this.items=s,this.items=this.items.sort(r["a"].dynamicSort("name"));for(var u=a.moneyWallet,d=0;d<u.length;d++)this.walletMoney.labels.push(r["a"].onlyShortDateFormat(u[d].EndDate)),this.walletMoney.values.push(u[d].moneyWalletCalc.toFixed(2));this.showChart=!0}else this.$notify({group:"notification",title:"Find portfolio.",type:"warning",text:e.data,position:"top center"});this.$loading.hide()})).catch((function(t){console.log("Error",t),t&&401===t.status?(this.$router.push("/login"),localStorage.removeItem("user"),this.$notify({group:"notification",title:"Login Error.",type:"danger",text:t.body.data,position:"top center"})):this.$notify({group:"notification",title:"Error get user portfolio.",type:"danger",text:"Error "+t,position:"top center"}),this.$loading.hide()}))},getRowCount:function(t){return t.length}},created:function(){this.wallet=this.$route.params.wallet,this.getWalletFundList()},mounted:function(){this.$loading.show()},beforeCreate:function(){},beforeDestroy:function(){},watch:{}},c=i,u=a("2877"),d=Object(u["a"])(c,n,s,!1,null,null,null);e["default"]=d.exports},"71be":function(t,e,a){"use strict";var n=a("aa11"),s=a.n(n);s.a},aa11:function(t,e,a){}}]);
//# sourceMappingURL=chunk-04e8635d.7d545069.js.map