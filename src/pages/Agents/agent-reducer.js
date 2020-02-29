const AgentReducer = (params, { type, payload }) => {
    switch (type) {
        case 'UPDATE_ORDER':
            return {
                ...params,
                page: 0,
                order: payload
            }
        case 'UPDATE_PAGE':
            return {
                ...params,
                page: payload
            }
        case 'UPDATE_DATE':
            return {
                ...params,
                page: 0
            }
        default:
            return params
    }
}
export default AgentReducer
