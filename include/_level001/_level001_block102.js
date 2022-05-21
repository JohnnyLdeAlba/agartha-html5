
function _level001_block102() {

	this.id = 102;
	
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

		this.background = new Image();
		this.background.src = 'agartha/segment-102.png';

		this._boundary();
		this._cpuairplant();
		this._cpubluejelly();
		this._cpudolphin();
		this._cpufish();
		this._projectileconsumable();

		return;
	}

	this._boundary = function() {

		var text = null;

		//      1234567890ABCDEF
		text = "0000000000000000";
		text+= "0000000000000000";
		text+= "0000000000000000";
		text+= "XX00000000000000";
		text+= "00X0000000000000";
		text+= "000X000000000000";
		text+= "000XX00000000000";
		text+= "00X0000000000000";
		text+= "00X0000000000000";
		text+= "00X0000000000000";
		text+= "00X0000000000000";
		text+= "00X0000000000000";

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

		this.surface_boundary = new Rectangle(this.x, this.y+100, 320, 1);
		this.boundary[total+0] = this.surface_boundary;
		this.boundary[total+1] = new Rectangle(this.x, this.y, 1, 240);
		return;
	}

	this._cpuairplant = function() {

		this.cpu_airplant = new Array(1);

		this.cpu_airplant[0] = new _cpu_airplant();
		this.cpu_airplant[0].set_playable(this.playable);

		this.cpu_airplant[0].Create();
		this.cpu_airplant[0].SetColor('orange');
		this.cpu_airplant[0].SetPoint(40, 195);

		return;
	}

	this._cpubluejelly = function() {

		this.cpu_bluejelly = new Array(7);

		for (var count = 0; count < this.cpu_bluejelly.length; count++) {

			this.cpu_bluejelly[count] = new _cpu_bluejelly();
			this.cpu_bluejelly[count].playable = this.playable;
			this.cpu_bluejelly[count].Create();			
		}

		this.cpu_bluejelly[0].SetPoint(170, 180);
		this.cpu_bluejelly[1].SetPoint(180, 190);
		this.cpu_bluejelly[2].SetPoint(190, 180);
		this.cpu_bluejelly[3].SetPoint(120, 160);
		this.cpu_bluejelly[4].SetPoint(110, 150);

		this.cpu_bluejelly[5]._cpu_lionsmane_loadimage();
		this.cpu_bluejelly[5].SetPoint(100, 165);

		this.cpu_bluejelly[6]._cpu_lionsmane_loadimage();
		this.cpu_bluejelly[6].SetPoint(180, 170);

		return;
	}

	this._cpublueshark = function() {

		this.cpu_blueshark = new Array(1);

		this.cpu_blueshark[0] = new _cpu_blueshark();
		this.cpu_blueshark[0].playable = this.playable;

		this.cpu_blueshark[0]._cpu_reefshark_create();
		this.cpu_blueshark[0].SetPoint(180, 110);
		this.cpu_blueshark[0].SetBoundaryWidth(80);
		this.cpu_blueshark[0].SetDirection(this._direction.Right);
		
		return;
	}

	this._cpudolphin = function() {

		this.cpu_dolphin = new Array(1);

		this.cpu_dolphin[0] = new _cpu_dolphin();
		this.cpu_dolphin[0].playable = this.playable;
		this.cpu_dolphin[0]._cpu_orca_create();

		this.cpu_dolphin[0].SetPoint(100, 100);
		this.cpu_dolphin[0].next_point = 0;

		this.cpu_dolphin[0].next = new Array(2);
		this.cpu_dolphin[0].next[0] = new Rectangle(50, 150, 20, 20);
		this.cpu_dolphin[0].next[1] = new Rectangle(250, 150, 20, 20);

		this.cpu_dolphin[0].text = new Array(1);
		this.cpu_dolphin[0].text[0] = "ORCA";
		this.cpu_dolphin[0].text[1] = "SHARKS ARE KNOWN TO EAT BOMBS.";

		return;
	}

	this._cpufish = function() {

		this.cpu_fish = new Array(3);

		for (var count = 0; count < this.cpu_fish.length; count++) {

			this.cpu_fish[count] = new _cpu_fish();
			this.cpu_fish[count].playable = this.playable;
			this.cpu_fish[count].Create();
		}

		this.cpu_fish[0].SetSpecies('stripes');
		this.cpu_fish[0].SetPoint(80, 170);
		this.cpu_fish[0].SetBoundaryWidth(45);

		this.cpu_fish[1].SetSpecies('red');
		this.cpu_fish[1].SetPoint(85, 175);
		this.cpu_fish[1].SetBoundaryWidth(40);

		this.cpu_fish[2].SetSpecies('risingsun');
		this.cpu_fish[2].SetPoint(90, 160);
		this.cpu_fish[2].SetBoundaryWidth(55);

		return;
	}

	this._projectileconsumable = function() {

		this.projectile_consumable = new Array(2);

		this.projectile_consumable[0] = new _projectile_consumable();
		this.projectile_consumable[0].playable = this.playable;
		this.projectile_consumable[0].Create(this._consumable.Laser);
		this.projectile_consumable[0].SetPoint(80, 100);
		this.projectile_consumable[0].total = 1;

		this.projectile_consumable[1] = new _projectile_consumable();
		this.projectile_consumable[1].playable = this.playable;
		this.projectile_consumable[1].Create(this._consumable.Coin);
		this.projectile_consumable[1].SetPoint(70, 140);
		this.projectile_consumable[1].total = 1;

		return;
	}
}
