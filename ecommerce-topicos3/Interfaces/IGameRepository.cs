using ecommerce_topicos3.Models;

namespace ecommerce_topicos3.Interfaces
{
    public interface IGameRepository
    {
        void Incluir(Game game);

        void Alterar(Game game);

        void Excluir(Game game);

        Task<Game> SelecionarPorId(long id);

        Task<IEnumerable<Game>> SelecionarTodos();

        Task<bool> SaveAllAsync();
    }
}
