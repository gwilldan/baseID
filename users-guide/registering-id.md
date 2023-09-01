# ✍ Registering ID

Step by step guide to registering a name as Identity (ID) on BaseID having successfully connected a wallet to our DApp;

### Check Name availability

Users can Input a preferred name to register as Identity - to be associated with your Ethereum address or other resources. The name inputed on the search field would be queried for availability (not being used as an Identity of another address). The required name can either be a string or numeric type and must be of length **greater than 3 characters**. Furthermore, registration value for each name varies inversely to the character length (i.e., Shorter names would have more cost value on registration).

### Initiate and confirm Name registration

On passing availability check, registering your preferred name as an Identity would initiate a transaction on your connected wallet application. This transaction is an interaction with our smart contract do the following;

* Mint an ERC721 token to the connected address with metadata hashed from your inputed name string.
* Store and update metadata both on and off the blockchain
* Update the BaseID database to sort and provide lists for each IDs mapped to a wallet address.

On confirmation, the transaction would be carried out and once completed, you would be required to **SET ID** on profile section of our App. Details on the next page.

