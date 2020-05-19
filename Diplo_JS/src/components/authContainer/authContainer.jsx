import React from 'react';
import AuthView from './authView';
import { getAuthThunk, redirForAuth } from '../../reducers/authReducer';
import { connect } from 'react-redux';
// import Preloader from '../Preloader/Preloader';

const AuthContainer = (props) => {
    let authCode = location.search.split('code=')[1];
    if(authCode) {
        props.setAuthCode(authCode);
    }
    return(
        // <> {props.isAuth ? null : <Preloader />}
        <AuthView isAuth={props.isAuth} redirForAuth={props.redirForAuth}/>
        //</>
    );
}

// class AuthContainer extends React.Component {

//     componentDidMount() {
//         if(!this.props.isAuth) {
//             let authCode = location.search.split('code=')[1];
//             if(authCode) {
//                 this.props.setAuthCode(authCode);
//             }
//         }
//     }

//     componentDidUpdate() {
        // $('.carousel').Carousel({
        //     width: 700, height: 500,
        //     radiusX: 400, radiusY: 70, //radiusX: 220, radiusY: 70 
        //     minScale: 0.6
        // });
//     }

//     render() {
//         return(
//             <AuthView isAuth={this.props.isAuth} redirForAuth={this.props.redirForAuth}/>
//         );
//     };
// }

const mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setAuthCode: (code) => {
            dispatch(getAuthThunk(code));
        }, 
        redirForAuth: () => {
            dispatch(redirForAuth());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthContainer);