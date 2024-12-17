import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Icon } from "semantic-ui-react";
import UserService from "../services/UserService";
import ProblemService from "../services/ProblemService";
import SolutionService from "../services/SolutionService";
import "./Page.css";

export default function UserPage() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [problems, setProblems] = useState([]);
  const [solutions, setSolutions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    let userService = new UserService();
    userService
      .getById(userId)
      .then((response) => {
        setUser(response.data.data);
      })
      .catch((error) => {
        console.error("Kullanıcı getirilemedi:", error);
      });

    let problemService = new ProblemService();
    problemService
      .getBySender(userId)
      .then((response) => {
        setProblems(response.data.data);
      })
      .catch((error) => {
        console.error("Sorunlar getirilemedi:", error);
      });

    let solutionService = new SolutionService();
    solutionService
      .getBySender(userId)
      .then((response) => {
        setSolutions(response.data.data);
      })
      .catch((error) => {
        console.error("Çözümler getirilemedi:", error);
      });
  }, [userId]);

  const handleProblemClick = (problemId) => {
    navigate(`/problem/${problemId}`);
  };

  const handleSolutionClick = (problemId, solutionId) => {
    navigate(`/problem/${problemId}?highlight=${solutionId}`);
  };

  if (!user) {
    return <div>Kullanıcı bulunamadı</div>;
  }

  return (
    <div
      className="profile-container"
      style={{ height: "100vh", width: "100vw" }}
    >
      <Card
        style={{
          backgroundColor: "rgba(164, 200, 166, 0.8)",
          borderRadius: 15,
          boxShadow: "none",
          marginBottom: "20px",
        }}
      >
        <Card.Content>
          <Card.Header>{user.userName}</Card.Header>
          <Card.Meta>{user.isAdmin ? "Admin" : "Kullanıcı"}</Card.Meta>
          <Card.Description>
            <p>
              <Icon name="user" /> Ad: {user.name}
            </p>
            <p>
              <Icon name="user" /> Soyad: {user.surname}
            </p>
            <p>
              <Icon name="mail" /> Email: {user.email}
            </p>
            <p>
              <Icon name="map marker alternate" /> Şehir: {user.cityName}
            </p>
            <p>
              <Icon name="genderless" /> Cinsiyet: {user.gender}
            </p>
          </Card.Description>
        </Card.Content>
      </Card>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        <div style={{ flex: "1 1 100%" }}>
          <h3 style={{maxWidth:"100%"}}>Problemler</h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
            {problems.length > 0 ? (
              problems.map((problem) => (
                <Card
                  key={problem.id}
                  style={{
                    flex: "1 1 100%", // Değiştirildi
                    marginBottom: "20px",
                    cursor: "pointer",
                    backgroundColor: "rgba(255, 99, 71, 0.8)",
                    borderRadius: 15,
                    boxShadow: "none",
                    maxWidth: "300px", // Değiştirildi
                  }}
                  onClick={() => handleProblemClick(problem.id)}
                >
                  <Card.Content>
                    <Card.Header>{problem.title}</Card.Header>
                    <Card.Description
                      style={{
                        maxHeight: "100px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {problem.description}
                    </Card.Description>
                  </Card.Content>
                </Card>
              ))
            ) : (
              <div>Hiç sorun bulunamadı</div>
            )}
          </div>
        </div>

        <div style={{ flex: "1 1 100%" }}>
          <h3 style={{maxWidth:"100%"}}>Çözümler</h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
            {solutions.length > 0 ? (
              solutions.map((solution) => (
                <Card
                  key={solution.id}
                  style={{
                    flex: "1 1 100%", // Değiştirildi
                    marginBottom: "20px",
                    backgroundColor: "rgba(144, 238, 144, 0.8)",
                    borderRadius: 15,
                    boxShadow: "none",
                    cursor: "pointer",
                    maxWidth: "300px", // Değiştirildi
                  }}
                  onClick={() => handleSolutionClick(solution.problemId, solution.id)}
                >
                  <Card.Content>
                    <Card.Header>{solution.title}</Card.Header>
                    <Card.Description
                      style={{
                        maxHeight: "100px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {solution.description}
                    </Card.Description>
                  </Card.Content>
                </Card>
              ))
            ) : (
              <div>Hiç çözüm bulunamadı</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
