import $ from 'jquery';

function changeActive() {
    $(".form").toggleClass("expanded");
  }  

  const now = new Date();
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const today = days[now.getDay()];
  
  function printCoupon() {
      if(typeof window !== 'undefined'){
          window.print();
      }
    }
  
    function getUrlVars(){
      var vars = [], hash;
      if(typeof window !== 'undefined'){
          var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
          for(var i = 0; i < hashes.length; i++)
          {
              hash = hashes[i].split('=');
              vars.push(hash[0]);
              vars[hash[0]] = hash[1];
          }
      }
      return vars;
    }
    var city = getUrlVars()["city"];
    var ourServices = "/our-services?city=" + city;
  
    if (city === null) {
        city = "";
        if (typeof window !== 'undefined') {
          $(".ourServices").attr('href', "/our-services/");
      }
    } else if (city === "") {
        city = "";
    } else if (city !== undefined) {
        city = " in " + city;
        if (typeof window !== 'undefined') {
            $(".ourServices").attr('href', ourServices);
        }
    }
    /* REPLACE COMPANYNAME IN COPY */
      if(typeof window !== 'undefined'){
          $(window).on('load', function(){
            $('div.pageContent a').attr('href', function(i, href){
              city= getUrlVars()['city'];
          });
          var city = getUrlVars()["city"];
              $("p").each(function(){
                  var text = $(this).text();
                  text = text.replace("[city]", city);
                  $(this).text(text); 
              });
          });
      }