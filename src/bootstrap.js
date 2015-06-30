function bootstrap(data) {
  return ($, jade) => {

    // Deps
    if (!$) { throw new Error('component: corner_menu: missing jquery'); }
    if (!jade) { throw new Error('component: corner_menu: missing jade runtime'); }

    // Export jade runtime
    window.jade = jade;

    // Js importer
    function load(value, key) {
      var value = `(function(){ ${value} return ${key}; })()`;
      return eval(value);
    }

    // Inject styles
    $('head').append(`<style id='#component-corner-menu'>${data['styles.css']}</style>`);

    // Load templates
    data['full'] = load(data['templates/full.js'], 'template');
    data['short'] = load(data['templates/short.js'], 'template');

    // Create a global root element
    var $root = $('<div class="corner-menu-box">');
    $('body').append($root);

    // Handle component instances
    var CornerMenu = load(data['script.js'], 'CornerMenu');
    $('.corner-menu').each((i, el) => {
      new CornerMenu($root, $(el), data);
    });
  };
}
