/**
 * Tests sit right alongside the file they are testing, which is more intuitive
 * and portable than separating `src` and `test` directories. Additionally, the
 * build process will exclude all `.spec.js` files from the build
 * automatically.
 */
describe( 'chat section', function() {

    var mockWebSocketFactory;
    var webSocketInstance;

    var controller;
    var $scope;

    beforeEach(module("ngWebSocket", function ($provide) {

        mockWebSocketFactory = function () {
            webSocketInstance = {};
            webSocketInstance.send = jasmine.createSpy('send');
            webSocketInstance.onMessage = jasmine.createSpy('onMessage');
            return webSocketInstance;
        };
        $provide.value("$websocket", mockWebSocketFactory);

    }));


    beforeEach( module( 'ngChatApp.chat' ) );

    beforeEach(function () {

        inject(function (_$rootScope_, $controller) {
            $scope = _$rootScope_.$new();
            controller = $controller('ChatCtrl', {$scope: $scope});
        });

    });

    it('should have a property called someVar = equal to hello.', function () {
        expect(controller.someVar).toBe('hello');
    });

    it('should have a property called webService that is truthy.', function () {
        expect(controller.webSocket).toBeTruthy();
    });

    it('should have a property called stream that follows the api', function () {
        expect(controller.stream).toBe(webSocketInstance);
        expect(typeof controller.stream.send).toBe('function');
        expect(typeof controller.onMessage).toBeTruthy('function');
    });

    it('should have a scope property called username equal to banana', function () {
        expect($scope.username).toBe('banana');
    });

    it('should have called websocket send method with banana', function () {
        expect(webSocketInstance.send).toHaveBeenCalledWith('banana');
    });

    it('should have a scope property called collection that has the sent messages', function () {
        var chatSessionCallback = webSocketInstance.onMessage.mostRecentCall.args[0];
        chatSessionCallback({data:'{"text":"test"}'});
        expect($scope.collection).toEqual([{text:'test'}]);
    });

    it('should have a method called sendMessage that sends the property newMessage using the stream.send method', function () {
        $scope.newMessage = 'test';
        $scope.sendMessage();
        expect(webSocketInstance.send).toHaveBeenCalledWith('test');
        expect($scope.newMessage).toBe('');
    });

});

