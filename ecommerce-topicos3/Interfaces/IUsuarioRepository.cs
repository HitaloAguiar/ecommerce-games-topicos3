using ecommerce_topicos3.Models;

namespace ecommerce_topicos3.Interfaces
{
    public interface IUsuarioRepository
    {
        void Incluir(Usuario usuario);

        void Alterar(Usuario usuario);

        void Excluir(Usuario usuario);

        Task<Usuario> SelecionarPorId(int id);

        Task<IEnumerable<Usuario>> SelecionarTodos();

        Usuario SelecionarPorEmail(string email);

        Task<bool> SaveAllAsync();
    }
}
