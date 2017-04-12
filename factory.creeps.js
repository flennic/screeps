/*
 *  This module spawns creeps depending on the MAX_* creep count.
 */

var factoryWorkload = require('factory.workload');
var SPAWN_NAME = 'Spawn1';

var factory = {
    run: function () {

        var CNT_HARVESTERS = factoryWorkload.getDynamicHarvestersCount();
        var CNT_MINERS = factoryWorkload.getDynamicMinersCount();
        var CNT_UPGRADERS = factoryWorkload.getDynamicUpgradersCount();
        var CNT_BUILDERS = factoryWorkload.getDynamicBuildersCount();
        var CNT_REPAIRERS = factoryWorkload.getDynamicRepairersCount();

        // Delete old creeps from memory
        for(var i in Memory.creeps) {
            if(!Game.creeps[i]) {
                delete Memory.creeps[i];
            }
        }

        // Harvesters
        var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
        if(harvesters.length < CNT_HARVESTERS){
            if(harvesters.length < 3){
                var newHarvester = Game.spawns[SPAWN_NAME].createCreep([WORK, WORK, CARRY, CARRY, MOVE, MOVE], undefined, {role: 'harvester', busy: false});
            }
            else{
                var newHarvester = Game.spawns[SPAWN_NAME].createCreep([WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE], undefined, {role: 'harvester', busy: false});
            }
            if(newHarvester != ERR_BUSY && newHarvester != ERR_NOT_ENOUGH_ENERGY){
                console.log('Spawning new Harvester (' + (harvesters.length + 1) + '/' + CNT_HARVESTERS + '): ' + newHarvester);
            }
            return;
        }

        // Repairers
         var repairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer');
         if(repairers.length < CNT_REPAIRERS) {
             var newRepairer = Game.spawns[SPAWN_NAME].createCreep([WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE], undefined, {role: "repairer", busy: false});
             if(newRepairer != ERR_BUSY && newRepairer != ERR_NOT_ENOUGH_ENERGY){
                 console.log('Spawning new Repairer (' + (repairers.length + 1) + '/' + CNT_REPAIRERS + '): ' + newRepairer);
            }
            return;
         }

        // Builders
        var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
        if(builders.length < CNT_BUILDERS) {
            var newBuilder = Game.spawns[SPAWN_NAME].createCreep([WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE], undefined, {role: "builder", busy: false});
            if(newBuilder != ERR_BUSY && newBuilder != ERR_NOT_ENOUGH_ENERGY){
                console.log('Spawning new builder (' + (builders.length + 1) + '/' + CNT_BUILDERS + '): ' + newBuilder);
            }
            return;
        }

        // Upgraders
        var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
        if(upgraders.length < CNT_UPGRADERS){
            var newUpgrader = Game.spawns[SPAWN_NAME].createCreep([WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE], undefined, {role: 'upgrader', busy: false});
            if(newUpgrader != ERR_BUSY && newUpgrader != ERR_NOT_ENOUGH_ENERGY){
                console.log('Spawning new Upgrader (' + (upgraders.length + 1) + '/' + CNT_UPGRADERS + '): ' + newUpgrader);
            }
            return;
        }
        // Miners
    }
}

module.exports = factory;