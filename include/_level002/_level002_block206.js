
function _level002_block206() {

	this.id = 206;

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

		this.x = 0; this.y = 240;
		this.w = 320; this.h = 240;

		this.background = new Image();
		this.background.src = 'agartha/stage-206.png';

		this._boundary();
		this._cpuairplant();
		this._cpudolphin();
		this._cpufish();
		this._projectileconsumable();

		return;
	}

	this._boundary = function() {

		var text = null;

		//      1234567890ABCDEF
		text = "XXXX0000000000XX";
		text+= "X000XXXX00000000";
		text+= "X0000000XXX00000";
		text+= "X0000000000X0000";
		text+= "X0000000000X0000";
		text+= "X00000000000X000";
		text+= "0X00000000000X00";
		text+= "00XX000000000X00";
		text+= "0000X000000000XX";
		text+= "00000X000000000X";
		text+= "000000XXX000000X";
		text+= "000000000XXXXXXX";

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

		this.boundary[total+0] = new Rectangle(this.x, this.y, 1, 240);
		return;
	}

	this._cpuairplant = function() {

		this.cpu_airplant = new Array(2);

		this.cpu_airplant[0] = new _cpu_airplant();
		this.cpu_airplant[0].playable = this.playable;
		this.cpu_airplant[0].Create();
		
		this.cpu_airplant[0].SetColor('red');
		this.cpu_airplant[0].SetPoint(240, 325);

		this.cpu_airplant[1] = new _cpu_airplant();
		this.cpu_airplant[1].playable = this.playable;
		this.cpu_airplant[1].Create();

		this.cpu_airplant[1].SetColor('red');
		this.cpu_airplant[1].SetPoint(220, 290);

		return;
	}

	this._cpudolphin = function() {

		this.cpu_dolphin = new Array(1);

		this.cpu_dolphin[0] = new _cpu_dolphin();
		this.cpu_dolphin[0].playable = this.playable;
		this.cpu_dolphin[0].hud_manager = this.hud_manager;

		this.cpu_dolphin[0]._cpu_orca_create();
		this.cpu_dolphin[0].SetDirection(this._direction.Right);
		this.cpu_dolphin[0].SetPoint(10, 400);

		this.cpu_dolphin[0].next_point = null;
		this.cpu_dolphin[0].next = null

		this.cpu_dolphin[0].text = new Array(2);
		this.cpu_dolphin[0].text[0] = "ORCA";

		this.cpu_dolphin[0].text[1] = "THE MOIRAE HAVE SEIZED THE\nENTIRE NOTHERN REGION OF AGARTHA.";
		this.cpu_dolphin[0].text[1]+= "\nWE ARE COMPLETLY DEFENSELESS,\nUNLESS THERE IS A WAY"; 
		this.cpu_dolphin[0].text[1]+= " TO RESTORE\nTHE LEMURIAN SHIELD.";

		return;
	}

	this._cpufish = function() {

		this.cpu_fish = new Array(7);
		for (var count = 0; count < this.cpu_fish.length; count++) {

			this.cpu_fish[count] = new _cpu_fish();
			this.cpu_fish[count].playable = this.playable;
			this.cpu_fish[count].Create();
		}

		this.cpu_fish[0].SetSpecies('red');
		this.cpu_fish[0].SetPoint(260, 300);
		this.cpu_fish[0].SetBoundaryWidth(55);

		this.cpu_fish[1].SetSpecies('red');
		this.cpu_fish[1].SetPoint(265, 310);
		this.cpu_fish[1].SetBoundaryWidth(55);

		this.cpu_fish[2].SetSpecies('red');
		this.cpu_fish[2].SetPoint(270, 305);
		this.cpu_fish[2].SetBoundaryWidth(55);

		this.cpu_fish[3].SetSpecies('red');
		this.cpu_fish[3].SetPoint(240, 260);
		this.cpu_fish[3].SetBoundaryWidth(55);

		this.cpu_fish[4].SetSpecies('stripes');
		this.cpu_fish[4].SetPoint(245, 265);
		this.cpu_fish[4].SetBoundaryWidth(55);

		this.cpu_fish[5].SetSpecies('stripes');
		this.cpu_fish[5].SetPoint(250, 270);
		this.cpu_fish[5].SetBoundaryWidth(55);

		this.cpu_fish[6].SetSpecies('red');
		this.cpu_fish[6].SetPoint(240, 275);
		this.cpu_fish[6].SetBoundaryWidth(55);

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
