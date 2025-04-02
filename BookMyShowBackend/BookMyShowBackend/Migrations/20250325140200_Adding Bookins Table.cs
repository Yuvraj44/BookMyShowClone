using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BookMyShowBackend.Migrations
{
    /// <inheritdoc />
    public partial class AddingBookinsTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "BookingList",
                columns: table => new
                {
                    BookingId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    ShowId = table.Column<int>(type: "int", nullable: false),
                    Tickets = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BookingList", x => x.BookingId);
                    table.ForeignKey(
                        name: "FK_BookingList_ShowsList_ShowId",
                        column: x => x.ShowId,
                        principalTable: "ShowsList",
                        principalColumn: "ShowId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_BookingList_UsersList_UserId",
                        column: x => x.UserId,
                        principalTable: "UsersList",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_BookingList_ShowId",
                table: "BookingList",
                column: "ShowId");

            migrationBuilder.CreateIndex(
                name: "IX_BookingList_UserId",
                table: "BookingList",
                column: "UserId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "BookingList");
        }
    }
}
