import React, { Component } from 'react';

class AddBook extends Component {

    constructor(props) {
        super(props);
        this.state = {
            book: {
                id: null,
                bookname: '',
                bookprice: '',
                bookdescription: '',
                bookimage: '',
            },
            showAddForm: false
        }
    }

    componentWillReceiveProps(props) {
        this.setState({
            book: {
                id: props.listNameFormParent.id,
                bookname: props.listNameFormParent.bookname,
                bookprice: props.listNameFormParent.bookprice,
                bookdescription: props.listNameFormParent.bookdescription,
                bookimage: props.listNameFormParent.bookimage,
            },
            showAddForm: false
        })
    }
    handleChange = (e) => {
        const target = e.target;
        let name = target.name;
        let value = target.value;
        console.log(value);

        this.setState({
            book: {
                [name]: value
            }
        });
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.props.addItem(this.state.book);
    }

    render() {
        return (
            <form className="book__add" onSubmit={this.onSubmit}>
                <div className="form-group">
                    <input type="text" name="bookname" value={this.state.book.bookname} onChange={this.handleChange} className="form-control" id="exampleInputEmail1" placeholder="Enter Book Name" />
                </div>
                <div className="form-group">
                    <input type="text" name="bookprice" value={this.state.book.bookprice} onChange={this.handleChange} className="form-control" id="exampleInputPassword1" placeholder="Enter Book Price" />
                </div>
                <div className="form-group">
                    <input type="text" name="bookdescription" value={this.state.book.bookdescription} onChange={this.handleChange} className="form-control" id="exampleInputPassword11" placeholder="Enter Book Description" />
                </div>
                <div className="form-group">
                    <input type="text" name="bookimage" value={this.state.book.bookimage} onChange={this.handleChange} className="form-control" id="exampleInputPassword111" placeholder="Enter Book Image" />
                </div>
                <div className="submit">
                    <button type="submit" className="btn btn-primary">{this.state.book.id ? "Edit Book" : "Add Book"}</button>
                </div>
            </form>
        )
    }
}


export default AddBook;