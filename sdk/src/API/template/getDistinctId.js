import id from '../../lib/fillFiled/id';

function getDistinctId () {
    return id.getTrackId() || id.jsId()
}

export { getDistinctId }