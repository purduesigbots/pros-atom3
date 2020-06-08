'use babel'
import ua from 'universal-analytics'

const LOCAL_KEY = "installed-packages:pros-atom3:ga-cid"
const GA_TID = 'UA-84548828-2'

let visitor = null

function getVisitor() {
  if(atom.config.get("pros-atom3.googleAnalytics.enabled") && (atom.config.get("core.telemetryConsent") == "limited")){
  if (!visitor) {
    if (!localStorage.getItem(LOCAL_KEY)) {
      visitor = ua(GA_TID)
      localStorage.setItem(LOCAL_KEY, visitor.cid)
    } else {
      visitor = ua(GA_TID, localStorage.getItem(LOCAL_KEY))
    }
  }
}
return visitor
}

const EL = 'pros-atom3'

const session = {
  start: () => {
    getVisitor() && getVisitor().event('session', 'start_session', EL, 1, {sc: 'start', nonInteraction: true, aip: true}).send()
  },
  end: () => {
    getVisitor() && getVisitor().event('session', 'end_session', EL, 0, {sc: 'end', nonInteraction: true, aip: true}).send()
  }
}

const action = {
  post: type => {
    getVisitor() && getVisitor().event('action', type, EL).send()
  }
}

export default { session, action }
