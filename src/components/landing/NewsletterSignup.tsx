'use client';

import { useState } from 'react';
import { Mail } from 'lucide-react';

interface NewsletterSignupProps {
  variant?: 'default' | 'compact';
  placeholder?: string;
}

export default function NewsletterSignup({ 
  variant = 'default',
  placeholder = 'Digite seu email'
}: NewsletterSignupProps) {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    // TODO: Integrar com API de newsletter
    try {
      // Simulação de API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setMessage('Obrigado por se inscrever! Verifique seu email.');
      setEmail('');
    } catch (error) {
      setMessage('Erro ao se inscrever. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  if (variant === 'compact') {
    return (
      <div className="bg-primary-50 rounded-lg p-6">
        <div className="text-center mb-4">
          <h3 className="text-lg font-semibold text-primary-900 mb-2">
            Newsletter Sustentável
          </h3>
          <p className="text-sm text-primary-700">
            Receba dicas semanais de sustentabilidade
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="relative">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={placeholder}
              required
              className="w-full px-4 py-2 pr-12 border border-primary-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primary text-white p-1.5 rounded-md hover:bg-primary-700 disabled:opacity-50 transition-colors duration-200"
            >
              <Mail className="w-4 h-4" />
            </button>
          </div>
          
          {message && (
            <p className={`text-xs ${message.includes('Erro') ? 'text-red-600' : 'text-green-600'}`}>
              {message}
            </p>
          )}
        </form>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-8">
      <div className="text-center mb-6">
        <Mail className="w-12 h-12 text-primary mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          Newsletter Sustentável
        </h3>
        <p className="text-gray-600">
          Receba dicas semanais de jardinagem, reformas ecológicas e energia renovável
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={placeholder}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
        
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-primary text-white py-3 px-6 rounded-md font-semibold hover:bg-primary-700 disabled:opacity-50 transition-colors duration-200 flex items-center justify-center"
        >
          {isLoading ? (
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
          ) : (
            <>
              <Mail className="w-5 h-5 mr-2" />
              Inscrever-se
            </>
          )}
        </button>
        
        {message && (
          <p className={`text-sm text-center ${message.includes('Erro') ? 'text-red-600' : 'text-green-600'}`}>
            {message}
          </p>
        )}
      </form>
    </div>
  );
}

