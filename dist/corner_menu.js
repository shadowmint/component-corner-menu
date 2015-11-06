'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CornerMenu = undefined;

var _jquery = require('jquery/dist/jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _root = require('component-utils/dist/root');

var _short = require('./templates/short');

var _short2 = _interopRequireDefault(_short);

var _full = require('./templates/full');

var _full2 = _interopRequireDefault(_full);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CornerMenu = exports.CornerMenu = (function () {

  /** Create a new instance */

  function CornerMenu($root, $el) {
    _classCallCheck(this, CornerMenu);

    // Setup
    this.$el = $el;
    this.templates = {};
    this.templates.short = _short2.default;
    this.templates.full = _full2.default;
    this.active = false;

    // Find and load links
    var items = [];
    this.$el.find('a').each(function (i, el) {
      var $el = (0, _jquery2.default)(el);
      items.push({ title: $el.text(), task: $el.attr('href') });
    });

    var data = new _root.Root($el);
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