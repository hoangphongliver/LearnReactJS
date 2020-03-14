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
            isShowForm: false,
            courseID: null
        }
    }

    goHomePage = () => {
        this.props.history.push("/");
    }

    componentDidMount() {
        const  memberID  = this.props.match.params;
        // this.setState({
        //     courseID
        // });
        console.log(memberID);
        
    }


    back = () => {
        this.props.history.push(`/viewmember/${this.props.courseID}`);
        this.props.resetPhotoList()
    }

    render() {
        return (
            <div className="menu">
                <div className="menu__logo" onClick={this.goHomePage}>Home</div>
                <div className="menu__logo menu__about" onClick={this.back}>Back</div>
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
