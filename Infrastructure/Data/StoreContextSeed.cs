using System;
using System.Text.Json;
using Core.Entities;
using Core.Entities.OrderAggregate;

namespace Infrastructure.Data
{
	public class StoreContextSeed
	{
		public static async Task SeedAsync(StoreContext context)
		{
			if (!context.ProductBrands.Any())
			{
				var brandsData = File.ReadAllText("../Infrastructure/Data/SeedData/brands.json");
				var brands = JsonSerializer.Deserialize<List<ProductBrand>>(brandsData);
				context.ProductBrands.AddRange(brands);

			}

            if (!context.productTypes.Any())
            {
                var typesData = File.ReadAllText("../Infrastructure/Data/SeedData/types.json");
                var types = JsonSerializer.Deserialize<List<ProductType>>(typesData);
                context.productTypes.AddRange(types);

            }

            if (!context.Products.Any())
            {
                var productData = File.ReadAllText("../Infrastructure/Data/SeedData/products.json");
                var products = JsonSerializer.Deserialize<List<Product>>(productData);
                context.Products.AddRange(products);

            }


            if (!context.DeliveryMethods.Any())
            {
                var delieryData = File.ReadAllText("../Infrastructure/Data/SeedData/delivery.json");
                var methods = JsonSerializer.Deserialize<List<DeliveryMethod>>(delieryData);
                context.DeliveryMethods.AddRange(methods);

            }

            if (context.ChangeTracker.HasChanges())
                await context.SaveChangesAsync();
        }
	}
}

