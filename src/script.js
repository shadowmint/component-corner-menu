class CornerMenu {
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

    // Load data attributes
    var param = (key) => {
      var value = this.$el.attr(key);
      if (value) { return value; }
      return 'default';
    };
    this.data = {
      items: items,
      title: param('data-title'),
      short: param('data-short')
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
    this.$el.find('h1').click(() => {
      this.active = !this.active;
      this.redraw();
    });
  }
}
