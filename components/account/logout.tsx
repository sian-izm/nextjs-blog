import Router from 'next/router';

export default function Logout() {
  const logout = async() => {
    await localStorage.removeItem('user');
    await Router.push('/account/login');
  }

return (
    <nav className="navbar navbar-expand navbar-dark bg-dark">
        <div className="navbar-nav">
            <a onClick={logout} className="nav-item nav-link">Logout</a>
        </div>
    </nav>
  );
}
