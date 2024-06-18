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
            var token = _tokenService.GenerateToken(login);

            var usuario = _usuarioRepository.SelecionarPorEmail(login.Email);

            if (token == "" || token == null)
            {
                return Unauthorized();
            }

            string json = JsonConvert.SerializeObject(token);

            return Ok(json);
        }
    }
}
