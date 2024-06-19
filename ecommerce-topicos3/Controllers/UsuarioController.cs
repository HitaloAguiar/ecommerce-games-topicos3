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
using ecommerce_topicos3.Services;
using Microsoft.VisualStudio.Web.CodeGenerators.Mvc.Templates.BlazorIdentity.Pages;

namespace ecommerce_topicos3.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuarioController : ControllerBase
    {
        private readonly EcommerceContext _context;
        private readonly IMapper _mapper;
        private readonly IUsuarioRepository _usuarioRepository;
        private readonly ITokenService _tokenService;


        public UsuarioController(EcommerceContext context, IMapper mapper, IUsuarioRepository usuarioRepository, ITokenService tokenService)
        {
            _context = context;
            _mapper = mapper;
            _usuarioRepository = usuarioRepository;
            _tokenService = tokenService;
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
        public async Task<ActionResult<Usuario>> GetUsuario(long id)
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
        public async Task<IActionResult> PutUsuario(long id, UsuarioDTO usuarioDTO)
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

            var listUsuario = await _usuarioRepository.SelecionarTodos();

            foreach (var usuario in listUsuario)
            {
                if (usuarioDTO.Username.Equals(usuario.Username))
                {
                    return BadRequest("Esse username já foi cadastrado");
                }
            }

            Usuario usuarioUpdate = new Usuario();

            usuarioUpdate.Nome = usuarioDTO.Nome;
            usuarioUpdate.Cpf = usuarioDTO.Cpf;
            usuarioUpdate.Perfil = usuarioDTO.Perfil;
            usuarioUpdate.Senha = _tokenService.HashPassword(usuarioDTO.Senha);
            usuarioUpdate.Email = usuarioDTO.Email;
            usuarioUpdate.Username = usuarioDTO.Username;
            usuarioUpdate.Telefone = usuarioDTO.Telefone;

            _usuarioRepository.Incluir(usuarioUpdate);
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

        [HttpGet("/endereco/{id}")]
        public async Task<ActionResult<Usuario>> GetEndereco(int id)
        {
            var usuario = await _usuarioRepository.SelecionarPorId(id);

            if (usuario == null)
            {
                return NotFound("Usuario não encontrado");
            }

            if (usuario.EnderecoPrincipal == null)
            {
                return NotFound("Usuário ainda não possui endereço");
            }

            return Ok(_mapper.Map<EnderecoResponseDTO>(usuario.EnderecoPrincipal));
        }

        [HttpPut("/endereco/{id}")]
        public async Task<IActionResult> insertEndereco(int id, EnderecoDTO enderecoDTO)
        {
            var usuario = await _usuarioRepository.SelecionarPorId(id);

            var endereco = new Endereco
            {
                Logradouro = enderecoDTO.Logradouro,
                Bairro = enderecoDTO.Bairro,
                Numero = enderecoDTO.Numero,
                Complemento = enderecoDTO.Complemento,
                Cep = enderecoDTO.Cep,
                CidadeId = enderecoDTO.CidadeId
            };

            usuario.EnderecoPrincipal = endereco;

            _usuarioRepository.Alterar(usuario);
            if (await _usuarioRepository.SaveAllAsync())
            {
                return Ok("Endereço alterado com sucesso");
            }

            return BadRequest("Erro ao alterar endereço");
        }

        [HttpGet("/verifica-senha/{senha}/{id}")]
        public async Task<ActionResult<Boolean>> verificaSenhaAtual(long id, string senhaAtual)
        {
            var usuario = await _usuarioRepository.SelecionarPorId(id);

            if (!_tokenService.VerifyPassword(senhaAtual, usuario.Senha))
            {
                return false;
            }

            return true;
        }

        [HttpPut("/update/senha/{id}")]
        public async Task<IActionResult> updateSenha(int id, SenhaDTO senhaDTO)
        {
            var usuario = await _usuarioRepository.SelecionarPorId(id);

            if (senhaDTO.NovaSenha.Equals(senhaDTO.ConfirmarNovaSenha))
            {
                usuario.Senha = _tokenService.HashPassword(senhaDTO.NovaSenha);
            }

            else
            {
                return BadRequest("Os campos nova senha e confirmação da senha não correspondem");
            }

            _usuarioRepository.Alterar(usuario);
            if (await _usuarioRepository.SaveAllAsync())
            {
                return Ok("Senha alterado com sucesso");
            }

            return BadRequest("Erro ao alterar senha");
        }
    }
}
