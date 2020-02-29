const AgentReducer = (agent, { type, payload }) => {
    console.log(payload, 'hmmm complicated shit')
    switch (type) {
        case 'UPDATE_DETAILS':
            return {
                ...agent,
                ...payload
            }
        case 'UPDATE_GUARANTOR':
            return {
                ...agent,
                guarantor: {
                    ...agent.guarantor,
                    ...payload
                }
            }
        case 'UPDATE_AVATAR':
            return {
                ...agent,
                imageId: payload.id,
                avatar: payload
            }
        case 'REMOVE_AVATAR':
            return {
                ...agent,
                imageId: '',
                avatar: {}
            }
        case 'UPDATE_ID':
            return {
                ...agent,
                identificationImageId: payload.id,
                idCard: payload
            }
        case 'REMOVE_ID':
            return {
                ...agent,
                identificationImageId: '',
                idCard: {}
            }

        default:
            return agent
    }
}
export default AgentReducer
