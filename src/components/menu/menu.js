import React, { Component } from 'react';
import * as courseAction from '../../State/Action';
import { connect } from 'react-redux';
import './menu.scss';
import { compose } from 'redux';
import { withRouter } from "react-router-dom";
import { FaHome, FaArrowLeft } from 'react-icons/fa';

class Menu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isShowForm: false,
            courseID: null
        }
    }

    goHomePage = () => {
        this.props.history.push("/");
    }

    back = () => {
        const { courseID } = this.props;
        this.props.history.push(`/viewmember/${courseID}`);
        this.props.resetPhotoList()
    }

    render() {
        return (
            <div className="menu">
                <div className="menu__logo btn btn-info" onClick={this.goHomePage}><FaHome /></div>
                <div className="menu__logo btn btn-info menu__about" onClick={this.back}><FaArrowLeft /></div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        ...state.course
    }
};


const mapDispatchToProps = (dispatch, props) => {
    return {
        resetPhotoList: () => {
            dispatch(courseAction.resetPhotoList());
        }
    }
}

export default compose(withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(Menu)
