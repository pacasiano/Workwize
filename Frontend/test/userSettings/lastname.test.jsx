
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import LastName from '../../components/userSettings/lastName';

describe('UserSettings - LastName', () => {

    const user = {
        email: "sample@email.com",
        last_name: "Doe",
        user_id: 1
    }

    it('LastName component should be rendered', () => {
        render(<LastName user={user} setUser={()=>user} />);
        expect(screen.getByText("Last name")).toBeInTheDocument();
    }); 

    it('LastName component should be editable', () => {
        render(<LastName user={user} setUser={()=>user} />);
        expect(screen.getByText("Last name")).toBeInTheDocument();
        screen.getByText("Last name").click();
        expect(screen.getByText("Last name")).toBeInTheDocument();
    });

    
});