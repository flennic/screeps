/*
 *  This is the module for the upgrader creeps.
 */

var roleUpgrader = {

    run: function(creep) {

        // Set a source if the creep doesn't know one.
        if(!creep.memory.known_source){

            var containerSource = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_CONTAINER && (_.sum(structure.store) > creep.carryCapacity));
                }
            });
            if(containerSource != null){
                creep.memory.known_source = containerSource.id;
            }
            else{
                creep.memory.known_source = creep.pos.findClosestByRange(FIND_SOURCES_ACTIVE).id;
            }
        }
        else{
            if(Game.getObjectById(creep.memory.known_source).structureType == STRUCTURE_CONTAINER){
                if(Game.getObjectById(creep.memory.known_source)[RESOURCE_ENERGY] == 0){
                    creep.memory.busy = true;
                    var containerSource = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                        filter: (structure) => {
                            return (structure.structureType == STRUCTURE_CONTAINER && (_.sum(structure.store) > creep.carryCapacity));
                        }
                    });
                    if(containerSource != null){
                        creep.memory.known_source == containerSource.id;
                    }
                }
                else{
                    if(creep.carry.energy < creep.carryCapacity && !creep.memory.busy) {
                        if(creep.withdraw(Game.getObjectById(creep.memory.known_source), RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(Game.getObjectById(creep.memory.known_source), {visualizePathStyle: {stroke: '#ffffff'}});
                        }
                    }
                    else{
                        creep.memory.busy = true;

                        if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
                        }
                        if(creep.carry.energy == 0){
                            creep.memory.busy = false;
                            creep.memory.known_source = false;
                        }
                    }
                }
            }
            else{
                if(creep.carry.energy < creep.carryCapacity && !creep.memory.busy) {
                    if(creep.harvest(Game.getObjectById(creep.memory.known_source)) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(Game.getObjectById(creep.memory.known_source), {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                }
                else {
                    creep.memory.busy = true;

                    if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                    if(creep.carry.energy == 0){
                        creep.memory.busy = false;
                        creep.memory.known_source = false;
                    }
                }
            }
        }
    }
};

module.exports = roleUpgrader;