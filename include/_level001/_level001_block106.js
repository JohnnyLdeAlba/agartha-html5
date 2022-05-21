
function _level001_block106() {

	this.id = 106;

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
		this.w = 960; this.h = 240;

		this.background = new Image();
		this.background.src = 'agartha/block-106.png';

		this._cpumoirae();
		this._boundary();

		return;
	}

	this._boundary = function() {

		this.boundary = new Array(4);

		for (var count = 0; count < this.boundary.length; count++)
			this.boundary[count] = new Rectangle(0, 0, 0, 0);

		this.boundary[0].setRectangle(0, 0, 1, 240);
		this.boundary[1].setRectangle(640, 0, 1, 240);
		this.boundary[2].setRectangle(0, 0, 640, 1);
		this.boundary[3].setRectangle(0, 240, 640, 1);

		return;
	}

	this._cpumoirae = function() {

		this.cpu_moirae = new Array(2);

		for (var count = 0; count < this.cpu_moirae.length; count++) {

			this.cpu_moirae[count] = new _cpu_moirae();
			this.cpu_moirae[count].playable = this.playable;
			this.cpu_moirae[count].Create();
		}

		this.cpu_moirae[0].SetPoint(300, 0);
		this.cpu_moirae[0].SetDirection(this._direction.Left);
		this.cpu_moirae[0].health = 24; this.cpu_moirae[0].full_health = 24;

		this.cpu_moirae[1].SetPoint(300, 0);
		this.cpu_moirae[1].SetDirection(this._direction.Left);
		this.cpu_moirae[1].health = 3; this.cpu_moirae[1].full_health = 3;
		this.cpu_moirae[1].delay_createlaser.total = 100;
		this.cpu_moirae[1].delay_move.total = 6;
		
		return;
	}
}
