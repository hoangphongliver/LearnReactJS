import React, { Component } from 'react';
import * as courseAction from '../../State/Action';
import { connect } from 'react-redux';
import './menu.scss';
import { compose } from 'redux';
import { withRouter } from "react-router-dom";

class Menu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isShowForm: false
        }
    }

    goHomePage = () => {
        this.props.history.push("/");
    }

    render() {
        return (
            <div className="menu">
                <div className="menu__logo" onClick={this.goHomePage}>Home</div>
                <div className="menu__about"></div>
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
        resetEdit: () => {
            dispatch(courseAction.resetEdit());
        }
    }
}

export default compose(withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(Menu)
