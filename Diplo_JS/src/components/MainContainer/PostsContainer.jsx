import React from 'react';
import Post from './Post';
import { getLatestPhotosList } from '../../reducers/photoReducer';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withAuthRedirect } from '../../hoc/WithAuthRedirect';
import Preloader from '../Preloader/Preloader';
//import Preloader from '../Preloader/Preloader';

class PostsContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        if(this.props.list.length == 0) {
            this.props.getPhotosList(this.props.page);
        }
    }

    // componentDidUpdate() {

    // }

    render() {
        return(
            <div>
                <div className={"postsContainer"}>
                    {this.props.isFetching ? <Preloader /> : null}
                    {
                        this.props.list.map(post => {
                            return(
                                <Post preview={post.preview} name={post.name} 
                                    profile={post.profile} date={post.date} 
                                    id={post.id} description={post.description}
                                    user_photo={post.user_photo}/>
                            );
                        })
                    }
                </div>
                <button className={this.props.list.length == 0 ? "hidden" : "postsContainer__btn"} disabled={this.props.isFetching} onClick={() => {
                        this.props.getPhotosList(this.props.page)
                    }}>Load more</button>
            </div>
        );
    }
}

let mapStateToProps = (state) => {
    return {
        list: state.photos.currentList,
        page: state.photos.currentPage,
        isFetching: state.photos.isFetching
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        getPhotosList: (page) => {
            dispatch(getLatestPhotosList(page));
        },
        // getInitList: (page) => {

        // }
        // likePost: (id) => {
        //     dispatch(likePostThunk(id));
        // }
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect
    )(PostsContainer);