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
      // console.log(item)
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
  $scope.addDragCustom = function (THING, DATEPICKER) {
    var countOfDrag = $scope.drag.length
    var now = new Date()
    var datePick = new Date(DATEPICKER)
    var datePicked = datePick.getDate() + (datePick.getMonth() * 30)
    var dateNow = now.getDate() + (now.getMonth() * 30)
    $scope.drag.push({things: THING, days: datePicked - dateNow, counts: countOfDrag, css: {top: 200, left: 250, position: 'absolute'}})
    THING = ''
    DATEPICKER = ''
  }
  $scope.openDragUpdate = function (index) {
    $('#openDragUpdate').openModal()
    $scope.index = index
    $scope.update.thing = ''
    $scope.update.day = ''
  }
  $scope.updateDrag = function (update) {
    var now = new Date()
    var datePick = new Date(update.day)
    var datePicked = datePick.getDate() + (datePick.getMonth() * 30)
    var dateNow = now.getDate() + (now.getMonth() * 30)
    $scope.drag[$scope.index].things = update.thing
    $scope.drag[$scope.index].days = datePicked - dateNow
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
