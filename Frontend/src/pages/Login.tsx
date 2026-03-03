import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Coffee, Lock, Mail, Eye, EyeOff } from 'lucide-react';
import { authService } from '@/services/authService';
import { RegisterModal } from '@/components/RegisterModal';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState('admin');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showRegister, setShowRegister] = useState(false);
  const navigate = useNavigate();

  const roles = [
    { id: 'admin', label: 'Admin', description: 'Full system access' },
    { id: 'franchise', label: 'Franchise Owner', description: 'Manage franchise operations' },
    { id: 'supplier', label: 'Supplier', description: 'Supply chain management' },
    { id: 'customer', label: 'Customer', description: 'Loyalty and orders' },
  ];

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      await authService.login({ email, password });
      navigate('/');
    } catch (err: unknown) {
      const message =
        (err as { response?: { data?: { message?: string } } })?.response?.data?.message ||
        'Email hoặc mật khẩu không đúng.';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-amber-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid md:grid-cols-2 gap-8 items-center">
        {/* Left Side - Branding */}
        <div className="hidden md:block">
          <div className="bg-gradient-to-br from-amber-900 to-amber-950 rounded-3xl p-12 text-white">
            <div className="flex items-center gap-3 mb-8">
              <div className="bg-amber-600 p-3 rounded-xl">
                <Coffee className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">Capital Coffee</h1>
                <p className="text-amber-300">Supply Chain Management</p>
              </div>
            </div>
            
            <div className="space-y-6 mt-12">
              <div className="flex items-start gap-4">
                <div className="bg-amber-800 p-2 rounded-lg">
                  <Lock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Secure Access</h3>
                  <p className="text-sm text-amber-200">Role-based authentication with enterprise-grade security</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-amber-800 p-2 rounded-lg">
                  <Coffee className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Unified Platform</h3>
                  <p className="text-sm text-amber-200">Manage franchises, inventory, and compliance in one place</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-amber-800 p-2 rounded-lg">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Real-time Insights</h3>
                  <p className="text-sm text-amber-200">IoT-enabled tracking and predictive analytics</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h2>
            <p className="text-gray-600">Sign in to access your dashboard</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            {/* Role Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Select Your Role
              </label>
              <div className="grid grid-cols-2 gap-3">
                {roles.map((role) => (
                  <button
                    key={role.id}
                    type="button"
                    onClick={() => setSelectedRole(role.id)}
                    className={`p-4 border-2 rounded-lg text-left transition-all ${
                      selectedRole === role.id
                        ? 'border-amber-600 bg-amber-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <p className="font-medium text-gray-900 text-sm">{role.label}</p>
                    <p className="text-xs text-gray-500 mt-1">{role.description}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="john@capitalcoffee.com"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Remember & Forgot */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-amber-600 border-gray-300 rounded focus:ring-amber-500"
                />
                <span className="text-sm text-gray-600">Remember me</span>
              </label>
              <a href="#" className="text-sm text-amber-600 hover:text-amber-700 font-medium">
                Forgot password?
              </a>
            </div>

            {/* Error message */}
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-amber-600 hover:bg-amber-700 disabled:bg-amber-400 text-white font-medium py-3 rounded-lg transition-colors"
            >
              {isLoading ? 'Đang đăng nhập...' : 'Sign In'}
            </button>

            {/* Register link */}
            <p className="text-center text-sm text-gray-600">
              Chưa có tài khoản?{' '}
              <button
                type="button"
                onClick={() => setShowRegister(true)}
                className="text-amber-600 hover:text-amber-700 font-medium"
              >
                Đăng ký ngay
              </button>
            </p>
          </form>
        </div>
      </div>

      <RegisterModal isOpen={showRegister} onClose={() => setShowRegister(false)} />
    </div>
  );
}
