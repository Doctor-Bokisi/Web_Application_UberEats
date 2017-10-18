using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.SqlClient;
using System.Data.Sql;

namespace Web_Application_UberEats.Models
{
    public class AdminDataAccess
    {
        public long User(long id)
        {

            using (SqlConnection connect = new SqlConnection("DatabaseEntities1"))
            {
                using (SqlCommand comma = new SqlCommand())
                {
                    comma.Connection = connect;
                    try
                    {
                        comma.Connection.Open();
                        comma.CommandText = "INSERT INTO [dbo].[Admin_Table](AdminUsername,AdminPassword) VALUES(@AdminUsername,@AdminPassword)";
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


        public LoginData getUser(string AdminUsername, string AdminPassword)
        {
            LoginData use = null;
            string query = "SELECT AdminUsername,AdminPassword WHERE AdminUsername=@AdminUsername AND AdminPassword=@AdminPassword";


            using (SqlConnection connect = new SqlConnection("DatabaseEntities1"))
            {
                using (SqlCommand comma = new SqlCommand(query, connect))
                    try
                    {
                        connect.Open();
                        comma.CommandText = "INSERT INTO [dbo].[Admin_Table](AdminUsername,AdminPassword) VALUES(@email,@password)";
                        comma.Parameters.AddWithValue("@AdminUsername", AdminUsername);
                        comma.Parameters.AddWithValue("@AdminPassword", AdminPassword);
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