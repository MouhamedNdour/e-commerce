﻿using System;
using Core.Entities;

namespace Core.Specifications
{
	public class ProductWithTypesAndBrandsSpecification: BaseSpecification<Product>
	{
		public ProductWithTypesAndBrandsSpecification(ProductSpecParams productSpecParams) :
			base( x =>
			    (string.IsNullOrEmpty(productSpecParams.Search) ||x.Name.ToLower().Contains(productSpecParams.Search)) &&
			    (!productSpecParams.BrandId.HasValue || x.ProductBrandId == productSpecParams.BrandId) &&
			    (!productSpecParams.TypeId.HasValue || x.ProductTypeId == productSpecParams.TypeId))
		{
			AddInclude(x => x.ProductType);
			AddInclude(x => x.ProductBrand);
			ApplyPaging(productSpecParams.PageSize * (productSpecParams.PageIndex - 1), productSpecParams.PageSize);

            if (!string.IsNullOrEmpty(productSpecParams.Sort))
			{
				switch(productSpecParams.Sort)
				{
					case "priceAsc":

						AddOrderBy(p => p.Price);
						break;
					case "priceDesc":

						AddOrderByDescending(p => p.Price);
						break;
					default:
						AddOrderBy(n => n.Name);
						break;
				}
			}
		}


		public ProductWithTypesAndBrandsSpecification(int id): base(x => x.Id == id)
		{
            AddInclude(x => x.ProductType);
            AddInclude(x => x.ProductBrand);
        }
	}
}

