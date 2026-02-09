import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Sparkles, Zap, Palette, Download, Shield, Clock, Check, ArrowRight, User, LogOut } from 'lucide-react';

const HomePage = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const features = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'AI-Powered Generation',
      description: 'Just describe yourself and let AI create a complete professional portfolio in seconds',
      gradient: 'from-yellow-400 to-orange-500'
    },
    {
      icon: <Palette className="w-8 h-8" />,
      title: '3 Professional Themes',
      description: 'Choose from Minimal, Modern, or Creative themes designed by professionals',
      gradient: 'from-purple-400 to-pink-500'
    },
    {
      icon: <Download className="w-8 h-8" />,
      title: 'Multiple Export Options',
      description: 'Export your portfolio as HTML, React component, or PDF - ready to use anywhere',
      gradient: 'from-blue-400 to-cyan-500'
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Secure & Private',
      description: 'Your data stays on your device. No tracking, no selling - complete privacy',
      gradient: 'from-green-400 to-emerald-500'
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: 'Lightning Fast',
      description: 'Create a complete portfolio in under 30 seconds. No complex forms or hassle',
      gradient: 'from-red-400 to-rose-500'
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: '100% Free',
      description: 'No hidden charges, no subscriptions. Create unlimited portfolios for free',
      gradient: 'from-indigo-400 to-purple-500'
    }
  ];

  const howItWorksSteps = [
    {
      number: '1',
      title: 'Sign Up / Login',
      description: 'Create a free account in seconds. Your data is stored securely on your device.',
      icon: <User className="w-6 h-6" />
    },
    {
      number: '2',
      title: 'Describe Yourself',
      description: 'Write a brief description about your skills, experience, and achievements.',
      icon: <Sparkles className="w-6 h-6" />
    },
    {
      number: '3',
      title: 'AI Generates Portfolio',
      description: 'Our AI creates a complete professional portfolio with all sections filled.',
      icon: <Zap className="w-6 h-6" />
    },
    {
      number: '4',
      title: 'Customize & Export',
      description: 'Choose a theme, customize if needed, and export as HTML, React, or PDF.',
      icon: <Download className="w-6 h-6" />
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
      {/* Navigation */}
      <nav className="bg-white shadow-md border-b-4 border-purple-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-2 rounded-xl">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-black text-gray-900">
                AI Portfolio Generator
              </span>
            </div>
            <div className="flex items-center gap-4">
              {user ? (
                <>
                  <span className="text-gray-700 font-semibold hidden sm:block">
                    Hi, {user.name}!
                  </span>
                  <button
                    onClick={() => navigate('/generator')}
                    className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-xl font-bold hover:from-purple-700 hover:to-blue-700 transition-all shadow-lg"
                  >
                    Dashboard
                  </button>
                  <button
                    onClick={logout}
                    className="text-gray-600 hover:text-gray-900 transition-colors flex items-center gap-2"
                  >
                    <LogOut className="w-5 h-5" />
                    <span className="hidden sm:block">Logout</span>
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => navigate('/auth')}
                    className="text-purple-600 font-bold hover:text-purple-800 transition-colors"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => navigate('/auth')}
                    className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-xl font-bold hover:from-purple-700 hover:to-blue-700 transition-all shadow-lg"
                  >
                    Get Started
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center animate-fade-in">
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-6 rounded-3xl shadow-2xl animate-bounce">
              <Sparkles className="w-16 h-16 text-white" />
            </div>
          </div>
          <h1 className="text-6xl md:text-7xl font-black text-gray-900 mb-6 leading-tight">
            Create Your Perfect
            <br />
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Portfolio in Seconds
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto">
            Just describe yourself, and our AI will create a stunning professional portfolio.
            No complex forms, no design skills needed - just pure AI magic! ✨
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate(user ? '/generator' : '/auth')}
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-10 py-5 rounded-2xl font-bold text-lg hover:from-purple-700 hover:to-blue-700 transition-all shadow-2xl hover:shadow-3xl flex items-center justify-center gap-3 group"
            >
              <Zap className="w-6 h-6" />
              {user ? 'Go to Generator' : 'Start Creating for Free'}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <a
              href="#how-it-works"
              className="border-4 border-purple-600 text-purple-600 px-10 py-5 rounded-2xl font-bold text-lg hover:bg-purple-50 transition-all flex items-center justify-center gap-2"
            >
              See How It Works
            </a>
          </div>
          <p className="text-sm text-gray-500 mt-6">
            ✓ No credit card required &nbsp; ✓ 100% Free Forever &nbsp; ✓ Ready in 30 seconds
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-20 border-y-4 border-purple-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black text-gray-900 mb-4">
              Why Choose Our Generator?
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to create an impressive portfolio
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-purple-50 to-blue-50 p-8 rounded-3xl border-4 border-purple-200 hover:border-purple-400 transition-all hover:shadow-2xl group"
              >
                <div className={`bg-gradient-to-r ${feature.gradient} p-4 rounded-2xl w-fit mb-4 group-hover:scale-110 transition-transform`}>
                  <div className="text-white">{feature.icon}</div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gradient-to-r from-purple-600 to-blue-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
            <div className="animate-fade-in">
              <div className="text-5xl font-black mb-2">10K+</div>
              <div className="text-purple-100 font-semibold">Portfolios Created</div>
            </div>
            <div className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <div className="text-5xl font-black mb-2">3</div>
              <div className="text-purple-100 font-semibold">Professional Themes</div>
            </div>
            <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="text-5xl font-black mb-2">5sec</div>
              <div className="text-purple-100 font-semibold">Average Generation Time</div>
            </div>
            <div className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <div className="text-5xl font-black mb-2">100%</div>
              <div className="text-purple-100 font-semibold">Free Forever</div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600">
              Four simple steps to your perfect portfolio
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorksSteps.map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-white p-8 rounded-3xl border-4 border-purple-200 hover:border-purple-400 transition-all shadow-lg hover:shadow-2xl">
                  <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-2xl font-black mb-4">
                    {step.number}
                  </div>
                  <div className="bg-gradient-to-r from-purple-100 to-blue-100 p-3 rounded-xl w-fit mb-4">
                    <div className="text-purple-600">{step.icon}</div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-600">
                    {step.description}
                  </p>
                </div>
                {index < howItWorksSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ArrowRight className="w-8 h-8 text-purple-400" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-white py-20 border-y-4 border-purple-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black text-gray-900 mb-4">
              What Users Are Saying
            </h2>
            <p className="text-xl text-gray-600">
              Join thousands of satisfied professionals
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-8 rounded-3xl border-4 border-purple-200 hover:border-purple-400 transition-all shadow-lg hover:shadow-2xl">
              <div className="flex items-center gap-2 mb-4">
                <div className="text-yellow-400">⭐⭐⭐⭐⭐</div>
              </div>
              <p className="text-gray-700 mb-6 text-lg italic">
                "This is incredible! I created my portfolio in literally 30 seconds. The AI generated everything perfectly - my experience, skills, and projects. Saved me hours of work!"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                  S
                </div>
                <div>
                  <div className="font-bold text-gray-900">Sarah Johnson</div>
                  <div className="text-sm text-gray-600">Software Engineer</div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-8 rounded-3xl border-4 border-blue-200 hover:border-blue-400 transition-all shadow-lg hover:shadow-2xl">
              <div className="flex items-center gap-2 mb-4">
                <div className="text-yellow-400">⭐⭐⭐⭐⭐</div>
              </div>
              <p className="text-gray-700 mb-6 text-lg italic">
                "The themes are gorgeous! I tried all three and ended up using Modern for my job applications. Got 3 interview calls in the first week. Thank you!"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                  M
                </div>
                <div>
                  <div className="font-bold text-gray-900">Michael Chen</div>
                  <div className="text-sm text-gray-600">Data Scientist</div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-pink-50 to-purple-50 p-8 rounded-3xl border-4 border-pink-200 hover:border-pink-400 transition-all shadow-lg hover:shadow-2xl">
              <div className="flex items-center gap-2 mb-4">
                <div className="text-yellow-400">⭐⭐⭐⭐⭐</div>
              </div>
              <p className="text-gray-700 mb-6 text-lg italic">
                "As a designer, I'm picky about aesthetics. The Creative theme is stunning! Plus, being able to export as React component is a game-changer for my website."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-r from-pink-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                  E
                </div>
                <div>
                  <div className="font-bold text-gray-900">Emily Rodriguez</div>
                  <div className="text-sm text-gray-600">UI/UX Designer</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to know
            </p>
          </div>
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl border-4 border-purple-200 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                <span className="text-purple-600">❓</span>
                Is it really free?
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Yes! 100% free, no credit card required, no hidden charges. We use a free mock AI service instead of paid APIs, so you can create unlimited portfolios without any cost.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border-4 border-blue-200 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                <span className="text-blue-600">❓</span>
                How does the AI work?
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Our intelligent mock AI analyzes your description to detect your profession, skills, and experience. It then generates realistic portfolio content including work history, projects, skills, and education - all tailored to your role.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border-4 border-pink-200 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                <span className="text-pink-600">❓</span>
                Is my data secure?
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Absolutely! All your data is stored locally in your browser. Nothing is sent to external servers. You have full control over your data, and you can delete it anytime by logging out or clearing browser storage.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border-4 border-green-200 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                <span className="text-green-600">❓</span>
                Can I edit the generated portfolio?
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Currently, the portfolio is generated as-is based on your description. For custom edits, you can export as HTML or React component and modify the code. We're working on an in-app editor for future updates!
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border-4 border-yellow-200 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                <span className="text-yellow-600">❓</span>
                What export formats are available?
              </h3>
              <p className="text-gray-700 leading-relaxed">
                You can export your portfolio in three formats: HTML (standalone website), React Component (for React apps), and PDF (for printing or sharing). All formats preserve your chosen theme's styling.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border-4 border-indigo-200 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                <span className="text-indigo-600">❓</span>
                How long does generation take?
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Super fast! Most portfolios are generated in 3-5 seconds. The AI analyzes your description and creates a complete, professional portfolio almost instantly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-20 bg-white border-y-4 border-purple-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black text-gray-900 mb-4">
              Perfect For Every Professional
            </h2>
            <p className="text-xl text-gray-600">
              Whether you're just starting or well-established
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-purple-100 to-blue-100 p-8 rounded-3xl border-4 border-purple-300 hover:scale-105 transition-transform">
              <div className="text-5xl mb-4">💼</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Job Seekers</h3>
              <p className="text-gray-700">
                Stand out from the crowd with a professional portfolio that showcases your skills and experience. Perfect for job applications!
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-100 to-cyan-100 p-8 rounded-3xl border-4 border-blue-300 hover:scale-105 transition-transform">
              <div className="text-5xl mb-4">🚀</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Freelancers</h3>
              <p className="text-gray-700">
                Quickly create portfolios for different clients and projects. Export and share with potential clients in minutes!
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-100 to-emerald-100 p-8 rounded-3xl border-4 border-green-300 hover:scale-105 transition-transform">
              <div className="text-5xl mb-4">🎓</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Students</h3>
              <p className="text-gray-700">
                Build your first professional portfolio even without much experience. Perfect for internship applications!
              </p>
            </div>

            <div className="bg-gradient-to-br from-yellow-100 to-orange-100 p-8 rounded-3xl border-4 border-yellow-300 hover:scale-105 transition-transform">
              <div className="text-5xl mb-4">👨‍💻</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Developers</h3>
              <p className="text-gray-700">
                Export as React component and integrate into your existing website. Full code control and customization!
              </p>
            </div>

            <div className="bg-gradient-to-br from-pink-100 to-purple-100 p-8 rounded-3xl border-4 border-pink-300 hover:scale-105 transition-transform">
              <div className="text-5xl mb-4">🎨</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Designers</h3>
              <p className="text-gray-700">
                Choose from beautifully designed themes that showcase your creative work. Export as PDF for presentations!
              </p>
            </div>

            <div className="bg-gradient-to-br from-red-100 to-rose-100 p-8 rounded-3xl border-4 border-red-300 hover:scale-105 transition-transform">
              <div className="text-5xl mb-4">📊</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Data Professionals</h3>
              <p className="text-gray-700">
                Highlight your data science and analytics projects with generated portfolio sections tailored to your field!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black text-gray-900 mb-4">
              Why Choose Our Generator?
            </h2>
            <p className="text-xl text-gray-600">
              We're different from traditional portfolio builders
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-3xl border-4 border-purple-200 shadow-lg">
              <div className="flex items-start gap-4">
                <div className="bg-gradient-to-r from-red-500 to-pink-500 p-3 rounded-xl text-white text-2xl">
                  ❌
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Traditional Builders</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Fill out endless forms</li>
                    <li>• Spend hours on design</li>
                    <li>• Pay monthly subscriptions</li>
                    <li>• Limited customization</li>
                    <li>• Complex interfaces</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-3xl border-4 border-green-300 shadow-lg">
              <div className="flex items-start gap-4">
                <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-3 rounded-xl text-white text-2xl">
                  ✅
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Our AI Generator</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Just one text description</li>
                    <li>• AI creates everything</li>
                    <li>• 100% free forever</li>
                    <li>• Full code access</li>
                    <li>• Simple & intuitive</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Get Inspired Section */}
      <section className="py-20 bg-white border-y-4 border-purple-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black text-gray-900 mb-4">
              Get Inspired
            </h2>
            <p className="text-xl text-gray-600">
              See what you can create in seconds
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group cursor-pointer">
              <div className="bg-gradient-to-br from-gray-100 to-gray-200 p-8 rounded-3xl border-4 border-gray-300 hover:border-purple-400 transition-all shadow-lg hover:shadow-2xl h-96 flex flex-col items-center justify-center">
                <div className="text-6xl mb-4">📄</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Minimal Theme</h3>
                <p className="text-gray-600 text-center mb-4">
                  Clean and professional. Perfect for traditional industries.
                </p>
                <div className="flex gap-2">
                  <div className="w-3 h-3 bg-gray-800 rounded-full"></div>
                  <div className="w-3 h-3 bg-gray-600 rounded-full"></div>
                  <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                </div>
              </div>
            </div>

            <div className="group cursor-pointer">
              <div className="bg-gradient-to-br from-purple-100 to-blue-100 p-8 rounded-3xl border-4 border-purple-300 hover:border-purple-500 transition-all shadow-lg hover:shadow-2xl h-96 flex flex-col items-center justify-center">
                <div className="text-6xl mb-4">💼</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Modern Theme</h3>
                <p className="text-gray-600 text-center mb-4">
                  Contemporary with gradients. Great for tech professionals.
                </p>
                <div className="flex gap-2">
                  <div className="w-3 h-3 bg-purple-600 rounded-full"></div>
                  <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                  <div className="w-3 h-3 bg-cyan-600 rounded-full"></div>
                </div>
              </div>
            </div>

            <div className="group cursor-pointer">
              <div className="bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 p-8 rounded-3xl border-4 border-pink-300 hover:border-pink-500 transition-all shadow-lg hover:shadow-2xl h-96 flex flex-col items-center justify-center">
                <div className="text-6xl mb-4">🎨</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Creative Theme</h3>
                <p className="text-gray-600 text-center mb-4">
                  Bold and colorful. Perfect for designers and artists.
                </p>
                <div className="flex gap-2">
                  <div className="w-3 h-3 bg-pink-600 rounded-full"></div>
                  <div className="w-3 h-3 bg-purple-600 rounded-full"></div>
                  <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center mt-12">
            <button
              onClick={() => navigate(user ? '/generator' : '/auth')}
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-10 py-4 rounded-2xl font-bold text-lg hover:from-purple-700 hover:to-blue-700 transition-all shadow-xl inline-flex items-center gap-2"
            >
              <Sparkles className="w-6 h-6" />
              Try All Themes Now
            </button>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="bg-gradient-to-r from-purple-600 to-blue-600 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-5xl font-black text-white mb-6">
            Ready to Create Your Portfolio?
          </h2>
          <p className="text-xl text-purple-100 mb-10">
            Join thousands of professionals who have already created their stunning portfolios
          </p>
          <button
            onClick={() => navigate(user ? '/generator' : '/auth')}
            className="bg-white text-purple-600 px-12 py-6 rounded-2xl font-black text-xl hover:bg-gray-100 transition-all shadow-2xl hover:shadow-3xl flex items-center justify-center gap-3 mx-auto group"
          >
            <Sparkles className="w-7 h-7" />
            {user ? 'Go to Generator' : 'Get Started Now - It\'s Free!'}
            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            {/* Brand */}
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-3 rounded-xl">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-black">AI Portfolio Generator</h3>
              </div>
              <p className="text-gray-400 mb-6 max-w-md">
                Create stunning professional portfolios in seconds with the power of AI. 
                No complex forms, no design skills needed - just describe yourself and let AI do the magic!
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-purple-600 transition-colors">
                  <span className="text-xl">𝕏</span>
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-purple-600 transition-colors">
                  <span className="text-xl">in</span>
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-purple-600 transition-colors">
                  <span className="text-xl">📧</span>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <button onClick={() => navigate('/')} className="text-gray-400 hover:text-white transition-colors">
                    Home
                  </button>
                </li>
                <li>
                  <a href="#how-it-works" className="text-gray-400 hover:text-white transition-colors">
                    How It Works
                  </a>
                </li>
                <li>
                  <button onClick={() => navigate('/auth')} className="text-gray-400 hover:text-white transition-colors">
                    Sign Up
                  </button>
                </li>
                <li>
                  <button onClick={() => navigate('/auth')} className="text-gray-400 hover:text-white transition-colors">
                    Login
                  </button>
                </li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="text-lg font-bold mb-4">Resources</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Support
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-gray-800">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-gray-500 text-sm">
                © 2026 AI Portfolio Generator. All rights reserved.
              </p>
              <div className="flex gap-6 text-sm">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Terms of Service
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Privacy Policy
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Cookie Policy
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;

