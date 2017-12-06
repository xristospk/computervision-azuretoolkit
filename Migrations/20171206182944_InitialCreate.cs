using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace AzureToolkit.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "SavedImages",
                columns: table => new
                {
                    SavedImageId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Description = table.Column<string>(nullable: true),
                    StorageUrl = table.Column<string>(nullable: true),
                    UserId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SavedImages", x => x.SavedImageId);
                });

            migrationBuilder.CreateTable(
                name: "SavedImageTags",
                columns: table => new
                {
                    SavedImageTagId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    SavedImageId = table.Column<int>(nullable: false),
                    Tag = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SavedImageTags", x => x.SavedImageTagId);
                    table.ForeignKey(
                        name: "FK_SavedImageTags_SavedImages_SavedImageId",
                        column: x => x.SavedImageId,
                        principalTable: "SavedImages",
                        principalColumn: "SavedImageId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_SavedImageTags_SavedImageId",
                table: "SavedImageTags",
                column: "SavedImageId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "SavedImageTags");

            migrationBuilder.DropTable(
                name: "SavedImages");
        }
    }
}
