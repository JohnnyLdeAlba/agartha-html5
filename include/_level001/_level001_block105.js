
function _level001_block105() {

	this.id = 105;

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
		this.background.src = 'agartha/segment-105.png';

		this._boundary();
		this._cpuairplant();
		this._cpublueshark();
		this._cpufish();
		this._cpuglyph();
		this._projectileconsumable();

		return;
	}

	this._boundary = function() {

		var text = null;

		// 16X12
		//      1234567890ABCDEF
		text = "0000000000000000";
		text+= "0000000000000000";
		text+= "0000000000000000";
		text+= "000000000000000X";
		text+= "000000000000000X";
		text+= "00000000000000X0";
		text+= "00000000000000X0";
		text+= "00000000000000X0";
		text+= "0000000000000X00";
		text+= "0000000000000X00";
		text+= "000000000000X000";
		text+= "0000000000000X00";

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

	this._cpuairplant = function() {

		this.cpu_airplant = new Array(2);

		this.cpu_airplant[0] = new _cpu_airplant();
		this.cpu_airplant[0].playable = this.playable;
		this.cpu_airplant[0].Create();

		this.cpu_airplant[0].SetColor('red');
		this.cpu_airplant[0].SetPoint(585, 135);

		this.cpu_airplant[1] = new _cpu_airplant();
		this.cpu_airplant[1].playable = this.playable;
		this.cpu_airplant[1].Create();

		this.cpu_airplant[1].SetColor('orange');
		this.cpu_airplant[1].SetPoint(570, 180);

		return;
	}

	this._cpublueshark = function() {

		this.cpu_blueshark = new Array(2);

		for (var count = 0; count < this.cpu_blueshark.length; count++) {

			this.cpu_blueshark[count] = new _cpu_blueshark();
			this.cpu_blueshark[count].playable = this.playable;
			this.cpu_blueshark[count]._cpu_reefshark_create();
		}

		this.cpu_blueshark[0].SetPoint(340, 130);
		this.cpu_blueshark[0].SetBoundaryWidth(100);
		this.cpu_blueshark[0].SetDirection(this._direction.Left);

		this.cpu_blueshark[1].SetPoint(360, 150);
		this.cpu_blueshark[1].SetBoundaryWidth(100);
		this.cpu_blueshark[1].SetDirection(this._direction.Left);
		
		return;
	}

	this._cpufish = function() {

		this.cpu_fish = new Array(6);

		for (var count = 0; count < this.cpu_fish.length; count++) {

			this.cpu_fish[count] = new _cpu_fish();
			this.cpu_fish[count].playable = this.playable;
			this.cpu_fish[count].Create();
		}

		this.cpu_fish[0].SetSpecies('stripes');
		this.cpu_fish[0].SetPoint(560, 120);
		this.cpu_fish[0].SetBoundaryWidth(50);

		this.cpu_fish[1].SetSpecies('red');
		this.cpu_fish[1].SetPoint(545, 125);
		this.cpu_fish[1].SetBoundaryWidth(40);

		this.cpu_fish[2].SetSpecies('risingsun');
		this.cpu_fish[2].SetPoint(550, 130);
		this.cpu_fish[2].SetBoundaryWidth(40);

		this.cpu_fish[3].SetSpecies('stripes');
		this.cpu_fish[3].SetPoint(550, 150);
		this.cpu_fish[3].SetBoundaryWidth(55);

		this.cpu_fish[4].SetSpecies('red');
		this.cpu_fish[4].SetPoint(545, 155);
		this.cpu_fish[4].SetBoundaryWidth(55);

		this.cpu_fish[5].SetSpecies('risingsun');
		this.cpu_fish[5].SetPoint(560, 160);
		this.cpu_fish[5].SetBoundaryWidth(55);

		return;
	}

	this._cpuglyph = function() {

		this.cpu_glyph = new Array(1);

		this.cpu_glyph[0] = new _cpu_glyph();
		this.cpu_glyph[0].playable = this.playable;
		this.cpu_glyph[0].Create();
		
		this.cpu_glyph[0].SetPoint(588, 110);
		this.cpu_glyph[0].SetId('hercules');
		this.cpu_glyph[0].SetDirection(this._direction.Left);

		this.cpu_glyph[0].text = Array(2); 
		this.cpu_glyph[0].text[0] = "HOLOGRAM";
		this.cpu_glyph[0].text[1] = "NEVER WASTE WHAT YOU FIND,\nIF YOU HAVE CONVENTIONAL";
		this.cpu_glyph[0].text[1]+= " MEANS\nOF SOLVING A PROBLEM YOU'RE\nPROBABLY BETTER OFF.";

		return;
	}

	this._projectileconsumable = function() {

		this.projectile_consumable = new Array(2);

		this.projectile_consumable[0] = new _projectile_consumable();
		this.projectile_consumable[0].playable = this.playable;
		this.projectile_consumable[0].Create(this._consumable.Laser);
		this.projectile_consumable[0].SetPoint(585, 100);
		this.projectile_consumable[0].total = 1;

		this.projectile_consumable[1] = new _projectile_consumable();
		this.projectile_consumable[1].playable = this.playable;
		this.projectile_consumable[1].Create(this._consumable.Coin);
		this.projectile_consumable[1].SetPoint(570, 150);
		this.projectile_consumable[1].total = 1;

		return;
	}
}
