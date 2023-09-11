var x=1000;
document.getElementById("reset").disabled=true;
var session_time=0;
var break_time=0;
var break_time_value=0;
var session_time_value=0;
var s_count=1;
var b_count=1;
var second=1;
var ids,idb;
var Pause_time=0;
var Pause_tag=2;   //0 for session 1 for break;
function session_counter(flag){
    if(flag){
        if(session_time>0){
            session_time--;
        }
    }
    else{
        session_time++;
    }
    session_time=parseInt(session_time);
    if(session_time<10){
        session_time='0'+session_time;
    }
    document.getElementById("st_label").innerText=session_time+" min";
}
function break_counter(flag){
    if(flag){
        if(break_time>0){
            break_time--;
        }
    }
    else{
        break_time++;
    }
    break_time=parseInt(break_time);
    if(break_time<10){
        break_time='0'+break_time;
    }
    document.getElementById("br_label").innerText=break_time+" min";
}
function timerbreak(flag){
    Pause_tag=1;
    let time;
    if(flag){
        time=break_time*60;
    }
    else{
        time=Pause_time;
    }
    if(time==0){
        timersession(true);
        return;
    }
    document.getElementById("s_b_count").innerText="Break "+b_count;
    document.getElementById("s_b_count").style.color="rgb(221, 108, 72)";
    idb=setInterval(function(){
        if(time==0){
            b_count++;
            clearInterval(idb);
            timersession(true);
        }
        let mm=0,ss=0;
        mm=parseInt(time/60);
        ss=time%60;
        time--;
        Pause_time=time;
        if(mm<10){mm="0"+mm};
        if(ss<10){ss="0"+ss};
        document.getElementById("displaytime").innerText=mm+":"+ss;
        document.getElementById("displaytime").style.color="rgb(221, 108, 72)";
        document.getElementById("timedisplay").style.backgroundColor="rgb(221, 108, 72)";
    },x);
}
function timersession(flag){
    Pause_tag=0;
    let time;
    if(flag){
        time=session_time*60;
    }
    else{
        time=Pause_time;
    }
    if(time==0){
        timerbreak(true);
        return;
    }
    document.getElementById("s_b_count").innerText="Session "+s_count;
    document.getElementById("s_b_count").style.color="rgb(30, 203, 217)";
    ids=setInterval(function(){
        if(time==0){
            s_count++;
            clearInterval(ids);
            timerbreak(true);
        }
        let mm=0,ss=0;
        mm=parseInt(time/60);
        ss=time%60;
        time--;
        Pause_time=time;
        if(mm<10){mm="0"+mm};
        if(ss<10){ss="0"+ss};
        document.getElementById("displaytime").innerText=mm+":"+ss;
        document.getElementById("displaytime").style.color="rgb(30, 203, 217)";
        document.getElementById("timedisplay").style.backgroundColor="rgb(30, 203, 217)";
    },x);
}
function onstart(){
    var check_label=document.getElementById("start");
    if(Pause_tag==2){
        if(session_time==0 && break_time==0){
            alert("Please Enter Session or Break time Value ......");
            return;
        }
    }
    if(check_label.innerText=="Start"){
        check_label.innerText="Pause";
        document.getElementById("reset").disabled=false;
        let cls=document.getElementsByClassName("tb");
        for(let i=0;i<cls.length;i++){
            cls[i].disabled=true;
        }
        if(Pause_tag==2){
           timersession(true); 
        }
        else if(Pause_tag==0){
            timersession(false);
        }
        else{
            timerbreak(false);
        }
    }
    else{
        console.log("Pause");
        if(Pause_tag==0){
            clearInterval(ids);
        }
        else{
            clearInterval(idb);
        }       
        check_label.innerText="Start";
    }
    
}

function onresets(){
    var check_label=document.getElementById("start");
    check_label.innerText="Start";
    document.getElementById("reset").disabled=true;
    let cls=document.getElementsByClassName("tb");
    for(let i=0;i<cls.length;i++){
        cls[i].disabled=false;
    }
    Pause_time=0;
    Pause_tag=2;
    session_time=0;
    break_time=0;
    document.getElementById("st_label").innerText=session_time+"0"+" min";
    document.getElementById("br_label").innerText=break_time+"0"+" min";
    clearInterval(ids);
    clearInterval(idb);
    document.getElementById("displaytime").innerText="00"+":"+"00";
    document.getElementById("displaytime").style.color="black";
    s_count=1;
    b_count=1;
    document.getElementById("s_b_count").innerText="Session "+0;
    document.getElementById("s_b_count").style.color="rgb(234, 233, 229)";
    document.getElementById("timedisplay").style.backgroundColor="rgb(99, 99, 97)";
}
