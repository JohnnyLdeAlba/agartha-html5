
function _level001_block101() {

	this.id = 101;
	
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
		this.background.src = 'agartha/segment-101.png';

		this._boundary();
		this._cpuairplant();
		this._cpubluejelly();
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
		text = "0X00000000000000";
		text+= "0X00000000000000";
		text+= "00X0000000000000";
		text+= "0X00000000000000";
		text+= "0X00000000000000";
		text+= "0X00000000000000";
		text+= "0X00000000000000";
		text+= "00X0000000000000";
		text+= "00X0000000000000";
		text+= "00X0000000000000";
		text+= "0X00000000000000";
		text+= "0X0000000000000X";

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

		this.cpu_airplant = new Array(1);
		this.cpu_airplant[0] = new _cpu_airplant();
		this.cpu_airplant[0].playable = this.playable;

		this.cpu_airplant[0].Create();
		this.cpu_airplant[0].SetColor('red');
		this.cpu_airplant[0].SetPoint(55, 360);

		return;
	}

	this._cpubluejelly = function() {

		this.cpu_bluejelly = new Array(19);
		for (var count = 0; count < this.cpu_bluejelly.length; count++) {

			this.cpu_bluejelly[count] = new _cpu_bluejelly();
			this.cpu_bluejelly[count].playable = this.playable;
			this.cpu_bluejelly[count].Create();			
		}

		this.cpu_bluejelly[0].SetPoint(160, 280);
		this.cpu_bluejelly[1].SetPoint(170, 290);
		this.cpu_bluejelly[2].SetPoint(150, 300);
		
		this.cpu_bluejelly[3].SetPoint(200, 310);
		this.cpu_bluejelly[4].SetPoint(210, 320);
		this.cpu_bluejelly[5].SetPoint(200, 330);

		this.cpu_bluejelly[6].SetPoint(120, 350);
		this.cpu_bluejelly[7].SetPoint(130, 360);
		this.cpu_bluejelly[8].SetPoint(110, 370);

		this.cpu_bluejelly[9].SetPoint(180, 420);
		this.cpu_bluejelly[10].SetPoint(170, 430);
		this.cpu_bluejelly[11].SetPoint(190, 440);

		this.cpu_bluejelly[12].SetPoint(240, 410);
		this.cpu_bluejelly[13].SetPoint(230, 400);
		this.cpu_bluejelly[14].SetPoint(260, 390);

		this.cpu_bluejelly[15]._cpu_lionsmane_loadimage();
		this.cpu_bluejelly[15].SetPoint(190, 320);

		this.cpu_bluejelly[16]._cpu_lionsmane_loadimage();
		this.cpu_bluejelly[16].SetPoint(140, 390);

		this.cpu_bluejelly[17]._cpu_lionsmane_loadimage();
		this.cpu_bluejelly[17].SetPoint(120, 390);

		this.cpu_bluejelly[18]._cpu_lionsmane_loadimage();
		this.cpu_bluejelly[18].SetPoint(130, 400);

		return;
	}

	this._cpublueshark = function() {

		this.cpu_blueshark = new Array(2);

		this.cpu_blueshark[0] = new _cpu_blueshark();
		this.cpu_blueshark[0].playable = this.playable;
		this.cpu_blueshark[0].Create();

		this.cpu_blueshark[0].SetPoint(60, 290);
		this.cpu_blueshark[0].SetBoundaryWidth(100);
		this.cpu_blueshark[0].SetDirection(this._direction.Left);

		this.cpu_blueshark[1] = new _cpu_blueshark();
		this.cpu_blueshark[1].playable = this.playable;
		this.cpu_blueshark[1]._cpu_reefshark_create();

		this.cpu_blueshark[1].SetPoint(180, 350);
		this.cpu_blueshark[1].SetBoundaryWidth(80);
		this.cpu_blueshark[1].SetDirection(this._direction.Right);
		
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
		this.cpu_fish[0].SetPoint(200, 290);
		this.cpu_fish[0].SetBoundaryWidth(55);

		this.cpu_fish[1].SetSpecies('red');
		this.cpu_fish[1].SetPoint(215, 285);
		this.cpu_fish[1].SetBoundaryWidth(40);

		this.cpu_fish[2].SetSpecies('risingsun');
		this.cpu_fish[2].SetPoint(210, 275);
		this.cpu_fish[2].SetBoundaryWidth(50);

		return;
	}

	this._cpuglyph = function() {

		this.cpu_glyph = new Array(1);

		this.cpu_glyph[0] = new _cpu_glyph();
		this.cpu_glyph[0].playable = this.playable;
		this.cpu_glyph[0].Create();
		
		this.cpu_glyph[0].SetId('nalia');
		this.cpu_glyph[0].SetPoint(40, 265);
		this.cpu_glyph[0].SetDirection(this._direction.Right);

		this.cpu_glyph[0].text = new Array(2);
		this.cpu_glyph[0].text[0] = "HOLOGRAM";
		this.cpu_glyph[0].text[1] = "SCATTERED THROUGHOUT AGARTHA ARE\nPIECES OF TECHNOLOGY";
		this.cpu_glyph[0].text[1] += " LEFT BEHIND\nBY THE LEMURIANS, CREATED FOR WE,\nTHE SINGERS";

		return;
	}

	this._projectileconsumable = function() {

		this.projectile_consumable = new Array(3);

		this.projectile_consumable[0] = new _projectile_consumable();
		this.projectile_consumable[0].playable = this.playable;
		this.projectile_consumable[0].Create(this._consumable.HealthJar);

		this.projectile_consumable[0].SetPoint(40, 350);
		this.projectile_consumable[0].total = 1;

		this.projectile_consumable[1] = new _projectile_consumable();
		this.projectile_consumable[1].playable = this.playable;
		this.projectile_consumable[1].Create(this._consumable.AirJar);

		this.projectile_consumable[1].SetPoint(280, 455);
		this.projectile_consumable[1].total = 1;

		this.projectile_consumable[2] = new _projectile_consumable();
		this.projectile_consumable[2].playable = this.playable;
		this.projectile_consumable[2].Create(this._consumable.Coin);

		this.projectile_consumable[2].SetPoint(300, 445);
		this.projectile_consumable[2].total = 1;

		return;
	}
}
