import { STASH_ID } from '../stash-action-types'

export const StashId = id => {
  return {
    type: STASH_ID,
    payload: id
  }
}
