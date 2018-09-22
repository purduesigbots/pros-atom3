import ua from 'universal-analytics'
import uuidv4 from 'uuid/v4'

// visitor instance
let visitor = null

class GA {
  static get _keys() {
    return ['pros.telemetryConsent', 'core.telemetryConsent', 'pros.clientId']
  }
  static get _UA() {
    return 'UA-84548828-2'
  }
  static get _visitor() {
    const [prosTelemetryKey, coreTelemetryKey, cidKey] = GA._keys
    // check if user has consented to telemetry, respecting core setting
    if (atom.config.get(prosTelemetryKey) && atom.config.get(coreTelemetryKey)) {
      // check if visitor has already been initialized
      if (!visitor) {
        // generate client ID if one does not exist
        let cid = localStorage.getItem(cidKey)

        if (!cid) {
          cid = uuidv4()
          localStorage.setItem(cidKey, cid)
        }

        // initialize visitor instance
        visitor = ua(GA._UA, cid)
      }
      // return visitor instance
      return visitor
    }
    // user does not consent
    return null
  }
  static canSendData() {
    return !!GA._visitor
  }
  sendEvent(evt) {

  }
  startSession() {
    if (GA.canSendData()) {
      // TODO: send startSession event
    }
  }
}
export default GA

/*
 * metrics to track:
 * - total session time
 * - what commands are dispatched^
 * - what buttons are pressed
 * - what links are clicked (after welcome page is integrated)
 *
 * ^ this might be tricky wrt dispatch chaining (and the fact that buttons dispatch commands)
 */
