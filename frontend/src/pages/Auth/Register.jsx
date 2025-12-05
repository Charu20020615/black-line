import { useNavigate, Link } from 'react-router-dom';
import Button from '../../components/common/Button';
import InputField from '../../components/common/InputField';
import useForm from '../../hooks/useForm';
import { register as registerApi } from '../../api/userService';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';

export default function Register() {
  const navigate = useNavigate();
  const { values, onChange, reset } = useForm({ name: '', email: '', password: '' });
  
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerApi(values);
      reset();
      alert('Registered! You can now login.');
      navigate('/login');
    } catch (error) {
      alert('Registration failed. Please try again.');
    }
  };
  
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#d4af37] font-sans flex flex-col">
      <Navbar />
      
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="max-w-sm w-full bg-[#111111] p-8 rounded-2xl border border-[#2a2a2a]">
          <h1 className="text-3xl font-bold mb-6 text-center">Register</h1>
          <form className="space-y-4" onSubmit={onSubmit}>
            <InputField label="Name" name="name" value={values.name} onChange={onChange} />
            <InputField label="Email" name="email" type="email" value={values.email} onChange={onChange} />
            <InputField label="Password" name="password" type="password" value={values.password} onChange={onChange} />
            <Button type="submit" className="w-full">Create account</Button>
            <p className="text-center text-gray-400 text-sm mt-4">
              Already have an account? <Link to="/login" className="text-[#d4af37] hover:underline">Login here</Link>
            </p>
          </form>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}


