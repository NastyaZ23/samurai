import React, {Component, ComponentType} from "react"
import {Users} from "./Users";
import Preloader from "../../common/preloader/Preloader";
import {connect} from "react-redux";
import {
    changePageThunk, followThunk,
    getUsersThunk,
    unfollowThunk,

} from "../../redux/reducer/user-reducer";

import {stateType} from "../../redux/redux-store";
import {compose} from "redux";
import {ItemsUsersResponseType} from "../../api/types";

class UsersContainer extends Component<PropsType> {
    /*constructor(props:ownPropsType) {
        super(props);
    }*/
    componentDidMount() {
        this.props.getUsersThunk(this.props.currentPage, this.props.pageSize)
    }

    ChangePageHandler = (currentPage: number) => {
        this.props.changePageThunk(currentPage, this.props.pageSize)
    }

    render() {
        if (this.props.isFetching) {
            return <Preloader/>
        }
        return (
            <>
                <Users {...this.props} changePage={this.ChangePageHandler}
                />
            </>
        )
    }
}

type mapDispatchToPropsType = {
    getUsersThunk: (currentPage: number, pageSize: number) => void
    changePageThunk: (currentPage: number, pageSize: number) => void
    followThunk: (id: number) => void
    unfollowThunk: (id: number) => void

}

type mapStateToPropsType = {
    items: Array<ItemsUsersResponseType>
    pageSize: number
    totalUserCount: number
    currentPage: number
    isFetching: boolean
    followingInProgress: number[]
}

type ownPropsType = {
    category: string/*'users' | 'friends'*/
}
export type PropsType = mapStateToPropsType & mapDispatchToPropsType & ownPropsType

let mapStateToProps = (state: stateType) => ({
    items: state.UsersPage.items,
    pageSize: state.UsersPage.pageSize,
    totalUserCount: state.UsersPage.totalUserCount,
    currentPage: state.UsersPage.currentPage,
    isFetching: state.UsersPage.isFetching,
    followingInProgress: state.UsersPage.followingInProgress
})
export default compose<ComponentType>(
    connect<mapStateToPropsType, mapDispatchToPropsType, ownPropsType, stateType>
    (mapStateToProps, {
        changePageThunk,
        getUsersThunk,
        followThunk,
        unfollowThunk,
    }))(UsersContainer)
