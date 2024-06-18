using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace ecommerce_topicos3.DTO
{
    public class EstadoResponseDTO
    {
        public long Id { get; set; }

        [StringLength(255)]
        public string Nome { get; set; }

        [StringLength(2)]
        public string Sigla { get; set; }
    }
}
