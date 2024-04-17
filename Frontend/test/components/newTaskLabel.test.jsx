import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import NewTaskLabel from '../../components/task/newTaskLabel';

describe('newTaskLabel', () => {

    const info = [
        {
            word: "try",
            color: "#10B981"
        },
    ];

    it('Should be rendered', () => {
        render(<NewTaskLabel chosenTags={info} />);
        const title = screen.getByText(/try/i);
        expect(title).toBeInTheDocument();
    });

});