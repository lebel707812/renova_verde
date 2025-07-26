'use client';

import { useState } from 'react';
import { Mail, MessageCircle, Clock, CheckCircle, Send } from 'lucide-react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  if (isSubmitted) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-sm text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Mensagem Enviada!
          </h2>
          <p className="text-gray-600 mb-6">
            Obrigado por entrar em contato conosco. Responderemos em até 24 horas.
          </p>
          <button
            onClick={() => setIsSubmitted(false)}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            Enviar Nova Mensagem
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="grid lg:grid-cols-3 gap-12">
        {/* Seu conteúdo completo do formulário aqui */}
        {/* ... (mantenha todo o JSX do formulário original) ... */}
      </div>
    </div>
  );
}