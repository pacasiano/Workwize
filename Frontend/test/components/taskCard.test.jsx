import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import TaskCard from '../../components/task/taskCard';

describe('TaskCard', () => {

    const data = {
        subtask_id: 1,
        task_id: 1,
        name: "Subtask 1",
        description: "hays Ito nanaman tayo",
        start_date: "2024-4-10",
        end_date: "2024-4-12",
    }

    it('Should be rendered', () => {
        render(<TaskCard data={data} />);
        const title = screen.getByText(/Subtask 1/i);
        expect(title).toBeInTheDocument();
    });

    it('Should display correct description', () => {
        render(<TaskCard data={data} />);
        const description = screen.getByText(/hays Ito nanaman tayo/i);
        expect(description).toBeInTheDocument();
    });

});