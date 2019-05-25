function dateFormat(data) {
  let date = new Date(data)
  return (
    date.getFullYear() + '/' +
    (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '/' +
    (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) +
    ' ' +
    (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) +
    ':' +
    (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) +
    ':' +
    (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds())
  )
}

function onlyDateFormat(data) {
  if (!data) {
    return "----/--/--"
  }
  let date = new Date(data)
  return (
    date.getFullYear() + '/' +
    (date.getMonth() + 1 < 10 ? '0' : '') + (date.getMonth() + 1) + '/' +
    (date.getDate() < 10 ? '0' : '') + date.getDate()
  )
}
function onlyShortDateFormat(data) {
  let date = new Date(data)
  return (
    date.getFullYear().toString().substr(2, 2) + '/' +
    (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '/' +
    (date.getDate() < 10 ? '0' + date.getDate() : date.getDate())
  )
}
function smallDateFormat(data) {
  // console.log(data)
  let date = new Date(data)
  return (
    date.getFullYear() /* .toString().substr(2, 2) */ + '/' +
    (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '/' +
    (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) +
    ' ' +
    (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) +
    ':' +
    (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) +
    ':' +
    (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds())
  )
}

function onlyTimeFormat(data) {
  let date = new Date(data)
  return (
    (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':' +
    (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes())
  )
}

function sameDay(dA, dB) {
  let d1 = new Date(dA)
  let d2 = new Date(dB)
  return d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth() && d1.getDate() === d2.getDate()
}

function formatNumber(val, decimals) {
  try {
    let n = decimals,
      x = 3,
      s = '.',
      c = ',',
      re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\D' : '$') + ')',
      num = val.toFixed(Math.max(0, ~~n));

    return (c ? num.replace('.', c) : num).replace(new RegExp(re, 'g'), '$&' + (s || ','));
  } catch (e) {
    return val;
  }
}

function formatCurrency(money) {
  try {
    return "€ " + formatNumber(money, 2);
  } catch (e) {
    return money;
  }
}

function formatPercentage(money, decimal) {
  try {
    return formatNumber((money * 100), decimal) + " %";
  } catch (e) {
    return money;
  }
}
function dateIsWeekend(dateTime) {
  let dateT = new Date(dateTime),
    day = dateT.getDay(),
    isWeekend = (day === 6) || (day === 0);    // 6 = Saturday, 0 = Sunday

  return isWeekend;
}

function encode_utf8(s) {
  return unescape(encodeURIComponent(s));
}

function decode_utf8(s) {
  return decodeURIComponent(escape(s));
}
function char_convert() {

  var chars = ["©", "Û", "®", "ž", "Ü", "Ÿ", "Ý", "$", "Þ", "%", "¡", "ß", "¢", "à", "£", "á", "À", "¤", "â", "Á", "¥", "ã", "Â", "¦", "ä", "Ã", "§", "å", "Ä", "¨", "æ", "Å", "©", "ç", "Æ", "ª", "è", "Ç", "«", "é", "È", "¬", "ê", "É", "­", "ë", "Ê", "®", "ì", "Ë", "¯", "í", "Ì", "°", "î", "Í", "±", "ï", "Î", "²", "ð", "Ï", "³", "ñ", "Ð", "´", "ò", "Ñ", "µ", "ó", "Õ", "¶", "ô", "Ö", "·", "õ", "Ø", "¸", "ö", "Ù", "¹", "÷", "Ú", "º", "ø", "Û", "»", "ù", "Ü", "@", "¼", "ú", "Ý", "½", "û", "Þ", "€", "¾", "ü", "ß", "¿", "ý", "à", "‚", "À", "þ", "á", "ƒ", "Á", "ÿ", "å", "„", "Â", "æ", "…", "Ã", "ç", "†", "Ä", "è", "‡", "Å", "é", "ˆ", "Æ", "ê", "‰", "Ç", "ë", "Š", "È", "ì", "‹", "É", "í", "Œ", "Ê", "î", "Ë", "ï", "Ž", "Ì", "ð", "Í", "ñ", "Î", "ò", "‘", "Ï", "ó", "’", "Ð", "ô", "“", "Ñ", "õ", "”", "Ò", "ö", "•", "Ó", "ø", "–", "Ô", "ù", "—", "Õ", "ú", "˜", "Ö", "û", "™", "×", "ý", "š", "Ø", "þ", "›", "Ù", "ÿ", "œ", "Ú"];
  var codes = ["&copy;", "&#219;", "&reg;", "&#158;", "&#220;", "&#159;", "&#221;", "&#36;", "&#222;", "&#37;", "&#161;", "&#223;", "&#162;", "&#224;", "&#163;", "&#225;", "&Agrave;", "&#164;", "&#226;", "&Aacute;", "&#165;", "&#227;", "&Acirc;", "&#166;", "&#228;", "&Atilde;", "&#167;", "&#229;", "&Auml;", "&#168;", "&#230;", "&Aring;", "&#169;", "&#231;", "&AElig;", "&#170;", "&#232;", "&Ccedil;", "&#171;", "&#233;", "&Egrave;", "&#172;", "&#234;", "&Eacute;", "&#173;", "&#235;", "&Ecirc;", "&#174;", "&#236;", "&Euml;", "&#175;", "&#237;", "&Igrave;", "&#176;", "&#238;", "&Iacute;", "&#177;", "&#239;", "&Icirc;", "&#178;", "&#240;", "&Iuml;", "&#179;", "&#241;", "&ETH;", "&#180;", "&#242;", "&Ntilde;", "&#181;", "&#243;", "&Otilde;", "&#182;", "&#244;", "&Ouml;", "&#183;", "&#245;", "&Oslash;", "&#184;", "&#246;", "&Ugrave;", "&#185;", "&#247;", "&Uacute;", "&#186;", "&#248;", "&Ucirc;", "&#187;", "&#249;", "&Uuml;", "&#64;", "&#188;", "&#250;", "&Yacute;", "&#189;", "&#251;", "&THORN;", "&#128;", "&#190;", "&#252", "&szlig;", "&#191;", "&#253;", "&agrave;", "&#130;", "&#192;", "&#254;", "&aacute;", "&#131;", "&#193;", "&#255;", "&aring;", "&#132;", "&#194;", "&aelig;", "&#133;", "&#195;", "&ccedil;", "&#134;", "&#196;", "&egrave;", "&#135;", "&#197;", "&eacute;", "&#136;", "&#198;", "&ecirc;", "&#137;", "&#199;", "&euml;", "&#138;", "&#200;", "&igrave;", "&#139;", "&#201;", "&iacute;", "&#140;", "&#202;", "&icirc;", "&#203;", "&iuml;", "&#142;", "&#204;", "&eth;", "&#205;", "&ntilde;", "&#206;", "&ograve;", "&#145;", "&#207;", "&oacute;", "&#146;", "&#208;", "&ocirc;", "&#147;", "&#209;", "&otilde;", "&#148;", "&#210;", "&ouml;", "&#149;", "&#211;", "&oslash;", "&#150;", "&#212;", "&ugrave;", "&#151;", "&#213;", "&uacute;", "&#152;", "&#214;", "&ucirc;", "&#153;", "&#215;", "&yacute;", "&#154;", "&#216;", "&thorn;", "&#155;", "&#217;", "&yuml;", "&#156;", "&#218;"];

  for (x = 0; x < chars.length; x++) {
    for (i = 0; i < arguments.length; i++) {
      arguments[i].value = arguments[i].value.replace(chars[x], codes[x]);
    }
  }
}

function decodeString(str) {
  //    &#xC3;&#xB5; -> \xC3\xB5
  let codesObjDecode = [{ unicode: "U+00A1", decode: "¡", code: "&#xc2;&#xa1;" }, { unicode: "U+00A2", decode: "¢", code: "&#xc2;&#xa2;" }, { unicode: "U+00A3", decode: "£", code: "&#xc2;&#xa3;" }, { unicode: "U+00A4", decode: "¤", code: "&#xc2;&#xa4;" }, { unicode: "U+00A5", decode: "¥", code: "&#xc2;&#xa5;" }, { unicode: "U+00A6", decode: "¦", code: "&#xc2;&#xa6;" }, { unicode: "U+00A7", decode: "§", code: "&#xc2;&#xa7;" }, { unicode: "U+00A8", decode: "¨", code: "&#xc2;&#xa8;" }, { unicode: "U+00A9", decode: "©", code: "&#xc2;&#xa9;" }, { unicode: "U+00AA", decode: "ª", code: "&#xc2;&#xaa;" }, { unicode: "U+00AB", decode: "«", code: "&#xc2;&#xab;" }, { unicode: "U+00AC", decode: "¬", code: "&#xc2;&#xac;" }, { unicode: "U+00AD", decode: "", code: "&#xc2;&#xad;" }, { unicode: "U+00AE", decode: "®", code: "&#xc2;&#xae;" }, { unicode: "U+00AF", decode: "¯", code: "&#xc2;&#xaf;" }, { unicode: "U+00B0", decode: "°", code: "&#xc2;&#xb0;" }, { unicode: "U+00B1", decode: "±", code: "&#xc2;&#xb1;" }, { unicode: "U+00B2", decode: "²", code: "&#xc2;&#xb2;" }, { unicode: "U+00B3", decode: "³", code: "&#xc2;&#xb3;" }, { unicode: "U+00B4", decode: "´", code: "&#xc2;&#xb4;" }, { unicode: "U+00B5", decode: "µ", code: "&#xc2;&#xb5;" }, { unicode: "U+00B6", decode: "¶", code: "&#xc2;&#xb6;" }, { unicode: "U+00B7", decode: "·", code: "&#xc2;&#xb7;" }, { unicode: "U+00B8", decode: "¸", code: "&#xc2;&#xb8;" }, { unicode: "U+00B9", decode: "¹", code: "&#xc2;&#xb9;" }, { unicode: "U+00BA", decode: "º", code: "&#xc2;&#xba;" }, { unicode: "U+00BB", decode: "»", code: "&#xc2;&#xbb;" }, { unicode: "U+00BC", decode: "¼", code: "&#xc2;&#xbc;" }, { unicode: "U+00BD", decode: "½", code: "&#xc2;&#xbd;" }, { unicode: "U+00BE", decode: "¾", code: "&#xc2;&#xbe;" }, { unicode: "U+00BF", decode: "¿", code: "&#xc2;&#xbf;" }, { unicode: "U+00C0", decode: "À", code: "&#xc3;&#x80;" }, { unicode: "U+00C1", decode: "Á", code: "&#xc3;&#x81;" }, { unicode: "U+00C2", decode: "Â", code: "&#xc3;&#x82;" }, { unicode: "U+00C3", decode: "Ã", code: "&#xc3;&#x83;" }, { unicode: "U+00C4", decode: "Ä", code: "&#xc3;&#x84;" }, { unicode: "U+00C5", decode: "Å", code: "&#xc3;&#x85;" }, { unicode: "U+00C6", decode: "Æ", code: "&#xc3;&#x86;" }, { unicode: "U+00C7", decode: "Ç", code: "&#xc3;&#x87;" }, { unicode: "U+00C8", decode: "È", code: "&#xc3;&#x88;" }, { unicode: "U+00C9", decode: "É", code: "&#xc3;&#x89;" }, { unicode: "U+00CA", decode: "Ê", code: "&#xc3;&#x8a;" }, { unicode: "U+00CB", decode: "Ë", code: "&#xc3;&#x8b;" }, { unicode: "U+00CC", decode: "Ì", code: "&#xc3;&#x8c;" }, { unicode: "U+00CD", decode: "Í", code: "&#xc3;&#x8d;" }, { unicode: "U+00CE", decode: "Î", code: "&#xc3;&#x8e;" }, { unicode: "U+00CF", decode: "Ï", code: "&#xc3;&#x8f;" }, { unicode: "U+00D0", decode: "Ð", code: "&#xc3;&#x90;" }, { unicode: "U+00D1", decode: "Ñ", code: "&#xc3;&#x91;" }, { unicode: "U+00D2", decode: "Ò", code: "&#xc3;&#x92;" }, { unicode: "U+00D3", decode: "Ó", code: "&#xc3;&#x93;" }, { unicode: "U+00D4", decode: "Ô", code: "&#xc3;&#x94;" }, { unicode: "U+00D5", decode: "Õ", code: "&#xc3;&#x95;" }, { unicode: "U+00D6", decode: "Ö", code: "&#xc3;&#x96;" }, { unicode: "U+00D7", decode: "×", code: "&#xc3;&#x97;" }, { unicode: "U+00D8", decode: "Ø", code: "&#xc3;&#x98;" }, { unicode: "U+00D9", decode: "Ù", code: "&#xc3;&#x99;" }, { unicode: "U+00DA", decode: "Ú", code: "&#xc3;&#x9a;" }, { unicode: "U+00DB", decode: "Û", code: "&#xc3;&#x9b;" }, { unicode: "U+00DC", decode: "Ü", code: "&#xc3;&#x9c;" }, { unicode: "U+00DD", decode: "Ý", code: "&#xc3;&#x9d;" }, { unicode: "U+00DE", decode: "Þ", code: "&#xc3;&#x9e;" }, { unicode: "U+00DF", decode: "ß", code: "&#xc3;&#x9f;" }, { unicode: "U+00E0", decode: "à", code: "&#xc3;&#xa0;" }, { unicode: "U+00E1", decode: "á", code: "&#xc3;&#xa1;" }, { unicode: "U+00E2", decode: "â", code: "&#xc3;&#xa2;" }, { unicode: "U+00E3", decode: "ã", code: "&#xc3;&#xa3;" }, { unicode: "U+00E4", decode: "ä", code: "&#xc3;&#xa4;" }, { unicode: "U+00E5", decode: "å", code: "&#xc3;&#xa5;" }, { unicode: "U+00E6", decode: "æ", code: "&#xc3;&#xa6;" }, { unicode: "U+00E7", decode: "ç", code: "&#xc3;&#xa7;" }, { unicode: "U+00E8", decode: "è", code: "&#xc3;&#xa8;" }, { unicode: "U+00E9", decode: "é", code: "&#xc3;&#xa9;" }, { unicode: "U+00EA", decode: "ê", code: "&#xc3;&#xaa;" }, { unicode: "U+00EB", decode: "ë", code: "&#xc3;&#xab;" }, { unicode: "U+00EC", decode: "ì", code: "&#xc3;&#xac;" }, { unicode: "U+00ED", decode: "í", code: "&#xc3;&#xad;" }, { unicode: "U+00EE", decode: "î", code: "&#xc3;&#xae;" }, { unicode: "U+00EF", decode: "ï", code: "&#xc3;&#xaf;" }, { unicode: "U+00F0", decode: "ð", code: "&#xc3;&#xb0;" }, { unicode: "U+00F1", decode: "ñ", code: "&#xc3;&#xb1;" }, { unicode: "U+00F2", decode: "ò", code: "&#xc3;&#xb2;" }, { unicode: "U+00F3", decode: "ó", code: "&#xc3;&#xb3;" }, { unicode: "U+00F4", decode: "ô", code: "&#xc3;&#xb4;" }, { unicode: "U+00F5", decode: "õ", code: "&#xc3;&#xb5;" }, { unicode: "U+00F6", decode: "ö", code: "&#xc3;&#xb6;" }, { unicode: "U+00F7", decode: "÷", code: "&#xc3;&#xb7;" }, { unicode: "U+00F8", decode: "ø", code: "&#xc3;&#xb8;" }, { unicode: "U+00F9", decode: "ù", code: "&#xc3;&#xb9;" }, { unicode: "U+00FA", decode: "ú", code: "&#xc3;&#xba;" }, { unicode: "U+00FB", decode: "û", code: "&#xc3;&#xbb;" }, { unicode: "U+00FC", decode: "ü", code: "&#xc3;&#xbc;" }, { unicode: "U+00FD", decode: "ý", code: "&#xc3;&#xbd;" }, { unicode: "U+00FE", decode: "þ", code: "&#xc3;&#xbe;" }, { unicode: "U+00FF", decode: "ÿ", code: "&#xc3;&#xbf" }, { unicode: "", decode: "&", code: "&amp;" }],
    newStr = str;
  for (let index = 0; index < codesObjDecode.length; index++) {
    newStr = newStr.replace(new RegExp(codesObjDecode[index].code, "ig"), codesObjDecode[index].decode);
  }
  return newStr;
}

function checkDuplicates(obj) {
  let unique = obj.filter(function (itm, i, a) {
    return i == a.indexOf(itm);
  });
  return unique.length == obj.length ? true : false;
}
function checkDuplicatesV2(arr) {
  const dataValArr = arr;
  const count = dataValArr =>
    dataValArr.reduce((a, b) => ({
      ...a,
      [b]: (a[b] || 0) + 1
    }), {}); // don't forget to initialize the accumulator

  const duplicates = dict =>
    Object.keys(dict).filter((a) => dict[a] > 1);

  return {
    status: checkDuplicates(arr),
    unique: count(dataValArr),
    duplicate: duplicates(count(dataValArr))
  };
}

export default {
  dateFormat,
  onlyDateFormat,
  onlyShortDateFormat,
  smallDateFormat,
  onlyTimeFormat,
  sameDay,
  formatCurrency,
  dateIsWeekend,
  formatNumber,
  formatPercentage,
  encode_utf8,
  decode_utf8,
  char_convert,
  decodeString,
  checkDuplicates,
  checkDuplicatesV2
}
