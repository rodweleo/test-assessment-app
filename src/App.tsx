
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import DriversPage from './pages/drivers';
import { Navigation } from './components/navigation';

function App() {

  return (
    <Router>
      <div className='flex w-full'>
        <Navigation />
        <section className='container mx-auto p-4 w-full h-full'>
          <Routes>
            <Route index path="/" element={<Home />} />
            <Route path="/drivers" element={<DriversPage />} />
          </Routes>
        </section>
      </div>
    </Router>
  )
}

export default App
