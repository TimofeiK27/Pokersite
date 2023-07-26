document.addEventListener('DOMContentLoaded', function() {
   
    document.getElementById('countBtn').addEventListener("click", ()=> {
        lines = parseInt(document.getElementById('lines').value);
        if(!(lines>0)){
            lines = 1;
        }
        handTest = parseInt(document.getElementById('hands').value);
        bet = parseInt(document.getElementById('bet').value);
        data=[];
        min=0;
        max=0;
        totalCount=0;
        totalHands=0;
        for(a=0;a<lines;a++){            
            count=0;            
            hands=0;
            xArray = [];
            yArray = [];
            xArrayAvg = [];
            yArrayAvg = []; 

            
            console.log(bet);
            for(i=0;i<handTest;i++){
                if (Math.random() > .495) {
                    count+=bet;
                    totalCount+=bet;
                } else {
                    count-=bet;
                    totalCount-=bet;
                }
                hands++;
                totalHands++;
                if(count<min){
                    min=count
                }
                if(count>max){
                    max=count
                }
                if(i%10==0){
                    xArray.push(hands);
                    yArray.push(count);
                    xArrayAvg.push(hands );
                    yArrayAvg.push(bet * hands* 0.01);
                }
            }    

            // Define Data
            const data1 = {
            x: xArray,
            y: yArray,
            mode:"scatter"
            };

            const data2 = {
                x: xArrayAvg,
                y: yArrayAvg,
                mode:"scatter"
                };

            data.push(data1);

            // Define Layout

            }
            document.getElementById('counter').innerHTML = `$${totalCount}`;
            document.getElementById('handCounter').innerHTML = totalHands;
            document.getElementById('average').innerHTML = (100*totalCount/totalHands)/bet;
        const layout = {
            xaxis: {range: [0, hands], title: "Hands"},
            yaxis: {range: [min + min*.1, max + max*.1], title: "Profit"},
            title: "Profit from Hands Played"
            };
        // Display with Plotly
        Plotly.newPlot("myPlot", data, layout);
        });


    
})