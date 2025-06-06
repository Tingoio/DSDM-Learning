﻿// <auto-generated />
using System;
using DSDMLearning.API.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace DSDMLearning.API.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    [Migration("20250601223537_Initial")]
    partial class Initial
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.13")
                .HasAnnotation("Relational:MaxIdentifierLength", 64);

            MySqlModelBuilderExtensions.AutoIncrementColumns(modelBuilder);

            modelBuilder.Entity("DSDMLearning.API.Models.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("Id"));

                    b.Property<bool>("Certificado")
                        .HasColumnType("tinyint(1)");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("varchar(100)");

                    b.Property<bool>("EstudoCaso")
                        .HasColumnType("tinyint(1)");

                    b.Property<bool>("Faq")
                        .HasColumnType("tinyint(1)");

                    b.Property<string>("FirstName")
                        .HasColumnType("longtext");

                    b.Property<DateTime?>("LastLogin")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("LastName")
                        .HasColumnType("longtext");

                    b.Property<bool>("MateriaisEducativos")
                        .HasColumnType("tinyint(1)");

                    b.Property<string>("PasswordHash")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<bool>("Quizzes")
                        .HasColumnType("tinyint(1)");

                    b.Property<bool>("Sobre")
                        .HasColumnType("tinyint(1)");

                    b.Property<string>("Username")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("varchar(50)");

                    b.HasKey("Id");

                    b.HasIndex("Email")
                        .IsUnique();

                    b.HasIndex("Username")
                        .IsUnique();

                    b.ToTable("Users");
                });
#pragma warning restore 612, 618
        }
    }
}
