function displayfunc(){
  var x=document.getElementById("instructions");
  var y=document.getElementById("tryme");
  var z=document.getElementById("snap");
  if(x.style.display==='block')
{  x.style.display='none';
    y.style.display='none';
     z.style.display='none'}
  else
{  x.style.display='block';
   y.style.display='block';
    z.style.display='block';}
}
function showcam(){
  var x=document.getElementById("tryme");
  var y=document.getElementById("webcam");
  var video=document.getElementById("videoElement");
  if(document.getElementById("tryme").textContent==="Try-Me"){
    x.textContent='Close-cam';
      y.style.display='block';

      navigator.getUserMedia=navigator.getUserMedia||navigator.webkitGetUserMedia||navigator.mozGetUserMedia||navigator.msGetUserMedia||navigator.oGetUserMedia
      if(navigator.getUserMedia){navigator.getUserMedia({video:true},handleVideo,videoError);
      }
      function handleVideo(stream){

        video.srcObject = stream;
        video.play();

      }
      function videoError(e){alert(e);}
  }
  else{
    x.textContent='Try-Me';
      y.style.display='none';
      bt=document.getElementById("M");
        bt.style.display='none';
  canvas = document.getElementById("canvas");
  canvas.style.display='none';

      const stream = video.srcObject;
        const tracks = stream.getTracks();

        tracks.forEach(function(track) {
          track.stop();
        });

        video.srcObject = null;


  }

}
function snapimg(){
  var video=document.getElementById("videoElement");
  canvas = document.getElementById("canvas");
  canvas.style.display='block';
   bt=document.getElementById("M");
     bt.style.display='block';
  ctx = canvas.getContext('2d');
ctx.drawImage(video, 0,0, canvas.width, canvas.height);
}
function sendserver(){
  canvas = document.getElementById("canvas");
  var  img=canvas.toDataURL();
  var data={image:img};
    const url="http://127.0.0.1:5000/";
    fetch(url,{
      method:"post",
      body:JSON.stringify(data),
      headers:{
        'Content-Type':'application/json'
      }
    }).then(res => res.json())
    .then(res2 =>
    console.log(res2));
 }