import Cookies from 'js-cookie';
import Uuid from 'uuid-js';

const getBaseFetchOptions = ()=>{
  let headers = new Headers({
    'Content-Type' : 'application/json',
    'Accept': 'application/json'
  });
  return {
    headers:  headers,
    credentials: 'omit',
    method: 'POST',
  };
}

const getErrorMessageFromResponse = (response)=>{
  return new Promise((resolve, reject)=>{
    let errorMsg = 'An Error Occured!';
    if(response.statusText){
      errorMsg += '  '+response.statusText;
    }
    response.json().then((json)=>{
      if(json.error && json.error.exception['0']){
        errorMsg = json.error.exception['0'].message;
      }
      resolve(errorMsg);
    }).catch(()=>{
      resolve(errorMsg);
    });
  });
};

const getPlatformType = ()=>{
    if(navigator.userAgent.match(/mobile/i)) {
        return 'Mobile';
    } else if (navigator.userAgent.match(/iPad|Android|Touch/i)) {
        return 'Tablet';
    } else {
        return 'Desktop';
    }
};

const sendData = (url, data)=>{
  return new Promise((resolve, reject)=>{
    let options = getBaseFetchOptions();
    options.method = 'POST';
    options.body = JSON.stringify(data);
    fetch(url, options).then((response)=>{
      if(response.ok){
        response.json().then((responseData)=>{
          resolve(responseData);
        });
      }else{
        getErrorMessageFromResponse(response).then((errorMsg)=>{reject(errorMsg)});
      }
    });
  });
}

const getBaseUrl = (options)=>{
  if(options.env === 'dev'){
    return 'https://localhost:8443/conversion_tracking';
  }else if(options.env === 'stag'){
    return 'https://vsm-staging01.vitalstorm.com/conversion_tracking';
  }else{
    return 'https://metrics.vitalstorm.com/conversion_tracking';
  }
};

const init = (options)=>{
  return new Promise((resolve, reject)=>{
    const urlParams = new URLSearchParams(window.location.search);
    const uuid = Uuid.create();
    let source = null;
    let clickId = null;
    let adId = null;
    if(urlParams.has('gclid')){
      source = 'adwords';
      clickId = urlParams.get('gclid');
      Cookies.set('gclid', clickId, { expires: 14 });
    }else if(Cookies.get('gclid')){
      source = 'adwords';
      clickId = Cookies.get('gclid');
    }
    if(urlParams.has('msclkid')){
      source = 'adcenter';
      clickId = urlParams.get('msclkid');
      adId = urlParams.get('msadid');
      Cookies.set('msclkid', clickId, { expires: 14 });
      Cookies.set('msadid', adId, { expires: 14 });
    }else if(Cookies.get('msclkid')){
      source = 'adcenter';
      clickId = Cookies.get('msclkid');
      adId = Cookies.get('msadid');
    }
    if(urlParams.has('fbclid')){
      source = 'facebook';
      clickId = urlParams.get('fbclid');
      Cookies.set('fbclid', clickId, { expires: 14 });
    }else if(Cookies.get('fbclid')){
      source = 'facebook';
      clickId = Cookies.get('fbclid');
    }
    if(clickId && source){
      const baseClickData = {
        source: source,
        device: getPlatformType(),
        clickId: clickId,
        visitUuid: uuid.toString()
      };
      if(adId){
        baseClickData.adId = adId;
      }
      document.querySelectorAll('a[href]').forEach((elem)=>{
        if(elem.href.indexOf('tel:') === 0){
          elem.addEventListener('click', (event)=>{
            const calledNumber = elem.href.replace(/\D/g,'');
            const ctcData = Object.assign({calledNumber: calledNumber}, baseClickData);
            sendData(getBaseUrl(options)+'/click_to_call_event/', ctcData);
          });
        }
      });

      document.querySelectorAll('input[name=gclid]').forEach((elem)=>{
        elem.value = clickId;
      });

      sendData(getBaseUrl(options)+'/campaign_ad_click/', baseClickData).then((data)=>{
        resolve(data);
      });
    }else{
      console.log('VS LP CONV ERROR: Click Id Or Source was invalid');
      resolve({error: 'Click Id Or Source was invalid'});
    }
  });
};
if(typeof window !== 'undefined'){
    window.INIT_VS_LP = init;
}

export default {init};