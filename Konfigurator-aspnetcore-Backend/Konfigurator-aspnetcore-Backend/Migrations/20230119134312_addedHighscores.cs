using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace KonfiguratoraspnetcoreBackend.Migrations
{
    /// <inheritdoc />
    public partial class addedHighscores : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "username",
                table: "gameMaps",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateTable(
                name: "highscores",
                columns: table => new
                {
                    date = table.Column<DateTime>(type: "TEXT", nullable: false),
                    gameMapId = table.Column<int>(type: "INTEGER", nullable: false),
                    username = table.Column<string>(type: "TEXT", nullable: false),
                    score = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_highscores", x => new { x.date, x.gameMapId, x.username });
                    table.ForeignKey(
                        name: "FK_highscores_gameMaps_gameMapId",
                        column: x => x.gameMapId,
                        principalTable: "gameMaps",
                        principalColumn: "gameMapId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_highscores_users_username",
                        column: x => x.username,
                        principalTable: "users",
                        principalColumn: "username",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_gameMaps_username",
                table: "gameMaps",
                column: "username");

            migrationBuilder.CreateIndex(
                name: "IX_highscores_gameMapId",
                table: "highscores",
                column: "gameMapId");

            migrationBuilder.CreateIndex(
                name: "IX_highscores_username",
                table: "highscores",
                column: "username");

            migrationBuilder.AddForeignKey(
                name: "FK_gameMaps_users_username",
                table: "gameMaps",
                column: "username",
                principalTable: "users",
                principalColumn: "username",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_gameMaps_users_username",
                table: "gameMaps");

            migrationBuilder.DropTable(
                name: "highscores");

            migrationBuilder.DropIndex(
                name: "IX_gameMaps_username",
                table: "gameMaps");

            migrationBuilder.DropColumn(
                name: "username",
                table: "gameMaps");
        }
    }
}
