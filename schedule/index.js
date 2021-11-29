/**
 * Created with recorderModule
 * Author: ChrisChiu
 * Date: 2021/9/28
 * Desc:
 */

const schedule = require('node-schedule');
const physicalMineralPrices = require("../services/physicalMineralPrices");
const conf = require("../config");
const moment = require("moment");
const superagent = require('superagent');
const cheerio = require('cheerio')


const getWTIOILPrice = async () => new Promise((resolve, reject) => {
    superagent.get(conf.physicalMineralPricesUrl.WTIOIL).end((err, res) => {
        if (!err) {
            try {
                let r = new RegExp(/<td class="bcTD">(([\s\S])*?)<\/td>/g)
                let rs = new RegExp(/<td class="bcTD">/g);
                let re = new RegExp(/s<\/td>/g);
                let re2 = new RegExp(/<\/td>/g);
                let arr = res.text.match(r);
                let date = arr[0].replace(rs, "").replace(re2, "");
                let price = 0;
                for (let i = 0; i < arr.length; i++) {
                    let v = arr[i];
                    if (v.match(re)) {
                        price = v.replace(rs, "").replace(re, "")
                    }
                }
                let rprice = (+price) / 158.99 * 1000;
                return resolve({date, price: +(rprice.toFixed(2))});
            } catch (e) {
                return reject(e);
            }
        }
        return reject(err);

    });
})

const getGASPrice = async () => new Promise((resolve, reject) => {
    superagent.get(conf.physicalMineralPricesUrl.GAS).end((err, res) => {
        if (!err) {
            try {
                const r1 = new RegExp(/23-Nov-21\',[0-9.]+,((\d+).(\d+))/g)
                //console.dir(+(res.text.match(r1)[0].split(',').pop()));
                return resolve({date: "23-Nov-21", price: +(res.text.match(r1)[0].split(',').pop())});
            } catch (e) {
                return reject(e);
            }
        }
        return reject(err);
    });
})

const autoGetPhysicalMineralPrices = async () => {
    /*schedule.scheduleJob('30 * * * * *', async () => {*/
        console.dir(await getGASPrice());
        console.dir(await getWTIOILPrice());
    /*})*/
}

module.exports = {
    autoGetPhysicalMineralPrices
}
