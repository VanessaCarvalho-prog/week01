
class Door:
    def __init__(self, id):
        self.id = id
        self.status = "closed"
        
    def open(self):
        self.status = "opened"
         
    def closed(self):
        self.status = "closed"

class Elevator:
    def __init__(self, id, amountOfFloors):
        self.id = id
        self.status = 'idle'
        self.direction = None
        self.currentFloor = 1
        self.door = Door(id)
        self.amountOfFloors = amountOfFloors
        self.floorRequestButtonList = [] 
        self.floorRequestList = []
        
    def moveElevator(self,_destination):
        self.status = "busy"
        while self.currentFloor != _destination:
            if self.currentFloor < _destination:
               self.currentFloor +=1
               self.his.status = 'up'
            else: 
               self.currentFloor -=1
               self.status =  'down'
    
    
    def requestFloor(self, requestedFloor):
        self.door.close()
        self.moveElevator(requestedFloor)
        self.door.open()
        self.status = 'idle'
    
class FloorRequestButton:
    def __init__(self, id, floor):
        self.id = id
        self.status = 'off'
        self.floor = floor

class CallButton:
    def __init__(self, id,_floor, direction):
        self.id = id
        self.status = "off"
        self.floor = _floor
        self.direction = direction

class Column:
    def __init__(self, id, amountOfFloors, amountOfElevators):
        self.id = id
        self.status = "online"
        self.elevatorsList = []
        self.callButtonsList = []
        self.amountOfFloors = amountOfFloors
        self.amountOfElevators = amountOfElevators
        # creation elevatorList
        for i in range(1,amountOfElevators + 1):
            elevator = Elevator(i,amountOfFloors)
            self.elevatorsList.append(elevator)
        
        # creation callButtonsList
        for i in range(1, amountOfFloors + 1):
            if i==1:
                callButton = CallButton(1,1,'up')
                self.callButtonsList.append(callButton)
            elif i == amountOfFloors:
                callButton = CallButton(1,amountOfFloors,'down')
                self.callButtonsList.append(callButton)

            else:
                callButtonUp = CallButton(i,i,'up')
                callButtonDown = CallButton(i,i,'down')
                self.callButtonsList.append(callButtonUp)
                self.callButtonsList.append(callButtonDown)
    
    def findElevator(self, _requestedFloor, _direction):
        elevatorsIdle = []
        elevatorsBusySameDirection = []
        elevatorBusyOtherDirection = []
        for elevator in self.elevatorsList:
            if elevator.status == 'idle':
                elevatorsIdle.append(elevator)
            else:
                if elevator.direction == _direction:
                    elevatorsBusySameDirection.append(elevator)
                else:
                    elevatorBusyOtherDirection.append(elevator)
                         
    
        if len(elevatorsBusySameDirection) > 0:
            bestElevator = elevatorsBusySameDirection.pop()
            lowerDiff = abs(_requestedFloor - bestElevator.currentFloor)
            for elevator in elevatorsBusySameDirection:
                difFloor = abs(_requestedFloor - elevator.currentFloor)
                if difFloor < lowerDiff:
                    bestElevator = elevator
                    lowerDiff = difFloor
                
            return bestElevator  

        if len(elevatorsIdle) > 0:
            bestElevator = elevatorsIdle.pop()
            lowerDiff = abs(_requestedFloor - bestElevator.currentFloor)
            for elevator in elevatorsIdle:
                difFloor = abs(_requestedFloor - elevator.currentFloor)
                if difFloor < lowerDiff:
                    bestElevator = elevator
                    lowerDiff = difFloor
                
            return bestElevator
    
    def requestElevator(self, _requestedFloor, _direction):
        requestElevator = self.findElevator(_requestedFloor, _direction)
        requestElevator.moveElevator(_requestedFloor)
        requestElevator.door.open()


# Scenario01
# column = Column(1,10,2)
# column.elevatorsList[0].currentFloor = 2
# column.elevatorsList[1].currentFloor = 6
# bestElevator = column.findElevator(3, 'up')
# print(bestElevator.id)

# Scenario02 A
# column = Column(1,10,2)
# column.elevatorsList[0].currentFloor = 10
# column.elevatorsList[1].currentFloor = 3
# melhorElevador = column.findElevator(1, 'up')
# print(melhorElevador.id)

#  Scenario02 B
# column = Column(1,10,2)
# column.elevatorsList[0].currentFloor = 10
# column.elevatorsList[1].currentFloor = 6
# melhorElevador = column.findElevator(3, 'up')
# print(melhorElevador.id)

#   Scenario02 C
# column = Column(1,10,2)
# column.elevatorsList[0].currentFloor = 10
# column.elevatorsList[1].currentFloor = 5
# melhorElevador = column.findElevator(9, 'down')
# print(melhorElevador.id)

#   Scenario03 A
# column = Column(1,10,2)
# column.elevatorsList[0].currentFloor = 10 
# column.elevatorsList[1].currentFloor = 3 
# column.elevatorsList[1].direction = 'up'
# column.elevatorsList[1].status = 'busy'
# melhorElevador = column.findElevator(3, 'down')
# print(bestElevator.id)

#   Scenario03 B
# column = Column(1,10,2)
# column.elevatorsList[0].currentFloor = 2
# column.elevatorsList[1].currentFloor = 6
# bestElevator = column.findElevator(10, 'down')
# print(bestElevator.id)