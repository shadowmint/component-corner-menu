;(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.Component = factory();
  }
}(this, function() {
var Component = (function() { 'use strict';

function bootstrap(data) {
  return function ($, jade) {

    // Deps
    if (!$) {
      throw new Error('component: corner_menu: missing jquery');
    }
    if (!jade) {
      throw new Error('component: corner_menu: missing jade runtime');
    }

    // Export jade runtime
    window.jade = jade;

    // Js importer
    function load(value, key) {
      var value = '(function(){ ' + value + ' return ' + key + '; })()';
      return eval(value);
    }

    // Inject styles
    $('head').append('<style id=\'#component-corner-menu\'>' + data['styles.css'] + '</style>');

    // Load templates
    data['full'] = load(data['templates/full.js'], 'template');
    data['short'] = load(data['templates/short.js'], 'template');

    // Create a global root element
    var $root = $('<div class="corner-menu-box">');
    $('body').append($root);

    // Handle component instances
    var CornerMenu = load(data['script.js'], 'CornerMenu');
    $('.corner-menu').each(function (i, el) {
      new CornerMenu($root, $(el), data);
    });
  };
}; return bootstrap({"markup.html":"<div class=\"class1\"><h1> \nHi</h1></div>","markup.js":"function template(locals) {\nvar buf = [];\nvar jade_mixins = {};\nvar jade_interp;\n;var locals_for_with = (locals || {});(function (items, title, undefined) {\nbuf.push(\"<h1> \" + (jade.escape(null == (jade_interp = title) ? \"\" : jade_interp)) + \"</h1><ul>\");\n// iterate items\n;(function(){\n  var $$obj = items;\n  if ('number' == typeof $$obj.length) {\n\n    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {\n      var item = $$obj[$index];\n\nbuf.push(\"<li>\" + (jade.escape(null == (jade_interp = item) ? \"\" : jade_interp)) + \"</li>\");\n    }\n\n  } else {\n    var $$l = 0;\n    for (var $index in $$obj) {\n      $$l++;      var item = $$obj[$index];\n\nbuf.push(\"<li>\" + (jade.escape(null == (jade_interp = item) ? \"\" : jade_interp)) + \"</li>\");\n    }\n\n  }\n}).call(this);\n\nbuf.push(\"</ul>\");}.call(this,\"items\" in locals_for_with?locals_for_with.items:typeof items!==\"undefined\"?items:undefined,\"title\" in locals_for_with?locals_for_with.title:typeof title!==\"undefined\"?title:undefined,\"undefined\" in locals_for_with?locals_for_with.undefined:typeof undefined!==\"undefined\"?undefined:undefined));;return buf.join(\"\");\n}","script.js":"'use strict';\n\nvar _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }\n\nvar CornerMenu = (function () {\n  function CornerMenu($root, $el, data) {\n    var _this = this;\n\n    _classCallCheck(this, CornerMenu);\n\n    // Setup\n    this.$el = $el;\n    this.templates = {};\n    this.templates.short = data.short;\n    this.templates.full = data.full;\n    this.active = false;\n\n    // Find and load links\n    var items = [];\n    this.$el.find('a').each(function (i, el) {\n      var $el = $(el);\n      items.push({ title: $el.text(), task: $el.attr('href') });\n    });\n\n    // Load data attributes\n    var param = function param(key) {\n      var value = _this.$el.attr(key);\n      if (value) {\n        return value;\n      }\n      return 'default';\n    };\n    this.data = {\n      items: items,\n      title: param('data-title'),\n      short: param('data-short')\n    };\n\n    // Move content to shared root\n    $root.append($el);\n\n    // Draw initial state\n    this.redraw();\n  }\n\n  _createClass(CornerMenu, [{\n    key: 'redraw',\n\n    /** Redraw this element */\n    value: function redraw() {\n      var _this2 = this;\n\n      if (this.active) {\n        this.$el.html(this.templates.full(this.data));\n        this.$el.addClass('state--active');\n      } else {\n        this.$el.html(this.templates.short(this.data));\n        this.$el.removeClass('state--active');\n      }\n\n      // Event handlers\n      this.$el.find('h1').click(function () {\n        _this2.active = !_this2.active;\n        _this2.redraw();\n      });\n    }\n  }]);\n\n  return CornerMenu;\n})();","styles.css":"/* Constants */\n/* Animation to open menu */\n@-webkit-keyframes showmenu {\n  0% {\n    line-height: 0em;\n    height: 0em; }\n  100% {\n    height: 1.5em;\n    line-height: 1.5em; } }\n@keyframes showmenu {\n  0% {\n    line-height: 0em;\n    height: 0em; }\n  100% {\n    height: 1.5em;\n    line-height: 1.5em; } }\n\n.corner-menu h1 {\n  margin: 0px;\n  padding: 0px; }\n\n.corner-menu ul {\n  padding: 0px;\n  margin: 0px; }\n  .corner-menu ul li {\n    height: 0em;\n    line-height: 0em;\n    overflow: hidden;\n    list-style-type: none;\n    padding: 0px;\n    margin: 0px;\n    width: 100%; }\n\n.corner-menu.state--active li {\n  height: 1.5em;\n  line-height: 1.5em;\n  -webkit-animation-name: showmenu;\n          animation-name: showmenu;\n  -webkit-animation-duration: 1s;\n          animation-duration: 1s; }\n\n.corner-menu-box {\n  position: fixed;\n  left: 0px;\n  top: 0px; }\n","short.js":"function template(locals) {\nvar buf = [];\nvar jade_mixins = {};\nvar jade_interp;\n;var locals_for_with = (locals || {});(function (items, title, undefined) {\nbuf.push(\"<h1> \" + (jade.escape(null == (jade_interp = title) ? \"\" : jade_interp)) + \"</h1><ul>\");\n// iterate items\n;(function(){\n  var $$obj = items;\n  if ('number' == typeof $$obj.length) {\n\n    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {\n      var item = $$obj[$index];\n\nbuf.push(\"<li>\" + (jade.escape(null == (jade_interp = item) ? \"\" : jade_interp)) + \"</li>\");\n    }\n\n  } else {\n    var $$l = 0;\n    for (var $index in $$obj) {\n      $$l++;      var item = $$obj[$index];\n\nbuf.push(\"<li>\" + (jade.escape(null == (jade_interp = item) ? \"\" : jade_interp)) + \"</li>\");\n    }\n\n  }\n}).call(this);\n\nbuf.push(\"</ul>\");}.call(this,\"items\" in locals_for_with?locals_for_with.items:typeof items!==\"undefined\"?items:undefined,\"title\" in locals_for_with?locals_for_with.title:typeof title!==\"undefined\"?title:undefined,\"undefined\" in locals_for_with?locals_for_with.undefined:typeof undefined!==\"undefined\"?undefined:undefined));;return buf.join(\"\");\n}","full.js":"function template(locals) {\nvar buf = [];\nvar jade_mixins = {};\nvar jade_interp;\n;var locals_for_with = (locals || {});(function (items, title, undefined) {\nbuf.push(\"<h1> \" + (jade.escape(null == (jade_interp = title) ? \"\" : jade_interp)) + \"</h1><ul>\");\n// iterate items\n;(function(){\n  var $$obj = items;\n  if ('number' == typeof $$obj.length) {\n\n    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {\n      var item = $$obj[$index];\n\nbuf.push(\"<li>\" + (jade.escape(null == (jade_interp = item) ? \"\" : jade_interp)) + \"</li>\");\n    }\n\n  } else {\n    var $$l = 0;\n    for (var $index in $$obj) {\n      $$l++;      var item = $$obj[$index];\n\nbuf.push(\"<li>\" + (jade.escape(null == (jade_interp = item) ? \"\" : jade_interp)) + \"</li>\");\n    }\n\n  }\n}).call(this);\n\nbuf.push(\"</ul>\");}.call(this,\"items\" in locals_for_with?locals_for_with.items:typeof items!==\"undefined\"?items:undefined,\"title\" in locals_for_with?locals_for_with.title:typeof title!==\"undefined\"?title:undefined,\"undefined\" in locals_for_with?locals_for_with.undefined:typeof undefined!==\"undefined\"?undefined:undefined));;return buf.join(\"\");\n}","templates/full.js":"function template(locals) {\nvar buf = [];\nvar jade_mixins = {};\nvar jade_interp;\n;var locals_for_with = (locals || {});(function (items, title, undefined) {\nbuf.push(\"<h1> \" + (jade.escape(null == (jade_interp = title) ? \"\" : jade_interp)) + \"</h1><ul>\");\n// iterate items\n;(function(){\n  var $$obj = items;\n  if ('number' == typeof $$obj.length) {\n\n    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {\n      var item = $$obj[$index];\n\nbuf.push(\"<li><a\" + (jade.attr(\"href\", item.task, true, false)) + \">\" + (jade.escape(null == (jade_interp = item.title) ? \"\" : jade_interp)) + \"</a></li>\");\n    }\n\n  } else {\n    var $$l = 0;\n    for (var $index in $$obj) {\n      $$l++;      var item = $$obj[$index];\n\nbuf.push(\"<li><a\" + (jade.attr(\"href\", item.task, true, false)) + \">\" + (jade.escape(null == (jade_interp = item.title) ? \"\" : jade_interp)) + \"</a></li>\");\n    }\n\n  }\n}).call(this);\n\nbuf.push(\"</ul>\");}.call(this,\"items\" in locals_for_with?locals_for_with.items:typeof items!==\"undefined\"?items:undefined,\"title\" in locals_for_with?locals_for_with.title:typeof title!==\"undefined\"?title:undefined,\"undefined\" in locals_for_with?locals_for_with.undefined:typeof undefined!==\"undefined\"?undefined:undefined));;return buf.join(\"\");\n}","templates/short.js":"function template(locals) {\nvar buf = [];\nvar jade_mixins = {};\nvar jade_interp;\n;var locals_for_with = (locals || {});(function (short) {\nbuf.push(\"<h1> \" + (jade.escape(null == (jade_interp = short) ? \"\" : jade_interp)) + \"</h1>\");}.call(this,\"short\" in locals_for_with?locals_for_with.short:typeof short!==\"undefined\"?short:undefined));;return buf.join(\"\");\n}"}); })();
return Component;
}));
