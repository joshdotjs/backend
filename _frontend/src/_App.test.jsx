import { render, screen, fireEvent, within } from '@testing-library/react';
import App from './_App';
import './util/console-node';

import { describe, it, expect, beforeEach } from 'vitest';
// -not needed due to --globals flag
// -helps intellisense though

// ================================================
// ================================================
// ================================================
// ================================================

const resetUsers = async () => {
  
  const num_users = screen.queryAllByTestId(/users-table-row-/i);
  console.yellow(`resetUsers() -- num_users: ${num_users.length}`);
  if (num_users.length > 0) {
    // reset the users table (SIDE EFFECT)
    let users_table_rows = await screen.findAllByTestId(/users-table-row-/i);  // NOTE: This fails if there are currently no users in the table
    for(let i = 0; i < users_table_rows.length; ++i) {
      const user = users_table_rows[i];
      const delete_button = await within(user).findByText(/delete/i);
      fireEvent.click(delete_button);
      console.green('deleted user');
    }
  }

};

// beforeEach(async () => {
//   render(<App />);
  
//   let users_table_rows = await screen.findAllByTestId(/users-table-row-/i);
//   for(let i = 0; i < users_table_rows.length; ++i) {
//     const user = users_table_rows[i];
//     const delete_button = await within(user).findByText(/delete/i);
//     fireEvent.click(delete_button);
//   }
// });

// ==============================================
// ==============================================
// ==============================================
// ==============================================

describe('<App />', () => {

  // ==============================================

  it('should pass sanity check', () => {
    render(<App />);
    // screen.debug();
    expect(true).toBe(true);
  });

  // ==============================================

  it('should display heading (Get By)', () => {
    render(<App />);

    // Get By with different attributes:

    const heading_text = screen.getByText(/users/i);
    // screen.debug(heading_text);
    
    const heading_role = screen.getByRole('heading', { name: /users/i });
    // screen.debug(heading_role);

    const heading_title = screen.getByTitle('page-home-title');
    // screen.debug(heading_title);

    const heading_testid = screen.getByTestId('page-home-title');
    // screen.debug(heading_testid);
  });

  // ==============================================

  it('should display heading (Find By)', async () => {
    render(<App />);

    const heading_text = await screen.findByText(/users/i);
    // screen.debug(heading_text);
  });

  // ==============================================

  it('should NOT display JOSH heading (Query By)', () => {
    render(<App />);

    const heading_text = screen.queryByText(/josh/i);
    expect(heading_text).not.toBeInTheDocument();
  });

  // ==============================================

  test('submitting the form should add the user and the list of users in the UI should be reflected accordingly', async () => {

    // NOTE: This is effectively an e2e test - we are tesing the backend and the frontend together
    // NOTE: This is effectively an e2e test - we are tesing the backend and the frontend together
    // NOTE: This is effectively an e2e test - we are tesing the backend and the frontend together
    // NOTE: This is effectively an e2e test - we are tesing the backend and the frontend together
    
    render(<App />);
  
    await resetUsers();

    const button = screen.getByText('Create New User');
    expect(button.disabled).toBe(true);
      
    const email_input = screen.getByPlaceholderText(/email/i);
    fireEvent.change(email_input, { target: { value: 'josh@josh.com' }});
    expect(email_input.value).toBe('josh@josh.com');

    const password_input = screen.getByPlaceholderText(/password/i);
    fireEvent.change(password_input, { target: { value: 'test' }});
    expect(password_input.value).toBe('test');

    // submit form
    fireEvent.click(button);

    const users_table_rows = await screen.findAllByTestId(/users-table-row-/i);
    // console.log('users_table_rows.length: ', users_table_rows.length);
    expect(users_table_rows.length).toBe(1);

    await resetUsers();
  });

  // ==============================================

});

// ================================================
// ================================================
// ================================================
// ================================================