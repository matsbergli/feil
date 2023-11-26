import { useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice';
import OAuth from '../components/OAuth';

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const {loading, error} = useSelector((state)=>state.user); 
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data));
      navigate('/');
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };
  return (
    <div className="p-5 max-w-sm mx-auto">
    <h1 className = "text-3xl text-center font-semibold my-7">Logg inn</h1>
    <form onSubmit={handleSubmit} className = "flex flex-col gap-5">
      <input type= "text" placeholder= "Epost" className = "border p-3 rounded" id = "email" onChange={handleChange}></input>
      <input type= "password" placeholder= "Passord" className = "border p-3 rounded" id = "password" onChange={handleChange}></input>
      <button disabled={loading} className= "bg-slate-800 text-white p-3 rounded uppercase hover:opacity-95 disabled:opacity-80">{loading ? "Laster...":"Logg inn"}</button>
      
    </form>
    <div className= "flex gap-3 mt-5">
      <p>Trenger du bruker?</p>
      <Link to={"/sign-up"}>
      <span className = "text-blue-600">Registrer</span>
      </Link>
    </div>
    {error && <p className="text-red-500 mt-5">{error}</p>}
    </div>
  )
}
