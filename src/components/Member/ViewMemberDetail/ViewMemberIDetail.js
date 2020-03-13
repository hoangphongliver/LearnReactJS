import React, { Component } from 'react';
import * as courseAction from '../../../State/Action';
import { connect } from 'react-redux';
import Service from '../../../Service/service'
import LoadingBar from 'react-top-loading-bar';
import './ViewMemberIDetail.scss';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Popup from "reactjs-popup";


class ViewMemberDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loadingBarProgress: 0,
            viewMember: null,
            open: false,
            url: '',
            name: '',
            openImage: false,
            photoList: [],
            src: '',
            currentImage: 1,
            openModalDelete: false,
            imageID: null,
            memberID: null
        }
    }

    componentDidMount() {
        const memberID = this.props.match.params.id;
        const { courseID } = this.props.match.params;
        this.setState({
            memberID
        });
        this.props.saveMemberID(Number(memberID));
        Service.getMemberByID(courseID, memberID).then(res => {
            const memberDetail = res.data;
            this.props.saveMember(memberDetail);
            this.setState({
                loadingBarProgress: 100,
            });
        });

        this.getAllPhoto(courseID, memberID, 12, 1);
    }


    getAllPhoto(courseID, memberID, limit, page) {
        Service.getAllImages(courseID, memberID, limit, page).then(res => {
            this.props.saveListImage(res.data)
            this.setState({
                loadingBarProgress: 100,
                photoList: res.data
            });
        })
    }

    closeModal = () => {
        this.setState({
            open: false
        })
    }

    openModal = () => {
        this.setState({ open: true });
    }

    deleteImage = () => {
        const memberID = this.props.memberID;
        const courseID = this.props.courseID;
        const imageID = this.state.imageID
        this.setState({
            loadingBarProgress: 0
        })
        Service.deleteImageByID(courseID, memberID, imageID).then(res => {
            this.getAllPhoto(courseID, memberID, 12, 1);
            this.closeModalDelete();
            this.setState({
                loadingBarProgress: 100
            })
        })
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmit = (e) => {
        e.preventDefault()
        const memberID = this.props.memberID;
        const courseID = this.props.courseID;
        const imageModel = {
            url: this.state.url,
            name: this.state.name
        }
        this.setState({
            loadingBarProgress: 0
        })
        Service.addImage(courseID, memberID, imageModel).then(res => {
            this.setState({
                loadingBarProgress: 100
            });
            this.getAllPhoto(courseID, memberID, 12, 1);
            this.closeModal();
            this.reserForm()
        })

    }

    closeModalPhoto = () => {
        this.setState({
            openImage: false
        });
    }

    openModalPhoto = () => {
        this.setState({
            openImage: true
        })
    }

    componentWillMount() {
        window.addEventListener('scroll', this.onScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.onScroll);
    }

    onScroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop === document.scrollingElement.scrollHeight) {
            const memberID = this.state.memberID;
            const courseID = this.props.courseID;
            this.setState({
                loadingBarProgress: 0
            })
            this.getAllPhoto(courseID, memberID, 24, 1);
        }
    }

    viewPhoto = (imageID) => {
        this.openModalPhoto();
        const { photoList } = this.state;
        this.setState({
            currentImage: imageID
        })
        photoList.forEach((photo, index) => {
            if (index === imageID) {
                this.setState({
                    src: photo.url,
                    // currentImage: index
                });
            }
        });
    }

    nextImage = () => {
        let next = this.state.currentImage;
        next++;
        if (next > this.state.photoList.length - 1) {
            next = this.state.photoList.length - 1
        }
        this.setState({
            currentImage: next
        });
        this.viewPhoto(next);
    }

    prevImage = () => {
        let prev = this.state.currentImage;
        prev--;
        if (prev < 0) {
            prev = 0
        }
        this.setState({
            currentImage: prev
        })
        this.viewPhoto(prev);
    }

    closeModalDelete = () => {
        this.setState({
            openModalDelete: false
        });
    }

    reserForm() {
        this.setState({
            url: '',
            name: ''
        })
    }


    render() {

        const { memberDetail } = this.props;
        const { listImage } = this.props;

        const list = listImage.map((image, index) => {
            return <div key={index} className="photo">
                <img src={image.url} alt="" onClick={() => this.viewPhoto(index)} />
                <div className="bgr" onClick={() => this.viewPhoto(index)}></div>
                <span className="btn btn-secondary" onClick={() => this.setState({ openModalDelete: true, imageID: image.id })}>x</span>
                <span className="title" onClick={() => this.viewPhoto(index)}>{image.name}</span>
            </div>
        });


        return (
            <div className="view-member-detail">
                <LoadingBar
                    progress={this.state.loadingBarProgress}
                    height={5}
                    color='#007bff'
                    onRef={ref => (this.LoadingBar = ref)}
                />
                <div className="member-detail">
                    <div className="member-detail__avatar">
                        <div className="avatar">
                            <img src={memberDetail.avatar} alt="123" />
                        </div>
                        <div className="name">{memberDetail.memberName}</div>
                    </div>
                    <div className="member-detail__info">
                        <div className="detail">
                            <div className="label">Age:</div>
                            <div className="name">{memberDetail.age}</div>
                        </div>
                        <div className="detail">
                            <div className="label">Address:</div>
                            <div className="name">{memberDetail.address}</div>
                        </div>
                        <div className="detail">
                            <div className="label">Gender:</div>
                            <div className="name">{memberDetail.gender}</div>
                        </div>
                        <div className="detail">
                            <div className="label">Email:</div>
                            <div className="name">{memberDetail.email}</div>
                        </div>
                        <div className="detail">
                            <div className="label">Phone Number:</div>
                            <div className="name">{memberDetail.phoneNumber}</div>
                        </div>
                        <div className="desc">
                            "URL parameters are parameters whose values are set dynamically in a page’s URL. This allows a route to render the same component while passing that component the dynamic portion of the URL so it can change based off of it."
                        </div>
                    </div>
                </div>
                <div className="add-image">
                    <button className="btn btn-success" onClick={this.openModal}>Add Photo</button>
                    <Modal isOpen={this.state.open} toggle={this.closeModal}>
                        <ModalHeader>Add Photo Form
                        <div className="btn btn-primary" onClick={() => this.setState({ open: false })}>x</div>
                        </ModalHeader>
                        <div className="form-add">
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <label>Image Name</label>
                                    <input type="text" name="name" className="form-control" value={this.state.name} onChange={(e) => this.handleChange(e)} placeholder="Enter Image Name" />
                                </div>
                                <div className="form-group">
                                    <label>Image Url</label>
                                    <input type="text" name="url" className="form-control" value={this.state.url} onChange={(e) => this.handleChange(e)} placeholder="Enter Image Url" />
                                </div>
                                <div className="btn">
                                    <button type="submit" className="btn btn-primary">Add Photo</button>
                                </div>
                            </form>
                        </div>
                    </Modal>
                </div>
                <div className="list-photo">
                    {list}
                    <Modal isOpen={this.state.openModalDelete} toggle={this.closeModalDelete} >
                        <div className="modal-delete">
                            <div>
                                Do You Want To Delete This Photo?
                        </div>
                            <div>
                                <button className="btn btn-success" onClick={() => this.deleteImage()}>Confirm</button>
                            </div>
                        </div>
                    </Modal>
                    <Modal isOpen={this.state.openImage} toggle={this.closeModalPhoto}>
                        <div className="view-img-detail">
                            <img src={this.state.src} alt="" />
                            <button className="next btn btn btn-info" disabled={this.state.currentImage === 0} onClick={this.prevImage}> Prev </button>
                            <button className="prev btn btn btn-info" disabled={this.state.currentImage === this.state.photoList.length - 1} onClick={this.nextImage}>Next</button>
                        </div>
                    </Modal>
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
        saveMember: (member) => {
            dispatch(courseAction.saveMember(member));
        },
        saveListImage: (listImage) => {
            dispatch(courseAction.saveListImage(listImage));
        },
        saveMemberID: (id) => {
            dispatch(courseAction.saveMemberID(id));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewMemberDetail);
