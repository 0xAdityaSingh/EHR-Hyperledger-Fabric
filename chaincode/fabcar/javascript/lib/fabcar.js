/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Contract } = require('fabric-contract-api');

class FabCar extends Contract {

    async initLedger(ctx) {
        console.info('============= START : Initialize Ledger ===========');
        const records = [
            {
                
                owner: 'Patient1',
                allowed: ['Doctor1', 'Pharmacy1'],
                type: 'Prescription',
                data: 'DataID1',
            },
            {
                
                owner: 'Patient1',
                allowed: ['Doctor1'],
                type: 'Lab Report',
                data: 'DataID2',
            },            
            {
                
                owner: 'Patient2',
                allowed: ['Doctor1'],
                type: 'Prescription',
                data: 'DataID3',
            },
        ];

        for (let i = 0; i < records.length; i++) {
            records[i].docType = 'record';
            await ctx.stub.putState('RECORD' + i, Buffer.from(JSON.stringify(records[i])));
            console.info('Added <--> ', records[i]);
        }
        console.info('============= END : Initialize Ledger ===========');
    }

    // async queryCar(ctx, carNumber) {
    //     const carAsBytes = await ctx.stub.getState(carNumber); // get the car from chaincode state
    //     if (!carAsBytes || carAsBytes.length === 0) {
    //         throw new Error(`${carNumber} does not exist`);
    //     }
    //     console.log(carAsBytes.toString());
    //     console.log(carAsBytes);
    //     return carAsBytes.toString();
    // }

    // async read_patient(ctx, ID) {
    //     const carAsBytes = await ctx.stub.getState(ID); // get the car from chaincode state
    //     const role = await ctx.clientIdentity.getAttributeValue('role')
    //     console.log(role.toString());
    //     if (!carAsBytes || carAsBytes.length === 0) {
    //         throw new Error(`${ID} does not exist`);
    //     }
    //     // console.log(carAsBytes.toString());
    //     // console.log(carAsBytes);
    //     return carAsBytes.toString();
    // }
    async createCar(ctx,ID, owner, allowed,  type, data) {
        console.info('============= START : Create Car ===========');

        const record = {
            
            docType: 'records',
            owner,
            allowed,
            type,
            data
        };

        await ctx.stub.putState(ID, Buffer.from(JSON.stringify(record)));
        console.info('============= END : Create Car ===========');
    }
    // async createCar(ctx, carNumber, role, name,  owner) {
    //     console.info('============= START : Create Car ===========');

    //     const car = {
            
    //         docType: 'car',
    //         role,
    //         name,
    //         owner,
    //     };

    //     await ctx.stub.putState(carNumber, Buffer.from(JSON.stringify(car)));
    //     console.info('============= END : Create Car ===========');
    // }
    async read_record(ctx, ID) {
        //return ctx.clientIdentity.getID().toString();
        // const carAsBytes = await ctx.stub.getState(ID); // get the car from chaincode state
        // const role = await ctx.clientIdentity.getAttributeValue('hf.Type')
        // if(role===null){
        //     return "Error: Role not found";
        // }

        // if (!carAsBytes || carAsBytes.length === 0) {
        //     throw new Error(`${ID} does not exist`);
        // }
        // console.log(carAsBytes.toString());
        // console.log(carAsBytes);
        // return carAsBytes.toString();


        // let role_str = role.toString();
        // let record = JSON.parse(carAsBytes.toString());

        // if(role_str === 'doctor'){
        //     if(record['allowed'].includes(ctx.clientIdentity.getID())) {
        //         return record['data'];
        //     }
        //     else {
        //         return "403 Authetication Faliure";
        //     }
        // }
        // if(role_str === 'pharmacy'){
        //     if(record['type']==='Prescription' && record['allowed'].includes(ctx.clientIdentity.getID())) {
        //         return record['data'];
        //     }
        //     else {
        //         return "403 Authetication Faliure";
        //     }
        // }
        // return "role not found";
        const role1 = ctx.clientIdentity.getAttributeValue('Registrar.Roles');
        const role2 = ctx.clientIdentity.getAttributeValue('hf.Registrar.Roles');
        if(role1!==null && role2!==null){
            return "1." + role1.toString() + role2.toString();
        }
        if(role1===null && role2!==null){
            return "2." + role2.toString();
        }
        if(role1!==null && role2===null){
            return "3." + role1.toString();
        }

        const type = await ctx.clientIdentity.getAttributeValue('hf.Type')
        if(type!==null){
            return "4." + type.toString();
        }
        return "role1, role2, type, type2 is null";
    }
    async queryAll(ctx) {
        const startKey = '';
        const endKey = '';
        const allResults = [];
        for await (const {key, value} of ctx.stub.getStateByRange(startKey, endKey)) {
            const strValue = Buffer.from(value).toString('utf8');
            let record;
            try {
                record = JSON.parse(strValue);
            } catch (err) {
                console.log(err);
                record = strValue;
            }
            allResults.push({ Key: key, Record: record });
            
        }
        console.info(allResults);
        return JSON.stringify(allResults);
    }
    // async queryAll(ctx,role) {
    //     const startKey = '';
    //     const endKey = '';
    //     const allResults = [];
    //     for await (const {key, value} of ctx.stub.getStateByRange(startKey, endKey)) {
    //         const strValue = Buffer.from(value).toString('utf8');
    //         let record;
    //         try {
    //             record = JSON.parse(strValue);
    //         } catch (err) {
    //             console.log(err);
    //             record = strValue;
    //         }
    //         if(record.role.toString()===role){
    //             allResults.push({ Key: key, Record: record });
    //         }
            
    //     }
    //     console.info(allResults);
    //     return JSON.stringify(allResults);
    // }
    


    // async changeCarOwner(ctx, carNumber, newOwner) {
    //     console.info('============= START : changeCarOwner ===========');

    //     const carAsBytes = await ctx.stub.getState(carNumber); // get the car from chaincode state
    //     if (!carAsBytes || carAsBytes.length === 0) {
    //         throw new Error(`${carNumber} does not exist`);
    //     }
    //     const car = JSON.parse(carAsBytes.toString());
    //     car.owner = newOwner;

    //     await ctx.stub.putState(carNumber, Buffer.from(JSON.stringify(car)));
    //     console.info('============= END : changeCarOwner ===========');
    // }

}

module.exports = FabCar;


// 'use strict';

// const { Contract } = require('fabric-contract-api');

// class FabCar extends Contract {

//     async initLedger(ctx) {
//         console.info('============= START : Initialize Ledger ===========');
//         const records = [
//             {
                
//                 owner: 'Patient1',
//                 allowed: ['Doctor1', 'Pharmacy1'],
//                 type: 'Prescription',
//                 data: 'DataID1',
//             },
//             {
                
//                 owner: 'Patient1',
//                 allowed: ['Doctor1'],
//                 type: 'Lab Report',
//                 data: 'DataID2',
//             },            
//             {
                
//                 owner: 'Patient2',
//                 allowed: ['Doctor1'],
//                 type: 'Prescription',
//                 data: 'DataID3',
//             },
//         ];

//         for (let i = 0; i < records.length; i++) {
//             records[i].docType = 'record';
//             await ctx.stub.putState('RECORD' + i, Buffer.from(JSON.stringify(records[i])));
//             console.info('Added <--> ', records[i]);
//         }
//         console.info('============= END : Initialize Ledger ===========');
//     }

    

//     // -------------------------------------------------------------

//     async queryCar(ctx, carNumber) {
//         const carAsBytes = await ctx.stub.getState(carNumber); // get the car from chaincode state
//         if (!carAsBytes || carAsBytes.length === 0) {
//             throw new Error(`${carNumber} does not exist`);
//         }
//         console.log(carAsBytes.toString());
//         console.log(carAsBytes);
//         return carAsBytes.toString();
//     }



//     async createCar(ctx, carNumber, owner, allowed,  type, data) {
//         console.info('============= START : Create Car ===========');

//         const record = {
            
//             docType: 'records',
//             owner,
//             allowed,
//             type,
//             data
//         };

//         await ctx.stub.putState(carNumber, Buffer.from(JSON.stringify(car)));
//         console.info('============= END : Create Car ===========');
//     }
//     async queryAll(ctx) {
//         const startKey = '';
//         const endKey = '';
//         const allResults = [];
//         for await (const {key, value} of ctx.stub.getStateByRange(startKey, endKey)) {
//             const strValue = Buffer.from(value).toString('utf8');
//             let record;
//             try {
//                 record = JSON.parse(strValue);
//             } catch (err) {
//                 console.log(err);
//                 record = strValue;
//             }
//             allResults.push({ Key: key, Record: record });
            
//         }
//         console.info(allResults);
//         return JSON.stringify(allResults);
//     }
    


//     async changeCarOwner(ctx, carNumber, newOwner) {
//         console.info('============= START : changeCarOwner ===========');

//         const carAsBytes = await ctx.stub.getState(carNumber); // get the car from chaincode state
//         if (!carAsBytes || carAsBytes.length === 0) {
//             throw new Error(`${carNumber} does not exist`);
//         }
//         const car = JSON.parse(carAsBytes.toString());
//         car.owner = newOwner;

//         await ctx.stub.putState(carNumber, Buffer.from(JSON.stringify(car)));
//         console.info('============= END : changeCarOwner ===========');
//     }

// }

// module.exports = FabCar;