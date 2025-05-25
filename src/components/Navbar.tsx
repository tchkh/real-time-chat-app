import { Link } from 'react-router'
import supabase from '../utils/supabase'

function Navbar() {
  const handleLogout = async () => {
    await supabase.auth.signOut()
  }

  return (
    <nav className="navbar">
      <ul className="clearfix">
        <li>
          <Link to="/">Chat Room</Link>
        </li>
        <li>
          <Link to="/rooms">Available Room</Link>
        </li>
        <li>
          <Link to="/create-room">Create Room</Link>
        </li>
      </ul>

      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>
    </nav>
  )
}

export default Navbar
