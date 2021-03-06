import React, { Component } from 'react';
import Search from './Search';
import Sort from './Sort';
import * as courseAction from '../State/Action';
import { connect } from 'react-redux';
import Service from '../Service/service'
import LoadingBar from 'react-top-loading-bar';
import { withRouter } from "react-router-dom";
import { compose } from 'redux';
import { Modal } from 'reactstrap';
import { FaEdit, FaTrash, FaForward, FaBackward } from 'react-icons/fa';
import Tooltip from '@material-ui/core/Tooltip';



class ListCourse extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: null,
            currentPage: 1,
            listPage: [1],
            totalPage: 0,
            loadingBarProgress: 0,
            openModalDelete: false,
            courseID: null
        }
    }

    componentDidMount() {
        const sortBy = this.props.sortBy ? this.props.sortBy : 'lastUpdated';
        const { searchPhase } = this.props;
        this.getCourse(1, 10, sortBy, searchPhase, '', '');
    }

    getCourse(page, limit, sortBy, search, filter, order) {
        this.loadingItem()
        Service.getAllCousse(page, limit, sortBy, search, filter, order).then(res => {
            this.props.onUpdateCourse(res.data);
            this.setState({ loadingBarProgress: 100 });
        });
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
        }, 5);
    }


    onDelete = () => {
        const { courseID } = this.state;
        const sortBy = this.props.sortBy ? this.props.sortBy : 'lastUpdated';
        const { searchPhase } = this.props;
        this.loadingItem()
        this.setState({
            currentPage: 1,
            loadingBarProgress: 0
        })
        Service.deleteCourse(courseID).then(res => {
            this.setState({ loadingBarProgress: 100 });
            this.getCourse(1, 10, sortBy, searchPhase, '', '');
            this.closeModalDelete()
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
        const sortBy = this.props.sortBy ? this.props.sortBy : 'lastUpdated';
        const { searchPhase } = this.props;
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
        const sortBy = this.props.sortBy ? this.props.sortBy : 'lastUpdated';
        const { searchPhase } = this.props;
        Service.getAllCousse(page, 10, sortBy, searchPhase, '', '').then(res => {
            this.props.onUpdateCourse(res.data);
            this.setState({ loadingBarProgress: 100 })
        });
    }

    closeModalDelete = () => {
        this.setState({
            openModalDelete: false
        })
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
        const sortBy = this.props.sortBy ? this.props.sortBy : 'lastUpdated';
        const { searchPhase } = this.props;
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
                    <div className={`${list.isLoadingItem ? 'opc0' : ''}`}>
                        <Tooltip title="Edit Group" placement="top">
                            <button className="btn btn-info" onClick={() => this.onEdit(list)}><FaEdit /></button>
                        </Tooltip>
                        <Tooltip title="Delete Group" placement="top">
                            <button className="btn btn-info" data-toggle="tooltip" data-placement="top" title="Tooltip on top" onClick={() => this.setState({
                                openModalDelete: true,
                                courseID: list.id,
                                courseName: list.courseName
                            })}><FaTrash /></button>
                        </Tooltip>
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
                        <Search></Search>
                    </div>
                    <div className="actions__sort">
                        <Sort></Sort>
                    </div>
                </div>
                <table className="table table-hover">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Group Name</th>
                            <th scope="col">No. Member</th>
                            <th scope="col">Last Updated</th>
                            <th scope="col">Description</th>
                            <th scope="col" style={{ width: "15%" }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {couserList}
                        <Modal isOpen={this.state.openModalDelete} toggle={this.closeModalDelete} >
                            <div className="modal-delete">
                                <div>
                                    Do You Want To Delete "{this.state.courseName}"?
                                </div>
                                <div>
                                    <button className="btn btn-success" onClick={() => this.onDelete()}>Confirm</button>
                                </div>
                            </div>
                        </Modal>
                    </tbody>
                </table>
                <div className="paging">
                    <ul>
                        <button className="btn btn-primary change-page" disabled={this.state.currentPage === 1} onClick={this.prevPage}> <FaBackward /> </button>
                        <div className="number-page">
                            {listPage}
                        </div>
                        <button className="btn btn-primary change-page" disabled={this.props.data.length < 10} onClick={this.nextList}> <FaForward /> </button>
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