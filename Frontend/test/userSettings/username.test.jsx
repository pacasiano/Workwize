
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Username from '../../components/userSettings/username';

describe('UserSettings - Username', () => {

    const user = {
        email: "sample@email.com",
        Username: "username",
        user_id: 1
    }

    it('Username component should be rendered', () => {
        render(<Username user={user} setUser={()=>user} />);
        expect(screen.getByText("Username")).toBeInTheDocument();
    }); 

    it('Username component should be editable', () => {
        render(<Username user={user} setUser={()=>user} />);
        expect(screen.getByText("Username")).toBeInTheDocument();
        screen.getByText("Username").click();
        expect(screen.getByText("Username")).toBeInTheDocument();
    });
    
});