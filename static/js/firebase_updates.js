var firebase = new Firebase('https://thebluealliance.firebaseio.com/notifications/');

firebase.on('child_changed', function(snapshot) {
    updateNotifications(snapshot);
});

firebase.on('child_added', function(snapshot) {
    updateNotifications(snapshot);
});

firebase.on('value', function(snapshot) {
    updateNotifications(snapshot);
});

function updateNotifications(snapshot){
    snapshot.forEach(function(child){
        var data = child.val();
        var payload = data['payload'];
        if(payload == null){
            return;
        }
        var timeString = data['time'];
        var time = new Date(timeString);
        var messageData = JSON.stringify(payload['message_data'], null, 2);
        var messageType = payload['message_type'];

        strData = "<div><p>"+time+": "+messageType+"</p><pre>"+messageData+"</pre></div>";
        $('#notifications').prepend(strData);
    });
}
