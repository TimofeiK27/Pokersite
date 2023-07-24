document.addEventListener('DOMContentLoaded', function() {
    console.log(24);
    fetch('/users')
	.then(response => response.json())
	.then(users => {

        userlist = document.getElementById('userlist');
        users.forEach((user) => {
            item = document.createElement('li');
            console.log(user.profit);
            item.innerHTML += `<a style="color:darkgoldenrod" href="${user.username}">${user.username} </a> `;
            if(user.profit > 0){                
                item.innerHTML += `<span style="color:green"> - Up +$${user.profit}</span>`;
            } else if(user.profit == 0){
                item.innerHTML += `<span style="color:golden"> - $${user.profit}</span>`;
            } else {
                item.innerHTML += `<span style="color:red"> - Down -$${Math.abs(user.profit)}</span>`;
            }
             
            userlist.append(item);
        })
    })
})
            