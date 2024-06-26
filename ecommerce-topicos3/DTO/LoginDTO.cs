﻿using System.ComponentModel.DataAnnotations;

namespace ecommerce_topicos3.DTO
{
    public class LoginDTO
    {
        [Required]
        [StringLength(255)]
        public string Username { get; set; }

        [Required]
        [StringLength(255)]
        public string Senha { get; set; }
    }
}
