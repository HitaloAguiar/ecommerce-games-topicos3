using ecommerce_topicos3.Interfaces;
using ecommerce_topicos3.Models;
using Microsoft.EntityFrameworkCore;

namespace ecommerce_topicos3.Repositories
{
    public class CidadeRepository : ICidadeRepository
    {

        private readonly EcommerceContext _context;

        public CidadeRepository(EcommerceContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Cidade>> SelecionarTodos()
        {
            return await _context.Cidade.ToListAsync();
        }

        public async Task<Cidade> SelecionarPorId(long id)
        {
            var cidade = await _context.Cidade.Where(x => x.Id == id).FirstOrDefaultAsync();
            return cidade;
        }

        public void Alterar(Cidade cidade)
        {
            _context.Entry(cidade).State = EntityState.Modified;
        }

        public void Excluir(Cidade cidade)
        {
            _context.Cidade.Remove(cidade);
        }

        public void Incluir(Cidade cidade)
        {
            _context.Cidade.Add(cidade);
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }
    }
}
