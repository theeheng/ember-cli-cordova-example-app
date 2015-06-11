// app/initializers/i18n.js

import Ember from 'ember';

var initializeI18n = function(container, application) {
  console.log('initializing translations');
  //do your thing
};

export
default {
  name: 'i18n',
  after: 'waitForCordova',
  initialize: function(container, application) {
    var subscriber;
    if (application.get('shouldSubscribeCordovaDeviceReady')) {
      application.deferReadiness();
      subscriber = Ember.Instrumentation.subscribe('cordova:deviceready', {
        before: Ember.K,
        after: function() {
          initializeI18n(container, application);
          application.advanceReadiness();
          Ember.Instrumentation.unsubscribe(subscriber);
        }
      });
    } else {
      initializeI18n(container, application);
    }
  }
};