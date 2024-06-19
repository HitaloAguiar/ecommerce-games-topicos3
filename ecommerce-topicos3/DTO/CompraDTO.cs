using ecommerce_topicos3.Models;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace ecommerce_topicos3.DTO
{
    public class CompraDTO
    {

        public virtual EnderecoDTO Endereco { get; set; }

        [StringLength(50)]
        public string FormaPagamento { get; set; }

        public virtual ICollection<ItemCompraDTO> ItemCompraDTO { get; set; } = new List<ItemCompraDTO>();
    }
}
