using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Sql;
using System.Data.SqlClient;

namespace Web_Application_UberEats.Models
{
    public class DataAccess
    {
        public long User(long id, string firstName)
        {

            using (SqlConnection connect = new SqlConnection("DatabaseEntities1"))
            {
                using (SqlCommand comma = new SqlCommand())
                {
                    comma.Connection = connect;
                    try
                    {
                        comma.Connection.Open();
                        comma.CommandText = "INSERT INTO [dbo].[Customer](firstName,lastName,email,password) VALUES(@firstName,@lastName,@email,@password)";
                        //comma.Parameters.AddWithValue("@Firstname", firstname);
                        //comma.Parameters.AddWithValue("@lastname", lastname);
                        //comma.Parameters.AddWithValue("@email", email);
                        //comma.Parameters.AddWithValue("@password", password);
                        comma.ExecuteNonQuery();
                    }
                    catch (SqlException)
                    {
                        throw;
                    }
                    finally
                    {
                        comma.Connection.Close();
                    }
                }
            }
            return id;
        }

        internal long User(LoginData id)
        {
            throw new NotImplementedException();
        }

        internal int User(Customer value)
        {
            throw new NotImplementedException();
        }


        public LoginData getUser(string email, string password)
        {
            LoginData use = null;
            string query = "SELECT email,password WHERE email=@email AND password=@password";


            using (SqlConnection connect = new SqlConnection("DatabaseEntities1"))
            {
                using (SqlCommand comma = new SqlCommand(query, connect))
                    try
                    {
                        connect.Open();
                        comma.CommandText = "INSERT INTO [dbo].[Customer](email,password) VALUES(@email,@password)";
                        comma.Parameters.AddWithValue("@email", email);
                        comma.Parameters.AddWithValue("@password", password);
                        comma.ExecuteNonQuery();
                    }
                    catch
                    {
                        connect.Close();
                    }

            }

            return use;

        }
    }
}