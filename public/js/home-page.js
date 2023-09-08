// ==============================================

// Submit 'new user' form data to  [POST]  /api/users  endpoint
(() => {
  const form = document.querySelector('#new-user-form');
  if (!form) return;

  const email = form.querySelector('input[name="email"]');
  if (!email) return;

  const password = form.querySelector('input[name="password"]');
  if (!password) return;

  // const create_button = form.querySelector('button[type="submit"]');
  // if (!create_button) return;

  // --------------------------------------------

  const radios = document.getElementsByName('is-admin');
  const getRadioVal = () => {
    let radio_val = '';
    radios.forEach((radio) => {
      if (radio.checked) radio_val = radio.value;
    });
    return radio_val;
  } // getRadioVal()

  // --------------------------------------------

  const deleteUserListener = (delete_button) => {
    delete_button.addEventListener('click', async (e) => {
      e.preventDefault();

      const id = delete_button.dataset.id;
      console.log('delete_button: ', delete_button);
      console.log('id: ', id);

      const URL = `/api/users/${id}`;
      const resp = await fetch(URL, { method: 'DELETE' });
      const data = await resp.json();
      console.log('data: ', data);

      // -Avoid 2nd HTTP request by just updating current table
      const table = document.querySelector('#users-table');
      
      const tr_to_remove = table?.querySelector(`tr[data-id="${id}"]`);
      console.log('tr_to_remove: ', tr_to_remove);
      tr_to_remove?.remove();

      console.log('table: ', table);
    }); // delete_button.addEventListener('click', async (e) => { ... })
  }; // deleteUserListener()

  function setupDeleteCRUD() { 
    const delete_buttons = document.querySelectorAll('.delete-user-button');
    delete_buttons.forEach((delete_button) => deleteUserListener(delete_button));
  }
  setupDeleteCRUD();

  // --------------------------------------------

  const updateUserListener = (update_button) => {

    update_button.addEventListener('click', async (e) => {
      e.preventDefault();

      const id = update_button.dataset.id;

      // Set data in modal form
      const modal = document.querySelector('#update-modal');
      if (!modal) return;

      const modal_title_id = modal.querySelector('#update-modal-title  span');
      if (!modal_title_id) return;
      modal_title_id.textContent = id;

      const modal_email = modal.querySelector('#update-email');
      if (!modal_email) return;

      const modal_checkbox = modal.querySelector('#update-admin-check');
      if (!modal_checkbox) return;

      const query = `tr[data-id="${id}"]  td`;
      const tds = document.querySelectorAll(query);
      if (tds.length < 4) return;

      const prev_email = tds[1].textContent;
      modal_email.value = prev_email;

      const prev_is_admin = tds[2].textContent === 'true' ? true : false;
      modal_checkbox.checked = prev_is_admin;

      // Set up save button listener
      const save_button = modal.querySelector('#update-save-button');
      save_button?.addEventListener('click', async (e) => {

        const user = {
          id: +id,
          email: modal_email.value,
          password: tds[3].textContent, // currently just set password to previous password - don't hash on backend
          is_admin: modal_checkbox.checked,
        };

        const URL = `/api/users/${id}`;
        const resp = await fetch(URL, { 
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(user),
        });

        const data = await resp.json();
        console.log('data: ', data);

        // TODO: Error Handling for failed update
        // TODO: Error Handling for failed update
        // TODO: Error Handling for failed update

        // // -Avoid 2nd HTTP request by just updating current table
        const query = `#users-table  tbody  tr[data-id="${id}"]  td`;
        const tds_to_update = document.querySelectorAll(query);
        tds_to_update[1].textContent = data.email;
        tds_to_update[2].textContent = data.is_admin;
        tds_to_update[3].textContent = data.password; 
      });
    }); // delete_button.addEventListener('click', async (e) => { ... })

  }; // deleteUserListener()

  function setupUpdateCRUD() { 
    const update_buttons = document.querySelectorAll('.update-user-button');
    update_buttons.forEach((update_button) => updateUserListener(update_button));
  }
  setupUpdateCRUD();

  // --------------------------------------------

  function setupCreateCRUD() {
    // create_button.addEventListener('click', async (e) => {
    form.addEventListener('submit', async (e) => { // submit event allows for 'required' (frontend) form validation
      e.preventDefault();
  
      const user = {
        email: email.value,
        password: password.value,
        is_admin: getRadioVal(),
      };
  
      const resp = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
      });
      const data = await resp.json();
      console.log('data: ', data);
  
      // -Avoid 2nd HTTP request by just updating current table 
      //  with newly added row from response of 'create user' endpoint
      const table_row = document.createElement('tr');
      table_row.dataset.id = data.id;
  
      const createTD = (name) => {
        const td = document.createElement('td');
        td.innerText = data[name];
        table_row.appendChild(td);
      };
  
      createTD('id');
      createTD('email');
      createTD('is_admin');
      createTD('password');
  
      const createTD4 = () => {
        const td4 = document.createElement('td');
  
        const createButton = (text) => {
          const btn = document.createElement('button');
          btn.innerText = text;
          btn.dataset.id = data.id;
          
          if (text === 'Edit') {
            btn.className = 'btn  btn-warning  edit-user-button';
            btn.dataset.bsToggle = "modal";
            btn.dataset.bsTarget = "#update-modal"
            updateUserListener(btn);
          }
          if (text === 'Delete') {          
            btn.className = 'btn  btn-danger  delete-user-button';
            deleteUserListener(btn);
          }
  
          td4.appendChild(btn);
        };
        createButton('Edit');
        createButton('Edit');
        createButton('Delete');
        table_row.appendChild(td4);
      };
      createTD4();
  
      const table_body = document.querySelector('#users-table  tbody');
      if (!table_body) return;
      table_body.appendChild(table_row);
    }); // button.addEventListener('click', async (e) => { ... })
  }
  setupCreateCRUD();

  // --------------------------------------------
})();