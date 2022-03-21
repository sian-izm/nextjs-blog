export default function Logout() {
  function logout() {
    console.log('Logout');
  }

return (
    <nav className="navbar navbar-expand navbar-dark bg-dark">
        <div className="navbar-nav">
            <a onClick={logout} className="nav-item nav-link">Logout</a>
        </div>
    </nav>
  );
}
