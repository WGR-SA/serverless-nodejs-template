#!/usr/bin/env node
const
cb = function(err, success)
{
  console.log(success)
  process.exit(0)
},
{handler} = require('../index.js'),
message =
{
  key:'value'
}

handler({
  "Records": [
    {
      "Sns": {
        "Message": JSON.stringify(message),
      }
    }
  ]
},{}, cb)
