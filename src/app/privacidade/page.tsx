import { Metadata } from 'next';
import Layout from '@/components/layout/Layout';
import { Shield, Eye, Lock, UserCheck, Mail, Database } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Política de Privacidade | Renova Verde Hub',
  description: 'Conheça nossa política de privacidade e como protegemos seus dados pessoais no Renova Verde Hub.',
  robots: 'index, follow',
};

export default function PrivacidadePage() {
  return (
    <Layout>
      <div className="bg-gray-50 min-h-screen">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-green-800 to-green-600 text-white py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-6">
                <Shield className="w-8 h-8" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                Política de Privacidade
              </h1>
              <p className="text-xl text-green-100">
                Sua privacidade é nossa prioridade. Saiba como coletamos, usamos e protegemos seus dados.
              </p>
              <p className="text-sm text-green-200 mt-4">
                Última atualização: Janeiro de 2024
              </p>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-lg shadow-sm p-8 space-y-8">
              
              {/* Introdução */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <UserCheck className="w-6 h-6 mr-3 text-green-600" />
                  1. Introdução
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  O Renova Verde Hub está comprometido em proteger sua privacidade e dados pessoais. 
                  Esta Política de Privacidade explica como coletamos, usamos, armazenamos e protegemos 
                  suas informações quando você visita nosso site ou utiliza nossos serviços.
                </p>
              </div>

              {/* Informações Coletadas */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <Database className="w-6 h-6 mr-3 text-green-600" />
                  2. Informações que Coletamos
                </h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">2.1 Informações Fornecidas Voluntariamente</h3>
                    <ul className="list-disc list-inside text-gray-600 space-y-1">
                      <li>Nome e endereço de e-mail (newsletter e formulários de contato)</li>
                      <li>Mensagens enviadas através do formulário de contato</li>
                      <li>Comentários em artigos (quando implementado)</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">2.2 Informações Coletadas Automaticamente</h3>
                    <ul className="list-disc list-inside text-gray-600 space-y-1">
                      <li>Endereço IP e localização geográfica aproximada</li>
                      <li>Tipo de navegador e sistema operacional</li>
                      <li>Páginas visitadas e tempo de permanência</li>
                      <li>Referência de origem (como chegou ao nosso site)</li>
                      <li>Cookies e tecnologias similares</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Como Usamos */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <Eye className="w-6 h-6 mr-3 text-green-600" />
                  3. Como Usamos suas Informações
                </h2>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Enviar nossa newsletter semanal com conteúdo sobre sustentabilidade</li>
                  <li>Responder a suas mensagens e solicitações de contato</li>
                  <li>Melhorar nosso site e experiência do usuário</li>
                  <li>Analisar o tráfego e comportamento dos visitantes</li>
                  <li>Personalizar conteúdo e recomendações</li>
                  <li>Cumprir obrigações legais quando necessário</li>
                </ul>
              </div>

              {/* Compartilhamento */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <Mail className="w-6 h-6 mr-3 text-green-600" />
                  4. Compartilhamento de Informações
                </h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  <strong>Não vendemos, alugamos ou compartilhamos</strong> suas informações pessoais com terceiros 
                  para fins comerciais. Podemos compartilhar informações apenas nas seguintes situações:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Com provedores de serviços confiáveis (ex: plataforma de e-mail marketing)</li>
                  <li>Quando exigido por lei ou autoridades competentes</li>
                  <li>Para proteger nossos direitos legais ou segurança</li>
                  <li>Com seu consentimento explícito</li>
                </ul>
              </div>

              {/* Cookies */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  5. Cookies e Tecnologias Similares
                </h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Utilizamos cookies para melhorar sua experiência em nosso site. Os cookies são pequenos 
                  arquivos armazenados em seu dispositivo que nos ajudam a:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Lembrar suas preferências e configurações</li>
                  <li>Analisar o tráfego do site (Google Analytics)</li>
                  <li>Personalizar conteúdo e anúncios</li>
                  <li>Melhorar a funcionalidade do site</li>
                </ul>
                <p className="text-gray-600 leading-relaxed mt-4">
                  Você pode desabilitar cookies em seu navegador, mas isso pode afetar a funcionalidade do site.
                </p>
              </div>

              {/* Segurança */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <Lock className="w-6 h-6 mr-3 text-green-600" />
                  6. Segurança dos Dados
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  Implementamos medidas de segurança técnicas e organizacionais apropriadas para proteger 
                  suas informações pessoais contra acesso não autorizado, alteração, divulgação ou destruição. 
                  Isso inclui criptografia SSL, armazenamento seguro e acesso restrito aos dados.
                </p>
              </div>

              {/* Seus Direitos */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  7. Seus Direitos (LGPD)
                </h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  De acordo com a Lei Geral de Proteção de Dados (LGPD), você tem os seguintes direitos:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li><strong>Acesso:</strong> Solicitar informações sobre seus dados pessoais</li>
                  <li><strong>Correção:</strong> Corrigir dados incompletos ou incorretos</li>
                  <li><strong>Exclusão:</strong> Solicitar a remoção de seus dados</li>
                  <li><strong>Portabilidade:</strong> Receber seus dados em formato estruturado</li>
                  <li><strong>Oposição:</strong> Opor-se ao tratamento de seus dados</li>
                  <li><strong>Revogação:</strong> Retirar seu consentimento a qualquer momento</li>
                </ul>
                <p className="text-gray-600 leading-relaxed mt-4">
                  Para exercer esses direitos, entre em contato conosco através do e-mail: 
                  <a href="mailto:privacidade@renovaverdehub.com" className="text-green-600 hover:text-green-700 font-medium">
                    privacidade@renovaverdehub.com
                  </a>
                </p>
              </div>

              {/* Retenção */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  8. Retenção de Dados
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  Mantemos suas informações pessoais apenas pelo tempo necessário para cumprir as finalidades 
                  descritas nesta política, atender a obrigações legais ou resolver disputas. Os dados da 
                  newsletter são mantidos até que você cancele sua inscrição.
                </p>
              </div>

              {/* Menores */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  9. Menores de Idade
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  Nosso site não é direcionado a menores de 13 anos. Não coletamos intencionalmente 
                  informações pessoais de crianças. Se você é pai/mãe ou responsável e acredita que 
                  seu filho forneceu informações pessoais, entre em contato conosco.
                </p>
              </div>

              {/* Alterações */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  10. Alterações nesta Política
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  Podemos atualizar esta Política de Privacidade periodicamente. Notificaremos sobre 
                  mudanças significativas através de nosso site ou newsletter. A data da última 
                  atualização está indicada no topo desta página.
                </p>
              </div>

              {/* Contato */}
              <div className="bg-green-50 p-6 rounded-lg">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  11. Entre em Contato
                </h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Se você tiver dúvidas sobre esta Política de Privacidade ou sobre como tratamos 
                  seus dados pessoais, entre em contato conosco:
                </p>
                <div className="space-y-2 text-gray-600">
                  <p><strong>E-mail:</strong> privacidade@renovaverdehub.com</p>
                  <p><strong>Formulário:</strong> <a href="/contato" className="text-green-600 hover:text-green-700">Página de Contato</a></p>
                  <p><strong>Responsável:</strong> Equipe Renova Verde Hub</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}

