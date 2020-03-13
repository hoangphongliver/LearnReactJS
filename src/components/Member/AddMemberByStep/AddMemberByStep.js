import './AddMemberByStep.scss';
import React, { Component } from 'react';
import * as courseAction from '../../../State/Action';
import { connect } from 'react-redux';
import Service from '../../../Service/service';
import { compose } from 'redux';
import { withRouter } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';


class AddMemberByStep extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentStep: 1,
            step: {
                step1: { active: true, valid: false, invalid: false },
                step2: { active: false, valid: false, invalid: false },
                step3: { active: false, valid: false, invalid: false },
                step4: { active: false, valid: false, invalid: false }
            },
            fullName: '',
            age: '',
            address: '',
            phoneNumber: '',
            email: '',
            avatar: '',
            gender: 'Male',
            validateStep3: false,
            loadingBarProgress: 0
        }
    }

    componentDidMount() {
        const { memberID } = this.props.match.params;
        const { courseID } = this.props.match.params;
        if (Number(memberID)) {
            Service.getMemberByID(courseID, memberID).then(res => {
                this.setState({
                    fullName: res.data.memberName,
                    age: res.data.age,
                    address: res.data.address,
                    avatar: res.data.avatar,
                    phoneNumber: res.data.phoneNumber,
                    email: res.data.email,
                    gender: res.data.gender,
                    loadingBarProgress: 100
                })
            })
        }
    }

    validateStep1 = (step) => {
        if (this.state.fullName === '' || this.state.age === '') {
            step.step1.invalid = true;
            step.step1.valid = false
        } else {
            step.step1.invalid = false;
            step.step1.valid = true
        }
    }

    validateStep2 = (step) => {
        if (this.state.address === '' || this.state.phoneNumber === '') {
            step.step2.invalid = true;
            step.step2.valid = false
        } else {
            step.step2.invalid = false;
            step.step2.valid = true
        }
    }

    validateStep3 = (step) => {
        if (this.state.email === '' || this.state.avatar === '') {
            step.step3.invalid = true;
            step.step3.valid = false
        } else {
            step.step3.invalid = false;
            step.step3.valid = true
        }
    }

    validateStep4 = () => {

    }

    validateAllStep = () => {
        let isValid = false;
        if (this.state.fullName !== '' && this.state.age !== '' && this.state.address !== '' && this.state.phoneNumber !== ''
            && this.state.email !== '' && this.state.avatar !== '') {
            isValid = true
        } else {
            isValid = false
        }
        return isValid;
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    goToStep = (step) => {
        this.setState({
            currentStep: step
        });
        let newState = JSON.parse(JSON.stringify(this.state.step));
        switch (step) {
            case 1:
                newState.step1.active = true;
                newState.step2.active = false;
                newState.step3.active = false;
                newState.step4.active = false;
                newState.step1.invalid = false;
                newState.step1.valid = false;
                this.validateStep2(newState);
                if (this.state.validateStep3) {
                    this.validateStep3(newState);
                }
                this.setState({
                    step: newState
                })
                break;
            case 2:
                newState.step1.active = false;
                newState.step2.active = true;
                newState.step3.active = false;
                newState.step4.active = false;
                newState.step2.invalid = false;
                newState.step2.valid = false;
                this.validateStep1(newState);
                if (this.state.validateStep3) {
                    this.validateStep3(newState);
                }
                this.setState({
                    step: newState
                })
                break;
            case 3:

                newState.step1.active = false;
                newState.step2.active = false;
                newState.step3.active = true;
                newState.step4.active = false;
                newState.step3.invalid = false;
                newState.step3.valid = false;
                this.validateStep1(newState);
                this.validateStep2(newState);
                this.setState({
                    step: newState,
                    validateStep3: true
                })
                break;
            case 4:
                newState.step1.active = false;
                newState.step2.active = false;
                newState.step3.active = false;
                newState.step4.active = true;
                newState.step4.invalid = false;
                newState.step4.valid = false;
                this.validateStep3(newState);
                this.validateStep1(newState);
                this.validateStep2(newState);
                this.setState({
                    step: newState
                });
                break;
            default:
                break;
        }
    }

    omAddMember = () => {
        const memberModel = {
            memberName: this.state.fullName,
            age: this.state.age,
            address: this.state.address,
            avatar: this.state.avatar,
            phoneNumber: this.state.phoneNumber,
            email: this.state.email,
            gender: this.state.gender
        }
        const { memberID } = this.props.match.params;
        const { courseID } = this.props.match.params;
        console.log(memberID);

        this.setState({
            loadingBarProgress: 0
        });
        if (Number(memberID)) {
            Service.updateMember(courseID, memberID, memberModel).then(res => {
                this.setState({
                    loadingBarProgress: 100
                });
                this.props.history.push(`/viewmember/${courseID}`)
            })
        } else {
            Service.addMember(courseID, memberModel).then(res => {
                this.setState({
                    loadingBarProgress: 100
                });
                this.props.history.push(`/viewmember/${courseID}`)
            })
        }
    }



    render() {

        const step = this.state.step;

        return (
            <div className="add-by-step">
                <LoadingBar
                    progress={this.state.loadingBarProgress}
                    height={5}
                    color='#007bff'
                    onRef={ref => (this.LoadingBar = ref)}
                />
                <div className="add-by-step__step-menu">
                    <div className="add-by-step__step-menu__step1 add-by-step__step-menu--step" onClick={() => this.goToStep(1)}>
                        <div className={`status status-step1 ${step.step1.active ? 'active' : ''} ${step.step1.valid ? 'valid' : ''}${step.step1.invalid ? 'invalid' : ''}`}></div>
                        <div className="step-name">STEP 1</div>
                    </div>
                    <div className="add-by-step__step-menu__step2 add-by-step__step-menu--step" onClick={() => this.goToStep(2)}>
                        <div className={`status status-step2 ${step.step2.active ? 'active' : ''} ${step.step2.valid ? 'valid' : ''}${step.step2.invalid ? 'invalid' : ''}`}></div>
                        <div className="step-name">STEP 2</div>
                    </div>
                    <div className="add-by-step__step-menu__step3 add-by-step__step-menu--step" onClick={() => this.goToStep(3)}>
                        <div className={`status status-step3 ${step.step3.active ? 'active' : ''} ${step.step3.valid ? 'valid' : ''}${step.step3.invalid ? 'invalid' : ''}`}></div>
                        <div className="step-name">STEP 3</div>
                    </div>
                    <div className="add-by-step__step-menu__step4 add-by-step__step-menu--step" onClick={() => this.goToStep(4)}>
                        <div className={`status status-step4 ${step.step4.active ? 'active' : ''} ${step.step4.valid ? 'valid' : ''}${step.step4.invalid ? 'invalid' : ''}`}></div>
                        <div className="step-name">STEP 4</div>
                    </div>
                </div>
                <div className="add-by-step__step-content">
                    {this.state.currentStep === 1 ?
                        <div className="add-by-step__step-content__step1">
                            <form>
                                <div className="form-group">
                                    <label>Full Name</label>
                                    <input type="text" name="fullName" className="form-control" value={this.state.fullName} onChange={(e) => this.handleChange(e)} placeholder="Enter Full Name" />
                                </div>
                                <div className="form-group">
                                    <label>Age</label>
                                    <input type="text" name="age" className="form-control" value={this.state.age} onChange={(e) => this.handleChange(e)} placeholder="Enter Age" />
                                </div>
                            </form>
                        </div> : ''
                    }
                    {this.state.currentStep === 2 ?
                        <div className="add-by-step__step-content__step2">
                            <form>
                                <div className="form-group">
                                    <label>Address</label>
                                    <input type="text" name="address" className="form-control" value={this.state.address} onChange={(e) => this.handleChange(e)} placeholder="Enter Address" />
                                </div>
                                <div className="form-group">
                                    <label>Phone Number</label>
                                    <input type="text" name="phoneNumber" className="form-control" value={this.state.phoneNumber} onChange={(e) => this.handleChange(e)} placeholder="Enter Phone Number" />
                                </div>
                            </form>
                        </div> : ''
                    }
                    {this.state.currentStep === 3 ?
                        <div className="add-by-step__step-content__step3">
                            <form>
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
                            </form>
                        </div> : ''
                    }
                    {this.state.currentStep === 4 ?
                        <div className="add-by-step__step-content__step4">
                            <div className="overview">
                                <div className="overview__detail">
                                    <div className="overview__detail__info">Fullname: </div>
                                    <div className="overview__detail__view">{this.state.fullName}</div>
                                </div>
                                <div className="overview__detail">
                                    <div className="overview__detail__info">Age: </div>
                                    <div className="overview__detail__view">{this.state.age}</div>
                                </div>
                                <div className="overview__detail">
                                    <div className="overview__detail__info">Address: </div>
                                    <div className="overview__detail__view">{this.state.address}</div>
                                </div>
                                <div className="overview__detail">
                                    <div className="overview__detail__info">Phone Number: </div>
                                    <div className="overview__detail__view">{this.state.phoneNumber}</div>
                                </div>
                                <div className="overview__detail">
                                    <div className="overview__detail__info">Email: </div>
                                    <div className="overview__detail__view">{this.state.email}</div>
                                </div>
                                <div className="overview__detail">
                                    <div className="overview__detail__info">Avatar: </div>
                                    <div className="overview__detail__view">{this.state.avatar}</div>
                                </div>
                                <div className="overview__detail">
                                    <div className="overview__detail__info">Gender: </div>
                                    <div>{this.state.gender}</div>
                                </div>
                            </div>
                        </div> : ''
                    }

                </div>
                <div className="add-by-step__actions">
                    <div className="actions">
                        <button className="btn btn-success" disabled={this.state.currentStep === 1}>Prev Step</button>
                        <button className="btn btn-success" disabled={this.state.currentStep === 4}> Next Step</button>
                    </div>
                    <div className="add">
                        {this.state.currentStep === 4 ? <button className="btn btn-success" disabled={!this.validateAllStep()} onClick={this.omAddMember}>{this.props.memberID ? 'Update Member' : 'Add Member'}</button> : ''}
                    </div>
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


export default compose(withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(AddMemberByStep)
