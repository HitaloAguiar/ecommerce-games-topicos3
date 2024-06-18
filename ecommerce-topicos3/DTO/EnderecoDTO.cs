using ecommerce_topicos3.Models;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace ecommerce_topicos3.DTO
{
    public class EnderecoDTO
    {

        [Required]
        [StringLength(255)]
        public string Logradouro { get; set; }

        [Required]
        [StringLength(255)]
        public string Bairro { get; set; }

        [Required]
        [StringLength(20)]
        public string Numero { get; set; }

        [StringLength(255)]
        public string Complemento { get; set; }

        [Required]
        [StringLength(20)]
        public string Cep { get; set; }

        public long CidadeId { get; set; }
    }
}
