const
_ = require('lodash'),
store = require('./src/stores/root.js'),
fetchRDS = require('./src/actions/fetchDataFromRDS.js'),
transmit = require('./src/actions/transmit.js'),
read = require('./src/actions/read.js'),
sendTopic = require('./src/actions/sns.js'),
sendLog = require('./src/actions/log.js'),

// app flow
subscribtion = store.subscribe(() =>
{
  let state = store.getState()
  switch(state.action.type)
  {
    case 'INIT': return store.dispatch(fetchRDS())

    case 'RDS_REQUEST_SUCCESS': return store.dispatch({})

    case 'LAST_SUCCESS':
    if(_.has(state,'message.topic.success')) return store.dispatch(sendTopic({
      Message: JSON.stringify(Object.assign(state.message, { readFile: state.content })),
      TopicArn: state.message.topic.success
    }))
    case 'SNS_SUCCESS': return store.dispatch(sendLog())

    case 'LOG_SUCCESS': return state.callback(null, 'Function perfored successfully!')

    case 'ERROR':
    if(_.has(state,'message.topic.error'))
      return store.dispatch(sendTopic({
        Message: JSON.stringify(Object.assign({}, state.message, {error: state.action.error})),
        TopicArn: state.message.topic.error
      }))
    else return state.callback(state.action.error)
  }
})

module.exports.handler = (event, context, callback) =>
{
  // bootsrap app
  store.dispatch({type:'INIT', event, context, callback })
}
