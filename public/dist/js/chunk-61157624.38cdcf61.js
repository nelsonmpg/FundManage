(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-61157624"],{"1dc4":function(t,e,s){"use strict";var n=s("9f91"),i=s.n(n);i.a},8354:function(t,e,s){"use strict";var n=s("dafa"),i=s.n(n);i.a},"9f91":function(t,e,s){},bef2:function(t,e,s){"use strict";s.r(e);var n=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("b-row",{staticClass:"animated fadeIn"},[s("b-col",{attrs:{cols:"12"}},[s("b-card",{attrs:{"no-header":""}},[s("template",{slot:"header"},[t._v("Name: "+t._s(t.title))]),s("b-form",[s("b-row",[s("b-col",{attrs:{sm:"12"}},[s("b-form-group",[s("b-input-group",[s("b-input-group-prepend",[s("b-input-group-text",[t._v("Portfolio Name")])],1),s("b-form-input",{ref:"walletNameFocus",attrs:{type:"text",placeholder:"Please enter Portfolio Name.",disabled:""},model:{value:t.walletName,callback:function(e){t.walletName=e},expression:"walletName"}}),s("b-input-group-append",[s("b-input-group-text",[s("i",{directives:[{name:"b-tooltip",rawName:"v-b-tooltip.hover.html",value:"<strong>A prefered Portfolio name.</strong>",expression:"'<strong>A prefered Portfolio name.</strong>'",modifiers:{hover:!0,html:!0}}],staticClass:"fa",class:t.classwalletName})])],1)],1)],1)],1)],1),s("b-row",[s("b-col",{attrs:{sm:"12"}},t._l(t.fundsList,function(e,n){return s("add-fund-edit",{key:n,ref:"checkFund",refInFor:!0,attrs:{posArr:n,fund:e,optsSelect:t.options}})}),1)],1),s("b-row",[s("b-col",{staticClass:"mt-3 mb-3",attrs:{sm:"12"}},[s("b-button",{ref:"addFundFocus",attrs:{block:"",variant:"outline-info"},on:{click:t.addFund}},[s("i",{staticClass:"fa fa-plus"}),t._v(" Add Fund to Portfolio\n            ")])],1)],1)],1),s("template",{slot:"footer"},[s("b-row",[s("b-col",{attrs:{cols:"6"}},[s("b-button",{attrs:{block:"",variant:"outline-primary"},on:{click:t.goBack}},[s("i",{staticClass:"cui-account-logout icons active mt-3"}),t._v(" Back\n            ")])],1),s("b-col",{attrs:{cols:"6"}},[s("b-button",{attrs:{block:"",variant:"outline-success"},on:{click:t.saveWallet}},[s("i",{staticClass:"fa fa-save"}),t._v(" Save Portfolio\n            ")])],1)],1)],1)],2)],1)],1)},i=[],o=(s("7f7f"),s("a481"),function(){var t=this,e=t.$createElement,s=t._self._c||e;return t.show?s("b-card",{staticClass:"mb-0 clear-padding-next-div animated fadeIn",attrs:{"no-header":"","border-variant":"primary"}},[s("b-row",{staticClass:"align-items-center h-100"},[s("b-col",{staticClass:"mx-auto text-center",attrs:{cols:"1"}},[s("h3",[s("b-badge",{attrs:{pill:"",variant:"dark"}},[t._v(t._s(t.posArr+1))])],1)]),s("b-col",{attrs:{cols:"11"}},[s("b-card",{staticClass:"mb-0"},[s("template",{slot:"header"},[s("b-row",[s("b-col",{attrs:{cols:"11"}},[s("b-form-group",{staticClass:"mb-0"},[s("b-input-group",[s("b-input-group-prepend",[s("b-input-group-text",[t._v("Select Fund")])],1),s("b-form-select",{ref:"selectFundFocus",attrs:{plain:!0,options:t.optsSelect,value:""},model:{value:t.selectedFund,callback:function(e){t.selectedFund=e},expression:"selectedFund"}}),s("b-input-group-append",[s("b-input-group-text",[s("i",{directives:[{name:"b-tooltip",rawName:"v-b-tooltip.hover.html",value:"<strong>Select a Fund to add to this portfolio.</strong>",expression:"'<strong>Select a Fund to add to this portfolio.</strong>'",modifiers:{hover:!0,html:!0}}],staticClass:"fa",class:t.classselectedFund})])],1)],1)],1)],1),s("b-col",{attrs:{cols:"1"}},[s("div",{staticClass:"card-header-actions"},[s("b-link",{directives:[{name:"b-tooltip",rawName:"v-b-tooltip.hover.html",value:"<strong>Delete this fund.</strong>",expression:"'<strong>Delete this fund.</strong>'",modifiers:{hover:!0,html:!0}}],staticClass:"card-header-action btn-close",attrs:{href:"#"},on:{click:t.removePanel}},[s("i",{staticClass:"icon-close"})])],1)])],1)],1),s("b-row",{directives:[{name:"show",rawName:"v-show",value:""!=t.selectedFund,expression:"selectedFund != ''"}]},[s("b-col",{attrs:{cols:"12"}},t._l(t.fund.investList,function(t,e){return s("add-invest-edit",{key:e,ref:"checkInvest",refInFor:!0,attrs:{invest:t,posArr:e}})}),1),s("b-col",{staticClass:"mt-3 mb-3",attrs:{sm:"12"}},[s("b-button",{ref:"addInvestFocus",attrs:{block:"",size:"sm",variant:"outline-secondary"},on:{click:t.addInvest}},[s("i",{staticClass:"fa fa-plus"}),t._v(" Add new Invest to Fund\n            ")])],1)],1)],2)],1)],1)],1):t._e()}),a=[],r=(s("28a5"),s("9be8")),l=function(){var t=this,e=t.$createElement,s=t._self._c||e;return t.show?s("b-row",{staticClass:"mb-2"},[s("b-col",{staticClass:"mx-auto text-center",attrs:{cols:"1"}},[s("h5",[s("b-badge",{attrs:{pill:"",variant:"dark"}},[t._v(t._s(t.posArr+1))])],1)]),s("b-col",{attrs:{cols:"10"}},[s("b-row",[s("b-col",{attrs:{xl:"3",lg:"6",md:"12",sm:"12",xs:"12"}},[s("b-form-group",{staticClass:"mb-0"},[s("b-input-group",[s("b-input-group-prepend",[s("b-input-group-text",[t._v("Active")])],1),s("b-input-group-append",[s("b-input-group-text",[s("i",{directives:[{name:"b-tooltip",rawName:"v-b-tooltip.hover.html",value:"<strong>Investiment inative.</strong>",expression:"'<strong>Investiment inative.</strong>'",modifiers:{hover:!0,html:!0}}],staticClass:"fa",class:t.classfundStateA}),s("c-switch",{attrs:{color:"dark",checked:"",value:"true",uncheckedValue:"false",variant:"pill"},model:{value:t.fundState,callback:function(e){t.fundState=e},expression:"fundState"}}),s("i",{directives:[{name:"b-tooltip",rawName:"v-b-tooltip.hover.html",value:"<strong>Investiment ative.</strong>",expression:"'<strong>Investiment ative.</strong>'",modifiers:{hover:!0,html:!0}}],staticClass:"fa",class:t.classfundStateB})],1)],1)],1)],1)],1),s("b-col",{directives:[{name:"show",rawName:"v-show",value:!t.controlStatus,expression:"!controlStatus"}],staticClass:"col-xl-3 col-lg-6 col-md-12 col-sm-12 col-xs-12"},[s("b-form-group",{staticClass:"mb-0"},[s("b-input-group",[s("b-input-group-prepend",[s("b-input-group-text",[s("i",{staticClass:"fa fa-calendar-times-o"})])],1),s("b-form-input",{ref:"fundDateInative",attrs:{type:"date"},model:{value:t.dateFundInative,callback:function(e){t.dateFundInative=e},expression:"dateFundInative"}}),s("b-input-group-append",[s("b-input-group-text",[s("i",{directives:[{name:"b-tooltip",rawName:"v-b-tooltip.hover.html",value:"<strong>Select a date to stop this investiment.</strong>",expression:"'<strong>Select a date to stop this investiment.</strong>'",modifiers:{hover:!0,html:!0}}],staticClass:"fa",class:t.classdateFundInative})])],1)],1)],1)],1),s("b-col",{class:t.classsDateShow},[s("b-form-group",{staticClass:"mb-0"},[s("b-input-group",[s("b-input-group-prepend",[s("b-input-group-text",[s("i",{staticClass:"fa fa-calendar-check-o"})])],1),s("b-form-input",{ref:"fundDate",attrs:{type:"date",disabled:!t.controlStatus},model:{value:t.dateFund,callback:function(e){t.dateFund=e},expression:"dateFund"}}),s("b-input-group-append",[s("b-input-group-text",[s("i",{directives:[{name:"b-tooltip",rawName:"v-b-tooltip.hover.html",value:"<strong>Select a date to start this investiment.</strong>",expression:"'<strong>Select a date to start this investiment.</strong>'",modifiers:{hover:!0,html:!0}}],staticClass:"fa",class:t.classdateFund})])],1)],1)],1)],1),s("b-col",{class:t.classsNupsShow},[s("b-form-group",{staticClass:"mb-0"},[s("b-input-group",[s("b-input-group-prepend",[s("b-input-group-text",[t._v("Nº Ups")])],1),s("b-form-input",{ref:"fundNups",attrs:{type:"number",disabled:!t.controlStatus,placeholder:"ex. 123.45"},model:{value:t.nUpsFund,callback:function(e){t.nUpsFund=e},expression:"nUpsFund"}}),s("b-input-group-append",[s("b-input-group-text",[s("i",{directives:[{name:"b-tooltip",rawName:"v-b-tooltip.hover.html",value:"<strong>Inser the number of Nups to invest.</strong>",expression:"'<strong>Inser the number of Nups to invest.</strong>'",modifiers:{hover:!0,html:!0}}],staticClass:"fa",class:t.classnUpsFund})])],1)],1)],1)],1)],1)],1),s("b-col",{attrs:{cols:"1"}},[s("div",{staticClass:"card-header-actions"},[s("b-link",{directives:[{name:"b-tooltip",rawName:"v-b-tooltip.hover.html",value:"<strong>Delete this investiment.</strong>",expression:"'<strong>Delete this investiment.</strong>'",modifiers:{hover:!0,html:!0}}],staticClass:"card-header-action btn-close",attrs:{href:"#"},on:{click:t.removePanel}},[s("i",{staticClass:"icon-close"})])],1)])],1):t._e()},c=[],u=(s("6b54"),s("f1fb")),d={components:{cSwitch:u["n"]},props:["invest","posArr"],name:"AddInvest",data:function(){return{dateFund:"",dateFundCheck:!1,classdateFund:"fa-close",nUpsFund:"",nUpsFundCheck:!1,classnUpsFund:"fa-close",classfundStateA:"times-circle-o",classfundStateB:"",fundState:!0,dateFundInative:"",classdateFundInative:"fa-close",dateFundInativeCheck:!1,classsDateShow:"col-xl-4 col-lg-6 col-md-12 col-sm-12 col-xs-12",classsNupsShow:"col-xl-4 col-lg-6 col-md-12 col-sm-12 col-xs-12",controlStatus:!1,show:!0,utils:r["a"]}},computed:{},methods:{removePanel:function(){this.show=!1,this.$parent.deleteInvest(this.posArr)},focusInvestDuplicateDate:function(){this.$refs.fundDate.$el.focus()},checkInvest:function(){if(!this.dateFundCheck)return this.$notify({group:"notification",title:"Error",text:"Check the date invest field.",type:"danger",position:"top center"}),this.$refs.fundDate.$el.focus(),!1;if(!this.nUpsFundCheck)return this.$notify({group:"notification",title:"Error",text:"Check the nUps invest field.",type:"danger",position:"top center"}),this.$refs.fundNups.$el.focus(),!1;if(this.controlStatus)this.invest.dateInative="";else{if(!this.dateFundInativeCheck)return this.$notify({group:"notification",title:"Error",text:"Check the date to inative invest field.",type:"danger",position:"top center"}),this.$refs.fundDateInative.$el.focus(),!1;this.invest.dateInative=this.dateFundInative}return this.invest.moneyFund=[],!0}},created:function(){},mounted:function(){if(""!==this.invest.dateInvest&&(this.dateFund=new Date(this.invest.dateInvest).toISOString().split("T")[0],this.dateFundCheck=!0,this.classdateFund="fa-check"),""!==this.invest.nUps&&(this.nUpsFund=this.invest.nUps,this.nUpsFundCheck=!0,this.classnUpsFund="fa-check"),!this.invest.active){this.fundState=this.invest.active.toString(),this.controlStatus="true"===this.fundState;try{this.dateFundInative=new Date(this.invest.dateInative).toISOString().split("T")[0]}catch(t){this.dateFundInative=(new Date).toISOString().split("T")[0]}this.dateFundInativeCheck=!0,this.classdateFundInative="fa-check"}},beforeCreate:function(){},beforeDestroy:function(){},watch:{dateFund:function(t){var e="",s=new Date,n=new Date(t),i=this.utils.dateIsWeekend(t);this.dateFundCheck=!1,""===t.trim()?(e="close",this.invest.dateInvest=""):Date.parse(s)<Date.parse(n)?(this.$notify({group:"notification",title:"Attention.",type:"warning",text:"You selected a day after Today.",position:"top center"}),e="close",this.invest.dateInvest=""):i?(this.$notify({group:"notification",title:"Attention.",type:"warning",text:"You selected a day of weekend.",position:"top center"}),e="close",this.invest.dateInvest=""):(e="check",this.dateFundCheck=!0,this.invest.dateInvest=this.dateFund,this.invest.dateCheck=new Date(this.dateFund).getTime()),this.classdateFund="fa-"+e},nUpsFund:function(t){var e="";this.nUpsFundCheck=!1,""===t.toString().trim()||1*t.toString().trim()<=0?(e="close",this.invest.nUps=""):(e="check",this.nUpsFundCheck=!0,this.invest.nUps=this.nUpsFund),this.classnUpsFund="fa-"+e},fundState:function(t){this.controlStatus="true"===t,this.controlStatus?(this.classfundStateA="fa-circle-o",this.classfundStateB="fa-check-circle-o",this.classsDateShow="col-xl-4 col-lg-6 col-md-12 col-sm-12 col-xs-12",this.classsNupsShow="col-xl-4 col-lg-6 col-md-12 col-sm-12 col-xs-12"):(this.classfundStateA="fa-times-circle-o",this.classfundStateB="fa-circle-o",this.classsDateShow="col-xl-3 col-lg-6 col-md-12 col-sm-12 col-xs-12",this.classsNupsShow="col-xl-3 col-lg-6 col-md-12 col-sm-12 col-xs-12"),this.invest.active=this.controlStatus},dateFundInative:function(t){var e="",s=new Date,n=new Date(t),i=new Date(this.invest.dateInvest),o=this.utils.dateIsWeekend(t);this.dateFundInativeCheck=!1,""===t.trim()?(e="close",this.invest.dateInative=""):Date.parse(s)<Date.parse(n)?(this.$notify({group:"notification",title:"Attention.",type:"warning",text:"You selected a day after Today.",position:"top center"}),e="close",this.invest.dateInative=""):o?(this.$notify({group:"notification",title:"Attention.",type:"warning",text:"You selected a day of weekend.",position:"top center"}),e="close",this.invest.dateInative=""):Date.parse(n)<=Date.parse(i)?(this.$notify({group:"notification",title:"Attention.",type:"warning",text:"You selected a day before investment is created.",position:"top center"}),e="close",this.invest.dateInative=""):(e="check",this.dateFundInativeCheck=!0,this.invest.dateInative=this.dateFundInative),this.classdateFundInative="fa-"+e}}},h=d,f=(s("8354"),s("2877")),p=Object(f["a"])(h,l,c,!1,null,"359d351a",null),v=p.exports,m={components:{AddInvestEdit:v},props:["optsSelect","posArr","fund"],name:"AddFundEdit",data:function(){return{selectedFund:"",selectedFundCheck:!1,classselectedFund:"fa-close",countInvest:0,investList:[],show:!0,utils:r["a"]}},computed:{},methods:{addInvest:function(){this.countInvest++,this.fund.investList.push({dateInvest:"",nUps:""})},deleteInvest:function(t){this.countInvest--,this.fund.investList[t]=null,console.log("Rem",this.countInvest)},removePanel:function(){this.show=!1,this.$parent.deleteFund(this.posArr)},focusFundDuplicate:function(){this.$refs.selectFundFocus.$el.focus()},checkFund:function(){if(!this.selectedFundCheck)return this.$notify({group:"notification",title:"Error",text:"Check the Select Fund field.",type:"danger",position:"top center"}),this.$refs.selectFundFocus.$el.focus(),!1;if(0===this.fund.investList.length||this.countInvest<=0)return this.$notify({group:"notification",title:"Error",text:"Add one or more investments in this fund.",type:"danger",position:"top center"}),this.$refs.addInvestFocus.focus(),!1;for(var t=[],e=0;e<this.$refs.checkInvest.length;e++)if(this.fund.investList[e]&&(t.push(new Date(this.fund.investList[e].dateInvest).getTime()),!this.$refs.checkInvest[e].checkInvest()))return!1;var s=r["a"].checkDuplicatesV2(t);if(!s.status){for(var n=0;n<this.fund.investList.length;n++)this.fund.investList[this.fund.investList.length-1-n]&&1*this.fund.investList[this.fund.investList.length-1-n].dateCheck===1*s.duplicate[0]&&(this.$refs.checkInvest[this.fund.investList.length-1-n].focusInvestDuplicateDate(),n=this.fund.investList.length);return this.$notify({group:"notification",title:"Error",text:"The list of investments of Fund contains duplicate dates, check this.",type:"danger",position:"top center"}),!1}return!0}},created:function(){},mounted:function(){this.$refs.selectFundFocus.$el.focus(),this.fund.investList.length>0&&(this.selectedFund=this.fund.isin+" - "+this.fund.name,this.selectedFundCheck=!0,this.classselectedFund="fa-check",this.countInvest=this.fund.investList.length)},beforeCreate:function(){},beforeDestroy:function(){},watch:{selectedFund:function(t,e){""===e&&0===this.countInvest&&this.addInvest();var s="";if(this.selectedFundCheck=!1,""===t.trim())s="close",this.fund.isin="",this.fund.name="";else{s="check",this.selectedFundCheck=!0;var n=this.selectedFund.split("-");this.fund.isin=n[0].trim(),this.fund.name=n[1].trim()}this.classselectedFund="fa-"+s}}},g=m,b=(s("1dc4"),Object(f["a"])(g,o,a,!1,null,"4877adbb",null)),F=b.exports,w={components:{AddFundEdit:F},name:"Portfolio Edit",data:function(){return{title:"",walletName:"",walletNameCheck:!1,classwalletName:"fa-close",fundsList:[],fundslistDelete:[],fundCount:0,options:[],utils:r["a"]}},methods:{goBack:function(){this.$router.go(-1),this.$router.replace({path:"/Portfoliofunds"})},addFund:function(){this.fundCount++,this.fundsList.push({isin:"",name:"",investList:[]})},deleteFund:function(t){this.fundslistDelete.push(this.fundsList[t].isin),this.fundsList[t]=null,this.fundCount--},saveWallet:function(){if(!this.walletNameCheck)return this.$refs.walletNameFocus.$el.focus(),this.$notify({group:"notification",title:"Error",text:"Check field 'Portfolio Name'.",type:"danger",position:"top center"});if(0===this.fundsList.length||this.fundCount<=0)return this.$refs.addFundFocus.focus(),this.$notify({group:"notification",title:"Error",text:"Add one or more funds to Portfolio.",type:"danger",position:"top center"});for(var t=[],e=0;e<this.$refs.checkFund.length;e++)if(this.fundsList[e]&&(t.push(this.fundsList[e].isin),!this.$refs.checkFund[e].checkFund()))return console.log("Problems with validations.");var s=r["a"].checkDuplicatesV2(t);if(!s.status){for(var n=0;n<this.fundsList.length;n++)this.fundsList[this.fundsList.length-1-n]&&this.fundsList[this.fundsList.length-1-n].isin===s.duplicate[0]&&(this.$refs.checkFund[this.fundsList.length-1-n].focusFundDuplicate(),n=this.fundsList.length);return this.$notify({group:"notification",title:"Error",text:"The list of fund of Portfolio contains duplicate funds, check this.",type:"danger",position:"top center"})}var i={_idWallet:this.wallet,owner:JSON.parse(localStorage.getItem("user")).data._id,walletName:this.walletName.trim(),walletFunds:this.fundsList};this.$loading.show(),this.$http.put(r["a"].geturl()+"/api/portfoliofunds",i).then(function(t){var e=t.data;!0===e.status?(this.$notify({group:"notification",title:"The Portfolio of funds updated.",text:"Portfolio '"+e.data.nameWallet+"' updated.",type:"success",position:"top center"}),this.$router.push("/Portfoliofunds")):this.$notify({group:"notification",title:"Save Portfolio Funds.",type:"warning",text:"Error to update Portfolio.",position:"top center"}),this.$loading.hide()}).catch(function(t){console.log("Error",t),t&&401===t.status?(this.$router.push("/login"),localStorage.removeItem("user"),this.$notify({group:"notification",title:"Login Error.",type:"danger",text:t.body.data,position:"top center"})):this.$notify({group:"notification",title:"Error save portfolio.",type:"danger",text:"Error "+t,position:"top center"}),this.$loading.hide()})},getAllFunds:function(){this.$http.get(r["a"].geturl()+"/api/funds").then(function(t){var e=t.data;if(!0===e.status){var s=e.data;this.options=[];for(var n=0;n<s.length;n++)this.options.push(s[n].isin+" - "+s[n].name);this.getWalletFundList()}else this.$notify({group:"notification",title:"Find Funds.",type:"danger",text:"Find all funds in database.",position:"top center"}),this.$loading.hide()}).catch(function(t){console.log("Error",t),t&&401===t.status?(this.$router.push("/login"),localStorage.removeItem("user"),this.$notify({group:"notification",title:"Login Error.",type:"danger",text:t.body.data,position:"top center"})):this.$notify({group:"notification",title:"Error get funds list.",type:"danger",text:"Error "+t,position:"top center"}),this.$loading.hide()})},getWalletFundList:function(){this.$http.get(r["a"].geturl()+"/api/portfoliofunds/"+JSON.parse(localStorage.getItem("user")).data._id+"/"+this.wallet).then(function(t){var e=t.data;if(!0===e.status){var s=e.data,n=s.listFunds;this.walletName=s.nameWallet,this.selectedFundCheck=!0,this.classselectedFund="fa-check",this.fundsList=n,this.fundCount=n.length}else this.$notify({group:"notification",title:"Find fund.",type:"warning",text:e.data,position:"top center"});this.$loading.hide()}).catch(function(t){console.log("Error",t),t&&401===t.status?(this.$router.push("/login"),localStorage.removeItem("user"),this.$notify({group:"notification",title:"Login Error.",type:"danger",text:t.body.data,position:"top center"})):this.$notify({group:"notification",title:"Error get user protfolios.",type:"warning",text:"Error "+t,position:"top center"}),this.$loading.hide()})}},created:function(){this.wallet=this.$route.params.wallet,this.getAllFunds()},mounted:function(){this.$loading.show(),this.$refs.walletNameFocus.$el.focus()},beforeCreate:function(){},beforeDestroy:function(){},watch:{walletName:function(t){var e="";this.walletNameCheck=!1,t.trim().length>4?(e="check",this.walletNameCheck=!0):e="close",this.classwalletName="fa-"+e}}},k=w,I=Object(f["a"])(k,n,i,!1,null,null,null);e["default"]=I.exports},dafa:function(t,e,s){}}]);
//# sourceMappingURL=chunk-61157624.38cdcf61.js.map