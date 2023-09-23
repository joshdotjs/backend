import { fireEvent, render, screen } from '@testing-library/react';
import App from './_App';
import CreateUserForm from './form-create-user';

import { describe, expect, vi } from 'vitest';
// -not needed due to --globals flag
// -helps intellisense though

// ==============================================
// ==============================================
// ==============================================
// ==============================================

describe('<CreateUserForm  createUser={() => {}} />', () => {

  // ==============================================

  it('the form input should exist [empty anonomous function]',  () => {
    render(<CreateUserForm createUser={() => {}} />);
    // screen.debug();
  
    const email_input = screen.getByPlaceholderText(/email/i);
    // screen.debug(email_input);
    expect(email_input).toBeInTheDocument();
  });

  // ==============================================

  it('the form input should exist [mocked function]',  () => {
    
    const mockedCreateUser = vi.fn();
    render(<CreateUserForm createUser={mockedCreateUser} />);
    // screen.debug();
  
    const email_input = screen.getByPlaceholderText(/email/i);
    // screen.debug(email_input);
    expect(email_input).toBeInTheDocument();
  });

  // ==============================================

  it('typing into the email form input should change the input',  () => {
    
    const mockedCreateUser = vi.fn();
    render(<CreateUserForm createUser={mockedCreateUser} />);
    // screen.debug();
  
    const email_input = screen.getByPlaceholderText(/email/i);
    // screen.debug(email_input);
    expect(email_input).toBeInTheDocument();
    fireEvent.change(email_input, { target: { value: 'josh@josh.com' }});
    expect(email_input.value).toBe('josh@josh.com');
    expect(email_input.value).not.toBe('xxx@xxx.com');
  });

  // ==============================================

  it('typing into both form inputs should change the inputs',  () => {
    
    const mockedCreateUser = vi.fn();
    render(<CreateUserForm createUser={mockedCreateUser} />);
  
    const email_input = screen.getByPlaceholderText(/email/i);
    fireEvent.change(email_input, { target: { value: 'josh@josh.com' }});
    expect(email_input.value).toBe('josh@josh.com');
    expect(email_input.value).not.toBe('xxx@xxx.com');
    
    const password_input = screen.getByPlaceholderText(/password/i);
    fireEvent.change(password_input, { target: { value: 'test' }});
    expect(password_input.value).toBe('test');
    expect(password_input.value).not.toBe('TeSt');
  });

  // ==============================================

  it('submitting the form should clear the form inputs',  () => {
    
    const mockedCreateUser = vi.fn();
    render(<CreateUserForm createUser={mockedCreateUser} />);
      
    const email_input = screen.getByPlaceholderText(/email/i);
    fireEvent.change(email_input, { target: { value: 'josh@josh.com' }});
    expect(email_input.value).toBe('josh@josh.com');
  
    const password_input = screen.getByPlaceholderText(/password/i);
    fireEvent.change(password_input, { target: { value: 'test' }});
    expect(password_input.value).toBe('test');

    const is_admin_checkbox = screen.getByLabelText(/admin/i);
    expect(is_admin_checkbox.checked).toBe(false);
    fireEvent.click(is_admin_checkbox);
    expect(is_admin_checkbox.checked).toBe(true);
  
    const button = screen.getByText('Create New User');
    fireEvent.click(button);
    expect(email_input.value).toBe('');
    expect(password_input.value).toBe('');
    expect(is_admin_checkbox.checked).toBe(false);
  });

  // ==============================================

  test('the button should be disabled until the fields are non-empty',  () => {
    
    const mockedCreateUser = vi.fn();
    render(<CreateUserForm createUser={mockedCreateUser} />);
   
    const button = screen.getByText('Create New User');
    expect(button.disabled).toBe(true);
      
    const email_input = screen.getByPlaceholderText(/email/i);
    fireEvent.change(email_input, { target: { value: 'josh@josh.com' }});
    expect(email_input.value).toBe('josh@josh.com');
  
    const password_input = screen.getByPlaceholderText(/password/i);
    fireEvent.change(password_input, { target: { value: 'test' }});
    expect(password_input.value).toBe('test');
  
    // button should now be enabled
    expect(button.disabled).toBe(false);

    fireEvent.click(button);
    expect(email_input.value).toBe('');
    expect(password_input.value).toBe('');

    // button should again be disabled
    expect(button.disabled).toBe(true);
  });

  // ==============================================

});

// ==============================================
// ==============================================
// ==============================================
// ==============================================