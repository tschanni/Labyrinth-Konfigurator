using System;
using System.Collections.Generic;
using Konfigurator_aspnetcore_Backend;
using Konfigurator_aspnetcore_Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Konfigurator_aspnetcore_Backend.Data;

public partial class LabyrinthKonfiguratorContext : DbContext
{
    public LabyrinthKonfiguratorContext()
    {
    }

    public LabyrinthKonfiguratorContext(DbContextOptions<LabyrinthKonfiguratorContext> options)
        : base(options)
    {
    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        => optionsBuilder.UseSqlite("Name=DefaultConnection");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        OnModelCreatingPartial(modelBuilder);

        /*
         * foreign keys
         */
        modelBuilder.Entity<ObstaclesInMap>()
            .HasOne(oim => oim.gameMap)
            .WithMany(gm => gm.obstaclesInMaps)
            .HasForeignKey(oim => oim.gameMapId);

        modelBuilder.Entity<GameMap>()
            .HasOne(gm => gm.barrierDesign)
            .WithMany(b => b.gameMaps)
            .HasForeignKey(gm => gm.barrier);

        modelBuilder.Entity<GameMap>()
            .HasOne(gm => gm.characterDesign)
            .WithMany(c => c.gameMaps)
            .HasForeignKey(gm => gm.character);

        modelBuilder.Entity<GameMap>()
            .HasOne(gm => gm.targetDesign)
            .WithMany(t => t.gameMaps)
            .HasForeignKey(gm => gm.target);

        modelBuilder.Entity<GameMap>()
            .HasOne(gm => gm.tileDesign)
            .WithMany(t => t.gameMaps)
            .HasForeignKey(gm => gm.tile);

        modelBuilder.Entity<GameMap>()
            .HasOne(gm => gm.user)
            .WithMany(t => t.gameMaps)
            .HasForeignKey(gm => gm.username);

        modelBuilder.Entity<Highscore>()
           .HasKey(h => new { h.date, h.gameMapId, h.username });

        modelBuilder.Entity<Highscore>()
           .HasOne(h => h.user)
           .WithMany(t => t.highscores)
           .HasForeignKey(h => h.username);

        modelBuilder.Entity<Highscore>()
           .HasOne(h => h.gameMap)
           .WithMany(t => t.highscores)
           .HasForeignKey(h => h.gameMapId);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);

    public DbSet<BarrierDesign> barrierDesigns { get; set; }
    public DbSet<CharacterDesign> characterDesigns { get; set; }
    public DbSet<GameMap> gameMaps { get; set; }
    public DbSet<ObstaclesInMap> obstaclesInMaps { get; set; }
    public DbSet<TargetDesign> targetDesigns { get; set; }
    public DbSet<TileDesign> tileDesigns { get; set; }
    public DbSet<User> users { get; set; }
    public DbSet<Highscore> highscores { get; set; }
}
