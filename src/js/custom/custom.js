var App = {};
var Index = {};
var animationTime = 500; // loading
var companyErrText;
var emailErrText;
var emailPassed = false;
var companyPassed = false;

// homepage object
App = {
    init: function () {
        App.Elements.init();
        App.Listeners.init();
        App.Loading.init();        
        App.Page.checkH();

        if( App.Device.isMobile.any() ){
          skrollr.init().destroy();
        }
        else if ( $(window).width() < 1024){
          skrollr.init().destroy();
        }
        else{
          App.Parallax.skrollrInit();
        };

        $( window ).resize(function() {
         App.Page.checkH();
        });        
    },
    Elements: {
        init: function () {
          this.loadingWrap = $('#loading');
          this.lastPart = $('#last-part');
          this.count = $('.count');
          this.animateWrap = $('.animation-container');
          this.welcomeNoteWrap = $('#welcome-note');
          this.welcomeSubLabel = $('#welcome-note').find('.sub-label');          
        }
    },
    Listeners: {
        init: function () {

        }
    },
    Events: {
    },    
    Device: {
      isMobile: {
        Android: function() {
          return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function() {
          return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function() {
          return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function() {
          return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function() {
          return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i);
        },
        any: function() {
          return (App.Device.isMobile.Android() || App.Device.isMobile.BlackBerry() || App.Device.isMobile.iOS() || App.Device.isMobile.Opera() || App.Device.isMobile.Windows());
        }
      }
    },
    Page: {      
      checkH: function(){
        var curH = $('body').height();
        var curW = $(window).width();
        // console.log(curW);
        // console.log(curH);
        if(curH <= 640){
          App.Elements.lastPart.attr("data-28000","transform:translate3d(0px,-1140px, 0px);");
        }
        else{
          App.Elements.lastPart.attr("data-28000","transform:translate3d(0px,-1140px, 0px);");
        }
        if (curW < 1024) {
          skrollr.init().destroy();
        }
        else{
          App.Parallax.skrollrInit();
        }
      }      
    },
    Parallax: {
      skrollrInit: function(){
        var s = skrollr.init({
              edgeStrategy: 'set',
              easing: {
                WTF: Math.random,
                inverted: function(p) {
                  return 1-p;
                }
              },
              beforerender: function(data) {
                //console.log(data);
                  if(data.curTop > 3000){
                    // $('.cookie.whole').addClass('open');
                    // $('.cookie.broken').addClass('open');
                    // $('.logo-middle').addClass('open');
                  }
                  if(data.curTop > 2500) {
                    //Do stuff when moving up
                    App.Elements.welcomeSubLabel.addClass("active");
                  }
                  if(data.curTop > 13530){
                    App.Elements.count.each(function () {
                      $(this).addClass("start-count");
                    });
                  }
                  if(data.curTop > 17400){
                    setTimeout(function(){
                      App.Elements.animateWrap.addClass("animate");
                    }, 2000);
                  }
                  if(App.Elements.count.hasClass('start-count') && (!App.Elements.count.hasClass('end-count'))){
                    App.Elements.count.each(function () {
                      var x = ($(this).text() % 1 === 0 ? true : false);
                      $(this).prop('Counter',0).animate({
                          Counter: $(this).text()
                      }, 
                      {
                        start:0,
                        duration: 1000,
                        easing: 'swing',
                        step: function (now) {
                          if(x){
                             $(this).text(Math.ceil(now));
                          }
                          else{
                             $(this).text(this.Counter.toFixed(2));
                          }
                          $(this).addClass('end-count');
                        }
                      });
                    });
                  }

                  if(data.curTop > 7120){
                    $('.content-images.img1').addClass('animate');
                  }
                  if(data.curTop > 10140){
                    $('.content-images.img2').addClass('animate');
                  }
                  if(data.curTop > 11200){
                    $('.content-images.img3').addClass('animate');
                  }
                  if(data.curTop > 12430){
                    $('.content-images.img4').addClass('animate');
                  }
                  if(data.curTop > 14680){
                    $('.content-images.img5').addClass('animate');
                  }
                  if(data.curTop > 15560){
                    $('.content-images.img6').addClass('animate');
                  }
              }
            });        
      } 
    },   
    Loading : {
      init : function() {
        $('body').waitForImages().done(App.Loading.hide);
      },
      hide : function() {
        setTimeout(function() {
          App.Elements.loadingWrap.hide();
        },animationTime);
      }
    }
}

// index page object
Index = {
    init: function () {
      Index.Elements.init();
      Index.Listeners.init();                
    },
    Elements: {
      init: function () {
        this.phoneWrap = $('#phoneWrap');
        this.formWrap = $('#formWrap');
        this.btnPartner = $('#bePartner');
        this.btnMember = $('#beMember');
        this.companyWrap = $('#companyWrap');
        this.emailWrap = $('#emailWrap');
        this.intName = $('#name');
        this.intCompany = $('#company');
        this.intEmail = $('#email');
        this.btnSubmit = $('#submit');
        this.inputBox = $('input');
        this.subcription = $('#subcription');
      }
    },
    Listeners: {
      init: function () {
        Index.Elements.btnPartner.on("click", function(){          
          Index.Events.UI.onBePartnerClick();
        });
        // Index.Elements.inputBox.on("keyup", function(){          
        //   Index.Events.UI.toggleLabelText($(this));
        // });
        Index.Elements.inputBox.on("focusin", function(){
          Index.Events.UI.addElmClass($(this).parent(), 'focused');
        });
        Index.Elements.inputBox.on("focusout", function(){
          Index.Events.UI.removeElmClass($(this).parent(), 'focused');
        });
        Index.Elements.intCompany.on("focusout", function(){
          Index.Events.Form.companyValidate();
        });
        Index.Elements.intEmail.on("focusout", function(){
          Index.Events.Form.emailValidate();
        });                
        Index.Elements.subcription.on("submit", function(e){     
          //e.preventDefault();
          Index.Events.Form.formValidate();
        });        
      }
    },
    Events: {
      UI: {
        // add class
        addElmClass: function(elemSelector, whatClass) {
          elemSelector.addClass(whatClass);
        },
        // remove class
        removeElmClass: function(elemSelector, whatClass) {
          elemSelector.removeClass(whatClass);
        },
        // be a partner btn on click
        onBePartnerClick: function() {
          Index.Events.UI.removeElmClass(Index.Elements.phoneWrap, 'col-centered');
          Index.Events.UI.addElmClass(Index.Elements.phoneWrap, 'animated slideInRight');
          Index.Events.UI.addElmClass(Index.Elements.formWrap, 'animated fadeInRight show');
          Index.Events.UI.addElmClass(Index.Elements.btnPartner, 'active');                    
        },        
        toggleLabelText: function(_$this){
          var inputText = _$this.val();
          var elemSelector = _$this.parent().find('label');
          if(inputText !="") {
            Index.Events.UI.addElmClass(elemSelector, 'active');
          }
          else {
            Index.Events.UI.removeElmClass(elemSelector, 'active');
          }
        }
      },
      Form: {
        formValidate: function() {
          companyPassed = (Index.Events.Form.companyValidate()) ? true : false;
          emailPassed = (Index.Events.Form.emailValidate()) ? true : false;
          
          Index.Events.Form.companyValidate();
          Index.Events.Form.emailValidate();

          if(companyPassed && emailPassed){
            Index.Events.Form.postData();
            return true;
          }
          else {
            event.preventDefault();
            return false;
          }
        },
        companyValidate: function() {
          var companyText = Index.Elements.intCompany.val(); // input text value
          var regex = /^\s+$/;
          var isValid = regex.test(companyText);
          if(companyText == "" || isValid) {
            companyErrText = "Field is required. Please try again.";
            Index.Events.Form.showError(Index.Elements.companyWrap, companyErrText, 'error');
            return false;
          }
          else {
            companyErrText = "";
            Index.Events.Form.removeError(Index.Elements.companyWrap, companyErrText, 'error');
            return true;
          }
        },        
        emailValidate: function() {
          var emailText = Index.Elements.intEmail.val(); // input text value
          var emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          var isValid = emailRegex.test(emailText); // return true or false          
          if(emailText == "") {
            emailErrText = "Field is required. Please try again.";
            Index.Events.Form.showError(Index.Elements.emailWrap, emailErrText, 'error');
            return false;
          }
          else if(emailText != ""  && !isValid) {
            emailErrText = "Invalid email address. Please try again.";
            Index.Events.Form.showError(Index.Elements.emailWrap, emailErrText, 'error');
            return false;
          } else {
            emailErrText = "";
            Index.Events.Form.removeError(Index.Elements.emailWrap, emailErrText, 'error');
            return true;
          }
        },
        showError: function(elemSelector,errText,errClass){
          var errHtml = elemSelector.find('.error-msg span');
          Index.Events.UI.addElmClass(elemSelector, errClass);
          errHtml.html(errText);
        },
        removeError: function(elemSelector,errText,errClass){
          var errHtml = elemSelector.find('.error-msg span');
          Index.Events.UI.removeElmClass(elemSelector, errClass);
          errHtml.html(errText);
        },
        postData: function(){
          var url = Index.Elements.subcription.attr("action");
          var formData = Index.Elements.subcription.serializeArray();
          $.post(url, formData).done(function (data) {
              alert(data);
          });
        }                
      }      
    }
}

$(document).ready(function() {
    App.init();
    Index.init();
});