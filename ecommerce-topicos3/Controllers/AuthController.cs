using ecommerce_topicos3.DTO;
using ecommerce_topicos3.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace ecommerce_topicos3.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly ITokenService _tokenService;

        private readonly IUsuarioRepository _usuarioRepository;

        public AuthController(ITokenService tokenService, IUsuarioRepository usuarioRepository)
        {
            _tokenService = tokenService;
            _usuarioRepository = usuarioRepository;
        }

        [HttpPost("login")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public IActionResult Login([FromBody] LoginDTO login)
        {
            var usuario = _usuarioRepository.SelecionarPorUsername(login.Username);

            if (usuario == null)
            {
                return NotFound("Username inválido");
            }

            if (!_tokenService.VerifyPassword(login.Senha, usuario.Senha))
            {
                return NotFound("Senha inválida");
            }

            var token = _tokenService.GenerateToken(usuario);

            Response.Headers.Append("Authorization", token);

            return Ok(usuario);
        }
    }
}
