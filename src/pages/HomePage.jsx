import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProblemService from "../services/ProblemService";
import SolutionService from "../services/SolutionService";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Card } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import "./Page.css";

export default function HomePage() {
  const [solutions, setSolutions] = useState([]);
  const [problems, setProblems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    let problemService = new ProblemService();
    let solutionService = new SolutionService();

    problemService.getIsHighligted().then((response) => {
      setProblems(response.data.data);
    });
    solutionService.getIsHighligted().then((response) => {
      setSolutions(response.data.data);
    });
  }, []);

  const handleProblemClick = (id) => {
    navigate(`/problem/${id}`);
  };

  const handleSolutionClick = (solution) => {
    navigate(`/problem/${solution.problemId}?highlight=${solution.id}`);
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true, // Otomatik kaydırma
    autoplaySpeed: 3000, // 3 saniyede bir kaydırma
    responsive: [
      {
        breakpoint: 768, // 768px ve altı ekranlar için
        settings: {
          slidesToShow: 1, // Tek bir öğe göster
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div>
      <h2>Öne Çıkarılan Problemler</h2>
      <Slider {...sliderSettings}>
        {problems.map((problem) => (
          <div
            key={problem.id}
            className="slider-item"
            onClick={() => handleProblemClick(problem.id)}
          >
            <Card style={{ backgroundColor: "#d4edda" }}>
              <Card.Content>
                <Card.Header>{problem.title}</Card.Header>
                <Card.Description className="card-description">
                  {problem.description}
                </Card.Description>
              </Card.Content>
            </Card>
          </div>
        ))}
      </Slider>
      <h2>Öne Çıkarılan Çözümler</h2>
      <Slider {...sliderSettings}>
        {solutions.map((solution) => (
          <div
            key={solution.id}
            className="slider-item"
            onClick={() => handleSolutionClick(solution)}
          >
            <Card style={{ backgroundColor: "#d4edda" }}>
              <Card.Content>
                <Card.Header>{solution.title}</Card.Header>
                <Card.Description className="card-description">
                  {solution.description}
                </Card.Description>
              </Card.Content>
            </Card>
          </div>
        ))}
      </Slider>
    </div>
  );
}
