/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';
// import sjcl from 'sjcl'
const { Contract } = require('fabric-contract-api');

class FabCar extends Contract {

    async initLedger(ctx) {
        console.info('============= START : Initialize Ledger ===========');
        const records = [
            {
                
                owner: 'x509::/OU=org1/OU=client/OU=department1/CN=appUser::/C=US/ST=North Carolina/O=Hyperledger/OU=Fabric/CN=fabric-ca-server',
                allowed: ['x509::/OU=org1/OU=client/OU=department1/CN=doctor1::/C=US/ST=North Carolina/O=Hyperledger/OU=Fabric/CN=fabric-ca-server', 'x509::/OU=org1/OU=client/OU=department1/CN=pharmacy1::/C=US/ST=North Carolina/O=Hyperledger/OU=Fabric/CN=fabric-ca-server','x509::/OU=org1/OU=client/OU=department1/CN=insurance1::/C=US/ST=North Carolina/O=Hyperledger/OU=Fabric/CN=fabric-ca-server'],
                type: 'Prescription',
                data: 'DataID1',
            },
            {
                
                owner: 'x509::/OU=org1/OU=client/OU=department1/CN=appUser::/C=US/ST=North Carolina/O=Hyperledger/OU=Fabric/CN=fabric-ca-server',
                allowed: ['x509::/OU=org1/OU=client/OU=department1/CN=doctor1::/C=US/ST=North Carolina/O=Hyperledger/OU=Fabric/CN=fabric-ca-server'],
                type: 'Prescription',
                data: 'DataID12',
            },
            {
                
                owner: 'x509::/OU=org1/OU=client/OU=department1/CN=appUser::/C=US/ST=North Carolina/O=Hyperledger/OU=Fabric/CN=fabric-ca-server',
                allowed: ['x509::/OU=org1/OU=client/OU=department1/CN=doctor1::/C=US/ST=North Carolina/O=Hyperledger/OU=Fabric/CN=fabric-ca-server', 'x509::/OU=org1/OU=client/OU=department1/CN=pharmacy1::/C=US/ST=North Carolina/O=Hyperledger/OU=Fabric/CN=fabric-ca-server','x509::/OU=org1/OU=client/OU=department1/CN=insurance1::/C=US/ST=North Carolina/O=Hyperledger/OU=Fabric/CN=fabric-ca-server'],
                type: 'Lab Report',
                data: 'DataID13',
            },
            {
                
                owner: 'x509::/OU=org1/OU=client/OU=department1/CN=appUser1::/C=US/ST=North Carolina/O=Hyperledger/OU=Fabric/CN=fabric-ca-server',
                allowed: ['x509::/OU=org1/OU=client/OU=department1/CN=doctor1::/C=US/ST=North Carolina/O=Hyperledger/OU=Fabric/CN=fabric-ca-server','x509::/OU=org1/OU=client/OU=department1/CN=diagnostic_lab1::/C=US/ST=North Carolina/O=Hyperledger/OU=Fabric/CN=fabric-ca-server'],
                type: 'Lab Report',
                data: 'DataID2',
            },            
            {
                
                owner: 'x509::/OU=org1/OU=client/OU=department1/CN=appUser2::/C=US/ST=North Carolina/O=Hyperledger/OU=Fabric/CN=fabric-ca-server',
                allowed: ['x509::/OU=org1/OU=client/OU=department1/CN=doctor2::/C=US/ST=North Carolina/O=Hyperledger/OU=Fabric/CN=fabric-ca-server'],
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
    async createCar(ctx, owner,  type, data) {
        var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=Base64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9\+\/\=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/\r\n/g,"\n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}}
        console.info('============= START : Create Car ===========');
        var allowed =[];
        const record = {
            owner,
            allowed,
            type,
            data
        };
        const role = await ctx.clientIdentity.getAttributeValue('hf.Registrar.Roles')
        let role_str = role.toString();
        if(role_str === 'doctor'){
            record['allowed'].push(ctx.clientIdentity.getID());
            var ID = Base64.encode(JSON.stringify(record));
            await ctx.stub.putState(ID, Buffer.from(JSON.stringify(record)));
            return "ID: "+ID;
        }
        if(role_str === 'diagnostic lab'){
            if(record['type']==='Lab Report' ){
                record['allowed'].push(ctx.clientIdentity.getID());
                var ID = Base64.encode(JSON.stringify(record));
                await ctx.stub.putState(ID, Buffer.from(JSON.stringify(record)));
                return "ID: "+ID;
            }
            else{
                return "403 Authetication Faliure";
            }
            
        }
        else{
            return "Not Allowed";
        }
        
    }
   
    async grant_permission(ctx,ID,UID){
        const carAsBytes = await ctx.stub.getState(ID); // get the car from chaincode state
        const role = await ctx.clientIdentity.getAttributeValue('hf.Registrar.Roles')
        if(role===null){
            return "Error: Role not found";
        }
        let role_str = role.toString();
        let record=JSON.parse(carAsBytes.toString());
        if(role_str === 'patient'){
            if(record['owner']===ctx.clientIdentity.getID()){
                if(record['allowed'].includes(UID)){
                    return "Permission Already Granted";
                }
                else{
                    record['allowed'].push(UID);
                    // record.data='Updated_DataID1';
                    await ctx.stub.putState(ID, Buffer.from(JSON.stringify(record)));
                    return "Permission Granted";
                }
            }
            else {
                return "403 Authetication Faliure";
                
            }
        }
        else{
            return "Not Allowed";
        }
    }
    async revoke_permission(ctx,ID,UID){
        const carAsBytes = await ctx.stub.getState(ID); // get the car from chaincode state
        const role = await ctx.clientIdentity.getAttributeValue('hf.Registrar.Roles')
        if(role===null){
            return "Error: Role not found";
        }
        let role_str = role.toString();
        let record=JSON.parse(carAsBytes.toString());
        if(role_str === 'patient'){
            if(record['owner']===ctx.clientIdentity.getID()){
                if(record['allowed'].includes(UID)){
                    record['allowed'].splice(record['allowed'].indexOf(UID));
                    await ctx.stub.putState(ID, Buffer.from(JSON.stringify(record)));
                    return "Permission Revoked";
                }
                else{
                    
                    return "Haven't Given any Permission";
                }
            }
            else {
                return "403 Authetication Faliure";
                
            }
        }
        else{
            return "Not Allowed";
        }
    }
    async update_data(ctx,ID,updated_string){
        const carAsBytes = await ctx.stub.getState(ID); // get the car from chaincode state
        const role = await ctx.clientIdentity.getAttributeValue('hf.Registrar.Roles')
        if(role===null){
            return "Error: Role not found";
        }
        let role_str = role.toString();
        let record=JSON.parse(carAsBytes.toString());
        if(role_str === 'doctor'){
            if(record['allowed'].includes(ctx.clientIdentity.getID())){
                record.data=updated_string;
                await ctx.stub.putState(ID, Buffer.from(JSON.stringify(record)));
                return "New Data: "+record.data;
            }
            else{
                return "Require Permission to Update";
            }
            }
            if(role_str === 'diagnostic lab'){
                if(record['allowed'].includes(ctx.clientIdentity.getID()) && record['type']==='Lab Report'){
                    record.data=updated_string;
                    await ctx.stub.putState(ID, Buffer.from(JSON.stringify(record)));
                    return "New Data: "+record.data;
                }
                else{
                    return "Require Permission to Update";
                }
            }
            else {
                return "403 Authetication Faliure";
            }
        }
    
    
    async read_record(ctx, ID) {
        const carAsBytes = await ctx.stub.getState(ID); // get the car from chaincode state
        const role = await ctx.clientIdentity.getAttributeValue('hf.Registrar.Roles')
        if(role===null){
            return "Error: Role not found";
        }
        let role_str = role.toString();
        let record = JSON.parse(carAsBytes.toString());
        if(role_str === 'patient'){
            if(record['owner']===ctx.clientIdentity.getID()){
                return record['data'];
            }
            else {
                return "403 Authetication Faliure";
            }
        }
        if(role_str === 'insurance'){
            if(record['allowed'].includes(ctx.clientIdentity.getID())) {
                return record['data'];
            }
            else {
                return "403 Authetication Faliure";
            }
        }
        if(role_str === 'doctor'){
            if(record['allowed'].includes(ctx.clientIdentity.getID())) {
                return record['data'];
            }
            else {
                return "403 Authetication Faliure";
            }
        }
        if(role_str === 'pharmacy'){
            if(record['type']==='Prescription' && record['allowed'].includes(ctx.clientIdentity.getID())) {
                return record['data'];
            }
            else {
                return "403 Authetication Faliure";
            }
        }
        if(role_str === 'diagnostic lab'){
            if(record['type']==='Lab Report' && record['allowed'].includes(ctx.clientIdentity.getID())){
                return record['data'];
            }
            else {
                return "403 Authetication Faliure";
            }
        }
        return "role not found";
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
    async queryAllbyOwner(ctx) {
        const role = await ctx.clientIdentity.getAttributeValue('hf.Registrar.Roles')
        let role_str = role.toString();

        const startKey = '';
        const endKey = '';
        const allResults = {};
        for await (const {key, value} of ctx.stub.getStateByRange(startKey, endKey)) {
            const strValue = Buffer.from(value).toString('utf8');
            let record;
            try {
                record = JSON.parse(strValue);
                if(allResults[record.owner]===undefined){
                    var records =[];
                    if(role_str === 'patient'){
                        if(record['owner']===ctx.clientIdentity.getID()){
                            records.push(record);
                        }
                    }
                    if(role_str === 'insurance'){
                        if(record['allowed'].includes(ctx.clientIdentity.getID())) {
                            records.push(record);
                        }
                    }
                    if(role_str === 'doctor'){
                        if(record['allowed'].includes(ctx.clientIdentity.getID())) {
                            records.push(record);
                        }
                    }
                    if(role_str === 'pharmacy'){
                        if(record['type']==='Prescription' && record['allowed'].includes(ctx.clientIdentity.getID())) {
                            records.push(record);
                        }
                    }
                    if(role_str === 'diagnostic lab'){
                        if(record['type']==='Lab Report' && record['allowed'].includes(ctx.clientIdentity.getID())){
                            records.push(record);
                        }
                    }
                    if(records.length!=0) {
                        allResults[record.owner]=records;
                    }
                }
                else{
                    var records = allResults[record.owner];
                    if(role_str === 'patient'){
                        if(record['owner']===ctx.clientIdentity.getID()){
                            records.push(record);
                        }
                    }
                    if(role_str === 'insurance'){
                        if(record['allowed'].includes(ctx.clientIdentity.getID())) {
                            records.push(record);
                        }
                    }
                    if(role_str === 'doctor'){
                        if(record['allowed'].includes(ctx.clientIdentity.getID())) {
                            records.push(record);
                        }
                    }
                    if(role_str === 'pharmacy'){
                        if(record['type']==='Prescription' && record['allowed'].includes(ctx.clientIdentity.getID())) {
                            records.push(record);
                        }
                    }
                    if(role_str === 'diagnostic lab'){
                        if(record['type']==='Lab Report' && record['allowed'].includes(ctx.clientIdentity.getID())){
                            records.push(record);
                        }
                    }

                    allResults[record.owner]=records;
                }
            } catch (err) {
                console.log(err);
                record = strValue;
            }
            
            
        }
        console.info(allResults);
        return JSON.stringify(allResults);
    }
    


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