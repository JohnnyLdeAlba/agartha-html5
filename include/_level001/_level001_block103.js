
function _level001_block103() {

	this.id = 103;

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

		this.x = 320; this.y = 480;
		this.w = 320; this.h = 240;

		this.background = new Image();
		this.background.src = 'agartha/segment-103.png';

		this._boundary();
		this._cpuairplant();
		this._cpubluejelly();
		this._cpublueshark();
		this._cpufish();
		this._cpuglyph();

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
		text = "000X0000000X0000";
		text+= "000X0000000X0000";
		text+= "000X00000000XX00";
		text+= "00X00000000000XX";
		text+= "XX00000000000000";
		text+= "0000000000000000";
		text+= "0000000000000XXX";
		text+= "0000000000000X00";
		text+= "XX0000000000X000";
		text+= "00X0000000XX0000";
		text+= "000XXXXXXX000000";
		text+= "0000000000000000";

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
		this.boundary[total+1] = new Rectangle(this.x+300, this.y+80, 20, 40);
		return;
	}

	this._cpuairplant = function() {

		this.cpu_airplant = new Array(1);

		this.cpu_airplant[0] = new _cpu_airplant();
		this.cpu_airplant[0].playable = this.playable;
		this.cpu_airplant[0].Create();

		this.cpu_airplant[0].SetColor('red');
		this.cpu_airplant[0].SetPoint(380, 655);

		return;
	}

	this._cpubluejelly = function() {

		this.cpu_bluejelly = new Array(19);

		for (var count = 0; count < this.cpu_bluejelly.length; count++) {

			this.cpu_bluejelly[count] = new _cpu_bluejelly();
			this.cpu_bluejelly[count].playable = this.playable;
			this.cpu_bluejelly[count].Create();			
		}

		this.cpu_bluejelly[0].SetPoint(480, 520);
		this.cpu_bluejelly[1].SetPoint(490, 530);
		this.cpu_bluejelly[2].SetPoint(470, 540);
		
		this.cpu_bluejelly[3].SetPoint(380, 550);
		this.cpu_bluejelly[4].SetPoint(370, 560);
		this.cpu_bluejelly[5].SetPoint(390, 570);

		this.cpu_bluejelly[6].SetPoint(440, 590);
		this.cpu_bluejelly[7].SetPoint(450, 600);
		this.cpu_bluejelly[8].SetPoint(430, 610);

		this.cpu_bluejelly[9].SetPoint(500, 590);
		this.cpu_bluejelly[10].SetPoint(490, 600);
		this.cpu_bluejelly[11].SetPoint(510, 610);

		this.cpu_bluejelly[12].SetPoint(400, 660);
		this.cpu_bluejelly[13].SetPoint(390, 670);
		this.cpu_bluejelly[14].SetPoint(420, 680);

		this.cpu_bluejelly[15]._cpu_lionsmane_loadimage();
		this.cpu_bluejelly[15].SetPoint(470, 520);

		this.cpu_bluejelly[16]._cpu_lionsmane_loadimage();
		this.cpu_bluejelly[16].SetPoint(370, 580);

		this.cpu_bluejelly[17]._cpu_lionsmane_loadimage();
		this.cpu_bluejelly[17].SetPoint(500, 620);

		this.cpu_bluejelly[18]._cpu_lionsmane_loadimage();
		this.cpu_bluejelly[18].SetPoint(445, 625);

		return;
	}

	this._cpublueshark = function() {

		this.cpu_blueshark = new Array(1);

		this.cpu_blueshark[0] = new _cpu_blueshark();
		this.cpu_blueshark[0].playable = this.playable;
		this.cpu_blueshark[0]._cpu_reefshark_create();

		this.cpu_blueshark[0].SetPoint(500, 590);
		this.cpu_blueshark[0].SetBoundaryWidth(80);
		this.cpu_blueshark[0].SetDirection(this._direction.Right);
		
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
		this.cpu_fish[0].SetPoint(560, 530);
		this.cpu_fish[0].SetBoundaryWidth(50);

		this.cpu_fish[1].SetSpecies('red');
		this.cpu_fish[1].SetPoint(545, 535);
		this.cpu_fish[1].SetBoundaryWidth(50);

		this.cpu_fish[2].SetSpecies('risingsun');
		this.cpu_fish[2].SetPoint(550, 540);
		this.cpu_fish[2].SetBoundaryWidth(50);

		this.cpu_fish[3].SetSpecies('stripes');
		this.cpu_fish[3].SetPoint(440, 650);
		this.cpu_fish[3].SetBoundaryWidth(50);

		this.cpu_fish[4].SetSpecies('red');
		this.cpu_fish[4].SetPoint(425, 655);
		this.cpu_fish[4].SetBoundaryWidth(50);

		this.cpu_fish[5].SetSpecies('risingsun');
		this.cpu_fish[5].SetPoint(430, 660);
		this.cpu_fish[5].SetBoundaryWidth(50);

		return;
	}

	this._cpuglyph = function() {

		this.cpu_glyph = new Array(1);
		this.cpu_glyph[0] = new _cpu_glyph();
		this.cpu_glyph[0].playable = this.playable;

		this.cpu_glyph[0].Create();

		this.cpu_glyph[0].SetPoint(600, 575);
		this.cpu_glyph[0].SetId('nalia');
		this.cpu_glyph[0].SetDirection(this._direction.Left);

		this.cpu_glyph[0].text = Array(2);
		this.cpu_glyph[0].text[0] = "HOLOGRAM";
		this.cpu_glyph[0].text[1] = "YOU MAY NOT PASS UNTIL YOU HAVE\nCOLLECTED FIVE";
		this.cpu_glyph[0].text[1]+= "LEVIAN COINS.";

		return;
	}
}
