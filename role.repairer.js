/*
 *  This is the module for the repairer creeps.
 */

// var sourceUtils = require('util.sources')

var roleRepairer = {

    run: function(creep) {

        if(creep.carry.energy < creep.carryCapacity && !creep.memory.busy) {

            // var currentSource = sourceUtils.getSavedSourceOrCreate(creep);
            creep.memory.known_source = creep.pos.findClosestByPath(Game.SOURCES);

            if(creep.harvest(creep.memory.known_source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.memory.known_source, {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
        else {
            creep.memory.busy = true;

            var repairTargets = creep.room.find(FIND_STRUCTURES, { filter: (s) => s.hits < s.hitsMax && s.structureType != STRUCTURE_WALL});

            if(repairTargets.length > 0){
                if(creep.repair(repairTargets[0]) == ERR_NOT_IN_RANGE){
                    creep.moveTo(repairTargets[0], {visualizePathStyle: {stroke: '#ffffff'}});
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

module.exports = roleRepairer;