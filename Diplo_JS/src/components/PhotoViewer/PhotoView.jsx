import React from 'react';
import { NavLink } from 'react-router-dom';
import likeImg from './../../assets/img/heart.png';

const PhotoView = (props) => {
    return(
        <div className={"photoViewer"}>
            
            <NavLink to='/main'>
                <div className={"backBtn"}>
                    Back
                </div>
            </NavLink>

            <div className={"photoViewer__container"}>
                <div className={"photoViewer__info"}>
                    <a href={props.profile} target="_blank" className={"photoViewer__info_user"}>
                        <img className={"post__user"} src={props.user_photo} alt={props.name} /> 
                        <span className={"post__img_name"}>{props.name}</span>
                    </a>
                    <div className={"photoViewer__info_likes"}>
                        <span>{props.likes}</span>
                        {
                            // props.liked_by_user 
                            // ? <button onClick={() => {
                            //     props.unlikePhoto(props.id)
                            // }}>Unlike</button>
                            // : <button onClick={() => {
                            //     props.likePhoto(props.id)
                            // }}>Like</button>
                            // props.liked_by_user
                            // ? <button className={"likeBtn"} onClick={() => {
                            //     props.unlikePhoto(props.id)
                            // }}><img src={likeImg} alt="unlike image" /> </button>
                            // : <button className={"likeBtn"} onClick={() => {
                            //     props.likePhoto(props.id)
                            // }}><img src={likeImg} alt="like image" /></button>
                            props.liked_by_user 
                            ? <img className={"unlikeImg"} src={likeImg} alt="unlike image" onClick={() => {
                                if(!props.isFetching) {
                                    props.unlikePhoto(props.id);
                                }
                            }} />
                            : <img className={"likeImg"} src={likeImg} alt="like image" onClick={() => {
                                if(!props.isFetching) {
                                    props.likePhoto(props.id)
                                }
                            }} />
                        }
                    </div>
                </div>
                <img className={"photoViewer__img"} src={props.photo} alt={"some"} />
            </div>
            
           
        </div>
    );
}

export default PhotoView;