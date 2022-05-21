
function _level910_block9100() {

	this.id = 9100;

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
		this.w = 320; this.h = 240;

		this._boundary();
		this._projectileconsumable();
		return;
	}

	this._boundary = function() {

		var text = null;

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
	}

	this._projectileconsumable = function() {

		var count = 0;
		this.projectile_consumable = new Array(7);

		this.projectile_consumable[0] = new _projectile_consumable();
		this.projectile_consumable[0].playable = this.playable;

		this.projectile_consumable[0].Create(this._consumable.HealthJar);
		this.projectile_consumable[0].SetPoint(76, 50);
		this.projectile_consumable[0].total = 5;

		this.projectile_consumable[1] = new _projectile_consumable();
		this.projectile_consumable[1].playable = this.playable;

		this.projectile_consumable[1].Create(this._consumable.AirJar);
		this.projectile_consumable[1].SetPoint(124, 50);
		this.projectile_consumable[1].total = 5;

		this.projectile_consumable[2] = new _projectile_consumable();
		this.projectile_consumable[2].playable = this.playable;

		this.projectile_consumable[2].Create(this._consumable.Laser);
		this.projectile_consumable[2].SetPoint(172, 50);
		this.projectile_consumable[2].total = 5;

		this.projectile_consumable[3] = new _projectile_consumable();
		this.projectile_consumable[3].playable = this.playable;

		this.projectile_consumable[3].Create(this._consumable.Shield);
		this.projectile_consumable[3].SetPoint(220, 50);
		this.projectile_consumable[3].total = 5;

		this.projectile_consumable[4] = new _projectile_consumable();
		this.projectile_consumable[4].playable = this.playable;

		this.projectile_consumable[4].Create(this._consumable.Bomb);
		this.projectile_consumable[4].SetPoint(100, 30);
		this.projectile_consumable[4].total = 5;

		this.projectile_consumable[5] = new _projectile_consumable();
		this.projectile_consumable[5].playable = this.playable;

		this.projectile_consumable[5].Create(this._consumable.MegaBomb);
		this.projectile_consumable[5].SetPoint(196, 30);
		this.projectile_consumable[5].total = 5;

		this.projectile_consumable[6] = new _projectile_consumable();
		this.projectile_consumable[6].playable = this.playable;

		this.projectile_consumable[6].Create(this._consumable.Sprite);
		this.projectile_consumable[6].SetPoint(148, 30);
		this.projectile_consumable[6].total = 5;

		return;
	}
}
