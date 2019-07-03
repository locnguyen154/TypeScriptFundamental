
class Ticket {
    movieName: string;
    showTime: string;
    seatNumber: string;
    bookedDateTime: string;
    totalMoney: number;

    constructor (public moviename: string, public showtime: string, public seatnumber: string, public bookeddatetime: string, public totalmoney: number) {
        this.movieName = moviename;
        this.showTime = showtime;
        this.seatNumber = seatnumber;
        this.bookedDateTime = bookeddatetime;
        this.totalMoney = totalmoney;
    }

    bookTicket() : void {
        if (selectedSeats.length != 0) {
            var isConfirm = confirm("Are you sure to book tickets!");
            if (isConfirm) {
                var selectedLength = selectedSeats.length;
            
                for (var i = 0; i < selectedLength; i++) {
                    var seat = selectedSeats.pop();            
                    seat.style.backgroundColor = 'red';  
                    bookedSeats.push(seat);    
                }
                
                var ticket = {MovieName: this.movieName, 
                ShowTime: this.showTime, 
                SeatsNumber: this.seatNumber,
                BookedDatetime: new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString(),
                TotalMoney: this.totalMoney.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,').toString() + " vnd",
                Remove: "x"}    
                bookedTickets.push(ticket);    
                this.createTableOfListBookedTickets(bookedTickets);    
                document.getElementById("booked-seats").innerHTML = "";
                document.getElementById("money-total").textContent = "0";
                moneyTotal = 0;
            }
        }
        else {
            alert("No seats selected!");
        }
    }

    removeTicket(id:string) : void {
        var isConfirm = confirm("Are you sure to remove this ticket!");
        if (isConfirm) {
            var table:HTMLTableElement = <HTMLTableElement> document.getElementById('list-booked-tickets');
            var rows = table.getElementsByTagName('tr');
            for (var i = 1; i < rows.length; i++) {
                if (rows[i].cells[5].firstElementChild.id === id) {
                    var timeBooked = rows[i].cells[3].childNodes[0].textContent;
                    var ticket;

                    for (var ticketItem of bookedTickets) {
                        if (ticketItem.BookedDatetime === timeBooked){
                            ticket = ticketItem;
                            break;
                        }
                    }

                    var seats = ticket.SeatsNumber.split(" ");
                    for (var seat of seats) {
                        try {
                            var seatIndex = bookedSeats.indexOf(findElementById(seats, seat));
                            bookedSeats.splice(seatIndex, 1);
                            var btn = document.getElementById(seat);
                            btn.style.backgroundColor = "#74e393";
                            freeSeats.push(btn);
                        }
                        catch
                        {
    
                        }
                    }
                    table.deleteRow(i);            
                    break;
                }
            }
            for (var i = 0; i < bookedTickets.length; i++) {
                var x = (bookedTickets[i])
            }
        }
    }

    createTableHeadOfListBookedTickets(data) : void {
        var table: HTMLTableElement = <HTMLTableElement> document.getElementById("list-booked-tickets");
        var thead = table.createTHead();
        var row = thead.insertRow();
        var element = data[0];
        for (var key in element) {
            var th = document.createElement("th");
            th.style.textAlign = "center";
            var text = document.createTextNode(element[key]);
            th.appendChild(text);
            row.appendChild(th);
        }
    }

    createTableOfListBookedTickets(data) : void {
        var table: HTMLTableElement = <HTMLTableElement> document.getElementById("list-booked-tickets");
        var element = data[data.length-1];
        var row = table.insertRow();    
        for (var key in element) {
            var cell = row.insertCell();        
            if (key === "Remove") {
                var btnRemove = document.createElement("button");
                btnRemove.innerHTML = "x";
                btnRemove.style.border = "none";
                btnRemove.style.backgroundColor = "white";
                btnRemove.id = "ticket" + (data.length - 1);                
                btnRemove.addEventListener('click', function() {new Ticket("","", "", "", 2).removeTicket(btnRemove.id)}, false);
                cell.appendChild(btnRemove);
                break;
            }
            var text = document.createTextNode(element[key]);
            cell.appendChild(text);        
        }
    }
}

class Seat {
    constructor(){}

    addSeatsNumber(seatArray) : void {
        for (var i = 'A'; i < 'J'; i = String.fromCharCode(i.charCodeAt(0) + 1)) {
            var x: string;
            for (var j = 1; j < 13; j++) {
                x = (i+j).toString()
                seatArray.push(x);
            }
        }        
    }

    createSeats(seatArray) : void {
        var table: HTMLTableElement = <HTMLTableElement> document.getElementById("seats");
        var row = table.insertRow();
        var count = 1;
        for (var element of seatArray) {
            if (count == 13) {
                var row = table.insertRow();
                count = 1;
            }
            var cell = row.insertCell();
            var btnSeat = document.createElement("button");
            btnSeat.innerHTML = element;
            btnSeat.id = element;
            btnSeat.style.width = '100%';
            btnSeat.style.backgroundColor = '#74e393';
            btnSeat.style.border = 'none';
            btnSeat.addEventListener('click', function() {new Seat().changeSeats(event)}, false);
            cell.appendChild(btnSeat);
            freeSeats.push(btnSeat);
            count++;
        }
    }

    changeSeats(event) : void {
        var btnSeat:HTMLElement = <HTMLElement> document.getElementById(event.target.id);
        var freeSeatIndex = freeSeats.indexOf(findElementById(freeSeats, btnSeat.id));
        var bookedSeatIndex = bookedSeats.indexOf(findElementById(bookedSeats, btnSeat.id));
        var textBoxBookedSeats = document.getElementById("booked-seats");
        if (freeSeats[freeSeatIndex]) {
            btnSeat.style.backgroundColor = "cyan";
            freeSeats.splice(freeSeatIndex, 1);
            selectedSeats.push(btnSeat);
            textBoxBookedSeats.innerHTML += (btnSeat.id + " ");
            moneyTotal += 45000;
            document.getElementById("money-total").textContent = moneyTotal.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,').toString();
        }
        else if (!bookedSeats[bookedSeatIndex]) {
            btnSeat.style.backgroundColor = "#74e393";
            var selectedSeatIndex = selectedSeats.indexOf(findElementById(selectedSeats, btnSeat.id));
            freeSeats.push(btnSeat);
            selectedSeats.splice(selectedSeatIndex, 1);
            var bookedSeatName = textBoxBookedSeats.textContent;
            bookedSeatName = bookedSeatName.replace(btnSeat.id, "");
            textBoxBookedSeats.innerHTML = bookedSeatName;  
            moneyTotal -= 45000;
            document.getElementById("money-total").textContent = moneyTotal.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,').toString();
        }
    }
}

var seats = [];
var freeSeats = [];
var bookedSeats = [];
var selectedSeats = [];
var moneyTotal = 0;

var bookedTickets = [
    {MovieName: "Movie name", ShowTime: "Show time", SeatsNumber:"Seats number", BookedDatetime: "Booked Date time", TotalMoney: "Total money", Remove: "Remove"}
]

function findElementById(arrays, id) {
    for (var element of arrays) {
        if (element.id === id) {
            return element;            
        }
    }
}

var seat = new Seat();

seat.addSeatsNumber(seats);
seat.createSeats(seats);

var ticket = new Ticket("", "", "", "", 0);

ticket.createTableHeadOfListBookedTickets(bookedTickets);

function bookTickets() {
    var ticket = new Ticket(document.getElementById("movie-name").textContent.toString(), 
        document.getElementById("show-time").textContent.toString(),
        document.getElementById("booked-seats").textContent.toString(),
        new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString(),
        +document.getElementById("money-total").textContent.replace(",", ""));    
    
    ticket.bookTicket();    
}