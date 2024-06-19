using ecommerce_topicos3.Models;

namespace ecommerce_topicos3.Interfaces
{
    public interface ICompraRepository
    {
        void Incluir(Compra compra);

        void Alterar(Compra compra);

        Task<IEnumerable<Compra>> SelecionarTodos();

        Task<IEnumerable<Compra>> SelecionarPorUsuario(long idUser);

        Task<bool> SaveAllAsync();
    }
}
