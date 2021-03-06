/*
 *  This is the module for the repairer creeps.
 */

var roleBuilder = require('role.builder');

var roleRepairer = {

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

        if(creep.carry.energy < creep.carryCapacity && !creep.memory.busy) {
            if(creep.harvest(Game.getObjectById(creep.memory.known_source)) == ERR_NOT_IN_RANGE) {
                creep.moveTo(Game.getObjectById(creep.memory.known_source), {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
        else{
            creep.memory.busy = true;

            var repairTarget = creep.pos.findClosestByRange(FIND_STRUCTURES, { filter: (s) => s.hits < s.hitsMax && s.structureType != STRUCTURE_WALL});

            if((repairTarget != null) && creep.repair(repairTarget) == ERR_NOT_IN_RANGE){
                    creep.moveTo(repairTarget, {visualizePathStyle: {stroke: '#ffffff'}});
            }
            else{
                roleBuilder.run(creep);
            }
            if(creep.carry.energy == 0){
                creep.memory.busy = false;
                creep.memory.known_source = false;
            }
        }
    }
};

module.exports = roleRepairer;