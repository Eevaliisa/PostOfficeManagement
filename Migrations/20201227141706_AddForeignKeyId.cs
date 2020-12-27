using Microsoft.EntityFrameworkCore.Migrations;

namespace post_office_management.Migrations
{
    public partial class AddForeignKeyId : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "BagId",
                table: "Parcels",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "BagId",
                table: "Parcels");
        }
    }
}
