/*
 *  This module determines the workload and adjusts the MAX_* creep count in factory.creeps.
 */

var firstCreep = _.filter(Game.creeps, (creep) => true)[0];
var sourcesCount = firstCreep.room.find(FIND_SOURCES).length;

const MAX_HARVESTER = 3 * sourcesCount;
const MIN_HARVESTER = 3;
const MAX_BUILDER = 2 * sourcesCount;
const MIN_BUILDER = 0;
// Currently not needed
const MAX_MINER = 5 * (sourcesCount - 1);
//const MAX_UPGRADER = 10 * sourcesCount;
//const MAX_REPAIRER = 5 * (sourcesCount - 1);


var workload = {

    getDynamicBuildersCount: function(){
        var newBuildersCount = _.filter(Game.constructionSites, (ConstructionSite) => true).length * 2;
        if(newBuildersCount > MAX_BUILDER){
            return MAX_BUILDER;
        }
        if(newBuildersCount < MIN_BUILDER){
            return MIN_BUILDER;
        }

        return newBuildersCount;
    },
    getDynamicHarvestersCount: function(){
        return MAX_HARVESTER;
        /*
        var currentNumberOfCreeps = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder' || creep.memory.role == 'miner' || creep.memory.role == 'upgrader').length;
        var currentNumberOfOrderedCreeps = this.getDynamicUpgradersCount()+this.getDynamicMinersCount()+this.getDynamicBuildersCount();
        var newHarvesterCount = (currentNumberOfOrderedCreeps - currentNumberOfCreeps) + 4;
        if(newHarvesterCount > MAX_HARVESTER){
            return MAX_HARVESTER;
        }
        if (newHarvesterCount <  MIN_HARVESTER){
            return MIN_HARVESTER;
        }
        return newHarvesterCount;
        */
    },
    getDynamicUpgradersCount:function(){
        return 4;
    },
    getDynamicMinersCount: function(){
        return 0;
    },
    getDynamicRepairersCount: function(){
        return 1;
    }
}

module.exports = workload;
