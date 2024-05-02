import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Topbar from '../../components/general/topbar';

describe('Topbar', () => {

  it('Should be rendered', () => {
    render(<Topbar setTitle={"title"} search={true} />);
    const title = screen.getByText(/title/i);
    expect(title).toBeInTheDocument();
  });

  it('Search can be Enabled', () => {
    render(<Topbar setTitle={"title"} search={true} />);
    const search = screen.getByPlaceholderText(/Search.../i);
    expect(search).toBeInTheDocument();
    
  });

  it('Search can be Disabled', () => {
    render(<Topbar setTitle={"title"} search={false} />);
    const search = screen.queryByPlaceholderText(/Search.../i);
    expect(search).not.toBeInTheDocument();
    
  });

  
});