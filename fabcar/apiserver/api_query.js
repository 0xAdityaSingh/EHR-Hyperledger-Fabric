var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json());
// Setting for Hyperledger Fabric
const { Gateway,Wallets } = require('fabric-network');
const path = require('path');
const fs = require('fs');
//const ccpPath = path.resolve(__dirname, '..', '..', 'test-network', 'organizations', 'peerOrganizations', 'org1.example.com', 'connection-org1.json');
  //      const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));


app.get('/api/queryAll', async function (req, res)  {
    try {
const ccpPath = path.resolve(__dirname, '..', '..', 'test-network', 'organizations', 'peerOrganizations', 'org1.example.com', 'connection-org1.json');
        const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));
// Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        const identity = await wallet.get('appUser');
        if (!identity) {
            console.log('An identity for the user "appUser" does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            return;
        }
  // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: 'appUser', discovery: { enabled: true, asLocalhost: true } });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('mychannel');

        // Get the contract from the network.
        const contract = network.getContract('fabcar');

        // Evaluate the specified transaction.
        // queryCar transaction - requires 1 argument, ex: ('queryCar', 'CAR4')
        // queryAllCars transaction - requires no arguments, ex: ('queryAllCars')
        const result = await contract.evaluateTransaction('queryAll');
	    console.log(JSON.parse(result)[0]["Record"]);
        console.log(`Transaction has been evaluated, result is: ${result.toString()}`);
        res.status(200).json({response: result.toString()});
} catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        res.status(500).json({error: error});
        process.exit(1);
    }
});

// https://c9addy.github.io/test-json/queryAllbyOwner.json
app.get('/api/queryAllbyOwner', async function (req, res)  {
        try {
    const ccpPath = path.resolve(__dirname, '..', '..', 'test-network', 'organizations', 'peerOrganizations', 'org1.example.com', 'connection-org1.json');
            const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));
    // Create a new file system based wallet for managing identities.
            const walletPath = path.join(process.cwd(), 'wallet');
            const wallet = await Wallets.newFileSystemWallet(walletPath);
            console.log(`Wallet path: ${walletPath}`);
    
            // Check to see if we've already enrolled the user.
            const identity = await wallet.get(req.body.userId);
            if (!identity) {
                console.log('An identity for the user "appUser" does not exist in the wallet');
                console.log('Run the registerUser.js application before retrying');
                return;
            }
      // Create a new gateway for connecting to our peer node.
            const gateway = new Gateway();
            await gateway.connect(ccp, { wallet, identity: req.body.userId, discovery: { enabled: true, asLocalhost: true } });
    
            // Get the network (channel) our contract is deployed to.
            const network = await gateway.getNetwork('mychannel');
    
            // Get the contract from the network.
            const contract = network.getContract('fabcar');
    
            // Evaluate the specified transaction.
            // queryCar transaction - requires 1 argument, ex: ('queryCar', 'CAR4')
            // queryAllCars transaction - requires no arguments, ex: ('queryAllCars')
            const result = await contract.evaluateTransaction('queryAllbyOwner');
            console.log(`Transaction has been evaluated, result is: ${result.toString()}`);
            res.status(200).json({response: JSON.parse(result.toString('utf8'))});
    } catch (error) {
            console.error(`Failed to evaluate transaction: ${error}`);
            res.status(500).json({error: error});
            process.exit(1);
        }
    });




// app.get('/api/query/:car_index', async function (req, res) {
//     try {
// const ccpPath = path.resolve(__dirname, '..', '..', 'test-network', 'organizations', 'peerOrganizations', 'org1.example.com', 'connection-org1.json');
//         const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));
// // Create a new file system based wallet for managing identities.
//         const walletPath = path.join(process.cwd(), 'wallet');
//         const wallet = await Wallets.newFileSystemWallet(walletPath);
//         console.log(`Wallet path: ${walletPath}`);

//         // Check to see if we've already enrolled the user.
//         const identity = await wallet.get('appUser');
//         if (!identity) {
//             console.log('An identity for the user "appUser" does not exist in the wallet');
//             console.log('Run the registerUser.js application before retrying');
//             return;
//         }
//   // Create a new gateway for connecting to our peer node.
//         const gateway = new Gateway();
//         await gateway.connect(ccp, { wallet, identity: 'appUser', discovery: { enabled: true, asLocalhost: true } });

//         // Get the network (channel) our contract is deployed to.
//         const network = await gateway.getNetwork('mychannel');

//         // Get the contract from the network.
//         const contract = network.getContract('fabcar');
// // Evaluate the specified transaction.
//         // queryCar transaction - requires 1 argument, ex: ('queryCar', 'CAR4')
//         // queryAllCars transaction - requires no arguments, ex: ('queryAllCars')
//         const result = await contract.evaluateTransaction('queryCar', req.params.car_index);
//         console.log(`Transaction has been evaluated, result is: ${result.toString()}`);
//         res.status(200).json({response: result.toString()});
// } catch (error) {
//         console.error(`Failed to evaluate transaction: ${error}`);
//         res.status(500).json({error: error});
//         process.exit(1);
//     }
// });



app.post('/api/adddata/', async function (req, res) {
    try {
const ccpPath = path.resolve(__dirname, '..', '..', 'test-network', 'organizations', 'peerOrganizations', 'org1.example.com', 'connection-org1.json');
        const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));
// Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        const identity = await wallet.get('Doctor1');
        if (!identity) {
            console.log('An identity for the user "Doctor1" does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            return;
        }
  // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: 'Doctor1', discovery: { enabled: true, asLocalhost: true } });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('mychannel');

        // Get the contract from the network.
        const contract = network.getContract('fabcar');
// Submit the specified transaction.
        // createCar transaction - requires 5 argument, ex: ('createCar', 'CAR12', 'Honda', 'Accord', 'Black', 'Tom')
        // changeCarOwner transaction - requires 2 args , ex: ('changeCarOwner', 'CAR10', 'Dave')
        const result =await contract.submitTransaction('createCar', req.body.owner, req.body.type, req.body.data);
        
        res.send(`Transaction has been evaluated, result is: ${result.toString()}`);
// Disconnect from the gateway.
        await gateway.disconnect();
} catch (error) {
        console.error(`Failed to submit transaction: ${error}`);
        process.exit(1);
    }
})



app.put('/api/changeowner/:car_index', async function (req, res) {
    try {
const ccpPath = path.resolve(__dirname, '..', '..', 'test-network', 'organizations', 'peerOrganizations', 'org1.example.com', 'connection-org1.json');
        const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));
// Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        const identity = await wallet.get('appUser');
        if (!identity) {
            console.log('An identity for the user "appUser" does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            return;
        }
  // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: 'appUser', discovery: { enabled: true, asLocalhost: true } });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('mychannel'); 

        // Get the contract from the network.
        const contract = network.getContract('fabcar');
// Submit the specified transaction.
        // createCar transaction - requires 5 argument, ex: ('createCar', 'CAR12', 'Honda', 'Accord', 'Black', 'Tom')
        // changeCarOwner transaction - requires 2 args , ex: ('changeCarOwner', 'CAR10', 'Dave')
        await contract.submitTransaction('changeCarOwner', req.params.car_index, req.body.owner);
        console.log('Transaction has been submitted');
        res.send('Transaction has been submitted');
// Disconnect from the gateway.
        await gateway.disconnect();
} catch (error) {
        console.error(`Failed to submit transaction: ${error}`);
        process.exit(1);
    } 
})

app.post('/api/grant', async function (req, res)  {
    // user-id, record-id, iser-id-2
    try {
        // load the network configuration
        const ccpPath = path.resolve(__dirname, '..', '..', 'test-network', 'organizations', 'peerOrganizations', 'org1.example.com', 'connection-org1.json');
        let ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        const identity = await wallet.get(req.body.userId);
        if (!identity) {
            console.log('An identity for the user "appUser" does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            return;
        }

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: req.body.userId, discovery: { enabled: true, asLocalhost: true } });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('mychannel');

        // Get the contract from the network.
        const contract = network.getContract('fabcar');

        
        const result3 = await contract.submitTransaction('grant_permission', req.body.recordId,req.body.userId2);
        console.log(`Transaction has been evaluated, result is: ${result3.toString()}`);
        res.status(200).json({response: JSON.parse(result3.toString('utf8'))});

        // Disconnect from the gateway.
        await gateway.disconnect();

    } catch (error) {
        console.error(`Failed to submit transaction: ${error}`);
        process.exit(1);
    }
}

app.post('/api/revoke', async function (req, res)  {
    // user-id, record-id, iser-id-2
    try {
        // load the network configuration
        const ccpPath = path.resolve(__dirname, '..', '..', 'test-network', 'organizations', 'peerOrganizations', 'org1.example.com', 'connection-org1.json');
        let ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        const identity = await wallet.get(req.body.userId);
        if (!identity) {
            console.log('An identity for the user "appUser" does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            return;
        }

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: req.body.userId, discovery: { enabled: true, asLocalhost: true } });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('mychannel');

        // Get the contract from the network.
        const contract = network.getContract('fabcar');

        
        const result3 = await contract.submitTransaction('revoke_permission', req.body.recordId,req.body.userId2);
        console.log(`Transaction has been evaluated, result is: ${result3.toString()}`);
        res.status(200).json({response: JSON.parse(result3.toString('utf8'))});

        // Disconnect from the gateway.
        await gateway.disconnect();

    } catch (error) {
        console.error(`Failed to submit transaction: ${error}`);
        process.exit(1);
    }
}
app.listen(8080);
// npx nodemon api_query.js