/*
 *  This is the module for the builder creeps.
 */

var roleUpgrader = require('role.upgrader');

var roleBuilder = {

    run: function(creep) {

        // Set a source if the creep doesn't know one.
        if(!creep.memory.known_source){
            if(Math.floor(Math.random()*10) < 2){
                creep.memory.known_source = "5873bda211e3e4361b4d987e";
            }
            else{
                creep.memory.known_source = creep.pos.findClosestByRange(FIND_SOURCES_ACTIVE).id;
            }
        }

        if(creep.carry.energy < creep.carryCapacity && !creep.memory.busy) {
            if(creep.harvest(Game.getObjectById(creep.memory.known_source)) == ERR_NOT_IN_RANGE) {
                creep.moveTo(Game.getObjectById(creep.memory.known_source), {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
        else {

            creep.memory.busy = true;

            var buildTargets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if(buildTargets.length){
                if(creep.build(buildTargets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(buildTargets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
            else{
                roleUpgrader.run(creep);
            }

            if(creep.carry.energy == 0){
                creep.memory.busy = false;
                creep.memory.known_source = false;
            }
        }
    }
};

module.exports = roleBuilder;