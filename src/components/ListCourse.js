import React, { Component } from 'react';
import Search from './Search';
import Sort from './Sort';
import * as courseAction from '../State/Action';
import { connect } from 'react-redux';
import Service from '../Service/service'
import LoadingBar from 'react-top-loading-bar';
import { withRouter } from "react-router-dom";
import { compose } from 'redux';



class ListCourse extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: null,
            currentPage: 1,
            listPage: [1, 2, 3, 4, 5, 6, 7],
            totalPage: 0,
            loadingBarProgress: 0,
            searchPhase: '',
            sortBy: 'lastUpdated'
        }
    }

    componentDidMount() {
        const sortBy = this.state.sortBy;
        const searchPhase = this.state.searchPhase
        this.getCourse(1, 10, sortBy, searchPhase, '', '');
    }

    getCourse(page, limit, sortBy, search, filter, order) {
        this.loadingItem()
        Service.getAllCousse(page, limit, sortBy, search, filter, order).then(res => {
            this.props.onUpdateCourse(res.data);
            this.setState({ loadingBarProgress: 100 });
        });
    }

    componentWillReceiveProps(props) {
        if (props.searchPhase) {
            this.setState({
                searchPhase: props.searchPhase
            })
        }
        if (props.sortBy) {
            this.setState({
                sortBy: props.sortBy,
            })
        }
    }

    onEdit = (item) => {
        this.setState({
            loadingBarProgress: 0
        })
        setTimeout(() => {
            this.props.onEditCourse(item);
            this.setState({
                loadingBarProgress: 100
            })
        }, 200);
    }


    onDelete = (id) => {
        this.loadingItem()
        this.setState({
            currentPage: 1,
            loadingBarProgress: 0
        })
        Service.deleteCourse(id).then(res => {
            this.setState({ loadingBarProgress: 100 });
            this.getCourse(1, 10, this.state.sortBy, this.state.searchPhase, '', '');
        });
    }



    prevPage = () => {
        this.loadingItem()
        let page = this.state.currentPage;
        page--;
        if (page <= 1) {
            page = 1;
        }
        this.setState({
            currentPage: page,
            loadingBarProgress: 0
        });
        const sortBy = this.state.sortBy;
        const searchPhase = this.state.searchPhase
        Service.getAllCousse(page, 10, sortBy, searchPhase, '', '').then(res => {
            this.props.onUpdateCourse(res.data);
            this.setState({ loadingBarProgress: 100 })
        });
    }


    nextList = () => {
        this.loadingItem()
        let page = this.state.currentPage;
        page++;
        this.setState({
            currentPage: page,
            loadingBarProgress: 0
        });
        const sortBy = this.state.sortBy;
        const searchPhase = this.state.searchPhase
        Service.getAllCousse(page, 10, sortBy, searchPhase, '', '').then(res => {
            this.props.onUpdateCourse(res.data);
            this.setState({ loadingBarProgress: 100 })
        });
    }

    loadingItem() {
        this.props.loadingItem();
    }

    changePage = (page) => {
        this.loadingItem()
        this.setState({
            currentPage: page,
            loadingBarProgress: 0
        });
        const sortBy = this.state.sortBy;
        const searchPhase = this.state.searchPhase
        Service.getAllCousse(page, 10, sortBy, searchPhase, '', '').then(res => {
            this.props.onUpdateCourse(res.data);
            this.setState({ loadingBarProgress: 100 })
        });
    }

    goToViewMember = (id) => {
        this.props.history.push(`/viewmember/${id}`);
        this.props.saveCourseID(Number(id));
    }

    render() {
        let couserList = this.props.data.map((list, index) => {
            return <tr key={index}>
                {/* <th scope="row" style={{ width: "5%" }}>{index + 1}</th> */}
                <td style={{ width: "5%" }} onClick={() => this.goToViewMember(list.id)}>
                    <div className="show-loading-bar">
                        {list.isLoadingItem ? (
                            <div className="loading-bar"></div>
                        )
                            : (
                                <div>{index + 1}</div>
                            )
                        }
                    </div>
                </td>

                <td style={{ width: "20%" }} onClick={() => this.goToViewMember(list.id)}>
                    <div className="show-loading-bar">
                        {list.isLoadingItem ? (
                            <div className="loading-bar"></div>
                        )
                            : (
                                <div>{list.courseName}</div>
                            )
                        }
                    </div>
                </td>
                <td style={{ width: "10%" }} onClick={() => this.goToViewMember(list.id)}>
                    <div className="show-loading-bar">
                        {list.isLoadingItem ? (
                            <div className="loading-bar"></div>
                        )
                            : (
                                <div>{list.noMember}</div>
                            )
                        }
                    </div>
                </td>
                <td style={{ width: "10%" }} onClick={() => this.goToViewMember(list.id)}>
                    <div className="show-loading-bar">
                        {list.isLoadingItem ? (
                            <div className="loading-bar"></div>
                        )
                            : (
                                <div>{list.time}</div>
                            )
                        }
                    </div>
                </td>

                <td style={{ width: "15%" }} onClick={() => this.goToViewMember(list.id)}>
                    <div className="show-loading-bar">
                        {list.isLoadingItem ? (
                            <div className="loading-bar"></div>
                        )
                            : (
                                <div>{list.lastUpdated ? new Date(list.lastUpdated).toLocaleString() : ''}</div>
                            )
                        }
                    </div>
                </td>

                <td style={{ width: "25%" }}>
                    <div className="show-loading-bar">
                        {list.isLoadingItem ? (
                            <div className="loading-bar"></div>
                        )
                            : (
                                <div> {list.desc}</div>
                            )
                        }
                    </div>
                </td>
                <td style={{ width: "15%" }}>
                    <div className={list.isLoadingItem ? 'opc0' : ''}>
                        <button className="btn btn-info" onClick={() => this.onEdit(list)}>Edit</button>
                        <button className="btn btn-info" onClick={() => this.onDelete(list.id)}>Delete</button>
                    </div>
                </td>
            </tr>
        });

        let listPage = this.state.listPage.map((list, index) => {
            return <li key={index} className={list === this.state.currentPage ? 'active' : ''} onClick={() => this.changePage(list)}>{list}</li>
        })
        return (
            <div>
                <LoadingBar
                    progress={this.state.loadingBarProgress}
                    height={5}
                    color='#007bff'
                    onRef={ref => (this.LoadingBar = ref)}
                />
                <div className="actions">
                    <div className="actions__search">
                        <Search searchPhase={this.onSearch}></Search>
                    </div>
                    <div className="actions__sort">
                        <Sort sortOption={this.onSort}></Sort>
                    </div>
                </div>
                <table className="table table-hover">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Cousrse Name</th>
                            <th scope="col">No. Member</th>
                            <th scope="col">Time</th>
                            <th scope="col">Last Updated</th>
                            <th scope="col">Description</th>
                            <th scope="col" style={{ width: "15%" }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {couserList}
                    </tbody>
                </table>
                <div className="paging">
                    <ul>
                        <button className="btn btn-primary change-page" disabled={this.state.currentPage === 1} onClick={this.prevPage}> Prev </button>
                        <div className="number-page">
                            {listPage}
                        </div>
                        <button className="btn btn-primary change-page" disabled={this.props.data.length < 10} onClick={this.nextList}> Next </button>
                    </ul>
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
        onEditCourse: (item) => {
            dispatch(courseAction.editCourse({
                data: item
            }));
        },
        onUpdateCourse: (course) => {
            dispatch(courseAction.updateCourse({
                course
            }))
        },
        onDeleteCourse: (course) => {
            dispatch(courseAction.deleteCourse({
                course
            }))
        },
        loadingItem: () => {
            dispatch(courseAction.loadingItem())
        },
        saveCourseID: (id) => {
            dispatch(courseAction.saveCourseID(id))
        }
    }
}

export default compose(withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(ListCourse)