using ecommerce_topicos3.Interfaces;
using ecommerce_topicos3.Models;
using Microsoft.EntityFrameworkCore;

namespace ecommerce_topicos3.Repositories
{
    public class CompraRepository : ICompraRepository
    {

        private readonly EcommerceContext _context;

        public CompraRepository(EcommerceContext context)
        {
            _context = context;
        }

        public void Incluir(Compra compra)
        {
            _context.Compra.Add(compra);
        }

        public void Alterar(Compra compra)
        {
            _context.Entry(compra).State = EntityState.Modified;
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<IEnumerable<Compra>> SelecionarTodos()
        {
            return await _context.Compra.ToListAsync();
        }

        public async Task<IEnumerable<Compra>> SelecionarPorUsuario(long idUsuario)
        {
            return await _context.Compra.Where(compra => compra.UsuarioId == idUsuario)
                                        .Include(compra => compra.Endereco)
                                            .ThenInclude(endereco => endereco.Cidade)
                                                .ThenInclude(cidade => cidade.Estado)
                                        .Include(compra => compra.Usuario)
                                        .Include(compra => compra.ItemCompra)
                                            .ThenInclude(itemCompra => itemCompra.Game)
                                        .ToListAsync();
        }
    }
}
