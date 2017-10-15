import * as deasync from 'deasync';
import * as Credstash from 'credstash';

const combOutValues = (data: any[]): object[] => data.map((item: any): object => {
  const isString = typeof item === 'string';
  const property = (isString && item) || Object.keys(item).pop();
  return { [property]: ((isString && property) || item[property]).toUpperCase() };
});

const pullEnvVariable = (key: string, values: object[] = []): string =>
  values.reduce((result: string|null, value: object): string|null =>
    (Reflect.has(value, key)
      ? value[key].toUpperCase()
      : result), null) || key.toUpperCase();

function credstashEnv(
  table: string,
  values: any[] = [],
  options: {
  prefix?: string,
  isSetAll?: boolean,
  awsOpts?: object
  } = {},
): void {
  const {
    prefix = '',
    isSetAll = values.length === 0,
    awsOpts = {},
  } = options;
  const preparedValues = combOutValues(values);
  const credstash = new Credstash({ table, awsOpts });
  const keyValue = deasync(credstash.list.bind(credstash))();

  Object.keys(keyValue).forEach((key: string): void => {
    const isInValues = preparedValues.some((value: object): boolean => Reflect.has(value, key));
    if (!isSetAll && !isInValues) return;

    const envVariable = `${prefix.toUpperCase()}${pullEnvVariable(key, preparedValues)}`;
    Reflect.set(process.env, envVariable, keyValue[key]);
  });
}

export = credstashEnv;
