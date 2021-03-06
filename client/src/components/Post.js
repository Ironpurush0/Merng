import React, { useContext } from "react";
import moment from "moment";
import { Item, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth";
import LikeButton from "./LikeButton";
import DeleteButton from "./DeleteButton";
// import { FETCH_USERS } from "../utils/graphql";

import "./Post.css";

const Post = ({
  post: { body, createdAt, id, username, likesCount, commentCount, likes },
}) => {
  const { user } = useContext(AuthContext);

  return (
    <div className="ui container">
      <Item.Group relaxed>
        <Item>
          <Item.Image
            as={Link}
            to={`/posts/${id}`}
            src="https://react.semantic-ui.com/images/avatar/large/steve.jpg"
            avatar
            size="tiny"
          />

          <Item.Content>
            <Item.Header as={Link} to={`/users`}>
              {username}
            </Item.Header>

            <Item.Meta>
              <span style={{ marginBottom: 10 }}>
                {moment(createdAt).fromNow()}
              </span>
            </Item.Meta>
            <Item.Description>{body}</Item.Description>
            <Item.Extra>
              <div>
                <LikeButton user={user} post={{ id, likes, likesCount }} />
                <Button
                  size="tiny"
                  color="blue"
                  content="Comments"
                  icon="comment"
                  label={{
                    basic: true,
                    color: "blue",
                    pointing: "left",
                    content: commentCount,
                  }}
                />
                {user && user.username === username && (
                  <DeleteButton postId={id} />
                )}
              </div>
            </Item.Extra>
          </Item.Content>
        </Item>
      </Item.Group>
    </div>
    // <div className="post">
    //   <div className="post__avatar">
    //     <Avatar
    //       src="https://react.semantic-ui.com/images/avatar/large/steve.jpg"
    //       alt={username}
    //     />
    //   </div>
    //   <div className="post__body">
    //     <div className="post__header">
    //       <div className="post__headerText">
    //         <h3>
    //           {/* {displayName}{" "} */}
    //           <span className="post__headerSpecial">{username}</span>

    //           {moment(createdAt).fromNow()}
    //         </h3>
    //       </div>
    //       <div className="post__headerDescription">
    //         <p>{body}</p>
    //       </div>
    //     </div>

    //     <div className="post__footer">
    //       <h1>Buttons will go here.</h1>
    //     </div>
    //   </div>
    // </div>
  );
};

export default Post;
