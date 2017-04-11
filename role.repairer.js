/*
 *  This is the module for the repairer creeps.
 */

var sourceUtils = require('util.sources')

var roleRepairer = {

    run: function(creep) {
        if(creep.carry.energy < creep.carryCapacity && !creep.memory.busy) {

            var currentSource = sourceUtils.getSavedSourceOrCreate(creep);

            if(creep.harvest(currentSource) == ERR_NOT_IN_RANGE) {
                creep.moveTo(currentSource, {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
        else {
            creep.memory.busy = true;

            // Look for possible targets and if their are any, repait them.
            var repairTargets = creep.room.find(FIND_STRUCTURES, { filter: (s) => s.hits < s.hitsMax && s.structureType != STRUCTURE_WALL});

            if(repairTargets.length > 0){
                if(creep.repair(repairTargets[0]) == ERR_NOT_IN_RANGE){
                    creep.moveTo(repairTargets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
            else{
                creep.moveTo(Game.spawns['Spawn1'], {visualizePathStyle: {stroke: '#ffffff'}});
            }

            /* OLD CODE, keep for fallback
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                var buildTargets = creep.room.find(FIND_CONSTRUCTION_SITES);
                //console.log(buildTargets.length);
                if(buildTargets.length){
                    if(creep.build(buildTargets[0]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(buildTargets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                }
                //creep.moveTo(creep.room.controller);
            }
            */

            if(creep.carry.energy == 0){
                creep.memory.busy = false;
                creep.memory.known_source = false;
            }
        }
    }
};

module.exports = roleRepairer;