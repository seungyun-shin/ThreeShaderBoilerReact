import { HashRouter as Router, Route } from 'react-router-dom'
import './App.scss';

//screens
import HomeScreen from './screens/HomeScreen'

function App() {
  return (
    <>
      <Router>
        <Route path='/' component={HomeScreen} exact />
      </Router>
    </>
  );
}

export default App;
