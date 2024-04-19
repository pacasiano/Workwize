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

    const info2 = [
        {
            word: "try2",
            color: "#1fqwef"
        }
    ]

    it('Should be rendered', () => {
        render(<NewTaskLabel chosenTags={info} />);
        const title = screen.getByText(/try/i);
        expect(title).toBeInTheDocument();
    });

    it('Should be rendered', () => {
        render(<NewTaskLabel chosenTags={info2} />);
        const title = screen.getByText(/try2/i);
        expect(title).toBeInTheDocument();
    });

});