using Backend.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

public class ItemConfiguration : IEntityTypeConfiguration<Item>
{
    public void Configure(EntityTypeBuilder<Item> builder)
    {
        builder.ToTable("TodoItems");

        builder.HasKey(t => t.Id);

        builder.Property(t => t.Description)
            .IsRequired()
            .HasMaxLength(500);

        builder.HasOne(t => t.User)
            .WithMany(u => u.Todos)
            .HasForeignKey(t => t.UserId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
