import * as demnoActions from '../State/Action'

let sampleData = [];
for (let i = 0; i < 10; i++) {
    sampleData.push({ isLoadingItem: true })
}
let initState = {
    data: sampleData,
    memberList: sampleData,
    getCourseToEdit: null,
    searchPhase: '',
    sortBy: '',
    showLoader: false,
    courseID: null,
    memberID: null,
    memberDetail: {
        memberName: '',
        age: 0,
        address: '',
        avatar: '',
        gender: '',
        eamil: ''
    },
    listImage: []
}

const reducer = (state = initState, action) => {

    switch (action.type) {
        case demnoActions.EditCourse:
            return {
                ...state,
                getCourseToEdit: action.payload.data,
                isShowForm: action.payload.isShowForm
            }
        case demnoActions.AddCourse:
            return {
                ...state,
                getCourseToEdit: action.payload.data
            }
        case demnoActions.UpdateCourse:
            return {
                ...state,
                data: action.payload.course,
                getCourseToEdit: null,
                showLoader: false,
                memberList: sampleData,
                memberDetail: {
                    memberName: '',
                    age: 0,
                    address: '',
                    avatar: '',
                    gender: '',
                    eamil: ''
                }
            }
        case demnoActions.DeleteCourse:
            return {
                ...state,
                data: action.payload.course
            }
        case demnoActions.SearchCourse:
            return {
                ...state,
                searchPhase: action.payload.searchPhase
            }
        case demnoActions.SortCourse:
            return {
                ...state,
                sortBy: action.payload.sortBy
            }
        case demnoActions.ResetEdit:
            return {
                ...state,
                getCourseToEdit: null
            }
        case demnoActions.LoadingItem:
            return {
                ...state,
                data: sampleData,
                showLoader: true
            }
        case demnoActions.SaveCourseID:
            return {
                ...state,
                courseID: action.payload
            }
        case demnoActions.GetAllMember:
            return {
                ...state,
                memberList: action.payload.memberList,
                memberDetail: {
                    memberName: '',
                    age: 0,
                    address: '',
                    avatar: '',
                    gender: '',
                    eamil: ''
                }
            }
        case demnoActions.SaveMemberID:
            return {
                ...state,
                memberID: action.payload
            }
        case demnoActions.SaveMember:
            return {
                ...state,
                memberDetail: action.payload
            }
        case demnoActions.SaveListImage:
            return {
                ...state,
                listImage: action.payload
            }
        case demnoActions.ResetPhotoList:
            return {
                ...state,
                listImage: []
            }
        default:
            break;
    }
    return state;
}

export default reducer;