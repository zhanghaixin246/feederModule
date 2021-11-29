/**
 * Created with feederModuleGateway
 * Author: ChrisChiu
 * Date: 2021/9/1
 * Desc:
 */
const response = require("../../utils/response");
const config = require("../../config/config");
const fs = require("fs");
const web3 = require("web3");


const contract = new web3.eth.Contract(JSON.parse(fs.readFileSync(config.abipath)), config.contractAddress.osm);

class api {
    constructor(app) {
        app.post(`/api/setPrice`, this.setPrice);
    }

    async getCurrentAccount() {
        const currentAccounts = await web3.eth.getAccounts();
        console.log("Unlocked account address: \t", currentAccounts[0]);
        return currentAccounts[0];
    }


    async setPrice(req, res) {

        let {type, price, date} = req.body;
        if (!type || !price || !date) {
            return response.returnError(res, "Missing parameters.");
        }

        return contract.methods
            .setResource_Value(type, +price, +date)
            .send({
                from: await this.getCurrentAccount(),
                gas: 50000,
                gasPrice: 1
            })
            .then(function (result) {
                return response.returnSuccess(res, "Add tx finalized in block: \t", result.blockNumber)
            });

    }
}

module.exports = api;
