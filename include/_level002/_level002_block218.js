
function _level002_block218() {

	this.id = 218;

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

		this.x = 0; this.y = 720;
		this.w = 320; this.h = 240;

		this.background = new Image();
		this.background.src = 'agartha/stage-218.png';

		this._boundary();
		this._cpuairplant();
		this._cpumoirae();
		this._projectileconsumable();

		return;
	}

	this._boundary = function() {

		var text = null;

		//      1234567890ABCDEF
		text = "0000000000000000";
		text+= "0000000000XX00XX";
		text+= "000000XXXXXXXXXX";
		text+= "00XX0XXXXXXXXXXX";
		text+= "00XXXXXXXXXXXXXX";
		text+= "00XXXXXXXXXXXXXX";
		text+= "00XXXXXXXXXX0000";
		text+= "0XXXXXXXXXXX0000";
		text+= "0XXXXXXXXXXXX000";
		text+= "00XXXXXXXXXX0000";
		text+= "0XXXXXXXXXX00000";
		text+= "00XXXXXXXXX00000";

		var total = 0;
		for (var index = 0; index < text.length; index++)
			if (text.charAt(index) == 'X') total++;
		this.boundary = new Array(total+2);

		var column = 0, row = 0;
		for (var index = 0, count = 0; index < text.length; index++) {
			if (text.charAt(index) == 'X') {

			column = parseInt(index/16); row = index-(column*16);
			this.boundary[count] = new Rectangle(row*20+this.x,
				column*20+this.y, 20, 20);

			count++;
		}}

		this.boundary[total+0] = new Rectangle(this.x, this.y+240, 320, 1);
		this.boundary[total+1] = new Rectangle(this.x, this.y, 1, 240);
		return;
	}

	this._cpuairplant = function() {

		this.cpu_airplant = new Array(2);

		this.cpu_airplant[0] = new _cpu_airplant();
		this.cpu_airplant[0].playable = this.playable;
		this.cpu_airplant[0].Create();
		
		this.cpu_airplant[0].SetColor('red');
		this.cpu_airplant[0].SetPoint(230, 860);

		this.cpu_airplant[1] = new _cpu_airplant();
		this.cpu_airplant[1].playable = this.playable;
		this.cpu_airplant[1].Create();
		
		this.cpu_airplant[1].SetColor('red');
		this.cpu_airplant[1].SetPoint(220, 940);

		return;
	}

	this._cpumoirae = function() {

		this.cpu_moirae = new Array(1);

		for (var count = 0; count < this.cpu_moirae.length; count++) {

			this.cpu_moirae[count] = new _cpu_moirae();
			this.cpu_moirae[count].playable = this.playable;
			this.cpu_moirae[count].Create();
		}

		this.cpu_moirae[0].SetPoint(240, 880);
		this.cpu_moirae[0].SetRestrictedBoundary(240, 860, 100, 100);
		
		this.cpu_moirae[0].SetDirection(this._direction.Right);
		this.cpu_moirae[0].delay_createlaser.total = 300;
		this.cpu_moirae[0].delay_move.total = 1;
		
		return;
	}

	this._projectileconsumable = function() {

		var count = 0;
		this.projectile_consumable = new Array(2);

		this.projectile_consumable[0] = new _projectile_consumable();
		this.projectile_consumable[0].playable = this.playable;

		this.projectile_consumable[0].Create(this._consumable.Shield);
		this.projectile_consumable[0].SetPoint(240, 860);
		this.projectile_consumable[0].total = 1;

		this.projectile_consumable[1] = new _projectile_consumable();
		this.projectile_consumable[1].playable = this.playable;

		this.projectile_consumable[1].Create(this._consumable.Shield);
		this.projectile_consumable[1].SetPoint(220, 920);
		this.projectile_consumable[1].total = 1;

		return;
	}
}
