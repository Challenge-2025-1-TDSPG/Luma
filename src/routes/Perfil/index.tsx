import BtnInterno from '@/components/Button/BtnInterno';
import { useAuth } from '@/hooks/useAuth';
import { useMemo } from 'react';
import { MdEdit, MdLogout } from 'react-icons/md';

function maskCPF(cpf: string) {
  const d = cpf.replace(/\D/g, '').padStart(11, '0').slice(-11);
  return d.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
}

function formatDate(br: string) {
  // Aceita yyyy-mm-dd ou dd/mm/yyyy e retorna dd/mm/yyyy
  if (/^\d{4}-\d{2}-\d{2}$/.test(br)) {
    const [y, m, d] = br.split('-');
    return `${d}/${m}/${y}`;
  }
  return br;
}

export default function Perfil() {
  const { isLoggedIn, userData, logout } = useAuth();

  const info = useMemo(() => {
    if (!userData) return null;
    return {
      nome: userData.nome,
      cpf: maskCPF(userData.cpf),
      dataNascimento: formatDate(userData.dataNascimento),
      email: userData.email || '—',
      telefone: userData.telefone,
    };
  }, [userData]);

  return (
    <main
      className='container mx-auto px-4 sm:px-5 lg:px-6 py-8 lg:py-12'
      aria-label='Informações de perfil do usuário'
    >
      <header className='mb-6 text-center'>
        <h1 className='text-2xl sm:text-3xl font-semibold text-fontPrimary'>Meu Perfil</h1>
        <p className='text-fontTertiary mt-1'>Gerencie seus dados e sessão.</p>
      </header>

      {!isLoggedIn || !info ? (
        <section className='max-w-2xl mx-auto bg-[#FFF1E6] rounded-xl border p-6'>
          <p className='text-fontPrimary text-lg mb-4'>Você não está logado.</p>
          <div className='flex gap-3 justify-center'>
            <BtnInterno to='/formulario/cadastro?edit=1' className='bg-clikColor hover:bg-hoverBtn inline-flex items-center gap-2'>
              <MdEdit size={20} aria-hidden='true' />
              <span>Fazer cadastro / login</span>
            </BtnInterno>
            <a
              href='/'
              className='inline-flex items-center gap-2 px-4 py-2 rounded-md font-bold text-fontPrimary underline'
              aria-label='Voltar para a página inicial'
            >
              Voltar para Home
            </a>
          </div>
        </section>
      ) : (
        <section className='max-w-2xl mx-auto bg-[#FFF1E6] rounded-xl border p-6'>
          <dl className='grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4'>
            <div>
              <dt className='text-fontTertiary'>Nome</dt>
              <dd className='text-fontPrimary font-medium'>{info.nome}</dd>
            </div>
            <div>
              <dt className='text-fontTertiary'>CPF</dt>
              <dd className='text-fontPrimary font-medium'>{info.cpf}</dd>
            </div>
            <div>
              <dt className='text-fontTertiary'>Data de Nascimento</dt>
              <dd className='text-fontPrimary font-medium'>{info.dataNascimento}</dd>
            </div>
            <div>
              <dt className='text-fontTertiary'>E-mail</dt>
              <dd className='text-fontPrimary font-medium break-all'>{info.email}</dd>
            </div>
            <div>
              <dt className='text-fontTertiary'>Telefone</dt>
              <dd className='text-fontPrimary font-medium'>{info.telefone}</dd>
            </div>
          </dl>

          <div className='mt-6 flex flex-wrap gap-3 justify-center'>
            <BtnInterno to='/formulario/cadastro?edit=1' className='bg-clikColor hover:bg-hoverBtn inline-flex items-center gap-2'>
              <MdEdit size={20} aria-hidden='true' />
              <span>Atualizar dados</span>
            </BtnInterno>
            <button
              type='button'
              onClick={logout}
              className='px-4 py-2 rounded-md font-bold text-white bg-red-600 hover:bg-red-700 inline-flex items-center gap-2'
              aria-label='Sair da conta'
            >
              <MdLogout size={20} aria-hidden='true' />
              <span>Sair da conta</span>
            </button>
          </div>
        </section>
      )}
    </main>
  );
}
