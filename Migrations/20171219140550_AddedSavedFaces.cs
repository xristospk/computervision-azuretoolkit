using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace AzureToolkit.Migrations
{
    public partial class AddedSavedFaces : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "SavedFaceRectangles",
                columns: table => new
                {
                    SavedFaceRectangleId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Height = table.Column<int>(nullable: false),
                    Left = table.Column<int>(nullable: false),
                    Top = table.Column<int>(nullable: false),
                    Width = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SavedFaceRectangles", x => x.SavedFaceRectangleId);
                });

            migrationBuilder.CreateTable(
                name: "SavedFaces",
                columns: table => new
                {
                    SavedFaceId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Age = table.Column<int>(nullable: false),
                    FaceRectangleSavedFaceRectangleId = table.Column<int>(nullable: true),
                    Gender = table.Column<string>(nullable: true),
                    SavedImageId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SavedFaces", x => x.SavedFaceId);
                    table.ForeignKey(
                        name: "FK_SavedFaces_SavedFaceRectangles_FaceRectangleSavedFaceRectangleId",
                        column: x => x.FaceRectangleSavedFaceRectangleId,
                        principalTable: "SavedFaceRectangles",
                        principalColumn: "SavedFaceRectangleId",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_SavedFaces_SavedImages_SavedImageId",
                        column: x => x.SavedImageId,
                        principalTable: "SavedImages",
                        principalColumn: "SavedImageId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_SavedFaces_FaceRectangleSavedFaceRectangleId",
                table: "SavedFaces",
                column: "FaceRectangleSavedFaceRectangleId");

            migrationBuilder.CreateIndex(
                name: "IX_SavedFaces_SavedImageId",
                table: "SavedFaces",
                column: "SavedImageId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "SavedFaces");

            migrationBuilder.DropTable(
                name: "SavedFaceRectangles");
        }
    }
}
