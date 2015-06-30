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

    // Draw initial state
    this.redraw();
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
