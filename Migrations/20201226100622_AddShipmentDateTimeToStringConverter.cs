using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace post_office_management.Migrations
{
    public partial class AddShipmentDateTimeToStringConverter : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "FlightDateTime",
                table: "Shipments",
                type: "nvarchar(48)",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "datetime2");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<DateTime>(
                name: "FlightDateTime",
                table: "Shipments",
                type: "datetime2",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(48)");
        }
    }
}
