import { render, screen } from '@testing-library/react';
import App from './App';
import Test from './Test';

describe('App', () => {
  test('renders Wecome to Rivet', () => {
    render(
      <Test>
        <App />
      </Test>
    );
    const header = screen.getByText("Welcome to Rivet");
    expect(header).toBeInTheDocument();
  });
});
