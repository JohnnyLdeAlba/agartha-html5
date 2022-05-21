
function _core_block_inboundary() {

	if (this.playable.state == this._state.Purge)
		return false;
	if (this.playable.state == this._state.Burst)
		return false;

	var quadrant = new Rectangle(parseInt(this.boundary[0].x/320)*320,
		parseInt(this.boundary[0].y/240)*240, 320, 240);

	if (InBound(this.playable.current, quadrant) == false)
		return false;

	for (var count = 0; count < this.boundary.length; count++) {

		// this.display_manager.StrokeRect(this.boundary[count].x,
		//	this.boundary[count].y, this.boundary[count].w,
		//	this.boundary[count].h, '#ff0000');

		// this.display_manager.StrokeRect(parseInt(this.x/320)*320,
		//	parseInt(this.y/240)*240, 320, 240, '#00ff00');

		if (this.playable.InBoundX(this.boundary[count]))
			this.playable.outbound_x = false;
		if (this.playable.InBoundY(this.boundary[count]))
			this.playable.outbound_y = false;

		if ((this.playable.outbound_x == false) &&
			(this.playable.outbound_y == false))
				return true;
	}

	return false;
}

function _core_block_process() {

	if (not_equal(this.cpu_dolphin, null))
		for (var count = 0; count < this.cpu_dolphin.length; count++)
			this.cpu_dolphin[count].Process();

	if (not_equal(this.cpu_bluejelly, null))
		for (var count = 0; count < this.cpu_bluejelly.length; count++)
			this.cpu_bluejelly[count].Process();

	if (not_equal(this.cpu_blueshark, null))
		for (var count = 0; count < this.cpu_blueshark.length; count++)
			this.cpu_blueshark[count].Process();

	if (not_equal(this.cpu_glyph, null))
			for (var count = 0; count < this.cpu_glyph.length; count++)
				this.cpu_glyph[count].Process();

	if (not_equal(this.cpu_moirae, null))
		for (var count = 0; count < this.cpu_moirae.length; count++)
			this.cpu_moirae[count].Process();

	this.InBoundary();
	return;
}

function _core_block_update() {

	if (not_equal(this.cpu_airplant, null))
		for (var count = 0; count < this.cpu_airplant.length; count++)
			this.cpu_airplant[count].Update();

	if (not_equal(this.cpu_fish, null))
		for (var count = 0; count < this.cpu_fish.length; count++)
			this.cpu_fish[count].Update();

	if (not_equal(this.projectile_consumable, null))
		for (var count = 0; count < this.projectile_consumable.length; count++)
			this.projectile_consumable[count].Update();

	return;
}

function _level001_block100() {

	this.id = 100;

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

		this.x = 0; this.y = 480;
		this.w = 320; this.h = 240;

		this.background = new Image();
		this.background.src = 'agartha/stage-100.png';

		this._boundary();
		this._cpuairplant();
		this._cpudolphin();
		this._cpufish();
		this._cpuglyph();
		this._projectileconsumable();

		return;
	}

	this._boundary = function() {

		var text = null;

		/* 16x12
		text = "0000000000000000";
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
		text+= "0000000000000000"; */

		//      1234567890ABCDEF
		text = "0X000000000000XX";
		text+= "0X000000000XXX00";
		text+= "X00000000000XX00";
		text+= "X0000000000000X0";
		text+= "00000000000000X0";
		text+= "000000000000000X";
		text+= "000000000000000X";
		text+= "X00000000000000X";
		text+= "0XXX00000000000X";
		text+= "0000XX000000000X";
		text+= "000000XX0000000X";
		text+= "00000000X0000XX0";

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
		this.cpu_airplant[0].SetPoint(70, 635);

		this.cpu_airplant[1] = new _cpu_airplant();
		this.cpu_airplant[1].playable = this.playable;
		this.cpu_airplant[1].Create();

		this.cpu_airplant[1].SetColor('orange');
		this.cpu_airplant[1].SetPoint(100, 655);

		return;
	}

	this._cpudolphin = function() {

		this.cpu_dolphin = new Array(3);

		for (var count = 0; count < this.cpu_dolphin.length; count++) {

			this.cpu_dolphin[count] = new _cpu_dolphin();
			this.cpu_dolphin[count].playable = this.playable;
			this.cpu_dolphin[count].hud_manager = this.hud_manager;
		}

		this.cpu_dolphin[0].Create();
		this.cpu_dolphin[0].SetPoint(280, 580);

		this.cpu_dolphin[0].next_point = 0;
		this.cpu_dolphin[0].next = new Array(5);
		this.cpu_dolphin[0].next[0] = new Rectangle(290, 580, 20, 20);
		this.cpu_dolphin[0].next[1] = new Rectangle(100, 580, 20, 20);
		this.cpu_dolphin[0].next[2] = new Rectangle(100, 500, 20, 20);
		this.cpu_dolphin[0].next[3] = new Rectangle(100, 580, 20, 20);
		this.cpu_dolphin[0].next[4] = new Rectangle(20, 580, 20, 20);

		this.cpu_dolphin[0].text = new Array(2);
		this.cpu_dolphin[0].text[0] = "DOLPHIN";
		this.cpu_dolphin[0].text[1] = "SING TO THE PLANTS TO REPLENISH\nYOUR BREATH.";

		this.cpu_dolphin[1]._cpu_orca_create();
		this.cpu_dolphin[1].SetPoint(50, 480);

		this.cpu_dolphin[1].next_point = 0;
		this.cpu_dolphin[1].next = new Array(2);
		this.cpu_dolphin[1].next[0] = new Rectangle(50, 530, 20, 20);
		this.cpu_dolphin[1].next[1] = new Rectangle(250, 530, 20, 20);

		this.cpu_dolphin[1].text = new Array(2);
		this.cpu_dolphin[1].text[0] = "ORCA";
		this.cpu_dolphin[1].text[1] = "SING TO THE LARGE CRYSTAL TO\nREVEAL IT'S HIDDEN MESSAGE.";

		this.cpu_dolphin[2]._cpu_orca_create();
		this.cpu_dolphin[2].SetDirection(this._direction.Right);
		this.cpu_dolphin[2].SetPoint(240, 660);

		this.cpu_dolphin[2].next_point = 0;
		this.cpu_dolphin[2].next = null;

		this.cpu_dolphin[2].text = new Array(2);
		this.cpu_dolphin[2].text[0] = "ORCA";
		this.cpu_dolphin[2].text[1] = "COINS WERE USED BY THE\nINHABITANTS OF ANCIENT POISED\nTO ACTIVATE";
		this.cpu_dolphin[2].text[1]+= " THEIR TECHNOLOGY.\nTHERE ARE FIVE COINS IN ALL.";

		return;
	}

	this._cpufish = function() {

		this.cpu_fish = new Array(9);
		for (var count = 0; count < this.cpu_fish.length; count++) {

			this.cpu_fish[count] = new _cpu_fish();
			this.cpu_fish[count].playable = this.playable;
			this.cpu_fish[count].Create();
		}

		this.cpu_fish[0].SetSpecies('stripes');
		this.cpu_fish[0].SetPoint(190, 680);
		this.cpu_fish[0].SetBoundaryWidth(60);

		this.cpu_fish[1].SetSpecies('red');
		this.cpu_fish[1].SetPoint(175, 685);
		this.cpu_fish[1].SetBoundaryWidth(55);

		this.cpu_fish[2].SetSpecies('risingsun');
		this.cpu_fish[2].SetPoint(180, 690);
		this.cpu_fish[2].SetBoundaryWidth(50);

		this.cpu_fish[3].SetSpecies('stripes');
		this.cpu_fish[3].SetPoint(140, 530);
		this.cpu_fish[3].SetBoundaryWidth(60);

		this.cpu_fish[4].SetSpecies('red');
		this.cpu_fish[4].SetPoint(150, 540);
		this.cpu_fish[4].SetBoundaryWidth(55);

		this.cpu_fish[5].SetSpecies('risingsun');
		this.cpu_fish[5].SetPoint(160, 550);
		this.cpu_fish[5].SetBoundaryWidth(55);

		this.cpu_fish[6].SetSpecies('stripes');
		this.cpu_fish[6].SetPoint(160, 535);
		this.cpu_fish[6].SetBoundaryWidth(60);

		this.cpu_fish[7].SetSpecies('red');
		this.cpu_fish[7].SetPoint(165, 545);
		this.cpu_fish[7].SetBoundaryWidth(50);

		this.cpu_fish[8].SetSpecies('risingsun');
		this.cpu_fish[8].SetPoint(145, 555);
		this.cpu_fish[8].SetBoundaryWidth(50);

		return;
	}


	this._cpuglyph = function() {

		this.cpu_glyph = new Array(1);

		this.cpu_glyph[0] = new _cpu_glyph();
		this.cpu_glyph[0].playable = this.playable;
		this.cpu_glyph[0].Create();
		
		this.cpu_glyph[0].SetPoint(210, 495);
		this.cpu_glyph[0].SetId('hercules');
		this.cpu_glyph[0].SetDirection(this._direction.Left);

		this.cpu_glyph[0].text = new Array(2);
		this.cpu_glyph[0].text[0] = "HOLOGRAM";
		this.cpu_glyph[0].text[1] = "LARGE CRYSTALS CALLED GLYPHS\nCONTAIN THE ESSENCE";
		this.cpu_glyph[0].text[1]+= " OF THOSE\nLONG PASSED. THESE CRYSTALS ARE\nTHE RESULT";
		this.cpu_glyph[0].text[1]+= " OF TECHNOLOGY CREATED\nTHOUSANDS OF YEARS AGO.";

		return;
	}

	this._projectileconsumable = function() {

		var count = 0;
		this.projectile_consumable = new Array(3);

		this.projectile_consumable[0] = new _projectile_consumable();
		this.projectile_consumable[0].playable = this.playable;

		this.projectile_consumable[0].Create(this._consumable.HealthJar);
		this.projectile_consumable[0].SetPoint(50, 495);
		this.projectile_consumable[0].total = 1;

		this.projectile_consumable[1] = new _projectile_consumable();
		this.projectile_consumable[1].playable = this.playable;

		this.projectile_consumable[1].Create(this._consumable.AirJar);
		this.projectile_consumable[1].SetPoint(255, 540);
		this.projectile_consumable[1].total = 1;

		this.projectile_consumable[2] = new _projectile_consumable();
		this.projectile_consumable[2].playable = this.playable;

		this.projectile_consumable[2].Create(this._consumable.Coin);
		this.projectile_consumable[2].SetPoint(280, 680);
		this.projectile_consumable[2].total = 1;

		return;
	}
}
