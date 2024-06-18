using ecommerce_topicos3.Models;

namespace ecommerce_topicos3.Interfaces
{
    public interface ICidadeRepository
    {
        void Incluir(Cidade cidade);

        void Alterar(Cidade cidade);

        void Excluir(Cidade cidade);

        Task<Cidade> SelecionarPorId(long id);

        Task<IEnumerable<Cidade>> SelecionarTodos();

        Task<bool> SaveAllAsync();
    }
}
