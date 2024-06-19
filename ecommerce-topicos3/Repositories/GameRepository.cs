using ecommerce_topicos3.Interfaces;
using ecommerce_topicos3.Models;
using Microsoft.EntityFrameworkCore;

namespace ecommerce_topicos3.Repositories
{
    public class GameRepository : IGameRepository
    {
        private readonly EcommerceContext _context;

        public GameRepository(EcommerceContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Game>> SelecionarTodos()
        {
            return await _context.Game.ToListAsync();
        }

        public async Task<Game> SelecionarPorId(long id)
        {
            var game = await _context.Game.Where(x => x.Id == id).FirstOrDefaultAsync();
            return game;
        }

        public void Alterar(Game game)
        {
            _context.Entry(game).State = EntityState.Modified;
        }

        public void Excluir(Game game)
        {
            _context.Game.Remove(game);
        }

        public void Incluir(Game game)
        {
            _context.Game.Add(game);
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }
    }
}
