
class Door{
    constructor(_id){
        this.id = _id
        this.status = "closed"
    }
    open(){
        this.status = "opened"
        }
    close(){
        this.status = 'closed'
        }

}   

class Elevator{
    constructor(_id, amountOfFloors){
        this.id = _id
        this.status = 'idle'
        this.direction;
        this.currentFloor = 1
        this.door = new Door(_id)
        this.amountOfFloors = amountOfFloors
        this.floorRequestButtonList = []
        this.floorRequestList = []
       
    }
   
    moveElevator(_destination){
        this.status = 'busy'
        while (this.currentFloor != _destination){
            if(this.currentFloor < _destination){
                this.currentFloor++
                this.status = 'up'
            }else {
                this.currentFloor--
                this.status =  'down'
            }
        }
    }
    requestFloor(requestedFloor){
        this.door.close()
        this.moveElevator(requestedFloor)
        this.door.open()
        this.status = 'idle'
    } 
    
}

class FloorRequestButton{
    constructor(_id, floor){
        this.id = id
        this.status = 'off'
        this.floor = floor
    }
}

class CallButton{
    constructor(_id, _floor, _direction){
        this.id = _id
        this.status = "off"
        this.floor = _floor
        this.direction = _direction
    }
}

class Column {
    constructor(_id, amountOfFloors, amountOfElevators){
        this.id = _id
        this.status = "online"
        this.elevatorsList = []
        this.callButtonsList = []
        this.amountOfFloors = amountOfFloors
        this.amountOfElevators = amountOfElevators
        // creation elevatorList
        for(let i=1; i <= amountOfElevators; i++){
            let elevator = new Elevator(i,amountOfFloors)
            this.elevatorsList.push(elevator)
        }
        // creation callButtonsList
        for(let i=1; i <= amountOfFloors; i++){
            if(i==1){
            let callButton = new CallButton(1,1,'up')
           this.callButtonsList.push(callButton)
            } else if(i == amountOfFloors){
                let callButton = new CallButton(1,amountOfFloors,'down')
            this.callButtonsList.push(callButton)

            }else {
                let callButtonUp = new CallButton(i,i,'up')
                let callButtonDown = new CallButton(i,i,'down')
            this.callButtonsList.push(callButtonUp)
            this.callButtonsList.push(callButtonDown)

             }
        }  
    }     
    findElevator(_requestedFloor, _direction){
        let elevatorsIdle = []
        let elevatorsBusySameDirection = []
        let elevatorBusyOtherDirection = []
        this.elevatorsList.forEach(function(elevator){
            if(elevator.status == 'idle'){
                elevatorsIdle.push(elevator)
            }else {
                if(elevator.direction == _direction){
                    elevatorsBusySameDirection.push(elevator)
                }else {
                    elevatorBusyOtherDirection.push(elevator)
                }                 
            }
        })
        if(elevatorsBusySameDirection.length > 0){
            let bestElevator = elevatorsBusySameDirection.shift()
            let lowerDiff = Math.abs(_requestedFloor - bestElevator.currentFloor)
            elevatorsBusySameDirection.forEach(function(elevator){
                var difFloor = Math.abs(_requestedFloor - elevator.currentFloor)
                if(difFloor < lowerDiff){
                    bestElevator = elevator
                    lowerDiff = difFloor
                }
            })
                
            return bestElevator  
        }

        if(elevatorsIdle.length > 0){
            let bestElevator = elevatorsIdle.shift()
            let lowerDiff = Math.abs(_requestedFloor - bestElevator.currentFloor)
            elevatorsIdle.forEach(function(elevator){
                var difFloor = Math.abs(_requestedFloor - elevator.currentFloor)
                if(difFloor < lowerDiff){
                    bestElevator = elevator
                    lowerDiff = difFloor
                }
            })
                
            return bestElevator  
        }
    }     
    
    requestElevator(_requestedFloor, _direction){
        let requestElevator = this.findElevator(_requestedFloor, _direction)
        requestElevator.moveElevator(_requestedFloor)
        requestElevator.door.open()
    }

}

// // Scenario01
// let column = new Column(1,10,2)
// column.elevatorsList[0].currentFloor = 2
// column.elevatorsList[1].currentFloor = 6
// var bestElevator = column.findElevator(3, 'up')
// console.log (bestElevator)


// Scenario02 A
// let column = new Column(1,10,2)
// column.elevatorsList[0].currentFloor = 10
// column.elevatorsList[1].currentFloor = 3
// var bestElevator = column.findElevator(1, 'up')
// console.log(bestElevator)

// //  Scenario02 B
// let column = new Column(1,10,2)
// column.elevatorsList[0].currentFloor = 10
// column.elevatorsList[1].currentFloor = 6
// var bestElevator = column.findElevator(3, 'up')
// console.log(bestElevator)

// //  Scenario02 C
// let column = new Column(1,10,2)
// column.elevatorsList[0].currentFloor = 10
// column.elevatorsList[1].currentFloor = 5
// var bestElevator = column.findElevator(9, 'down')
// console.log(bestElevator)

// //  Scenario03 A
// let column = new Column(1,10,2)
// column.elevatorsList[0].currentFloor = 10 //(elevatorsIdle)
// column.elevatorsList[1].currentFloor = 3  // 'up' (elevatorBusyOtherDirection)
// column.elevatorsList[1].direction = 'up'
// column.elevatorsList[1].status = 'busy'
// var bestElevator = column.findElevator(3, 'down')
// console.log(bestElevator)

// // //  Scenario03 B
let column = new Column(1,10,2)
column.elevatorsList[0].currentFloor = 2 //(elevatorsIdle)
column.elevatorsList[1].currentFloor = 6  //(elevatorsIdle)
var bestElevator = column.findElevator(10, 'down')
console.log(bestElevator)



