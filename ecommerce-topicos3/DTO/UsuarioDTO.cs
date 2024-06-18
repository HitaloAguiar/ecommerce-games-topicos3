using ecommerce_topicos3.Models;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace ecommerce_topicos3.DTO
{
    public class UsuarioDTO
    {

        [Required]
        [StringLength(255)]
        public string Nome { get; set; }

        [Required]
        [StringLength(255)]
        public string Email { get; set; }

        [Required]
        [StringLength(255)]
        public string Username { get; set; }

        [Required]
        [StringLength(255)]
        public string Senha { get; set; }

        [Required]
        [StringLength(14)]
        public string Cpf { get; set; }

        [Required]
        [StringLength(20)]
        public string Telefone { get; set; }

        [Required]
        [StringLength(50)]
        public string Perfil { get; set; }
    }
}
