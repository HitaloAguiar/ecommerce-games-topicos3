using ecommerce_topicos3.Models;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace ecommerce_topicos3.DTO
{
    public class ItemCompraResponseDTO
    {

        public int Quantidade { get; set; }

        public double PrecoUnitario { get; set; }

        [Column("compraId")]
        public long CompraId { get; set; }

        public virtual GameResponseDTO Game { get; set; }
    }
}
