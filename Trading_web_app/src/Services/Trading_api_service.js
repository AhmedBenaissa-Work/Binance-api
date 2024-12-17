import axios from 'axios';


export const get_stock_market_data = async (authToken,symbols) => {
    try {
        const response = await axios.post('/api/trading/stocks',symbols, {headers:authToken}); // Relative URL
        return response.data;
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
};

export const buy_stock = async (authToken,balance,symbol,quantity) => {
    try {
        const headers = {
            "authorization":authToken
          }
        const response = await axios.post('/api/trading/buy',{'symbol':symbol,"quantity":quantity,'balance':balance}, {  headers: headers}); // Relative URL
        return response.data;
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
};

export const get_balance= async (authToken,address) => {
    try {
        const response = await axios.post('/api/fund/balance',{'address':address}, {headers:authToken}); // Relative URL
        return response.data;
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
};