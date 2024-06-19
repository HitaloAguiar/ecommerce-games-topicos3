﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using ecommerce_topicos3.Models;

#nullable disable

namespace ecommerce_topicos3.Migrations
{
    [DbContext(typeof(EcommerceContext))]
    partial class EcommerceContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.6")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("GameUsuario", b =>
                {
                    b.Property<long>("GameId")
                        .HasColumnType("bigint");

                    b.Property<long>("UsuarioId")
                        .HasColumnType("bigint");

                    b.HasKey("GameId", "UsuarioId");

                    b.ToTable("GameUsuario");
                });

            modelBuilder.Entity("UsuarioGame", b =>
                {
                    b.Property<long>("UsuarioId")
                        .HasColumnType("bigint")
                        .HasColumnName("usuarioId");

                    b.Property<long>("GameId")
                        .HasColumnType("bigint")
                        .HasColumnName("gameId");

                    b.HasKey("UsuarioId", "GameId")
                        .HasName("PK__UsuarioG__9818A0CB54259B77");

                    b.HasIndex("GameId");

                    b.ToTable("UsuarioGame");
                });

            modelBuilder.Entity("ecommerce_topicos3.Models.Cidade", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasColumnName("id");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<long>("Id"));

                    b.Property<long>("EstadoId")
                        .HasColumnType("bigint")
                        .HasColumnName("estadoId");

                    b.Property<string>("Nome")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)")
                        .HasColumnName("nome");

                    b.HasKey("Id")
                        .HasName("PK__Cidade__3213E83FF7904673");

                    b.HasIndex("EstadoId");

                    b.ToTable("Cidade");
                });

            modelBuilder.Entity("ecommerce_topicos3.Models.Compra", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasColumnName("id");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<long>("Id"));

                    b.Property<DateOnly>("DataCompra")
                        .HasColumnType("date")
                        .HasColumnName("dataCompra");

                    b.Property<long>("EnderecoId")
                        .HasColumnType("bigint")
                        .HasColumnName("enderecoId");

                    b.Property<string>("FormaPagamento")
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)")
                        .HasColumnName("formaPagamento");

                    b.Property<bool>("IfConcluida")
                        .HasColumnType("bit")
                        .HasColumnName("ifConcluida");

                    b.Property<double>("TotalCompra")
                        .HasColumnType("float")
                        .HasColumnName("totalCompra");

                    b.Property<long>("UsuarioId")
                        .HasColumnType("bigint")
                        .HasColumnName("usuarioId");

                    b.HasKey("Id")
                        .HasName("PK__Compra__3213E83FD25CAA14");

                    b.HasIndex("EnderecoId");

                    b.HasIndex("FormaPagamento");

                    b.HasIndex("UsuarioId");

                    b.ToTable("Compra");
                });

            modelBuilder.Entity("ecommerce_topicos3.Models.Endereco", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasColumnName("id");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<long>("Id"));

                    b.Property<string>("Bairro")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)")
                        .HasColumnName("bairro");

                    b.Property<string>("Cep")
                        .IsRequired()
                        .HasMaxLength(20)
                        .HasColumnType("nvarchar(20)")
                        .HasColumnName("cep");

                    b.Property<long>("CidadeId")
                        .HasColumnType("bigint")
                        .HasColumnName("cidadeId");

                    b.Property<string>("Complemento")
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)")
                        .HasColumnName("complemento");

                    b.Property<string>("Logradouro")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)")
                        .HasColumnName("logradouro");

                    b.Property<string>("Numero")
                        .IsRequired()
                        .HasMaxLength(20)
                        .HasColumnType("nvarchar(20)")
                        .HasColumnName("numero");

                    b.HasKey("Id")
                        .HasName("PK__Endereco__3213E83FC7B4E591");

                    b.HasIndex("CidadeId");

                    b.ToTable("Endereco");
                });

            modelBuilder.Entity("ecommerce_topicos3.Models.Estado", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasColumnName("id");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<long>("Id"));

                    b.Property<string>("Nome")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)")
                        .HasColumnName("nome");

                    b.Property<string>("Sigla")
                        .IsRequired()
                        .HasMaxLength(10)
                        .HasColumnType("nvarchar(10)")
                        .HasColumnName("sigla");

                    b.HasKey("Id")
                        .HasName("PK__Estado__3213E83FBCDD2309");

                    b.ToTable("Estado");
                });

            modelBuilder.Entity("ecommerce_topicos3.Models.FormaPagamento", b =>
                {
                    b.Property<string>("FormaPagamento1")
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)")
                        .HasColumnName("formaPagamento");

                    b.Property<int>("Value")
                        .HasColumnType("int")
                        .HasColumnName("value");

                    b.HasKey("FormaPagamento1")
                        .HasName("PK__FormaPag__6D0CEE4DC0070E51");

                    b.ToTable("FormaPagamento");
                });

            modelBuilder.Entity("ecommerce_topicos3.Models.Game", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasColumnName("id");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<long>("Id"));

                    b.Property<string>("Descricao")
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("descricao");

                    b.Property<string>("Developer")
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)")
                        .HasColumnName("developer");

                    b.Property<string>("Genero")
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("genero");

                    b.Property<string>("Nome")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)")
                        .HasColumnName("nome");

                    b.Property<string>("Plataforma")
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)")
                        .HasColumnName("plataforma");

                    b.Property<double>("Preco")
                        .HasColumnType("float")
                        .HasColumnName("preco");

                    b.HasKey("Id")
                        .HasName("PK__Game__3213E83F08EE263F");

                    b.ToTable("Game");
                });

            modelBuilder.Entity("ecommerce_topicos3.Models.ItemCompra", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasColumnName("id");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<long>("Id"));

                    b.Property<long>("CompraId")
                        .HasColumnType("bigint")
                        .HasColumnName("compraId");

                    b.Property<long>("GameId")
                        .HasColumnType("bigint")
                        .HasColumnName("gameId");

                    b.Property<double>("PrecoUnitario")
                        .HasColumnType("float")
                        .HasColumnName("precoUnitario");

                    b.Property<int>("Quantidade")
                        .HasColumnType("int")
                        .HasColumnName("quantidade");

                    b.HasKey("Id")
                        .HasName("PK__ItemComp__3213E83F5E9F0B85");

                    b.HasIndex("CompraId");

                    b.HasIndex("GameId");

                    b.ToTable("ItemCompra");
                });

            modelBuilder.Entity("ecommerce_topicos3.Models.Pagamento", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasColumnName("id");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<long>("Id"));

                    b.Property<bool>("ConfirmacaoPagamento")
                        .HasColumnType("bit")
                        .HasColumnName("confirmacaoPagamento");

                    b.Property<DateOnly>("DataConfirmacaoPagamento")
                        .HasColumnType("date")
                        .HasColumnName("dataConfirmacaoPagamento");

                    b.Property<string>("FormaPagamento")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)")
                        .HasColumnName("formaPagamento");

                    b.Property<double>("Valor")
                        .HasColumnType("float")
                        .HasColumnName("valor");

                    b.HasKey("Id")
                        .HasName("PK__Pagament__3213E83F6551E78C");

                    b.HasIndex("FormaPagamento");

                    b.ToTable("Pagamento");
                });

            modelBuilder.Entity("ecommerce_topicos3.Models.Perfil", b =>
                {
                    b.Property<string>("Perfil1")
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)")
                        .HasColumnName("perfil");

                    b.Property<int>("Value")
                        .HasColumnType("int")
                        .HasColumnName("value");

                    b.HasKey("Perfil1")
                        .HasName("PK__Perfil__3BB8AEC34BDD3646");

                    b.ToTable("Perfil");
                });

            modelBuilder.Entity("ecommerce_topicos3.Models.Usuario", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasColumnName("id");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<long>("Id"));

                    b.Property<string>("Cpf")
                        .IsRequired()
                        .HasMaxLength(14)
                        .HasColumnType("nvarchar(14)")
                        .HasColumnName("cpf");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)")
                        .HasColumnName("email");

                    b.Property<long?>("EnderecoId")
                        .HasColumnType("bigint")
                        .HasColumnName("enderecoId");

                    b.Property<long?>("EnderecoPrincipalId")
                        .HasColumnType("bigint")
                        .HasColumnName("enderecoPrincipalId");

                    b.Property<string>("Nome")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)")
                        .HasColumnName("nome");

                    b.Property<string>("Perfil")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)")
                        .HasColumnName("perfil");

                    b.Property<string>("Senha")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)")
                        .HasColumnName("senha");

                    b.Property<string>("Telefone")
                        .IsRequired()
                        .HasMaxLength(20)
                        .HasColumnType("nvarchar(20)")
                        .HasColumnName("telefone");

                    b.Property<string>("Username")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)")
                        .HasColumnName("username");

                    b.HasKey("Id")
                        .HasName("PK__Usuario__3213E83F9E55CD3A");

                    b.HasIndex("EnderecoPrincipalId");

                    b.HasIndex("Perfil");

                    b.ToTable("Usuario");
                });

            modelBuilder.Entity("UsuarioGame", b =>
                {
                    b.HasOne("ecommerce_topicos3.Models.Game", null)
                        .WithMany()
                        .HasForeignKey("GameId")
                        .IsRequired()
                        .HasConstraintName("FK_UsuarioGame_Game");

                    b.HasOne("ecommerce_topicos3.Models.Usuario", null)
                        .WithMany()
                        .HasForeignKey("UsuarioId")
                        .IsRequired()
                        .HasConstraintName("FK_UsuarioGame_Usuario");
                });

            modelBuilder.Entity("ecommerce_topicos3.Models.Cidade", b =>
                {
                    b.HasOne("ecommerce_topicos3.Models.Estado", "Estado")
                        .WithMany("Cidade")
                        .HasForeignKey("EstadoId")
                        .IsRequired()
                        .HasConstraintName("FK_Cidade_Estado");

                    b.Navigation("Estado");
                });

            modelBuilder.Entity("ecommerce_topicos3.Models.Compra", b =>
                {
                    b.HasOne("ecommerce_topicos3.Models.Endereco", "Endereco")
                        .WithMany("Compra")
                        .HasForeignKey("EnderecoId")
                        .IsRequired()
                        .HasConstraintName("FK_Compra_Endereco");

                    b.HasOne("ecommerce_topicos3.Models.FormaPagamento", "FormaPagamentoNavigation")
                        .WithMany("Compra")
                        .HasForeignKey("FormaPagamento")
                        .HasConstraintName("FK_Compra_FormaPagamento");

                    b.HasOne("ecommerce_topicos3.Models.Usuario", "Usuario")
                        .WithMany("Compra")
                        .HasForeignKey("UsuarioId")
                        .IsRequired()
                        .HasConstraintName("FK_Compra_Usuario");

                    b.Navigation("Endereco");

                    b.Navigation("FormaPagamentoNavigation");

                    b.Navigation("Usuario");
                });

            modelBuilder.Entity("ecommerce_topicos3.Models.Endereco", b =>
                {
                    b.HasOne("ecommerce_topicos3.Models.Cidade", "Cidade")
                        .WithMany("Endereco")
                        .HasForeignKey("CidadeId")
                        .IsRequired()
                        .HasConstraintName("FK_Endereco_Cidade");

                    b.Navigation("Cidade");
                });

            modelBuilder.Entity("ecommerce_topicos3.Models.ItemCompra", b =>
                {
                    b.HasOne("ecommerce_topicos3.Models.Compra", "Compra")
                        .WithMany("ItemCompra")
                        .HasForeignKey("CompraId")
                        .IsRequired()
                        .HasConstraintName("FK_ItemCompra_Compra");

                    b.HasOne("ecommerce_topicos3.Models.Game", "Game")
                        .WithMany("ItemCompra")
                        .HasForeignKey("GameId")
                        .IsRequired()
                        .HasConstraintName("FK_ItemCompra_Game");

                    b.Navigation("Compra");

                    b.Navigation("Game");
                });

            modelBuilder.Entity("ecommerce_topicos3.Models.Pagamento", b =>
                {
                    b.HasOne("ecommerce_topicos3.Models.FormaPagamento", "FormaPagamentoNavigation")
                        .WithMany("Pagamento")
                        .HasForeignKey("FormaPagamento")
                        .IsRequired()
                        .HasConstraintName("FK_Pagamento_FormaPagamento");

                    b.Navigation("FormaPagamentoNavigation");
                });

            modelBuilder.Entity("ecommerce_topicos3.Models.Usuario", b =>
                {
                    b.HasOne("ecommerce_topicos3.Models.Endereco", "EnderecoPrincipal")
                        .WithMany("Usuario")
                        .HasForeignKey("EnderecoPrincipalId")
                        .HasConstraintName("FK_Usuario_Endereco");

                    b.HasOne("ecommerce_topicos3.Models.Perfil", "PerfilNavigation")
                        .WithMany("Usuario")
                        .HasForeignKey("Perfil")
                        .IsRequired()
                        .HasConstraintName("FK_Usuario_Perfil");

                    b.Navigation("EnderecoPrincipal");

                    b.Navigation("PerfilNavigation");
                });

            modelBuilder.Entity("ecommerce_topicos3.Models.Cidade", b =>
                {
                    b.Navigation("Endereco");
                });

            modelBuilder.Entity("ecommerce_topicos3.Models.Compra", b =>
                {
                    b.Navigation("ItemCompra");
                });

            modelBuilder.Entity("ecommerce_topicos3.Models.Endereco", b =>
                {
                    b.Navigation("Compra");

                    b.Navigation("Usuario");
                });

            modelBuilder.Entity("ecommerce_topicos3.Models.Estado", b =>
                {
                    b.Navigation("Cidade");
                });

            modelBuilder.Entity("ecommerce_topicos3.Models.FormaPagamento", b =>
                {
                    b.Navigation("Compra");

                    b.Navigation("Pagamento");
                });

            modelBuilder.Entity("ecommerce_topicos3.Models.Game", b =>
                {
                    b.Navigation("ItemCompra");
                });

            modelBuilder.Entity("ecommerce_topicos3.Models.Perfil", b =>
                {
                    b.Navigation("Usuario");
                });

            modelBuilder.Entity("ecommerce_topicos3.Models.Usuario", b =>
                {
                    b.Navigation("Compra");
                });
#pragma warning restore 612, 618
        }
    }
}
