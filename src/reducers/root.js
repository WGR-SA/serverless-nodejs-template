const
_ = require('lodash'),
chalk = require('chalk'),
initialState =
{
  callback: null,
  message: null,
  content:{}
},
rootReducer = function(state = initialState, action)
{
  // set action to giv the state a name
  state = Object.assign({}, state, { action: action})
  console.log(chalk.yellow(' - state action:',state.action.type))

  switch (action.type)
  {
    case 'INIT':
    let message = JSON.parse(action.event.Records[0].Sns.Message)
    //if(!_.has(message,'in.key') || !_.has(message,'in.path')) return  Object.assign({}, state,{ callback: state.action.callback, action: { type: 'ERROR'}})
    return Object.assign({}, state)

    case 'RDS_REQUEST_SUCCESS':
    return Object.assign({}, state)

    case 'ERROR': console.log(action);
    default: return state
  }
}

module.exports = rootReducer
