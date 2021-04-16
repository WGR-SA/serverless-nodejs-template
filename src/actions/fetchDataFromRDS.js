const
_ = require('lodash'),
Op = require('sequelize').Op,
db = require('../../config/main.js').db,
keyValueFactory = require('../models/KeyValueFactory'),
{ decrypt } = require('../utils/crypto'),

fetch = function()
{
  return (dispatch, getState) =>
  {
    dispatch({ type: 'RDS_REQUEST' })

    let dataObject = {}

    keyValueFactory(db)
    .findAll({
      where: {
        function: {[Op.eq]: 'serverless-read-doc'},
        stage: {[Op.eq]: process.env.STAGE},
        key: {[Op.like]: getState().in.key+'%'}
      },
    })
    .catch(err => dispatch({ type: 'ERROR', error: err }))
    .then(data => {
      data.map(row => _.set(dataObject, row.key, decrypt(row.value)))
      dispatch({type: 'RDS_REQUEST_SUCCESS', data: dataObject})
    })
  }
}

module.exports = fetch
