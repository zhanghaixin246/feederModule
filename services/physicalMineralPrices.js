/**
 * Created with recorderModule
 * Author: ChrisChiu
 * Date: 2021/10/27
 * Desc:
 */

const config = require("../config");
const moment = require("moment");
const fs = require("fs");
const path = require("path");
const web3 = require("../web3/connect");

const onChain_setPhysicalMineralPrices = async (...params) => new Promise(async (resolve, reject) => {
    const contract = new web3.eth.Contract(JSON.parse(fs.readFileSync(path.join(__dirname,"../", config.contract.oracle.abiPath))), config.contract.oracle.address);
    contract.handleRevert = true;

    try {
        const res = await contract.methods.setPhysicalMineralPrices(...params).send({
            from: config.feederAccount.address,
            gas: 50000000,
            gasPrice: 1
        })
        console.dir(`send transaction successful (blockHash: ${res.blockHash})`);
        return resolve(res.blockHash);
    } catch (e) {
        console.error(`Revert Or Require Throw Error: ${e.reason}`);
        return reject(e.reason);
    }
})


module.exports = {
    onChain: {setPhysicalMineralPrices: onChain_setPhysicalMineralPrices}
}
