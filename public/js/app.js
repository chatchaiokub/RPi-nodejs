/* global $, angular */
angular.module('dragApp', [])
.controller('dragCtrl', function ($scope, $http) {
  $scope.drag = []
  $scope.index = ''
  $scope.dragCir = function (index) {
    $scope.drag[index].css = $('#' + index).position()
  }
  $scope.init = function () {
    $scope.drag.forEach(function (item) {
      $('#' + item.counts).draggable()
      $('#' + item.counts).css(item.css)
    })
  }
  $scope.addDrag = function (day) {
    var countOfDrag = $scope.drag.length
    $scope.drag.push({things: '', days: day, counts: countOfDrag, css: {top: 200, left: 250, position: 'absolute'}})
  }
  $scope.openDragCustom = function () {
    $('#openDragCustom').openModal()
  }
  $scope.addDragCustom = function (THING, DAY) {
    var countOfDrag = $scope.drag.length
    var now = new Date()
    var datePick = new Date(DAY)
    var SUM = Math.ceil((datePick - now) / (1000 * 3600 * 24))
    $scope.drag.push({things: THING, days: SUM, counts: countOfDrag, css: {top: 200, left: 250, position: 'absolute'}})
    $scope.THING = ''
    $scope.DAY = ''
  }
  $scope.openDragUpdate = function (item, index) {
    $('#openDragUpdate').openModal()
    $scope.index = index
    $scope.updateThing = item.things
    $scope.updateDay = item.days
  }
  $scope.updateDrag = function (updateThing, updateDay) {
    if ($scope.drag[$scope.index].things === updateThing) {
      console.log('true')
    }if ($scope.drag[$scope.index].days === updateDay) {
      console.log('true')
    }if ($scope.drag[$scope.index].things !== updateThing) {
      $scope.drag[$scope.index].things = updateThing
    }if ($scope.drag[$scope.index].days !== updateDay) {
      var noww = new Date()
      var datePickk = new Date(updateDay)
      var SUMM = Math.ceil((datePickk - noww) / (1000 * 3600 * 24))
      $scope.drag[$scope.index].things = updateThing
      $scope.drag[$scope.index].days = SUMM
    }
  }
  $scope.deleteDrag = function (index) {
    $scope.drag.splice(index, 1)
  }

  // FrontEnd Control RaspberryPi //
  $scope.click = function () {
    console.log('Snapshot!')
    $http.get('/click').success(function (response) {
      $scope.data = response
      console.log(response)
      setTimeout(function () {
        window.location = 'index.html'
      }, 1500)
    }).error(function (data, status, headers, config) {
      console.log('error')
    })
  }
  $scope.flipStatus = false
  $scope.flip = function () {
    if ($scope.flipStatus === false) {
      $scope.flipStatus = true
      console.log($scope.flipStatus)
    } else {
      $scope.flipStatus = false
      console.log($scope.flipStatus)
    }
  }
})
