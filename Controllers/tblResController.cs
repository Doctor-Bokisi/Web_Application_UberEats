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
using System.IO;
using System.Web;

namespace Web_Application_UberEats.Controllers
{
    public class tblResController : ApiController
    {
        private CustomerDbEntities db = new CustomerDbEntities();

        // GET: api/tblRes
        public IQueryable<tblRe> GettblRes()
        {
            return db.tblRes;
        }

        // GET: api/tblRes/5
        [ResponseType(typeof(tblRe))]
        public IHttpActionResult GettblRe(int id)
        {
            tblRe tblRe = db.tblRes.Find(id);
            if (tblRe == null)
            {
                return NotFound();
            }

            return Ok(tblRe);
        }

        // PUT: api/tblRes/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PuttblRe(int id, tblRe tblRe)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != tblRe.PicId)
            {
                return BadRequest();
            }

            db.Entry(tblRe).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!tblReExists(id))
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

        // POST: api/tblRes
        public String POST()
        {
            int counter = 0;

            //COLLECTING FILES------->
            System.Web.HttpFileCollection files = System.Web.HttpContext.Current.Request.Files;
            string url = HttpContext.Current.Request.Url.AbsoluteUri;
            tblRe picfun = new tblRe();

            String Status = "";
            for (int i = 0; i < files.Count; i++)
            {

                //GET THE POSTED FILES------>
                System.Web.HttpPostedFile file = files[i];

                string fileName = new FileInfo(file.FileName).Name;


                if (file.ContentLength > 0)
                {
                    Guid id = Guid.NewGuid();

                    string modifiedFileName = id.ToString() + "_" + fileName;

                    byte[] imageb = new byte[file.ContentLength];
                    file.InputStream.Read(imageb, 0, file.ContentLength);

                    picfun.Image = imageb;
                    db.tblRes.Add(picfun);    
                    db.SaveChanges();
                    counter++;

                }

            }

            if (counter > 0)
            {
                return Status;
            }
            return "Upload Failed";
        }

        // DELETE: api/tblRes/5
        [ResponseType(typeof(tblRe))]
        public IHttpActionResult DeletetblRe(int id)
        {
            tblRe tblRe = db.tblRes.Find(id);
            if (tblRe == null)
            {
                return NotFound();
            }

            db.tblRes.Remove(tblRe);
            db.SaveChanges();

            return Ok(tblRe);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool tblReExists(int id)
        {
            return db.tblRes.Count(e => e.PicId == id) > 0;
        }
    }
}