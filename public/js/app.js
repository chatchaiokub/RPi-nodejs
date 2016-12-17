/* global $, angular */
angular.module('dragApp', [])
.controller('dragCtrl', function ($scope, $http, $q) {
  $scope.drag = []
  $scope.index = ''

  $scope.getData = function () {
    $http.get('/api').success(function (response) {
      $scope.drag = response
    })
  }
  $scope.getData()
  $scope.dragCir = function (index) {
    var css = $('#' + index).position()
    css.position = 'absolute'
    $scope.drag[index].css = css
    $http.put('/api/' + $scope.drag[index]['_id'], $scope.drag[index]).then(function (res) {
      console.log(res.data)
    })
  }

  $scope.init = function () {
    $scope.drag.forEach(function (item) {
      $('#' + item.counts).draggable()
      $('#' + item.counts).css(item.css)
    })
  }
  $scope.addDrag = function (day) {
    var countOfDrag = $scope.drag.length
    var dataForPush = {things: '', days: day, counts: countOfDrag, css: {top: 200, left: 250, position: 'absolute'}}
    $http.post('/api', dataForPush).success(function (response) {
      $scope.drag.push(response)
    }).error(function (data, status, headers, config) {
      console.log('error')
    })
  }
  $scope.openDragCustom = function () {
    $('#openDragCustom').openModal()
  }
  $scope.addDragCustom = function (THING, DAY) {
    var countOfDrag = $scope.drag.length
    var now = new Date()
    var datePick = new Date(DAY)
    var SUM = Math.ceil((datePick - now) / (1000 * 3600 * 24))
    var dataCustomForPush = {things: THING, days: SUM, counts: countOfDrag, css: {top: 200, left: 250, position: 'absolute'}}
    $http.post('/api', dataCustomForPush).success(function (response) {
      $scope.drag.push(response)
      $scope.THING = ''
      $scope.DAY = ''
    }).error(function (data, status, headers, config) {
      console.log('error')
    })
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
    $http.put('/api/' + $scope.drag[$scope.index]['_id'], $scope.drag[$scope.index]).then(function (res) {
      console.log(res.data)
    })
  }
  $scope.deleteDrag = function (index) {
    $http.delete('/api/' + $scope.drag[$scope.index]['_id']).then(function (res) {
      $scope.drag.splice($scope.index, 1)
      console.log(res.data)
    })
  }

  // FrontEnd Control RaspberryPi //
  $scope.click = function () {
    console.log('Snapshot!')
    $http.get('/click').success(function (response) {
      $scope.data = response
      console.log(response)
      setTimeout(function () {
        window.location = 'index.html'
      }, 6000)
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
