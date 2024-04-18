using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace KonfiguratoraspnetcoreBackend.Migrations
{
    /// <inheritdoc />
    public partial class AddModelsToDatabase : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "barrierDesigns",
                columns: table => new
                {
                    barrier = table.Column<string>(type: "TEXT", nullable: false),
                    img = table.Column<byte[]>(type: "BLOB", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_barrierDesigns", x => x.barrier);
                });

            migrationBuilder.CreateTable(
                name: "characterDesigns",
                columns: table => new
                {
                    character = table.Column<string>(type: "TEXT", nullable: false),
                    img = table.Column<byte[]>(type: "BLOB", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_characterDesigns", x => x.character);
                });

            migrationBuilder.CreateTable(
                name: "targetDesigns",
                columns: table => new
                {
                    target = table.Column<string>(type: "TEXT", nullable: false),
                    img = table.Column<byte[]>(type: "BLOB", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_targetDesigns", x => x.target);
                });

            migrationBuilder.CreateTable(
                name: "tileDesigns",
                columns: table => new
                {
                    tile = table.Column<string>(type: "TEXT", nullable: false),
                    img = table.Column<byte[]>(type: "BLOB", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tileDesigns", x => x.tile);
                });

            migrationBuilder.CreateTable(
                name: "users",
                columns: table => new
                {
                    username = table.Column<string>(type: "TEXT", nullable: false),
                    passwordHash = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_users", x => x.username);
                });

            migrationBuilder.CreateTable(
                name: "gameMaps",
                columns: table => new
                {
                    gameMapId = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    name = table.Column<string>(type: "TEXT", nullable: false),
                    sizeX = table.Column<int>(type: "INTEGER", nullable: false),
                    sizeY = table.Column<int>(type: "INTEGER", nullable: false),
                    tile = table.Column<string>(type: "TEXT", nullable: false),
                    barrier = table.Column<string>(type: "TEXT", nullable: false),
                    character = table.Column<string>(type: "TEXT", nullable: false),
                    target = table.Column<string>(type: "TEXT", nullable: false),
                    startPosX = table.Column<int>(type: "INTEGER", nullable: false),
                    startPosY = table.Column<int>(type: "INTEGER", nullable: false),
                    endPosX = table.Column<int>(type: "INTEGER", nullable: false),
                    endPosY = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_gameMaps", x => x.gameMapId);
                    table.ForeignKey(
                        name: "FK_gameMaps_barrierDesigns_barrier",
                        column: x => x.barrier,
                        principalTable: "barrierDesigns",
                        principalColumn: "barrier",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_gameMaps_characterDesigns_character",
                        column: x => x.character,
                        principalTable: "characterDesigns",
                        principalColumn: "character",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_gameMaps_targetDesigns_target",
                        column: x => x.target,
                        principalTable: "targetDesigns",
                        principalColumn: "target",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_gameMaps_tileDesigns_tile",
                        column: x => x.tile,
                        principalTable: "tileDesigns",
                        principalColumn: "tile",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "obstaclesInMaps",
                columns: table => new
                {
                    gameMapId = table.Column<int>(type: "INTEGER", nullable: false),
                    x = table.Column<int>(type: "INTEGER", nullable: false),
                    y = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_obstaclesInMaps", x => new { x.gameMapId, x.x, x.y });
                    table.ForeignKey(
                        name: "FK_obstaclesInMaps_gameMaps_gameMapId",
                        column: x => x.gameMapId,
                        principalTable: "gameMaps",
                        principalColumn: "gameMapId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_gameMaps_barrier",
                table: "gameMaps",
                column: "barrier");

            migrationBuilder.CreateIndex(
                name: "IX_gameMaps_character",
                table: "gameMaps",
                column: "character");

            migrationBuilder.CreateIndex(
                name: "IX_gameMaps_target",
                table: "gameMaps",
                column: "target");

            migrationBuilder.CreateIndex(
                name: "IX_gameMaps_tile",
                table: "gameMaps",
                column: "tile");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "obstaclesInMaps");

            migrationBuilder.DropTable(
                name: "users");

            migrationBuilder.DropTable(
                name: "gameMaps");

            migrationBuilder.DropTable(
                name: "barrierDesigns");

            migrationBuilder.DropTable(
                name: "characterDesigns");

            migrationBuilder.DropTable(
                name: "targetDesigns");

            migrationBuilder.DropTable(
                name: "tileDesigns");
        }
    }
}
