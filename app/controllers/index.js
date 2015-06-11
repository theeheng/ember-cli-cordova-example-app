import Ember from 'ember';

export default Ember.Controller.extend({
	today: Ember.computed(function() {
    return new Date();
  }),

  dataWedgeCallbackInitialised : false,

  wedgeResult: 'na',

  barcodeResult: 'na',

  imgSrc: 'assets/200.jpg',

  onPhotoDataSuccess : function (imageData) {
      //alert('Success.');
      //alert(imageData);

      this.set('imgSrc',imageData);

    },

      onFail : function (message) {
      alert('Failed because: ' + message);
    },
  capturePhoto : function () {
    // body...
    
    
    //alert(navigator.camera);
 	
     navigator.camera.getPicture(this.onPhotoDataSuccess.bind(this), this.onFail , { quality: 50 });
    },

    onBarcodeSuccess : function (result) {

      var stringResult = "We got a barcode\n" +
                "Result: " + result.text + "\n" +
                "Format: " + result.format + "\n" +
                "Cancelled: " + result.cancelled;

          alert(stringResult);

          this.set('barcodeResult',stringResult);

      },
   onBarcodeFailed : function (error) {
          alert("Scanning failed: " + error);
      },

onDataWedgeSuccess : function(data){
           var labelType = data.type,
               barcode   = data.barcode;

          this.set('wedgeResult',"Barcode scanned.  Label type is: " + labelType + ", " + barcode);

           alert("Barcode scanned.  Label type is: " + labelType + ", " + barcode);

           //TODO: handle barcode/label type
       },

  actions: {
    
    takeAPicture: function() {
      this.capturePhoto();
      return false;
    },
    scanABarcode: function() {

       cordova.plugins.barcodeScanner.scan( this.onBarcodeSuccess.bind(this), this.onBarcodeFailed);
       return false;

     },

      scanWithDataWedge: function() {

       if (window.datawedge) {

        if(!this.dataWedgeCallbackInitialised)
        {
            alert('register data wedge callback ');
            //datawedge.start();

            //datawedge.start("com.yourintent.whatever_you_configured_to_broadcast_in_default_profile");
            datawedge.registerForBarcode(this.onDataWedgeSuccess.bind(this));

            this.set('dataWedgeCallbackInitialised', true);
        }        
        datawedge.startScanner();
      }
      else
      {
        alert('data wedge plugin not found ');
      }
      return false;
    }
  } 
});
