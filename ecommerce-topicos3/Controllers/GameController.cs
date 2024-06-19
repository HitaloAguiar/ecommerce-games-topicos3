using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ecommerce_topicos3.Models;
using AutoMapper;
using ecommerce_topicos3.Interfaces;
using ecommerce_topicos3.DTO;

namespace ecommerce_topicos3.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GameController : ControllerBase
    {
        private readonly EcommerceContext _context;

        private readonly IMapper _mapper;

        private readonly IGameRepository _gameRepository;

        public GameController(EcommerceContext context, IMapper mapper, IGameRepository gameRepository)
        {
            _context = context;
            _mapper = mapper;
            _gameRepository = gameRepository;
        }

        // GET: api/Game
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Game>>> GetAllGame()
        {
            var games = await _gameRepository.SelecionarTodos();
            var listGameResponseDTO = _mapper.Map<IEnumerable<GameResponseDTO>>(games);

            return Ok(listGameResponseDTO);
        }

        // GET: api/Game/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Game>> GetGame(long id)
        {
            var game = await _gameRepository.SelecionarPorId(id);

            if (game == null)
            {
                return NotFound("Game não encontrado");
            }
            return Ok(_mapper.Map<GameResponseDTO>(game));
        }

        // PUT: api/Game/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutGame(long id, GameDTO gameDTO)
        {
            var updateGame = await _gameRepository.SelecionarPorId(id);

            updateGame.Nome = gameDTO.Nome;
            updateGame.Descricao = gameDTO.Descricao;
            updateGame.Preco = gameDTO.Preco;
            updateGame.Developer = gameDTO.Developer;
            updateGame.Genero = gameDTO.Genero;
            updateGame.Plataforma = gameDTO.Plataforma;

            _gameRepository.Alterar(updateGame);
            if (await _gameRepository.SaveAllAsync())
            {
                return Ok("Game alterado com sucesso");
            }

            return BadRequest("Erro ao alterar game");
        }

        // POST: api/Game
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Game>> PostGame(GameDTO gameDTO)
        {
            _gameRepository.Incluir(_mapper.Map<Game>(gameDTO));
            if (await _gameRepository.SaveAllAsync())
            {
                return Ok("Game cadastrado com sucesso");
            }

            return BadRequest("Erro ao salvar game");
        }

        // DELETE: api/Game/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteGame(long id)
        {
            var usuario = await _gameRepository.SelecionarPorId(id);

            _gameRepository.Excluir(usuario);
            if (await _gameRepository.SaveAllAsync())
            {
                return Ok("Game excluido com sucesso");
            }

            return BadRequest("Erro ao excluir game");
        }

        private bool GameExists(long id)
        {
            return _context.Game.Any(e => e.Id == id);
        }
    }
}
