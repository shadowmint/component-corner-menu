module.exports = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (short, short_style) {
buf.push("<div" + (jade.cls([short_style], [true])) + "><h1> " + (jade.escape(null == (jade_interp = short) ? "" : jade_interp)) + "</h1></div>");}.call(this,"short" in locals_for_with?locals_for_with.short:typeof short!=="undefined"?short:undefined,"short_style" in locals_for_with?locals_for_with.short_style:typeof short_style!=="undefined"?short_style:undefined));;return buf.join("");
}