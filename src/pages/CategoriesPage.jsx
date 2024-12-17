import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  Container,
  Dimmer,
  Form,
  Grid,
  Header,
  Icon,
  Loader,
  Menu,
  Modal,
  Table,
} from "semantic-ui-react";
import { GlobalContext } from "../context/GlobalState";
import ProblemService from "../services/ProblemService";
import { useNavigate } from "react-router";

export default function CategoriesPage() {
  const { topics, authenticatedUser, cities } = useContext(GlobalContext);
  const [topic, setTopic] = useState(1);
  const [problems, setProblems] = useState([]);
  const [open, setOpen] = useState(false);
  const [newProblem, setNewProblem] = useState({
    title: "",
    description: "",
    cityCode: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    let problemService = new ProblemService();
    problemService
      .getByTopic(topic)
      .then((result) => {
        setProblems(result.data.data);
      })
      .catch((error) => console.error(error));
  }, [topic]);

  const handleInputChange = (e, { name, value }) => {
    setNewProblem({ ...newProblem, [name]: value });
  };

  const addProblem = () => {
    let problemService = new ProblemService();
    problemService
      .addProblem({
        ...newProblem,
        topicId: topic,
        senderId: authenticatedUser.id,
      })
      .then(() => {
        setOpen(false);
        problemService.getByTopic(topic).then((result) => {
          setProblems(result.data.data);
        });
      })
      .catch((error) => console.error(error));
  };

  return (
    <div>
      {topics == null ? (
        <Dimmer active>
          <Loader />
        </Dimmer>
      ) : (
        <>
          <Modal
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            trigger={
              <Button primary disabled={authenticatedUser == null}>
                Yeni Problem Ekle
                {authenticatedUser == null ? " (Giriş Yapınız)" : ""}
              </Button>
            }
          >
            <Modal.Header>Yeni Problem Ekle</Modal.Header>
            <Modal.Content>
              <Form>
                <Form.Input
                  label="Başlık"
                  name="title"
                  required={true}
                  onChange={handleInputChange}
                />
                <Form.TextArea
                  label="Açıklama"
                  name="description"
                  required={true}
                  onChange={handleInputChange}
                />
                <Form.Select
                  label="Şehir"
                  required={true}
                  options={cities}
                  name="cityCode"
                  onChange={handleInputChange}
                />
              </Form>
            </Modal.Content>
            <Modal.Actions>
              <Button onClick={() => setOpen(false)}>İptal</Button>
              <Button primary onClick={addProblem}>
                Ekle
              </Button>
            </Modal.Actions>
          </Modal>
          <Grid columns={2} stackable>
            <Grid.Column width={3} only="computer">
              <Menu
                secondary
                vertical
                style={{
                  backgroundColor: "rgba(100,149,237,1)",
                  borderRadius: 10,
                  marginTop: "50px",
                }}
              >
                {topics.map((topic) => (
                  <Menu.Item key={topic.id}>
                    <Button
                      content={topic.name}
                      style={{
                        backgroundColor: "transparent",
                        borderRadius: 10,
                      }}
                      onClick={() => setTopic(topic.id)}
                    />
                  </Menu.Item>
                ))}
              </Menu>
            </Grid.Column>
            <Grid.Column width={16} only="mobile tablet">
              <Menu
                secondary
                pointing
                horizontal
                style={{
                  overflowX: "auto",
                  whiteSpace: "nowrap",
                  backgroundColor: "rgba(100,149,237,0.9)",
                  borderRadius: 10,
                  marginTop: "10px",
                }}
              >
                {topics.map((topic) => (
                  <Menu.Item key={topic.id}>
                    <Button
                      content={topic.name}
                      style={{
                        backgroundColor: "transparent",
                        borderRadius: 10,
                      }}
                      onClick={() => setTopic(topic.id)}
                    />
                  </Menu.Item>
                ))}
              </Menu>
            </Grid.Column>
            <Grid.Column width={12}>
              <Table
                inverted
                style={{
                  backgroundColor: "rgba(100,149,237,0.8)",
                  marginTop: "50px",
                }}
              >
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>
                      <Icon name="user" />
                      Kullanıcı
                    </Table.HeaderCell>
                    <Table.HeaderCell>
                      <Icon name="compass" />
                      Problem
                    </Table.HeaderCell>
                    <Table.HeaderCell>
                      <Icon name="building" />
                      Şehir
                    </Table.HeaderCell>
                    <Table.HeaderCell />
                  </Table.Row>
                </Table.Header>

                <Table.Body>
                  {problems.map((problem) => (
                    <Table.Row key={problem.id}>
                      <Table.Cell>
                        <Button
                          as="a"
                          onClick={() => navigate(`/user/${problem.senderId}`)}
                          style={{ color: "white", background: "none", padding: 0 }}
                        >
                          {problem.senderUsername}
                        </Button>
                      </Table.Cell>
                      <Table.Cell>
                        <Header>{problem.title}</Header>
                        <Container
                          fluid
                          style={{
                            maxHeight: "100px",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {problem.description}
                        </Container>
                      </Table.Cell>
                      <Table.Cell>{problem.cityName}</Table.Cell>
                      <Table.Cell>
                        <Button
                          style={{
                            backgroundColor: "rgba(100,149,237,1)",
                          }}
                          icon="external square alternate"
                          onClick={() => navigate(`/problem/${problem.id}`)}
                        />
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            </Grid.Column>
          </Grid>
        </>
      )}
    </div>
  );
}
