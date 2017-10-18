using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using Web_Application_UberEats.Models;

namespace Web_Application_UberEats.Controllers
{
    public class Order_ProductController : ApiController
    {
        private CustomerDbEntities db = new CustomerDbEntities();

        // GET: api/Order_Product
        public IQueryable<Order_Product> GetOrder_Product()
        {
            return db.Order_Product;
        }

        // GET: api/Order_Product/5
        [ResponseType(typeof(Order_Product))]
        public IHttpActionResult GetOrder_Product(int id)
        {
            Order_Product order_Product = db.Order_Product.Find(id);
            if (order_Product == null)
            {
                return NotFound();
            }

            return Ok(order_Product);
        }

        // PUT: api/Order_Product/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutOrder_Product(int id, Order_Product order_Product)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != order_Product.PId)
            {
                return BadRequest();
            }

            db.Entry(order_Product).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!Order_ProductExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Order_Product
        [ResponseType(typeof(Order_Product))]
        public IHttpActionResult PostOrder_Product(Order_Product order_Product)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Order_Product.Add(order_Product);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = order_Product.PId }, order_Product);
        }

        // DELETE: api/Order_Product/5
        [ResponseType(typeof(Order_Product))]
        public IHttpActionResult DeleteOrder_Product(int id)
        {
            Order_Product order_Product = db.Order_Product.Find(id);
            if (order_Product == null)
            {
                return NotFound();
            }

            db.Order_Product.Remove(order_Product);
            db.SaveChanges();

            return Ok(order_Product);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool Order_ProductExists(int id)
        {
            return db.Order_Product.Count(e => e.PId == id) > 0;
        }
        [Route("api/GetOrders")]
        public IEnumerable<OrderDetails> getInfo()
        {
            getAllOrders_Result oj = new getAllOrders_Result();
            var result = db.Database.SqlQuery<OrderDetails>("SELECT O.OrderId,Prod_Name,Prod_Description,totalPrice ,Delivery_Address FROM dbo.[Order] O, dbo.Product  P, dbo.Order_Product M, dbo.Customer C WHERE O.OrderId = M.orderId and P.Prod_Id = M.prod_id and C.Id =  O.Id ");

            return result;
        }
    }
}