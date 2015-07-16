/** Common component helper class */
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Root = (function () {

  /**
   * Create a new instance with a root
   * @param root The root element
   */

  function Root(el) {
    _classCallCheck(this, Root);

    this.$root = el;
    this.cache_key = null;
    this.cache_value = null;
  }

  _createClass(Root, [{
    key: 'param',

    /** Fetch a data attribute by key */
    value: function param(key) {
      if (this.cache_key == key) {
        return this.cache_value;
      }
      var value = this.$root.attr(key);
      if (!value) {
        value = '';
      }
      this.cache_key = key;
      this.cache_value = value;
      return value;
    }
  }, {
    key: 'parts',

    /** Split a data attribute by | and return the trimmed parts */
    value: function parts(key) {
      var raw = this.param(key);
      var parts = raw.split('|');
      for (var i = 0; i < parts.length; ++i) {
        parts[i] = parts[i].trim();
      }
      return parts;
    }
  }, {
    key: 'nth',

    /** Return the nth part of a data attribute */
    value: function nth(key, index) {
      var rtn = '';
      var bits = this.parts(key);
      if (index < bits.length) {
        rtn = bits[index];
      }
      if (rtn[0] == '.') {
        rtn = rtn.substr(1);
      }
      return rtn;
    }
  }]);

  return Root;
})();

exports.Root = Root;