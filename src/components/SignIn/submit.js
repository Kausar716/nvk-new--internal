import { SubmissionError } from 'redux-form'

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

function submit(values) {
  return sleep(500).then(() => {
    // simulate server latency
    if (!['john@nvk.com','richard@nvknurseries.com',  'nvk@nvk.com','paul', 'george', 'ringo'].includes(values.email)) {
      throw new SubmissionError({
        email: 'User does not exist',
        _error: 'Login failed!!'
      })
    } else if (values.password !== '12345') {
      throw new SubmissionError({
        password: 'Wrong password',
        _error: 'Login failed!'
      })
    } 
    else {
      window.alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`)
    }
  })
}

export default submit