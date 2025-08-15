import axios from 'axios';
export const deposit= async (authToken,amount) => {
    try {
        const headers = {
            "authorization":authToken
          }
        const response = await axios.post('/api/fund/deposit',{'amount':amount}, {headers:headers}); // Relative URL
        return response.data;
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
};
export const transaction= async (authToken,amount) => {
    try {
        const headers = {
            "authorization":authToken
          }
        const response = await axios.post('/api/fund/transaction',{'amount':amount}, {headers:headers}); // Relative URL
        return response.data;
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
};
export const Balance= async (authToken) => {
    try {
        const headers = {
            "authorization":authToken
          }
        const response = await axios.post('/api/fund/balance',{}, {headers:headers}); // Relative URL
        return response.data;
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
};