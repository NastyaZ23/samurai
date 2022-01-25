import React from 'react';
import style from './NavBar.module.scss'
import { Redirect} from 'react-router-dom'
import {connect} from "react-redux";
import {stateType} from "../../redux/redux-store";
import {PATH} from "../../enums/PATH";
import {Nullable} from "../../types/Nullable";
import {logoutThunk} from "../../redux/reducer/auth-reducer";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {ItemList} from "./ItemList/ItemList";
import {faUser} from "@fortawesome/free-regular-svg-icons/faUser";
import {faEnvelope} from "@fortawesome/free-regular-svg-icons/faEnvelope";
import {faUsers} from "@fortawesome/free-solid-svg-icons/faUsers";
import {faRss} from "@fortawesome/free-solid-svg-icons/faRss";
import {faItunesNote} from "@fortawesome/free-brands-svg-icons/faItunesNote";
import {faCogs} from "@fortawesome/free-solid-svg-icons/faCogs";
import {faSignOutAlt} from "@fortawesome/free-solid-svg-icons/faSignOutAlt";

type NavBarPropsType = mapStateToPropsType & mapDispatchToPropsType

const NavBar = (props: NavBarPropsType) => {

    const listArray = [
        {path: PATH.PROFILE, title: 'PROFILE', icon: faUser},
        {path: PATH.DIALOGS, title: 'DIALOGS', icon: faEnvelope},
        {path: PATH.USERS, title: 'USERS', icon: faUsers},
        {path: PATH.NEWS, title: 'NEWS', icon: faRss},
        {path: PATH.MUSIC, title: 'MUSIC', icon: faItunesNote},
        {path: PATH.SETTINGS, title: 'SETTINGS', icon: faCogs},
    ]

    const onLogoutSpanClick = () => {
        props.logoutThunk()
        return <Redirect to={PATH.LOGIN}/>
    }

    if (props.authId) {

    }
    return (

        <nav className={style.navBar}>
            <ul className={style.list}>
                {listArray.map((item, i) => <ItemList key={i} path={item.path}
                                                      title={item.title} icon={item.icon}/>)}
                <li className={style.item}>
                    <span className={style.span} onClick={onLogoutSpanClick}>
                        <span className={style.icon}>
                        <FontAwesomeIcon icon={faSignOutAlt}/></span>
                        <span>LOGOUT</span>
                    </span>
                </li>
            </ul>
        </nav>

    )
}
type mapStateToPropsType = {
    authId: Nullable<number>
}
type mapDispatchToPropsType = {
    logoutThunk: () => void
}

let mapStateToProps = (state: stateType) => ({
    authId: state.auth.data.id
})


export default connect(mapStateToProps, {logoutThunk})(NavBar)