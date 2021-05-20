
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
    requestFloor(_destination){
    
    // this.floorRequestList
    // moveElevator
    // statusDoor
        
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
            let elevator = new Elevator(i,i)
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
    findElevator(_requestFloor, _direction){
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
        let bestElevator = elevatorsBusySameDirection.pop[]
          elevatorsBusySameDirection.forEach(elevator, index){
           var difFloor = Math.abs(_requestFloor - elevator.currentFloor)
           var difFloor = Math.abs(_requestFloor - elevator.currentFloor)
           if(difFloor < bestFloor){
               bestFloor
           }
       }     
        

      
        
    }
    
    
  
}

let column = new Column(1,10,2)
column.findElevator('up', 8)





// let column = new Column(2,8,4)
// console.log(column)


// let appeler = new Elevator(5,10)
// // chamar.requestFloor(10)
// console.log(appeler)

// let elevator = new Elevator(1, 10)
// let column = new Column(1, 10, 1)

// column.elevatorsList.push(elevator)


// console.log(column)




 // this.door.status = 'open'
        // this.door.status = 'closed'


// let chamar = new Elevator(5,10)
// // chamar.requestFloor(10)
// console.log(chamar)





// let button = new CallButton(53,6,"up")
// console.log(button)



// let test = new Elevator(1,20)
// console.log(test)
// test.requestFloor(15)
// console.log(test)

// let door1 = new Door(1)
// console.log(door1)
// door1.open()
// console.log(door1)

// open(){
//     this.status = "opened"
// }
// close(){
//     this.status = 'closed'
// }
// }

// requestFloor(numberFloor){
    //     this.currentFloor = numberFloor
    //     this.door.open()




//     let callButton = new CallButton(1,1,'up')
    //     let callButton = new CallButton(5,amountOfFloors,'down')




     // requestElevator(requestedFloor, direction){
    //     console.log(requestedFloor)
    // }
    