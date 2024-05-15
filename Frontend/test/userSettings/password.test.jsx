
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Password from '../../components/userSettings/password';

describe('UserSettings - Password', () => {

    const user = {
        email: "sample@email.com",
        Password: "password",
        user_id: 1
    }

    it('Password component should be rendered', () => {
        render(<Password user={user} setUser={()=>user} />);
        expect(screen.getByText("Password")).toBeInTheDocument();
    }); 

    it('Password component should be editable', () => {
        render(<Password user={user} setUser={()=>user} />);
        expect(screen.getByText("Password")).toBeInTheDocument();
        screen.getByText("Password").click();
        expect(screen.getByText("Password")).toBeInTheDocument();
    });

    
});