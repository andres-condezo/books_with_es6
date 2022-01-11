// *****************
// Imports
// *****************

import BookApp from './modules/bookApp.js';
import { showPage, addLinkFunction } from './modules/navigation.js';
import showDate from './modules/luxon.js';
import { $ } from './modules/utilities.js';

// ***************
//  Main Function
// ***************

const main = () => {
  const newApp = new BookApp();
  const $form = $('.form');

  newApp.getLocal();
  showPage(0);
  showDate();
  addLinkFunction();
  newApp.displayBookCollection();
  $form.addEventListener('submit', (event) => {
    event.preventDefault();
    newApp.addBook();
  });
};

main();
