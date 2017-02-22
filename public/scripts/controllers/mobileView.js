angular.module('sbAdminApp')
.controller('mobileViewCtrl', function($scope, $http){
    $scope.postUserVal = function(){
        var dataVal = {
            "user_id":$scope.userId,
            "screen":$scope.userScreen,
            "param_value": ''
        }
        var res = $http.post('/communication/fetchPromotionBanner',dataVal);
        res.success(function(data, status, headers, config){
            $scope.mobileBanner = data;
        })
        res.error(function(data, status, headers, config){
            alert('Something went wrong');
        })

        var smartMsg = $http.post('/communication/fetchSmartMessage', dataVal);
        smartMsg.success(function(data, status, headers, config){
            $scope.smartmessage = data
        })
        smartMsg.error(function(data, status, headers, config){
            alert('something went wrong')
        })
        
        var markeingCategories = $http.post('/communication/fetchMarketingGroup',dataVal);
        markeingCategories.success(function(data, status, headers, config){
            $scope.categories = data
        })
        markeingCategories.error(function(data, status, headers, config){
            alert('something went wrong')
        })
        
        var missionList = $http.post('/campaign/getUserCampaignData', dataVal);
        missionList.success(function(data, status, headers, config){
            $scope.missions = date
        })
        missionList.error(function(data, status, headers, config){
            alert('something went wrong')
        })
    };
})
