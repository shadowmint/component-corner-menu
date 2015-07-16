'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = component;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _jqueryDistJquery = require('jquery/dist/jquery');

var _jqueryDistJquery2 = _interopRequireDefault(_jqueryDistJquery);

var _jadeRuntime = require('jade/runtime');

var _jadeRuntime2 = _interopRequireDefault(_jadeRuntime);

var _corner_menu = require('./corner_menu');

var _assets = require('./assets');

var _assets2 = _interopRequireDefault(_assets);

function component(data) {

  // Export jade runtime
  window.jade = _jadeRuntime2['default'];

  // Inject styles
  (0, _jqueryDistJquery2['default'])('head').append('<style id=\'#component-corner-menu\'>' + _assets2['default']['styles.css'] + '</style>');

  // Create a global root element
  var $root = (0, _jqueryDistJquery2['default'])('<div class="corner-menu-box">');
  (0, _jqueryDistJquery2['default'])('body').append($root);

  // Handle component instances
  (0, _jqueryDistJquery2['default'])('.corner-menu').each(function (i, el) {
    new _corner_menu.CornerMenu($root, (0, _jqueryDistJquery2['default'])(el));
  });
}

module.exports = exports['default'];