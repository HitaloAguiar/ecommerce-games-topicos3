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
using ecommerce_topicos3.Repositories;

namespace ecommerce_topicos3.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CidadeController : ControllerBase
    {
        private readonly EcommerceContext _context;

        private readonly IMapper _mapper;

        private readonly ICidadeRepository _cidadeRepository;

        public CidadeController(EcommerceContext context, ICidadeRepository cidadeRepository, IMapper mapper)
        {
            _context = context;
            _cidadeRepository = cidadeRepository;
            _mapper = mapper;
        }

        // GET: api/Cidades
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Cidade>>> GetAllCidade()
        {
            var cidades = await _cidadeRepository.SelecionarTodos();
            var listCidadeResponseDTO = _mapper.Map<IEnumerable<CidadeResponseDTO>>(cidades);

            return Ok(listCidadeResponseDTO);
        }

        // GET: api/Cidades/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Cidade>> GetCidade(int id)
        {
            var cidade = await _cidadeRepository.SelecionarPorId(id);

            if (cidade == null)
            {
                return NotFound("Cidade não encontrado");
            }
            return Ok(_mapper.Map<CidadeResponseDTO>(cidade));
        }

        // PUT: api/Cidades/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCidade(int id, CidadeDTO cidadeDTO)
        {
            var updateCidade = await _cidadeRepository.SelecionarPorId(id);

            updateCidade.Nome = cidadeDTO.Nome;
            updateCidade.EstadoId = cidadeDTO.Estado;

            _cidadeRepository.Alterar(updateCidade);
            if (await _cidadeRepository.SaveAllAsync())
            {
                return Ok("Cidade alterado com sucesso");
            }

            return BadRequest("Erro ao alterar cidade");
        }

        // POST: api/Cidades
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Cidade>> PostCidade(CidadeDTO cidadeDTO)
        {
            _cidadeRepository.Incluir(_mapper.Map<Cidade>(cidadeDTO));
            if (await _cidadeRepository.SaveAllAsync())
            {
                return Ok("Cidade cadastrado com sucesso");
            }

            return BadRequest("Erro ao salvar cidade");
        }

        // DELETE: api/Cidades/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCidade(int id)
        {
            var usuario = await _cidadeRepository.SelecionarPorId(id);

            _cidadeRepository.Excluir(usuario);
            if (await _cidadeRepository.SaveAllAsync())
            {
                return Ok("Cidade excluido com sucesso");
            }

            return BadRequest("Erro ao excluir cidade");
        }

        private bool CidadeExists(long id)
        {
            return _context.Cidade.Any(e => e.Id == id);
        }
    }
}
