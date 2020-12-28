using Microsoft.EntityFrameworkCore.Migrations;

namespace post_office_management.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Shipments",
                columns: table => new
                {
                    ShipmentId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    DestinationAirport = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    FlightNumber = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    FlightDateTime = table.Column<string>(type: "nvarchar(48)", nullable: false),
                    isFinalized = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Shipments", x => x.ShipmentId);
                });

            migrationBuilder.CreateTable(
                name: "BagOfLetters",
                columns: table => new
                {
                    BagId = table.Column<string>(type: "nvarchar(15)", maxLength: 15, nullable: false),
                    TotalWeight = table.Column<decimal>(type: "decimal(18,3)", nullable: false),
                    TotalPrice = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    LettersCount = table.Column<int>(type: "int", nullable: false),
                    DestinationCountryCode = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ShipmentId = table.Column<string>(type: "nvarchar(450)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BagOfLetters", x => x.BagId);
                    table.ForeignKey(
                        name: "FK_BagOfLetters_Shipments_ShipmentId",
                        column: x => x.ShipmentId,
                        principalTable: "Shipments",
                        principalColumn: "ShipmentId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "BagOfParcels",
                columns: table => new
                {
                    BagId = table.Column<string>(type: "nvarchar(15)", maxLength: 15, nullable: false),
                    DestinationCountryCode = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ShipmentId = table.Column<string>(type: "nvarchar(450)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BagOfParcels", x => x.BagId);
                    table.ForeignKey(
                        name: "FK_BagOfParcels_Shipments_ShipmentId",
                        column: x => x.ShipmentId,
                        principalTable: "Shipments",
                        principalColumn: "ShipmentId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Parcels",
                columns: table => new
                {
                    ParcelId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    RecipientName = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    DestinationCountryCode = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    WeightInKg = table.Column<decimal>(type: "decimal(5,3)", nullable: false),
                    Price = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    BagId = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    BagOfParcelsBagId = table.Column<string>(type: "nvarchar(15)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Parcels", x => x.ParcelId);
                    table.ForeignKey(
                        name: "FK_Parcels_BagOfParcels_BagOfParcelsBagId",
                        column: x => x.BagOfParcelsBagId,
                        principalTable: "BagOfParcels",
                        principalColumn: "BagId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_BagOfLetters_ShipmentId",
                table: "BagOfLetters",
                column: "ShipmentId");

            migrationBuilder.CreateIndex(
                name: "IX_BagOfParcels_ShipmentId",
                table: "BagOfParcels",
                column: "ShipmentId");

            migrationBuilder.CreateIndex(
                name: "IX_Parcels_BagOfParcelsBagId",
                table: "Parcels",
                column: "BagOfParcelsBagId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "BagOfLetters");

            migrationBuilder.DropTable(
                name: "Parcels");

            migrationBuilder.DropTable(
                name: "BagOfParcels");

            migrationBuilder.DropTable(
                name: "Shipments");
        }
    }
}
