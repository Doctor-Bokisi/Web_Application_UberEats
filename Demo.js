/// <reference path="c:\users\user\documents\visual studio 2015\Projects\Web_Application_UberEats\Web_Application_UberEats\scripts/angular.js" />


var SignIn = angular.module("SignIn", ['ngRoute', 'UserService']);

//Routing(NAVIGATION)....

SignIn.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.
        when('/', {
            templateUrl: 'view/Home.html'

        }).
        when('/Orders', {
            templateUrl: 'view/Orders.html',
            controller: 'ViewOrdersController'
        }).
        when('/Add', {
            templateUrl: 'view/SignUp.html',
            controller: 'UserController'
        }).
        when('/Profile', {
            templateUrl: 'view/Profile.html',
            controller: 'ProfileController'

        }).
        when('/ProdUpload', {
            templateUrl: 'view/ProductUpload.html',
            controller: 'UploadProductController'
        })
        .
        when('/Login', {
            templateUrl: 'view/Login.html',
            controller: 'LoginController'

        }).when('/Rest', {
            templateUrl: 'view/Restaurant.html',
            controller: 'ResController'

        })
        .when('/Home', {
            templateUrl: 'view/Home.html'

        }).
    when('/UploadPic', {
        templateUrl: 'view/UploadResPic.html',
        controller: 'PicController'
    }).
       when('/viewRest', {
        templateUrl: 'view/RestaurantData.html',
        controller: 'RestDataController'

        }).
        when('/ViewCust', {
            templateUrl: 'view/CustomerData.html',
            controller: 'CustController'

        }).
         when('/Prod', {
             templateUrl: 'view/Product.html',
             controller: 'ProdController'

         }).
        when('/Admin', {
            templateUrl: 'view/Admin.html',
            controller: 'AdminController'

        }).
    when('/Dash', {
        templateUrl: 'view/Dashboard.html'
    }).
        when('/McD', {

            templateUrl: 'view/McDonalds.html',
            controller : 'McDController'

        }).
        when('/Checkout', {

            templateUrl: 'view/Checkout.html',
            controller:'CheckoutCtrl'

        }).
    when('/Search', {
          
        templateUrl: 'view/Search.html',
        controller: 'SearchController'


    }).
    when('/MyOrder', {
          
        templateUrl: 'view/MyOrder.html',
        controller: 'MyOrderController'
    }).
    when('/Payment', {

        templateUrl: 'view/Payment.html',
        controller:'PaymentController'
    })
    .when('/Order', {

        templateUrl: 'view/Order.html',
        controller:'OrderController'

    });

}]);


//User Controller implementation (Registration of a Customer)
SignIn.controller("UserController", function ($scope, $location,UserApi) {
    $scope.AdUser = function () {
        var UserToAdd = {
            'firstName': $scope.firstName,
            'lastName': $scope.lastName,
            'mobile': $scope.mobile,
            'email': $scope.email,
            'password': $scope.password
        };

        UserApi.AddUser(UserToAdd).then(function (reponse) {
            alert("User added successfully");
            $scope.firstName = undefined;
            $scope.lastName = undefined;
            $scope.mobile = undefined;
            $scope.email = undefined;
            $scope.password = undefined;
            $location.path('/Home');
        }),
            function (response) {
                alert("Unable to add user");
            };
    };


});

//Adding a product
SignIn.controller("ProdController", function ($scope, $location, UserApi) {
    $scope.AddProd = function () {
        var AdProd = {
            'Prod_Name': $scope.Prod_Name,           
            'Prod_Price': $scope.Prod_Price,
            'Prod_Description': $scope.Prod_Description
        };

        UserApi.AddProduct(AdProd).then(function (reponse) {
            alert("Product added successfully");
            $scope.Prod_Name = undefined;
            $scope.Prod_Price = undefined;
            $scope.Prod_Description = undefined;
            location.path('/Dash');
        }),
            function (response) {
                alert("Unable to add user");
            };
    };


});

//Login Implementation(Customer Login)

SignIn.controller("LoginController", function ($scope, $http, UserApi, $rootScope, $location, $window) {

    $scope.LogInUser = {
        'email': $scope.email,
        'password': $scope.password,
        'firstName': $scope.firstName
    }

    $scope.loginForm = function () {
        UserApi.GetUserInfo($scope.email, $scope.password).then(function (response) {
            if (response.data === null) {
                alert("You've entered an ivalid email and password");
            } else {
                alert("Login Successful. Welcome " + response.data.firstName);
                $rootScope.currentUser = response.data;
                $location.path('/Home');
            }
        }), function (response) {
            alert("Error in logging the system")
        }
    };
});


//View Restaurant Controller Implementation(Search)

SignIn.controller("RestDataController", function ($scope, UserApi) {

    getRes();
    function getRes() {
        UserApi.GetRestaurants().then(function (response) {
            $scope.res_Data = response.data;
        }), function () {

            alert('Cant load data ');
        }
    }

});

//View All The Orders
SignIn.controller("ViewOrdersController", function ($scope, UserApi, $location, $rootScope) {

    getOrders();
    function getOrders() {
        UserApi.RetrieveOrders().then(function (response) {
            $scope.Order_Data = response.data;
        }), function () {

            alert('Cant load data ');
        }
    }
});

//View all the customers

SignIn.controller("CustController", function ($scope, UserApi) {

    getCust();
    function getCust() {
        UserApi.getUser().then(function (response) {
            $scope.cust_Data = response.data;
        }), function () {

            alert('Cant load data ');
        }
    }

});

//Implementing The Adding Restaurant Controller (Registration of a Restaurant)

SignIn.controller("ResController", function ($scope, UserApi,$location) {
    $scope.AddRes = function () {
        var AddToRestaurant = {
            'res_Name': $scope.res_Name,
            'res_Location': $scope.res_Location,
            'Cuisne_Type': $scope.Cuisne_Type,
            'email_Address': $scope.email_Address,
            'Manger_Name': $scope.Manger_Name
        };

        UserApi.RestaurantAdd(AddToRestaurant).then(function (reponse) {
            alert("Restaurant added successfully");
            $scope.res_Name = undefined;
            $scope.res_Location = undefined;
            $scope.Cuisne_Type = undefined;
            $scope.email_Address = undefined;
            $scope.Manger_Name = undefined;
            $location.path('/Dash');

            //$location.path('/AddProperty');
        }),
            function (response) {
                alert("Unable to add user");
            };
    };


});

//Administrator Controller Implementation(Logging In)
SignIn.controller("AdminController", function ($scope, $http, UserApi, $rootScope, $location, $window) {

    $scope.LogInAdmin = {
        'AdminUsername': $scope.AdminUsername,
        'AdminPassword': $scope.AdminPassword
    }

    $scope.loginAdmin = function () {
        UserApi.LogAdminOn($scope.AdminUsername, $scope.AdminPassword).then(function (response) {
            if (response.data === null) {
                alert("You've entered an ivalid email and password");
            } else {
                alert("Login Successful. Welcome  to the Admin Dashboard ");
                $rootScope.currentUser = response.data;
                $location.path('/Dash');
            }
        }), function (response) {
            alert("Error in logging the system")
        }
    };
});


//Controller for updating Profile
SignIn.controller("ProfileController", function ($scope, UserApi, $location, $rootScope) {

    GetUsers();
    function GetUsers() {
        UserApi.getUser().then(function (response) {
            $scope.users = response.data;
        }), function () {
            alert("Couldn't get all the users information");
        }
    }

    $scope.Id = $rootScope.currentUser.Id;
    $scope.firstName = $rootScope.currentUser.firstName;
    $scope.lastName = $rootScope.currentUser.lastName;
    $scope.mobile = $rootScope.currentUser.mobile;
    $scope.email = $rootScope.currentUser.email;
    $scope.password = $rootScope.currentUser.password;
 

    $scope.EditUser = function () {
        var UserToEdit = {
            'Id': $scope.Id,
            'firstName': $scope.firstName,
            'lastName': $scope.lastName,
            'mobile': $scope.mobile,
            'email': $scope.email,
            'password': $scope.password
        };

        UserApi.EditUser(UserToEdit).then(function (reponse) {
            alert("User profile updated successfully");
            $scope.Id = undefined;
            $scope.firstName = undefined;
            $scope.lastName = undefined;
            $scope.mobile = undefined;
            $scope.email = undefined;
            $scope.password = undefined;
            GetUsers();
            $location.path('/Home');
        }),
           function (response) {
               alert("Unable to edit user profile");
           }
    }
});


//Search controller for Rerstaurants

SignIn.controller("SearchController", function ($scope, UserApi) {

    getRes();
    function getRes() {
        UserApi.RetrieveRestaurants().then(function (response) {
            $scope.Restaurant = response.data;
        }), function () {

            alert('Cant load data ');
        }
    }

});

SignIn.directive('ngFiles', ['$parse', function ($parse) {
    function fn_link(scope, element, attrs) {

        var Change = $parse(attrs.ngFiles);

        element.on('change', function (event) {
            Change(scope, { $files: event.target.files });
        })
    }
    return {
        link: fn_link
    }
}])

SignIn.controller('McDController', function ($scope, $location,CommonProp, $http, $rootScope, UserApi) {

   //Getting the data of products from the service by calling the function GetProducts()
 
   
    getProd();
    function getProd() {
        UserApi.GetProducts().then(function (response) {

            $scope.Product = response.data;
        })
    }
    // my shopping cart to store all the items , this is the array wherein the items will be pushed to
    $rootScope.myItems = [];
    //Add items to cart, receiving an object of items from the HTML page using newItem to store those items
    $scope.addItem = function (newItem) {
        if ($rootScope.myItems.length == 0) {//if myItems is empty then....
            newItem.count = 1;
            $rootScope.myItems.push(newItem);
        } else {
            var repeat = false;
    
            for (var i = 0; i < $rootScope.myItems.length; i++) {
                if ($rootScope.myItems[i].Prod_Id == newItem.Prod_Id) {
                    $rootScope.myItems[i].count++;
                    repeat = true;
                }
            }
            if (!repeat) {
                newItem.count = 1;
                $rootScope.myItems.push(newItem);
            }
        }
        $rootScope.updatePrice();
        $scope.$watch('myItems', function () {
            CommonProp.setItems($rootScope.myItems);
        });
    };


    // (totalPrice) - update price
     $rootScope.updatePrice = function () {
        var totalPrice = 0;
        for (var i = 0; i < $scope.myItems.length; i++) {
            totalPrice += ($scope.myItems[i].count) * ($scope.myItems[i].Prod_Price);
        }
        $scope.totalPrice = totalPrice;
        CommonProp.setTotal(totalPrice);

    };

   

    //- empty your cart
    //$scope.removeBasket = function () {
    //    $scope.myItems.splice(0, $scope.myItems.length);
    //    updatePrice();
    //};

    
});
SignIn.service('CommonProp', function () {

    var items = '';
    var total = 0;

    return {

        getItems: function () {
            return items;
        },
        setItems: function (value) {
            items = value;
        },
        getTotal: function () {
            return total;
        },
        setTotal: function (value) {
            total = value;
        }
    }
});
SignIn.filter('reverse', function () {
    return function (items) {
        var x = items.slice().reverse();
        if (items.length > 1) {
            angular.element('#ok tr').css('background', '#fff');
            angular.element('#ok tr').filter(':first').css('background', 'lightyellow');
            setTimeout(function () {
                angular.element('#ok tr').filter(':first').css('background', '#fff');
            }, 500);
        }
        return x;
    };
});
SignIn.controller('CheckoutCtrl', function ($scope ,CommonProp,$rootScope) {

    $rootScope.selectedItems = CommonProp.getItems();
    $rootScope.checkOutTot = CommonProp.getTotal();

    //Remove from cart
    $scope.removeFromCart = function () { //set a function called remove_cart
        $scope.selectedItems.splice(0,$rootScope.selectedItems.length); //delete a product based on the index 
         $rootScope.updatePrice();
    }
       
});
//Payment Controller
SignIn.controller('PaymentController', function ($scope, $location, $http, $rootScope, UserApi) {

    GetUsers();
    function GetUsers() {
        UserApi.getUser().then(function (response) {
            $scope.users = response.data;
        }), function () {
            alert("Couldn't get all the users information");
        }
    }

    $scope.Id = $rootScope.currentUser.Id;

    $scope.AdPay = function () {
        var PaymentsToAdd = {
            'card_Name': $scope.card_Name,
            'Card_Number': $scope.Card_Number,
            'CVV': $scope.CVV,
            'Id': $scope.Id
        };

        UserApi.AddPayments(PaymentsToAdd).then(function (reponse) {
            alert("Payment Was Successful");
            $scope.card_Name = undefined;
            $scope.Card_Number = undefined;
            $scope.CVV = undefined;
            $scope.Id;
            $location.path('/Order');
        }),
            function (response) {
                alert("Unable to add user");
            };
    };


});
//Order Controller
SignIn.controller('OrderController',function($scope, $location, $http, $rootScope, UserApi,CommonProp){

                        GetUsers();
                        function GetUsers() {
                            UserApi.getUser().then(function (response) {
                                $scope.users = response.data;
                            }), function () {
                                alert("Couldn't get all the users information");
                            }
                        }

                        allProducts();
                        function allProducts() {

                            UserApi.GetProducts().then(function (response) {

                                $scope.Product = response.data;
                            }),function(){

                                alert("Coudn't get all the products information");
                            }
                        }

      
                            $scope.totalPrice = CommonProp.getTotal();
                            $scope.Delivery_Address = $scope.Delivery_Address;
                            $scope.Id = $rootScope.currentUser.Id;
                            $scope.mobile = $rootScope.currentUser.mobile;
                            $scope.firstName = $rootScope.currentUser.firstName;
        
                            $scope.AdOrder = function () {
                                var OrderToAdd = {
                                    'totalPrice': $scope.totalPrice,
                                    'Delivery_Address': $scope.Delivery_Address,
                                    'Id': $scope.Id,
                                
                                };

                                UserApi.AddOrders(OrderToAdd).then(function (response) {
                                    $scope.Order = response.data;
                                    alert("Order has been placed successfully");
                                    $scope.totalPrice = undefined;
                                    $scope.Delivery_Address = undefined;
                                    $scope.Id = undefined;
                                    $scope.firstName = undefined;
                                    $scope.mobile = undefined;
                                    $location.path('/McD');
                                    $scope.adDum();
                                    
                                }),
                                    function (response) {
                                        alert("Unable to add user");
                                    };
                            };

                            $scope.adDum = function () {

                            for(var i = 0; i <= $rootScope.myItems.length; i++)
                            {
                               
                                $scope.prod_id = $rootScope.myItems[i].Prod_Id;
                                var ordItems = 
                                    {
                                        'prod_id':$scope.prod_id,
                                        'orderId': $scope.Order.OrderId
                                    }

                                UserApi.AddDum(ordItems).then(function (response) {
                                    console.log(response);
                                }),
                                function (response)
                                {
                                    alert("Unable to add");
                                }
                            }
                                                                 
                        };
                             
});
SignIn.controller('PicController',function($scope, $location, $http, $rootScope, UserApi){

    var formdata = new FormData();

    $scope.GetImages = function ($files) {
        $scope.imagesrc = [];

        for (var b = 0; b < $files.length; b++) {
            var reader = new FileReader();
            reader.Filename = $files[b].name;

            reader.onload = function (event) {
                var image = {};
                image.Name = event.target.Filename;
                image.Size = (event.total / 1024).toFixed(2);
                image.Src = event.target.result;
                $scope.imagesrc.push(image);
                $scope.$apply();
            }
            reader.readAsDataURL($files[b]);
        };
        angular.forEach($files, function (value, key) {
            formdata.append(key, value);
        })

    };
    $scope.loadup = function () {
        var reqs = {
            method: 'POST',
            url: 'http://localhost:54114/api/tblRes',
            data: formdata,
            headers: {
                'Content-Type': undefined
            }
        }

        $http(reqs).then(function (gm) {
            alert("Image saved successfully" + gm);
            $scope.reset();
        }), function () {
            alert("Failed to upload image");
            $scope.reset();
        }
    }

    $scope.reset = function () {
        angular.forEach(
            angular.element("Input [Type = 'file']"),
        function (inputElement) {
            angular.element(inputElement).val(null);
        }
            );
        $scope.imagesrc = [];
        formdata = new FormData();
    }
});
SignIn.controller('UploadProductController', function($scope, $location, $http, $rootScope, UserApi) {

    var formdata = new FormData();

    $scope.GetImages = function ($files) {
        $scope.imagesrc = [];

        for (var b = 0; b < $files.length; b++) {
            var reader = new FileReader();
            reader.Filename = $files[b].name;

            reader.onload = function (event) {
                var image = {};
                image.Name = event.target.Filename;
                image.Size = (event.total / 1024).toFixed(2);
                image.Src = event.target.result;
                $scope.imagesrc.push(image);
                $scope.$apply();
            }
            reader.readAsDataURL($files[b]);
        };
        angular.forEach($files, function (value, key) {
            formdata.append(key, value);
        })

    };
    $scope.loadup = function () {
        var reqs = {
            method: 'POST',
            url: 'http://localhost:54114/api/tblProdImages',
            data: formdata,
            headers: {
                'Content-Type': undefined
            }
        }

        $http(reqs).then(function (gm) {
            alert("Image saved successfully" + gm);
            $scope.reset();
        }), function () {
            alert("Failed to upload image");
            $scope.reset();
        }
    }

    $scope.reset = function () {
        angular.forEach(
            angular.element("Input [Type = 'file']"),
        function (inputElement) {
            angular.element(inputElement).val(null);
        }
            );
        $scope.imagesrc = [];
        formdata = new FormData();
    }

});
SignIn.controller('MyOrderController', function ($scope, $location, $http, $rootScope, UserApi) {

    getOrders();
    function getOrders() {
        UserApi.RetrieveOrders().then(function (response) {
            $scope.Order_Data = response.data;
        }), function () {

            alert('Cant load data ');
        }
    }
});