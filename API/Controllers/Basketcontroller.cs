using System;
using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
	public class Basketcontroller : BaseApiController
	{
		private readonly IBasketRepository _basketRepository;

		public Basketcontroller(IBasketRepository basketRepository)
		{
			_basketRepository = basketRepository;

		}

        [HttpGet]
        public async Task<ActionResult<CustomerBasket>> GetBasketByIdAsync(string id)
		{
			var basket = await _basketRepository.GetBasketAsync(id);

			return Ok(basket ?? new CustomerBasket(id));
		}

        [HttpPost]
		public async Task<ActionResult<CustomerBasket>> UpdateBasketAsync(CustomerBasket basket)
		{
			var updatedBasket = await _basketRepository.UpdateBasketAsync(basket);

			return Ok(updatedBasket);
		}

        [HttpDelete]
		public async Task DeleteBasketAsync(string id)
		{
			await _basketRepository.DeleteBasketAsync(id);
		}

    }
}

