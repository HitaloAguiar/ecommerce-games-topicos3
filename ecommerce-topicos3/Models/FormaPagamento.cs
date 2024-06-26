﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable disable
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace ecommerce_topicos3.Models;

public partial class FormaPagamento
{
    [Key]
    [Column("formaPagamento")]
    [StringLength(50)]
    public string FormaPagamento1 { get; set; }

    [Column("value")]
    public int Value { get; set; }

    [InverseProperty("FormaPagamentoNavigation")]
    public virtual ICollection<Compra> Compra { get; set; } = new List<Compra>();

    [InverseProperty("FormaPagamentoNavigation")]
    public virtual ICollection<Pagamento> Pagamento { get; set; } = new List<Pagamento>();
}