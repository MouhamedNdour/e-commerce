using System;
using Core.Entities.Identity;
using Microsoft.AspNetCore.Identity;

namespace Infrastructure.Identity
{
	public class AppIdentityDbContextSeed
	{
		public static async Task SeedUserAsync(UserManager<AppUser> userManager)
		{
			if (!userManager.Users.Any())
			{
				var user = new AppUser
				{
					DisplayName = "John",
					Email = "John@doe.com",
					UserName = "JohnDoe",
					Address = new Address
					{
						FirstName = "John",
						LastName = "Doe",
						Street = "28 rue paul verlaine",
						City = "Rouen",
						State = "France",
						ZipCode = "76800"
					}
				};

				var result = await userManager.CreateAsync(user, "Pa$$w0rd");

                if (result.Succeeded)
                {
                    // Log success
                    Console.WriteLine("User created successfully.");
                }
                else
                {
                    // Log errors
                    foreach (var error in result.Errors)
                    {
                        Console.WriteLine($"Error: {error.Description}");
                    }
                }
            }
		}
	}
}

