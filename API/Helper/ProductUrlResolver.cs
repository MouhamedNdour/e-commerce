﻿using System;
using API.Dtos;
using AutoMapper;
using Core.Entities;

namespace API.Helper
{
	public class ProductUrlResolver: IValueResolver<Product, ProductToReturnDto, string>
	{
        private readonly IConfiguration _config;

		public ProductUrlResolver(IConfiguration config)
		{
            _config = config;
		}

        public string Resolve(Product source, ProductToReturnDto destination, string destMember, ResolutionContext context)
        {
           c
        }
    }
}

