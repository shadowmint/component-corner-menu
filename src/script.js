class Data {

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

class CornerMenu {

  /** Create a new instance */
  constructor($root, $el, data) {

    // Setup
    this.$el = $el;
    this.templates = {};
    this.templates.short = data.short;
    this.templates.full = data.full;
    this.active = false;

    // Find and load links
    var items = [];
    this.$el.find('a').each((i, el) => {
      var $el = $(el);
      items.push({title: $el.text(), task: $el.attr('href')});
    });

    var data = new Data($el);
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
  clear() {
    this.data.items = [];
  }

  /** Push a menu item */
  push(title, task) {
    this.data.items.push({title: title, task: task});
  }

  /** Redraw this element */
  redraw() {
    if (this.active) {
      this.$el.html(this.templates.full(this.data));
      this.$el.addClass('state--active');
    }
    else {
      this.$el.html(this.templates.short(this.data));
      this.$el.removeClass('state--active');
    }

    // Event handlers
    var key = this.active ? 'h1' : '> div';
    this.$el.find(key).click(() => {
      this.active = !this.active;
      this.redraw();
    });
  }
}
