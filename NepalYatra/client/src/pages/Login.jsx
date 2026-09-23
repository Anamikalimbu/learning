import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { login, reset } from '../features/auth/authSlice';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, Loader2, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
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
    dispatch(login(data));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[url('https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=2074&auto=format&fit=crop')] bg-cover bg-center bg-no-repeat relative">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm z-0"></div>
      
      <div className="w-[calc(100%-2rem)] max-w-md p-6 sm:p-8 mx-auto rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] z-10 transform transition-all duration-300 hover:scale-[1.01]">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-white tracking-tight mb-2 drop-shadow-lg">Welcome Back</h1>
          <p className="text-gray-200 font-medium">Continue your journey in Nepal</p>
        </div>

        {isError && (
          <div className="mb-6 p-4 rounded-xl bg-red-500/20 border border-red-500/50 text-white text-sm backdrop-blur-sm text-center">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-white/90 ml-1">Email Address</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-white/50 group-focus-within:text-white transition-colors">
                <Mail size={20} />
              </div>
              <input
                type="email"
                {...register('email', { required: 'Email is required' })}
                className="w-full pl-11 pr-4 py-3.5 bg-black/20 border border-white/10 rounded-2xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/50 focus:bg-black/30 transition-all duration-300"
                placeholder="namaste@nepalyatra.com"
              />
            </div>
            {errors.email && <span className="text-red-300 text-xs ml-1">{errors.email.message}</span>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-white/90 ml-1">Password</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-white/50 group-focus-within:text-white transition-colors">
                <Lock size={20} />
              </div>
              <input
                type="password"
                {...register('password', { required: 'Password is required' })}
                className="w-full pl-11 pr-4 py-3.5 bg-black/20 border border-white/10 rounded-2xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/50 focus:bg-black/30 transition-all duration-300"
                placeholder="••••••••"
              />
            </div>
            {errors.password && <span className="text-red-300 text-xs ml-1">{errors.password.message}</span>}
          </div>

          <div className="flex items-center justify-end text-sm">
            <a href="#" className="text-white/80 hover:text-white transition-colors font-medium">Forgot password?</a>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-400 text-white font-bold text-lg hover:from-emerald-400 hover:to-teal-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 shadow-lg shadow-emerald-500/30 transition-all duration-300 transform active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed mt-4"
          >
            {isLoading ? <Loader2 className="animate-spin" /> : (
              <>
                Sign In
                <ArrowRight size={20} className="ml-1 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        <p className="mt-8 text-center text-white/80 text-sm">
          Don't have an account?{' '}
          <Link to="/register" className="text-white font-bold hover:underline hover:text-teal-300 transition-colors">
            Start exploring
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
