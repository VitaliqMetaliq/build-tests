import React from 'react';
import { NavLink } from 'react-router-dom';

//Задать стили для единичного поста
const Post = (props) => {
    return(
        <div className={"post"}>
            <div className={"post__img"}>
                <NavLink to={`/view/${props.id}`}>  
                    <img  src={props.preview} alt={props.description}/>
                </NavLink>
                <div className={"post__img_info"}>
                    <div className={"post__img_user"}>
                        <a className={"post__img_link"} href={props.profile} target="_blank">
                            <img src={props.user_photo} alt={props.name}/>
                            <span className={"post__img_name"}>{props.name}</span>
                        </a>
                    </div>
                    <span className={"post__img_date"}>Created {props.date}</span>
                </div>    
            </div>
           
            {/* <div className={"post__info"}>
                <div className={"post__user"}>
                    <img src={props.user_photo} alt={props.name}/>
                </div>
                <span>{props.name}</span>
                <a href={props.profile} target="_blank">Profile Link</a>
                <span>{props.date}</span>
            </div> */}
            {/* <button onClick={() => props.likePost(props.id)}>Like</button> */}
        </div>
    );
}

export default Post;