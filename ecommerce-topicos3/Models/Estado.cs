﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable disable
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace ecommerce_topicos3.Models;

public partial class Estado
{
    [Key]
    [Column("id")]
    public long Id { get; set; }

    [Required]
    [Column("nome")]
    [StringLength(255)]
    public string Nome { get; set; }

    [Required]
    [Column("sigla")]
    [StringLength(10)]
    public string Sigla { get; set; }

    [InverseProperty("Estado")]
    public virtual ICollection<Cidade> Cidade { get; set; } = new List<Cidade>();
}