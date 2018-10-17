const STATE = {
    isHasToken: !!~document.cookie.indexOf('token')
}

export default {
    loginToken(state = STATE.isHasToken, action) {
        switch (action.type) {
            case 'SET_TOKEN':
                return action.val;
            default:
                return state;
        }
    }
}