/*
 * @Description: 返回值规范
 * @Autor: ChengLiang
 * @Date: 2020-11-26 15:52:40
 */
const codeMap = {
    systemError: "-1",
    commonError: "-2",
    paramError: "-3",

    commonSuccess: "0",
};

const returnSuccess = (res, data) => {
    return res.json({
        code: codeMap.commonSuccess,
        result: data
    });
};

const returnError = (res, err) => {
    return res.json({
        code: codeMap.commonError,
        error: err
    });
};

const returnParamError = (res) => {
    return res.json({
        code: codeMap.paramError,
        error: "参数错误"
    });
};

module.exports = {
    returnSuccess, returnError, returnParamError
};
