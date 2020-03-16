import React, { Component } from 'react';
import ListCourse from './ListCourse';
import Add from './Add';
import * as courseAction from '../State/Action';
import { connect } from 'react-redux';
import Service from '../Service/service'

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isShowForm: false
        }
    }

    showForm = () => {
        this.setState(state => {
            return {
                isShowForm: !state.isShowForm
            }
        });
        this.props.resetEdit();
    }

    componentWillReceiveProps(props) {
        if (props.getCourseToEdit) {
            this.setState({
                isShowForm: true
            })
        } else {
            this.setState({
                isShowForm: false
            })
        }
    }



    render() {
        return (
            <div className={`home ${this.state.isShowForm ? '' : 'set-width'}`}>
                <div className="left">
                    <div className="add-book">
                        {this.state.isShowForm ? <Add addItem={this.onAddItem}></Add> : ''}
                    </div>
                </div>
                <div className="right">
                    <button onClick={this.showForm} className="btn btn btn-info show-form">{this.state.isShowForm ? 'Hide' : 'Show'} Form Add Group</button>
                    <div className="list-book">
                        <ListCourse key="listCourse"></ListCourse>
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
      resetEdit: () => {
        dispatch(courseAction.resetEdit());
      }
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Home);
  