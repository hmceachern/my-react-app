import { Link } from 'react-router-dom';

function Navigation() {
  return (
    <nav>
      <Link to="/">Home</Link> |{' '}
      <Link to="/parse-excel">Parse Excel</Link> |{' '}
      <Link to="/pathfinder-spells">Pathfinder Spell List</Link>
    </nav>
  );
}

export default Navigation;