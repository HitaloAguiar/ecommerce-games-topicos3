﻿using ecommerce_topicos3.Models;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace ecommerce_topicos3.DTO
{
    public class CidadeDTO
    {

        [StringLength(255)]
        public string Nome { get; set; }

        public long Estado { get; set; }
    }
}
