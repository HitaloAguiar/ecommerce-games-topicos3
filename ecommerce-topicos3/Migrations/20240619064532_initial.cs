using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ecommerce_topicos3.Migrations
{
    /// <inheritdoc />
    public partial class initial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Estado",
                columns: table => new
                {
                    id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    nome = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    sigla = table.Column<string>(type: "nvarchar(10)", maxLength: 10, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Estado__3213E83FBCDD2309", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "FormaPagamento",
                columns: table => new
                {
                    formaPagamento = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    value = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__FormaPag__6D0CEE4DC0070E51", x => x.formaPagamento);
                });

            migrationBuilder.CreateTable(
                name: "Game",
                columns: table => new
                {
                    id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    nome = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    descricao = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    preco = table.Column<double>(type: "float", nullable: false),
                    developer = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    genero = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    plataforma = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Game__3213E83F08EE263F", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "GameUsuario",
                columns: table => new
                {
                    GameId = table.Column<long>(type: "bigint", nullable: false),
                    UsuarioId = table.Column<long>(type: "bigint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GameUsuario", x => new { x.GameId, x.UsuarioId });
                });

            migrationBuilder.CreateTable(
                name: "Perfil",
                columns: table => new
                {
                    perfil = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    value = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Perfil__3BB8AEC34BDD3646", x => x.perfil);
                });

            migrationBuilder.CreateTable(
                name: "Cidade",
                columns: table => new
                {
                    id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    nome = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    estadoId = table.Column<long>(type: "bigint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Cidade__3213E83FF7904673", x => x.id);
                    table.ForeignKey(
                        name: "FK_Cidade_Estado",
                        column: x => x.estadoId,
                        principalTable: "Estado",
                        principalColumn: "id");
                });

            migrationBuilder.CreateTable(
                name: "Pagamento",
                columns: table => new
                {
                    id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    confirmacaoPagamento = table.Column<bool>(type: "bit", nullable: false),
                    dataConfirmacaoPagamento = table.Column<DateOnly>(type: "date", nullable: false),
                    valor = table.Column<double>(type: "float", nullable: false),
                    formaPagamento = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Pagament__3213E83F6551E78C", x => x.id);
                    table.ForeignKey(
                        name: "FK_Pagamento_FormaPagamento",
                        column: x => x.formaPagamento,
                        principalTable: "FormaPagamento",
                        principalColumn: "formaPagamento");
                });

            migrationBuilder.CreateTable(
                name: "Endereco",
                columns: table => new
                {
                    id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    logradouro = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    bairro = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    numero = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    complemento = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    cep = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    cidadeId = table.Column<long>(type: "bigint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Endereco__3213E83FC7B4E591", x => x.id);
                    table.ForeignKey(
                        name: "FK_Endereco_Cidade",
                        column: x => x.cidadeId,
                        principalTable: "Cidade",
                        principalColumn: "id");
                });

            migrationBuilder.CreateTable(
                name: "Usuario",
                columns: table => new
                {
                    id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    nome = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    email = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    username = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    senha = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    cpf = table.Column<string>(type: "nvarchar(14)", maxLength: 14, nullable: false),
                    telefone = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    perfil = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    enderecoId = table.Column<long>(type: "bigint", nullable: true),
                    enderecoPrincipalId = table.Column<long>(type: "bigint", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Usuario__3213E83F9E55CD3A", x => x.id);
                    table.ForeignKey(
                        name: "FK_Usuario_Endereco",
                        column: x => x.enderecoPrincipalId,
                        principalTable: "Endereco",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "FK_Usuario_Perfil",
                        column: x => x.perfil,
                        principalTable: "Perfil",
                        principalColumn: "perfil");
                });

            migrationBuilder.CreateTable(
                name: "Compra",
                columns: table => new
                {
                    id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    dataCompra = table.Column<DateOnly>(type: "date", nullable: false),
                    totalCompra = table.Column<double>(type: "float", nullable: false),
                    ifConcluida = table.Column<bool>(type: "bit", nullable: false),
                    usuarioId = table.Column<long>(type: "bigint", nullable: false),
                    enderecoId = table.Column<long>(type: "bigint", nullable: false),
                    formaPagamento = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Compra__3213E83FD25CAA14", x => x.id);
                    table.ForeignKey(
                        name: "FK_Compra_Endereco",
                        column: x => x.enderecoId,
                        principalTable: "Endereco",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "FK_Compra_FormaPagamento",
                        column: x => x.formaPagamento,
                        principalTable: "FormaPagamento",
                        principalColumn: "formaPagamento");
                    table.ForeignKey(
                        name: "FK_Compra_Usuario",
                        column: x => x.usuarioId,
                        principalTable: "Usuario",
                        principalColumn: "id");
                });

            migrationBuilder.CreateTable(
                name: "UsuarioGame",
                columns: table => new
                {
                    usuarioId = table.Column<long>(type: "bigint", nullable: false),
                    gameId = table.Column<long>(type: "bigint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__UsuarioG__9818A0CB54259B77", x => new { x.usuarioId, x.gameId });
                    table.ForeignKey(
                        name: "FK_UsuarioGame_Game",
                        column: x => x.gameId,
                        principalTable: "Game",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "FK_UsuarioGame_Usuario",
                        column: x => x.usuarioId,
                        principalTable: "Usuario",
                        principalColumn: "id");
                });

            migrationBuilder.CreateTable(
                name: "ItemCompra",
                columns: table => new
                {
                    id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    quantidade = table.Column<int>(type: "int", nullable: false),
                    precoUnitario = table.Column<double>(type: "float", nullable: false),
                    compraId = table.Column<long>(type: "bigint", nullable: false),
                    gameId = table.Column<long>(type: "bigint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__ItemComp__3213E83F5E9F0B85", x => x.id);
                    table.ForeignKey(
                        name: "FK_ItemCompra_Compra",
                        column: x => x.compraId,
                        principalTable: "Compra",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "FK_ItemCompra_Game",
                        column: x => x.gameId,
                        principalTable: "Game",
                        principalColumn: "id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Cidade_estadoId",
                table: "Cidade",
                column: "estadoId");

            migrationBuilder.CreateIndex(
                name: "IX_Compra_enderecoId",
                table: "Compra",
                column: "enderecoId");

            migrationBuilder.CreateIndex(
                name: "IX_Compra_formaPagamento",
                table: "Compra",
                column: "formaPagamento");

            migrationBuilder.CreateIndex(
                name: "IX_Compra_usuarioId",
                table: "Compra",
                column: "usuarioId");

            migrationBuilder.CreateIndex(
                name: "IX_Endereco_cidadeId",
                table: "Endereco",
                column: "cidadeId");

            migrationBuilder.CreateIndex(
                name: "IX_ItemCompra_compraId",
                table: "ItemCompra",
                column: "compraId");

            migrationBuilder.CreateIndex(
                name: "IX_ItemCompra_gameId",
                table: "ItemCompra",
                column: "gameId");

            migrationBuilder.CreateIndex(
                name: "IX_Pagamento_formaPagamento",
                table: "Pagamento",
                column: "formaPagamento");

            migrationBuilder.CreateIndex(
                name: "IX_Usuario_enderecoPrincipalId",
                table: "Usuario",
                column: "enderecoPrincipalId");

            migrationBuilder.CreateIndex(
                name: "IX_Usuario_perfil",
                table: "Usuario",
                column: "perfil");

            migrationBuilder.CreateIndex(
                name: "IX_UsuarioGame_gameId",
                table: "UsuarioGame",
                column: "gameId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "GameUsuario");

            migrationBuilder.DropTable(
                name: "ItemCompra");

            migrationBuilder.DropTable(
                name: "Pagamento");

            migrationBuilder.DropTable(
                name: "UsuarioGame");

            migrationBuilder.DropTable(
                name: "Compra");

            migrationBuilder.DropTable(
                name: "Game");

            migrationBuilder.DropTable(
                name: "FormaPagamento");

            migrationBuilder.DropTable(
                name: "Usuario");

            migrationBuilder.DropTable(
                name: "Endereco");

            migrationBuilder.DropTable(
                name: "Perfil");

            migrationBuilder.DropTable(
                name: "Cidade");

            migrationBuilder.DropTable(
                name: "Estado");
        }
    }
}
