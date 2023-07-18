document.addEventListener('DOMContentLoaded', function() {
    console.log(24);
    fetch('/users')
	.then(response => response.json())
	.then(users => {

        userlist = document.getElementById('userlist');
        users.forEach((user) => {
            item = document.createElement('li');
            console.log(user.profit);
            if(user.profit > 0){
                item.innerHTML += `<a href="${user.username}">${user.username} </a> `;
                item.innerHTML += `<h4 style="color:green">Up +$${user.profit}</h4>`;
            } else if(user.profit == 0){
                item.innerHTML += `<a href="${user.username}">${user.username} </a> `;
                item.innerHTML += `<h4 style="color:golden"> $${user.profit}</h4>`;
            } else {
                item.innerHTML += `<a href="${user.username}">${user.username} </a> `;
                item.innerHTML += `<h4 style="color:red">Down -$${Math.abs(user.profit)}</h4>`;
            }
             
            userlist.append(item);
        })
    })
})
            