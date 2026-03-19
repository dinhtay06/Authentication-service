import { useState } from 'react';
import { Link } from 'react-router';
import { Coffee, Mail, ArrowLeft, CheckCircle } from 'lucide-react';
import { authService } from '@/services/authService';

export function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Email không hợp lệ.');
      return;
    }

    setIsLoading(true);
    try {
      await authService.forgotPassword(email);
      setSent(true);
    } catch (err: unknown) {
      const message =
        (err as { response?: { data?: { message?: string } } })?.response?.data?.message ||
        'Gửi email thất bại. Vui lòng thử lại.';
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

            <div className="mt-12 space-y-4">
              <h2 className="text-2xl font-semibold">Quên mật khẩu?</h2>
              <p className="text-amber-200 leading-relaxed">
                Nhập địa chỉ email đã đăng ký. Chúng tôi sẽ gửi cho bạn một liên kết để đặt lại mật khẩu.
              </p>
              <div className="mt-8 p-4 bg-amber-800 bg-opacity-50 rounded-xl">
                <p className="text-sm text-amber-200">
                  Liên kết đặt lại mật khẩu sẽ hết hạn sau 30 phút vì lý do bảo mật.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
          <Link
            to="/login"
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-amber-600 mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Quay lại đăng nhập
          </Link>

          {sent ? (
            /* Success state */
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <div className="bg-green-100 p-4 rounded-full">
                  <CheckCircle className="w-12 h-12 text-green-600" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Email đã được gửi!</h2>
              <p className="text-gray-600">
                Chúng tôi đã gửi liên kết đặt lại mật khẩu đến{' '}
                <span className="font-medium text-amber-600">{email}</span>.
              </p>
              <p className="text-sm text-gray-500">
                Không thấy email? Kiểm tra hộp thư spam hoặc{' '}
                <button
                  type="button"
                  onClick={() => setSent(false)}
                  className="text-amber-600 hover:text-amber-700 font-medium"
                >
                  gửi lại
                </button>
                .
              </p>
              <Link
                to="/login"
                className="inline-block mt-4 text-sm text-amber-600 hover:text-amber-700 font-medium"
              >
                Quay lại đăng nhập
              </Link>
            </div>
          ) : (
            /* Form state */
            <>
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Quên mật khẩu</h2>
                <p className="text-gray-600">Nhập email để nhận liên kết đặt lại mật khẩu</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Địa chỉ Email
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

                {error && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-sm text-red-600">{error}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-amber-600 hover:bg-amber-700 disabled:bg-amber-400 text-white font-medium py-3 rounded-lg transition-colors"
                >
                  {isLoading ? 'Đang gửi...' : 'Gửi liên kết đặt lại mật khẩu'}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
