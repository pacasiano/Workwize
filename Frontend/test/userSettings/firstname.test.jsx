
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import FirstName from '../../components/userSettings/firstName';

describe('UserSettings - FirstName', () => {

    const user = {
        email: "sample@email.com",
        fisrt_name: "John",
        user_id: 1
    }

    it('FirstName component should be rendered', () => {
        render(<FirstName user={user} setUser={()=>user} />);
        expect(screen.getByText("First name")).toBeInTheDocument();
    });

    it('FirstName component should be editable', () => {
        render(<FirstName user={user} setUser={()=>user} />);
        expect(screen.getByText("First name")).toBeInTheDocument();
        screen.getByText("First name").click();
        expect(screen.getByText("First name")).toBeInTheDocument();
    });


    
});