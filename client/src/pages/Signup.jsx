import { useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import OAuth from '../components/OAuth';

export default function Signup() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true); 
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false);
      setError(null);
      navigate('/sign-in');
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };
  return (
    <div className="p-5 max-w-sm mx-auto">
    <h1 className = "text-3xl text-center font-semibold my-7">Register</h1>
    <form onSubmit={handleSubmit} className = "flex flex-col gap-5">
      <input type='text' placeholder='Brukernavn' className='border p-3 rounded-lg' id='username' onChange={handleChange}/>
      <input type= "email" placeholder= "Epost" className = "border p-3 rounded" id = "email" onChange={handleChange}></input>
      <input type= "password" placeholder= "Passord" className = "border p-3 rounded" id = "password" onChange={handleChange}></input>
      <button disabled={loading} className= "bg-slate-800 text-white p-3 rounded uppercase hover:opacity-95 disabled:opacity-80">{loading ? "Laster...":"Registrer"}</button>
      
    </form>
    <div className= "flex gap-3 mt-5">
      <p>Har du profil?</p>
      <Link to={"/sign-in"}>
      <span className = "text-blue-600">Logg inn</span>
      </Link>
    </div>
    {error && <p className="text-red-500 mt-5">{error}</p>}
    </div>
  )
}
