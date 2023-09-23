import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './navbar';

// ==============================================

function MockWrapper() {
  return (
    <BrowserRouter>
      <Navbar />
    </BrowserRouter>
  );
}

// ==============================================

import { render, screen } from '@testing-library/react';
import { expect } from 'vitest';

// ==============================================

it('should render navbar | w. <NavLink>', () => {
  render(<MockWrapper />);

  // The default role attribute for the HTML <header> element is "banner"
  const header = screen.getByRole('banner');
  // screen.debug(header);
  expect(header).toContainHTML('a');

  const home_link = screen.getByText(/home/i);
  expect(home_link).toBeInTheDocument();
  expect(home_link).toHaveAttribute('href', '/');
  expect(home_link).toBeVisible(); // even tests opacity!
  expect(home_link).toHaveStyle({ color: 'rgb(255, 255, 255)' });
  expect(home_link).toHaveTextContent(/home/i);

  const about_link = screen.getByText(/about/i);
  expect(about_link).toBeInTheDocument();
  expect(about_link).toHaveAttribute('href', '/about');
  expect(about_link).toBeVisible();
  expect(about_link).toHaveStyle({ color: 'rgb(255, 255, 255)' });
  expect(about_link).toHaveTextContent(/about/i);
});

// ==============================================
