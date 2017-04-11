/*
 *  This is the module for the builder creeps.
 */

// var sourceUtils = require('util.sources')

var roleUpgrader = {

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
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                var buildTargets = creep.room.find(FIND_CONSTRUCTION_SITES);
                if(buildTargets.length){
                    if(creep.build(buildTargets[0]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(buildTargets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                }
                else{
                    creep.moveTo(Game.spawns['Spawn1'], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
            if(creep.carry.energy == 0){
                creep.memory.busy = false;
                creep.memory.known_source = false;
            }
        }
    }
};

module.exports = roleUpgrader;