import React, { Component } from 'react';
import AddBook from './AddBook';

class TodoItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            bookList: [
                { id: 1, name: 'English', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuEU6cR9EmbJMco1Xm11r8nPsNfrlYyVB_3kSlz950hB2x5ZUFYQ&s', price: 120000, des: 'English for Kid' },
                { id: 2, name: 'Đắc Nhân Tâm', image: 'https://bvhttdl.mediacdn.vn/documents/491984/1032128/sach.jpg', price: 100000, des: 'Đắc Nhân Tâm' },
                { id: 3, name: 'Combo Ma Đạo Tổ Sư (Tập 3 + 4)', image: 'https://thietkekhainguyen.com/wp-content/uploads/2018/10/sach-anh-dep-7.jpg', price: 150000, des: 'Combo Ma Đạo Tổ Sư' },
                { id: 4, name: 'Làm Bạn Với Bầu Trời', image: 'https://thietkekhainguyen.com/wp-content/uploads/2018/10/sach-anh-du-lich6.jpg', price: 120000, des: 'Làm Bạn Với Bầu Trời' },
            ],
            book: {
                id: null,
                bookname: '',
                bookprice: '',
                bookdescription: '',
                bookimage: '',
            },
            showAddForm: true
        }
    }

    handleChange = (e) => {
        const target = e.target;
        let name = target.name;
        let value = target.value;
        this.setState({
            [name]: value
        })
    }

    getBookToEditBook = (item) => {
        this.setState({
            book: {
                id: item.id,
                bookname: item.name,
                bookprice: item.price,
                bookdescription: item.des,
                bookimage: item.image
            }
        });
    }

    editBook = (e) => {
        e.preventDefault();
        this.setState(state => {
            const List = state.bookList.map(x => {
                if (x.id === this.state.book.id) {
                    x.name = state.book.bookname;
                    x.price = state.book.bookprice;
                    x.image = state.book.bookimage;
                    x.des = state.book.bookdescription
                };
                return x;
            });
            return {
                bookList: List
            }
        })
    }

    showAddForm = () => {
        this.setState({
            showAddForm: !this.state.showAddForm
        })
    }

    deleteBook = (book) => {
        this.setState(state => {
            const List = state.bookList.filter(item => {
                return item.id !== book.id
            });
            return {
                bookList: List
            };
        });
    }
    onAddItem = (formValue) => {
        console.log(formValue);
        
        this.setState(state => {
            let List = [];
            if (formValue.id) {
                List = state.bookList.map(item => {
                    if (item.id === formValue.id) {
                        item.name = formValue.bookname;
                        item.price = formValue.bookprice;
                        item.image = formValue.bookimage;
                        item.des = formValue.bookdescription
                    };
                    return item;
                });
            } else {
                List = state.bookList.push({
                    id: state.bookList.length + 1,
                    name: formValue.bookname,
                    price: formValue.bookprice,
                    image: formValue.bookimage,
                    des: formValue.bookdescription
                })
            }
            return {
                List
            }
        })
    }
    render() {

        let element = this.state.bookList.map((item, index) => {
            return <div className="book-list" key={index}>
                <div className="card">
                    <img className="card-img-top" src={item.image} alt="" />
                    <div className="card-body">
                        <h5 className="card-title">{item.name}</h5>
                        <p className="card-text">{item.des}</p>
                        <p className="card-text success">Price : {item.price}</p>
                    </div>
                    <div className="card-body">
                        <button onClick={() => this.getBookToEditBook(item)} className="btn btn-info">Edit Book</button>
                        <button onClick={() => this.deleteBook(item)} className="btn btn-info">Delele Book</button>
                    </div>
                </div>
            </div>
        });

        return (
            <div className="book">
                <div className="new-book">
                    <button onClick={this.showAddForm} className="btn btn-info">Creat Book</button>
                </div>


                <AddBook addItem={this.onAddItem} listNameFormParent={this.state.book} />


                <div className="book__content">
                    {element}
                </div>
            </div>
        )
    }
}


export default TodoItem;