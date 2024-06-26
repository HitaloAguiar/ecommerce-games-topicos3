﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable disable
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace ecommerce_topicos3.Models;

public partial class Pagamento
{
    [Key]
    [Column("id")]
    public long Id { get; set; }

    [Column("confirmacaoPagamento")]
    public bool ConfirmacaoPagamento { get; set; }

    [Column("dataConfirmacaoPagamento")]
    public DateOnly DataConfirmacaoPagamento { get; set; }

    [Column("valor")]
    public double Valor { get; set; }

    [Required]
    [Column("formaPagamento")]
    [StringLength(50)]
    public string FormaPagamento { get; set; }

    [ForeignKey("FormaPagamento")]
    [InverseProperty("Pagamento")]
    public virtual FormaPagamento FormaPagamentoNavigation { get; set; }
}