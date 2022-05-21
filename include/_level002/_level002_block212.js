
function _level002_block212() {

	this.id = 212;

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
		this.background.src = 'agartha/stage-212.png';

		this._boundary();
		this._cpublueshark();

		return;
	}

	this._boundary = function() {

		var text = null;

		//      1234567890ABCDEF
		text = "00X0X0X000000XX0";
		text+= "0XXXXXXX00000000";
		text+= "0XXXXXXXXXX00000";
		text+= "00XXXXXXXXXX0000";
		text+= "0XXXXXXXXXXX000X";
		text+= "00XXXXXXXXXXX00X";
		text+= "00XXXXXXXXXXX000";
		text+= "000XXXXXXXXXX000";
		text+= "0000XXXXXXXXXX00";
		text+= "0000X00XXXXXXX00";
		text+= "00000000XXXXX000";
		text+= "0000000000X00000";

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

	this._cpublueshark = function() {

		this.cpu_blueshark = new Array(2);

		this.cpu_blueshark[0] = new _cpu_blueshark();
		this.cpu_blueshark[0].playable = this.playable;
		this.cpu_blueshark[0]._cpu_blueray_create();			

		this.cpu_blueshark[0].SetPoint(30, 670);
		this.cpu_blueshark[0].SetBoundaryWidth(120);

		this.cpu_blueshark[1] = new _cpu_blueshark();
		this.cpu_blueshark[1].playable = this.playable;
		this.cpu_blueshark[1]._cpu_brownray_create();			

		this.cpu_blueshark[1].SetPoint(0, 680);
		this.cpu_blueshark[1].SetBoundaryWidth(120);

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
}
