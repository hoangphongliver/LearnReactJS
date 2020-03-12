export const EditCourse = '[Course] Edit Course';
export const AddCourse = '[Course] Add Course';
export const SearchCourse = '[Course] Search Course';
export const SortCourse = '[Course] Sort Course';
export const UpdateCourse = '[Course] Update Course Table';
export const DeleteCourse = '[Course] Delete Course';
export const ResetEdit = '[Course] Reset Edit';
export const LoadingItem = '[Course] Loading Item';
export const SaveCourseID = '[Course] Save Course ID';
export const GetAllMember = '[Course] Get All Member';
export const SaveMemberID = '[Course] Save Member ID';
export const SaveMember = '[Course] Save Member';
export const SaveListImage = '[Course] Save List Image';

export const editCourse = (payload) => {
    return {
        type: EditCourse,
        payload: payload
    }
}

export const addCourse = (payload) => {
    return {
        type: AddCourse,
        payload: payload
    }
}

export const searchCourse = (payload) => {
    return {
        type: SearchCourse,
        payload: payload
    }
}

export const sortCourse = (payload) => {
    return {
        type: SortCourse,
        payload: payload
    }
}

export const updateCourse = (payload) => {
    return {
        type: UpdateCourse,
        payload: payload
    }
}

export const deleteCourse = (payload) => {
    return {
        type: DeleteCourse,
        payload: payload
    }
}

export const resetEdit = () => {
    return {
        type: ResetEdit,
    }
}

export const loadingItem = () => {
    return {
        type: LoadingItem,
    }
}

export const saveCourseID = (payload) => {
    return {
        type: SaveCourseID,
        payload
    }
}

export const getAllMember = (payload) => {
    return {
        type: GetAllMember,
        payload
    }
}

export const saveMemberID = (payload) => {
    return {
        type: SaveMemberID,
        payload
    }
}

export const saveMember = (payload) => {
    return {
        type: SaveMember,
        payload
    }
}

export const saveListImage = (payload) => {
    return {
        type: SaveListImage,
        payload
    }
}