"use strict";
const deasync = require("deasync");
const Credstash = require("credstash");
const combOutValues = (data) => data.map((item) => {
    const isString = typeof item === 'string';
    const property = (isString && item) || Object.keys(item).pop();
    return { [property]: ((isString && property) || item[property]).toUpperCase() };
});
const pullEnvVariable = (key, values = []) => values.reduce((result, value) => (Reflect.has(value, key)
    ? value[key].toUpperCase()
    : result), null) || key.toUpperCase();
function credstashEnv(table, values = [], options = {}) {
    const { prefix = '', isSetAll = values.length === 0, awsOpts = {}, } = options;
    const preparedValues = combOutValues(values);
    const credstash = new Credstash({ table, awsOpts });
    const keyValue = deasync(credstash.list.bind(credstash))();
    Object.keys(keyValue).forEach((key) => {
        const isInValues = preparedValues.some((value) => Reflect.has(value, key));
        if (!isSetAll && !isInValues)
            return;
        const envVariable = `${prefix.toUpperCase()}${pullEnvVariable(key, preparedValues)}`;
        Reflect.set(process.env, envVariable, keyValue[key]);
    });
}
module.exports = credstashEnv;
//# sourceMappingURL=index.js.map