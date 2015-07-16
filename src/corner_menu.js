import $ from 'jquery/dist/jquery';
import {Root} from 'component-utils/dist/root';
import short_template from './templates/short';
import full_template from './templates/full';

export class CornerMenu {

  /** Create a new instance */
  constructor($root, $el) {

    // Setup
    this.$el = $el;
    this.templates = {};
    this.templates.short = short_template;
    this.templates.full = full_template;
    this.active = false;

    // Find and load links
    var items = [];
    this.$el.find('a').each((i, el) => {
      var $el = $(el);
      items.push({title: $el.text(), task: $el.attr('href')});
    });

    var data = new Root($el);
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
