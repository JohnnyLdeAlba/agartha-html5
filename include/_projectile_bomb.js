
function _projectile_bomb_draw() {

	if (this.instruction_megabomb == false)
		this.display_manager.StrokeRect(this.x+this.offset_x,
			this.y+this.offset_y, this.w, this.h, "#ff0000");

	this.display_manager.drawImage(this.handle, this.x, this.y);
	return;
}

function _projectile_bomb_process() {

	if (this.state == this._state.Purge)
		return;

	if (this.state == this._state.Burst) {

		if (this.burst.state == this.burst._state.Purge) {

			this.SetState(this._state.Purge);
			return;
		}
		
		this.burst.Process();
		return;
	}

	if (this.delay_flip.Process() == false) {

		this.burst.Create();

		this.burst.Create();
		this.burst.SetPoint(this.x, this.y);

		this.SetState(this._state.Burst);
		return;
	}

	if (this.instruction_megabomb == false)
		this.current.setRectangle(this.x+this.offset_x,
		this.y+this.offset_y, this.w, this.h);

	else this.current.setRectangle(this.viewport_manager.x,
		this.viewport_manager.y, this.viewport_manager.w,
		this.viewport_manager.h);


	this.Draw();		
	return;
}

function _projectile_bomb_inbound(boundry) {

	if (InBound(this.current, boundry) == true)
		return true;
			
	return false;
}

function _projectile_megabomb_create() {

	this.handle = new Image();
	this.handle.src = 'agartha/bomb-2.png';
	this.instruction_megabomb = true;

	this.Create();
}

function _projectile_bomb_create() {

	this.display_manager = this.playable.display_manager;
	this.viewport_manager = this.playable.viewport_manager;

	// constant:

	this.w = 40; this.h = 40;
	this.offset_x = -8; this.offset_y = -8;

	// initial:

	this.SetPoint(0, 0);
	this.current = new Rectangle(0, 0, 10, 10);
		
	// assign:

	this.SetState(this._state.Normal);

	this.burst = new _projectile_burst();
	this.burst.LoadImage();

	this.delay_flip = new Delay(0, 100);

	if (this.handle == null) {

		this.handle = new Image();
		this.handle.src = 'agartha/bomb-1.png';
		this.instruction_megabomb = false;
	}

	return;
}

function _projectile_bomb_destroy() {

	this.state = this._state.Purge;	
	this.instruction_megabomb = false;

	this.x = 0; this.y = 0;
	this.w = 0; this.h = 0;
	this.image_w = 0; this.index = 0;
	this.offset_x = 0; this.offset_y = 0;

	this.burst = null;
	this.current = null; this.handle = null;
	this.delay_flip = null;

	return;
}

function _projectile_bomb() {

	this._projectile_megabomb_create = _projectile_megabomb_create;

	this.playable = null;
	this.display_manager = null;
	this.viewport_manager = null;

	this._state = new _core_state();

	this.state = this._state.Purge;
	this.instruction_megabomb = false;

	this.x = 0; this.y = 0;
	this.w = 0; this.h = 0;
	this.image_w = 0; this.index = 0;
	this.offset_x = 0; this.offset_y = 0;
	

	this.burst = null;
	this.current = null; this.handle = null;
	this.delay_flip = null;

	this.SetState = _core_method_setstate;
	this.SetPoint = _core_method_setpoint;

	this.Create = _projectile_bomb_create;
	this.Destroy = _projectile_bomb_destroy;

	this.InBound = _projectile_bomb_inbound;
	this.Process = _projectile_bomb_process;
	this.Draw = _projectile_bomb_draw;
}

