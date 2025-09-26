import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../redux/slice/authSlice';

const LoginForm = () => {
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState('');


  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(login(inputValue)); // Mock user login
  };

  return ( 
    <>
    <div className="flex justify-center font-serif items-center drop-shadow-2xl h-screen bg-violet-100">
  <form  onSubmit={handleLogin} className="bg-white p-6 rounded shadow-md w-full max-w-sm">
    <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
    <div className="mb-4">
      <label htmlFor="text" className="block text-gray-700 font-medium mb-2">Your Name</label>
      <input
        type="text"
        className="w-full px-4 py-2 border 
        rounded-md focus:outline-none focus:ring-2
        hover:font-bold
        hover:border-violet-500
      focus:ring-violet-400"
        placeholder="Enter your Name"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        required
      />
    </div>
    <button
      type="submit"
      className="w-full bg-violet-500 text-white
       py-2 px-4 rounded-md
     hover:bg-violet-700 transition"
    >
      Login
    </button>
  </form>
</div>

    </>
  );
};

export default LoginForm;
