﻿using System;
using Core.Entities.OrderAggregate;

namespace Core.Interfaces
{
	public interface IOrderService
	{
		Task<Order> CreateOrderAsync(string buyerEmail, int deliveryMethod, string basketId, Address shippingAddress);

		Task<IReadOnlyList<Order>> GetOrdersForUsersAsync(string buyerEmail);

		Task<Order> GetOrderByIdAsync(int id, string buyerEmail);

		Task<IReadOnlyList<DeliveryMethod>> GetDeliveryMethodsAsync();
	}
}

