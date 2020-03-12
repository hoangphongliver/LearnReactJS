import React, { Component } from 'react';
import * as courseAction from '../State/Action';
import { connect } from 'react-redux';
import Service from '../Service/service'
import LoadingBar from 'react-top-loading-bar';
import moment from 'moment';


class Add extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: null,
            courseName: '',
            noMember: '',
            time: '',
            desc: '',
            lastUpdated: '',
            loadingBarProgress: 0,
            showLoader: false
        }
    }

    componentDidMount() {
        const courseToEdit = this.props.getCourseToEdit;
        if (courseToEdit) {
            this.setState({
                id: courseToEdit.id,
                courseName: courseToEdit.courseName,
                noMember: courseToEdit.noMember,
                time: courseToEdit.time,
                desc: courseToEdit.desc
            })
        }
    }

    componentWillReceiveProps(props) {
        const courseToEdit = props.getCourseToEdit;
        if (courseToEdit) {
            this.setState({
                id: courseToEdit.id,
                courseName: courseToEdit.courseName,
                noMember: courseToEdit.noMember,
                time: courseToEdit.time,
                desc: courseToEdit.desc,
                lastUpdated: moment(new Date()).format('YYYY-MM-DDTHH:mm:ss.SSSSS')
            })
        }
    }

    handleChange = (e) => {
        const target = e.target;
        let name = target.name;
        let value = target.value;
        this.setState({
            [name]: value
        });
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.loadingItem()
        const courseModel = {
            id: this.state.id,
            noMember: this.state.noMember,
            desc: this.state.desc,
            courseName: this.state.courseName,
            time: this.state.time,
            lastUpdated: moment(new Date()).format('YYYY-MM-DDTHH:mm:ss.SSSSS')
        }
        this.setState({
            loadingBarProgress: 0,
            showLoader: true
        })
        const sortBy = this.props.sortBy ? this.props.sortBy : 'lastUpdated';
        const searchPhase = this.props.searchPhase ? this.props.searchPhase : '';
        if (this.state.id) {
            Service.updateCourse(courseModel.id, courseModel).then(res => {
                Service.getAllCousse(1, 10, sortBy, searchPhase, '', '').then(res => {
                    this.props.onUpdateCourse(res.data);
                    this.setState({
                        loadingBarProgress: 100,
                        showLoader: false
                    })
                    this.resetState()
                });
            });
        } else {
            this.setState({
                loadingBarProgress: 0
            })
            Service.addCourse(courseModel).then(res => {
                Service.getAllCousse(1, 10, sortBy, searchPhase, '', '').then(res => {
                    this.props.onUpdateCourse(res.data);
                    this.setState({
                        loadingBarProgress: 100,
                        showLoader: false
                    })
                    this.resetState()
                });
            });
        }
    }

    resetState() {
        this.setState({
            id: null,
            courseName: '',
            noMember: '',
            time: '',
            desc: ''
        })
    }

    loadingItem() {
        this.props.loadingItem();
    }


    render() {

        return (
            <form className="book__add" onSubmit={this.onSubmit}>
                <LoadingBar
                    progress={this.state.loadingBarProgress}
                    height={5}
                    color='#007bff'
                    onRef={ref => (this.LoadingBar = ref)}
                />
                <h1>Add Course</h1>
                <div className="form-group">
                    <input type="text" name="courseName" value={this.state.courseName} onChange={this.handleChange} className="form-control" id="exampleInputEmail1" placeholder="Course Name" />
                </div>
                <div className="form-group">
                    <input type="text" name="noMember" value={this.state.noMember} onChange={this.handleChange} className="form-control" id="exampleInputPassword1" placeholder="No. Member" />
                </div>
                <div className="form-group">
                    <input type="text" name="desc" value={this.state.desc} onChange={this.handleChange} className="form-control" id="exampleInputPassword11" placeholder="Description" />
                </div>
                <div className="form-group">
                    <input type="text" name="time" value={this.state.time} onChange={this.handleChange} className="form-control" id="exampleInputPassword1111" placeholder="Time" />
                </div>
                <div className="submit">
                    <button type="submit" className="btn btn-primary">{this.state.id ? 'Edit Book' : 'Add Course'}</button>
                </div>
            </form>
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
        onAddCourse: (item) => {
            dispatch(courseAction.addCourse({
                data: item
            }));
        },
        onUpdateCourse: (course) => {
            dispatch(courseAction.updateCourse({
                course,
            }));
        },
        loadingItem: () => {
            dispatch(courseAction.loadingItem())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Add);
