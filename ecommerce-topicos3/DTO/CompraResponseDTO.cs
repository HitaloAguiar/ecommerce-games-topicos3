using ecommerce_topicos3.Models;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace ecommerce_topicos3.DTO
{
    public class CompraResponseDTO
    {
        public long Id { get; set; }

        public DateOnly DataCompra { get; set; }

        public double TotalCompra { get; set; }

        [StringLength(50)]
        public string FormaPagamento { get; set; }

        public virtual EnderecoResponseDTO Endereco { get; set; }

        public virtual ICollection<ItemCompraResponseDTO> ItemCompra { get; set; } = new List<ItemCompraResponseDTO>();

        public virtual UsuarioResponseDTO Usuario { get; set; }
    }
}
