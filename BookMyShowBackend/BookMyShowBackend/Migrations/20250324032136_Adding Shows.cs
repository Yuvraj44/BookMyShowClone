using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BookMyShowBackend.Migrations
{
    /// <inheritdoc />
    public partial class AddingShows : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            

            migrationBuilder.CreateIndex(
                name: "IX_ShowsList_MovieId",
                table: "ShowsList",
                column: "MovieId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ShowsList");
        }
    }
}
