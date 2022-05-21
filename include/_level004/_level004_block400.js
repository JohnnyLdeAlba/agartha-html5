
function _level004_block400() {

	this.id = 400;

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

		this.x = 0; this.y = 0;
		this.w = 1280; this.h = 1440;

		this.background = new Image();
		this.background.src = 'agartha/blue-glyph.png';

		this._boundary();
		this._cpumoirae();
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
		this.boundary = new Array(total);

		var column = 0, row = 0;
		for (var index = 0, count = 0; index < text.length; index++) {
			if (text.charAt(index) == 'X') {

			column = parseInt(index/16); row = index-(column*16);
			this.boundary[count] = new Rectangle(row*20+this.x,
				column*20+this.y, 20, 20);

			count++;
		}}

		return;
	}
	
	this._cpumoirae = function() {

		this.cpu_moirae = new Array(1000);

		for (var count = 0; count < this.cpu_moirae.length; count++) {

			this.cpu_moirae[count] = new _cpu_moirae();
			this.cpu_moirae[count].playable = this.playable;
			this.cpu_moirae[count].Create();
		}

		for (var count = 0; count < this.cpu_moirae.length; count++) {
		
		this.cpu_moirae[count].SetPoint(Math.floor(Math.random()*1280)+320,
		  Math.floor(Math.random()*960)+240);
		  
		this.cpu_moirae[count].SetDirection(this._direction.Left);
		this.cpu_moirae[count].health = 1;
		this.cpu_moirae[count].full_health = 3;
		this.cpu_moirae[count].delay_createlaser.total = 50;
		this.cpu_moirae[count].delay_move.total = 1; }
		
		return;
	}
}
