using ecommerce_topicos3.Interfaces;
using ecommerce_topicos3.Models;
using Microsoft.EntityFrameworkCore;

namespace ecommerce_topicos3.Repositories
{
    public class EstadoRepository : IEstadoRepository
    {
        private readonly EcommerceContext _context;

        public EstadoRepository(EcommerceContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Estado>> SelecionarTodos()
        {
            return await _context.Estado.ToListAsync();
        }

        public async Task<Estado> SelecionarPorId(long id)
        {
            var estado = await _context.Estado.Where(x => x.Id == id).FirstOrDefaultAsync();
            return estado;
        }

        public void Alterar(Estado estado)
        {
            _context.Entry(estado).State = EntityState.Modified;
        }

        public void Excluir(Estado estado)
        {
            _context.Estado.Remove(estado);
        }

        public void Incluir(Estado estado)
        {
            _context.Estado.Add(estado);
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }
    }
}
