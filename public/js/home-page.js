function truncateStringFront({ str, len=6 }) {
  if (str.length > len) {
    return "..." + str.substring(str.length - len, str.length);
  } else {
    return str;
  }
}
// ==============================================

// Submit 'new user' form data to  [POST]  /api/users  endpoint
(() => {
  const form = document.querySelector('#new-user-form');
  if (!form) return;

  const email = form.querySelector('input[name="email"]');
  if (!email) return;

  const password = form.querySelector('input[name="password"]');
  if (!password) return;

  const is_admin = form.querySelector('#input-is-admin');
  if (!is_admin) return;

  // --------------------------------------------

  // const radios = document.getElementsByName('is-admin');
  // const getRadioVal = () => {
  //   let radio_val = '';
  //   radios.forEach((radio) => {
  //     if (radio.checked) radio_val = radio.value;
  //   });
  //   return radio_val;
  // } // getRadioVal()

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
        is_admin: is_admin.checked,
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
        if (name === 'password') td.innerText = truncateStringFront({ str: data[name] });
        else td.innerText = data[name];
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
            btn.className = 'btn  btn-success  edit-user-button';
            btn.dataset.bsToggle = "modal";
            btn.dataset.bsTarget = "#update-modal"
            btn.style.marginRight = '4px';
            btn.innerHTML = `
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pen" viewBox="0 0 16 16">
                <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z"/>
              </svg>
            `;
            updateUserListener(btn);
          }
          if (text === 'Delete') {          
            btn.className = 'btn  btn-danger  delete-user-button';
            btn.innerHTML = `
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>
                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/>
              </svg>
            `;
            deleteUserListener(btn);
          }
  
          td4.appendChild(btn);
        };
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