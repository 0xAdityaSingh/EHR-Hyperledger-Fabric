# HealthConnect.ai
## Project: A Blockchain based healthcare data-sharing platform

### Introduction
Data-sharing in healthcare is critical for a complete patient care experience. A patient goes to multiple hospitals/ clinicians in their healthcare journey but their medical data is not being recorded in a confidential and integral way by any authority. Doctors at some different clinics might need to refer to a patient's medical history to make good decisions for treatment. We aim to build a blockchain solution using hyperledger fabric that can offer a way to share the patients’ medical data with various healthcare-related organisations while maintaining data integrity, confidentiality and patient privacy.

### Install

```bash
git clone https://github.com/c9addy/EHR-Hyperledger.git
```  
```bash
curl -sSL https://bit.ly/2ysbOFE | bash -s
```  
```bash
cd fabric-samples
cp -r config bin ../EHR-Hyperledger/
cd ../EHR-Hyperledger/
```  

### Run

```bash
cd fabcar
```  

```bash
./startFabric.sh javascript
```  

```bash
cd javascript
```  

```bash
npm install
```  

```bash
node enrollAdmin.js
node registerUser.js
node invoke.js
node query.js
```  
