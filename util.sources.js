/*
 * This module holds some utilities used by other modules.
 */


var sources  = {
    getSavedSourceOrCreate: function(creep){

        var sources = creep.room.find(FIND_SOURCES);

        if(!creep.memory.known_source){

            creep.memory.known_source = sources[Math.floor(Math.random() * sources.length)].id;

            // Reroll with different odds if is is the energy source with just one mining spot.
            if(creep.memory.known_source == "5873bda211e3e4361b4d987e"){

                creep.memory.known_source = sources[Math.floor(Math.random() * sources.length)].id;
            }
        }
        return Game.getObjectById(creep.memory.known_source);
    }
}

module.exports = sources;