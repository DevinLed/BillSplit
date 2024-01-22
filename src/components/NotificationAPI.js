import NotificationAPI from 'notificationapi-js-client-sdk';
import 'notificationapi-js-client-sdk/dist/styles.css';
import { PopupPosition } from 'notificationapi-js-client-sdk/lib/interfaces';
import { memo, useEffect } from 'react';

const NotificationAPIComponent = memo((props) => {
  useEffect(() => {
    const notificationapi = new NotificationAPI({
      clientId: '49foj0su1nftfvk9p0rvmh31s1',
      userId: props.loggedInUserEmail,
    });
    console.log("props?", props.loggedInUserEmail);
    notificationapi.showInApp({
      root: 'CONTAINER_DIV_ID',
      popupPosition: PopupPosition.BottomRight
    });
  }, [props.loggedInUserEmail]);

  return <div id="CONTAINER_DIV_ID"></div>;
});

export default NotificationAPIComponent;