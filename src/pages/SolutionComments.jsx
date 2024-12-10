import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CommentService from "../services/CommentService";
import { Comment, Container, Header } from "semantic-ui-react";

export default function SolutionComments() {
  const { solutionId } = useParams();
  const [comments, setComments] = useState([]);
  const [showReplies, setShowReplies] = useState({});

  useEffect(() => {
    let commentService = new CommentService();
    commentService
      .getBySolution(solutionId)
      .then((result) => {
        setComments(result.data.data);
      })
      .catch((error) => console.error(error));
  }, [solutionId]);

  const toggleReplies = (commentId) => {
    setShowReplies((prevShowReplies) => ({
      ...prevShowReplies,
      [commentId]: !prevShowReplies[commentId],
    }));
  };
 
  const renderComments = (comments, parentId = null) => {
    const filteredComments = comments.filter(
      (comment) => comment.parentCommentId === parentId
    );

    return (
      <div style={{ overflowX: "auto" }}> {/* Ekranın sağa kaydırılabilir olmasını sağlamak için */}
        <Comment.Group>
          {filteredComments.map((comment) => (
            <Comment
              key={comment.id}
              style={{
                marginLeft: parentId ? "2vw" : "0px", // Sol boşluk ekran boyutuna göre ayarlandı
                backgroundColor: "#A4DCA6", // Sabit yeşil arka plan rengi
                padding: "10px",
                borderRadius: "5px",
                marginBottom: "10px", // Yorumlar arasındaki mesafe
              }}
            >
              <Comment.Content>
                <Comment.Author as="a">{comment.senderUsername}</Comment.Author>
                <Comment.Metadata>
                  <div>{new Date(comment.createdAt).toLocaleString()}</div>
                </Comment.Metadata>
                <Comment.Text>{comment.text}</Comment.Text>
                {comments.some((c) => c.parentCommentId === comment.id) && (
                  <Comment.Actions>
                    <Comment.Action onClick={() => toggleReplies(comment.id)}>
                      {showReplies[comment.id] ? "Yanıtları Gizle" : "Yanıtları Göster"}
                    </Comment.Action>
                  </Comment.Actions>
                )}
              </Comment.Content>
              {showReplies[comment.id] && renderComments(comments, comment.id)}
            </Comment>
          ))}
        </Comment.Group>
      </div>
    );
  };

  return (
    <Container>
      <Header as="h3">Yorumlar</Header>
      {renderComments(comments)}
    </Container>
  );
}
