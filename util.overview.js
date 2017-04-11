/*
 * This module prints the overview.
 */

var factoryWorkload = require('factory.workload');

var overview  = {
    printOverview: function(){
        var d = new Date();
        var m = d.getMinutes();
        var s = d.getSeconds();

        var creeps = _.filter(Game.creeps, (creep) => true);
        var creepsOnWeakEnergySource = 0;

        for (var i = 0; i < creeps.length; i++){
            if (creeps[i].memory.known_source == "5873bda211e3e4361b4d987e"){
                creepsOnWeakEnergySource++;
            }
        }

        // 5 seconds interval should print once most of the time.
        //if(m == 0 || m == 5 || m == 10 || m == 15 || m == 20 || m == 25 || m == 30 || m == 35 || m == 40 || m == 45 || m == 50 || m == 55) {
            if (s == 0 || s == 1 || s == 2 || s == 3 || s == 4) {
                console.log();
                console.log();
                console.log("##### Information Board  - Begin #####");
                console.log("Number of current creeps: " + _.filter(Game.creeps, (creep) => true).length + "/" + (factoryWorkload.getDynamicUpgradersCount()+factoryWorkload.getDynamicMinersCount()+factoryWorkload.getDynamicHarvestersCount()+factoryWorkload.getDynamicBuildersCount()+factoryWorkload.getDynamicRepairersCount()));
                console.log("Builders: " + _.filter(Game.creeps, (creep) => creep.memory.role == 'builder').length + "/" + factoryWorkload.getDynamicBuildersCount());
                console.log("Harvesters: " + _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester').length + "/" + factoryWorkload.getDynamicHarvestersCount());
                console.log("Miners: " + _.filter(Game.creeps, (creep) => creep.memory.role == 'miner').length + "/" + factoryWorkload.getDynamicMinersCount());
                console.log("Upgraders: " + _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader').length + "/" + factoryWorkload.getDynamicUpgradersCount());
                console.log("Repairers: " + _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer').length + "/" + factoryWorkload.getDynamicRepairersCount());
                console.log("Creeps on weak energy source: " + creepsOnWeakEnergySource + "/" + creeps.length);
                console.log("##### Information Board  - End #####");
                console.log();
            }
        //}
    }
}

module.exports = overview;

