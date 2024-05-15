import { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const UserContext = createContext({
    user_id: '',
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    setUser: () => {},
});

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState({
        user_id: '',
        first_name: '',
        last_name: '',
        username: '',
        email: '',
    });

    const clearUserData = () => {
        setUser({
            user_id: '',
            first_name: '',
            last_name: '',
            username: '',
            email: '',
        });
    };

    return (
        <UserContext.Provider value={{ user, setUser, clearUserData }}>
            {children}
        </UserContext.Provider>
    );
};

UserProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
