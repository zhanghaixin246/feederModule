/**
 * Created with feederModuleGateway
 * Author: ChrisChiu
 * Date: 2021/8/24
 * Desc:
 */
const api = require("./api");

module.exports = (app) => {
    new api(app);
}
