import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import * as courseAction from '../State/Action';
import Service from '../Service/service'
import LoadingBar from 'react-top-loading-bar';
import { FaSearch } from 'react-icons/fa';


class Search extends Component {

    constructor(props) {
        super(props);
        this.state = {
            searchPhase: "",
            loadingBarProgress: 0
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
        this.setState({
            loadingBarProgress: 0
        });
        const searchPhase = this.state.searchPhase;
        const sortBy = 'lastUpdated';
        if (searchPhase !== '') {
            this.loadingItem();
            this.props.onSearchCourse(searchPhase);
            Service.getAllCousse(1, 10, sortBy, searchPhase, '', '').then(res => {
                this.props.onUpdateCourse(res.data);
                this.setState({
                    loadingBarProgress: 100
                })
            });
        }
    }

    loadingItem() {
        this.props.loadingItem();
    }


    render() {
        return (
            <div className="search">
                <LoadingBar
                    progress={this.state.loadingBarProgress}
                    height={5}
                    color='#007bff'
                    onRef={ref => (this.LoadingBar = ref)}
                />
                <form className="book__add" onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <input type="text" value={this.state.searchPhase} name="searchPhase" onChange={this.handleChange} className="form-control" id="123" placeholder="Search Course" />
                    </div>
                    <Button type="submit"><FaSearch /></Button>
                </form>
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
        onSearchCourse: (searchPhase) => {
            dispatch(courseAction.searchCourse({
                searchPhase
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

export default connect(mapStateToProps, mapDispatchToProps)(Search);