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
}; return bootstrap({"script.js":"'use strict';\n\nvar _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }\n\nvar Data = (function () {\n\n  /**\n   * Create a new instance with a root\n   * @param root The root element\n   */\n\n  function Data(el) {\n    _classCallCheck(this, Data);\n\n    this.$root = el;\n    this.cache_key = null;\n    this.cache_value = null;\n  }\n\n  _createClass(Data, [{\n    key: 'param',\n\n    /** Fetch a data attribute by key */\n    value: function param(key) {\n      if (this.cache_key == key) {\n        return this.cache_value;\n      }\n      var value = this.$root.attr(key);\n      if (!value) {\n        value = '';\n      }\n      this.cache_key = key;\n      this.cache_value = value;\n      return value;\n    }\n  }, {\n    key: 'parts',\n\n    /** Split a data attribute by | and return the trimmed parts */\n    value: function parts(key) {\n      var raw = this.param(key);\n      var parts = raw.split('|');\n      for (var i = 0; i < parts.length; ++i) {\n        parts[i] = parts[i].trim();\n      }\n      return parts;\n    }\n  }, {\n    key: 'nth',\n\n    /** Return the nth part of a data attribute */\n    value: function nth(key, index) {\n      var rtn = '';\n      var bits = this.parts(key);\n      if (index < bits.length) {\n        rtn = bits[index];\n      }\n      if (rtn[0] == '.') {\n        rtn = rtn.substr(1);\n      }\n      return rtn;\n    }\n  }]);\n\n  return Data;\n})();\n\nvar CornerMenu = (function () {\n\n  /** Create a new instance */\n\n  function CornerMenu($root, $el, data) {\n    _classCallCheck(this, CornerMenu);\n\n    // Setup\n    this.$el = $el;\n    this.templates = {};\n    this.templates.short = data.short;\n    this.templates.full = data.full;\n    this.active = false;\n\n    // Find and load links\n    var items = [];\n    this.$el.find('a').each(function (i, el) {\n      var $el = $(el);\n      items.push({ title: $el.text(), task: $el.attr('href') });\n    });\n\n    var data = new Data($el);\n    this.data = {\n      items: items,\n      title: data.nth('data-title', 0),\n      title_style: data.nth('data-title', 1),\n      short: data.nth('data-short', 0),\n      short_style: data.nth('data-short', 1)\n    };\n\n    // Move content to shared root\n    $root.append($el);\n\n    // If the element has an id, bind it to the window\n    var id = this.$el.attr('id');\n    if (id) {\n      if (!window['corner-menu']) {\n        window['corner-menu'] = {};\n      }\n      window['corner-menu'][id] = this;\n    }\n\n    // Draw initial state\n    this.redraw();\n  }\n\n  _createClass(CornerMenu, [{\n    key: 'clear',\n\n    /** Clear all held menu items */\n    value: function clear() {\n      this.data.items = [];\n    }\n  }, {\n    key: 'push',\n\n    /** Push a menu item */\n    value: function push(title, task) {\n      this.data.items.push({ title: title, task: task });\n    }\n  }, {\n    key: 'redraw',\n\n    /** Redraw this element */\n    value: function redraw() {\n      var _this = this;\n\n      if (this.active) {\n        this.$el.html(this.templates.full(this.data));\n        this.$el.addClass('state--active');\n      } else {\n        this.$el.html(this.templates.short(this.data));\n        this.$el.removeClass('state--active');\n      }\n\n      // Event handlers\n      var key = this.active ? 'h1' : '> div';\n      this.$el.find(key).click(function () {\n        _this.active = !_this.active;\n        _this.redraw();\n      });\n    }\n  }]);\n\n  return CornerMenu;\n})();","styles.css":"/* Constants */\n/* Animation to open menu */\n@-webkit-keyframes showmenu {\n  0% {\n    line-height: 0em;\n    height: 0em; }\n  100% {\n    height: 1.5em;\n    line-height: 1.5em; } }\n@keyframes showmenu {\n  0% {\n    line-height: 0em;\n    height: 0em; }\n  100% {\n    height: 1.5em;\n    line-height: 1.5em; } }\n\n.corner-menu > div {\n  display: inline-block; }\n\n.corner-menu h1 {\n  margin: 0px;\n  padding: 0px; }\n\n.corner-menu ul {\n  padding: 0px;\n  margin: 0px; }\n  .corner-menu ul li {\n    height: 0em;\n    line-height: 0em;\n    overflow: hidden;\n    list-style-type: none;\n    padding: 0px;\n    margin: 0px;\n    width: 100%; }\n\n.corner-menu.state--active li {\n  height: 1.5em;\n  line-height: 1.5em;\n  -webkit-animation-name: showmenu;\n          animation-name: showmenu;\n  -webkit-animation-duration: 1s;\n          animation-duration: 1s; }\n\n.corner-menu-box {\n  position: fixed;\n  left: 0px;\n  top: 0px; }\n","templates/full.js":"function template(locals) {\nvar buf = [];\nvar jade_mixins = {};\nvar jade_interp;\n;var locals_for_with = (locals || {});(function (items, title, title_style, undefined) {\nbuf.push(\"<div\" + (jade.cls([title_style], [true])) + \"><h1> \" + (jade.escape(null == (jade_interp = title) ? \"\" : jade_interp)) + \"</h1><ul>\");\n// iterate items\n;(function(){\n  var $$obj = items;\n  if ('number' == typeof $$obj.length) {\n\n    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {\n      var item = $$obj[$index];\n\nbuf.push(\"<li><a\" + (jade.attr(\"href\", item.task, true, false)) + \">\" + (jade.escape(null == (jade_interp = item.title) ? \"\" : jade_interp)) + \"</a></li>\");\n    }\n\n  } else {\n    var $$l = 0;\n    for (var $index in $$obj) {\n      $$l++;      var item = $$obj[$index];\n\nbuf.push(\"<li><a\" + (jade.attr(\"href\", item.task, true, false)) + \">\" + (jade.escape(null == (jade_interp = item.title) ? \"\" : jade_interp)) + \"</a></li>\");\n    }\n\n  }\n}).call(this);\n\nbuf.push(\"</ul></div>\");}.call(this,\"items\" in locals_for_with?locals_for_with.items:typeof items!==\"undefined\"?items:undefined,\"title\" in locals_for_with?locals_for_with.title:typeof title!==\"undefined\"?title:undefined,\"title_style\" in locals_for_with?locals_for_with.title_style:typeof title_style!==\"undefined\"?title_style:undefined,\"undefined\" in locals_for_with?locals_for_with.undefined:typeof undefined!==\"undefined\"?undefined:undefined));;return buf.join(\"\");\n}","templates/short.js":"function template(locals) {\nvar buf = [];\nvar jade_mixins = {};\nvar jade_interp;\n;var locals_for_with = (locals || {});(function (short, short_style) {\nbuf.push(\"<div\" + (jade.cls([short_style], [true])) + \"><h1> \" + (jade.escape(null == (jade_interp = short) ? \"\" : jade_interp)) + \"</h1></div>\");}.call(this,\"short\" in locals_for_with?locals_for_with.short:typeof short!==\"undefined\"?short:undefined,\"short_style\" in locals_for_with?locals_for_with.short_style:typeof short_style!==\"undefined\"?short_style:undefined));;return buf.join(\"\");\n}"}); })();
return Component;
}));
