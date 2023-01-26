import { getStorage } from "./storage.js";
import { modalControl, deleteControl, formControl } from "./control.js";
import { hoverRow, sort } from "./services.js";
import { renderPhoneBook, renderContacts } from "./render.js";


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
