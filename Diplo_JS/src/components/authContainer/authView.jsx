import React from 'react';
import { NavLink } from 'react-router-dom';

// const AuthView = (props) => {

//     return (
        // <div>
        //     {props.isAuth
        //         ? <div>
        //             <NavLink to='/main'>Get Started</NavLink>
        //             <div className={"carousel"}>
        //                 <img src={'./../../assets/img/1.png'} alt="" />
        //                 <img src={'./../../assets/img/2.png'} alt="" />
        //                 <img src={'./../../assets/img/3.png'} alt="" />
        //                 <img src={'./../../assets/img/4.png'} alt="" />
        //             </div>
        //         </div>
        //         : <div>
        //             <button onClick={props.redirForAuth}>Authorize on Unsplash</button>
        //         </div>
        //     }
        // </div>
//     );
// }

class AuthView extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        $('.carousel').Carousel({
            width: 700, height: 500,
            radiusX: 500, radiusY: 70, //radiusX: 220, radiusY: 70 
            minScale: 0.6
        });
    }

    // componentDidUpdate() {
    //     $('.carousel').Carousel({
    //         width: 700, height: 500,
    //         radiusX: 500, radiusY: 70, //radiusX: 220, radiusY: 70 
    //         minScale: 0.6
    //     });
    // }

    render() {
        return(
            <div>
                {this.props.isAuth
                    ?   <div>
                            <h1 className={"title"}>Welcome !</h1>
                            <NavLink to='/main'>
                                <div className={"authBtn"}>Get Started</div>
                            </NavLink>
                        </div>
                    : <div>
                        <h1 className={"title"}>First, You need to authorize on Unsplash.com</h1>
                        <button className={"authBtn"} onClick={this.props.redirForAuth}>
                            Authorize
                        </button>
                    </div>
                }
                <div className={"carousel"}>
                    <img src={'./../../assets/img/1.png'} alt="" />
                    <img src={'./../../assets/img/2.png'} alt="" />
                    <img src={'./../../assets/img/3.png'} alt="" />
                    <img src={'./../../assets/img/4.png'} alt="" />
                    <img src={'./../../assets/img/5.png'} alt="" />
                    <img src={'./../../assets/img/6.png'} alt="" />
                </div>
            </div>
        );

        // return (
        //     <div>
        //         <NavLink to='/main'>
        //             <div className={"authBtn"}>Get Started</div>
        //         </NavLink>
        //         <div className={"carousel"}>
        //             <img src={'./../../assets/img/1.png'} alt="" />
        //             <img src={'./../../assets/img/2.png'} alt="" />
        //             <img src={'./../../assets/img/3.png'} alt="" />
        //             <img src={'./../../assets/img/4.png'} alt="" />
        //             <img src={'./../../assets/img/5.png'} alt="" />
        //             <img src={'./../../assets/img/6.png'} alt="" />
        //         </div>
        //         {/* <button onClick={check}>check</button> */}
        //     </div>
        // );
    }
}



// const AuthView = (props) => {
   
//     return (
//         <div>
//             <NavLink to='/main'>Get Started</NavLink>
//             <div className={"carousel"}>
//                 <img src={'./../../assets/img/1.png'} alt="" />
//                 <img src={'./../../assets/img/2.png'} alt="" />
//                 <img src={'./../../assets/img/3.png'} alt="" />
//                 <img src={'./../../assets/img/4.png'} alt="" />
//             </div>
//             <button onClick={check}>check</button>
//         </div>
//     );
// }

export default AuthView;