const video = document.getElementById("video");

navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" } })
.then(stream => {
    video.srcObject = stream;
});

function capture() {
    navigator.geolocation.getCurrentPosition(pos => {

        const canvas = document.createElement("canvas");
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        canvas.getContext("2d").drawImage(video, 0, 0);

        const photo = canvas.toDataURL("image/jpeg");

        fetch("/upload", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                photo: photo,
                latitude: pos.coords.latitude,
                longitude: pos.coords.longitude
            })
        }).then(() => alert("Photo & Location sent successfully."));
    });
}
