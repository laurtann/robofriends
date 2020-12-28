import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import CardList from '../components/CardList';
// import { robots } from './robots';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import './App.css';
// import { robots } from '../robots';

export default function App () {
  const [robots, setRobots] = useState([]);
  const [searchfield, setSearchfield] = useState("");

  // componentDidMount() is same same when passing empty array
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(users => setRobots(users))
    .catch(error => console.log(error));
  }, []);

  const onSearchChange = (event) => {
    setSearchfield(event.target.value);
  };

  const filteredRobots = robots.filter(robot => {
    return robot.name.toLowerCase().includes(searchfield.toLowerCase());
  })
  if (robots.length === 0) {
    return <h1>Loading</h1>
  } else {
    return (
      <div className='tc'>
        <h1 className = 'f1'>RoboFriends</h1>
        <SearchBox searchChange={onSearchChange}/>
        <Scroll>
          <CardList robots={filteredRobots}/>
        </Scroll>
      </div>
    );
  }
}