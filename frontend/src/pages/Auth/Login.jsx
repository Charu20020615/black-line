import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Button from '../../components/common/Button';
import InputField from '../../components/common/InputField';
import { login as loginApi } from '../../api/userService';
import { useAuthContext } from '../../contexts/AuthContext';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';

export default function Login() {
  const { login } = useAuthContext();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { data } = await loginApi(email, password);
      login(data.user, data.token);
      
      // Navigate based on user role
      if (data.user.role === 'admin') {
        navigate('/dashboard');
      } else {
        navigate('/');
      }
    } catch (e) {
      setError(e?.response?.data?.message || 'Login failed');
    } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#d4af37] font-sans flex flex-col">
      <Navbar />
      
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="max-w-sm w-full bg-[#111111] p-8 rounded-2xl border border-[#2a2a2a]">
          <h1 className="text-3xl font-bold mb-6 text-center">Login</h1>
          <form className="space-y-4" onSubmit={onSubmit}>
            <InputField label="Email" name="email" type="email" value={email} onChange={(e)=>setEmail(e.target.value)} />
            <InputField label="Password" name="password" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
            {error && <p className="text-red-400 text-sm">{error}</p>}
            <Button type="submit" className="w-full">{loading ? 'Signing in...' : 'Login'}</Button>
            <p className="text-center text-gray-400 text-sm mt-4">
              Don't have an account? <Link to="/register" className="text-[#d4af37] hover:underline">Register here</Link>
            </p>
          </form>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}


