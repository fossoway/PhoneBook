import {  createHeader,
          createRow,
          createLogo,
          createMain,
          createButtonsGroup,
          createFooter,
          createForm,
          createTable } from "./createElements";


const renderPhoneBook = (app, title) => {
  const header = createHeader();
  const logo = createLogo(title);
  const main = createMain();
  const buttonGroup = createButtonsGroup([
    {
      className: 'btn btn-primary mr-3',
      type: 'button',
      text: 'Добавить',
    },
    {
      className: 'btn btn-danger',
      type: 'button',
      text: 'Удалить',
    },
  ]);
  const table = createTable();
  const {form, overlay} = createForm();
  const footer = createFooter(title);

  app.append(header, main, footer);
  main.mainContainer.append(buttonGroup.btnWrapper, table, overlay);
  header.headerContainer.append(logo);

  return {
    list: table.tbody,
    thead: table.thead,
    logo,
    btnAdd: buttonGroup.btns[0],
    btnDel: buttonGroup.btns[1],
    formOverlay: overlay,
    form,
  };
};


const addContactPage = (contact, list) => {
  list.append(createRow(contact));
};


const renderContacts = (elem, key, data) => {

  const allRow = data.map(createRow);
  elem.append(...allRow);
  return allRow;
};


export { renderContacts, addContactPage, renderPhoneBook };
