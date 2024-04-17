import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Tasks from '../../components/task/tasks';

describe('Tasks', () => {

    const data = {
        project_id: 1,
        project_name: "Project 1",
    }

    it('Should be rendered', () => {
        render(<Tasks projectInfo={data} />);
        const title = screen.getByText(/Subtask 1/i);
        expect(title).toBeInTheDocument();
    });
  
});