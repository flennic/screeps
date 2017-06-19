/*
 *  This is the main module which calls the sub-modules.
 */

var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepairer = require('role.repairer');
var factoryCreeps = require('factory.creeps');
var divTower = require('div.tower');
var overview = require('util.overview');

// TODO: Harvesters fill tanks, builders use them, create Hauler role.
// TODO: General: If there is a list of objects to interact, don't use list[0], always take the closest. If there is a specific order, split the target search. -> Especially Harvesters first"!
// TODO: Let Harvesters also fill tanks and spawn them depending on missing resource instead if delta missing creeps.
// TODO: If more than 5 creeps have the same source selected, search for a new source. Also check if it is the last source, to prevent endless cycles.
// TODO: Spawn a test creep to see if the tower is defending.

module.exports.loop = function () {

    overview.printOverview();

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        if(creep.memory.role == "repairer"){
            roleRepairer.run(creep);
        }
    }

    factoryCreeps.run();


    var towers = Game.spawns.Spawn1.room.find(FIND_MY_STRUCTURES, {
        filter: { structureType: STRUCTURE_TOWER }
    });
    towers.forEach(tower => divTower.run(tower));
}