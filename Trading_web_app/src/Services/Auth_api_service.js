import axios from 'axios';


export const confirm_user_creation = async (userData) => {
    try {
        const response = await axios.post('/api/accounts/confirm_account', userData); // Relative URL
        return response.data;
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
};

export const login = async (userData) => {
    try {
        const response = await axios.post('/api/accounts/login', userData); // Relative URL
        return response.data;
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
};
export const getUserData = async () => {
    try {
        const response = await axios.post('/api/accounts/get_cookie_data', {}); // Relative URL
        return response.data;
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
};