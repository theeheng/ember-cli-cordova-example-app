// app/initializers/cordova.js

import Ember from 'ember';

var CordovaInitializer = {
  name: 'waitForCordova',
  before: 'i18n',
  initialize: function(container, application) {
    application.set('shouldSubscribeCordovaDeviceReady', false);
    if (window.cordova) {
      console.log('defering app launch until cordova is ready...');

      application.set('shouldSubscribeCordovaDeviceReady', true);
      application.deferReadiness();

      document.addEventListener('deviceready', function() {
        console.log('lift off!');
        Ember.Instrumentation.instrument('cordova:deviceready', null, Ember.K);
        application.set('shouldSubscribeCordovaDeviceReady', false);
        application.advanceReadiness();

         if (window.datawedge) {

          alert('start datawedge');
         datawedge.start(); //uses default
         //datawedge.start("com.yourintent.whatever_you_configured_to_broadcast_in_default_profile");
      /*datawedge.registerForBarcode(function(data){
           var labelType = data.type;
           var barcode   = data.barcode;

           alert("Barcode scanned.  Label type is: " + labelType + ", " + barcode);

           //TODO: handle barcode/label type
       }); */
    }



      }, false);
    }
  }
};

export
default CordovaInitializer;