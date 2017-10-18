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
    public class Admin_TableController : ApiController
    {
        private CustomerDbEntities db = new CustomerDbEntities();

        // GET: api/Admin_Table
        public IQueryable<Admin_Table> GetAdmin_Table()
        {
            return db.Admin_Table;
        }

        // GET: api/Admin_Table/5
        [ResponseType(typeof(Admin_Table))]
        public IHttpActionResult GetAdmin_Table(string username , string password)
        {
            var cust = db.Admin_Table.Where(Admin_Table => Admin_Table.AdminUsername.Equals(username) && Admin_Table.AdminPassword.Equals(password)).FirstOrDefault();

            if (cust.AdminUsername == null && cust.AdminPassword == null)
            {
                return (null);
            }
            else
            {
                return Ok(cust);
            }
        }

        // PUT: api/Admin_Table/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutAdmin_Table(int id, Admin_Table admin_Table)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != admin_Table.AminId)
            {
                return BadRequest();
            }

            db.Entry(admin_Table).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!Admin_TableExists(id))
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

        // POST: api/Admin_Table
        [ResponseType(typeof(Admin_Table))]
        public IHttpActionResult PostAdmin_Table(Admin_Table admin_Table)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Admin_Table.Add(admin_Table);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (Admin_TableExists(admin_Table.AminId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = admin_Table.AminId }, admin_Table);
        }

        // DELETE: api/Admin_Table/5
        [ResponseType(typeof(Admin_Table))]
        public IHttpActionResult DeleteAdmin_Table(int id)
        {
            Admin_Table admin_Table = db.Admin_Table.Find(id);
            if (admin_Table == null)
            {
                return NotFound();
            }

            db.Admin_Table.Remove(admin_Table);
            db.SaveChanges();

            return Ok(admin_Table);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool Admin_TableExists(int id)
        {
            return db.Admin_Table.Count(e => e.AminId == id) > 0;
        }
    }
}