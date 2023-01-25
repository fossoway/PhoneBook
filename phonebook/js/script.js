'use strict';


{
  // const addContactData = (contact) => {
  //   data.push(contact);
  // };


  const getStorage = (key) => {
    const phoneBook = JSON.parse(localStorage.getItem(key)) || [];
    return phoneBook;
  };


  const setStorage = (key, value) => {
    const phoneBook = getStorage(key);
    phoneBook.push(value);
    localStorage.setItem(key, JSON.stringify(phoneBook));
  };


  const removeStorage = (key, number) => {
    const phoneBook = getStorage(key);
    const index = phoneBook.findIndex(i => i.phone === number);
    phoneBook.splice(index, 1);
    localStorage.setItem(key, JSON.stringify(phoneBook));
  }


  const createContainer = () => {
    const container = document.createElement('div');
    container.classList.add('container');
    return container;
  };


  const createHeader = () => {
    const header = document.createElement('header');
    header.classList.add('header');

    const headerContainer = createContainer();
    header.append(headerContainer);
    header.headerContainer = headerContainer;

    return header;
  };


  const createLogo = (title) => {
    const h1 = document.createElement('h1');
    h1.classList.add('logo');
    h1.textContent = `Телефонный справочник. ${title}`;

    return h1;
  };


  const createMain = () => {
    const main = document.createElement('main');
    const mainContainer = createContainer();
    main.append(mainContainer);
    main.mainContainer = mainContainer;

    return main;
  };


  const createButtonsGroup = params => {
    const btnWrapper = document.createElement('div');
    btnWrapper.classList.add('btn-wrapper');

    const btns = params.map(({className, type, text}) => {
      const button = document.createElement('button');
      button.type = type;
      button.textContent = text;
      button.className = className;

      return button;
    });
    btnWrapper.append(...btns);

    return {
      btnWrapper,
      btns,
    };
  };


  const createTable = () => {
    const table = document.createElement('table');
    table.classList.add('table', 'table-striped');
    const thead = document.createElement('thead');
    thead.insertAdjacentHTML('beforeend', `
      <tr>
        <th class="delete">Удалить</th>
        <th class="name">Имя</th>
        <th class="surname">Фамилия</th>
        <th>Телефон</th>
      </tr>
    `);
    table.thead = thead;
    const tbody = document.createElement('tbody');

    table.append(thead, tbody);
    table.tbody = tbody;

    return table;
  };


  const createForm = () => {
    const overlay = document.createElement('div');
    overlay.classList.add('form-overlay');
    const form = document.createElement('form');
    form.classList.add('form');
    form.insertAdjacentHTML('beforeend', `
      <button class="close" type="button"></button>
      <h2 class="form-title">Добавить контакт</h2>
      <div class="form-group">
        <label class="form-label" for="name">Имя:</label>
        <input class="form-input" name="name" id="name" type="text" required>
      </div>
      <div class="form-group">
        <label class="form-label" for="surname">Фамилия:</label>
        <input class="form-input" name="surname" id="surname" type="text" required>
      </div>
      <div class="form-group">
        <label class="form-label" for="phone">Телефон:</label>
        <input class="form-input" name="phone" id="phone" type="number" required>
      </div>
    `);

    const buttonGroup = createButtonsGroup([
      {
        className: 'btn btn-primary mr-3',
        type: 'submit',
        text: 'Добавить',
      },
      {
        className: 'btn btn-danger',
        type: 'reset',
        text: 'Отмена',
      },
    ]);

    form.append(...buttonGroup.btns);
    overlay.append(form);

    return {
      overlay,
      form,
    };
  };


  const createFooter = (title) => {
    const footer = document.createElement('footer');
    footer.classList.add('footer');

    const footerContainer = createContainer();
    footer.append(footerContainer);
    footer.footerContainer = footerContainer;

    footerContainer.textContent = `Все права защищены © ${title}`;

    return footer;
  };


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


  const createRow = ({name, surname, phone}) => {
    const tr = document.createElement('tr');
    tr.classList.add('contact');
    const tdDel = document.createElement('td');
    const buttonDel = document.createElement('button');
    tdDel.append(buttonDel);
    buttonDel.classList.add('del-icon');
    tdDel.classList.add('delete');

    const tdName = document.createElement('td');
    tdName.textContent = name;
    tr.tdName = name;
    const tdSurname = document.createElement('td');
    tdSurname.textContent = surname;
    tr.tdSurname = surname;
    const tdPhone = document.createElement('td');
    const phoneLink = document.createElement('a');
    phoneLink.href = `tel:${phone}`;
    phoneLink.textContent = phone;
    tr.phoneLink = phoneLink;
    tdPhone.append(phoneLink);

    tr.append(tdDel, tdName, tdSurname, tdPhone);

    return tr;
  };


  const renderContacts = (elem, key, data) => {

    const allRow = data.map(createRow);
    elem.append(...allRow);
    return allRow;
  };


  const hoverRow = (allRow, logo) => {
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


  const modalControl = (btnAdd, formOverlay) => {
    const openModal = () => {
      formOverlay.classList.add('is-visible');
    };

    const closeModal = () => {
      formOverlay.classList.remove('is-visible');
    };

    btnAdd.addEventListener('click', openModal);

    formOverlay.addEventListener('click', e => {
      const target = e.target;
      if (target === formOverlay || target.classList.contains('close')) {
        closeModal();
      }
    });

    return {
      closeModal,
    }
  };


  const deleteControl = (btnDel, list) => {
    btnDel.addEventListener('click', () => {
      document.querySelectorAll('.delete').forEach(del => {
        del.classList.toggle('is-visible');
      });
    });
    list.addEventListener('click', e => {
      if (e.target.closest('.del-icon')) {
        e.target.closest('.contact').remove();
        const phone = e.target.closest('.contact').phoneLink.innerText;
        removeStorage('phoneBook', phone);
      }
    });
  };


  const addContactPage = (contact, list) => {
    list.append(createRow(contact));
  }


  const formControl = (form, list, closeModal) => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const formData = new FormData(e.target);

      const newContact = Object.fromEntries(formData);
      setStorage('phoneBook', newContact);
      addContactPage(newContact, list);


      form.reset();
      closeModal();
    });
  };


  const sort = (thead, list, logo) => {
    // const isSort = localStorage.getItem('sort');
    // if (isSort) {
    //   const data = JSON.parse(localStorage.getItem(isSort));
    //   const newRow = renderContacts(list, 'phoneBook', data);
    //   list.innerHTML = '';
    //   list.append(...newRow);
    // }

    thead.addEventListener('click', e => {
      if (e.target.closest('.name')) {
        const data = getStorage('phoneBook');
        data.sort((tr1, tr2) => tr1.name > tr2.name ? 1 : -1);
        const newRow = renderContacts(list, 'phoneBook', data);
        localStorage.setItem('phoneBook', JSON.stringify(data));
        list.innerHTML = '';
        list.append(...newRow);
        hoverRow(newRow, logo);
      }

      if (e.target.closest('.surname')) {
        const data = getStorage('phoneBook');
        data.sort((tr1, tr2) => tr1.surname > tr2.surname ? 1 : -1);
        const newRow = renderContacts(list, 'phoneBook', data);
        localStorage.setItem('phoneBook', JSON.stringify(data));
        list.innerHTML = '';
        list.append(...newRow);
        hoverRow(newRow, logo);
      }

    });
  };


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

}
