/**
 * Created with feederModuleGateway
 * Author: ChrisChiu
 * Date: 2021/8/24
 * Desc:
 */
const path = require("path");

module.exports = {
    port: 3000,
    timeout: 600000, //10 miniutes
    abipath: path.join(__dirname, "..", "osm_abi.json"),
    contractAddress:{
        osm:""
    }
}
