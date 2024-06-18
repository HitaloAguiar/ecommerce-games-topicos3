using ecommerce_topicos3.Models;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace ecommerce_topicos3.DTO
{
    public class CidadeResponseDTO
    {
        public long Id { get; set; }

        [StringLength(255)]
        public string Nome { get; set; }

        public long EstadoId { get; set; }
    }
}
