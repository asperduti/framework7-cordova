import Framework7 from 'framework7'
import Dom7 from 'dom7'
import 'framework7/css/framework7.md.min.css'
import Main from './js/main.js'
import './css/index.css'
import i18next from 'i18next'
import XHR from 'i18next-xhr-backend';

var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
        // Init App
        window.$ = Dom7;
        window.myApp = new Framework7({
            // App root element
            root: '#app',
            // App Name
            name: 'My App',
            // App id
            id: 'com.myapp.test',
            // Enable swipe panel
            panel: {
               swipe: 'left',
            },
            // Add default routes
            routes: [
               {
                  path: '/about/',
                  url: './page/about.html',
              },
            ],
            // Enable Material theme
            material:false

        });
        myApp.views.create('.view-main', {
            domCache: true
        });
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
        this.initl18next();
        Main.init();
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        console.log('Received Event: ' + id);
    },

    // Inicialización de servicio de traducción
    initl18next: function() {
      let lang = "";
      let self = this;
      navigator.globalization.getPreferredLanguage(
        function (language) {
          lang = language.value;
          self.doiniti18next(lang);
      },
        function () {
          console.log('Error getting language\n');
          self.doiniti18next("en");
          }
      );
   },

    // Ejecuta traducción
    doiniti18next: function(lang) {
       i18next.use(XHR)
       i18next.init({
         lng: lang.substring(0,2),
         fallbackLng: 'en',
         backend: {
            "loadPath": "./locales/{{ lng }}/translation.json"
        }
       }, function(t) {
         console.log("Translation actived");
         window.$(".translable").each(function(){
            window.$(this).html(i18next.t(window.$(this).text()));
         });
       });
    }
};

app.initialize();
