import type { FaqData } from '@/types/faq';

type FaqApi = {
  pergunta: string;
  resposta: string;
  link?: string;
  // outros campos se necessário
};

/**
 * Busca os dados de FAQ da API Flask
 * @returns Promise<FaqData[]>
 */
export async function fetchFaqData(): Promise<FaqData[]> {
  const response = await fetch('http://localhost:5000/faqs?ativo=1');
  if (!response.ok) throw new Error('Erro ao buscar FAQs');
  const data = await response.json();
  // Adapta para o formato esperado pelo front-end
  return (data.items || []).map((faq: FaqApi) => ({
    question: faq.pergunta,
    answer: faq.resposta,
    link: faq.link,
  }));
}
