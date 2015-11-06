'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = component;

var _jquery = require('jquery/dist/jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _runtime = require('jade/runtime');

var _runtime2 = _interopRequireDefault(_runtime);

var _corner_menu = require('./corner_menu');

var _assets = require('./assets');

var _assets2 = _interopRequireDefault(_assets);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function component(data) {

  // Export jade runtime
  window.jade = _runtime2.default;

  // Inject styles
  (0, _jquery2.default)('head').append('<style id=\'#component-corner-menu\'>' + _assets2.default['styles.css'] + '</style>');

  // Create a global root element
  var $root = (0, _jquery2.default)('<div class="corner-menu-box">');
  (0, _jquery2.default)('body').append($root);

  // Handle component instances
  (0, _jquery2.default)('.corner-menu').each(function (i, el) {
    new _corner_menu.CornerMenu($root, (0, _jquery2.default)(el));
  });
}