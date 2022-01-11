import { $$ } from './utilities.js';

const linkArr = $$('.menu-link');
const sectionArr = $$('.section');

const activateSection = (index) => {
  linkArr[index].classList.add('activeLink');
  sectionArr[index].classList.remove('hideSection');
};

const deactivateSection = (index) => {
  linkArr[index].classList.remove('activeLink');
  sectionArr[index].classList.add('hideSection');
};

const showPage = (index) => {
  sectionArr.forEach((_, i) => { deactivateSection(i); });
  activateSection(index);
};

const addLinkFunction = () => {
  linkArr.forEach((btn, index) => {
    btn.addEventListener('click', () => { showPage(index); });
  });
};

export { showPage, addLinkFunction };
