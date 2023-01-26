import * as storage from "./storage.js";
import { renderContacts } from "./render.js";


export const hoverRow = (allRow, logo) => {
  const text = logo.textContent;
  const edit = document.createElement('button');
  edit.classList.add('edit-icon', 'ml-3');
  allRow.forEach(contact => {
    contact.addEventListener('mouseenter', () => {
      logo.textContent = contact.phoneLink.textContent;
      contact.phoneLink.insertAdjacentElement('afterend', edit);
    });
    contact.addEventListener('mouseleave', () => {
      logo.textContent = text;
      edit.remove();
    });
  });
};


export const sort = (thead, list, logo) => {
  thead.addEventListener('click', e => {
    if (e.target.closest('.name')) {
      const data = storage.getStorage('phoneBook');
      data.sort((tr1, tr2) => tr1.name > tr2.name ? 1 : -1);
      const newRow = renderContacts(list, 'phoneBook', data);
      localStorage.setItem('phoneBook', JSON.stringify(data));
      list.innerHTML = '';
      list.append(...newRow);
      hoverRow(newRow, logo);
    }

    if (e.target.closest('.surname')) {
      const data = storage.getStorage('phoneBook');
      data.sort((tr1, tr2) => tr1.surname > tr2.surname ? 1 : -1);
      const newRow = renderContacts(list, 'phoneBook', data);
      localStorage.setItem('phoneBook', JSON.stringify(data));
      list.innerHTML = '';
      list.append(...newRow);
      hoverRow(newRow, logo);
    }

  });
};
