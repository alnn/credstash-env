# credstash-env
Setup your env from credstash

# Installation
Ensure you have [AWS credentials configured](http://docs.aws.amazon.com/AWSJavaScriptSDK/guide/node-configuring.html).
The credentials should be set up as a [secret reader](https://github.com/fugue/credstash#secret-reader)
```bash
$ npm install --save credstash-env
```
or
```bash
$ yarn add credstash-env
```

# Examples

```js
const credstashEnv = require('credstash-env');

credstashEnv('credstash_table_name', [
  'my_credstash_key',
  { 'another_credstash_key': 'ANOTHER_ENV_VARIABLE' }
]);

console.log(process.env.MY_CREDSTASH_KEY); // my_credstash_value
console.log(process.env.ANOTHER_ENV_VARIABLE); // another_credstash_value
```