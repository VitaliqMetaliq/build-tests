import React, { useEffect } from 'react';
import PhotoView from './PhotoView';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter, Redirect } from 'react-router-dom';
import { setViewPhoto, likePostThunk, unlikePostThunk } from '../../reducers/photoReducer';
import { withAuthRedirect } from '../../hoc/WithAuthRedirect';
// import { getViewInfo } from '../../reducers/viewerReducer';

const PhotoViewerContainer = (props) => {
    // let [id, setId] = useState(props.viewPhoto.id);
    let photoId = props.match.params.id;
    
    // if(photoId) {
    //     props.setViewPhoto(photoId);
    // }
    useEffect(() => {
        //let photoId = props.match.params.id; 
        if(photoId) {
            props.setViewPhoto(photoId);
        }
    }, [props.viewPhoto.id])
    return(
        <div>
            {props.viewPhoto ? 
            <PhotoView id={props.viewPhoto.id} photo={props.viewPhoto.regular}
                likes={props.viewPhoto.likes} likePhoto={props.likePhoto} 
                liked_by_user={props.viewPhoto.liked_by_user} unlikePhoto={props.unlikePhoto}
                isFetching={props.isFetching} user_photo={props.viewPhoto.user_photo}
                name={props.viewPhoto.name} profile={props.viewPhoto.profile}/>
            : <Redirect to='/main'/>}
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        viewPhoto: state.photos.viewPhoto,
        isFetching: state.photos.isFetching
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setViewPhoto: (id) => {
            dispatch(setViewPhoto(id))
        },
        likePhoto: (id) => {
            dispatch(likePostThunk(id))
        },
        unlikePhoto: (id) => {
            dispatch(unlikePostThunk(id))
        }
    }
}

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect
)(PhotoViewerContainer)