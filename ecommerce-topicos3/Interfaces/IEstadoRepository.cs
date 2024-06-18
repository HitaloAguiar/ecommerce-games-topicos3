using ecommerce_topicos3.Models;

namespace ecommerce_topicos3.Interfaces
{
    public interface IEstadoRepository
    {
        void Incluir(Estado estado);

        void Alterar(Estado estado);

        void Excluir(Estado estado);

        Task<Estado> SelecionarPorId(long id);

        Task<IEnumerable<Estado>> SelecionarTodos();

        Task<bool> SaveAllAsync();
    }
}
