import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Label from '../../components/general/label';

describe('Label', () => {

  it('word and color parameters should be working', () => {
    render(<Label word={"hello"} color={""} />);
    expect(screen.getByText("hello")).toBeInTheDocument();
  });

  it('Type 1 is working', () => {
    render(<Label word={"hello"} color={""} type={"1"} />);
    expect(screen.getByText("hello")).toBeInTheDocument();
  });

  it('Type 2 is working', () => {
    render(<Label word={"hello"} color={""} type={"2"} />);
    expect(screen.getByText("hello")).toBeInTheDocument();
  });

  it('Type 3 is working', () => {
    render(<Label word={"hello"} color={""} type={"3"} />);
    expect(screen.getByText("hello")).toBeInTheDocument();
  });


  
});