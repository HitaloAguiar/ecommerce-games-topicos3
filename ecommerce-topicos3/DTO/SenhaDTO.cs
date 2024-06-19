using System.ComponentModel.DataAnnotations;

namespace ecommerce_topicos3.DTO
{
    public class SenhaDTO
    {
        [Required]
        [StringLength(255)]
        public string NovaSenha { get; set; }

        [Required]
        [StringLength(255)]
        public string ConfirmarNovaSenha { get; set; }
    }
}
