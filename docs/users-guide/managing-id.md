# 📎 Managing ID

Managing an ID involves overseeing the resolution of Identities within the service space. Registered IDs would have access to all the functionalities of BaseID, to grant this access, the ID should be set to Controller ID. There can only one Controller ID per address.

### Controller Identity

An address can own more than one ID but can only have one Controller ID at a time. A controller ID is a registered ID selected from the list of registered IDs of a particular address to represent that address. A user can switch Controller ID anytime and as many times as he would love to (remember, the user has total control and there is no periodic renewal of an ID).

Let's exemplify; an address "0xb6...11bs" has registered IDs "one.base" , "two.base" and "three.base", thus presenting this user lots of choices for Controller Identity. If the user sets "two.base" as Controller, then the selected ID would be resolved to the address until the user makes a change. Once set, "two.base" can represent "0xb6...11bs" on DApps and also interact with the blockchain performing basic functions as the cryptographic address "0xb6...11bs". One can simply send tokens to "two.base" which would be received on "0xb6...11bs".

{% hint style="info" %}
NOTE: _`The DApp APIs, transfer and other utility functionalities have already been built awaiting integration. Building on a relatively new Layer Chain of Ethereum could cause slower implementation of some BaseID's functionalities. However, we are always in contact with different teams to seek the swift implementation of all BaseID features.`_
{% endhint %}

### Setting Controller ID

Having registered an ID, go to the profile page or click app.baseid.domains/profile, and connect  your wallet. A list of all IDs owned by the connected address would be displayed, each having menu Icons. Click on your preferred registered ID and click on the **Set ID** button, Approve the transaction and the Selected ID would be set as the Controller.

