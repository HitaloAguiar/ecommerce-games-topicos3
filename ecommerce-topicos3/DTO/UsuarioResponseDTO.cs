using ecommerce_topicos3.Models;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace ecommerce_topicos3.DTO
{
    public class UsuarioResponseDTO
    {
        public long Id { get; set; }

        [StringLength(255)]
        public string Nome { get; set; }

        [StringLength(255)]
        public string Email { get; set; }

        [StringLength(255)]
        public string Username { get; set; }

        //[StringLength(255)]
        //public string Senha { get; set; }

        [StringLength(14)]
        public string Cpf { get; set; }

        [StringLength(20)]
        public string Telefone { get; set; }

        [StringLength(50)]
        public string Perfil { get; set; }
    }
}
