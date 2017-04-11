/*
 *  This is the module for the harvester creeps.
 */

// var sourceUtils = require('util.sources');

var roleHarvester = {

    // TODO: Harvesters fill tanks, builders use them.
    // TODO: If 0 Harvesters, allow WORK, MOVE, CARRY

    run: function(creep) {

	    if(creep.carry.energy < creep.carryCapacity && !creep.memory.busy) {

            // var currentSource = sourceUtils.getSavedSourceOrCreate(creep);
            var destinationSource = creep.pos.findClosestByPath(Game.SOURCES);
            creep.memory.known_source = destinationSource;

            if(creep.harvest(creep.memory.known_source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.memory.known_source, {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
        else {
            creep.memory.busy = true;

            var energyFillTargets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
                        structure.energy < structure.energyCapacity;
                }
            });

            if(energyFillTargets.length > 0) {
                if(creep.transfer(energyFillTargets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(energyFillTargets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
            else{
                creep.moveTo(Game.spawns['Spawn1'], {visualizePathStyle: {stroke: '#ffffff'}});
            }

            if(creep.carry.energy == 0){
                creep.memory.busy = false;
                creep.memory.known_source = false;
            }
        }
	}
};

module.exports = roleHarvester;