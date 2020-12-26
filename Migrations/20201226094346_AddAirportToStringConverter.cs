using Microsoft.EntityFrameworkCore.Migrations;

namespace post_office_management.Migrations
{
    public partial class AddAirportToStringConverter : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Weight",
                table: "Parcels",
                newName: "WeightInKg");

            migrationBuilder.AlterColumn<string>(
                name: "DestinationCountryCode",
                table: "BagOfLetters",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "WeightInKg",
                table: "Parcels",
                newName: "Weight");

            migrationBuilder.AlterColumn<string>(
                name: "DestinationCountryCode",
                table: "BagOfLetters",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");
        }
    }
}
