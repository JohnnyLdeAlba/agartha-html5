
function _level002_block200() {

	this.id = 200;

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
		this.background.src = 'agartha/stage-200.png';

		this._boundary();
		this._cpuairplant();
		this._cpubluejelly();
		this._cpufish();
		this._cpuglyph();

		return;
	}

	this._boundary = function() {

		var text = null;

		// 16X12
		//      1234567890ABCDEF
		text = "0000000000000000";
		text+= "0000000000000000";
		text+= "00XX000000000000";
		text+= "0X00X00000000000";
		text+= "X0000XX000000000";
		text+= "X000000XXXX00000";
		text+= "X000000000X00000";
		text+= "X000000000X000XX";
		text+= "X0X000000X000XXX";
		text+= "0X0XX000X0000XXX";
		text+= "00000XXX0000XXXX";
		text+= "0000000000000XXX"; 

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
		this.boundary[total+1] = new Rectangle(this.x, this.y, 1, 240);

		return;
	}

	this._cpuairplant = function() {

		this.cpu_airplant = new Array(2);

		this.cpu_airplant[0] = new _cpu_airplant();
		this.cpu_airplant[0].playable = this.playable;
		this.cpu_airplant[0].Create();
		
		this.cpu_airplant[0].SetColor('orange');
		this.cpu_airplant[0].SetPoint(210, 110);

		this.cpu_airplant[1] = new _cpu_airplant();
		this.cpu_airplant[1].playable = this.playable;
		this.cpu_airplant[1].Create();

		this.cpu_airplant[1].SetColor('red');
		this.cpu_airplant[1].SetPoint(300, 125);

		return;
	}

	this._cpubluejelly = function() {

		this.cpu_bluejelly = new Array(4);
		for (var count = 0; count < this.cpu_bluejelly.length; count++) {

			this.cpu_bluejelly[count] = new _cpu_bluejelly();
			this.cpu_bluejelly[count].playable = this.playable;
			this.cpu_bluejelly[count].Create();			
		}

		this.cpu_bluejelly[0].SetPoint(200, 200);
		this.cpu_bluejelly[1].SetPoint(210, 210);
		this.cpu_bluejelly[2].SetPoint(190, 210);

		this.cpu_bluejelly[3]._cpu_lionsmane_loadimage();
		this.cpu_bluejelly[3].SetPoint(200, 220);

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
		this.cpu_fish[0].SetPoint(5, 205);
		this.cpu_fish[0].SetBoundaryWidth(60);

		this.cpu_fish[1].SetSpecies('red');
		this.cpu_fish[1].SetPoint(15, 210);
		this.cpu_fish[1].SetBoundaryWidth(55);

		this.cpu_fish[2].SetSpecies('risingsun');
		this.cpu_fish[2].SetPoint(20, 215);
		this.cpu_fish[2].SetBoundaryWidth(50);

		this.cpu_fish[3].SetSpecies('stripes');
		this.cpu_fish[3].SetPoint(10, 220);
		this.cpu_fish[3].SetBoundaryWidth(50);

		this.cpu_fish[4].SetSpecies('risingsun');
		this.cpu_fish[4].SetPoint(15, 225);
		this.cpu_fish[4].SetBoundaryWidth(55);

		return;
	}


	this._cpuglyph = function() {

		this.cpu_glyph = new Array(1);

		this.cpu_glyph[0] = new _cpu_glyph();
		this.cpu_glyph[0].playable = this.playable;
		this.cpu_glyph[0].Create();
		
		this.cpu_glyph[0].SetPoint(260, 160);
		this.cpu_glyph[0].SetId('hercules');
		this.cpu_glyph[0].SetDirection(this._direction.Left);

		this.cpu_glyph[0].text = new Array(3);
		this.cpu_glyph[0].text[0] = "HOLOGRAM";

		this.cpu_glyph[0].text[1] = "BEYOND THE GREAT SHIELD LIVE\nTHE MOIRAE,";
		this.cpu_glyph[0].text[1]+= " A DREADFUL SPECIES\nOF PARASITE WHOM DEVOURS";
		this.cpu_glyph[0].text[1]+= "\nEVERYTHING IN THEIR PATH. >";
		this.cpu_glyph[0].text[2] = "AGARTHA IS ONE OF THE LAST\nPLACES ON EARTH";
		this.cpu_glyph[0].text[2]+= " THAT FLOURISHES\nWITH LIFE.";

		return;
	}


}
