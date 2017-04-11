/*
 * This is the module for the miner creeps.
 */

var sourceUtils = require('util.sources')

var roleUpgrader = {

    run: function(creep) {

        if(creep.carry.energy < creep.carryCapacity && !creep.memory.unloading) {

            var currentSource = sourceUtils.getSavedSourceOrCreate(creep);

            if(creep.harvest(currentSource) == ERR_NOT_IN_RANGE) {
                creep.moveTo(currentSource);
            }
        }
        else {
            creep.memory.unloading = true;
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
            }
            if(creep.carry.energy == 0){
                creep.memory.unloading = false;
                creep.memory.known_source = false;
            }
        }
    }
};

module.exports = roleUpgrader;