import React, { useState, useEffect } from "react";
import Api from "./services/api"

import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([]) //Criando estado

  useEffect(() => { //Executar logo que iniciar
    Api.get('repositories').then( response => {
      setRepositories(response.data)
      // console.log(response.data)
    });
  }, [])

  async function handleAddRepository() {
    await Api.post('repositories', {
      id: "123",
      url: "https://github.com/josepholiveira",
      title: "Desafio ReactJS",
      techs: ["React", "Node.js"],
    } ).then( response => {
      setRepositories([...repositories , response.data]);
    });
  }

  async function handleRemoveRepository(id) {
    await Api.delete('repositories/' + id).then( response => {
      setRepositories(repositories.filter(
        repository => repository.id !== id
      ))
    });
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map( repository =>
          <li key={repository.id}>
            
            {repository.title}

            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>  
        )}        
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
