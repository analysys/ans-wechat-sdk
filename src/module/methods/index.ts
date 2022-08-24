
import { registerSuperProperty, registerSuperProperties, getSuperProperty, getSuperProperties, unRegisterSuperProperty, clearSuperProperties} from './superProperty'
import pageView from './pageView'
import pageClose from './pageClose'
import startUp from './startUp'
import appStart from './appStart'
import end from './end'
import alias from './alias'
import userClick, { userClickTab } from './userClick'
import { profileSetOnce, profileSet, profileAppend, profileIncrement, profileDelete, profileUnset } from './profile'
import reset from './reset'
import { getPresetProperties } from './presetProperties'
import track from './track'
import { identify, getDistinctId} from './identify'
import { pageProperty } from './pageProperty'
import share from './share'

export {
  startUp,
  appStart,
  registerSuperProperty,
  registerSuperProperties,
  getSuperProperty,
  getSuperProperties,
  unRegisterSuperProperty,
  clearSuperProperties,
  pageView,
  pageClose,
  end,
  track,
  alias,
  share,
  userClick, userClickTab,
  profileSetOnce, profileSet, profileAppend, profileIncrement, profileDelete, profileUnset,
  reset,
  getPresetProperties,
  identify,
  getDistinctId,
  pageProperty
}