using ecommerce_topicos3.Models;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace ecommerce_topicos3.DTO
{
    public class ItemCompraDTO
    {

        public int Quantidade { get; set; }

        public double PrecoUnitario { get; set; }

        public long GameId { get; set; }
    }
}
