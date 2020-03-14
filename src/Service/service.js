import axios from "axios";

const Service = {

    getAllCousse(page, limit, sortBy, search, filter, order) {
        return axios({
            method: 'GET',
            url: `http://5e61c14e6f5c7900149bc641.mockapi.io/api/v1/courses?page=${page}&limit=${limit}&sortBy=${sortBy}&search=${search}&filter=${filter}&order=${order}`,
        });
    },

    getCourseById(id) {
        return axios({
            method: 'GET',
            url: `http://5e61c14e6f5c7900149bc641.mockapi.io/api/v1/courses/${id}`,
        });
    },

    updateCourse(id, param = {
        id: null,
        courseName: '',
        noMember: 0,
        time: '',
        desc: ''
    }) {
        return axios({
            method: 'PUT',
            url: `http://5e61c14e6f5c7900149bc641.mockapi.io/api/v1/courses/${id}`,
            data: param
        });
    },

    deleteCourse(id) {
        return axios({
            method: 'DELETE',
            url: `http://5e61c14e6f5c7900149bc641.mockapi.io/api/v1/courses/${id}`,
        });
    },

    addCourse(param = {
        id: null,
        courseName: '',
        noMember: 0,
        time: '',
        desc: ''
    }) {
        return axios({
            method: 'POST',
            url: `http://5e61c14e6f5c7900149bc641.mockapi.io/api/v1/courses`,
            data: param
        });
    },

    getAllMember(courseID, param = { page: 1, limit: 10, sortBy: "name", search: '' }) {
        return axios({
            method: 'GET',
            url: `http://5e61c14e6f5c7900149bc641.mockapi.io/api/v1/courses/${courseID}/member?page=${param.page}&limit=${param.limit}&sortBy=${param.sortBy}&search=${param.search}`,
        });
    }
    ,

    getMemberByID(courseID, memberID) {
        return axios({
            method: 'GET',
            url: `http://5e61c14e6f5c7900149bc641.mockapi.io/api/v1/courses/${courseID}/member/${memberID}`,
        });
    },

    updateMember(courseID, memberID,
        param = {
            memberName: '',
            age: null,
            address: '',
            avatar: '',
            gender: '',
            email: ''
        }) {
        return axios({
            method: 'PUT',
            url: `http://5e61c14e6f5c7900149bc641.mockapi.io/api/v1/courses/${courseID}/member/${memberID}`,
            data: param
        });
    },

    deleteMember(courseID, memberID) {
        return axios({
            method: 'DELETE',
            url: `http://5e61c14e6f5c7900149bc641.mockapi.io/api/v1/courses/${courseID}/member/${memberID}`,
        });
    },

    addMember(courseID, param = { id: null, memberName: '', age: null, address: '', avatar: '' }) {
        return axios({
            method: 'POST',
            url: `http://5e61c14e6f5c7900149bc641.mockapi.io/api/v1/courses/${courseID}/member`,
            data: param
        });
    },

    getAllImages(courseID, memberID, limit, page) {
        return axios({
            method: 'GET',
            url: `http://5e61c14e6f5c7900149bc641.mockapi.io/api/v1/courses/${courseID}/member/${memberID}/images?page=${page}&limit=${limit}`,
        });
    },

    getImageByID(courseID, memberID, imageID) {
        return axios({
            method: 'GET',
            url: `http://5e61c14e6f5c7900149bc641.mockapi.io/api/v1/courses/${courseID}/member/${memberID}/images/${imageID}`,
        });
    },

    deleteImageByID(courseID, memberID, imageID) {
        return axios({
            method: 'DELETE',
            url: `http://5e61c14e6f5c7900149bc641.mockapi.io/api/v1/courses/${courseID}/member/${memberID}/images/${imageID}`,
        });
    },

    addImage(courseID, memberID, param = { name: '', url: '' }) {
        return axios({
            method: 'POST',
            url: `http://5e61c14e6f5c7900149bc641.mockapi.io/api/v1/courses/${courseID}/member/${memberID}/images`,
            data: param
        });
    }

    ,

    updateImage(courseID, memberID, imageID, param) {
        return axios({
            method: 'PUT',
            url: `http://5e61c14e6f5c7900149bc641.mockapi.io/api/v1/courses/${courseID}/member/${memberID}/images/${imageID}`,
            data: param
        });
    }

}

export default Service;