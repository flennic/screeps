/*
 *  This is the module for the towers.
 */

var divTower = {
    run: function(tower) {

        var hostiles = tower.room.find(FIND_HOSTILE_CREEPS);
        if(hostiles.length > 0) {
            var username = hostiles[0].owner.username;
            var roomName = tower.room.name;
            Game.notify(`User ${username} spotted in room ${roomName}`);
            tower.attack(hostiles[0]);
        }
        else
        {
            var healTarget = tower.pos.findClosestByRange(FIND_MY_CREEPS, { filter: (c) => c.hits < c.hitsMax});

            if(healTarget != null) {
                tower.heal(healTarget);
            }
            else{
                var repairTarget = tower.pos.findClosestByRange(FIND_STRUCTURES, { filter: (s) => s.hits < s.hitsMax && s.structureType != STRUCTURE_WALL});

                if(repairTarget != null){
                    tower.repair(repairTarget);
                }
            }

        }
    }
}

module.exports = divTower;

