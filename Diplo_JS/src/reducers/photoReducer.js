import { PhotoAPI } from "../api/unsplashAPI";

let initialState = {
    currentPage: 1, 
    currentList: [],
    viewPhoto: {},
    isFetching: false
}

const photoReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'SET_PHOTOS_LIST': 
            return {
                ...state, 
                currentList: [...state.currentList, ...action.photosList]
            }
        case 'SET_PAGE': 
            return {
                ...state, 
                currentPage: action.page
            }
        case 'TOGGLE_IS_FETCHING': 
            return {
                ...state, 
                isFetching: action.isFetching
            }
        case 'LIKE_ACTION': 
            return {
                ...state, 
                viewPhoto: {...state.viewPhoto, likes: action.likeCount, liked_by_user: action.isLiked}
            }
        case 'SET_VIEW_PHOTO': 
            let photoForView = state.currentList.filter(obj => obj.id == action.id)[0];
            return {
                ...state, 
                viewPhoto: photoForView
            }
        case 'UNLIKE_ACTION': 
            let currentLikes = state.viewPhoto.likes;
            return { 
                ...state, 
                viewPhoto: {...state.viewPhoto, likes: --currentLikes, liked_by_user: action.isLiked}
            }
        default: 
            return state;
    }
}

export const toggleIsFetching = (isFetching) => {
    return {
        type: 'TOGGLE_IS_FETCHING', 
        isFetching
    }
}

const setPageAC = (page) => {
    return {
        type: 'SET_PAGE', 
        page
    }
}

const setPhotosListAC = (photosList) => {
    return {
        type: 'SET_PHOTOS_LIST', 
        photosList
    }
}

const likeAction = (likeCount, isLiked) => {
    return {
        type: 'LIKE_ACTION', 
        likeCount: likeCount, 
        isLiked
    }
}

const unlikeAction = (isLiked) => {
    return {
        type: 'UNLIKE_ACTION', 
        isLiked
    }
}

export const setViewPhoto = (id) => {
    return {
        type: 'SET_VIEW_PHOTO', 
        id
    }
}

// const setViewAC = (id) => {
//     return {
//         type: 'SET_VIEW_PHOTO', 
//         id
//     }
// }

// export const setViewPhoto = (id) => (dispatch) => {
//     dispatch(toggleIsFetching(true));
//     dispatch(setViewAC(id));
//     dispatch(toggleIsFetching(false));
// }


export const unlikePostThunk = (id) => (dispatch) => {
    dispatch(toggleIsFetching(true));
    PhotoAPI.unlikePost(id).then((json) => {
        if(json.errors) {
            AuthAPI.redirForAuth();
        }
        dispatch(toggleIsFetching(false));
        dispatch(unlikeAction(false));
    })
}

export const likePostThunk = (id) => (dispatch) => {
    dispatch(toggleIsFetching(true));
    PhotoAPI.likePost(id).then((json) => {
        if(json.errors) {
            AuthAPI.redirForAuth();
        }
        dispatch(toggleIsFetching(false));
        dispatch(likeAction(json.photo.likes, true));
    })
}

export const getLatestPhotosList = (page) => (dispatch) => {
    dispatch(toggleIsFetching(true));
    PhotoAPI.getPhotosList(page).then(photosList => {
        if(photosList.errors) {
            AuthAPI.redirForAuth();
        }
        let postArr = photosList.map(post => {
            return {
                id: post.id,
                preview: post.urls.small,
                regular: post.urls.regular,
                name: post.user.name, 
                profile: post.links.html, 
                user_photo: post.user.profile_image.small,
                date: post.created_at.split('T')[0], 
                likes: post.likes,
                liked_by_user: post.liked_by_user,
                description: post.description
            }
        });
        dispatch(toggleIsFetching(false));
        dispatch(setPhotosListAC(postArr));
        dispatch(setPageAC(++page));
    })
}

export default photoReducer;