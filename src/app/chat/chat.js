angular.module('ngChatApp.chat', [
    'ui.router',
    'ngWebSocket'
])

    .config(function config($stateProvider) {
        $stateProvider.state('chat', {
            url: '/chat',
            views: {
                "main": {
                    controller: 'ChatCtrl',
                    templateUrl: 'chat/chat.tpl.html'
                }
            },
            data: {pageTitle: 'Chat'}
        });
    })

    .controller('ChatCtrl', function ($scope, $websocket) {
        this.someVar = 'hello';
        this.webSocket=$websocket;
        this.stream = $websocket('ws://192.168.100.100:1337');

        $scope.collection = [];

        this.stream.onMessage(function (message) {
            $scope.collection.push(JSON.parse(message.data));
        });
        $scope.username = 'banana';
        this.stream.send($scope.username);

        var _this = this;
        $scope.sendMessage = function () {
            _this.stream.send($scope.newMessage);
            $scope.newMessage = '';
        };
    });