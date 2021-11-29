/**
 * Created with recorderModule
 * Author: ChrisChiu
 * Date: 2021/9/28
 * Desc:
 */


module.exports = {
    nodeHTTP: "http://172.16.104.227:8545",
    feederAccount: {
        address: "0x7A402919Df6263DF947B5B7C7AFcDd5EaE40C711"
    },
    contract: {
        oracle: {
            address: "0x1f8415F202D5622E1dd71Bd055BC0651AC8EC8dB",
            abiPath: "abi/abi.json",
        }
    },
    physicalMineralPricesUrl: {
        WTIOIL:"https://shared.websol.barchart.com/charts/chart.php?page=chart&sym=CLY00&domain=advancedmedia&sg=true&display_ice=1&enabled_ice_exchanges=&document_write_alternative=",//https://oilprice.com/commodity-price-charts?page=chart&sym=CLY00 page real data resource
        GAS:"https://www.gasalberta.com/gas-market/market-prices"
    }
}
