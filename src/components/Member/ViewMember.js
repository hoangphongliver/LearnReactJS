import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as courseAction from '../../State/Action';
import Service from '../../Service/service'
import LoadingBar from 'react-top-loading-bar';
import './ViewMember.scss';
import { compose } from 'redux';
import { withRouter } from "react-router-dom";
import { Modal, ModalHeader } from 'reactstrap';
import { FaEdit, FaArrowLeft, FaTrash, FaPlus } from 'react-icons/fa';
import Tooltip from '@material-ui/core/Tooltip';



class ViewMember extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loadingBarProgress: 0,
            memberName: '',
            age: '',
            gender: 'Male',
            address: '',
            email: '',
            avatar: '',
            phoneNumber: '',
            open: false,
            memberID: null,
            getMemberToEdit: null,
            openModalDelete: false
        }
    }

    componentDidMount() {
        const { courseID } = this.props.match.params;
        this.setState({
            courseID
        });
        this.props.saveMember(null, Number(courseID));
        this.getAllMember(courseID);
    }


    getAllMember = (courseID) => {
        const memberModel = {
            page: 1,
            limit: 10,
            sortBy: 'memberName',
            search: ''
        }
        this.setState({
            loadingBarProgress: 0
        })
        Service.getAllMember(courseID, memberModel).then(res => {
            this.setState({
                loadingBarProgress: 100
            })
            this.props.onGetAllMember(res.data);
        })
    }


    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })

    }

    onEdit = (member) => {
        this.setState({
            memberName: member.memberName,
            age: member.age,
            gender: member.gender,
            address: member.address,
            getMemberToEdit: member,
            avatar: member.avatar,
            email: member.email ? member.email : '',
            phoneNumber: member.phoneNumber ? member.phoneNumber : ''
        });
        this.openModel();
    }

    onDelete = () => {
        const { memberID } = this.state;
        this.setState({
            loadingBarProgress: 0
        })
        const { courseID } = this.props.match.params;
        Service.deleteMember(courseID, memberID).then(res => {
            this.getAllMember(courseID);
            this.closeModalDelete();
            this.setState({
                loadingBarProgress: 100
            })
        })
    }

    openModel = () => {
        this.setState({
            open: true
        });
    }

    resetForm() {
        this.setState({
            memberName: '',
            age: '',
            gender: 'Male',
            address: '',
            avatar: '',
            email: '',
            phoneNumber: ''
        })
    }

    onSubmit = (e) => {
        this.setState({
            loadingBarProgress: 0
        })
        e.preventDefault();
        const { courseID } = this.state;
        const member = {
            memberName: this.state.memberName,
            age: this.state.age,
            gender: this.state.gender,
            address: this.state.address,
            avatar: this.state.avatar,
            email: this.state.email,
            phoneNumber: this.state.phoneNumber
        }
        if (!this.state.getMemberToEdit) {
            Service.addMember(courseID, member).then(res => {
                this.closeModal();
                this.resetForm();
                this.getAllMember(courseID);
            });
        } else {
            const memberID = this.state.getMemberToEdit.id;
            Service.updateMember(courseID, memberID, member).then(res => {
                this.closeModal();
                this.resetForm();
                this.getAllMember(courseID);
            });
        }
    }

    openModal = () => {
        this.setState({ open: true });
    }

    closeModal = () => {
        this.setState({
            open: false,
            getMemberToEdit: null
        });
        this.resetForm();
    }

    backToHome = () => {
        this.props.history.push('/');
    }

    viewMemberInfo = (memberID) => {
        this.props.history.push(`/viewmember/${this.props.courseID}/detail/${memberID}`);
        this.props.saveMemberID(Number(memberID));
    }

    addMemberBysStep = () => {
        this.props.history.push(`/viewmember/${this.props.courseID}/addmember/0`);
        this.props.saveMemberID(null);
    }

    onEditByStep = (member) => {
        this.props.history.push(`/viewmember/${this.props.courseID}/addmember/${member.id}`);
        this.props.saveMemberID(Number(member.id));
        this.props.saveMember(member, Number(this.props.courseID));
    }

    closeModalDelete = () => {
        this.setState({
            openModalDelete: false
        })
    }


    render() {

        let memberList = this.props.memberList.map((member, index) => {
            return <tr key={index}>
                <td style={{ width: "5%" }} onClick={() => this.viewMemberInfo(member.id)}>
                    <div className="show-loading-bar">
                        {member.isLoadingItem ? (
                            <div className="loading-bar"></div>
                        )
                            : (
                                <div>{index + 1}</div>
                            )
                        }
                    </div>
                </td>

                <td style={{ width: "14%" }} onClick={() => this.viewMemberInfo(member.id)}>
                    <div className="show-loading-bar">
                        {member.isLoadingItem ? (
                            <div className="loading-bar"></div>
                        )
                            : (
                                <div>{member.memberName}</div>
                            )
                        }
                    </div>
                </td>
                <td style={{ width: "3%" }} onClick={() => this.viewMemberInfo(member.id)}>
                    <div className="show-loading-bar">
                        {member.isLoadingItem ? (
                            <div className="loading-bar"></div>
                        )
                            : (
                                <div>{member.age}</div>
                            )
                        }
                    </div>
                </td>

                <td style={{ width: "10%" }} onClick={() => this.viewMemberInfo(member.id)}>
                    <div className="show-loading-bar">
                        {member.isLoadingItem ? (
                            <div className="loading-bar"></div>
                        )
                            : (
                                <div>{member.gender}</div>
                            )
                        }
                    </div>
                </td>

                <td style={{ width: "8%" }} onClick={() => this.viewMemberInfo(member.id)}>
                    <div className="show-loading-bar">
                        {member.isLoadingItem ? (
                            <div className="loading-bar"></div>
                        )
                            : (
                                <div>{member.phoneNumber}</div>
                            )
                        }
                    </div>
                </td>

                <td style={{ width: "15%" }} onClick={() => this.viewMemberInfo(member.id)}>
                    <div className="show-loading-bar">
                        {member.isLoadingItem ? (
                            <div className="loading-bar"></div>
                        )
                            : (
                                <div>{member.address}</div>
                            )
                        }
                    </div>
                </td>

                <td style={{ width: "10%" }} onClick={() => this.viewMemberInfo(member.id)}>
                    <div className="show-loading-bar">
                        {member.isLoadingItem ? (
                            <div className="loading-bar"></div>
                        )
                            : (
                                <div>{member.email}</div>
                            )
                        }
                    </div>
                </td>

                <td style={{ width: "10%" }}>
                    <div className={member.isLoadingItem ? 'opc0' : ''}>
                        <Tooltip title="Edit Member" placement="top">
                            <button className="btn btn-info" onClick={() => this.onEdit(member)}><FaEdit /></button>
                        </Tooltip>
                        <Tooltip title="Edit Member By Step" placement="top">
                            <button className="btn btn-info" onClick={() => this.onEditByStep(member)}><FaEdit /></button>
                        </Tooltip>
                        <Tooltip title="Delete Member" placement="top">
                            <button className="btn btn-info" onClick={() => this.setState({
                                openModalDelete: true,
                                memberID: member.id,
                                memberName: member.memberName
                            })}><FaTrash />
                            </button>
                        </Tooltip>



                    </div>
                </td>
            </tr>
        });
        return (
            <div className="member-list">
                <LoadingBar
                    progress={this.state.loadingBarProgress}
                    height={5}
                    color='#007bff'
                    onRef={ref => (this.LoadingBar = ref)}
                />
                <div className="add-member">
                    <Tooltip title="Add Member" placement="top">
                    <button onClick={this.openModal} className="btn btn-success"><FaPlus /></button>
                    </Tooltip>
                    <Tooltip title="Add Member By Step" placement="top">
                    <button onClick={this.addMemberBysStep} className="btn btn-success"><FaPlus /></button>
                    </Tooltip>
                    <Modal isOpen={this.state.open} toggle={this.closeModal}>
                        <ModalHeader>Add Member Form
                        <div className="btn btn-primary" onClick={() => this.setState({ open: false })}>x</div>
                        </ModalHeader>
                        <div className="form-add">
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <label>Full Name</label>
                                    <input type="text" name="memberName" className="form-control" value={this.state.memberName} onChange={(e) => this.handleChange(e)} placeholder="Enter Full Name" />
                                </div>
                                <div className="form-group">
                                    <label>Age</label>
                                    <input type="text" name="age" className="form-control" value={this.state.age} onChange={(e) => this.handleChange(e)} placeholder="Enter Age" />
                                </div>
                                <div className="form-group">
                                    <label>Address</label>
                                    <input type="text" name="address" className="form-control" value={this.state.address} onChange={(e) => this.handleChange(e)} placeholder="Enter Address" />
                                </div>
                                <div className="form-group">
                                    <label>Phone Number</label>
                                    <input type="text" name="phoneNumber" className="form-control" value={this.state.phoneNumber} onChange={(e) => this.handleChange(e)} placeholder="Enter Phone Number" />
                                </div>
                                <div className="form-group">
                                    <label>Email</label>
                                    <input type="text" name="email" className="form-control" value={this.state.email} onChange={(e) => this.handleChange(e)} placeholder="Enter Email Adderss" />
                                </div>
                                <div className="form-group">
                                    <label>Avatar</label>
                                    <input type="text" name="avatar" className="form-control" value={this.state.avatar} onChange={(e) => this.handleChange(e)} placeholder="Enter Avatar" />
                                </div>
                                <div className="form-group">
                                    <label>Gender</label>
                                    <select className="form-control" name="gender" onChange={(e) => this.handleChange(e)} value={this.state.gender}>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                    </select>
                                </div>
                                <div className="btn">
                                    <button type="submit" className="btn btn-primary">{this.state.getMemberToEdit ? 'Edit Member' : 'Add Member'}</button>
                                </div>
                            </form>
                        </div>
                    </Modal>
                </div>
                <div className="add-member fl">
                    <Tooltip title="Edit Member" placement="top">
                        <button onClick={this.backToHome} className="btn btn-info"><FaArrowLeft /></button>
                    </Tooltip>
                </div>
                <table className="table table-hover">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Full Name</th>
                            <th scope="col">Age</th>
                            <th scope="col">Gender</th>
                            <th scope="col">Phone Number</th>
                            <th scope="col">Address</th>
                            <th scope="col">Email</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {memberList}
                        <Modal isOpen={this.state.openModalDelete} toggle={this.closeModalDelete} >
                            <div className="modal-delete">
                                <div>
                                    Do You Want To Delete "{this.state.memberName}" ?
                                </div>
                                <div>
                                    <button className="btn btn-success" onClick={() => this.onDelete()}>Confirm</button>
                                </div>
                            </div>
                        </Modal>
                    </tbody>
                </table>
                {/* <div className="paging">
                    <ul>
                        <button className="btn btn-primary change-page" disabled={this.state.currentPage === 1} onClick={this.prevPage}> Prev </button>
                        <div className="number-page">

                        </div>
                        <button className="btn btn-primary change-page" disabled={this.props.data.length < 10} onClick={this.nextList}> Next </button>
                    </ul>
                </div> */}
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
        onGetAllMember: (memberList) => {
            dispatch(courseAction.getAllMember({
                memberList
            }))
        },
        saveMemberID: (memberID) => {
            dispatch(courseAction.saveMemberID(memberID));
        },
        saveMember: (memberID, courseID) => {
            dispatch(courseAction.saveMember(memberID));
            dispatch(courseAction.saveCourseID(courseID))
        },

    }
}

export default compose(withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(ViewMember)
