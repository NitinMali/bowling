/**
 * @ngdoc directive
 *
 * @name bowling.ball
 * @description Ball directive
 *
 * Try: Compile, apply , bind
 *
 * @requires $scope
 * @requires game
 * @requires $state

 * @author Nitin mali
 */

bowling.directive('ball', function(){
    return {
        restrict: 'AE',
        replace: true,
        compile: function compile(tEle, attr) {
            tEle.attr('src',attr.ballSrc);
            return  function($scope, ele, attr){
                    ele.bind('click', function () {
                        $scope.$apply(function(){
                            $scope.getScore(attr.ballType);

                            if ($scope.flashScore === 'Bye') {
                                ele.parent().parent().find('.ball').hide();
                            }
                        });
                    });
                }
        },

        template: '<img class="ball">'
    }
});