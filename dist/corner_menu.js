'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _jqueryDistJquery = require('jquery/dist/jquery');

var _jqueryDistJquery2 = _interopRequireDefault(_jqueryDistJquery);

var _componentUtilsDistRoot = require('component-utils/dist/root');

var _templatesShort = require('./templates/short');

var _templatesShort2 = _interopRequireDefault(_templatesShort);

var _templatesFull = require('./templates/full');

var _templatesFull2 = _interopRequireDefault(_templatesFull);

var CornerMenu = (function () {

  /** Create a new instance */

  function CornerMenu($root, $el) {
    _classCallCheck(this, CornerMenu);

    // Setup
    this.$el = $el;
    this.templates = {};
    this.templates.short = _templatesShort2['default'];
    this.templates.full = _templatesFull2['default'];
    this.active = false;

    // Find and load links
    var items = [];
    this.$el.find('a').each(function (i, el) {
      var $el = (0, _jqueryDistJquery2['default'])(el);
      items.push({ title: $el.text(), task: $el.attr('href') });
    });

    var data = new _componentUtilsDistRoot.Root($el);
    this.data = {
      items: items,
      title: data.nth('data-title', 0),
      title_style: data.nth('data-title', 1),
      short: data.nth('data-short', 0),
      short_style: data.nth('data-short', 1)
    };

    // Move content to shared root
    $root.append($el);

    // If the element has an id, bind it to the window
    var id = this.$el.attr('id');
    if (id) {
      if (!window['corner-menu']) {
        window['corner-menu'] = {};
      }
      window['corner-menu'][id] = this;
    }

    // Draw initial state
    this.redraw();
  }

  /** Clear all held menu items */

  _createClass(CornerMenu, [{
    key: 'clear',
    value: function clear() {
      this.data.items = [];
    }

    /** Push a menu item */
  }, {
    key: 'push',
    value: function push(title, task) {
      this.data.items.push({ title: title, task: task });
    }

    /** Redraw this element */
  }, {
    key: 'redraw',
    value: function redraw() {
      var _this = this;

      if (this.active) {
        this.$el.html(this.templates.full(this.data));
        this.$el.addClass('state--active');
      } else {
        this.$el.html(this.templates.short(this.data));
        this.$el.removeClass('state--active');
      }

      // Event handlers
      var key = this.active ? 'h1' : '> div';
      this.$el.find(key).click(function () {
        _this.active = !_this.active;
        _this.redraw();
      });
    }
  }]);

  return CornerMenu;
})();

exports.CornerMenu = CornerMenu;