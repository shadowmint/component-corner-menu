module.exports = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (items, title, title_style, undefined) {
buf.push("<div" + (jade.cls([title_style], [true])) + "><h1> " + (jade.escape(null == (jade_interp = title) ? "" : jade_interp)) + "</h1><ul>");
// iterate items
;(function(){
  var $$obj = items;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var item = $$obj[$index];

buf.push("<li>");
if ( item.task && (item.task != ''))
{
buf.push("<a" + (jade.attr("href", item.task, true, false)) + ">" + (jade.escape(null == (jade_interp = item.title) ? "" : jade_interp)) + "</a>");
}
else
{
buf.push("<span>" + (jade.escape(null == (jade_interp = item.title) ? "" : jade_interp)) + "</span>");
}
buf.push("</li>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var item = $$obj[$index];

buf.push("<li>");
if ( item.task && (item.task != ''))
{
buf.push("<a" + (jade.attr("href", item.task, true, false)) + ">" + (jade.escape(null == (jade_interp = item.title) ? "" : jade_interp)) + "</a>");
}
else
{
buf.push("<span>" + (jade.escape(null == (jade_interp = item.title) ? "" : jade_interp)) + "</span>");
}
buf.push("</li>");
    }

  }
}).call(this);

buf.push("</ul></div>");}.call(this,"items" in locals_for_with?locals_for_with.items:typeof items!=="undefined"?items:undefined,"title" in locals_for_with?locals_for_with.title:typeof title!=="undefined"?title:undefined,"title_style" in locals_for_with?locals_for_with.title_style:typeof title_style!=="undefined"?title_style:undefined,"undefined" in locals_for_with?locals_for_with.undefined:typeof undefined!=="undefined"?undefined:undefined));;return buf.join("");
}