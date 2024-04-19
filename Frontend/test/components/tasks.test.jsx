import { describe, expect, it } from 'vitest';
import Tasks from '../../components/task/tasks';
import { render, screen } from '@testing-library/react';

describe('Tasks', () => {

    const data = {
        project_id: 1,
        project_name: "Project 1",
    }

    it('Should be rendered', () => {
        render(<Tasks projectInfo={data} />);
        const title = screen.getByText(/Tasks/i);
        expect(title).toBeInTheDocument();
    });

    it('Should display correct task names', () => {
        render(<Tasks projectInfo={data} />);
        
        const taskNames = screen.getAllByText(/Task 1/i); // Adjust this to the actual task name in your data
        expect(taskNames).toHaveLength(2); // Assuming there are two tasks in the test data
    });

    it('Should display correct subtask names', () => {
        render(<Tasks projectInfo={data} />);
        
        const subtaskNames = screen.getAllByText(/Subtask 1/i); // Adjust this to the actual subtask name in your data
        expect(subtaskNames).toHaveLength(1); // Assuming there are two subtasks in the test data
    });

});