"use client"
import React, { Component} from 'react';
import { FacebookProvider, CustomChat } from 'react-facebook';

const FacebookMessenger = () => {
    return (
        <FacebookProvider appId="1844353725960841" chatSupport>
        <CustomChat pageId="335143273544144" minimized={true}/>
      </FacebookProvider>  
    );
}

export default FacebookMessenger;

// <!-- Messenger Chat Plugin Code -->
//     <div id="fb-root"></div>

//     <!-- Your Chat Plugin code -->
//     <div id="fb-customer-chat" class="fb-customerchat">
//     </div>

//     <script>
//       var chatbox = document.getElementById('fb-customer-chat');
//       chatbox.setAttribute("page_id", "335143273544144");
//       chatbox.setAttribute("attribution", "biz_inbox");
//     </script>

//     <!-- Your SDK code -->
//     <script>
//       window.fbAsyncInit = function() {
//         FB.init({
//           xfbml            : true,
//           version          : 'v17.0'
//         });
//       };

//       (function(d, s, id) {
//         var js, fjs = d.getElementsByTagName(s)[0];
//         if (d.getElementById(id)) return;
//         js = d.createElement(s); js.id = id;
//         js.src = 'https://connect.facebook.net/en_US/sdk/xfbml.customerchat.js';
//         fjs.parentNode.insertBefore(js, fjs);
//       }(document, 'script', 'facebook-jssdk'));
//     </script>