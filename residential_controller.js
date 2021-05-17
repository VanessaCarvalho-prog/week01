class Elevator {
this.Id = _id
this.status = 'online'
this.direction;
this.currentFloor = 
this.door = newDoor(_id)
this.floorRequestButtonsList = []

}
class FloorRequestButton{
    constructor (_id, _floor){
        this.Id = _id
        this.status = 'off'
        this.floor = _floor
    }
}
class Door{
    constructor(_id){
        this.Id = _id
        this.status = 'close'

    }
}
let door1 = new Door(1)