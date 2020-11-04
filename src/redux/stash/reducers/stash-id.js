import { act } from 'react-dom/test-utils'
import { STASH_ID } from '../stash-action-types'
const initialState = {
  stashId: ''
}

const StashId = (state = initialState, action) => {
  switch (action.type) {
    case STASH_ID:
      return {
        ...state,
        stashId: action.payload
      }
    default:
      return state
  }
}

export default StashId
