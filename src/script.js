import { getStorage } from "./js/storage";
import { modalControl, deleteControl, formControl } from "./js/control";
import { hoverRow, sort } from "./js/services";
import { renderPhoneBook, renderContacts } from "./js/render";

import './css/normalize.css';
import './css/bootstrap.min.css';
import './css/style.css';


  const init = (selectorApp, title) => {
    const app = document.querySelector(selectorApp);
    const {
      list,
      thead,
      logo,
      btnAdd,
      formOverlay,
      form,
      btnDel,
    } = renderPhoneBook(app, title);

    const data = getStorage('phoneBook');
    let allRow = renderContacts(list, 'phoneBook', data);
    const {closeModal} = modalControl(btnAdd, formOverlay);


    hoverRow(allRow, logo);
    deleteControl(btnDel, list);
    formControl(form, list, closeModal);
    sort(thead, list, logo);

  };


  window.phoneBookInit = init;
