angular.module('sbAdminApp')
.directive('bxSlider', function(){
    return{
        restrict: "A",
        require: "ngModel",
        link: function(scope, element, attrs, ctrl){
            element.ready(function(){
                $($(element[0])).bxSlider({
                    controls:false,
                    pagination:true,
                    maxSlides: 1,
                    minSlides:1
                });
            })
        }
    }
})