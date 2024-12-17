import { createContext, useEffect, useState } from "react";
import TopicService from "../services/TopicService";
import ConstantService from "../services/ConstantService";

export const GlobalContext = createContext();

export const GlobalProvider = (props) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authenticatedUser, setAuthenticatedUser] = useState(null)
  const [topics, setTopics] = useState(null)
  const [genders, setGenders] = useState(null);
  const [cities, setCities] = useState(null);

  useEffect(() => {
    let topicService = new TopicService();
    topicService
      .getTopics()
      .then((result) => {
        setTopics(result.data.data);
      })
      .catch((error) => console.error(error));
  },[])

  useEffect(() => {
    let constantService = new ConstantService();
    constantService
      .getGenders()
      .then((result) => {
        setGenders(result.data.data);
        console.log(result.data.data)
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    let constantService = new ConstantService();
    constantService
      .getCities()
      .then((result) => {
        setCities(result.data.data);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        isAuthenticated: isAuthenticated,
        setIsAuthenticated,
        authenticatedUser:authenticatedUser,
        setAuthenticatedUser,
        topics:topics,
        genders:genders,
        cities:cities,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};
