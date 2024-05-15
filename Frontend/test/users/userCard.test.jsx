import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import UserCard from '../../components/users/userCard';

describe('userCard', () => {

    const user = {
        first_name: "hello",
        last_name: "world",
        email: "sample@gmail.com",
        role: "owner"
    }

    it('First name and Last name are visible', () => {
        render(<UserCard user={user} />);
        expect(screen.getByText("hello world")).toBeInTheDocument();
    });

});