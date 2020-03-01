'use babel'
import ua from 'universal-analytics'

let visitor = null
const LOCAL_KEY = "installed-packages:pros-atom3:ga-cid"

function getVisitor() {
  if(!visitor){
    if(!localStorage.getItem(LOCAL_KEY)){
      visitor = ua('UA-84548828-2')
      localStorage.setItem(LOCAL_KEY, visitor.cid)
    } else {
      visitor = ua('UA-84548828-2', localStorage.getItem(LOCAL_KEY))
    }
  }
  return visitor
}

const EL = 'pros-atom3'

const session = {
  start: () => {
    getVisitor().event('session', 'start_session', EL, 1, {sc: 'start', nonInteraction: true}).send()
  },
  end: () => {
    getVisitor().event('session', 'end_session', EL, 0, {sc: 'end', nonInteraction: true}).send()
  }
}

const action = {
  post: type => {
    getVisitor().event('action', type, EL).send()
  }
}

export default { session, action }
