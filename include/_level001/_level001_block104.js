
function _level001_block104() {

	this.id = 104;
	
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

		this.x = 320; this.y = 240;
		this.w = 320; this.h = 240;

		this.background = new Image();
		this.background.src = 'agartha/segment-104.png';

		this._boundary();
		this._cpuairplant();
		this._cpubluejelly();
		this._cpublueshark();
		this._projectileconsumable();

		return;
	}

	this._boundary = function() {

		var text = null;

		// 16X12
		//      1234567890ABCDEF
		text = "0000000000000X00";
		text+= "0000000000000X00";
		text+= "00000000000000X0";
		text+= "0000000000000X00";
		text+= "00000000000000X0";
		text+= "00000000000000X0";
		text+= "0000000000000X00";
		text+= "0000000000000X00";
		text+= "0000000000000X00";
		text+= "000000000000X000";
		text+= "XX0000000000X000";
		text+= "00X00000000X0000";

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

	this._cpuairplant = function() {

		this.cpu_airplant = new Array(1);

		this.cpu_airplant[0] = new _cpu_airplant();
		this.cpu_airplant[0].playable = this.playable;
		this.cpu_airplant[0].Create();

		this.cpu_airplant[0].SetColor('orange');
		this.cpu_airplant[0].SetPoint(350, 675);

		return;
	}

	this._cpubluejelly = function() {

		this.cpu_bluejelly = new Array(8);

		for (var count = 0; count < this.cpu_bluejelly.length; count++) {

			this.cpu_bluejelly[count] = new _cpu_bluejelly();
			this.cpu_bluejelly[count].playable = this.playable;
			this.cpu_bluejelly[count].Create();			
		}

		this.cpu_bluejelly[0].SetPoint(500, 390);
		this.cpu_bluejelly[1].SetPoint(510, 400);
		this.cpu_bluejelly[2].SetPoint(520, 410);

		this.cpu_bluejelly[3].SetPoint(530, 410);
		this.cpu_bluejelly[4].SetPoint(540, 400);
		this.cpu_bluejelly[5].SetPoint(550, 390);

		this.cpu_bluejelly[6]._cpu_lionsmane_loadimage();
		this.cpu_bluejelly[6].SetPoint(528, 370);

		this.cpu_bluejelly[7]._cpu_lionsmane_loadimage();
		this.cpu_bluejelly[7].SetPoint(528, 390);

		return;
	}

	this._cpublueshark = function() {

		this.cpu_blueshark = new Array(7);
		for (var count = 0; count < this.cpu_blueshark.length; count++) {

			this.cpu_blueshark[count] = new _cpu_blueshark();
			this.cpu_blueshark[count].playable = this.playable;
			this.cpu_blueshark[count].Create();
		}

		this.cpu_blueshark[0].SetPoint(300, 240);
		this.cpu_blueshark[0].SetBoundaryWidth(100);

		this.cpu_blueshark[1].SetPoint(270, 265);
		this.cpu_blueshark[1].SetBoundaryWidth(100);

		this.cpu_blueshark[2].SetPoint(300, 285);
		this.cpu_blueshark[2].SetBoundaryWidth(100);

		this.cpu_blueshark[3]._cpu_reefshark_loadimage();
		this.cpu_blueshark[3].SetPoint(410, 260);
		this.cpu_blueshark[3].SetBoundaryWidth(100);

		this.cpu_blueshark[4]._cpu_reefshark_loadimage();
		this.cpu_blueshark[4].SetPoint(430, 280);
		this.cpu_blueshark[4].SetBoundaryWidth(100);

		this.cpu_blueshark[5]._cpu_reefshark_loadimage();
		this.cpu_blueshark[5].SetPoint(410, 300);
		this.cpu_blueshark[5].SetBoundaryWidth(100);

		this.cpu_blueshark[6]._cpu_reefshark_loadimage();
		this.cpu_blueshark[6].SetPoint(420, 430);
		this.cpu_blueshark[6].SetBoundaryWidth(100);
		
		return;
	}

	this._projectileconsumable = function() {

		this.projectile_consumable = new Array(3);

		this.projectile_consumable[0] = new _projectile_consumable();
		this.projectile_consumable[0].playable = this.playable;
		this.projectile_consumable[0].Create(this._consumable.Bomb);
		this.projectile_consumable[0].SetPoint(380, 460);
		this.projectile_consumable[0].total = 1;

		this.projectile_consumable[1] = new _projectile_consumable();
		this.projectile_consumable[1].playable = this.playable;
		this.projectile_consumable[1].Create(this._consumable.Bomb);
		this.projectile_consumable[1].SetPoint(570, 345);
		this.projectile_consumable[1].total = 1;

		this.projectile_consumable[2] = new _projectile_consumable();
		this.projectile_consumable[2].playable = this.playable;
		this.projectile_consumable[2].Create(this._consumable.Coin);
		this.projectile_consumable[2].SetPoint(570, 285);
		this.projectile_consumable[2].total = 1;

		return;
	}
}
