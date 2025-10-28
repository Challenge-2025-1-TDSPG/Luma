import FaqItem from '@/components/Faq/FaqItem';
import { fetchFaqData } from '@/data/faqData';
import type { FaqData } from '@/types/faq';
import { useEffect, useState } from 'react';

/**
 * Página de perguntas frequentes (FAQ)
 * Lista questões e respostas sobre o uso da plataforma
 *
 * @example
 * // Uso em rotas (React Router)
 * <Route path="/faq" element={<Faq />} />
 */

export default function Faq() {
  const [faqs, setFaqs] = useState<FaqData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    document.title = 'Perguntas Frequentes';
    fetchFaqData()
      .then(setFaqs)
      .catch(() => setError('Erro ao carregar FAQs'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main
      className='mx-auto w-full max-w-screen-lg px-6 sm:px-8 lg:px-10 xl:px-12 p-4'
      aria-label='Conteúdo principal de contatos'
    >
      <div className='mx-auto w-full max-w-screen-xl'>
        <div
          className='
            bg-backSecondary box-border relative m-auto
            rounded-md sm:rounded-lg md:rounded-xl
            shadow-sm md:shadow-md
            p-3 sm:p-4 md:p-5 lg:p-6
          '
        >
          <h1
            className='
              text-fontPrimary text-xl sm:text-2xl md:text-3xl
              mb-2 sm:mb-3 md:mb-4 text-center
            '
          >
            Perguntas Frequentes (FAQ)
          </h1>

          <p
            className='
              text-fontSecondary text-sm sm:text-base md:text-[17px]
              leading-relaxed text-center mb-4 sm:mb-5 md:mb-6
            '
          >
            Encontre respostas rápidas sobre o uso da plataforma de Saúde Digital.
          </p>
          <div className='mt-5'>
            {loading && <div className='text-center py-8'>Carregando FAQs...</div>}
            {error && <div className='text-center text-red-600 py-8'>{error}</div>}
            {!loading && !error && faqs.length === 0 && (
              <div className='text-center py-8'>Nenhuma FAQ encontrada.</div>
            )}
            {!loading && !error && faqs.map((item, idx) => <FaqItem key={idx} item={item} />)}
          </div>
        </div>
      </div>
    </main>
  );
}
