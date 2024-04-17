import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import NewTaskList from '../../components/task/newTaskList';

describe('newTaskList', () => {

    const info = {
        name: "List 1",
        color: "#FF0000",
    }

    it('Should be rendered', () => {
        render(<NewTaskList chosenList={info} />);
        const title = screen.getByText(/List 1/i);
        expect(title).toBeInTheDocument();
    });

});