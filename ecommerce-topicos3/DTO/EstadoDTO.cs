using ecommerce_topicos3.Models;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace ecommerce_topicos3.DTO
{
    public class EstadoDTO
    {

        [Required]
        [StringLength(255)]
        public string Nome { get; set; }

        [Required]
        [StringLength(2)]
        public string Sigla { get; set; }
    }
}
