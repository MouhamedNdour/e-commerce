using System;
namespace Core.Entities.OrderAggregate
{
	public class Order : BaseEntity
	{
		public Order()
		{

		}

        public Order(string buyerEmail, Address shipToAddress, DeliveryMethod deliveryMethod, IReadOnlyList<OrderItem> orderItems, decimal subtotal, string paymentItentId)
        {
            BuyerEmail = buyerEmail;
            ShipToAddress = shipToAddress;
            DeliveryMethod = deliveryMethod;
            OrderItems = orderItems;
            Subtotal = subtotal;
            PaymentIntentId = paymentItentId;
        }

        public string  BuyerEmail { get; set; }

		public DateTime OrderDate { get; set; } = DateTime.Now;

		public Address ShipToAddress { get; set; }

		public DeliveryMethod DeliveryMethod { get; set; }

		public IReadOnlyList<OrderItem> OrderItems { get; set; }

		public decimal Subtotal { get; set; }

		public OrderStatus Status { get; set; } = OrderStatus.Pending;

		public string PaymentIntentId { get; set; }


		public decimal GetTotal()
		{
			return Subtotal + DeliveryMethod.Price;
		}
	}
}



