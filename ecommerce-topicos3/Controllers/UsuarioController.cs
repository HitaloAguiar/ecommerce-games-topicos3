using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ecommerce_topicos3.Models;
using AutoMapper;
using ecommerce_topicos3.DTO;
using ecommerce_topicos3.Interfaces;

namespace ecommerce_topicos3.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuarioController : ControllerBase
    {
        private readonly EcommerceContext _context;
        private readonly IMapper _mapper;
        private readonly IUsuarioRepository _usuarioRepository;


        public UsuarioController(EcommerceContext context, IMapper mapper, IUsuarioRepository usuarioRepository)
        {
            _context = context;
            _mapper = mapper;
            _usuarioRepository = usuarioRepository;
        }

        // GET: api/Usuario
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Usuario>>> GetAllUsuario()
        {
            var listUsuario = await _usuarioRepository.SelecionarTodos();
            var listUsuarioResponseDTO = _mapper.Map<IEnumerable<UsuarioResponseDTO>>(listUsuario);

            return Ok(listUsuarioResponseDTO);
        }

        // GET: api/Usuario/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Usuario>> GetUsuario(int id)
        {
            var usuario = await _usuarioRepository.SelecionarPorId(id);

            if (usuario == null)
            {
                return NotFound("Usuario não encontrado");
            }

            return Ok(_mapper.Map<UsuarioResponseDTO>(usuario));
        }

        // PUT: api/Usuario/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUsuario(int id, UsuarioDTO usuarioDTO)
        {
            var updateUsuario = await _usuarioRepository.SelecionarPorId(id);

            updateUsuario.Nome = usuarioDTO.Nome;
            updateUsuario.Cpf = usuarioDTO.Cpf;
            updateUsuario.Perfil = usuarioDTO.Perfil;
            updateUsuario.Senha = usuarioDTO.Senha;
            updateUsuario.Email = usuarioDTO.Email;
            updateUsuario.Username = usuarioDTO.Username;
            updateUsuario.Telefone = usuarioDTO.Telefone;

            _usuarioRepository.Alterar(updateUsuario);
            if (await _usuarioRepository.SaveAllAsync())
            {
                return Ok("Usuario alterado com sucesso");
            }

            return BadRequest("Erro ao alterar usuario");
        }

        // POST: api/Usuario
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult> PostUsuario(UsuarioDTO usuarioDTO)
        {
            _usuarioRepository.Incluir(_mapper.Map<Usuario>(usuarioDTO));
            if (await _usuarioRepository.SaveAllAsync())
            {
                return Ok("Usuario cadastrado com sucesso");
            }

            return BadRequest("Erro ao salvar usuario");
        }

        // DELETE: api/Usuario/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUsuario(int id)
        {
            var usuario = await _usuarioRepository.SelecionarPorId(id);

            _usuarioRepository.Excluir(usuario);
            if (await _usuarioRepository.SaveAllAsync())
            {
                return Ok("Usuario excluido com sucesso");
            }

            return BadRequest("Erro ao excluir usuario");
        }

        private bool UsuarioExists(long id)
        {
            return _context.Usuario.Any(e => e.Id == id);
        }
    }
}
