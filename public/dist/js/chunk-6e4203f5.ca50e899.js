(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6e4203f5"],{"2a42":function(t,e,s){"use strict";var n=s("adda"),i=s.n(n);i.a},"2f21":function(t,e,s){"use strict";var n=s("79e5");t.exports=function(t,e){return!!t&&n(function(){e?t.call(null,function(){},1):t.call(null)})}},"55dd":function(t,e,s){"use strict";var n=s("5ca1"),i=s("d8e8"),o=s("4bf8"),a=s("79e5"),r=[].sort,c=[1,2,3];n(n.P+n.F*(a(function(){c.sort(void 0)})||!a(function(){c.sort(null)})||!s("2f21")(r)),"Array",{sort:function(t){return void 0===t?r.call(o(this)):r.call(o(this),i(t))}})},"73d6":function(t,e,s){"use strict";var n=s("9430"),i=s.n(n);i.a},"7f7f":function(t,e,s){var n=s("86cc").f,i=Function.prototype,o=/^\s*function ([^ (]*)/,a="name";a in i||s("9e1e")&&n(i,a,{configurable:!0,get:function(){try{return(""+this).match(o)[1]}catch(t){return""}}})},9430:function(t,e,s){},a42a:function(t,e,s){"use strict";s.r(e);var n=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("b-row",{staticClass:"animated fadeIn"},[s("b-col",{attrs:{cols:"12"}},[s("b-card",{attrs:{"no-header":""}},[s("template",{slot:"header"},[t._v("Name: "+t._s(t.title))]),s("b-form",[s("b-row",[s("b-col",{attrs:{cols:"12"}},[s("b-form-group",[s("b-input-group",[s("b-input-group-prepend",[s("b-input-group-text",[t._v("Portfolio Name")])],1),s("b-form-input",{ref:"walletNameFocus",attrs:{type:"text",placeholder:"Please enter Portfolio Name.",required:""},model:{value:t.walletName,callback:function(e){t.walletName=e},expression:"walletName"}}),s("b-input-group-append",[s("b-input-group-text",[s("i",{directives:[{name:"b-tooltip",rawName:"v-b-tooltip.hover.html",value:"<strong>Insert a prefered Portfolio name.</strong>",expression:"'<strong>Insert a prefered Portfolio name.</strong>'",modifiers:{hover:!0,html:!0}}],staticClass:"fa",class:t.classwalletName})])],1)],1)],1)],1)],1),s("b-row",[s("b-col",{attrs:{cols:"12"}},t._l(t.fundsList,function(e,n){return s("add-fund",{key:n,ref:"checkFund",refInFor:!0,attrs:{posArr:n,fund:e,optsSelect:t.options}})}),1)],1),s("b-row",[s("b-col",{staticClass:"mt-3 mb-3",attrs:{cols:"12"}},[s("b-button",{ref:"addFundFocus",attrs:{block:"",variant:"outline-info"},on:{click:t.addFund}},[s("i",{staticClass:"fa fa-plus"}),t._v(" Add Fund to Portfolio\n            ")])],1)],1)],1),s("template",{slot:"footer"},[s("b-row",[s("b-col",{attrs:{cols:"6"}},[s("b-button",{attrs:{block:"",variant:"outline-primary"},on:{click:t.goBack}},[s("i",{staticClass:"cui-account-logout icons active mt-3"}),t._v(" Back\n            ")])],1),s("b-col",{attrs:{cols:"6"}},[s("b-button",{attrs:{block:"",variant:"outline-success"},on:{click:t.saveWallet}},[s("i",{staticClass:"fa fa-save"}),t._v(" Save Portfolio\n            ")])],1)],1)],1)],2)],1)],1)},i=[],o=(s("55dd"),s("7f7f"),s("a481"),function(){var t=this,e=t.$createElement,s=t._self._c||e;return t.show?s("b-card",{staticClass:"mb-0 clear-padding-next-div animated fadeIn",attrs:{"no-header":"","border-variant":"primary"}},[s("b-row",{staticClass:"align-items-center h-100"},[s("b-col",{staticClass:"mx-auto text-center",attrs:{cols:"1"}},[s("h3",[s("b-badge",{attrs:{pill:"",variant:"dark"}},[t._v(t._s(t.posArr+1))])],1)]),s("b-col",{attrs:{cols:"11"}},[s("b-card",{staticClass:"mb-0"},[s("template",{slot:"header"},[s("b-row",[s("b-col",{attrs:{cols:"11"}},[s("b-form-group",{staticClass:"mb-0"},[s("b-input-group",[s("b-input-group-prepend",[s("b-input-group-text",[t._v("Select Fund")])],1),s("b-form-select",{ref:"selectFundFocus",attrs:{plain:!0,options:t.optsSelect,value:""},model:{value:t.selectedFund,callback:function(e){t.selectedFund=e},expression:"selectedFund"}}),s("b-input-group-append",[s("b-input-group-text",[s("i",{directives:[{name:"b-tooltip",rawName:"v-b-tooltip.hover.html",value:"<strong>Select a Fund to add to this portfolio.</strong>",expression:"'<strong>Select a Fund to add to this portfolio.</strong>'",modifiers:{hover:!0,html:!0}}],staticClass:"fa",class:t.classselectedFund})])],1)],1)],1)],1),s("b-col",{attrs:{cols:"1"}},[s("div",{staticClass:"card-header-actions"},[s("b-link",{directives:[{name:"b-tooltip",rawName:"v-b-tooltip.hover.html",value:"<strong>Delete this fund.</strong>",expression:"'<strong>Delete this fund.</strong>'",modifiers:{hover:!0,html:!0}}],staticClass:"card-header-action btn-close",attrs:{href:"#"},on:{click:t.removePanel}},[s("i",{staticClass:"icon-close"})])],1)])],1)],1),s("b-row",{directives:[{name:"show",rawName:"v-show",value:""!=t.selectedFund,expression:"selectedFund != ''"}]},[s("b-col",{attrs:{cols:"12"}},t._l(t.fund.investList,function(t,e){return s("add-invest",{key:e,ref:"checkInvest",refInFor:!0,attrs:{invest:t,posArr:e}})}),1),s("b-col",{staticClass:"mt-3 mb-3",attrs:{sm:"12"}},[s("b-button",{ref:"addInvestFocus",attrs:{block:"",size:"sm",variant:"outline-secondary"},on:{click:t.addInvest}},[s("i",{staticClass:"fa fa-plus"}),t._v(" Add new Invest to Fund\n            ")])],1)],1)],2)],1)],1)],1):t._e()}),a=[],r=(s("28a5"),s("9be8")),c=function(){var t=this,e=t.$createElement,s=t._self._c||e;return t.show?s("b-row",{staticClass:"mb-2"},[s("b-col",{staticClass:"mx-auto text-center",attrs:{cols:"1"}},[s("h5",[s("b-badge",{attrs:{pill:"",variant:"dark"}},[t._v(t._s(t.posArr+1))])],1)]),s("b-col",{attrs:{cols:"10"}},[s("b-row",[s("b-col",{attrs:{xl:"6",lg:"12",md:"12",sm:"12",xs:"12"}},[s("b-form-group",{staticClass:"mb-0"},[s("b-input-group",[s("b-input-group-prepend",[s("b-input-group-text",[s("i",{staticClass:"fa fa-calendar-check-o"})])],1),s("b-form-input",{ref:"fundDate",attrs:{type:"date"},model:{value:t.dateFund,callback:function(e){t.dateFund=e},expression:"dateFund"}}),s("b-input-group-append",[s("b-input-group-text",[s("i",{directives:[{name:"b-tooltip",rawName:"v-b-tooltip.hover.html",value:"<strong>Select a date to start this investiment.</strong>",expression:"'<strong>Select a date to start this investiment.</strong>'",modifiers:{hover:!0,html:!0}}],staticClass:"fa",class:t.classdateFund})])],1)],1)],1)],1),s("b-col",{attrs:{xl:"6",lg:"12",md:"12",sm:"12",xs:"12"}},[s("b-form-group",{staticClass:"mb-0"},[s("b-input-group",[s("b-input-group-prepend",[s("b-input-group-text",[t._v("Nº Ups")])],1),s("b-form-input",{ref:"fundNups",attrs:{type:"number",placeholder:"ex. 123.45"},model:{value:t.nUpsFund,callback:function(e){t.nUpsFund=e},expression:"nUpsFund"}}),s("b-input-group-append",[s("b-input-group-text",[s("i",{directives:[{name:"b-tooltip",rawName:"v-b-tooltip.hover.html",value:"<strong>Inser the number of Nups to invest.</strong>",expression:"'<strong>Inser the number of Nups to invest.</strong>'",modifiers:{hover:!0,html:!0}}],staticClass:"fa",class:t.classnUpsFund})])],1)],1)],1)],1)],1)],1),s("b-col",{attrs:{cols:"1"}},[s("div",{staticClass:"card-header-actions"},[s("b-link",{directives:[{name:"b-tooltip",rawName:"v-b-tooltip.hover.html",value:"<strong>Delete this investiment.</strong>",expression:"'<strong>Delete this investiment.</strong>'",modifiers:{hover:!0,html:!0}}],staticClass:"card-header-action btn-close",attrs:{href:"#"},on:{click:t.removePanel}},[s("i",{staticClass:"icon-close"})])],1)])],1):t._e()},l=[],u={components:{},props:["invest","posArr"],name:"AddInvest",data:function(){return{dateFund:"",dateFundCheck:!1,classdateFund:"fa-close",nUpsFund:"",nUpsFundCheck:!1,classnUpsFund:"fa-close",show:!0,utils:r["a"]}},computed:{},methods:{removePanel:function(){this.show=!1,this.$parent.deleteInvest(this.posArr)},focusInvestDuplicateDate:function(){this.$refs.fundDate.$el.focus()},checkInvest:function(){return this.dateFundCheck?!!this.nUpsFundCheck||(this.$notify({group:"notification",title:"Error",text:"Check the nUps invest field.",type:"danger",position:"top center"}),this.$refs.fundNups.$el.focus(),!1):(this.$notify({group:"notification",title:"Error",text:"Check the date invest field.",type:"danger",position:"top center"}),this.$refs.fundDate.$el.focus(),!1)}},created:function(){},mounted:function(){},beforeCreate:function(){},beforeDestroy:function(){},watch:{dateFund:function(t){var e="",s=new Date,n=new Date(t),i=this.utils.dateIsWeekend(t);this.dateFundCheck=!1,""===t.trim()?(e="close",this.invest.dateInvest=""):Date.parse(s)<Date.parse(n)?(this.$notify({group:"notification",title:"Attention.",type:"warning",text:"You selected a day after Today.",position:"top center"}),e="close",this.invest.dateInvest=""):i?(this.$notify({group:"notification",title:"Attention.",type:"warning",text:"You selected a day of weekend.",position:"top center"}),e="close",this.invest.dateInvest=""):(e="check",this.dateFundCheck=!0,this.invest.dateInvest=this.dateFund,this.invest.dateCheck=new Date(this.dateFund).getTime()),this.classdateFund="fa-"+e},nUpsFund:function(t){var e="";this.nUpsFundCheck=!1,""===t.trim()||1*t.trim()<=0?(e="close",this.invest.nUps=""):(e="check",this.nUpsFundCheck=!0,this.invest.nUps=this.nUpsFund),this.classnUpsFund="fa-"+e}}},d=u,f=(s("2a42"),s("2877")),h=Object(f["a"])(d,c,l,!1,null,"7e802d24",null),p=h.exports,v={components:{AddInvest:p},props:["optsSelect","posArr","fund"],name:"AddFund",data:function(){return{selectedFund:"",selectedFundCheck:!1,classselectedFund:"fa-close",countInvest:0,show:!0,utils:r["a"]}},computed:{},methods:{addInvest:function(){this.countInvest++,this.fund.investList.push({dateInvest:"",nUps:""})},deleteInvest:function(t){this.countInvest--,this.fund.investList[t]=null},focusFundDuplicate:function(){this.$refs.selectFundFocus.$el.focus()},removePanel:function(){this.show=!1,this.$parent.deleteFund(this.posArr)},checkFund:function(){if(!this.selectedFundCheck)return this.$notify({group:"notification",title:"Error",text:"Check the Select Fund field.",type:"danger",position:"top center"}),this.$refs.selectFundFocus.$el.focus(),!1;if(0===this.fund.investList.length||this.countInvest<=0)return this.$notify({group:"notification",title:"Error",text:"Add one or more investments in this fund.",type:"danger",position:"top center"}),this.$refs.addInvestFocus.focus(),!1;for(var t=[],e=0;e<this.$refs.checkInvest.length;e++)if(this.fund.investList[e]&&(t.push(this.fund.investList[e].dateCheck),!this.$refs.checkInvest[e].checkInvest()))return!1;var s=r["a"].checkDuplicatesV2(t);if(!s.status){for(var n=0;n<this.fund.investList.length;n++)this.fund.investList[this.fund.investList.length-1-n]&&1*this.fund.investList[this.fund.investList.length-1-n].dateCheck===1*s.duplicate[0]&&(this.$refs.checkInvest[this.fund.investList.length-1-n].focusInvestDuplicateDate(),n=this.fund.investList.length);return this.$notify({group:"notification",title:"Error",text:"The list of investments of Fund contains duplicate dates, check this.",type:"danger",position:"top center"}),!1}return!0}},created:function(){},mounted:function(){this.$refs.selectFundFocus.$el.focus()},beforeCreate:function(){},beforeDestroy:function(){},watch:{selectedFund:function(t,e){""===e&&this.addInvest();var s="";if(this.selectedFundCheck=!1,""===t.trim())s="close",this.fund.isin="",this.fund.name="";else{s="check",this.selectedFundCheck=!0;var n=this.selectedFund.split("-");this.fund.isin=n[0].trim(),this.fund.name=n[1].trim()}this.classselectedFund="fa-"+s}}},m=v,g=(s("73d6"),Object(f["a"])(m,o,a,!1,null,"4fe96ffe",null)),b=g.exports,F={components:{AddFund:b},name:"New Portfolio",data:function(){return{title:"New Portfolio of Fund",walletName:"",walletNameCheck:!1,classwalletName:"fa-close",fundsList:[],fundCount:0,options:[],utils:r["a"]}},methods:{goBack:function(){this.$router.go(-1),this.$router.replace({path:"/Portfoliofunds"})},addFund:function(){this.fundCount++,this.fundsList.push({isin:"",name:"",investList:[]})},deleteFund:function(t){this.fundsList[t]=null,this.fundCount--},saveWallet:function(){if(!this.walletNameCheck)return this.$refs.walletNameFocus.$el.focus(),this.$notify({group:"notification",title:"Error",text:"Check field 'Portfolio Name'.",type:"danger",position:"top center"});if(0===this.fundsList.length||this.fundCount<=0)return this.$refs.addFundFocus.focus(),this.$notify({group:"notification",title:"Error",text:"Add one or more funds to Portfolio.",type:"danger",position:"top center"});for(var t=[],e=0;e<this.$refs.checkFund.length;e++)if(this.fundsList[e]&&(t.push(this.fundsList[e].isin),!this.$refs.checkFund[e].checkFund()))return console.log("Problems with validations.");var s=r["a"].checkDuplicatesV2(t);if(!s.status){for(var n=0;n<this.fundsList.length;n++)this.fundsList[this.fundsList.length-1-n]&&this.fundsList[this.fundsList.length-1-n].isin===s.duplicate[0]&&(this.$refs.checkFund[this.fundsList.length-1-n].focusFundDuplicate(),n=this.fundsList.length);return this.$notify({group:"notification",title:"Error",text:"The list of fund of Portfolio contains duplicate funds, check this.",type:"danger",position:"top center"})}var i=this,o={owner:JSON.parse(localStorage.getItem("user")).data._id,walletName:this.walletName.trim(),walletFunds:function(){for(var t=[],e=0;e<i.fundsList.length;e++)if(i.fundsList[e])for(var s=0;s<i.fundsList[e].investList.length;s++)t.push({codefund:i.fundsList[e].isin+"-"+i.fundsList[e].investList[s].dateCheck,isin:i.fundsList[e].isin,name:i.fundsList[e].name,dateInvest:i.fundsList[e].investList[s].dateInvest,nUps:i.fundsList[e].investList[s].nUps});return t}()};this.$loading.show(),this.$http.post(r["a"].geturl()+"/api/portfoliofunds",o).then(function(t){var e=t.data;!0===e.status?(this.$notify({group:"notification",title:"New Portfolio of funds created.",text:"Portfolio '"+e.data.nameWallet+"' created.",type:"success",position:"top center"}),this.$router.push("/Portfoliofunds")):this.$notify({group:"notification",title:"Save Portfolio Funds.",type:"warning",text:"The name of Portfolio '"+e.data.nameWallet+"' exists in database.",position:"top center"}),this.$loading.hide()}).catch(function(t){console.log("Error",t),t&&401===t.status?(this.$router.push("/login"),localStorage.removeItem("user"),this.$notify({group:"notification",title:"Login Error.",type:"danger",text:t.body.data,position:"top center"})):this.$notify({group:"notification",title:"Error save portfolio.",type:"danger",text:"Error "+t,position:"top center"}),this.$loading.hide()})},getAllFunds:function(){this.$http.get(r["a"].geturl()+"/api/funds").then(function(t){var e=t.data;if(!0===e.status){var s=e.data;s=s.sort(r["a"].dynamicSort("name")),this.options=[];for(var n=0;n<s.length;n++)this.options.push(s[n].isin+" - "+s[n].name)}else this.$notify({group:"notification",title:"Find Funds.",type:"danger",text:"Find all funds in database.",position:"top center"});this.$loading.hide()}).catch(function(t){console.log("Error",t),t&&401===t.status?(this.$router.push("/login"),localStorage.removeItem("user"),this.$notify({group:"notification",title:"Login Error.",type:"danger",text:t.body.data,position:"top center"})):this.$notify({group:"notification",title:"Errro get funds list.",type:"danger",text:"Error "+t,position:"top center"}),this.$loading.hide()})}},created:function(){this.getAllFunds()},mounted:function(){this.$loading.show(),this.$refs.walletNameFocus.$el.focus()},beforeCreate:function(){},beforeDestroy:function(){},watch:{walletName:function(t){var e="";this.walletNameCheck=!1,t.trim().length>4?(e="check",this.walletNameCheck=!0):e="close",this.classwalletName="fa-"+e}}},k=F,w=Object(f["a"])(k,n,i,!1,null,null,null);e["default"]=w.exports},adda:function(t,e,s){}}]);
//# sourceMappingURL=chunk-6e4203f5.ca50e899.js.map