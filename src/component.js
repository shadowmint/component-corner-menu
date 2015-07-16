import $ from 'jquery/dist/jquery';
import jade from 'jade/runtime';
import {CornerMenu} from './corner_menu';
import assets from './assets';

export default function component(data) {

  // Export jade runtime
  window.jade = jade;

  // Inject styles
  $('head').append(`<style id='#component-corner-menu'>${assets['styles.css']}</style>`);

  // Create a global root element
  var $root = $('<div class="corner-menu-box">');
  $('body').append($root);

  // Handle component instances
  $('.corner-menu').each((i, el) => {
    new CornerMenu($root, $(el));
  });
}
