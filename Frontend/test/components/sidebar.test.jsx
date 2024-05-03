import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Sidebar from '../../components/general/sidebar'

describe('Sidebar', () => {

  it('should be wide', () => {
    render(<Sidebar Wide={true} />);
    const project = screen.getByText("Dashboard");
    expect(project).toBeInTheDocument();
  });

  it('should not be wide', () => {
    render(<Sidebar Wide={false} />);
    // find if the sidebar is not wide
    const project = screen.queryByText("New List");
    expect(project).not.toBeInTheDocument();
  });

  
});