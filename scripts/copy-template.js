const fs = require('fs/promises')

function clone (obj) {
  return JSON.parse(JSON.stringify(obj))
}

async function extractArgs (model) {
  const [,, folder, ...rest] = process.argv
  return {
    folder,
    title: rest.join(' ') || 'No Title'
  }
}

async function saveHistory (model, history) {
  await fs.writeFile('history.json', JSON.stringify(history, null, 2), 'utf8')
  return model
}

async function run (steps, startingModel) {
  const history = []
  const stepList = Object.entries(steps)
  let nextState = clone(startingModel)
  while (stepList.length > 0) {
    const [stepName, stepFn] = stepList.shift()
    try {
      const state = clone(nextState)
      console.log(stepName)
      nextState = await stepFn(state, history)
      console.log('', nextState)
      history.push(nextState)
    } catch (ex) {
      console.error('Error with', stepName, ex.message)
      history.push(ex)
    }
  }
}

run({
  'Extract Args': extractArgs,
  'Save History': saveHistory
}, {})
