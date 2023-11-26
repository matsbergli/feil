import {FaSearch} from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux"
import { useEffect, useState } from 'react';

export default function Header() {
    const {currentUser} = useSelector(state => state.user)
    const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);
  return (
    <header className="bg-slate-800">
        <div className="flex justify-between items-center max-w-6xl mx-auto p-3 ">
            
        <Link to="/">
            <h1 className="font-bold text-sm sm:text-2xl flex flex-wrap hover:opacity-80 transition east-in-out: duration-400 rounded-lg px-12 py-1 max-w-lg mx-auto">
                <span className="bg-clip-text text-white ">Dag</span>
                <span className="bg-clip-text text-white ">Sted</span>
            </h1>
        </Link>
        <form onSubmit={handleSubmit} className="bg-slate-100 p-2 rounded flex items-center">
            
            <input type="text" placeholder="Search..." className="bg-transparent focus:outline-none w-24 sm:w-64" value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}></input>
            <button>
            <FaSearch className='text-slate-600' />
          </button>
        </form>
        <ul className="flex gap-7">
        <Link to ="/Contact">
            <li className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-red-500 hidden sm:inline px-7 py-2 ">Kontakt</li>
            </Link>
        
            <Link to ="/sign-up">
            {currentUser ? (
                <p></p>
            ): (<li className="bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-yellow-500 hidden sm:inline px-7 py-2">Registrer</li>
            )}
            </Link>

        
        
            <Link to ="/profile">
            {currentUser ? (
                <img src={currentUser.avatar} className = "rounded full h-6 w-6 max-w-lg mx-auto"alt="Profile" />
            ): (<li className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 to-green-500 hidden sm:inline px-7 py-2">Logg in</li>
            )}
            </Link>

            <Link to ="/profile">
            {currentUser ? (
                <p className = "rounded full h-6 w-6 max-w-lg mx-auto mx-10 bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-yellow-500 hidden sm:inline px-14 py-2"alt="Profile"> Profil</p>
            ): (<p/>
            )}
            </Link>
        </ul>
        </div>
    </header>
  )
}
