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
export const get_stock_market_data_sticks = async(authToken,symbol,timeFrame,start,end) => {
    try {
        const headers = {
            "authorization":authToken
          }
        const response = await axios.post('/api/trading/sticks',{'symbol':symbol,"timeframe":timeFrame,'start':start,'end':end}, {  headers: headers}); // Relative URL
        return response.data;
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
}
export const sell_stock = async (authToken,symbol,quantity) => {
    try {
        const headers = {
            "authorization":authToken
          }
        const response = await axios.post('/api/trading/sell',{'symbol':symbol,"quantity":quantity}, {  headers: headers}); // Relative URL
        return response.data;
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
};
export const get_balance= async (authToken,address) => {
    try {
        const headers = {
            "authorization":authToken
          }
        const response = await axios.post('/api/fund/balance',{'address':address}, {headers:headers}); // Relative URL
        return response.data;
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
};
export const orders= async (authToken) => {
    console.log(authToken)
    try {
        const headers = {
            "authorization":authToken
          }

        const response = await axios.post('/api/trading/orders',{}, {headers:headers}); // Relative URL
        return response.data;
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
};
