import React, { useState } from 'react';
import './App.css';

interface User {
  id: string;
  name: string;
  email: string;
  creditBalance: number;
}

interface Task {
  id: string;
  title: string;
  description: string;
  creditValue: number;
  status: string;
  createdBy: string;
}

function App() {
  const [currentPage, setCurrentPage] = useState<'login' | 'home' | 'browse' | 'create'>('login');
  const [user, setUser] = useState<User | null>(null);
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Design a Logo',
      description: 'Need a modern logo for my startup. Looking for creative and professional design.',
      creditValue: 50,
      status: 'open',
      createdBy: 'John Doe'
    },
    {
      id: '2',
      title: 'Write Product Description',
      description: 'Need compelling product descriptions for my e-commerce store.',
      creditValue: 25,
      status: 'open',
      createdBy: 'Jane Smith'
    },
    {
      id: '3',
      title: 'Build Landing Page',
      description: 'Create a responsive landing page for my new app.',
      creditValue: 100,
      status: 'open',
      createdBy: 'Mike Johnson'
    }
  ]);

  const handleLogin = () => {
    setUser({
      id: '1',
      name: 'Demo User',
      email: 'demo@talentexchange.com',
      creditBalance: 150
    });
    setCurrentPage('home');
  };

  const LoginPage = () => (
    <div className="page login-page">
      <div className="login-container">
        <h1>🎯 Talent Exchange</h1>
        <p>A platform for peer-to-peer skill and service trading</p>
        <div className="login-form">
          <input type="email" placeholder="Email" className="input" />
          <input type="password" placeholder="Password" className="input" />
          <button onClick={handleLogin} className="btn btn-primary">Sign In</button>
          <p className="demo-note">This is a demo - click "Sign In" to continue</p>
        </div>
      </div>
    </div>
  );

  const HomePage = () => (
    <div className="page">
      <div className="welcome-card">
        <h2>Welcome back, {user?.name}!</h2>
        <p>Credit Balance: <strong>{user?.creditBalance} credits</strong></p>
      </div>

      <div className="quick-actions">
        <h3>Quick Actions</h3>
        <button onClick={() => setCurrentPage('browse')} className="btn btn-outline">
          Browse Tasks
        </button>
        <button onClick={() => setCurrentPage('create')} className="btn btn-outline">
          Post a Task
        </button>
      </div>

      <div className="recent-activity">
        <h3>Recent Activity</h3>
        <p className="placeholder">No recent activity</p>
      </div>
    </div>
  );

  const BrowsePage = () => (
    <div className="page">
      <h2>Browse Tasks</h2>
      <div className="filters">
        <input type="text" placeholder="Search tasks..." className="input" />
        <select className="input">
          <option>All Categories</option>
          <option>Design & Creative</option>
          <option>Writing & Content</option>
          <option>Programming & Tech</option>
        </select>
      </div>

      <div className="tasks-grid">
        {tasks.map(task => (
          <div key={task.id} className="task-card">
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <div className="task-footer">
              <span className="credits">{task.creditValue} credits</span>
              <span className="author">by {task.createdBy}</span>
            </div>
            <button className="btn btn-primary">Send Proposal</button>
          </div>
        ))}
      </div>
    </div>
  );

  const CreatePage = () => (
    <div className="page">
      <h2>Create New Task</h2>
      <div className="create-form">
        <input type="text" placeholder="Task Title" className="input" />
        <textarea placeholder="Task Description" className="textarea" rows={4}></textarea>
        <input type="number" placeholder="Credit Value" className="input" />
        <select className="input">
          <option>Select Category</option>
          <option>Design & Creative</option>
          <option>Writing & Content</option>
          <option>Programming & Tech</option>
        </select>
        <button className="btn btn-primary">Post Task</button>
      </div>
    </div>
  );

  const Navigation = () => (
    <nav className="navigation">
      <button
        onClick={() => setCurrentPage('home')}
        className={currentPage === 'home' ? 'active' : ''}
      >
        🏠 Home
      </button>
      <button
        onClick={() => setCurrentPage('browse')}
        className={currentPage === 'browse' ? 'active' : ''}
      >
        🔍 Browse
      </button>
      <button
        onClick={() => setCurrentPage('create')}
        className={currentPage === 'create' ? 'active' : ''}
      >
        ➕ Create
      </button>
      <button onClick={() => { setUser(null); setCurrentPage('login'); }}>
        👤 Logout
      </button>
    </nav>
  );

  if (!user) {
    return <LoginPage />;
  }

  return (
    <div className="App">
      <header className="header">
        <h1>Talent Exchange</h1>
        <span>Credits: {user.creditBalance}</span>
      </header>

      <Navigation />

      <main className="main-content">
        {currentPage === 'home' && <HomePage />}
        {currentPage === 'browse' && <BrowsePage />}
        {currentPage === 'create' && <CreatePage />}
      </main>
    </div>
  );
}

export default App;
