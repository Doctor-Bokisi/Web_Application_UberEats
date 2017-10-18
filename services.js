/// <reference path="c:\users\user\documents\visual studio 2015\Projects\Web_Application_UberEats\Web_Application_UberEats\scripts/angular.js" />


var UserService = angular.module('UserService', []);

UserService.factory('UserApi', function ($http) {
    var urlBase = "http://localhost:54114/api/";
    var UserApi = {};


    //############### USERS #####################
    //Get all users
    UserApi.getUser = function () {
        return $http.get(urlBase + '/Customers/');
    }

    //RegisterUser
    UserApi.AddUser = function (user) {
        return $http.post(urlBase + '/Customers/', user);
    }

    //Add Product
    UserApi.AddProduct = function (prod) {
        return $http.post(urlBase + '/Products/', prod);
    }
 
    //Get Products

    UserApi.GetProducts = function () {

        return $http.get(urlBase + '/Products');
    }

    //LoginUser
    UserApi.GetUserInfo = function (email, password) {
        return $http.get(urlBase + 'Customers1?email=' + email + '&password=' + password);
    }

    //Get Restaurant
    UserApi.GetRestaurants = function()
    {
        return $http.get(urlBase + '/Restaurants');
    }

    //Res Pictures
    UserApi.RetrieveRestaurants = function () {

        return $http.get(urlBase + 'GetRes');
    }
    //Add Restaurant

    UserApi.RestaurantAdd = function (res) {
        return $http.post(urlBase + '/Restaurants/', res)
    }

    //Login As Admin

    UserApi.LogAdminOn = function (email , password) {
        return $http.get(urlBase + 'Admin_Table?email=' + email , password);
    }

    //Get all the products from the product table
    UserApi.GetProducts = function ()
    {
        return $http.get(urlBase + '/Products/');
    }

    //Update User profile
    UserApi.EditUser = function (UserToEdit) {
        var datta = $http({
            method: 'PUT',
            url: urlBase + 'Customers/' + UserToEdit.Id,
            data: UserToEdit,

        });
        return datta;
    }

    //Add to payment table
    UserApi.AddPayments = function (pay)
    {
        return $http.post(urlBase + '/Payments/',pay);
    }

    //Add Data to the Order table
    UserApi.AddOrders = function (Order)
    {
        return $http.post(urlBase + '/Orders/',Order);
    }

    //Ad to dummy table
    UserApi.AddDum = function (Orders) {
        return $http.post(urlBase + '/Order_Product', Orders);
    }

    //Retrieve all the Orders
    UserApi.RetrieveOrders = function () {

        return $http.get(urlBase + 'GetOrders');
    }
    return UserApi;
});