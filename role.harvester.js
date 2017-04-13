/*
 *  This is the module for the harvester creeps.
 */

var roleRepairer = require('role.repairer');

var roleHarvester = {

    run: function(creep) {

        // Set a source if the creep doesn't know one.
        if(!creep.memory.known_source){
            creep.memory.known_source = creep.pos.findClosestByRange(FIND_SOURCES_ACTIVE).id;
        }
        else{
            if(Game.getObjectById(creep.memory.known_source).energy == 0){
                creep.memory.busy = true;
                creep.memory.known_source = creep.pos.findClosestByRange(FIND_SOURCES_ACTIVE).id;
            }
        }

	    if(creep.carry.energy < creep.carryCapacity && !creep.memory.busy){
            if(creep.harvest(Game.getObjectById(creep.memory.known_source)) == ERR_NOT_IN_RANGE) {
                creep.moveTo(Game.getObjectById(creep.memory.known_source), {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }

        else {
            creep.memory.busy = true;

            var energyFillTargets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return ((structure.structureType == STRUCTURE_EXTENSION && structure.energy < structure.energyCapacity)|| (structure.structureType == STRUCTURE_SPAWN) &&
                        structure.energy < structure.energyCapacity) || (structure.structureType == STRUCTURE_TOWER && structure.energy < structure.energyCapacity);
                }
            });


            if(energyFillTargets.length > 0) {
                if(creep.transfer(energyFillTargets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(energyFillTargets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
            else{
                var containerFillTargets = creep.room.find(FIND_STRUCTURES, {
                    filter: (strucure) => {
                        return (strucure.structureType == STRUCTURE_CONTAINER && (_.sum(strucure.store) < strucure.storeCapacity));
                    }
                });
                if(containerFillTargets.length > 0) {
                    if(creep.transfer(containerFillTargets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(containerFillTargets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                }
                else{
                    roleRepairer.run(creep);

                }
            }
            if(creep.carry.energy == 0){
                creep.memory.busy = false;
                creep.memory.known_source = false;
            }
        }
	}
};

module.exports = roleHarvester;