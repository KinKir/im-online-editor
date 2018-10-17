
// get state
export let mapStateToProps = (state) => {
    return {
        getToken: state.loginToken
    }
};
// commit dispacth
export let mapDispatchToProps = (dispatch) => {
    return {
        setToken(val) {
            dispatch({
                type: "SET_TOKEN",
                val,
            });
        }
    }
};