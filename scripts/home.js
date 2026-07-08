import { renderSidebar } from "./utils/sidebar.js";
renderSidebar();

// add function to squad tile
document.querySelector('.js-squad').addEventListener('click', () => {
  window.location.href = '/squad.html';
});