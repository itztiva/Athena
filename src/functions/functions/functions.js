import uuid from 'uuid'

function CreateId() {
    return uuid.v4();
}

export default [
    CreateId
]