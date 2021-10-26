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
        const cars = [
            {
                
                role: 'Patient',
                name: 'Pat1',
                owner: 'Tomoko',
            },
            {
                
                role: 'Patient',
                name: 'Pat2',
                owner: 'Brad',
            },
            {
                
                role: 'Patient',
                name: 'Pat3',
                owner: 'Jin Soo',
            },
            {
                
                role: 'Patient',
                name: 'Pat4',
                owner: 'Max',
            },
            {
                
                role: 'Patient',
                name: 'Pat5',
                owner: 'Adriana',
            },
            {
                
                role: 'Doctor',
                name: 'Doc1',
                owner: 'Michel',
            },
            {
                
                role: 'Doctor',
                name: 'Doc2',
                owner: 'Aarav',
            },
            {
                
                role: 'Doctor',
                name: 'Doc3',
                owner: 'Pari',
            },
            {
                
                role: 'Pharmacy',
                name: 'Pha1',
                owner: 'Valeria',
            },
            {
                
                role: 'Diagnostic_lab',
                name: 'DL1',
                owner: 'Shotaro',
            },
            {
                
                role: 'Insurance',
                name: 'Ins1',
                owner: 'Shotaro',
            },
        ];

        for (let i = 0; i < cars.length; i++) {
            cars[i].docType = 'car';
            await ctx.stub.putState('CAR' + i, Buffer.from(JSON.stringify(cars[i])));
            console.info('Added <--> ', cars[i]);
        }
        console.info('============= END : Initialize Ledger ===========');
    }

    async queryCar(ctx, carNumber) {
        const carAsBytes = await ctx.stub.getState(carNumber); // get the car from chaincode state
        if (!carAsBytes || carAsBytes.length === 0) {
            throw new Error(`${carNumber} does not exist`);
        }
        console.log(carAsBytes.toString());
        console.log(carAsBytes);
        return carAsBytes.toString();
    }

    async read_patient(ctx, ID) {
        const carAsBytes = await ctx.stub.getState(ID); // get the car from chaincode state
        if (!carAsBytes || carAsBytes.length === 0) {
            throw new Error(`${ID} does not exist`);
        }
        console.log(carAsBytes.toString());
        console.log(carAsBytes);
        return carAsBytes.toString();
    }

    async createCar(ctx, carNumber, role, name,  owner) {
        console.info('============= START : Create Car ===========');

        const car = {
            
            docType: 'car',
            role,
            name,
            owner,
        };

        await ctx.stub.putState(carNumber, Buffer.from(JSON.stringify(car)));
        console.info('============= END : Create Car ===========');
    }

    // async queryAllCars(ctx) {
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
    //         allResults.push({ Key: key, Record: record });
    //     }
    //     console.info(allResults);
    //     return JSON.stringify(allResults);
    // }
    async queryAll(ctx,role) {
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
            if(record.role.toString()===role){
                allResults.push({ Key: key, Record: record });
            }
            
        }
        console.info(allResults);
        return JSON.stringify(allResults);
    }
    


    async changeCarOwner(ctx, carNumber, newOwner) {
        console.info('============= START : changeCarOwner ===========');

        const carAsBytes = await ctx.stub.getState(carNumber); // get the car from chaincode state
        if (!carAsBytes || carAsBytes.length === 0) {
            throw new Error(`${carNumber} does not exist`);
        }
        const car = JSON.parse(carAsBytes.toString());
        car.owner = newOwner;

        await ctx.stub.putState(carNumber, Buffer.from(JSON.stringify(car)));
        console.info('============= END : changeCarOwner ===========');
    }

}

module.exports = FabCar;
