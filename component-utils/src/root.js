/** Common component helper class */
export class Root {

  /**
   * Create a new instance with a root
   * @param root The root element
   */
  constructor(el) {
    this.$root = el;
    this.cache_key = null;
    this.cache_value = null;
  }


  /** Fetch a data attribute by key */
  param(key) {
    if (this.cache_key == key) {
      return this.cache_value;
    }
    var value = this.$root.attr(key);
    if (!value) { value = ''; }
    this.cache_key = key;
    this.cache_value = value;
    return value;
  }

  /** Split a data attribute by | and return the trimmed parts */
  parts(key) {
    var raw = this.param(key);
    var parts = raw.split('|');
    for (var i = 0; i < parts.length; ++i) {
      parts[i] = parts[i].trim();
    }
    return parts;
  }

  /** Return the nth part of a data attribute */
  nth(key, index) {
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
}
