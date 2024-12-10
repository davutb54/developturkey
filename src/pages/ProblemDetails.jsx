import React, { useEffect, useState, useContext } from "react";
import { useParams, useLocation } from "react-router"; // useLocation eklendi
import { useNavigate } from "react-router-dom"; // useNavigate import edildi
import SolutionService from "../services/SolutionService";
import ProblemService from "../services/ProblemService";
import CommentService from "../services/CommentService";
import {
  Button,
  Card,
  Container,
  Dimmer,
  Form,
  Header,
  Icon,
  Input,
  Loader,
  TextArea,
  Comment,
  Modal,
  Message, // Message import edildi
  Confirm, // Confirm import edildi
} from "semantic-ui-react";
import { GlobalContext } from "../context/GlobalState";

export default function ProblemDetails() {
  const { problemId } = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const highlight = queryParams.get("highlight");
  const [solutions, setSolutions] = useState([]);
  const [problem, setProblem] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [newSolution, setNewSolution] = useState({
    title: "",
    description: "",
  });
  const { authenticatedUser } = useContext(GlobalContext);
  const [comments, setComments] = useState({});
  const [replyTo, setReplyTo] = useState(null);
  const [newComment, setNewComment] = useState("");
  const [showAllComments, setShowAllComments] = useState({});
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showReplies, setShowReplies] = useState({}); // Yeni state eklendi
  const [showLoginMessage, setShowLoginMessage] = useState(false); // Yeni state eklendi
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false); // Yeni state eklendi
  const [deleteTarget, setDeleteTarget] = useState(null); // Yeni state eklendi
  const [problemDeleteConfirmOpen, setProblemDeleteConfirmOpen] =
    useState(false); // Yeni state eklendi
  const [editComment, setEditComment] = useState("");
  const [editSolution, setEditSolution] = useState({
    title: "",
    description: "",
  });
  const [isEditingComment, setIsEditingComment] = useState(null);
  const [isEditingSolution, setIsEditingSolution] = useState(null);
  const [editingSolutionId, setEditingSolutionId] = useState(null);
  const [editProblem, setEditProblem] = useState({
    title: "",
    description: "",
  });
  const [isEditingProblem, setIsEditingProblem] = useState(false);

  const navigate = useNavigate(); // useNavigate hook'u kullanıldı

  useEffect(() => {
    let solutionService = new SolutionService();
    setLoading(true);
    solutionService
      .getByProblem(problemId)
      .then((result) => {
        setSolutions(result.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [problemId, refresh]);

  useEffect(() => {
    let problemService = new ProblemService();
    setLoading(true);
    problemService
      .getById(problemId)
      .then((result) => {
        setProblem(result.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [problemId,refresh]);

  useEffect(() => {
    let commentService = new CommentService();
    solutions.forEach((solution) => {
      commentService
        .getBySolution(solution.id)
        .then((result) => {
          setComments((prevComments) => ({
            ...prevComments,
            [solution.id]: result.data.data,
          }));
        })
        .catch((error) => console.error(error));
    });
  }, [solutions]);

  useEffect(() => {
    if (highlight && solutions.length > 0) {
      setTimeout(() => {
        const element = document.getElementById(`solution-${highlight}`);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }
      }, 100); // 100ms gecikme
    }
  }, [highlight, solutions]);

  const handleReplyClick = (parentId, solutionId) => {
    if (authenticatedUser) {
      setReplyTo({ commentId: parentId, solutionId: solutionId });
      setOpen(true);
    } else {
      setShowLoginMessage(true);
      setTimeout(() => setShowLoginMessage(false), 3000); // 3 saniye sonra mesajı gizle
    }
  };

  const handleLoginRedirect = () => {
    navigate("/sign-in"); // Giriş yapma ekranına yönlendir
  };

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleCommentSubmit = () => {
    if (authenticatedUser && newComment.trim() !== "") {
      let commentService = new CommentService();
      const commentToAdd = {
        text: newComment,
        senderId: authenticatedUser.id,
        solutionId: replyTo.solutionId,
        parentCommentId: replyTo.commentId,
      };
      commentService
        .addComment(commentToAdd)
        .then((result) => {
          setRefresh(!refresh);
          setNewComment("");
          setReplyTo(null);
          setOpen(false);
        })
        .catch((error) => console.error(error));
    }
  };

  const toggleReplies = (commentId) => {
    setShowReplies((prevShowReplies) => ({
      ...prevShowReplies,
      [commentId]: !prevShowReplies[commentId],
    }));
  };

  const handleDeleteClick = (type, id) => {
    setDeleteTarget({ type, id });
    setDeleteConfirmOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (deleteTarget) {
      const { type, id } = deleteTarget;
      if (type === "solution") {
        let solutionService = new SolutionService();
        solutionService
          .deleteSolution(id)
          .then(() => {
            setRefresh(!refresh);
            setDeleteConfirmOpen(false);
            setDeleteTarget(null);
          })
          .catch((error) => console.error(error));
      } else if (type === "comment") {
        let commentService = new CommentService();
        commentService
          .deleteComment(id)
          .then(() => {
            setRefresh(!refresh);
            setDeleteConfirmOpen(false);
            setDeleteTarget(null);
          })
          .catch((error) => console.error(error));
      }
    }
  };

  const getDeleteMessage = () => {
    if (deleteTarget) {
      return deleteTarget.type === "solution"
        ? "Bu çözümü silmek istediğinizden emin misiniz?"
        : "Bu yorumu silmek istediğinizden emin misiniz?";
    }
    return "";
  };

  const handleProblemDeleteClick = () => {
    setProblemDeleteConfirmOpen(true);
  };

  const handleProblemDeleteConfirm = () => {
    let problemService = new ProblemService();
    problemService
      .deleteProblem(problemId)
      .then(() => {
        navigate("/categories"); // Problemler sayfasına yönlendir
      })
      .catch((error) => console.error(error));
    setProblemDeleteConfirmOpen(false);
  };

  const renderComments = (comments, parentId = null, solutionId) => {
    const filteredComments = comments.filter(
      (comment) => comment.parentCommentId === parentId
    );
    const commentsToShow = showAllComments[parentId]
      ? filteredComments
      : filteredComments.slice(0, 3);

    return (
      <div>
        <Comment.Group style={{ width: "100%" }}>
          {commentsToShow.map((comment) => (
            <Comment
              key={comment.id}
              style={{ marginLeft: parentId ? "2vw" : "0px", width: "100%" }} // width: "100%" eklendi
            >
              <Comment.Content>
                <Comment.Author as="a">{comment.senderUsername}</Comment.Author>
                <Comment.Metadata>
                  <div>{new Date(comment.createdAt).toLocaleString()}</div>
                </Comment.Metadata>
                <Comment.Text
                  style={{ minWidth: "300px", paddingRight: "20px" }}
                >
                  {comment.text}
                </Comment.Text>
                <Comment.Actions>
                  <Comment.Action
                    onClick={() => handleReplyClick(comment.id, solutionId)}
                  >
                    Yanıtla
                  </Comment.Action>
                  {authenticatedUser &&
                    authenticatedUser.id === comment.senderId && (
                      <>
                        <Comment.Action
                          onClick={() => handleEditCommentClick(comment)}
                        >
                          Düzenle
                        </Comment.Action>
                        <Comment.Action
                          onClick={() =>
                            handleDeleteClick("comment", comment.id)
                          }
                        >
                          Sil
                        </Comment.Action>
                      </>
                    )}
                  {comments.some((c) => c.parentCommentId === comment.id) && (
                    <Comment.Action onClick={() => toggleReplies(comment.id)}>
                      {showReplies[comment.id]
                        ? "Yanıtları Gizle"
                        : "Yanıtları Göster"}
                    </Comment.Action>
                  )}
                </Comment.Actions>
              </Comment.Content>
              {showReplies[comment.id] &&
                renderComments(comments, comment.id, solutionId)}
            </Comment>
          ))}
          {filteredComments.length > 3 && !showAllComments[parentId] && (
            <Button
              onClick={() =>
                setShowAllComments({ ...showAllComments, [parentId]: true })
              }
            >
              Daha fazla yorum göster
            </Button>
          )}
        </Comment.Group>
      </div>
    );
  };

  const handleInputChange = (e, { name, value }) => {
    setNewSolution({ ...newSolution, [name]: value });
  };

  const handleSubmit = () => {
    if (
      newSolution.title.trim() !== "" &&
      newSolution.description.trim() !== ""
    ) {
      let solutionService = new SolutionService();
      const solutionToAdd = {
        ...newSolution,
        senderId: authenticatedUser.id,
        problemId: problemId,
      };
      solutionService
        .addSolution(solutionToAdd)
        .then((result) => {
          setRefresh(!refresh);
          setNewSolution({ title: "", description: "" });
        })
        .catch((error) => console.error(error));
    }
  };

  const handleEditCommentClick = (comment) => {
    setEditComment(comment.text);
    setIsEditingComment(comment);
  };

  const handleEditCommentSubmit = () => {
    if (authenticatedUser && editComment.trim() !== "") {
      let commentService = new CommentService();
      commentService
        .updateComment({
          id: isEditingComment.id,
          text: editComment,
          senderId: authenticatedUser.id,
          solutionId: isEditingComment.solutionId,
          parentCommentId: isEditingComment.parentCommentId,
        })
        .then(() => {
          setRefresh(!refresh);
          setEditComment("");
          setIsEditingComment(null);
        })
        .catch((error) => console.error(error));
    }
  };

  const handleEditSolutionClick = (solution) => {
    setEditSolution({
      title: solution.title,
      description: solution.description,
    });
    setIsEditingSolution(solution);
    setEditingSolutionId(solution.id);
  };

  const handleEditSolutionSubmit = () => {
    if (
      editSolution.title.trim() !== "" &&
      editSolution.description.trim() !== ""
    ) {
      let solutionService = new SolutionService();
      solutionService
        .updateSolution({
          id: isEditingSolution.id,
          title: editSolution.title,
          description: editSolution.description,
          senderId: authenticatedUser.id,
          problemId: problemId,
          isHighlighted: isEditingSolution.isHighlighted,
          isReported: isEditingSolution.isReported,
          isDeleted: isEditingSolution.isDeleted,
        })
        .then(() => {
          setRefresh(!refresh);
          setEditSolution({ title: "", description: "" });
          setIsEditingSolution(null);
          setEditingSolutionId(null);
        })
        .catch((error) => console.error(error));
    }
  };

  const handleEditProblemClick = () => {
    setEditProblem({
      title: problem.title,
      description: problem.description,
    });
    setIsEditingProblem(true);
  };

  const handleEditProblemSubmit = () => {
    if (editProblem.title.trim() !== "" && editProblem.description.trim() !== "") {
      let problemService = new ProblemService();
      problemService
        .updateProblem({
          id: problemId,
          title: editProblem.title,
          description: editProblem.description,
          senderId: authenticatedUser.id,
          cityCode: problem.cityCode,
          isHighlighted: problem.isHighlighted,
          isReported: problem.isReported,
          isDeleted: problem.isDeleted,
          topicId: problem.topicId,
        })
        .then(() => {
          setRefresh(!refresh);
          setEditProblem({ title: "", description: "" });
          setIsEditingProblem(false);
        })
        .catch((error) => console.error(error));
    }
  };

  if (loading) {
    return (
      <Dimmer active>
        <Loader />
      </Dimmer>
    );
  }

  return (
    <div>
      {showLoginMessage && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 1000,
          }}
        >
          <Message
            warning
            style={{
              textAlign: "center",
              padding: "20px",
              borderRadius: "10px",
            }}
          >
            <Message.Header style={{ fontSize: "1.5em", marginBottom: "10px" }}>
              Lütfen giriş yapınız
            </Message.Header>
            <p style={{ fontSize: "1.2em", marginBottom: "20px" }}>
              Yorum yapabilmek için giriş yapmanız gerekmektedir.
            </p>
            <Button
              onClick={handleLoginRedirect}
              primary
              style={{ fontSize: "1.2em", marginRight: "10px" }}
            >
              Giriş Yap
            </Button>
            <Button
              onClick={() => setShowLoginMessage(false)}
              secondary
              style={{ fontSize: "1.2em" }}
            >
              İptal
            </Button>
          </Message>
        </div>
      )}
      <Container style={{ marginTop: "20px" }}>
        <Card
          fluid
          style={{
            backgroundColor: "rgba(164, 200, 166, 0.6)",
            borderRadius: 15,
            boxShadow: "none",
          }}
        >
          <Card.Content>
            {problem && (
              <>
                {isEditingProblem ? (
                  <Form onSubmit={handleEditProblemSubmit}>
                    <Form.Field
                      control={Input}
                      label="Başlık"
                      name="title"
                      value={editProblem.title}
                      onChange={(e, { name, value }) =>
                        setEditProblem({ ...editProblem, [name]: value })
                      }
                    />
                    <Form.Field
                      control={TextArea}
                      label="Açıklama"
                      name="description"
                      value={editProblem.description}
                      onChange={(e, { name, value }) =>
                        setEditProblem({ ...editProblem, [name]: value })
                      }
                    />
                    <Button type="submit" primary>
                      Güncelle
                    </Button>
                    <Button
                      onClick={() => setIsEditingProblem(false)}
                      secondary
                    >
                      İptal
                    </Button>
                  </Form>
                ) : (
                  <>
                    <Header as="h2">
                      <Icon name="user" />
                      <Header.Content>{problem.senderUsername}</Header.Content>
                    </Header>
                    <Card.Header style={{ marginTop: "10px" }}>
                      {problem.title}
                    </Card.Header>
                    <Card.Meta>
                      <span className="date">{problem.cityName}</span>
                    </Card.Meta>
                    <Card.Description style={{ marginTop: "10px" }}>
                      {problem.description}
                    </Card.Description>
                    {authenticatedUser != null &&
                      authenticatedUser.id === problem?.senderId && (
                        <>
                          <Button
                            onClick={handleEditProblemClick}
                            style={{ marginTop: "10px" }}
                          >
                            Düzenle
                          </Button>
                          <Button
                            onClick={handleProblemDeleteClick}
                            style={{ marginTop: "10px" }}
                          >
                            Problemi Sil
                          </Button>
                        </>
                      )}
                    <Confirm
                      open={problemDeleteConfirmOpen}
                      onCancel={() => setProblemDeleteConfirmOpen(false)}
                      onConfirm={handleProblemDeleteConfirm}
                      content="Bu problemi silmek istediğinizden emin misiniz?"
                      cancelButton="İptal"
                      confirmButton="Evet"
                    />
                  </>
                )}
              </>
            )}
          </Card.Content>
        </Card>
      </Container>

      <Container style={{ marginTop: "20px" }}>
        <Header as="h3">Çözümler</Header>
        {solutions.length === 0 ? (
          <p>Çözüm bulunamadı.</p>
        ) : (
          solutions.map((solution) => (
            <Card
              key={solution.id}
              id={`solution-${solution.id}`}
              fluid
              style={{
                backgroundColor:
                  solution.id === Number(highlight)
                    ? "rgba(255, 255, 0, 0.6)" // Vurgulanan çözüm için arka plan rengi
                    : "rgba(164, 200, 166, 0.8)",
                borderRadius: 15,
                boxShadow: "none",
                marginTop: "10px",
                overflowX: "auto",
              }}
            >
              <Card.Content>
                {editingSolutionId === solution.id ? (
                  <Form onSubmit={handleEditSolutionSubmit}>
                    <Form.Field
                      control={Input}
                      label="Başlık"
                      name="title"
                      value={editSolution.title}
                      onChange={(e, { name, value }) =>
                        setEditSolution({ ...editSolution, [name]: value })
                      }
                    />
                    <Form.Field
                      control={TextArea}
                      label="Açıklama"
                      name="description"
                      value={editSolution.description}
                      onChange={(e, { name, value }) =>
                        setEditSolution({ ...editSolution, [name]: value })
                      }
                    />
                    <Button type="submit" primary>
                      Güncelle
                    </Button>
                    <Button
                      onClick={() => {
                        setIsEditingSolution(null);
                        setEditingSolutionId(null);
                      }}
                      secondary
                    >
                      İptal
                    </Button>
                  </Form>
                ) : (
                  <>
                    <Header as="h4">{solution.title}</Header>
                    <Card.Meta>
                      <span className="date">{solution.senderUsername}</span>
                    </Card.Meta>
                    <Card.Description
                      style={{
                        marginTop: "10px",
                        whiteSpace: "pre-wrap",
                        wordBreak: "break-word",
                      }}
                    >
                      {solution.description}
                    </Card.Description>
                    <div
                      style={{
                        marginTop: "20px",
                      }}
                    >
                      {comments[solution.id] && (
                        <Comment.Group>
                          {renderComments(
                            comments[solution.id],
                            null,
                            solution.id
                          )}
                        </Comment.Group>
                      )}
                    </div>
                    {authenticatedUser != null && (
                      <Button
                        onClick={() => handleReplyClick(null, solution.id)}
                        style={{ marginTop: "10px" }}
                      >
                        Yorum Yap
                      </Button>
                    )}
                    {authenticatedUser != null &&
                      authenticatedUser.id === solution.senderId && (
                        <>
                          <Button
                            onClick={() => handleEditSolutionClick(solution)}
                            style={{ marginTop: "10px" }}
                          >
                            Düzenle
                          </Button>
                          <Button
                            onClick={() =>
                              handleDeleteClick("solution", solution.id)
                            }
                            style={{ marginTop: "10px" }}
                          >
                            Sil
                          </Button>
                        </>
                      )}
                  </>
                )}
              </Card.Content>
            </Card>
          ))
        )}
      </Container>

      <Modal open={open} onClose={() => setOpen(false)}>
        <Modal.Header>Yorum Yap</Modal.Header>
        <Modal.Content>
          <Form onSubmit={handleCommentSubmit}>
            <Form.Field
              control={TextArea}
              label="Yorum"
              value={newComment}
              onChange={handleCommentChange}
            />
            <Button type="submit" primary>
              Gönder
            </Button>
            <Button onClick={() => setOpen(false)} secondary>
              İptal
            </Button>
          </Form>
        </Modal.Content>
      </Modal>

      <Modal
        open={isEditingComment !== null}
        onClose={() => setIsEditingComment(null)}
      >
        <Modal.Header>Yorumu Düzenle</Modal.Header>
        <Modal.Content>
          <Form onSubmit={handleEditCommentSubmit}>
            <Form.Field
              control={TextArea}
              label="Yorum"
              value={editComment}
              onChange={(e) => setEditComment(e.target.value)}
            />
            <Button type="submit" primary>
              Güncelle
            </Button>
            <Button onClick={() => setIsEditingComment(null)} secondary>
              İptal
            </Button>
          </Form>
        </Modal.Content>
      </Modal>

      <Confirm
        open={deleteConfirmOpen}
        onCancel={() => setDeleteConfirmOpen(false)}
        onConfirm={handleDeleteConfirm}
        content={getDeleteMessage()}
        cancelButton="İptal"
        confirmButton="Evet"
      />

      {authenticatedUser != null && (
        <Container style={{ marginTop: "20px" }}>
          <Header as="h3">Yeni Çözüm Ekle</Header>
          <Form onSubmit={handleSubmit}>
            <Form.Field
              control={Input}
              label="Başlık"
              name="title"
              value={newSolution.title}
              onChange={handleInputChange}
            />
            <Form.Field
              control={TextArea}
              label="Açıklama"
              name="description"
              value={newSolution.description}
              onChange={handleInputChange}
            />
            <Button type="submit" primary>
              Ekle
            </Button>
          </Form>
        </Container>
      )}
    </div>
  );
}
