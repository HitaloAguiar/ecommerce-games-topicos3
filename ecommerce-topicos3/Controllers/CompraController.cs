using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ecommerce_topicos3.Models;
using System.Security.Claims;
using AutoMapper;
using ecommerce_topicos3.Interfaces;
using ecommerce_topicos3.DTO;
using ecommerce_topicos3.Repositories;

namespace ecommerce_topicos3.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CompraController : ControllerBase
    {
        private readonly EcommerceContext _context;

        private readonly IMapper _mapper;

        private readonly IUsuarioRepository _usuarioRepository;

        private readonly ICompraRepository _compraRepository;

        public CompraController(EcommerceContext context, IMapper mapper, IUsuarioRepository usuarioRepository, ICompraRepository compraRepository)
        {
            _context = context;
            _mapper = mapper;
            _usuarioRepository = usuarioRepository;
            _compraRepository = compraRepository;
        }

        // GET: api/Compras
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Compra>>> GetAllCompra()
        {

            var username = User.Identity.Name;

            var usuario = _usuarioRepository.SelecionarPorUsername(username);

            var compras = await _compraRepository.SelecionarPorUsuario(usuario.Id);
            var listCompraResponseDTO = _mapper.Map<IEnumerable<CompraResponseDTO>>(compras);

            return Ok(listCompraResponseDTO);
        }

        // POST: api/Compras
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Compra>> PostCompra(CompraDTO compraDTO)
        {
            Compra compra = new Compra();

            compra.DataCompra = DateOnly.FromDateTime(DateTime.Now);

            double total = 0.0;

            foreach (var item in compraDTO.ItemCompraDTO)
            {
                total += (item.PrecoUnitario * item.Quantidade);
            }

            compra.TotalCompra = total;

            var itensCompra = compraDTO.ItemCompraDTO.Select(itemDTO => new ItemCompra
            {
                GameId = itemDTO.GameId,
                Quantidade = itemDTO.Quantidade,
                PrecoUnitario = itemDTO.PrecoUnitario
                // Definir outras propriedades se necessário
            }).ToList();

            compra.ItemCompra = itensCompra;

            Usuario usuario = _usuarioRepository.SelecionarPorUsername(User.Identity.Name);

            compra.UsuarioId = usuario.Id;
            // compra.Usuario = usuario;

            compra.FormaPagamento = compraDTO.FormaPagamento;

            var endereco = new Endereco
            {
                Logradouro = compraDTO.Endereco.Logradouro,
                Bairro = compraDTO.Endereco.Bairro,
                Numero = compraDTO.Endereco.Numero,
                Complemento = compraDTO.Endereco.Complemento,
                Cep = compraDTO.Endereco.Cep,
                CidadeId = compraDTO.Endereco.CidadeId
            };

            compra.Endereco = endereco;

            _compraRepository.Incluir(compra);
            if (await _compraRepository.SaveAllAsync())
            {
                return Ok("Compra salva com sucesso");
            }

            return BadRequest("Erro ao salvar compra");
        }
    }
}
