export default {
    // get state
    mapStateToProps(state) {
        return {
            getToken: state.loginToken
        }
    },
    // commit dispacth
    mapDispatchToProps(dispatch) {
        return {
            setToken(val) {
                dispatch({
                    type: "SET_TOKEN",
                    val,
                });
            }
        }
    }
};