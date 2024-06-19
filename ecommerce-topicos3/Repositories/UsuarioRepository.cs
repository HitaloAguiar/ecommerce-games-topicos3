using ecommerce_topicos3.Interfaces;
using ecommerce_topicos3.Models;
using Microsoft.EntityFrameworkCore;

namespace ecommerce_topicos3.Repositories
{
    public class UsuarioRepository : IUsuarioRepository
    {
        private readonly EcommerceContext _context;

        public UsuarioRepository (EcommerceContext context)
        {
            _context = context;
        }

        public void Alterar(Usuario usuario)
        {
            _context.Entry(usuario).State = EntityState.Modified;
        }

        public void Excluir(Usuario usuario)
        {
            _context.Usuario.Remove(usuario);
        }

        public void Incluir(Usuario usuario)
        {
            _context.Usuario.Add(usuario);
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<Usuario> SelecionarPorId(long id)
        {
            var usuario = await _context.Usuario.Where(x => x.Id == id)
                                                .Include(usuario => usuario.EnderecoPrincipal)
                                                    .ThenInclude(endereco => endereco.Cidade)
                                                    .ThenInclude(cidade => cidade.Estado)
                                                .FirstOrDefaultAsync();
            return usuario;
        }

        public Usuario SelecionarPorEmail(string email)
        {
            var usuario = _context.Usuario.FirstOrDefault(u => u.Email == email);

            return usuario;
        }

        public Usuario SelecionarPorUsername(string username)
        {
            var usuario = _context.Usuario.FirstOrDefault(u => u.Username == username);

            return usuario;
        }

        public async Task<IEnumerable<Usuario>> SelecionarTodos()
        {
            return await _context.Usuario.ToListAsync();
        }
    }
}
