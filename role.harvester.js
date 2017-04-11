/*
 * This is the module for the harvester creeps.
 */

var sourceUtils = require('util.sources');

var roleHarvester = {

    run: function(creep) {

	    if(creep.carry.energy < creep.carryCapacity && !creep.memory.busy) {

            var currentSource = sourceUtils.getSavedSourceOrCreate(creep);

            if(creep.harvest(currentSource) == ERR_NOT_IN_RANGE) {
                creep.moveTo(currentSource, {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
        else {
            creep.memory.busy = true;

            // Look for possible targets and if their are any, fill them.
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

            /* OLD VERSION, keep if the new one fails
            if(creep.transfer(Game.spawns['Spawn1'], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(Game.spawns['Spawn1'], {visualizePathStyle: {stroke: '#ffffff'}});
            }
            */

            if(creep.carry.energy == 0){
                creep.memory.known_source = false;
                creep.memory.busy = false;
            }
        }
	}
};

module.exports = roleHarvester;