import {stateType} from "../redux/redux-store";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import React, {ComponentType} from "react";

let mapStateToProps = (state: stateType): mapStateToPropsType => ({
    isAuth: state.auth.isAuth
})
type mapStateToPropsType = {
    isAuth: boolean
}

export function withRedirect<T>(Component: ComponentType<T>) {

    let RedirectComponent = (props: mapStateToPropsType) => {
        let {isAuth, ...restProps} = props
        if (!isAuth) return <Redirect to={'/login'}/>
        return <Component {...restProps as T}/>
    }
    return connect(mapStateToProps)(RedirectComponent)
}