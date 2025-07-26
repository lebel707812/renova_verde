import { Metadata } from 'next';
import Layout from '@/components/layout/Layout';
import { FileText, AlertTriangle, Scale, Users, Copyright, Shield } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Termos de Uso | Renova Verde Hub',
  description: 'Conheça os termos e condições de uso do Renova Verde Hub. Direitos, responsabilidades e regras de utilização.',
  robots: 'index, follow',
};

export default function TermosPage() {
  return (
    <Layout>
      <div className="bg-gray-50 min-h-screen">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-green-800 to-green-600 text-white py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-6">
                <FileText className="w-8 h-8" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                Termos de Uso
              </h1>
              <p className="text-xl text-green-100">
                Regras e condições para utilização do Renova Verde Hub
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
                  <Users className="w-6 h-6 mr-3 text-green-600" />
                  1. Aceitação dos Termos
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  Bem-vindo ao Renova Verde Hub! Ao acessar e usar nosso site, você concorda em cumprir 
                  e estar vinculado a estes Termos de Uso. Se você não concordar com qualquer parte 
                  destes termos, não deve usar nosso site.
                </p>
              </div>

              {/* Sobre o Serviço */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  2. Sobre o Renova Verde Hub
                </h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  O Renova Verde Hub é uma plataforma educacional que oferece conteúdo sobre:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Sustentabilidade doméstica e práticas eco-friendly</li>
                  <li>Jardinagem urbana e plantas para apartamentos</li>
                  <li>Energia renovável e eficiência energética</li>
                  <li>Reformas ecológicas e materiais sustentáveis</li>
                  <li>Dicas práticas para um estilo de vida mais verde</li>
                </ul>
              </div>

              {/* Uso Permitido */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <Shield className="w-6 h-6 mr-3 text-green-600" />
                  3. Uso Permitido
                </h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Você pode usar nosso site para:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Ler e compartilhar nossos artigos para fins educacionais</li>
                  <li>Inscrever-se em nossa newsletter</li>
                  <li>Entrar em contato conosco através dos formulários disponíveis</li>
                  <li>Navegar e pesquisar conteúdo sobre sustentabilidade</li>
                </ul>
              </div>

              {/* Uso Proibido */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <AlertTriangle className="w-6 h-6 mr-3 text-red-600" />
                  4. Uso Proibido
                </h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  É expressamente proibido:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Copiar, reproduzir ou distribuir nosso conteúdo sem autorização</li>
                  <li>Usar nosso site para atividades ilegais ou não autorizadas</li>
                  <li>Tentar hackear, interferir ou danificar nosso site</li>
                  <li>Enviar spam, vírus ou códigos maliciosos</li>
                  <li>Coletar informações de outros usuários sem consentimento</li>
                  <li>Usar nosso conteúdo para fins comerciais sem autorização</li>
                  <li>Fazer engenharia reversa ou tentar acessar códigos-fonte</li>
                </ul>
              </div>

              {/* Propriedade Intelectual */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <Copyright className="w-6 h-6 mr-3 text-green-600" />
                  5. Propriedade Intelectual
                </h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">5.1 Nosso Conteúdo</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Todo o conteúdo do Renova Verde Hub, incluindo textos, imagens, logos, design 
                      e código, é protegido por direitos autorais e outras leis de propriedade intelectual. 
                      Somos proprietários ou licenciados de todo este conteúdo.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">5.2 Uso do Conteúdo</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Você pode compartilhar nossos artigos com atribuição adequada e link para a fonte original. 
                      Para outros usos, incluindo reprodução comercial, é necessária autorização prévia por escrito.
                    </p>
                  </div>
                </div>
              </div>

              {/* Conteúdo do Usuário */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  6. Conteúdo do Usuário
                </h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Ao enviar conteúdo através de nossos formulários (comentários, mensagens, sugestões), você:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Garante que possui os direitos necessários sobre o conteúdo</li>
                  <li>Concede-nos licença para usar, modificar e exibir o conteúdo</li>
                  <li>Concorda que o conteúdo não viola direitos de terceiros</li>
                  <li>Assume responsabilidade pelo conteúdo enviado</li>
                </ul>
              </div>

              {/* Disclaimer */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  7. Isenção de Responsabilidade
                </h2>
                <div className="bg-yellow-50 p-6 rounded-lg">
                  <p className="text-gray-600 leading-relaxed mb-4">
                    <strong>IMPORTANTE:</strong> O conteúdo do Renova Verde Hub é fornecido apenas para 
                    fins educacionais e informativos. Não somos responsáveis por:
                  </p>
                  <ul className="list-disc list-inside text-gray-600 space-y-2">
                    <li>Resultados de projetos ou implementações baseadas em nosso conteúdo</li>
                    <li>Danos ou prejuízos decorrentes do uso de nossas informações</li>
                    <li>Precisão, completude ou atualidade de todas as informações</li>
                    <li>Conteúdo de sites externos linkados</li>
                    <li>Interrupções ou falhas técnicas do site</li>
                  </ul>
                  <p className="text-gray-600 leading-relaxed mt-4">
                    Sempre consulte profissionais qualificados antes de implementar projetos de 
                    sustentabilidade, energia solar ou reformas em sua propriedade.
                  </p>
                </div>
              </div>

              {/* Links Externos */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  8. Links para Sites Externos
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  Nosso site pode conter links para sites de terceiros. Estes links são fornecidos 
                  apenas para conveniência. Não temos controle sobre o conteúdo destes sites e não 
                  somos responsáveis por suas práticas de privacidade ou conteúdo.
                </p>
              </div>

              {/* Disponibilidade */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  9. Disponibilidade do Serviço
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  Embora nos esforcemos para manter o site sempre disponível, não garantimos que 
                  estará livre de interrupções, erros ou falhas. Reservamo-nos o direito de 
                  modificar, suspender ou descontinuar qualquer parte do site a qualquer momento.
                </p>
              </div>

              {/* Lei Aplicável */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <Scale className="w-6 h-6 mr-3 text-green-600" />
                  10. Lei Aplicável
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  Estes Termos de Uso são regidos pelas leis brasileiras. Qualquer disputa será 
                  resolvida nos tribunais competentes do Brasil, especificamente na comarca onde 
                  está localizada nossa sede.
                </p>
              </div>

              {/* Alterações */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  11. Alterações nos Termos
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  Podemos atualizar estes Termos de Uso periodicamente. As alterações entrarão em 
                  vigor imediatamente após a publicação no site. É sua responsabilidade revisar 
                  regularmente estes termos. O uso continuado do site após as alterações constitui 
                  aceitação dos novos termos.
                </p>
              </div>

              {/* Rescisão */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  12. Rescisão
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  Podemos encerrar ou suspender seu acesso ao site imediatamente, sem aviso prévio, 
                  se você violar estes Termos de Uso. Você também pode parar de usar nosso site 
                  a qualquer momento.
                </p>
              </div>

              {/* Contato */}
              <div className="bg-green-50 p-6 rounded-lg">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  13. Entre em Contato
                </h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Se você tiver dúvidas sobre estes Termos de Uso, entre em contato conosco:
                </p>
                <div className="space-y-2 text-gray-600">
                  <p><strong>E-mail:</strong> contato@renovaverdehub.com</p>
                  <p><strong>Formulário:</strong> <a href="/contato" className="text-green-600 hover:text-green-700">Página de Contato</a></p>
                  <p><strong>Responsável:</strong> Equipe Renova Verde Hub</p>
                </div>
              </div>

              {/* Aceitação */}
              <div className="border-t pt-8">
                <p className="text-gray-600 leading-relaxed text-center">
                  <strong>Ao usar o Renova Verde Hub, você confirma que leu, compreendeu e 
                  concorda em estar vinculado a estes Termos de Uso.</strong>
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}

