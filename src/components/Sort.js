import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as courseAction from '../State/Action';
import Service from '../Service/service'
import LoadingBar from 'react-top-loading-bar';


class Sort extends Component {

    constructor(props) {
        super(props);
        this.state = {
            option: [
                { name: 'All Course', value: 'courseName' },
                { name: 'Course Name', value: 'courseName' },
                { name: 'Time', value: 'time' },
                { name: 'Description', value: 'desc' },
                { name: 'Last Updated', value: 'lastUpdated' },

            ],
            value: 'lastUpdated',
            loadingBarProgress: 0
        }
    }

    handleOption = (e) => {
        this.loadingItem()
        this.setState({
            loadingBarProgress: 0
        });
        const sortBy = e.target.value;
        this.props.onSortCourse(e.target.value);
        Service.getAllCousse(1, 10, sortBy, '', '', '').then(res => {
            this.props.onUpdateCourse(res.data);
            this.setState({
                loadingBarProgress: 100
            });
        })
    }

    loadingItem(){
        this.props.loadingItem();
    }

    render() {

        const select = this.state.option.map((option, index) => {
            return <option key={index} value={option.value}>{option.name}</option>
        })
        return (
            <div className="sort">
                <LoadingBar
                    progress={this.state.loadingBarProgress}
                    height={5}
                    color='#007bff'
                    onRef={ref => (this.LoadingBar = ref)}
                />
                <div className="form-group">
                    <select className="form-control" onChange={this.handleOption} id="exampleFormControlSelect1">
                        {select}
                    </select>
                </div>
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
        onSortCourse: (sortBy) => {
            dispatch(courseAction.sortCourse({
                sortBy
            }));
        },
        onUpdateCourse: (course) => {
            dispatch(courseAction.updateCourse({
                course
            }))
        },
        loadingItem: () => {
            dispatch(courseAction.loadingItem())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Sort);