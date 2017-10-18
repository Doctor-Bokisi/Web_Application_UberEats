
namespace Web_Application_UberEats.Controllers
{
    public class OrderDetails
    {
        public int OrderId  { get; set; }
        public string Prod_Name { get; set; }
        public string Prod_Description { get; set; }
        public string totalPrice { get; set; }
        public string Delivery_Address { get; set; }
        public OrderDetails() { }
    }
}