import React, { useState } from 'react';
import { Brain, User, Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  password: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
  general?: string;
}

interface AuthPageProps {
  isLogin?: boolean;
}

const AuthPage: React.FC<AuthPageProps> = ({ isLogin: initialIsLogin = true }) => {
  const [isLogin, setIsLogin] = useState(initialIsLogin);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!isLogin && !formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    console.log('Validation errors:', newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted!', { isLogin, formData });
    
    console.log('Form submit triggered');
    if (!validateForm()) {
      console.log('Form validation failed', errors);
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
      const payload = isLogin 
        ? { email: formData.email, password: formData.password }
        : { name: formData.name, email: formData.email, password: formData.password };

      console.log('Sending request to', endpoint, 'with payload', payload);

      const response = await fetch(`http://localhost:3001${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      console.log('Response received', data);

      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        // Trigger app state change instead of page redirect
        const event = new CustomEvent('authSuccess', { detail: { user: data.user } });
        window.dispatchEvent(event);
      } else {
        console.error('Error response:', data.error);
        setErrors({ general: data.error || 'Something went wrong' });
      }
    } catch (error) {
      console.error('Network error:', error);
      setErrors({ general: 'Network error. Please check your connection and try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
    if (errors.general) {
      setErrors(prev => ({ ...prev, general: '' }));
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 99999,
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px'
    }}>
      <div style={{ maxWidth: '448px', width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '64px',
            height: '64px',
            background: 'linear-gradient(to right, #9333ea, #2563eb)',
            borderRadius: '50%',
            marginBottom: '16px'
          }}>
            <Brain style={{ width: '32px', height: '32px', color: 'white' }} />
          </div>
          <h1 style={{ fontSize: '30px', fontWeight: 'bold', color: '#111827', marginBottom: '8px' }}>
            {isLogin ? 'Welcome Back' : 'Join Us'}
          </h1>
          <p style={{ color: '#6b7280' }}>
            {isLogin 
              ? 'Sign in to continue your success journey' 
              : 'Create your account to discover your success blueprint'
            }
          </p>
        </div>

        <div style={{
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          borderRadius: '24px',
          padding: '32px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          border: '1px solid rgba(255, 255, 255, 0.2)'
        }}>
          {errors.general && (
            <div style={{
              marginBottom: '24px',
              padding: '16px',
              backgroundColor: '#fef2f2',
              border: '1px solid #fecaca',
              borderRadius: '12px'
            }}>
              <p style={{ color: '#dc2626', fontSize: '14px' }}>{errors.general}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {!isLogin && (
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
                  Full Name
                </label>
                <div style={{ position: 'relative' }}>
                  <User style={{
                    position: 'absolute',
                    left: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '20px',
                    height: '20px',
                    color: '#9ca3af'
                  }} />
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    style={{
                      width: '100%',
                      paddingLeft: '40px',
                      paddingRight: '16px',
                      paddingTop: '12px',
                      paddingBottom: '12px',
                      border: `2px solid ${errors.name ? '#fca5a5' : '#e5e7eb'}`,
                      borderRadius: '12px',
                      outline: 'none',
                      fontSize: '16px',
                      boxSizing: 'border-box'
                    }}
                    placeholder="Enter your full name"
                  />
                </div>
                {errors.name && (
                  <p style={{ color: '#ef4444', fontSize: '14px', marginTop: '4px' }}>{errors.name}</p>
                )}
              </div>
            )}

            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
                Email Address
              </label>
              <div style={{ position: 'relative' }}>
                <Mail style={{
                  position: 'absolute',
                  left: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: '20px',
                  height: '20px',
                  color: '#9ca3af'
                }} />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  style={{
                    width: '100%',
                    paddingLeft: '40px',
                    paddingRight: '16px',
                    paddingTop: '12px',
                    paddingBottom: '12px',
                    border: `2px solid ${errors.email ? '#fca5a5' : '#e5e7eb'}`,
                    borderRadius: '12px',
                    outline: 'none',
                    fontSize: '16px',
                    boxSizing: 'border-box'
                  }}
                  placeholder="Enter your email"
                />
              </div>
              {errors.email && (
                <p style={{ color: '#ef4444', fontSize: '14px', marginTop: '4px' }}>{errors.email}</p>
              )}
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
                Password
              </label>
              <div style={{ position: 'relative' }}>
                <Lock style={{
                  position: 'absolute',
                  left: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: '20px',
                  height: '20px',
                  color: '#9ca3af'
                }} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  style={{
                    width: '100%',
                    paddingLeft: '40px',
                    paddingRight: '48px',
                    paddingTop: '12px',
                    paddingBottom: '12px',
                    border: `2px solid ${errors.password ? '#fca5a5' : '#e5e7eb'}`,
                    borderRadius: '12px',
                    outline: 'none',
                    fontSize: '16px',
                    boxSizing: 'border-box'
                  }}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    color: '#9ca3af',
                    cursor: 'pointer',
                    padding: '4px'
                  }}
                >
                  {showPassword ? <EyeOff style={{ width: '20px', height: '20px' }} /> : <Eye style={{ width: '20px', height: '20px' }} />}
                </button>
              </div>
              {errors.password && (
                <p style={{ color: '#ef4444', fontSize: '14px', marginTop: '4px' }}>{errors.password}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              style={{
                width: '100%',
                paddingTop: '12px',
                paddingBottom: '12px',
                paddingLeft: '16px',
                paddingRight: '16px',
                borderRadius: '12px',
                fontWeight: '600',
                background: isLoading ? '#9ca3af' : 'linear-gradient(to right, #9333ea, #2563eb)',
                color: 'white',
                border: 'none',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '16px',
                position: 'relative',
                zIndex: 100002,
                pointerEvents: 'auto'
              }}
            >
              {isLoading ? (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div style={{
                    width: '20px',
                    height: '20px',
                    border: '2px solid white',
                    borderTop: '2px solid transparent',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite',
                    marginRight: '8px'
                  }}></div>
                  {isLogin ? 'Signing In...' : 'Creating Account...'}
                </div>
              ) : (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  {isLogin ? 'Sign In' : 'Create Account'}
                  <ArrowRight style={{ width: '20px', height: '20px', marginLeft: '8px' }} />
                </div>
              )}
            </button>
          </form>

          <div style={{ marginTop: '24px', textAlign: 'center' }}>
            <p style={{ color: '#6b7280' }}>
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <button
                onClick={() => {
                  setIsLogin(!isLogin);
                  setErrors({});
                  setFormData({ name: '', email: '', password: '' });
                }}
                style={{
                  marginLeft: '8px',
                  color: '#9333ea',
                  fontWeight: '600',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '16px'
                }}
              >
                {isLogin ? 'Sign Up' : 'Sign In'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
