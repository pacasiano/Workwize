
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Email from '../../components/userSettings/email';

describe('UserSettings - Email', () => {

    const user = {
        email: "sample@email.com",
        user_id: 1
    }

    it('Email component should be rendered', () => {
        render(<Email user={user} setUser={()=>user} />);
        expect(screen.getByText("Email")).toBeInTheDocument();
    });

    it('Email component should be editable', () => {
        render(<Email user={user} setUser={()=>user} />);
        expect(screen.getByText("Email")).toBeInTheDocument();
        screen.getByText("Email").click();
        expect(screen.getByText("Email")).toBeInTheDocument();
    });
    
});