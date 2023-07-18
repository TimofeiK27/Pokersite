var profit = 0;
var hours = 0;
var playedSessions = 0;
document.addEventListener('DOMContentLoaded', function() {
    addBtn = document.getElementById("addSessionBtn");
    addBtn.addEventListener("click", (addBtn)=>{

        document.getElementById("addSession").style.display = "block";
        document.getElementById("addSessionBtn").style.display = "none";

    })

    targetUser =  document.getElementById("targetUser").innerHTML;
    signedUser =  document.getElementById("user-id").innerHTML;
    fetch(`/sessions/${targetUser}`)
	.then(response => response.json())
	.then(sessions => {
        if(targetUser != signedUser){
            document.getElementById("addSessionBtn").hidden = true;
        }
        var postNum = sessions.length;
        sessions.reverse();
        
        sessions.forEach((session) => {
            

            profit += session.profit;
            hours += session.hours;
            playedSessions++;

            sessionDiv = document.createElement('div');
            sessionDiv.id = `session${session.id}`;
            sessionDiv.className = "sessionDiv";
            sessionDiv.innerHTML += `<h2>Session ${postNum} on ${session.date}</h2>`;
            postNum--;

            if(session.profit > 0){
                sessionDiv.innerHTML += `<h2 style="color:green">Profited +$${session.profit}</h2>`;
            } else if(session.profit == 0){
                sessionDiv.innerHTML += `<h2 style="color:golden">Broke Even -- $${session.profit}</h2>`;
            } else {
                sessionDiv.innerHTML += `<h2 style="color:red">Lost -$${Math.abs(session.profit)}</h2>`;
            }


            sessionDiv.innerHTML += `<h4>Played for ${session.hours} Hours</h4>`;
            sessionDiv.innerHTML += `<p>Notes -- ${session.notes}</p>`;

            if(targetUser == signedUser){
                console.log(1);
                sessionDiv.innerHTML += `<button id="delete${session.id}">Delete Session</button>`;
            }
            

            document.getElementById("previousSessions").append(sessionDiv);
            if(targetUser == signedUser){
                document.getElementById(`delete${session.id}`).addEventListener("click", (delPost)=> {
                    profit -= session.profit;
                    hours -=session.hours;
                    playedSessions --;
                    updateProfit()
                    document.getElementById(`session${session.id}`).remove();
                    fetch('/delSession', {
                        method: 'POST',
                        data: {csrfmiddlewaretoken: "{{ csrf_token }}", state:"inactive"},
                        body: JSON.stringify({
                        id : session.id
                    })}
                    
                    
                    ) 
                    
                    
                })   
            }         
        });
        updateProfit()
    })

    
});

function updateProfit(){
    counter = document.getElementById("profit");
    if(profit>0){
        counter.innerHTML = `Up +$${profit}`;
        counter.style.color = 'green'
    } else if (profit==0){
        counter.innerHTML = `Net $${profit}`;
        counter.style.color = 'golden'
    } else {
        counter.innerHTML = `Down -$${Math.abs(profit)}`;
        counter.style.color = 'red'
    }    
    document.getElementById("hours").innerHTML = `Played for ${hours} Hours`;
    document.getElementById("sessions").innerHTML = `Played ${playedSessions} Sessions`;
}