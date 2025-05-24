export const initFacebookSDK = (appId: string): Promise<void> => {
  return new Promise((resolve) => {
    window.fbAsyncInit = function () {
      FB.init({
        appId,
        cookie: true,
        xfbml: true,
        version: 'v22.0',
      });

      resolve();
    };

    (function (d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s) as HTMLScriptElement;
      js.id = id;
      js.src = 'https://connect.facebook.net/en_US/sdk.js';
      fjs.parentNode?.insertBefore(js, fjs);
    })(document, 'script', 'facebook-jssdk');
  });
};

declare global {
  interface Window {
    FB: any;
    fbAsyncInit: () => void;
  }
}
