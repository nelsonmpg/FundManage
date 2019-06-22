(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-4a7541f8"],{"638b":function(t,a,e){"use strict";e.r(a);var r=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("b-row",{staticClass:"animated fadeIn"},[e("b-col",{attrs:{cols:"12"}},[e("b-card",{attrs:{"no-header":""}},[e("template",{slot:"header"},[e("b-row",[e("b-col",{attrs:{cols:"6"}},[e("h3",[t._v("Fund Info")])]),e("b-col",{attrs:{cols:"6"}},[e("div",{staticClass:"card-header-actions"},[e("b-button-toolbar",{staticClass:"float-right",attrs:{"aria-label":"Toolbar with buttons group"}},[e("b-button-group",[e("b-button",{attrs:{variant:"outline-danger"},on:{click:t.deleteFund}},[e("i",{staticClass:"cui-trash icons"}),t._v(" Delete\n                  ")])],1)],1)],1)])],1)],1),e("b-form",[e("b-row",[e("b-col",{attrs:{xl:"9",lg:"8",md:"6",sm:"12",xs:"12"}},[e("b-row",[e("b-col",{staticClass:"mb-3",attrs:{xl:"5",lg:"6",md:"12",sm:"12",xs:"12"}},[e("b-form-group",{staticClass:"mb-0"},[e("b-input-group",[e("b-input-group-prepend",[e("b-input-group-text",[t._v("Fund ISIN")])],1),e("b-form-input",{attrs:{value:t.isin,type:"text",disabled:""}})],1)],1)],1),e("b-col",{staticClass:"mb-3",attrs:{xl:"3",lg:"6",md:"12",sm:"12",xs:"12"}},[e("b-form-group",{staticClass:"mb-0"},[e("b-input-group",[e("b-input-group-prepend",[e("b-input-group-text",[t._v("Currency")])],1),e("b-form-input",{attrs:{value:t.currency&&t.currency.length>0?t.getSymbolFromCurrency(t.currency.toUpperCase())+" ("+t.currency.toUpperCase()+")":"",type:"text",disabled:""}})],1)],1)],1),e("b-col",{staticClass:"mb-3",attrs:{xl:"4",lg:"12",md:"12",sm:"12",xs:"12"}},[e("b-form-group",{staticClass:"mb-0"},[e("b-input-group",[e("b-input-group-prepend",[e("b-input-group-text",[t._v("Fund Rating")])],1),t.ratingFund>0?e("b-input-group-text",t._l(t.ratingFund,function(a){return e("i",{key:a,staticClass:"fa fa-star fa-lg"},[t._v("  ")])}),0):e("b-input-group-text",[t._v("No Rating")])],1)],1)],1)],1),e("b-row",[e("b-col",{attrs:{cols:"12"}},[e("b-form-group",[e("b-input-group",[e("b-input-group-prepend",[e("b-input-group-text",[t._v("Fund Name")])],1),e("b-form-input",{attrs:{value:t.fundName,type:"text",disabled:""}})],1)],1)],1)],1),e("b-row",[e("b-col",{attrs:{cols:"12"}},[e("b-form-group",[e("b-input-group",[e("b-input-group-prepend",[e("b-input-group-text",[t._v("Full Fund Name")])],1),e("b-form-input",{attrs:{value:t.fullFundName,type:"text",disabled:""}})],1)],1)],1)],1),e("b-row",[e("b-col",{attrs:{cols:"12"}},[e("b-form-group",[e("b-input-group",[e("b-input-group-prepend",[e("b-input-group-text",[t._v("Category")])],1),e("b-form-input",{attrs:{value:t.fundCategory,type:"text",disabled:""}})],1)],1)],1)],1),e("b-row",[e("b-col",{attrs:{lg:"6",md:"12",sm:"12",xs:"12"}},[e("b-form-group",[e("b-input-group",[e("b-input-group-prepend",[e("b-input-group-text",[t._v("Fund Start Date")])],1),e("b-form-input",{attrs:{value:t.utils.onlyDateFormat(t.fundStart),type:"text",disabled:""}})],1)],1)],1),e("b-col",{attrs:{lg:"6",md:"12",sm:"12",xs:"12"}},[e("b-form-group",[e("b-input-group",[e("b-input-group-prepend",[e("b-input-group-text",[t._v("Start Price")])],1),e("b-form-input",{attrs:{value:t.utils.formatCurrency(t.fundStartPrice),type:"text",disabled:""}})],1)],1)],1)],1),e("b-row",[e("b-col",{attrs:{lg:"6",md:"12",sm:"12",xs:"12"}},[e("b-form-group",[e("b-input-group",[e("b-input-group-prepend",[e("b-input-group-text",[t._v("Fund Last Date Update")])],1),e("b-form-input",{attrs:{value:t.utils.onlyDateFormat(t.fundLastUpdate),type:"text",disabled:""}})],1)],1)],1),e("b-col",{attrs:{lg:"6",md:"12",sm:"12",xs:"12"}},[e("b-form-group",[e("b-input-group",[e("b-input-group-prepend",[e("b-input-group-text",[t._v("Last Price")])],1),e("b-form-input",{attrs:{value:t.utils.formatCurrency(t.fundLastPrice),type:"text",disabled:""}})],1)],1)],1)],1)],1),e("b-col",{attrs:{xl:"3",lg:"4",md:"6",sm:"12",xs:"12"}},[e("b-card",{attrs:{header:"Domicile"}},[e("b-row",[e("b-col",{staticClass:"text-center",attrs:{sm:"12"}},[e("img",{staticClass:"img-fluid",attrs:{src:t.domicileFlag,alt:""}}),e("h5",{staticClass:"mt-2 mb-0"},[t._v(t._s(t.domicile))])])],1)],1)],1)],1),e("b-card",{attrs:{header:"Available Sale"}},[e("b-row",t._l(t.countiesList,function(t,a){return e("flag",{key:a,attrs:{country:t}})}),1)],1),e("div",{attrs:{slot:"footer"},slot:"footer"})],1),e("b-row",[e("b-col",{attrs:{cols:"12"}},[e("b-card",{attrs:{"no-header":""}},[e("template",{slot:"header"},[e("b-row",[e("b-col",{attrs:{lg:"4",md:"12",sm:"12",xs:"12"}},[e("h4",{staticClass:"card-title"},[t._v("Fund History")])]),e("b-col",{staticClass:"d-md-block",attrs:{lg:"8",md:"12",sm:"12",xs:"12"}},[e("b-button-toolbar",{staticClass:"float-right",attrs:{"aria-label":"Toolbar with buttons group"}},[e("b-form-radio-group",{attrs:{id:"radiosBtn",buttons:"","button-variant":"outline-secondary",name:"radiosBtn"},model:{value:t.selected,callback:function(a){t.selected=a},expression:"selected"}},[e("b-form-radio",{attrs:{value:"30"}},[t._v("1M")]),e("b-form-radio",{attrs:{value:"90"}},[t._v("3M")]),e("b-form-radio",{attrs:{value:"180"}},[t._v("6M")]),e("b-form-radio",{attrs:{value:"365"}},[t._v("1Y")]),e("b-form-radio",{attrs:{value:"730"}},[t._v("2Y")]),e("b-form-radio",{attrs:{value:"1095"}},[t._v("3Y")]),e("b-form-radio",{attrs:{value:"1460"}},[t._v("4Y")]),e("b-form-radio",{attrs:{value:"1825"}},[t._v("5Y")])],1)],1)],1)],1)],1),e("b-card",{staticClass:"mt-3 mb-0 pb-0"},[e("b-row",[t.showChart?e("b-col",{attrs:{cols:"12"}},[e("chart-line",{attrs:{id:"lineChart-1",lineChartId:"lineChart-1",chartTitle:"",dataChartLabel:t.chartData.labels,dataChartValues:t.chartData.values}})],1):t._e()],1)],1)],2)],1)],1),e("template",{slot:"footer"},[e("b-row",[e("b-col",{attrs:{cols:"12"}},[e("b-button",{attrs:{block:"",variant:"outline-primary"},on:{click:t.goBack}},[e("i",{staticClass:"cui-account-logout icons active mt-3"}),t._v(" Back\n            ")])],1)],1)],1)],2)],1),e("b-modal",{staticClass:"modal-danger",attrs:{title:"Attention","ok-variant":"danger"},on:{ok:t.closeFundAccept},model:{value:t.deleteFundModal,callback:function(a){t.deleteFundModal=a},expression:"deleteFundModal"}},[t._v("\n    Are you sure you want to delete this Fund?\n    "),e("br"),t._v('\n    "'+t._s(t.fundName)+'"\n  ')])],1)},o=[],s=(e("ac6a"),e("7f7f"),e("a481"),e("d903")),i=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"ml-5 text-center",attrs:{cols:"2"}},[e("i",{staticClass:"flag-icon h1",class:"flag-icon-"+t.country.alpha2Code.toLowerCase()}),e("p",[t._v(t._s(t.country.name))])])},n=[],l={props:["country"],name:"flag"},u=l,d=e("2877"),c=Object(d["a"])(u,i,n,!1,null,null,null),p=c.exports,b=e("9be8"),h=e("d724"),f=e.n(h),g={components:{ChartLine:s["a"],Flag:p},name:"Fund",data:function(){return{historyValues:{labels:[],values:[]},chartData:{labels:[],values:[]},selected:"30",isin:"",fundName:"",fullFundName:"",fundCategory:"",ratingFund:0,showChart:!1,countiesList:[],domicileFlag:"",domicile:"",currency:"",fundStart:"",fundStartPrice:0,fundLastUpdate:"",fundLastPrice:0,deleteFundModal:!1,utils:b["a"],getSymbolFromCurrency:f.a}},methods:{goBack:function(){this.$router.go(-1),this.$router.replace({path:"/funds"})},deleteFund:function(){this.deleteFundModal=!0},closeFundAccept:function(){this.deleteFundModal=!1,this.$loading.show(),this.$http.delete(b["a"].geturl()+"/api/funds/"+this.isin).then(function(t){var a=t.data;!0===a.status?(this.$notify({group:"notification",title:"Delete fund.",type:"success",text:a.data,position:"top center"}),this.$router.push("/funds")):this.$notify({group:"notification",title:"Delete fund.",type:"warning",text:a.data,position:"top center"}),this.$loading.hide()}).catch(function(t){console.log("Error",t),t&&401===t.status?(this.$router.push("/login"),localStorage.removeItem("user"),this.$notify({group:"notification",title:"Login Error.",type:"danger",text:t.body.data,position:"top center"})):this.$notify({group:"notification",title:"Delete fund error.",type:"danger",text:"Error "+t,position:"top center"}),this.$loading.hide()})},getFundData:function(){this.$http.get(b["a"].geturl()+"/api/fund/"+this.isin+"/2000").then(function(t){var a=t.data;if(!0===a.status){if(console.log("fund data",a),this.fundName=a.data.name,this.fullFundName=this.utils.decodeString(a.data.nameFull),this.fundCategory=this.utils.decodeString(a.data.category),this.ratingFund=a.data.rating,a.list&&(this.countiesList=a.list),a.country&&(this.domicileFlag=a.country.flag),a.data){this.domicile=a.data.domicile,this.currency=a.data.currency,this.fundStart=a.data.fundStart,this.fundLastUpdate=a.data.lastUpdate,this.fundLastPrice=a.data.lastValue;var e=a.data.HistoryDetail;e.length>0&&(this.fundStartPrice=e[0].Value);for(var r=0;r<e.length;r++)this.historyValues.labels.push(b["a"].onlyShortDateFormat(e[r].EndDate)),this.historyValues.values.push(e[r].Value);var o=this.historyValues.labels.slice(Math.max(this.historyValues.labels.length-this.selected,1)),s=this.historyValues.values.slice(Math.max(this.historyValues.values.length-this.selected,1));this.createChartData(o,s)}}else this.$notify({group:"notification",title:"Find fund.",type:"warning",text:a.data,position:"top center"});this.$loading.hide()}).catch(function(t){console.log("Error",t),t&&401===t.status?(this.$router.push("/login"),localStorage.removeItem("user"),this.$notify({group:"notification",title:"Login Error.",type:"danger",text:t.body.data,position:"top center"})):this.$notify({group:"notification",title:"Get fund history error.",type:"danger",text:"Error "+t,position:"top center"}),this.$loading.hide()})},createChartData:function(t,a){this.chartData={labels:t,values:a},this.showChart=!0}},created:function(){this.isin=this.$route.params.isin,this.getFundData()},mounted:function(){this.$loading.show()},beforeCreate:function(){},beforeDestroy:function(){},watch:{selected:function(t){var a=this.historyValues.labels.slice(Math.max(this.historyValues.labels.length-t,1)),e=this.historyValues.values.slice(Math.max(this.historyValues.values.length-t,1));this.createChartData(a,e)}}},m=g,v=Object(d["a"])(m,r,o,!1,null,null,null);a["default"]=v.exports},d724:function(t,a,e){var r=e("f479");t.exports=function(t){if("string"===typeof t){var a=t.toUpperCase();if(r.hasOwnProperty(a))return r[a]}},t.exports.currencySymbolMap=r},f479:function(t,a){t.exports={AED:"د.إ",AFN:"؋",ALL:"L",AMD:"֏",ANG:"ƒ",AOA:"Kz",ARS:"$",AUD:"$",AWG:"ƒ",AZN:"₼",BAM:"KM",BBD:"$",BDT:"৳",BGN:"лв",BHD:".د.ب",BIF:"FBu",BMD:"$",BND:"$",BOB:"$b",BRL:"R$",BSD:"$",BTC:"฿",BTN:"Nu.",BWP:"P",BYR:"Br",BYN:"Br",BZD:"BZ$",CAD:"$",CDF:"FC",CHF:"CHF",CLP:"$",CNY:"¥",COP:"$",CRC:"₡",CUC:"$",CUP:"₱",CVE:"$",CZK:"Kč",DJF:"Fdj",DKK:"kr",DOP:"RD$",DZD:"دج",EEK:"kr",EGP:"£",ERN:"Nfk",ETB:"Br",ETH:"Ξ",EUR:"€",FJD:"$",FKP:"£",GBP:"£",GEL:"₾",GGP:"£",GHC:"₵",GHS:"GH₵",GIP:"£",GMD:"D",GNF:"FG",GTQ:"Q",GYD:"$",HKD:"$",HNL:"L",HRK:"kn",HTG:"G",HUF:"Ft",IDR:"Rp",ILS:"₪",IMP:"£",INR:"₹",IQD:"ع.د",IRR:"﷼",ISK:"kr",JEP:"£",JMD:"J$",JOD:"JD",JPY:"¥",KES:"KSh",KGS:"лв",KHR:"៛",KMF:"CF",KPW:"₩",KRW:"₩",KWD:"KD",KYD:"$",KZT:"лв",LAK:"₭",LBP:"£",LKR:"₨",LRD:"$",LSL:"M",LTC:"Ł",LTL:"Lt",LVL:"Ls",LYD:"LD",MAD:"MAD",MDL:"lei",MGA:"Ar",MKD:"ден",MMK:"K",MNT:"₮",MOP:"MOP$",MRO:"UM",MRU:"UM",MUR:"₨",MVR:"Rf",MWK:"MK",MXN:"$",MYR:"RM",MZN:"MT",NAD:"$",NGN:"₦",NIO:"C$",NOK:"kr",NPR:"₨",NZD:"$",OMR:"﷼",PAB:"B/.",PEN:"S/.",PGK:"K",PHP:"₱",PKR:"₨",PLN:"zł",PYG:"Gs",QAR:"﷼",RMB:"￥",RON:"lei",RSD:"Дин.",RUB:"₽",RWF:"R₣",SAR:"﷼",SBD:"$",SCR:"₨",SDG:"ج.س.",SEK:"kr",SGD:"$",SHP:"£",SLL:"Le",SOS:"S",SRD:"$",SSP:"£",STD:"Db",STN:"Db",SVC:"$",SYP:"£",SZL:"E",THB:"฿",TJS:"SM",TMT:"T",TND:"د.ت",TOP:"T$",TRL:"₤",TRY:"₺",TTD:"TT$",TVD:"$",TWD:"NT$",TZS:"TSh",UAH:"₴",UGX:"USh",USD:"$",UYU:"$U",UZS:"лв",VEF:"Bs",VND:"₫",VUV:"VT",WST:"WS$",XAF:"FCFA",XBT:"Ƀ",XCD:"$",XOF:"CFA",XPF:"₣",YER:"﷼",ZAR:"R",ZWD:"Z$"}}}]);
//# sourceMappingURL=chunk-4a7541f8.a91dca9f.js.map