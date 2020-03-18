var stopwatch = document.getElementById('stopwatch');
var laps = document.getElementById('laps');
var tbodyTable = document.getElementById('tbodyTable');
var lapButton = document.getElementById('lap');
var startButton = document.getElementById('start');
var stopButton = document.getElementById('stop');
var dischargeButton = document.getElementById('discharge');
var mainTimerMs = 0;
var mainTimerS = 0;
var mainTimerM = 0;
var mainTimer;
var smallTimer;
var smallTimerMs = 0;
var smallTimerS = 0;
var smallTimerM = 0;


window.onload = function(){
    document.getElementById('start').onclick = function(){
        start();
        changeButtons();
    };
    document.getElementById('discharge').onclick = function(){
        discharge();
    };
    document.getElementById('stop').onclick = function(){
        stop(mainTimer);
        stop(smallTimer);
        changeButtons();
    };
    document.getElementById('lap').onclick = function(){
        if(tbodyTable.firstChild !== null){
            tbodyTable.firstChild.remove(); 
        }
               
        lap();        
        count++;   
        lapfirst();
        count--; 
        
    };
};

function changeButtons(){
    if(startButton.style.display != 'none'){
        lapButton.style.display = 'inline-block';
        stopButton.style.display = 'inline-block';    
        startButton.style.display = 'none';
        dischargeButton.style.display = 'none';
    } else {
        lapButton.style.display = 'none';
        stopButton.style.display = 'none';    
        startButton.style.display = 'inline-block';
        dischargeButton.style.display = 'inline-block';
    }  
}

function start(){
    mainTimer = setInterval(runMainTimer, 10);    
    smallTimer = setInterval(runSmallTimer, 10);
}

function runMainTimer(){
    mainTimerMs++;
    if(mainTimerMs == 100) {
        mainTimerMs = 0;
        mainTimerS++;
    }
    if(mainTimerS == 60) {
        mainTimerS = 0;
        mainTimerM++;
    }
    stopwatch.innerText = getMainTimer(mainTimerMs, mainTimerS, mainTimerM);
}

function runSmallTimer(){
    smallTimerMs++;
    if(smallTimerMs == 100) {
        smallTimerMs = 0;
        smallTimerS++;
    }
    if(smallTimerS == 60) {
        smallTimerS = 0;
        smallTimerM++;
    }
    
}




function getMainTimer(ms, s, m){
    return (m < 10 ? "0" + m : m) + ":" + (s < 10 ? "0" + s : s) + ":" + (ms < 10 ? "0" + ms : ms);
}

function discharge(){
    
    mainTimerMs = 0;
    mainTimerS = 0;
    mainTimerM = 0;
    smallTimerMs = 0;
    smallTimerS = 0;
    smallTimerM = 0;
    count = 0;
    clearInterval(mainTimer);
    clearInterval(smallTimer);
    stopwatch.innerText = "00:00:00";  
    tbodyTable.innerHTML = "";   
    laps.style.display = 'none';   
}

function stop(timer){
    clearInterval(timer);
}

var count = 0;
function lapfirst(){
    smallTimerMs = 0;
    smallTimerS = 0;
    smallTimerM = 0;
    clearInterval(smallTimer);
    smallTimer = setInterval(runSmallTimer, 10);
    
    
    var newTr = document.createElement('tr');
    var newTdCount = document.createElement('td');
    var newTdTime = document.createElement('td');
    var newTdTotalTime = document.createElement('td');
    
    newTdCount.innerText = count;
    setInterval(function(){
        newTdTime.innerText = getMainTimer(smallTimerMs, smallTimerS, smallTimerM);
    }, 10);
    
    setInterval(function(){
    newTdTotalTime.innerText = getMainTimer(mainTimerMs, mainTimerS, mainTimerM);
    }, 10);

    tbodyTable.prepend(newTr);
        newTr.append(newTdCount);
        newTr.append(newTdTime);
        newTr.append(newTdTotalTime);
    
    
}

function lap(){
    laps.style.display = 'flex';
    var newTr = document.createElement('tr');
    var newTdCount = document.createElement('td');
    var newTdTime = document.createElement('td');
    var newTdTotalTime = document.createElement('td');
    count++;
    newTdCount.innerText = count;   
    newTdTime.innerText = getMainTimer(smallTimerMs, smallTimerS, smallTimerM);  
    
    newTdTotalTime.innerText = getMainTimer(mainTimerMs, mainTimerS, mainTimerM);    

    tbodyTable.prepend(newTr);
        newTr.append(newTdCount);
        newTr.append(newTdTime);
        newTr.append(newTdTotalTime);

}