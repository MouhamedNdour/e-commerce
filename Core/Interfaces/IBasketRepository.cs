using System;
using Core.Entities;

namespace Core.Interfaces
{
	public interface IBasketRepository
	{

		Task<CustomerBasket> GetBasketAsync(string basketid);

		Task<CustomerBasket> UpdateBasketAsync(CustomerBasket basket);

		Task<bool> DeleteBasketAsync(string basketId);
	}
}

