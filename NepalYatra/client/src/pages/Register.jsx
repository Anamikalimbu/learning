import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { register as registerUser, reset } from '../features/auth/authSlice';
import { useNavigate, Link } from 'react-router-dom';
import { User, Mail, Lock, Loader2, Compass } from 'lucide-react';
import toast from 'react-hot-toast';

const Register = () => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess || user) {
      navigate('/dashboard');
    }
    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onSubmit = (data) => {
    // Exclude confirmPassword from the data sent to API
    const { confirmPassword, ...userData } = data;
    dispatch(registerUser(userData));
  };

  const password = watch("password");

  return (
    <div className="min-h-screen flex items-center justify-center bg-[url('https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=2074&auto=format&fit=crop')] bg-cover bg-center bg-no-repeat relative py-12">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm z-0"></div>
      
      <div className="w-[calc(100%-2rem)] max-w-md p-6 sm:p-8 mx-auto rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] z-10 transform transition-all duration-300 hover:scale-[1.01]">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-tr from-orange-500 to-amber-300 text-white mb-4 shadow-lg shadow-orange-500/40">
            <Compass size={24} />
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight mb-2 drop-shadow-lg">Join NepalYatra</h1>
          <p className="text-gray-200 text-sm font-medium">Create an account to plan your perfect trip</p>
        </div>

        {isError && (
          <div className="mb-6 p-4 rounded-xl bg-red-500/20 border border-red-500/50 text-white text-sm backdrop-blur-sm text-center">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-white/90 ml-1 uppercase tracking-wider">Full Name</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-white/50 group-focus-within:text-white transition-colors">
                <User size={18} />
              </div>
              <input
                type="text"
                {...register('name', { required: 'Name is required' })}
                className="w-full pl-11 pr-4 py-3 bg-black/20 border border-white/10 rounded-2xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/50 focus:bg-black/30 transition-all duration-300 text-sm"
                placeholder="John Doe"
              />
            </div>
            {errors.name && <span className="text-red-300 text-xs ml-1">{errors.name.message}</span>}
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-white/90 ml-1 uppercase tracking-wider">Email Address</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-white/50 group-focus-within:text-white transition-colors">
                <Mail size={18} />
              </div>
              <input
                type="email"
                {...register('email', { 
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address"
                  }
                })}
                className="w-full pl-11 pr-4 py-3 bg-black/20 border border-white/10 rounded-2xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/50 focus:bg-black/30 transition-all duration-300 text-sm"
                placeholder="namaste@nepalyatra.com"
              />
            </div>
            {errors.email && <span className="text-red-300 text-xs ml-1">{errors.email.message}</span>}
          </div>
          
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-white/90 ml-1 uppercase tracking-wider">Account Type</label>
            <select
                {...register('role')}
                className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-white/50 focus:bg-black/30 transition-all duration-300 text-sm appearance-none"
              >
                <option value="Tourist" className="text-black">Tourist (Plan Trips)</option>
                <option value="Provider" className="text-black">Provider (Host/Guide)</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-white/90 ml-1 uppercase tracking-wider">Password</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-white/50 group-focus-within:text-white transition-colors">
                <Lock size={18} />
              </div>
              <input
                type="password"
                {...register('password', { 
                  required: 'Password is required',
                  minLength: { value: 6, message: 'Password must be at least 6 characters' }
                })}
                className="w-full pl-11 pr-4 py-3 bg-black/20 border border-white/10 rounded-2xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/50 focus:bg-black/30 transition-all duration-300 text-sm"
                placeholder="••••••••"
              />
            </div>
            {errors.password && <span className="text-red-300 text-xs ml-1">{errors.password.message}</span>}
          </div>
          
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-white/90 ml-1 uppercase tracking-wider">Confirm Password</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-white/50 group-focus-within:text-white transition-colors">
                <Lock size={18} />
              </div>
              <input
                type="password"
                {...register('confirmPassword', { 
                  validate: value => value === password || "The passwords do not match"
                })}
                className="w-full pl-11 pr-4 py-3 bg-black/20 border border-white/10 rounded-2xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/50 focus:bg-black/30 transition-all duration-300 text-sm"
                placeholder="••••••••"
              />
            </div>
            {errors.confirmPassword && <span className="text-red-300 text-xs ml-1">{errors.confirmPassword.message}</span>}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-400 text-white font-bold text-base hover:from-orange-400 hover:to-amber-300 focus:outline-none focus:ring-2 focus:ring-orange-500/50 shadow-lg shadow-orange-500/30 transition-all duration-300 transform active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed mt-4"
          >
            {isLoading ? <Loader2 className="animate-spin" /> : "Create Account"}
          </button>
        </form>

        <p className="mt-6 text-center text-white/80 text-sm">
          Already have an account?{' '}
          <Link to="/login" className="text-white font-bold hover:underline hover:text-amber-300 transition-colors">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
