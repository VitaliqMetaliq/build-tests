import * as React from 'react';
import PostsContainer from '../components/MainContainer/PostsContainer';
import { BrowserRouter, Route, withRouter, Redirect } from 'react-router-dom';
import PhotoViewerContainer from '../components/PhotoViewer/PhotoViewerContainer';
import AuthContainer from '../components/authContainer/authContainer';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { setAuthThunk, initApp } from '../reducers/authReducer';

class App extends React.Component {

    componentDidMount() {
        this.props.initApp();
    }

    render() {
        return (
            <BrowserRouter>
                {this.props.isAuth ? <Redirect to='/main' /> : null}
                <div className={"app-wrapper-content"}>
                    <Route path='/main' render={() => {
                        return <PostsContainer />
                    }} />
                    <Route path='/view/:id?' render={() => {
                        return (<PhotoViewerContainer />)
                    }} />
                    <Route path='/auth' render={() => {
                        return (<AuthContainer />)
                    }} />
                </div>
            </BrowserRouter>
        );
    }
}

let mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        // redirForAuth: () => {
        //     dispatch(redirForAuth());
        // }, 
        setAuthThunk: (token) => {
            dispatch(setAuthThunk(token));
        }, 
        initApp: () => {
            dispatch(initApp());
        }
    }
}

export default compose (withRouter, connect(mapStateToProps, mapDispatchToProps))(App);