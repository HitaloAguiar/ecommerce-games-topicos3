﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable disable
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace ecommerce_topicos3.Models;

public partial class Game
{
    [Key]
    [Column("id")]
    public long Id { get; set; }

    [Required]
    [Column("nome")]
    [StringLength(255)]
    public string Nome { get; set; }

    [Column("descricao")]
    public string Descricao { get; set; }

    [Column("preco")]
    public double Preco { get; set; }

    [Column("developer")]
    [StringLength(255)]
    public string Developer { get; set; }

    [Column("genero")]
    public string Genero { get; set; }

    [Column("plataforma")]
    [StringLength(255)]
    public string Plataforma { get; set; }

    [InverseProperty("Game")]
    public virtual ICollection<ItemCompra> ItemCompra { get; set; } = new List<ItemCompra>();

    [ForeignKey("GameId")]
    [InverseProperty("Game")]
    public virtual ICollection<Usuario> Usuario { get; set; } = new List<Usuario>();
}