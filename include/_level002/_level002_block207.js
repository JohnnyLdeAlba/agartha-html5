
function _level002_block207() {

	this.id = 207;

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
		this.background.src = 'agartha/stage-207.png';

		this._boundary();
		this._cpuairplant();
		this._cpubluejelly();
		this._cpublueshark();
		this._cpufish();

		return;
	}

	this._boundary = function() {

		var text = null;

		//      1234567890ABCDEF
		text = "XXXXXXXXXXX00000";
		text+= "XXXXXXXXX0000000";
		text+= "0XXXX000X0000000";
		text+= "00XX00000000XXXX";
		text+= "0000000000XXXXXX";
		text+= "000000XXXXXXXXXX";
		text+= "00000XXXXXXXXXXX";
		text+= "0000XXXXXXXXXXXX";
		text+= "X0000XXXXXXXXXXX";
		text+= "X00000XXXXXXXXXX";
		text+= "X00000XXXXXXXXXX";
		text+= "0000000XXXXXXXXX";

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

		this.cpu_airplant = new Array(2);

		this.cpu_airplant[0] = new _cpu_airplant();
		this.cpu_airplant[0].playable = this.playable;
		this.cpu_airplant[0].Create();
		
		this.cpu_airplant[0].SetColor('orange');
		this.cpu_airplant[0].SetPoint(460, 330);

		this.cpu_airplant[1] = new _cpu_airplant();
		this.cpu_airplant[1].playable = this.playable;
		this.cpu_airplant[1].Create();

		this.cpu_airplant[1].SetColor('red');
		this.cpu_airplant[1].SetPoint(420, 350);

		return;
	}

	this._cpubluejelly = function() {

		this.cpu_bluejelly = new Array(8);
		for (var count = 0; count < this.cpu_bluejelly.length; count++) {

			this.cpu_bluejelly[count] = new _cpu_bluejelly();
			this.cpu_bluejelly[count].playable = this.playable;
			this.cpu_bluejelly[count].Create();			
		}


		this.cpu_bluejelly[0]._cpu_lionsmane_loadimage();
		this.cpu_bluejelly[0].SetPoint(380, 390);
		this.cpu_bluejelly[1]._cpu_lionsmane_loadimage();
		this.cpu_bluejelly[1].SetPoint(370, 400);
		this.cpu_bluejelly[2]._cpu_lionsmane_loadimage();
		this.cpu_bluejelly[2].SetPoint(380, 410);
		this.cpu_bluejelly[3]._cpu_lionsmane_loadimage();
		this.cpu_bluejelly[3].SetPoint(390, 400);

		this.cpu_bluejelly[4].SetPoint(370, 430);
		this.cpu_bluejelly[5].SetPoint(360, 440);
		this.cpu_bluejelly[6].SetPoint(370, 450);

		this.cpu_bluejelly[7]._cpu_lionsmane_loadimage();
		this.cpu_bluejelly[7].SetPoint(380, 440);

		return;
	}

	this._cpublueshark = function() {

		this.cpu_blueshark = new Array(1);

		this.cpu_blueshark[0] = new _cpu_blueshark();
		this.cpu_blueshark[0].playable = this.playable;
		this.cpu_blueshark[0]._cpu_reefshark_create();			

		this.cpu_blueshark[0].SetPoint(540, 260);
		this.cpu_blueshark[0].SetBoundaryWidth(80);

		return;
	}

	this._cpufish = function() {

		this.cpu_fish = new Array(5);
		for (var count = 0; count < this.cpu_fish.length; count++) {

			this.cpu_fish[count] = new _cpu_fish();
			this.cpu_fish[count].playable = this.playable;
			this.cpu_fish[count].Create();
		}

		this.cpu_fish[0].SetSpecies('stripes');
		this.cpu_fish[0].SetPoint(400, 300);
		this.cpu_fish[0].SetBoundaryWidth(60);

		this.cpu_fish[1].SetSpecies('red');
		this.cpu_fish[1].SetPoint(405, 310);
		this.cpu_fish[1].SetBoundaryWidth(55);

		this.cpu_fish[2].SetSpecies('risingsun');
		this.cpu_fish[2].SetPoint(410, 315);
		this.cpu_fish[2].SetBoundaryWidth(50);

		this.cpu_fish[3].SetSpecies('stripes');
		this.cpu_fish[3].SetPoint(415, 305);
		this.cpu_fish[3].SetBoundaryWidth(60);

		this.cpu_fish[4].SetSpecies('risingsun');
		this.cpu_fish[4].SetPoint(415, 320);
		this.cpu_fish[4].SetBoundaryWidth(55);

		return;
	}

	this._projectileconsumable = function() {

		var count = 0;
		this.projectile_consumable = new Array(1);

		this.projectile_consumable[0] = new _projectile_consumable();
		this.projectile_consumable[0].playable = this.playable;

		this.projectile_consumable[0].Create(this._consumable.Coin);
		this.projectile_consumable[0].SetPoint(0, 380);
		this.projectile_consumable[0].total = 1;

		return;
	}
}
