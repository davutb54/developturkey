import "semantic-ui-css/semantic.min.css";
import { Menu, Search } from "semantic-ui-react";
import React, { useContext, useState } from "react";
import SignedIn from "./SignedIn";
import SignedOut from "./SignedOut";
import { useNavigate } from "react-router-dom";
import "./Layout.css";
import { GlobalContext } from "../context/GlobalState";
import ProblemService from "../services/ProblemService";

export default function NavigationBar() {
  const { isAuthenticated, cities } = useContext(GlobalContext);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearchChange = async (e, { value }) => {
    setSearchQuery(value);
    if (value.length > 1) {
      let problemService = new ProblemService();
      try {
        const problems = await problemService
          .getAll()
          .then((response) => response.data.data);

        const filteredProblems = problems.filter((problem) =>
          problem.title.toLowerCase().includes(value.toLowerCase())
        );

        const results = [
          ...filteredProblems.map((problem) => ({
            title: problem.title,
            description: `Problem - Şehir: ${
              cities.find((c) => c.value === problem.cityCode).text
            }`,
            onClick: () => {
              navigate(`/problem/${problem.id}`);
              setSearchQuery("");
            },
          })),
        ];

        setSearchResults(results);
      } catch (error) {
        console.error("Arama sırasında bir hata oluştu:", error);
      }
    } else {
      setSearchResults([]);
    }
  };

  return (
    <div>
      <Menu tabular stackable inverted style={{ width: "100%", backgroundColor: "rgba(19, 46,55, 0.6)" }}>
        <Menu.Item
          name="home"
          content="Anasayfa"
          icon="home"
          onClick={() => navigate("/homepage")}
          style={{ color: "yellow" }}
        />
        <Menu.Item
          name="categories"
          content="Kategoriler"
          icon="book"
          onClick={() => navigate("/categories")}
          style={{ color: "yellow" }}
        />
        <Menu.Item
          name="about"
          content="Hakkımızda"
          icon="users"
          onClick={() => navigate("/aboutus")}
          style={{ color: "yellow" }}
        />
        <Menu.Menu position="right">
          <Menu.Item>
            <Search
              onSearchChange={handleSearchChange}
              value={searchQuery}
              results={searchResults}
            />
          </Menu.Item>
          {isAuthenticated ? <SignedIn /> : <SignedOut />}
        </Menu.Menu>
      </Menu>
    </div>
  );
}
