
function _level004_block401() {

	this.id = 401;

	this._state = new _core_state();
	this._direction = new _core_direction();
	this._consumable = new _core_consumable();

	this.playable = null;
	this.display_manager = null;
	this.hud_manager = null;

	this.InBoundary = _core_block_inboundary;
	this.Process = _core_block_process;
	this.Update = _core_block_update;

	this.x = 0; this.y = 0;
	this.w = 0; this.h = 0;

	this.background = null;
	this.boundary = null;
	this.surface_boundary = null;

	this.cpu_airplant = null;
	this.cpu_bluejelly = null;
	this.cpu_blueshark = null;
	this.cpu_dolphin = null;
	this.cpu_fish = null;
	this.cpu_glyph = null;
	this.cpu_moirae = null;
	this.projectile_consumable = null;

	this.Destroy = function() {

		this.x = 0; this.y = 0;
		this.w = 0; this.h = 0;

		this.background = null;
		this.boundary = null;
		this.surface_boundary = null;

		this.cpu_airplant = null;
		this.cpu_bluejelly = null;
		this.cpu_blueshark = null;
		this.cpu_dolphin = null;
		this.cpu_fish = null;
		this.cpu_glyph = null;
		this.cpu_moirae = null;
		this.projectile_consumable = null;

		return;
	}

	this.Create = function() {

		this.display_manager = this.playable.display_manager;
		this.hud_manager = this.playable.hud_manager;

		this.x = 320; this.y = 0;
		this.w = 320; this.h = 240;

		this.background = new Image();
		this.background.src = 'agartha/level004-401.png';

		this._boundary();
		return;
	}

	this._boundary = function() {

		var text = null;

		// 16X12
		//      1234567890ABCDEF
		text = "X000000000000000";
		text+= "0000000000000000";
		text+= "0000000000000000";
		text+= "0000000000000000";
		text+= "0000000000000000";
		text+= "0000000000000000";
		text+= "0000000000000000";
		text+= "0000000000000000";
		text+= "0000000000000000";
		text+= "0000000000000000";
		text+= "0000000000000000";
		text+= "0000000000000000"; 

		var total = 0;
		for (var index = 0; index < text.length; index++)
			if (text.charAt(index) == 'X') total++;
		this.boundary = new Array(total+1);

		var column = 0, row = 0;
		for (var index = 0, count = 0; index < text.length; index++) {
			if (text.charAt(index) == 'X') {

			column = parseInt(index/16); row = index-(column*16);
			this.boundary[count] = new Rectangle(row*20+this.x,
				column*20+this.y, 20, 20);

			count++;
		}}

		this.surface_boundary = new Rectangle(this.x, this.y+100, 320, 1);
		this.boundary[total+0] = this.surface_boundary;

		return;
	}
}
