const stripe = require('stripe')('sk_test_51PfLutBNKt8cadkVgi62ug9yvSrWDwRvELT5B1999ZWwBP9JYru9LsiE2AvZmlNOPcp0F5Xavo4B7qwxTLBLMYBk00z4Ql4ZJh');



async function createConnectedAccount() {
    try {
        const account = await stripe.accounts.create({
            type: 'custom', // or 'express' depending on your use case
            country: 'AU', // Ensure the country is correct
            email: 'user3@example.com',
            capabilities: {
                card_payments: { requested: true },
                transfers: { requested: true },
                
              
              }
              
        });

        console.log('Connected Account:', account);
        return account
    } catch (error) {
        console.error('Error creating connected account:', error);
     
    }
}


async function transferFunds(receiver,amount) {
    
    const r = await stripe.accounts.update(receiver, {
        capabilities: {
          transfers: { requested: true }, // Requesting the transfer capability
        },
      });
  console.log(r)
  const transfer = await stripe.charges.create({
    amount: amount, // Amount in cents (e.g., $10.00)
    currency: 'AUD',
 
    source: 'tok_visa', // Source token (you'll typically get this from a frontend form)
      description: 'Payment for Order #123',
      destination: {
        account: receiver, // Destination connected account ID
      },
     
   
});
console.log('Transfer:', transfer);
}
//transferFunds()
const linkDebitCard = async (connectedAccountId, cardToken) => {
    try {
      // Use the card token to create an external account for the connected account
      const externalAccount = await stripe.accounts.createExternalAccount(
        connectedAccountId, // The connected account ID
        {
          external_account: cardToken, // The token representing the debit card
        }
      );
  
      console.log('Debit card linked to the connected account:', externalAccount);
      return externalAccount;
    } catch (error) {
      console.error('Error linking debit card:', error.message);
      throw error;
    }
  };
  
  // Example usage:
  const connectedAccountId = 'acct_1QYcXKDgSU6kq30O'; // Replace with the connected account ID
  const cardToken = 'tok_visa'; // Replace with a valid card token
  


//const a=createConnectedAccount();
transferFunds('acct_1Qe0fcBN3Ftg06sc',20000)
//linkDebitCard(connectedAccountId, cardToken);
//payoutFromSource('acct_1QYcXKDgSU6kq30O',1000)
//transferToDestination('acct_1QYcTNAtQ1I3f8Kx',1000)  
  
