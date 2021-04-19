hp=""
pp=""
lwristx="";
rwristx="";
lwristy="";
rwristy="";
lwrists="";
rwrists="";
function preload(){
    hp=loadSound("music.mp3")
    pp=loadSound("music2.mp3")
}
function setup(){
    canvas=createCanvas(400,400);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    posenet=ml5.poseNet(video,modelloaded);
    posenet.on('pose',gotposes);
}
function modelloaded(){
    console.log("Model Loaded");
}
function play(){
    hp.play();
    pp.stop()
}
function pause(){
    pp.play()
    hp.stop()
}
function gotposes(results){
    if(results.length>0){
        console.log(results);
        lwristx=results[0].pose.leftWrist.x;
        lwristy=results[0].pose.leftWrist.y;
        rwristx=results[0].pose.rightWrist.x;
        rwristy=results[0].pose.rightWrist.y;
        lwrists=results[0].pose.keypoints[9].score;
        rwrists=results[0].pose.keypoints[10].score;
        console.log(lwristx,lwristy,rwristx,rwristy);
    }
}
function draw(){
    image(video,0,0,400,400)
    fill("red");
    stroke("blue");
    if(lwrists>0.2){
        circle(lwristx,lwristy,20);
        lwristy_number=Number(lwristy);
        remd=floor(lwristy);
        volume=remd/500;
        hp.setVolume(volume);
        pp.setVolume(volume);
        document.getElementById("pp").innerHTML="volume= "+ volume;
    }
    if(rwrists>0.2){
        circle(rwristx,rwristy,20);
        if(rwristy>0&&rwristy<=100){
            hp.rate(0.5)
            pp.rate(0.5)
            document.getElementById("hp").innerHTML="speed= 0.5x";
        }
        else if(rwristy>100&&rwristy<=200){
            song.rate(1)
            pp.rate(1)
            document.getElementById("hp").innerHTML="speed= 1x";
        }
        else if(rwristy>200&&rwristy<=300){
            song.rate(1.5)
            pp.rate(1.5)
            document.getElementById("hp").innerHTML="speed= 1.5x";
        }
        else if(rwristy>300&&rwristy<=400){
            song.rate(2)
            pp.rate(2)
            document.getElementById("hp").innerHTML="speed= 2x";
        }
        else if(rwristy>400&&rwristy<=500){
            song.rate(2.5)
            pp.rate(2.5)
            document.getElementById("hp").innerHTML="speed= 2.5x";
        }
    }
}