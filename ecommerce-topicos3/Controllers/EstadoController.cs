using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ecommerce_topicos3.Models;
using ecommerce_topicos3.DTO;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using ecommerce_topicos3.Interfaces;
using ecommerce_topicos3.Repositories;

namespace ecommerce_topicos3.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EstadoController : ControllerBase
    {
        private readonly EcommerceContext _context;

        private readonly IMapper _mapper;

        private readonly IEstadoRepository _estadoRepository;

        public EstadoController(EcommerceContext context, IMapper mapper, IEstadoRepository estadoRepository)
        {
            _context = context;
            _mapper = mapper;
            _estadoRepository = estadoRepository;
        }

        // GET: api/Estado
        [HttpGet]
        //[Authorize(Roles = "USER, ADMIN")]
        public async Task<ActionResult<IEnumerable<Estado>>> GetAllEstado()
        {
            var estados = await _estadoRepository.SelecionarTodos();
            var listEstadoResponseDTO = _mapper.Map<IEnumerable<EstadoResponseDTO>>(estados);

            return Ok(listEstadoResponseDTO);
        }

        // GET: api/Estado/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Estado>> GetEstado(long id)
        {
            var estado = await _estadoRepository.SelecionarPorId(id);

            if (estado == null)
            {
                return NotFound("Estado não encontrado");
            }
            return Ok(_mapper.Map<EstadoResponseDTO>(estado));
        }

        // PUT: api/Estado/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutEstado(int id, EstadoDTO estadoDTO)
        {
            var updateEstado = await _estadoRepository.SelecionarPorId(id);

            updateEstado.Nome = estadoDTO.Nome;
            updateEstado.Sigla = estadoDTO.Sigla;

            _estadoRepository.Alterar(updateEstado);
            if (await _estadoRepository.SaveAllAsync())
            {
                return Ok("Estado alterado com sucesso");
            }

            return BadRequest("Erro ao alterar estado");
        }

        // POST: api/Estado
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult> PostEstado(EstadoDTO estadoDTO)
        {
            _estadoRepository.Incluir(_mapper.Map<Estado>(estadoDTO));
            if (await _estadoRepository.SaveAllAsync())
            {
                return Ok("Estado cadastrado com sucesso");
            }

            return BadRequest("Erro ao salvar estado");
        }

        // DELETE: api/Estado/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEstado(int id)
        {
            var usuario = await _estadoRepository.SelecionarPorId(id);

            _estadoRepository.Excluir(usuario);
            if (await _estadoRepository.SaveAllAsync())
            {
                return Ok("Estado excluido com sucesso");
            }

            return BadRequest("Erro ao excluir estado");
        }

        private bool EstadoExists(long id)
        {
            return _context.Estado.Any(e => e.Id == id);
        }
    }
}
