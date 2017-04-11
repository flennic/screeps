/*
 *   This module determines the workload and adjusts the MAX_* creep count in factory.creeps.
 */

var firstCreep = _.filter(Game.creeps, (creep) => true)[0];
var sourcesCount = firstCreep.room.find(FIND_SOURCES).length;

const MAX_HARVESTER = 5 * sourcesCount;
const MAX_BUILDER = 5 * sourcesCount;
// Currently not needed
const MAX_MINER = 5 * (sourcesCount - 1);
//const MAX_UPGRADER = 10 * sourcesCount;
//const MAX_REPAIRER = 5 * (sourcesCount - 1);


var workload = {

    getDynamicBuildersCount: function(){
        var newBuildersCount = _.filter(Game.constructionSites, (ConstructionSite) => true).length + 2;
        if(newBuildersCount > MAX_BUILDER){
            return MAX_BUILDER;
        }
        return _.filter(Game.constructionSites, (ConstructionSite) => true).length + 2;
    },
    getDynamicHarvestersCount: function(){
        var currentNumberOfCreeps = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder' || creep.memory.role == 'miner' || creep.memory.role == 'upgrader').length;
        var currentNumberOfOrderedCreeps = this.getDynamicUpgradersCount()+this.getDynamicMinersCount()+this.getDynamicBuildersCount();
        var newHarvesterCount = (currentNumberOfOrderedCreeps - currentNumberOfCreeps) + 4;
        if(newHarvesterCount > MAX_HARVESTER){
            return MAX_HARVESTER;
        }
        return 4 + (currentNumberOfOrderedCreeps - currentNumberOfCreeps);
    },
    getDynamicUpgradersCount:function(){
        return 5;
    },
    getDynamicMinersCount: function(){
        return 0;
    },
    getDynamicRepairersCount: function(){
        return 1;
    }
}

module.exports = workload;
