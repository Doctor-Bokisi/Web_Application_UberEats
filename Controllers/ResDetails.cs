using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Web_Application_UberEats.Controllers
{
    public class ResDetails
    {
        public string res_Name { get; set; }
        public string res_Location { get; set; }
        public string Cuisne_Type { get; set; }
        public byte[] Image { get; set; }

        public ResDetails() { }
    }
}