using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query.SqlExpressions;

namespace Data
{
    public class AuthDbContext : IdentityDbContext {
        public AuthDbContext(DbContextOptions<AuthDbContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            
            var adminRoleId = "ac0b58f2-e818-4856-ba21-18dec9e534ee";
            var userRoleId = "beccaf29-63a8-4a59-9053-b34455b6b3a2";

            // Create admin and user roles
            var roles = new List<IdentityRole>
            {
                new IdentityRole
                {
                    Id = adminRoleId,
                    Name = "Admin",
                    NormalizedName = "ADMIN",
                    ConcurrencyStamp = adminRoleId
                },

                new IdentityRole
                {
                    Id = userRoleId,
                    Name = "User",
                    NormalizedName = "USER",
                    ConcurrencyStamp = userRoleId
                }
            };

            // Seed roles
            builder.Entity<IdentityRole>().HasData(roles);

            // Create admin user
            var adminUserId = "055e5275-b966-4320-9546-0368ac818732";
            var admin = new IdentityUser{
                Id = adminUserId,
                UserName = "admin@event.com",
                Email = "admin@event.com",
                NormalizedEmail = "ADMIN@EVENT.COM",
                NormalizedUserName = "ADMIN@EVENT.COM",
                PasswordHash = "AQAAAAIAAYagAAAAEE3d6/o2I7FguFaUCt7l41lj2nU846gtOK42nyXqtNSEywN1xeXfEIkxtlDW6h7Bfg==",
                SecurityStamp = "ebdd5dfd-e26c-4114-a61d-d4b611fc4bce",
                ConcurrencyStamp = "f7492e9b-acfb-45ec-8c44-353c1bd3982f"

            };

            
            builder.Entity<IdentityUser>().HasData(admin);

            // Assign admin role to admin user
            var adminRoles = new List<IdentityUserRole<string>> (){
                new ()
                {
                    UserId = adminUserId,
                    RoleId = adminRoleId
                },
                new ()
                {
                    UserId = adminUserId,
                    RoleId = userRoleId
                }
            };


            builder.Entity<IdentityUserRole<string>>().HasData(adminRoles);
           
        }
    }
}