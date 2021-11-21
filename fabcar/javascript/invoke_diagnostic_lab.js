/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Gateway, Wallets } = require('fabric-network');
const fs = require('fs');
const path = require('path');

async function main() {
    try {
        // load the network configuration
        const ccpPath = path.resolve(__dirname, '..', '..', 'test-network', 'organizations', 'peerOrganizations', 'org1.example.com', 'connection-org1.json');
        let ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        const identity = await wallet.get('Diagnostic_lab1');
        if (!identity) {
            console.log('An identity for the user "Diagnostic_lab1" does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            return;
        }

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: 'Diagnostic_lab1', discovery: { enabled: true, asLocalhost: true } });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('mychannel');

        // Get the contract from the network.
        const contract = network.getContract('fabcar');
        const result=await contract.submitTransaction('createCar', 'x509::/OU=org1/OU=client/OU=department1/CN=appUser4::/C=US/ST=North Carolina/O=Hyperledger/OU=Fabric/CN=fabric-ca-server', 'Lab Report', 'DataID4');
        console.log(`Transaction has been submitted, result is: ${result.toString()}`);
        const result7=await contract.submitTransaction('createCar', 'x509::/OU=org1/OU=client/OU=department1/CN=appUser5::/C=US/ST=North Carolina/O=Hyperledger/OU=Fabric/CN=fabric-ca-server', 'Prescription', 'DataID5');
        console.log(`Transaction has been submitted, result is: ${result7.toString()}`);
        // const result0 = await contract.submitTransaction('update_data', 'RECORD0','Updated_DataID1');
        // console.log(`Transaction has been evaluated, result is: ${result0.toString()}`);
        // const result1 = await contract.submitTransaction('update_data', 'RECORD1','Updated_DataID2');
        // console.log(`Transaction has been evaluated, result is: ${result1.toString()}`);
        

        // Disconnect from the gateway.
        await gateway.disconnect();

    } catch (error) {
        console.error(`Failed to submit transaction: ${error}`);
        process.exit(1);
    }
}

main();
