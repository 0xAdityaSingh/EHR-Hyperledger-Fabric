# HealthConnect.ai
## Project: A Blockchain based healthcare data-sharing platform

### Introduction
Data-sharing in healthcare is critical for a complete patient care experience. A patient goes to multiple hospitals/ clinicians in their healthcare journey but their medical data is not being recorded in a confidential and integral way by any authority. Doctors at some different clinics might need to refer to a patient's medical history to make good decisions for treatment. We aim to build a blockchain solution using hyperledger fabric that can offer a way to share the patients’ medical data with various healthcare-related organisations while maintaining data integrity, confidentiality and patient privacy.


# Hyperledger Fabric Samples

You can use Fabric samples to get started working with Hyperledger Fabric, explore important Fabric features, and learn how to build applications that can interact with blockchain networks using the Fabric SDKs. To learn more about Hyperledger Fabric, visit the [Fabric documentation](https://hyperledger-fabric.readthedocs.io/en/latest).

## Getting started with the Fabric samples

To use the Fabric samples, you need to download the Fabric Docker images and the Fabric CLI tools. First, make sure that you have installed all of the [Fabric prerequisites](https://hyperledger-fabric.readthedocs.io/en/latest/prereqs.html). You can then follow the instructions to [Install the Fabric Samples, Binaries, and Docker Images](https://hyperledger-fabric.readthedocs.io/en/latest/install.html) in the Fabric documentation. In addition to downloading the Fabric images and tool binaries, the Fabric samples will also be cloned to your local machine.



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


### Rerun

```
cd ..
```

```
./networkDown.sh
```

Follow steps from Run
